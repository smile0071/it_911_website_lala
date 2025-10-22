from enum import Enum

from pydantic import BaseModel


class Sort(str, Enum):
    asc = "created_at:asc"
    desc = "created_at:desc"

class PaginationResponse(BaseModel):
    page: int
    size: int
    total: int
    total_pages: int
    has_next: bool
    has_prev: bool