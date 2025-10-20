import uuid

from sqlalchemy import select

from models import Click
from repository.base_repo import BaseRepository


class ClickRepository(BaseRepository):
    async def create(
            self,
            target_id: uuid.UUID
    ):
        print(
            "Repo"
        )
        click = Click(target_id=target_id)
        self.db.add(click)
        await self.db.commit()
        await self.db.refresh(click)
        return click
    async def get_clicks(self, target_id: uuid.UUID):
        result = await self.db.execute(
            select(Click).where(Click.target_id == target_id)
        )
        return result.scalars().all()