from pydantic import BaseModel, Field


class TelegramUserCreateRequest(BaseModel):
    user_id: int
    lang: str = Field(max_length=2)


class TelegramUserUpdateRequest(BaseModel):
    lang: str = Field(default=None, max_length=2)


class AssignCompanyRequest(BaseModel):
    company_id: int


class TelegramUserResponse(BaseModel):
    user_id: int
    lang: str

    model_config = {
        "from_attributes": True
    }
