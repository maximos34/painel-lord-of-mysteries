import requests
from bs4 import BeautifulSoup, Tag
from .models import Content
import random
from typing import List

def improve_text(text: str) -> str:
    """
    Melhora o texto removendo repetições, embaralhando frases, destacando palavras-chave e nomes próprios.
    """
    sentences = [s.strip() for s in text.split('.') if len(s.strip()) > 30]
    unique = list(dict.fromkeys(sentences))
    random.shuffle(unique)
    improved = '. '.join(unique[:15])
    keywords = ['mystery', 'beyonder', 'pathway', 'sequence', 'artifact', 'god', 'potion', 'control', 'power']
    for kw in keywords:
        improved = improved.replace(kw, f'**{kw.upper()}**')
    words = improved.split()
    improved = ' '.join([
        f'<span class="text-lotm-accent">{w}</span>' if w.istitle() and len(w) > 3 else w
        for w in words
    ])
    return improved + '.'

def extract_images(soup: BeautifulSoup) -> List[str]:
    """
    Extrai URLs de imagens relevantes do HTML, priorizando alta resolução e evitando logos/banners/icons.
    """
    images: List[str] = []
    for img in soup.find_all('img'):
        if isinstance(img, Tag):
            src = img.attrs.get('src')
            if isinstance(src, str) and src.startswith('http') and not any(x in src for x in ['logo', 'banner', 'icon']):
                if any(x in src for x in ['600', '800', 'original']):
                    images.insert(0, src)
                else:
                    images.append(src)
    return images[:12]

def extract_title_and_description(soup: BeautifulSoup) -> str:
    """
    Extrai título, descrição e links relevantes do HTML.
    """
    title = soup.title.string.strip() if soup.title and soup.title.string else ''
    description = ''
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    if isinstance(desc_tag, Tag):
        description = str(desc_tag.attrs.get('content', '')).strip()
    links: List[str] = []
    for a in soup.find_all('a'):
        if isinstance(a, Tag):
            href = a.attrs.get('href')
            if isinstance(href, str) and href.startswith('http') and 'lordofthemysteries' in href:
                links.append(href)
    links_str = '\nLinks relevantes:\n' + '\n'.join(links[:8]) if links else ''
    return f'Título: {title}\nDescrição: {description}\n{links_str}\n'

import threading
import time

def run_ai_scraper():
    """
    Executa scraping automático em múltiplas fontes, salva conteúdo, imagens e links.
    """
    sources = [
        # Lord of Mysteries
        "https://lordofthemysteries.fandom.com/wiki/Lord_of_the_Mysteries_Wiki",
        "https://en.wikipedia.org/wiki/Lord_of_the_Mysteries",
        # Steampunk
        "https://en.wikipedia.org/wiki/Steampunk",
        "https://steampunk.fandom.com/wiki/Steampunk_Wiki",
        # Misticismo
        "https://en.wikipedia.org/wiki/Mysticism",
        "https://occult-world.com/victorian-mysticism/",
        # Época Vitoriana
        "https://en.wikipedia.org/wiki/Victorian_era",
        "https://victorian-era.fandom.com/wiki/Victorian_Era_Wiki",
        # Anime
        "https://myanimelist.net/anime/38304/Lord_of_Mysteries",
        "https://www.anime-planet.com/anime/lord-of-mysteries"
    ]
    for url in sources:
        try:
            resp = requests.get(url, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
            text = soup.get_text()
            improved = improve_text(text)
            images = extract_images(soup)
            meta = extract_title_and_description(soup)
            final_text = meta + improved
            Content.save(url=url, text=final_text, images=images)
        except Exception as e:
            Content.save(url=url, text=f"Erro: {str(e)}", images=[])

# Executa o scraper automaticamente a cada 5 minutos
def start_auto_scraper():
    """
    Inicia thread para executar o scraper automaticamente a cada 5 minutos.
    """
    def loop():
        while True:
            run_ai_scraper()
            time.sleep(300)
    t = threading.Thread(target=loop, daemon=True)
    t.start()
