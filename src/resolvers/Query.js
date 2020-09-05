module.exports = {
  info: () => {
    return 'This is the API of a Hackernews clone!'
  },
  feed: async (_, args, { db }) => {
    const { filter, skip, take, orderBy } = args

    const where = filter
      ? {
          OR: [
            { url: { contains: filter } },
            { description: { contains: filter } },
          ],
        }
      : {}

    const links = await db.link.findMany({ where, skip, take, orderBy })
    const count = await db.link.count({ where })

    return { links, count }
  },
  link: async (_, args, { db }) => {
    const id = Number(args.id)

    const link = await db.link.findOne({ where: { id } })
    return link
  }
}
