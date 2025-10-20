import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from repository.click_repo import ClickRepository
from repository.taget_repo import TargetCompanyRepository


class ClickManager:
    def __init__(self, db: AsyncSession):
        self.repo = ClickRepository(db)
        self.target_repo = TargetCompanyRepository(db)

    async def create(self, target_id: uuid.UUID):
        target_company = await self.target_repo.get_by_id(target_id)
        if not target_company:
            raise NotFound("Target company Not Found")
        await self.repo.create(target_id)
