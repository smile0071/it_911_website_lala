from models.user import User
from repository.base_repo import BaseRepository
from sqlalchemy import select

from repository.query_builder import QueryBuilder


class UserRepository(BaseRepository):
    async def create(
            self,
            full_name: str,
            username: str,
            password: str,
            is_superuser: bool = False,
    ) -> User:
        user = User(
            full_name=full_name,
            username=username,
            hashed_password=password,
            is_superuser=is_superuser
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def update(
            self,
            user: User
    ) -> None:
        self.db.add(user)
        await self.db.commit()
        return user

    async def delete(
            self,
            user: User
    ) -> None:
        await self.db.delete(user)
        await self.db.commit()

    async def get_by_id(
            self,
            user_id: int
    ) -> User:
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()

    async def get_by_username(
            self,
            username: str

    ) -> User:
        stmt = select(User).where(User.username == username)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list(
            self,
            filters=None,
            sorter=None,
            paginator=None,
    ):
        stmt = select(User)

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
            "users": items,
            "pagination": paginator.to_dict()
        }
