export async function getContent() {
  const res = await fetch('http://localhost:8000/api/content');
  return res.json();
}
