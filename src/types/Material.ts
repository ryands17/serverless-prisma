import { objectType } from '@nexus/schema'

export const Material = objectType({
  name: 'Material',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.supplier()
    t.model.price()
  },
})
