import enum

from sqlalchemy import Column, Integer, ForeignKey, Numeric, Enum, Text
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin


class DealStatusEnum(str, enum.Enum):
    SUCCESS = "success"
    PROCESSING = "processing"
    CANCELLED = "cancelled"


class Deal(Base, TimeStampMixin):
    __tablename__ = "deals"
    id = Column(Integer, primary_key=True, autoincrement=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="SET NULL"), nullable=True)
    deal_sum = Column(Numeric(16, 2))
    status = Column(Enum(DealStatusEnum), default=DealStatusEnum.PROCESSING)
    # lead = relationship("Lead", back_populates="deals")


class DealComment(Base, TimeStampMixin):
    __tablename__ = "deal_comments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    deal_id = Column(Integer, ForeignKey("deals.id", ondelete="CASCADE"))
    comment = Column(Text)
