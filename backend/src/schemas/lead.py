import uuid
from typing import List

from pydantic import BaseModel, Field, EmailStr

from models.lead import StatusEnum
from schemas.base import PaginationResponse


class LeadRequest(BaseModel):
    full_name: str = Field(max_length=512)
    email: EmailStr
    phone: str = Field(max_length=20)
    company_name: str = Field(max_length=512)
    company_info: str = Field(max_length=2048)
    status: StatusEnum = StatusEnum.NEW
    target_id: uuid.UUID = None


class LeadResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    company_name: str
    company_info: str
    status: StatusEnum
    target_id: uuid.UUID | None = None

    model_config = {
        "from_attributes": True
    }


class LeadCommentRequest(BaseModel):
    lead_id: int
    comment: str = Field(max_length=2048)


class LeadCommentResponse(BaseModel):
    id: int
    lead_id: int
    user_id: int
    comment: str

    model_config = {
        "from_attributes": True
    }


class ChangeStatusRequest(BaseModel):
    status: StatusEnum


class ListLeadResponse(BaseModel):
    leads: List[LeadResponse]
    pagination: PaginationResponse

    model_config = {
        "from_attributes": True
    }


class ListLeadCommentResponse(BaseModel):
    comments: List[LeadCommentResponse]

    model_config = {
        "from_attributes": True
    }
