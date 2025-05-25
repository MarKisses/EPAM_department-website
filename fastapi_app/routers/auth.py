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
from fastapi_app.models import User
from fastapi_app.schemas import (
    CreateUserSchema,
    UserSchema,
    UserTokenSchema,
    TokenSchema,
)
from fastapi_app.settings import settings
from fastapi_app.services.auth import (
    register_user,
    authenticate_user,
    create_access_token,
    get_current_user,
)

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token")
async def login(
    db: Annotated[AsyncSession, Depends(get_db)],
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> TokenSchema:
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(401, detail="Could not validate user")

    schema_user = UserTokenSchema.model_validate(obj=user, from_attributes=True)
    token = await create_access_token(schema_user.model_dump())
    return {"access_token": token, "token_type": "Bearer"}


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(
    db: Annotated[AsyncSession, Depends(get_db)], user_in: CreateUserSchema
):
    # ! Strange approach as authenticate_user checks email and password.
    # ! Not just email uniqness
    existing = await authenticate_user(db, user_in.email, user_in.password)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    success = await register_user(db, user_in)
    if not success:
        raise HTTPException(401, detail="Registration failed due to an unexpected error")


@router.get("/me")
async def get_me(user: User = Depends(get_current_user)) -> UserTokenSchema:
    return user
