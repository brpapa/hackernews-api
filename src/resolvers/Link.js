module.exports = {
  // sem necessidade, pois o GraphQL já infere
  // id: (link) => { return link.id },
  // url: (link) => { return link.url },
  // description: (link) => { return link.description },

  // necessário, pois não são fields de Link do tipo escalar
  postedBy: async (link, _, { db }) => {
    return await db.link.findOne({ where: { id: link.id } }).postedBy()
  },
  votes: async (link, _, { db }) => {
    return await db.link.findOne({ where: { id: link.id } }).votes()
  }
}
