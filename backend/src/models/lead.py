import enum

from sqlalchemy import Column, Integer, String, Enum, ForeignKey, UUID, Index

from models.base import Base
from models.mixins import TimeStampMixin


class StatusEnum(str, enum.Enum):
    NEW = "new"
    PROCESSING = "processing"
    CANCELLED = "cancelled"
    DEAL = "deal"


class Lead(Base, TimeStampMixin):
    __tablename__ = 'leads'
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.NEW, index=True)
    company_name = Column(String(512), nullable=False)
    company_info = Column(String(2048), nullable=False)
    target_id = Column(UUID, ForeignKey("target_companies.id", ondelete="SET NULL"), nullable=True, index=True)

    __table_args__ = (
        Index(
            'ix_leads_status_new',
            'status',
            postgresql_where=(status == StatusEnum.NEW)
        ),
        Index(
            'ix_leads_status_processing',
            'status',
            postgresql_where=(status == StatusEnum.PROCESSING)
        ),

    )


class LeadComment(Base, TimeStampMixin):
    __tablename__ = 'lead_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lead_id = Column(Integer, ForeignKey('leads.id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    comment = Column(String(2048), nullable=False)
