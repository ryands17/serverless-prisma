import { enumType, floatArg, objectType } from '@nexus/schema'

export const unitInputEnum = enumType({
  name: 'Units',
  members: ['mm', 'cm', 'm'],
})

export const Price = objectType({
  name: 'Price',
  definition(t) {
    t.model.id()
    t.model.value()
    t.model.currency()
    t.model.author()
    t.model.material()
    t.model.materialId()
    t.float('calculatedPrice', {
      args: {
        length: floatArg(),
        width: floatArg(),
        thickness: floatArg(),
        units: unitInputEnum,
      },
      nullable: true,
      async resolve(
        { materialId, value },
        { length, width, thickness, units },
        ctx
      ) {
        //must find out how companies price their metal, per m^2?

        //calculate the weight not metal via density * volume

        const volume = calcVolume({ length, width, thickness })

        const unitConversionFactor = unitSwitch(units)

        const convertedResult = resultCubicMetres({
          unitConversionFactor,
          volume,
        })

        const findMaterial = await ctx.prisma.material.findOne({
          where: {
            id: materialId,
          },
        })
        //find material by relation
        const theDensity = findMaterial.density

        if (theDensity) {
          const theMass = theDensity * convertedResult
          console.log('theVolume', volume)

          console.log('m3result', convertedResult)
          console.log('theDensity', theDensity)
          console.log('mass:', theMass)
          console.log('value', value)
          const estimatedPrice = theMass * value

          console.log('estimatedPrice', estimatedPrice)
          return estimatedPrice
        }
        return null
        //find the mass of metal via mass = volume * density
      },
    })
  },
})
//====================================
// UNIT CONVERSION LOGIC
//====================================
function unitSwitch(units: string) {
  switch (units) {
    case 'mm':
      return 1e9
    case 'cm':
      return 1e6
    case 'm':
      return 1

    default:
      break
  }
}
interface volumeProps {
  length: number
  width: number
  thickness: number
}
function calcVolume({ length, width, thickness }: volumeProps) {
  return length * width * thickness
}

interface resultProps {
  unitConversionFactor: number
  volume: number
}
function resultCubicMetres({ unitConversionFactor, volume }: resultProps) {
  return volume / unitConversionFactor
}
