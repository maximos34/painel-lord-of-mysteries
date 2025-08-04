from typing import List
from app.schemas import ContentOut

# Simulação de banco de dados em memória
class Content:
    _db: List[ContentOut] = []

    @classmethod
    def save(cls, url: str, text: str, images: list[str] = []):
        cls._db.append(ContentOut(url=url, text=text, images=images))

    @classmethod
    def get_all(cls) -> List[ContentOut]:
        return cls._db
