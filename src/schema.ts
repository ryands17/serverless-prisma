import { join } from 'path'
import { makeSchema, objectType, queryType, intArg, nonNull } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('email')
    t.string('name')
  },
})

const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
    })

    t.field('user', {
      type: 'User',
      args: { id: nonNull(intArg()) },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findUnique({ where: { id: args.id } })
      },
    })
  },
})

export const schema = makeSchema({
  types: [User, Query],
  outputs: {
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'nexus.ts'),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
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
