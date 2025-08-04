from fastapi import FastAPI, BackgroundTasks
from app.ai_service import run_ai_scraper
from app.models import Content
from app.schemas import ContentOut
from app.tasks import schedule_ai_update

app = FastAPI(title="Lord of Mysteries SaaS API")

@app.on_event("startup")
def startup_event():
    # Adiciona dados de exemplo para garantir conteúdo no frontend
    from app.models import Content
    Content.save(
        url="https://lordofthemysteries.fandom.com/wiki/Lord_of_the_Mysteries_Wiki",
        text="Título: Lord of the Mysteries\nDescrição: Wiki oficial do universo.\nLinks relevantes:\nhttps://lordofthemysteries.fandom.com/wiki/Lord_of_the_Mysteries_Wiki\n",
        images=[
            "https://static.wikia.nocookie.net/lordofthemysteries/images/1/1a/Lord_of_the_Mysteries_Cover.jpg",
            "https://static.wikia.nocookie.net/lordofthemysteries/images/2/2b/Steampunk_Art.jpg",
            "https://painel-lord-of-mysteries-458y.vercel.app/static/image21.png"
        ]
    )
    Content.save(
        url="https://en.wikipedia.org/wiki/Steampunk",
        text="Título: Steampunk\nDescrição: Estilo literário e visual.\nLinks relevantes:\nhttps://en.wikipedia.org/wiki/Steampunk\n",
        images=[
            "https://upload.wikimedia.org/wikipedia/commons/3/3a/Steampunk_goggles.jpg"
        ]
    )
    Content.save(
        url="https://en.wikipedia.org/wiki/Mysticism",
        text="Título: Misticismo\nDescrição: Conceitos e práticas místicas.\nLinks relevantes:\nhttps://en.wikipedia.org/wiki/Mysticism\n",
        images=[
            "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mysticism_symbol.jpg"
        ]
    )

@app.get("/api/content", response_model=list[ContentOut])
def get_content():
    return Content.get_all()

@app.post("/api/trigger")
def trigger_ai(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_ai_scraper)
    return {"status": "IA disparada"}

# Documentação automática disponível em /docs
