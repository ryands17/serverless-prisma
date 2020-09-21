/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'dotenv'
config()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function initial_seed() {
  const companyA = await prisma.user.create({
    data: {
      name: 'CompanyA',
      email: 'company@a.com',
      password: 'company@a.com',
    },
  })

  const companyB = await prisma.user.create({
    data: {
      name: 'CompanyB',
      email: 'company@b.com',
      password: 'company@b.com',
    },
  })

  const companyC = await prisma.user.create({
    data: {
      name: 'CompanyC',
      email: 'company@c.com',
      password: 'company@c.com',
    },
  })

  const fraser = await prisma.user.create({
    data: {
      name: 'Fraser',
      email: 'fraser@fraser.com',
      password: 'fraser@fraser.com',
    },
  })

  const aluminium_6061 = await prisma.material.create({
    data: {
      name: 'Aluminium - 6061',
      density: 2700,
      price: {
        create: {
          value: 0.35,
          currency: 'GBP',
          author: {
            connect: { email: 'fraser@fraser.com' },
          },
        },
      },
      supplier: { connect: { email: 'fraser@fraser.com' } },
    },
  })
  const aluminium_7068 = await prisma.material.create({
    data: {
      name: 'Aluminium - 7068',
      density: 2875,
      price: {
        create: {
          value: 0.35,
          currency: 'GBP',
          author: {
            connect: { email: 'fraser@fraser.com' },
          },
        },
      },
      supplier: { connect: { email: 'fraser@fraser.com' } },
    },
  })

  console.log({
    fraser,
    companyA,
    companyB,
    companyC,
    aluminium_6061,
    aluminium_7068,
  })
}

//SEED COMPANY PRICES FOR MATERIALS
/**async function addMaterialsToUsers() {
  const addCompanyA = await prisma.price.create({
    data: {
      value: Math.random(),
      currency: 'GBP',

      material: { connect: { id: 1 } },
      author: {
        connect: { id: 4 },
      },
    },
  })

  const addCompanyAM2 = await prisma.price.create({
    data: {
      value: Math.random(),
      currency: 'GBP',

      material: { connect: { id: 2 } },
      author: {
        connect: { id: 4 },
      },
    },
  })
  console.log({ addCompanyA, addCompanyAM2 })
}*/
