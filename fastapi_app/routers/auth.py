from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from passlib.context import CryptContext
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi_app.backend.db_depends import get_db
from fastapi_app.models import user
from fastapi_app.schemas import CreateUserSchema
from fastapi_app.settings import settings
from fastapi_app.services.auth import register_user, authenticate_user

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(
    db: Annotated[AsyncSession, Depends(get_db)], user_in: CreateUserSchema
):
    # ! Strange approach as authenticate_user checks email and password.
    # ! Not just email uniqness
    existing = await authenticate_user(db, user_in.email, user_in.password)
    if existing:
        print(existing)
        raise HTTPException(status_code=400, detail="User already exists")
    success = await register_user(db, user_in)
    return {"status_code": status.HTTP_201_CREATED, "transaction": "Successful"}

