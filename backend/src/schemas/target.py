import uuid
from typing import List

from pydantic import BaseModel, Field

from schemas.base import PaginationResponse


class TargetCompanyRequest(BaseModel):
    name: str = Field(max_length=256)


class TargetCompanyResponse(BaseModel):
    id: uuid.UUID
    name: str = Field(max_length=256)
    url: str
    is_active: bool
    clicks: int = 0
    leads: int = 0

    model_config = {
        "from_attributes": True
    }


class TargetCompanyListResponse(BaseModel):
    target_companies: List[TargetCompanyResponse]
    pagination: PaginationResponse

    model_config = {
        "from_attributes": True
    }
