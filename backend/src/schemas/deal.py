from typing import List

from pydantic import BaseModel

from models.deal import DealStatusEnum
from schemas.base import PaginationResponse


class DealRequest(BaseModel):
    lead_id: int
    deal_sum: float
    status: DealStatusEnum = DealStatusEnum.PROCESSING


class DealResponse(BaseModel):
    id: int
    lead_id: int
    deal_sum: float
    status: DealStatusEnum

    model_config = {
        "from_attributes": True
    }


class ListDealResponse(BaseModel):
    deals: List[DealResponse]
    pagination: PaginationResponse
