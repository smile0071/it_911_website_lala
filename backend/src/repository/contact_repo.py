from sqlalchemy import select

from models.contact import Contact
from repository.base_repo import BaseRepository


class ContactRepository(BaseRepository):
    async def create(
            self,
            full_name,
            email,
            phone,
            lead_id=None
    ):
        contact = Contact(full_name=full_name, email=email, phone=phone, lead_id=lead_id)
        self.db.add(contact)
        await self.db.commit()
        await self.db.refresh(contact)
        return contact

    async def update(
            self,
            contact: Contact
    ):
        self.db.add(contact)
        await self.db.commit()

    async def delete(
            self,
            contact: Contact
    ):
        await self.db.delete(contact)
        await self.db.commit()

    async def get_by_id(
            self,
            contact_id: int
    ):
        result = await self.db.execute(
            select(Contact).where(Contact.id == contact_id)
        )
        return result.scalar_one_or_none()

    async def list(
            self
    ):
        result = await self.db.execute(
            select(Contact)
        )
        return result.scalars().all()
