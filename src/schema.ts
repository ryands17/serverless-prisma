import * as path from 'path'
import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType, queryType } from '@nexus/schema'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
  },
})

const Query = queryType({
  definition(t) {
    t.crud.users()
    t.crud.user()
  },
})

export const schema = makeSchema({
  types: [User, Query],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: path.join(__dirname, 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
