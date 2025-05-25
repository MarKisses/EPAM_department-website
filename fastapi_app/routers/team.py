from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, update, delete


router = APIRouter(prefix="/team", tags=["team"])


@router.get("/")
async def get_all_staff():
    return {"ok": "success"}
