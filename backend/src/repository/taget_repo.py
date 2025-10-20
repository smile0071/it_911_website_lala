import uuid

from sqlalchemy import select

from models.target import TargetCompany
from repository.base_repo import BaseRepository


class TargetCompanyRepository(BaseRepository):
    async def create(
            self,
            name: str
    ):
        target = TargetCompany(name=name)
        self.db.add(target)
        await self.db.commit()
        await self.db.refresh(target)
        return target

    async def get_by_id(
            self,
            taget_company_id: uuid.UUID
    ):
        result = await self.db.execute(
            select(TargetCompany).where(
                TargetCompany.id == taget_company_id
            )
        )
        return result.scalar_one_or_none()

    async def list(
            self
    ):
        result = await self.db.execute(
            select(TargetCompany)
        )
        return result.scalars().all()

    async def update(
            self,
            target_company: TargetCompany
    ):
        self.db.add(target_company)
        await self.db.commit()

    async def delete(
            self,
            target_company: TargetCompany
    ):
        await self.db.delete(target_company)
        await self.db.commit()
