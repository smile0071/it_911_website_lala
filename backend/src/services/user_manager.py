from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import Forbidden, NotFound, BadRequest
from models.user import User
from repository.user_repo import UserRepository
from schemas.user import UserRequest, UserCreateRequest, UserResponse, UserListResponse
from services.password_service import PasswordService


class UserManager:
    def __init__(self, db: AsyncSession, user: User):
        self.repo = UserRepository(db)
        self.user = user
        self.password_service = PasswordService()

    def __check_permission(self):
        if not self.user.is_superuser:
            raise Forbidden("You are not a superuser")
        return True

    async def create_user(
            self,
            request: UserCreateRequest,
    ):
        self.__check_permission()
        users = await self.repo.get_by_username(request.username)
        if users:
            raise BadRequest("Username already exists")
        request.password = self.password_service.hash_password(request.password)
        user = await self.repo.create(**request.model_dump())
        return UserResponse.model_validate(user)

    async def get_user(
            self,
            user_id: int
    ):
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise NotFound("User not found")
        return UserResponse.model_validate(user)

    async def update_user(
            self,
            user_id: int,
            request: UserRequest
    ):
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise NotFound("User not found")
        user.full_name = request.full_name
        if user.username != request.username:
            users = await self.repo.get_by_username(request.username)
            if users:
                raise BadRequest("Username already exists")
        user.username = request.username
        await self.repo.update(user)

    async def delete_user(
            self,
            user_id: int
    ):
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise NotFound("User not found")
        await self.repo.delete(user)

    async def get_users(
            self
    ):
        users = await self.repo.list()
        return UserListResponse(
            users=[
                UserResponse.model_validate(user)
                for user in users
            ]
        )
