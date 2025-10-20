from sqlalchemy import select

from models import Deal
from repository.base_repo import BaseRepository


class DealRepository(BaseRepository):
    async def create(
            self,
            lead_id: int,
            deal_sum: float,
            status
    ):
        deal = Deal(lead_id=lead_id, deal_sum=deal_sum, status=status)
        self.db.add(deal)
        await self.db.commit()
        await self.db.refresh(deal)
        return deal

    async def get_by_id(
            self,
            deal_id
    ):
        result = await self.db.execute(select(Deal).where(Deal.id == deal_id))
        return result.scalar_one_or_none()

    async def update(
            self,
            deal: Deal
    ):
        self.db.add(deal)
        await self.db.commit()

    async def delete(
            self,
            deal: Deal
    ):
        await self.db.delete(deal)
        await self.db.commit()

    async def list(
            self,
            lead_id,
            status
    ):
        pass
