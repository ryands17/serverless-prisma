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
  introspection: true,
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})

console.log(`🚀 Server ready!`)
