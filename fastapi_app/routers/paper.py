from typing import Annotated


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, update, delete, insert
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi_app.backend.db_depends import get_db
from fastapi_app.models import Paper
from fastapi_app.schemas.paper import PaperSchema, CreatePaperSchema
from fastapi_app.services.auth import get_user_by_email, authenticate_user


router = APIRouter(prefix="/papers", tags=["papers"])


@router.get("/")
async def get_all_papers(
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[PaperSchema]:
    papers = await db.scalars(select(Paper))
    return papers.all()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_new_paper(
    db: Annotated[AsyncSession, Depends(get_db)],
    create_paper: CreatePaperSchema,
    get_user: Annotated[dict, Depends(authenticate_user)],
):
    # await db.execute(insert(Paper).values(create_paper.model_dump()))
    return {"ok": "ok"}
