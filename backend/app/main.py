from fastapi import FastAPI, BackgroundTasks
from app.ai_service import run_ai_scraper
from app.models import Content
from app.schemas import ContentOut
from app.tasks import schedule_ai_update

app = FastAPI(title="Lord of Mysteries SaaS API")

@app.on_event("startup")
def startup_event():
    schedule_ai_update()

@app.get("/api/content", response_model=list[ContentOut])
def get_content():
    return Content.get_all()

@app.post("/api/trigger")
def trigger_ai(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_ai_scraper)
    return {"status": "IA disparada"}

# Documentação automática disponível em /docs
