module.exports = {
  link: async (vote, {}, { db }) => {
    return await db.vote.findOne({ where: { id: vote.id } }).link()
  },
  user: async (vote, {}, { db }) => {
    return await db.vote.findOne({ where: { id: vote.id } }).user()
  },
}
