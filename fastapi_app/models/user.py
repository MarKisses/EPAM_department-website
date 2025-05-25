from sqlalchemy import Boolean, Column, Integer, String, Text
from sqlalchemy.orm import relationship

from fastapi_app.backend.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    
    bio = Column(Text)
    first_name = Column(String)
    last_name = Column(String)
    is_faculty_member = Column(Boolean, default=False)

    photo_path = Column(String, nullable=True)

    papers = relationship("Paper", back_populates="user")
