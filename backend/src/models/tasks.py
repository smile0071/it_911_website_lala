import enum

from sqlalchemy import Column, Integer, String, DateTime, Enum

from models.base import Base
from models.mixins import TimeStampMixin


class TaskStatusEnum(str, enum.Enum):
    NEW = "new"
    PROCESSING = "processing"
    CANCELLED = "cancelled"


class Task(Base, TimeStampMixin):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    description = Column(String(1024))
    deadline = Column(DateTime)
    status = Column(Enum(TaskStatusEnum), default=TaskStatusEnum.NEW)
