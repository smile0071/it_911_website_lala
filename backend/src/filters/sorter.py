from sqlalchemy import Select, Column, desc, asc

from filters.base import BaseFilter


class Sorter(BaseFilter):
    def __init__(self, sorts: tuple[tuple[Column, str]]):
        self.sorts = sorts

    def apply(self, stmt: Select):
        order_clauses = [
            desc(col) if direction == "desc" else asc(col)
            for col, direction in self.sorts
        ]
        return stmt.order_by(*order_clauses)
