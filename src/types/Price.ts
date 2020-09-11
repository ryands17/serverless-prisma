import { objectType } from '@nexus/schema'

export const Price = objectType({
  name: 'Price',
  definition(t) {
    t.model.id()
    t.model.value()
    t.model.currency()
    t.model.author()
    t.model.material()
  },
})
