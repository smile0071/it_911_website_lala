from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_current_user, get_db
from models.user import User
from schemas.contact import ContactRequest
from services.contact_manager import ContactManager

router = APIRouter(
    tags=["contact"],
    prefix="/contact"
)


@router.post("/")
async def create_contact(
        request: ContactRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = ContactManager(db)
    contact = await manager.create(request)
    return contact


@router.get("/")
async def get_contacts(
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = ContactManager(db)
    contacts = await manager.list()
    return contacts


@router.get("/{contact_id}")
async def get_contact(
        contact_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = ContactManager(db)
    contact = await manager.get_by_id(contact_id)
    return contact


@router.put("/{contact_id}")
async def update_contact(
        contact_id: int,
        request: ContactRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = ContactManager(db)
    await manager.update(contact_id, request)


@router.delete("/{contact_id}")
async def delete_contact(
        contact_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = ContactManager(db)
    await manager.delete(contact_id)
