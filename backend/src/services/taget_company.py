import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound

from repository.click_repo import ClickRepository
from repository.lead_repo import LeadRepository
from repository.taget_repo import TargetCompanyRepository

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
            url=f"localhost:8000/c/{target_company.id}",
            clicks=len(clicks),
            leads=len(leads),
        )

    async def list_target(
            self
    ):
        target_companies = await self.repo.list()
        return TargetCompanyListResponse(
            target_companies=[
                TargetCompanyResponse(
                    id=target_company.id,
                    name=target_company.name,
                    url=f"localhost:8000/c/{target_company.id}",
                    clicks=len(await self.click_repo.get_clicks(target_company.id)),
                    leads=len(await self.lead_repo.list(target_id=target_company.id))
                )
                for target_company in target_companies
            ]
        )
