from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from filters.deal_filter import DealFilter
from filters.paginator import Paginator
from filters.sorter import Sorter

from models.deal import DealStatusEnum, Deal
from models.lead import StatusEnum

from repository.deal_repo import DealRepository
from repository.lead_repo import LeadRepository

from schemas.base import Sort
from schemas.deal import DealRequest, DealResponse, ListDealResponse


class DealManager:
    def __init__(self, db: AsyncSession):
        self.repo = DealRepository(db)
        self.lead_repo = LeadRepository(db)

    async def create_deal(
            self,
            request: DealRequest,
    ):
        lead = await self.lead_repo.get_by_id(request.lead_id)
        lead.status = StatusEnum.DEAL
        if not lead:
            raise NotFound("Lead not found")

        deal = await self.repo.create(request.lead_id, request.deal_sum, request.status)
        return DealResponse.model_validate(deal)

    async def get_deal(
            self,
            deal_id: int,
    ):
        deal = await self.repo.get_by_id(deal_id)
        if not deal:
            raise NotFound("Deal not found")
        return DealResponse.model_validate(deal)

    async def update_deal(
            self,
            deal_id: int,
            request: DealRequest
    ):
        deal = await self.repo.get_by_id(deal_id)
        if not deal:
            raise NotFound("Deal not found")

        deal.deal_sum = request.deal_sum
        deal.status = request.status
        deal.lead_id = request.lead_id

        await self.repo.update(deal)

    async def delete_deal(
            self,
            deal_id: int
    ):
        deal = await self.repo.get_by_id(deal_id)
        if not deal:
            raise NotFound("Deal not found")

        await self.repo.delete(deal)

    async def get_deals(
            self,
            deal_id: int = None,
            status: list[DealStatusEnum] = None,
            created_from: datetime = None,
            created_to: datetime = None,
            sorts: list[Sort] = None,
            page: int = 1,
            size: int = 50
    ):
        filters = DealFilter(
            deal_id=deal_id,
            status=status,
            created_from=created_from,
            created_to=created_to,
        )
        sorters = []

        for sort_by in sorts:
            col, destination = sort_by.split(":")
            col = getattr(Deal, col)
            sorters.append((col, destination))

        sorter = Sorter(
            tuple(sorters)
        )

        paginator = Paginator(
            page=page,
            size=size
        )

        deals = await self.repo.list(
            filters=filters,
            sorter=sorter,
            paginator=paginator
        )
        return ListDealResponse(
            **deals
        )
