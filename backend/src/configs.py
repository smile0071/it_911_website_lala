import os

import pytz

from dotenv import load_dotenv

load_dotenv()

TIMEZONE = pytz.timezone('Asia/Tashkent')

DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")

SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TIME = os.getenv("ACCESS_TIME")
REFRESH_TIME = os.getenv("REFRESH_TIME")
