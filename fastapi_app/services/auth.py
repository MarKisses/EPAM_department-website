from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi_app.backend.db_depends import get_db
from fastapi_app.models import User
from fastapi_app.schemas import CreateUserSchema
from fastapi_app.settings import settings

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24


def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt_context.hash(password)


async def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = dict(**data)
    expires = datetime.now() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expires})
    return jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)


async def get_user_by_email(db: Annotated[AsyncSession, Depends(get_db)], email: str):
    result = await db.scalar(select(User).where(User.email == email))
    return result


async def authenticate_user(
    db: Annotated[AsyncSession, Depends(get_db)], email: str, password: str
):
    user = await get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            401,
            detail="Invalid authentification credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("id")
        email: str = payload.get("email")
        first_name: str = payload.get("first_name")
        last_name: str = payload.get("last_name")
        is_faculty_member: str = payload.get("is_faculty_member")
        expires: str = payload.get("exp")
        if email is None or user_id is None:
            raise HTTPException(401, detail="Could not validate user")
        if expires is None:
            raise HTTPException(400, detail="No access token supplied")
        if datetime.now() > datetime.fromtimestamp(expires):
            raise HTTPException(403, detail="Token expired!")

        return {
            "id": user_id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "is_faculty_member": is_faculty_member,
        }
    except JWTError:
        raise HTTPException(401, detail="Could not validate user")


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
