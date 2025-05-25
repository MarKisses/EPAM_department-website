from pydantic import BaseModel, EmailStr, ConfigDict
from .paper import PaperSchema

class CreateUserSchema(BaseModel):
    email: EmailStr
    password: str

    bio: str | None = None
    first_name : str
    last_name: str
    

class UserSchema(BaseModel):
    id: int
    email: EmailStr

    bio: str | None
    first_name: str
    last_name: str
    is_faculty_member: bool

    papers: list[PaperSchema]

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: EmailStr | None = None