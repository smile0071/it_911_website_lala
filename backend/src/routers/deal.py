from datetime import datetime

from fastapi import APIRouter, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_current_user, get_db

from models.deal import DealStatusEnum
from models.user import User

from schemas.base import Sort
from schemas.deal import DealRequest

from services.deal_manager import DealManager

router = APIRouter(
    tags=["deal"],
    prefix="/deals"
)


@router.get(
    "/"
)
async def get_deals(
        deal_id: int = Query(None, alias="q"),
        status: list[DealStatusEnum] = Query(default=None, description="Фильтр по Статусу"),
        created_from: datetime = Query(default=None, description="Фильтр по Мин Созданной"),
        created_to: datetime = Query(default=None, description="Фильтр по Мак Созданной"),
        sort_by: list[Sort] = Query(default=Sort.desc, description="Сортировка"),
        page: int = Query(default=1, ge=1, description="Страница"),
        size: int = Query(default=1, ge=1, description="Размер Страницы"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = DealManager(db)
    response = await manager.get_deals(
        deal_id=deal_id,
        status=status,
        created_from=created_from,
        created_to=created_to,
        sorts=sort_by,
        page=page,
        size=size,
    )
    return response


@router.get(
    "/{deal_id}"
)
async def get_deal(
        deal_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = DealManager(db)
    response = await manager.get_deal(
        deal_id=deal_id,
    )
    return response


@router.post(
    "/"
)
async def create_deal(
        request: DealRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = DealManager(db)
    response = await manager.create_deal(request=request)
    return response


@router.put(
    "/{deal_id}"
)
async def update_deal(
        deal_id: int,
        request: DealRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = DealManager(db)
    await manager.update_deal(deal_id, request)


@router.delete(
    "/{deal_id}"
)
async def delete_deal(
        deal_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = DealManager(db)
    await manager.delete_deal(deal_id)


@router.patch("/{deal_id}")
async def partially_update_deal(deal_id: int, deal: DealRequest):
    pass
