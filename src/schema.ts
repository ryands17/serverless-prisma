import { join } from 'path'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema, objectType, queryType, mutationType } from 'nexus'
import { Context } from './context'

const nexusPrisma = nexusSchemaPrisma({
  experimentalCRUD: true,
  paginationStrategy: 'prisma',
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
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'nexus.ts'),
  },
  contextType: {
    module: join(__dirname, 'types.ts'),
    export: 'Context',
    alias: 'ctx',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  prettierConfig: join(process.cwd(), 'package.json'),
})
