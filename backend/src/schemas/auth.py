import re

from pydantic import BaseModel, field_validator

class TokenRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

    @field_validator("new_password")
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