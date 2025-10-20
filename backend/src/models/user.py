from sqlalchemy import Column, String, BigInteger, Boolean

from models.base import Base
from models.mixins import TimeStampMixin


class User(Base, TimeStampMixin):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    username = Column(String(320), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_superuser = Column(Boolean, nullable=False, default=False)
