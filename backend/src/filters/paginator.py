from math import ceil

from sqlalchemy import Select

from filters.base import BaseFilter


class Paginator(BaseFilter):
    def __init__(
            self,
            page: int = 1,
            size: int = 50,
    ):
        self.page = page
        self.size = size
        self.total = 0

    def apply(self, stmt: Select):
        offset = (self.page - 1) * self.size
        return stmt.offset(offset).limit(self.size)

    def set_total(self, total: int):
        self.total = total

    @property
    def total_pages(self):
        if self.total is None:
            return None
        return ceil(self.total / self.size)

    @property
    def has_next(self):
        if self.total is None:
            return None
        return self.page < self.total_pages

    @property
    def has_prev(self):
        return self.page > 1

    def to_dict(self):
        return {
            "page": self.page,
            "size": self.size,
            "total": self.total,
            "total_pages": self.total_pages,
            "has_next": self.has_next,
            "has_prev": self.has_prev,
        }