import uuid
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from filters.lead_filter import LeadFilter
from models.lead import StatusEnum
from repository.contact_repo import ContactRepository
from repository.lead_repo import LeadRepository, LeadCommentRepository
from schemas.base import Sort
from schemas.lead import (
    LeadRequest,
    LeadResponse,
    LeadCommentRequest,
    LeadCommentResponse,
    ListLeadResponse,
    ListLeadCommentResponse, ChangeStatusRequest
)


class LeadManager:
    def __init__(
            self,
            db: AsyncSession
    ):
        self.repo = LeadRepository(db)
        self.comment_repo = LeadCommentRepository(db)
        self.contact_repo = ContactRepository(db)

    async def create_lead(
            self,
            request: LeadRequest,
            target_id: uuid.UUID = None
    ):
        request.target_id = target_id
        lead = await self.repo.create(**request.model_dump())
        await self.contact_repo.create(
            full_name=lead.full_name,
            email=lead.email,
            phone=lead.phone,
            lead_id=lead.id,
        )
        return LeadResponse.model_validate(lead)

    async def update_lead(
            self,
            lead_id: int,
            request: LeadRequest
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")

        lead.full_name = request.full_name
        lead.email = request.email
        lead.phone = request.phone
        lead.status = request.status
        lead.company_name = request.company_name
        lead.company_info = request.company_info
        lead.target_id = request.target_id

        await self.repo.update(lead)

    async def delete_lead(
            self,
            lead_id: int,
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        await self.repo.delete(lead)

    async def get_lead(
            self,
            lead_id: int,
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        return LeadResponse.model_validate(lead)

    async def get_leads(
            self,
            status: list[StatusEnum] = None,
            target_id: uuid.UUID = None,
            created_from: datetime = None,
            created_to: datetime = None,
            sort_order: Sort = Sort.desc
    ):
        filters = LeadFilter(
            status,
            target_id,
            created_from,
            created_to
        )
        leads = await self.repo.list(
            filters
        )
        return ListLeadResponse(
            leads=[
                LeadResponse.model_validate(lead)
                for lead in leads
            ]
        )

    async def add_comment(
            self,
            lead_id: int,
            user_id: int,
            request: LeadCommentRequest
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        comment = await self.comment_repo.create(**request.model_dump(), user_id=user_id)
        return LeadCommentResponse.model_validate(comment)

    async def remove_comment(
            self,
            lead_id: int,
            lead_comment_id: int,
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        lead_comment = await self.comment_repo.get_by_id(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        await self.comment_repo.delete(lead_comment)

    async def get_comments(
            self,
            lead_id: int,
            sort_order: Sort = Sort.desc
    ):
        comments = await self.comment_repo.list(
            lead_id=lead_id,
            sort_order="desc" if Sort.desc else "asc"
        )
        return ListLeadCommentResponse.model_validate(comments)

    async def get_comment_for(
            self,
            lead_id: int,
            lead_comment_id: int,
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_comment_id} not found")
        lead_comment = await self.comment_repo.get_by_id(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        return LeadCommentResponse.model_validate(lead_comment)

    async def update_comment_for(
            self,
            lead_id: int,
            lead_comment_id: int,
            user_id: int,
            request: LeadCommentRequest
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_comment_id} not found")
        lead_comment = await self.comment_repo.get_by_id(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        lead_comment.comment = request.comment
        lead_comment.user_id = user_id
        await self.comment_repo.update(lead_comment)

    async def update_status(
            self,
            lead_id: int,
            request: ChangeStatusRequest
    ):
        lead = await self.repo.get_by_id(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        lead.status = request.status
        await self.repo.update(lead)
