from sqlalchemy import Column, Integer, String, ForeignKey

from models.base import Base
from models.mixins import TimeStampMixin


class Company(Base, TimeStampMixin):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    deal_id = Column(Integer, ForeignKey('deals.id', ondelete="SET NULL"), nullable=True)
