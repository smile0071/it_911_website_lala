import uuid

from sqlalchemy import select, asc, desc, func

from filters.lead_filter import LeadFilter
from filters.paginator import Paginator
from filters.sorter import Sorter
from models import Lead, LeadComment
from models.lead import StatusEnum
from repository.base_repo import BaseRepository
from repository.query_builder import QueryBuilder


class LeadRepository(BaseRepository):
    async def create(
            self,
            full_name: str,
            email: str,
            phone: str,
            company_name: str,
            company_info: str,
            status: StatusEnum = StatusEnum.NEW,
            target_id: uuid.UUID = None
    ):
        lead = Lead(
            full_name=full_name,
            email=email,
            phone=phone,
            company_name=company_name,
            company_info=company_info,
            target_id=target_id,
            status=status
        )
        self.db.add(lead)
        await self.db.flush()
        await self.db.refresh(lead)
        return lead

    async def list(
            self,
            filters: LeadFilter = None,
            sorter: Sorter = None,
            paginator: Paginator = None,

    ):
        stmt = select(Lead)

        builder = QueryBuilder(
            stmt=stmt,
            db=self.db,
            filters=filters,
            sorter=sorter,
            paginator=paginator,
        )
        stmt = await builder.build()
        result = await self.db.execute(stmt)
        items = result.scalars().all()

        return {
            "items": items,
            "meta": paginator.to_dict()
        }

    async def get_by_id(
            self,
            lead_id: int
    ):
        result = await self.db.execute(
            select(Lead).where(Lead.id == lead_id)
        )
        return result.scalar_one_or_none()

    async def delete(
            self,
            lead: Lead
    ):
        await self.db.delete(lead)
        await self.db.commit()

    async def update(
            self,
            lead: Lead
    ):
        self.db.add(lead)
        await self.db.commit()


class LeadCommentRepository(BaseRepository):
    async def create(
            self,
            comment: str,
            lead: Lead,
            user_id: int
    ):
        comment = LeadComment(
            comment=comment,
            lead_id=lead.id,
            user_id=user_id
        )
        self.db.add(comment)
        await self.db.commit()
        await self.db.refresh(comment)
        return comment

    async def update(
            self,
            comment: LeadComment
    ):
        self.db.add(comment)
        await self.db.commit()
        await self.db.refresh(comment)

    async def delete(
            self,
            comment: LeadComment
    ):
        await self.db.delete(comment)
        await self.db.commit()

    async def get_by_id(
            self,
            lead_comment_id: int
    ):
        result = await self.db.execute(
            select(LeadComment).where(LeadComment.comment_id == lead_comment_id)
        )
        return result.scalar_one_or_none()

    async def list(
            self,
            lead_id: int,
            sort_order: str = "desc"
    ):
        stmt = select(LeadComment).where(LeadComment.lead_id == lead_id).order_by(
            asc(Lead.created_at) if sort_order == "asc" else desc(Lead.created_at)
        )
        result = await self.db.execute(stmt)
        return result.scalars().all()
