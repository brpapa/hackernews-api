const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./../utils')

module.exports = {
  signUp: async (_, args, { db }) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await db.user.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return { token, user }
  },
  login: async (_, { email, password }, { db }) => {
    const user = await db.user.findOne({ where: { email } })
    if (!user) throw new Error('User not registered')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Invalid password')

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return { token, user }
  },
  // post
  addLink: (_, args, { request, db, pubsub }) => {
    const userId = getUserId(request)

    const newLink = db.link.create({
      data: {
        ...args,
        // linka ao User já cadastrado com id = userId
        postedBy: { connect: { id: userId } },
      },
    })
    pubsub.publish('NEW_LINK', newLink)

    return newLink
  },
  updateLink: async (_, args, { db }) => {
    const id = Number(args.id)
    const { id: __, ...data } = args

    const link = await db.link.update({ where: { id }, data })
    return link
  },
  deleteLink: async (_, args, { db }) => {
    const id = Number(args.id)

    const link = await db.link.delete({ where: { id } })
    return link
  },
  addVote: async (_, args, { request, db, pubsub }) => {
    const linkId = Number(args.linkId)
    const userId = getUserId(request)

    // proteção contra votos duplos do mesmo usuário
    const vote = await db.vote.findOne({
      where: {
        linkId_userId: {
          linkId,
          userId,
        },
      },
    })

    if (Boolean(vote)) throw new Error(`You already voted for link: ${linkId}`)

    const newVote = db.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    })
    pubsub.publish("NEW_VOTE", newVote)

    return newVote
  },
}
