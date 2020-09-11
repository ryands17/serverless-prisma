import * as path from 'path'
import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from '@nexus/schema'
import { Context } from './context'
import * as types from './types'
const nexusPrisma = nexusPrismaPlugin({
  experimentalCRUD: true,
  prismaClient: (ctx: Context) => ctx.prisma,
})

export const schema = makeSchema({
  types,
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
