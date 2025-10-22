import uuid

from sqlalchemy import select

from models.target import TargetCompany
from repository.base_repo import BaseRepository
from repository.query_builder import QueryBuilder


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
            self,
            filters=None,
            sorter=None,
            paginator=None,
    ):
        stmt = select(TargetCompany)

        builder = QueryBuilder(
            stmt=stmt,
            db=self.db,
            filters=filters,
            sorter=sorter,
            paginator=paginator,
        )
        stmt = await builder.build()
        result = await self.db.execute(stmt)
        items = result.scalars().all()

        return {
            "target_companies": items,
            "pagination": paginator.to_dict()
        }

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
