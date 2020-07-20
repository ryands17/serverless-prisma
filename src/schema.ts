import * as path from 'path'
import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType, queryType, mutationType } from '@nexus/schema'
import { Context } from './context'

const nexusPrisma = nexusPrismaPlugin({
  experimentalCRUD: true,
  prismaClient: (ctx: Context) => ctx.prisma,
})

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

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
  },
})

export const schema = makeSchema({
  types: [User, Query, Mutation],
  plugins: [nexusPrisma],
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
