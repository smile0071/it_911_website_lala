from sqlalchemy import Column, Integer, String, ForeignKey

from models.base import Base
from models.mixins import TimeStampMixin


class Contact(Base, TimeStampMixin):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="SET NULL"), nullable=True)
