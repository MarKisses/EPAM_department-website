from pydantic import BaseModel, EmailStr, ConfigDict
from .paper import PaperSchema


class CreateUserSchema(BaseModel):
    email: EmailStr
    password: str

    bio: str | None = None
    first_name: str
    last_name: str


class UserSchema(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    bio: str | None
    is_faculty_member: bool
    papers: list[PaperSchema] | None = None

    class Config:
        from_attributes = True


class UserTokenSchema(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    is_faculty_member: bool

    class Config:
        from_attributes = True


class TokenSchema(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: EmailStr | None = None
