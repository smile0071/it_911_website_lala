from datetime import datetime

from sqlalchemy import Select

from filters.operators import LikeFilter, EqualFilter, RangeFilter
from models import TargetCompany


class TargetFilter:
    def __init__(
            self,
            name: str = None,
            is_active: bool = None,
            created_from: datetime = None,
            created_to: datetime = None,
    ):
        self.filters = [
            LikeFilter(TargetCompany.name, name),
            EqualFilter(TargetCompany.is_active, is_active),
            RangeFilter(TargetCompany.created_at, created_from, created_to),
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            stmt = f.apply(stmt)
        return stmt
