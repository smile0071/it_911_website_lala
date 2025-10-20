from contextlib import asynccontextmanager

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import async_session
from exceptions import Forbidden
from services.auth_manager import AuthManager

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(get_db),
):
    manager = AuthManager(db)
    return await manager.get_me(token)


async def get_superuser(
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(get_db),
):
    user = await get_current_user(token, db)
    if not user.is_superuser:
        raise Forbidden("Forbidden")
    return user
