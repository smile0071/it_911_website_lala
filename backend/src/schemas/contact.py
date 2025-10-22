from typing import List

from pydantic import BaseModel, EmailStr, Field

from schemas.base import PaginationResponse


class ContactRequest(BaseModel):
    full_name: str = Field(max_length=512)
    email: EmailStr
    phone: str = Field(max_length=20)
    lead_id: int = None


class ContactResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    lead_id: int = None

    model_config = {
        "from_attributes": True
    }


class ContactListResponse(BaseModel):
    contacts: List[ContactResponse]
    pagination: PaginationResponse
