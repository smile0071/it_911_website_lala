import asyncio

from db.session import async_session
from filters.lead_filter import LeadFilter
from filters.paginator import Paginator
from filters.sorter import Sorter
from models import Lead
from repository.lead_repo import LeadRepository
from services.lead_manager import LeadManager


async def main():
    async with async_session() as session:
        manager = LeadRepository(session)
        result = await manager.list(
            LeadFilter(
                status=["NEW", "PROCESSING"]
            ),
            Sorter(
                sorts=(
                    (Lead.created_at, "desc"),
                )
            ),
            Paginator(

            )
        )
        print(result)

if __name__ == "__main__":
    asyncio.run(main())