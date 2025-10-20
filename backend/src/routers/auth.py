from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from starlette import status

from dependencies import get_db, get_current_user
from models.user import User

from schemas.auth import TokenResponse, TokenRequest, ChangePasswordRequest
from schemas.exceptions import ExceptionResponse
from schemas.user import UserResponse

from services.auth_manager import AuthManager

router = APIRouter(
    tags=["auth"],
    prefix="/auth"
)


@router.post(
    "/token",
    summary="Авторизация",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_201_CREATED: {"description": "Authorized", "model": TokenResponse},
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
    }
)
async def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: AsyncSession = Depends(get_db)
):
    manager = AuthManager(db)
    token = await manager.login(form_data.username, form_data.password)
    return token


@router.post(
    "/refresh",
    summary="Обновление Токена",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_201_CREATED: {"description": "Authorized", "model": TokenResponse},
        status.HTTP_401_UNAUTHORIZED: {"description": "Invalid Token", "model": ExceptionResponse},
    }
)
async def refresh(
        token: TokenRequest,
        db: AsyncSession = Depends(get_db)
):
    manager = AuthManager(db)
    token = await manager.refresh_token(token.refresh_token)
    return token


@router.get(
    "/me",
    summary="Получение Текущей Информации Пользователя",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_200_OK: {"description": "User Response", "model": UserResponse},
        status.HTTP_401_UNAUTHORIZED: {"description": "Invalid Token", "model": ExceptionResponse},
    }
)
async def me(
        user: User = Depends(get_current_user)
):
    return UserResponse.model_validate(user)


@router.post(
    "/change-password",
    summary="Обновление Пароля",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_204_NO_CONTENT: {"description": "Authorized"},
        status.HTTP_401_UNAUTHORIZED: {"description": "Invalid Password", "model": ExceptionResponse},
    }
)
async def change_password(
        request: ChangePasswordRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = AuthManager(db)
    await manager.change_password(user, request.old_password, request.new_password)
