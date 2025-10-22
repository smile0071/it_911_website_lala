from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_superuser, get_db, get_current_user
from models import User
from schemas.base import Sort
from schemas.user import UserListResponse, UserResponse, UserCreateRequest, UserRequest
from services.user_manager import UserManager

router = APIRouter(
    tags=["user"],
    prefix="/users",
)


@router.get(
    "/"
)
async def get_users(
        is_superuser: bool = Query(default=None, ),
        fullname: str = Query(None, alias="q"),
        phone: str = Query(None, alias="q"),
        sort_by: list[Sort] = Query(default=Sort.desc, description="Сортировка"),
        page: int = Query(default=1, ge=1, description="Страница"),
        size: int = Query(default=1, ge=1, description="Размер Страницы"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.get_users(
        is_superuser=is_superuser,
        full_name=fullname,
        sorts=sort_by,
        page=page,
        size=size,
    )
    return response


@router.post(
    "/"
)
async def create_user(
        request: UserCreateRequest,
        user: User = Depends(get_superuser),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.create_user(request)
    return response


@router.put(
    "/{user_id}"
)
async def update_user(
        user_id: int,
        request: UserRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    await manager.update_user(user_id, request)


@router.delete(
    "/{user_id}"
)
async def delete_user(
        user_id: int,
        user: User = Depends(get_superuser),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    await manager.delete_user(user_id)


@router.get(
    "/{user_id}"
)
async def get_user(
        user_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.get_user(user_id)
    return response
