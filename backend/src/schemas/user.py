import re
from typing import List

from pydantic import BaseModel, Field, field_validator


class UserResponse(BaseModel):
    id: int
    full_name: str
    username: str
    is_superuser: bool

    model_config = {
        "from_attributes": True
    }


class UserRequest(BaseModel):
    full_name: str = Field(max_length=512)
    username: str = Field(max_length=320)


class UserCreateRequest(UserRequest):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Пароль должен содержать минимум 8 символов")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Пароль должен содержать хотя бы одну заглавную букву")
        if not re.search(r"[a-z]", value):
            raise ValueError("Пароль должен содержать хотя бы одну строчную букву")
        if not re.search(r"[0-9]", value):
            raise ValueError("Пароль должен содержать хотя бы одну цифру")
        if not re.search(r"[\W_]", value):
            raise ValueError("Пароль должен содержать хотя бы один спецсимвол")
        return value
class UserListResponse(BaseModel):
    users: List[UserResponse]

    model_config = {
        "from_attributes": True
    }