import uuid

from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from filters.paginator import Paginator
from filters.sorter import Sorter
from filters.target_filter import TargetFilter
from models import TargetCompany

from repository.click_repo import ClickRepository
from repository.lead_repo import LeadRepository
from repository.taget_repo import TargetCompanyRepository

from schemas.base import Sort
from schemas.target import TargetCompanyRequest, TargetCompanyResponse, TargetCompanyListResponse


class TargetCompanyManager:
    def __init__(self, db: AsyncSession):
        self.repo = TargetCompanyRepository(db)
        self.click_repo = ClickRepository(db)
        self.lead_repo = LeadRepository(db)

    async def create_target(
            self,
            request: TargetCompanyRequest,
    ):
        target_company = await self.repo.create(
            request.name
        )
        return TargetCompanyResponse(
            id=target_company.id,
            name=target_company.name,
            url=f"localhost:8000/c/{target_company.id}"
        )

    async def update_target(
            self,
            target_company_id: uuid.UUID,
            request: TargetCompanyRequest,
    ):
        target_company = await self.repo.get_by_id(target_company_id)
        if not target_company:
            raise NotFound("Target company Not Found")
        target_company.name = request.name
        await self.repo.update(target_company)

    async def delete_target(
            self,
            target_company_id: uuid.UUID,
    ):
        target_company = await self.repo.get_by_id(target_company_id)
        if not target_company:
            raise NotFound("Target company Not Found")
        await self.repo.delete(target_company)

    async def get_target(
            self,
            target_company_id: uuid.UUID,
    ):
        target_company = await self.repo.get_by_id(target_company_id)
        if not target_company:
            raise NotFound("Target company Not Found")
        clicks = await self.click_repo.get_clicks(target_company.id)
        leads = await self.lead_repo.list(target_id=target_company.id)
        return TargetCompanyResponse(
            id=target_company.id,
            name=target_company.name,
            is_active=target_company.is_active,
            url=f"localhost:8000/c/{target_company.id}",
            clicks=len(clicks),
            leads=len(leads),
        )

    async def list_target(
            self,
            name: str = None,
            is_active: bool = None,
            created_from: datetime = None,
            created_to: datetime = None,
            sorts: list[Sort] = None,
            page: int = 1,
            size: int = 50
    ):

        filters = TargetFilter(
            name=name,
            is_active=is_active,
            created_from=created_from,
            created_to=created_to
        )
        sorters = []

        for sort_by in sorts:
            col, destination = sort_by.split(":")
            col = getattr(TargetCompany, col)
            sorters.append((col, destination))

        sorter = Sorter(
            tuple(sorters)
        )

        paginator = Paginator(
            page=page,
            size=size
        )

        target_companies = await self.repo.list(
            filters, sorter, paginator
        )
        return TargetCompanyListResponse(
            target_companies=[
                TargetCompanyResponse(
                    id=target_company.id,
                    name=target_company.name,
                    is_active=target_company.is_active,
                    url=f"localhost:8000/c/{target_company.id}",
                    clicks=len(await self.click_repo.get_clicks(target_company.id)),
                    leads=len(await self.lead_repo.list(target_id=target_company.id))
                )
                for target_company in target_companies.get("target_companies")
            ],
            pagination=target_companies.get("pagination")
        )
