from datetime import datetime

from sqlalchemy import Select

from filters.operators import InFilter, RangeFilter, EqualFilter
from models.deal import DealStatusEnum, Deal


class DealFilter:
    def __init__(
            self,
            deal_id: int = None,
            status: list[DealStatusEnum] = None,
            created_from: datetime = None,
            created_to: datetime = None,
    ):
        self.filters = [
            EqualFilter(Deal.id, deal_id),
            InFilter(Deal.status, status),
            RangeFilter(Deal.created_at, created_from, created_to),
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            stmt = f.apply(stmt)
        return stmt
