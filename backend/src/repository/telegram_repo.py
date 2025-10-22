from sqlalchemy import select

from models.telegram import TelegramUser
from repository.base_repo import BaseRepository
from repository.query_builder import QueryBuilder


class TelegramRepository(BaseRepository):
    async def create(
            self,
            user_id,
            lang,
    ):
        user = TelegramUser(
            user_id=user_id,
            lang=lang,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def update(
            self,
            telegram_user: TelegramUser
    ):
        self.db.add(telegram_user)
        await self.db.commit()

    async def delete(
            self,
            telegram_user: TelegramUser
    ):
        await self.db.delete(telegram_user)
        await self.db.commit()

    async def get(
            self,
            user_id
    ):
        result = await self.db.execute(
            select(TelegramUser).where(TelegramUser.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def list(self):
        pass
