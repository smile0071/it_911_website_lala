from sqlalchemy import select, Select

from filters.operators import InFilter, EqualFilter, RangeFilter
from models.lead import Lead


class LeadFilter:
    def __init__(
            self,
            status=None,
            target_id=None,
            created_from=None,
            created_to=None,
    ):
        self.filters = [
            InFilter(Lead.status, status),
            EqualFilter(Lead.target_id, target_id),
            RangeFilter(Lead.created_at, created_from, created_to),
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            f.apply(stmt)
        return stmt
