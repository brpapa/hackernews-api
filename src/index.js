const { GraphQLServer, PubSub } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')

const db = new PrismaClient()
const pubsub = new PubSub() // for GraphQL subscriptions

const server = new GraphQLServer({
  typeDefs: `src/schema.graphql`,
  /*
    resolvers: {
      TYPE_NAME {
        FIELD_NAME: function FIELD_RESOLVER(parent, args, context, info) { return FIELD_TYPE }
      }
    }
  */
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Link,
    User,
    Vote
  },
  // torna a http request, a instancia do prisma e pubsub acessável por todos os resolvers
  context: (request) => ({ ...request, db, pubsub }),
})

server.start(() => `Server is running on https://localhost:4000`)
