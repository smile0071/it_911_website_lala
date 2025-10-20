from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from configs import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME


DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = async_sessionmaker(engine, expire_on_commit=False)

