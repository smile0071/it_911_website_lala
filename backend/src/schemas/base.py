from enum import Enum


class Sort(str, Enum):
    asc = "created_at:asc"
    desc = "created_at:desc"