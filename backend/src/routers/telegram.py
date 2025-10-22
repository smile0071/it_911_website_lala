from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import verify_bot, get_db, get_current_user, get_actor
from models import User
from schemas.telegram import TelegramUserCreateRequest, AssignCompanyRequest, TelegramUserUpdateRequest
from services.telegram_manager import TelegramUserManager

router = APIRouter(
    prefix="/telegram",
    tags=["telegram"]
)


@router.get("/{user_id}")
async def get_user(
        user_id: int,
        user: User | None = Depends(get_actor),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    response = await manager.get_user(user_id)
    return response


@router.get("/")
async def get_users(
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    pass


@router.post(
    "/",
    status_code=201
)
async def create_user(
        request: TelegramUserCreateRequest,
        bot=Depends(verify_bot),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    response = await manager.create_user(request)
    return response


@router.post(
    "/{user_id}/assign-company",
    status_code=201
)
async def assign_company(
        user_id: int,
        request: AssignCompanyRequest,
        bot=Depends(verify_bot),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    await manager.assign_company(user_id, request)


@router.post(
    "/{user_id}/interaction",
    status_code=201
)
async def update_interaction(
        user_id: int,
        bot=Depends(verify_bot),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    await manager.update_interaction(user_id)


@router.put(
    "/{user_id}/",
)
async def update_user(
        user_id: int,
        request: TelegramUserUpdateRequest,
        user: User | None = Depends(get_actor),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    await manager.update_user(user_id, request)


@router.delete(
    "/{user_id}/",
)
async def delete_user(
        user_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TelegramUserManager(db)
    await manager.delete_user(user_id)
