/*
Resolvers for subscription are slightly different than the ones for queries and mutation:
  - Rather than returning any data directly, they return an AsyncIterator which subsequently is used by the GraphQL server to push the event data to the client.
  - Subscription resolvers are wrapped inside an object and need to be provided as the value for a subscribe field. You also need to provide another field called resolve that actually returns the data from the data emitted by the AsyncIterator.
*/
module.exports = {
  newLink: {
    subscribe: (_, {}, { pubsub }) => {
      return pubsub.asyncIterator('NEW_LINK')
    },
    resolve: (payload) => payload,
  },
  newVote: {
    subscribe: (_, {}, { pubsub }) => {
      return pubsub.asyncIterator('NEW_VOTE')
    },
    resolve: (payload) => payload,
  },
}
