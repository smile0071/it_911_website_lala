from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from configs import BOT_SECRET
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


async def verify_bot(
        x_bot_token: str = Header(None)
):
    if x_bot_token != BOT_SECRET:
        raise Forbidden("Forbidden")


async def get_actor(
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(get_db),
        x_bot_token: str = Header(None),
):
    if x_bot_token:
        await verify_bot(x_bot_token)
        return None

    if token:
        actor = await get_current_user(token, db)
        return actor
    raise Forbidden("Forbidden")
