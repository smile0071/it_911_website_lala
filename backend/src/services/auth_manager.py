from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import UnAuthorized, InvalidToken
from models import User

from repository.user_repo import UserRepository

from services.password_service import PasswordService
from services.token_service import TokenService


class AuthManager:
    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)
        self.token_service = TokenService()
        self.password_service = PasswordService()

    async def login(
            self,
            username: str,
            password: str
    ):
        user = await self.repo.get_by_username(username)
        if not user:
            raise UnAuthorized("Invalid Username or Password")
        if not self.password_service.verify_password(password, user.hashed_password):
            raise UnAuthorized("Invalid Username or Password")
        return self.token_service.generate(user)

    async def refresh_token(
            self,
            token: str
    ):
        payload = self.token_service.validate(token, True)
        user = await self.repo.get_by_username(payload.get("username"))

        if not user:
            raise InvalidToken("Invalid Credentials")

        return self.token_service.generate(user)

    async def get_me(
            self,
            token: str
    ):
        payload = self.token_service.validate(token)
        user = await self.repo.get_by_username(payload.get("username"))

        if not user:
            raise InvalidToken("Invalid Credentials")
        return user

    async def change_password(
            self,
            user: User,
            old_password: str,
            new_password: str,
    ):
        if not self.password_service.verify_password(old_password, user.hashed_password):
            raise UnAuthorized("Invalid Password")

        hashed_password = self.password_service.hash_password(new_password)
        user.hashed_password = hashed_password
        await self.repo.update(user)
