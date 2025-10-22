from sqlalchemy import Column, Select, or_

from exceptions import BadRequest
from filters.base import BaseFilter


class LikeFilter(BaseFilter):
    def __init__(self, column: Column, value):
        self.column = column
        self.value = value

    def apply(self, stmt: Select):
        if self.value:
            return stmt.where(self.column.ilike(f"%{self.value}%"))
        return stmt
class SearchFilter:
    """Фильтр для поиска по нескольким колонкам через OR"""
    def __init__(self, columns: list, value: str | None):
        self.columns = columns
        self.value = value

    def apply(self, stmt):
        if not self.value:
            return stmt
        pattern = f"%{self.value}%"
        stmt = stmt.where(or_(*(col.ilike(pattern) for col in self.columns)))
        return stmt

class EqualFilter(BaseFilter):
    def __init__(self, column: Column, value=None):
        self.column = column
        self.value = value

    def apply(self, stmt: Select):
        if self.value:
            stmt = stmt.where(self.column == self.value)
        return stmt


class InFilter(BaseFilter):
    def __init__(self, column: Column, values: list = None):
        self.column = column
        self.values = values

    def apply(self, stmt: Select):
        if self.values:
            stmt = stmt.where(self.column.in_(self.values))
        return stmt


class RangeFilter(BaseFilter):
    def __init__(self, column: Column, min_value=None, max_value=None):
        self.column = column
        self.min_value = min_value
        self.max_value = max_value
        self.__validate_range()

    def __validate_range(self):
        if self.min_value is not None and self.max_value is not None:
            if self.min_value > self.max_value:
                raise BadRequest("Min value must be greater than max value")

    def apply(self, stmt: Select):
        if self.min_value:
            stmt = stmt.where(self.column >= self.min_value)
        if self.max_value is not None:
            stmt = stmt.where(self.column <= self.max_value)
        return stmt
