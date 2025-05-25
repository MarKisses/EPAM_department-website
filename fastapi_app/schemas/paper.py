from pydantic import BaseModel

class CreatePaperSchema(BaseModel):
    name: str
    description: str


class PaperSchema(BaseModel):
    id: int
    user_id: int
    name: str
    description: str
    pdf_path: str | None
    