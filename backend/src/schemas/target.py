import uuid
from typing import List

from pydantic import BaseModel, Field


class TargetCompanyRequest(BaseModel):
    name: str = Field(max_length=256)


class TargetCompanyResponse(BaseModel):
    id: uuid.UUID
    name: str = Field(max_length=256)
    url: str
    clicks: int = 0
    leads: int = 0

    model_config = {
        "from_attributes": True
    }


class TargetCompanyListResponse(BaseModel):
    target_companies: List[TargetCompanyResponse]

    model_config = {
        "from_attributes": True
    }