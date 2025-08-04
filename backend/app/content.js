// Dados de conteúdo do sistema
const { Content } = require('./models');

const content = [
  new Content(
    1,
    'Lord of Mysteries',
    'A história de Klein Moretti e os caminhos dos Beyonders.',
    'https://i.imgur.com/xyz.png',
    'https://lordofmysteries.fandom.com/wiki/Lord_of_Mysteries'
  ),
  new Content(
    2,
    'Artefatos',
    'Itens místicos e poderosos do universo.',
    'https://i.imgur.com/abc.png',
    'https://lordofmysteries.fandom.com/wiki/Artifacts'
  ),
  new Content(
    3,
    'Sequências',
    'As sequências são níveis de poder dos Beyonders, cada uma com habilidades únicas.',
    'https://i.imgur.com/sequences.png',
    'https://lordofmysteries.fandom.com/wiki/Sequence'
  ),
  new Content(
    4,
    'Deuses Antigos',
    'Entidades supremas que influenciam o mundo e os caminhos místicos.',
    'https://i.imgur.com/gods.png',
    'https://lordofmysteries.fandom.com/wiki/Gods'
  ),
  new Content(
    5,
    'Poções',
    'Poções são usadas para avançar nas sequências e desbloquear poderes.',
    'https://i.imgur.com/potions.png',
    'https://lordofmysteries.fandom.com/wiki/Potion'
  ),
  new Content(
    6,
    'Facções',
    'Diversas organizações disputam artefatos, conhecimento e influência.',
    'https://i.imgur.com/factions.png',
    'https://lordofmysteries.fandom.com/wiki/Factions'
  )
];

module.exports = content;
