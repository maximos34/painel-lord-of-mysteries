from pydantic import BaseModel

class ContentOut(BaseModel):
    url: str
    text: str
    images: list[str] = []
