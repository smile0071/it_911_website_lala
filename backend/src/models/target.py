import uuid

from sqlalchemy import Column, String, UUID

from models.base import Base
from models.mixins import TimeStampMixin


class TargetCompany(Base, TimeStampMixin):
    __tablename__ = 'target_companies'
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(512), nullable=False)