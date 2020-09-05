module.exports = {
  // sem necessidade, pois o GraphQL já infere
  // id: (user) => { return user.id },
  // name: (user) => { return user.name },
  // email: (user) => { return user.email },

  // necessário, pois não são fields de User do tipo escalar
  links: async (user, _, { db }) => {
    return await db.user.findOne({ where: { id: user.id } }).links()
  },
}
