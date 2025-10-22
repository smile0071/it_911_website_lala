from sqlalchemy import Select

from filters.operators import EqualFilter, LikeFilter
from models.user import User


class UserFilter:
    def __init__(
            self,
            is_superuser: bool = None,
            full_name: str = None,
    ):
        self.filters = [
            EqualFilter(User.is_superuser, is_superuser),
            LikeFilter(User.full_name, full_name),
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            stmt = f.apply(stmt)

        return stmt
