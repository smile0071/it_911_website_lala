from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from repository.contact_repo import ContactRepository
from schemas.contact import ContactRequest


class ContactManager:
    def __init__(self, db: AsyncSession):
        self.repo = ContactRepository(db)

    async def create(
            self,
            request: ContactRequest
    ):
        contact = await self.repo.create(**request.model_dump())
        return contact

    async def update(
            self,
            contact_id,
            request: ContactRequest
    ):
        contact = await self.repo.get_by_id(contact_id)
        if not contact:
            raise NotFound(f"Contact {contact_id} not found")
        contact.full_name = request.full_name
        contact.email = request.email
        contact.phone = request.phone
        contact.lead_id = request.lead_id
        await self.repo.update(contact)

    async def delete(
            self,
            contact_id

    ):
        contact = await self.repo.get_by_id(contact_id)
        if not contact:
            raise NotFound(f"Contact {contact_id} not found")
        await self.repo.delete(contact)

    async def get_by_id(
            self,
            contact_id
    ):
        contact = await self.repo.get_by_id(contact_id)
        if not contact:
            raise NotFound(f"Contact {contact_id} not found")
        return contact

    async def list(
            self
    ):
        contacts = await self.repo.list()
        return
