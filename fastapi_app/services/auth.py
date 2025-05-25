from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select

from fastapi_app.backend.db_depends import get_db
from fastapi_app.backend.utils.security import (
    create_access_token,
    get_password_hash,
    verify_password,
)
from fastapi_app.models import User
from fastapi_app.schemas import CreateUserSchema


async def get_user_by_email(db: Annotated[AsyncSession, Depends(get_db)], email: str):
    result = await db.scalar(select(User).where(User.email == email))
    return result


async def authenticate_user(
    db: Annotated[AsyncSession, Depends(get_db)], email: str, password: str
):
    user = await get_user_by_email(db, email)
    if user and verify_password(password, user.hashed_password):
        return user
    return None


async def register_user(
    db: Annotated[AsyncSession, Depends(get_db)], user_in: CreateUserSchema
):
    await db.execute(
        insert(User).values(
            **user_in.model_dump(exclude={"password"}),
            hashed_password=get_password_hash(user_in.password),
            is_faculty_member=False,
        )
    )
    await db.commit()
    # await db.refresh(user)
    return True
