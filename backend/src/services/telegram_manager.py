from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from repository.telegram_repo import TelegramRepository
from schemas.telegram import TelegramUserCreateRequest, TelegramUserResponse, AssignCompanyRequest, \
    TelegramUserUpdateRequest


class TelegramUserManager:
    def __init__(self, db: AsyncSession):
        self.repo = TelegramRepository(db)

    async def create_user(
            self,
            request: TelegramUserCreateRequest
    ):
        user = await self.repo.create(**request.model_dump())
        return TelegramUserResponse.model_validate(user)

    async def delete_user(
            self,
            user_id: int
    ):
        user = await self.repo.get(user_id)
        if not user:
            raise NotFound("User not found")
        await self.repo.delete(user.id)

    async def update_user(
            self,
            user_id: int,
            request: TelegramUserUpdateRequest
    ):
        user = await self.repo.get(user_id)
        if not user:
            raise NotFound("User not found")
        user.full_name = request.full_name
        user.phone = request.phone
        user.lang = request.lang
        await self.repo.update(user)

    async def list_user(self):
        pass

    async def get_user(
            self,
            user_id: int
    ):
        user = await self.repo.get(user_id)
        if not user:
            raise NotFound("User not found")
        return TelegramUserResponse.model_validate(user)

    async def assign_company(
            self,
            user_id: int,
            request: AssignCompanyRequest
    ):
        user = await self.repo.get(user_id)
        if not user:
            raise NotFound("User not found")
        # Поиск Компании

        user.company_id = request.company_id
        await self.repo.update(user)

    async def update_interaction(self, user_id: int):
        user = await self.repo.get(user_id)
        if not user:
            raise NotFound("User not found")
        user.last_interaction = datetime.now()
        await self.repo.update(user)
