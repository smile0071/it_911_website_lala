from datetime import datetime

from sqlalchemy import Select

from filters.operators import RangeFilter, SearchFilter
from models.contact import Contact


class ContactFilter:
    def __init__(
            self,
            query: str = None,
            created_from: datetime = None,
            created_to: datetime = None,
    ):
        self.filters = [
            SearchFilter([Contact.full_name, Contact.phone], query),
            RangeFilter(Contact.created_at, created_from, created_to)
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            stmt = f.apply(stmt)
        return stmt
