import { ApolloServer } from 'apollo-server-lambda'
import { schema } from './schema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: ({ event }) => ({
    headers: event.headers,
    ...createContext(),
  }),
  playground: {
    endpoint: '/dev/graphql',
  },
  tracing: true,
})

export const handler = server.createHandler()

console.log(`🚀 Server ready!`)
