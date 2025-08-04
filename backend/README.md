# Backend FastAPI - Lord of Mysteries SaaS

## Instalação
```
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
```

## Execução
```
uvicorn app.main:app --reload
```

## Endpoints
- `GET /api/content` — Retorna textos coletados
- `POST /api/trigger` — Dispara coleta manual
- Documentação automática: `/docs`

## IA
- Scraping de webnovel/anime
- Reescrita de texto (NLP pode ser expandido)
- Coleta de imagens/links (expandir no futuro)
- Armazenamento em memória (pode migrar para banco de dados)
