import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch('https://painel-lord-of-mysteries-458y.vercel.app/api/content')
      .then(res => res.json())
      .then(setContent);
  }, []);

  // Extrai links do texto (se presentes)
  function extractLinks(text: string): string[] {
    const match = text.match(/Links relevantes:\n([\s\S]*?)\n/);
    if (!match) return [];
    return match[1].split('\n').filter(l => l.startsWith('http'));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-[#2e1f1c] to-[#1a1a2e] text-gray-100 p-8 font-serif">
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-400 border-4 border-yellow-800 shadow-lg flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff8e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 2v2m0 16v2m8-10h2M2 12H4m15.07-7.07l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93L6.34 6.34" />
            <circle cx="12" cy="12" r="6" />
          </svg>
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-200 drop-shadow-lg steampunk-title">Lord of Mysteries <span className="text-yellow-500">SaaS</span></h1>
      </div>
      {content.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-2xl text-yellow-400 font-bold mb-4">Nenhum conteúdo disponível</h2>
          <p className="text-lg text-gray-300">Aguarde enquanto os dados são carregados ou tente novamente mais tarde.</p>
        </div>
      ) : (
        <ul className="space-y-8">
          {content.map((item: any, idx: number) => {
            const links = extractLinks(item.text);
            return (
              <li key={idx} className="bg-gradient-to-tr from-[#2e1f1c] via-gray-800 to-[#1a1a2e] p-6 rounded-xl shadow-xl border border-yellow-900 flex flex-col md:flex-row gap-6 steampunk-card relative overflow-hidden">
                <span className="absolute top-2 right-2 text-yellow-700 text-xs italic opacity-70 select-none">Misticismo & Época Vitoriana</span>
                <div className="flex-1">
                  <strong className="block text-yellow-400 font-mono mb-2 underline decoration-yellow-700 decoration-2">{item.url}</strong>
                  <p className="mt-2 whitespace-pre-line text-base md:text-lg font-light text-yellow-100 steampunk-text" dangerouslySetInnerHTML={{ __html: item.text.slice(0, 700) + '...' }} />
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
                {item.images && item.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center items-start md:w-1/3">
                    {item.images.slice(0, 4).map((img: string, i: number) => (
                      <div key={i} className="relative w-32 h-32">
                        <img
                          src={img}
                          alt={`Imagem ${i + 1} de ${item.url}`}
                          className="w-full h-full object-cover rounded-lg border-2 border-yellow-900 shadow-md bg-gray-700 steampunk-img"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-2 text-xs text-yellow-700 bg-gray-900 bg-opacity-60 px-2 py-0.5 rounded">Arte LOM</span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
