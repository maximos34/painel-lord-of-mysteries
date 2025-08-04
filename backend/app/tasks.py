import threading
import time
from app.ai_service import run_ai_scraper

# Agendamento simples: roda a cada 5 minutos

def schedule_ai_update():
    def loop():
        while True:
            run_ai_scraper()
            time.sleep(300)
    t = threading.Thread(target=loop, daemon=True)
    t.start()
