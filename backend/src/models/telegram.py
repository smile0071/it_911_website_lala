from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from models.base import Base
from models.mixins import TimeStampMixin


class TelegramUser(Base, TimeStampMixin):
    __tablename__ = "telegram_users"
    user_id = Column(Integer, primary_key=True)
    last_interaction = Column(DateTime, default=datetime.now)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True, default=None)
    lang = Column(String(2), nullable=False, default="ru")