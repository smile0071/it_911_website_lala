from sqlalchemy import Select, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from filters.paginator import Paginator
from filters.sorter import Sorter


class QueryBuilder:
    def __init__(
            self,
            stmt: Select,
            db: AsyncSession,
            filters,
            sorter: Sorter,
            paginator: Paginator
    ):
        self.stmt = stmt
        self.db = db
        self.filters = filters
        self.sorter = sorter
        self.paginator = paginator

    async def build(self):
        stmt = self.filters.apply(self.stmt)

        result = await self.db.execute(stmt)
        self.paginator.set_total(len(result.scalars().all()))

        if self.sorter:
            stmt = self.sorter.apply(stmt)

        if self.paginator:
            stmt = self.paginator.apply(stmt)

        return stmt
