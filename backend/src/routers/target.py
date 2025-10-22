import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from dependencies import get_current_user, get_db
from models import User
from schemas.base import Sort
from schemas.exceptions import ExceptionResponse
from schemas.target import TargetCompanyRequest, TargetCompanyResponse, TargetCompanyListResponse
from services.target_company import TargetCompanyManager

router = APIRouter(
    tags=["target"],
    prefix="/target",
)


@router.post(
    "/",
    summary="Создание Таргет Компании",
    response_model=TargetCompanyResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_201_CREATED: {"model": TargetCompanyResponse},
        status.HTTP_403_FORBIDDEN: {"model": ExceptionResponse}
    }
)
async def create_target(
        request: TargetCompanyRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    """
    Создание новой компании.


    ### Пример запроса:
    ```json
    {
      "name": "Таргет В Инстаграм"
    }
    ```

    ### Пример ответа (201):
    ```json
    {
      "id": 1,
      "name": "Таргет В Инстаграм"
    }
    ```

    ### Ошибки:
    - **403 Forbidden** — нет прав для создания компании
    - **422	Validation Error** - Ошибка валидации
    """
    manager = TargetCompanyManager(db)
    target = await manager.create_target(request)
    return target


@router.get(
    "/",
    summary="Получение Всех Таргет Компании",
    response_model=TargetCompanyListResponse,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_200_OK: {"model": TargetCompanyListResponse},
        status.HTTP_403_FORBIDDEN: {"model": ExceptionResponse}
    }
)
async def get_targets(
        name: str = Query(None, alias="q"),
        is_active: bool = Query(None),
        sort_by: list[Sort] = Query(default=Sort.desc, description="Сортировка"),
        page: int = Query(default=1, ge=1, description="Страница"),
        size: int = Query(default=1, ge=1, description="Размер Страницы"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TargetCompanyManager(db)
    targets = await manager.list_target(
        name=name,
        is_active=is_active,
        sorts=sort_by,
        page=page,
        size=size,
    )
    return targets


@router.get(
    "/{target_id}",
    summary="Получение Таргет Компании по ИД",
    response_model=TargetCompanyResponse,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_200_OK: {"model": TargetCompanyListResponse},
        status.HTTP_403_FORBIDDEN: {"model": ExceptionResponse}
    }
)
async def get_target(
        target_id: uuid.UUID,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TargetCompanyManager(db)
    target = await manager.get_target(target_id)
    return target


@router.put(
    "/{target_id}",
    summary="Обновление Таргет Компании по ИД",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={

        status.HTTP_403_FORBIDDEN: {"model": ExceptionResponse}
    }
)
async def update_target(
        target_id: uuid.UUID,
        request: TargetCompanyRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TargetCompanyManager(db)
    await manager.update_target(target_id, request)


@router.delete(
    "/{target_id}",
    summary="Удаление Таргет Компании по ИД",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={

        status.HTTP_403_FORBIDDEN: {"model": ExceptionResponse}
    }
)
async def delete_target(
        target_id: uuid.UUID,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TargetCompanyManager(db)
    await manager.delete_target(target_id)
