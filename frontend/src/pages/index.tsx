
import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch('https://painel-lord-of-mysteries-458y.vercel.app/api/content')
      .then(res => res.json())
      .then(setContent);
  }, []);

  function extractLinks(text: string): string[] {
    const match = text.match(/Links relevantes:\n([\s\S]*?)\n/);
    if (!match) return [];
    return match[1].split('\n').filter(l => l.startsWith('http'));
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-[#2e1f1c] to-[#1a1a2e] text-gray-100 font-serif">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181c] border-r border-yellow-900 flex flex-col justify-between py-8 px-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 tracking-wide">Painel LOM</h2>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-yellow-300 hover:text-yellow-500 font-medium transition-colors">
              <span className="material-icons">dashboard</span> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 text-yellow-300 hover:text-yellow-500 font-medium transition-colors">
              <span className="material-icons">library_books</span> Biblioteca
            </a>
            <a href="#" className="flex items-center gap-3 text-yellow-300 hover:text-yellow-500 font-medium transition-colors">
              <span className="material-icons">star</span> Favoritos
            </a>
            <a href="#" className="flex items-center gap-3 text-yellow-300 hover:text-yellow-500 font-medium transition-colors">
              <span className="material-icons">whatshot</span> Em Alta
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <img src="https://static.wikia.nocookie.net/lordofthemysteries/images/1/1a/Lord_of_the_Mysteries_Cover.jpg" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-yellow-700" />
          <div>
            <div className="text-yellow-300 font-bold">Klein Moretti</div>
            <div className="text-xs text-gray-400">Nível 42</div>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col">
        {/* Cabeçalho */}
        <header className="flex items-center justify-between px-10 py-8 border-b border-yellow-900 bg-[#23232e] shadow-lg">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-yellow-200 drop-shadow-lg steampunk-title">Lord of Mysteries <span className="text-yellow-500">SaaS</span></h1>
            <p className="text-gray-300 mt-2">Organize e explore conteúdos místicos, steampunk e vitorianos.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-yellow-700 hover:bg-yellow-600 text-yellow-100 px-4 py-2 rounded-lg font-bold shadow">Nova Lista</button>
            <button className="bg-gray-800 hover:bg-gray-700 text-yellow-300 px-4 py-2 rounded-lg font-bold shadow">Comunidade</button>
          </div>
        </header>

        {/* Cards de conteúdo */}
        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {content.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <h2 className="text-2xl text-yellow-400 font-bold mb-4">Nenhum conteúdo disponível</h2>
              <p className="text-lg text-gray-300">Aguarde enquanto os dados são carregados ou tente novamente mais tarde.</p>
            </div>
          ) : (
            content.map((item: any, idx: number) => {
              const links = extractLinks(item.text);
              return (
                <div key={idx} className="bg-gradient-to-tr from-[#2e1f1c] via-gray-800 to-[#1a1a2e] p-8 rounded-2xl shadow-2xl border border-yellow-900 flex flex-col gap-4 steampunk-card relative overflow-hidden">
                  <span className="absolute top-2 right-4 text-yellow-700 text-xs italic opacity-70 select-none">Misticismo & Steampunk</span>
                  <strong className="block text-yellow-400 font-mono mb-2 underline decoration-yellow-700 decoration-2">{item.url}</strong>
                  <p className="mt-2 whitespace-pre-line text-base md:text-lg font-light text-yellow-100 steampunk-text" dangerouslySetInnerHTML={{ __html: item.text.slice(0, 700) + '...' }} />
                  {item.images && item.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center items-start">
                      {item.images.slice(0, 2).map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Imagem ${i + 1} de ${item.url}`}
                          className="w-32 h-32 object-cover rounded-lg border-2 border-yellow-900 shadow-md bg-gray-700 steampunk-img"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                  {links.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-yellow-300 mb-2">Links relevantes:</h3>
                      <ul className="list-disc ml-6">
                        {links.map((l, i) => (
                          <li key={i}>
                            <a href={l} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline break-all hover:text-yellow-400 transition-colors duration-200">{l}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* Chat/comunidade (placeholder) */}
      <aside className="w-80 bg-[#23232e] border-l border-yellow-900 flex flex-col py-8 px-6 shadow-xl">
        <h2 className="text-xl font-bold text-yellow-400 mb-6">Comunidade</h2>
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg p-4 text-gray-200 shadow">GameMaster42: Alguém quer jogar Valorant?</div>
          <div className="bg-gray-800 rounded-lg p-4 text-gray-200 shadow">ProGamer_2024: Los Santos Legend - Grand Theft Auto V</div>
          <div className="bg-gray-800 rounded-lg p-4 text-gray-200 shadow">RetroGamer: Que jogo vocês recomendam para o fim de semana?</div>
        </div>
        <div className="mt-6 flex gap-2">
          <input type="text" className="flex-1 bg-gray-900 text-gray-100 rounded-lg px-4 py-2 border border-yellow-700 focus:outline-none" placeholder="Digite sua mensagem..." />
          <button className="bg-yellow-700 hover:bg-yellow-600 text-yellow-100 px-4 py-2 rounded-lg font-bold shadow">Enviar</button>
        </div>
      </aside>
    </div>
  );
}
