import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8">
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-lotm-accent mb-2">Lord of Mysteries Dashboard</h1>
          <p className="text-lg text-gray-300">Painel de conteúdos, imagens e links coletados automaticamente pela IA.</p>
        </div>
        <nav className="mt-6 md:mt-0 flex gap-4">
          <a href="/" className="px-4 py-2 rounded bg-lotm-primary text-white hover:bg-lotm-accent transition">Home</a>
          <a href="/dashboard" className="px-4 py-2 rounded bg-lotm-accent text-white hover:bg-lotm-primary transition">Dashboard</a>
        </nav>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center text-xl text-lotm-accent">Carregando...</div>
        ) : content.length === 0 ? (
          <div className="col-span-3 text-center text-xl text-red-400">Nenhum conteúdo encontrado.</div>
        ) : (
          content.map((item: any, idx: number) => {
            const links = (item.text.match(/Links relevantes:\n([\s\S]*?)\n/)?.[1] || '').split('\n').filter(l => l.startsWith('http'));
            return (
              <div key={idx} className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
                <div>
                  <strong className="block text-lotm-accent text-lg mb-2">{item.url}</strong>
                  <p className="whitespace-pre-line text-sm md:text-base mb-2" dangerouslySetInnerHTML={{ __html: item.text.slice(0, 700) + '...' }} />
                </div>
                {item.images && item.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center items-start">
                    {item.images.slice(0, 6).map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Imagem ${i + 1} de ${item.url}`}
                        className="w-24 h-24 object-contain rounded border border-lotm-primary bg-gray-700"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                {links.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-base font-bold text-lotm-accent mb-1">Links relevantes:</h3>
                    <ul className="list-disc ml-6">
                      {links.map((l, i) => (
                        <li key={i}>
                          <a href={l} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{l}</a>
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
  );
}
