import { config } from 'dotenv'
config()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })
  console.log({ user1, user2 })
}

main().finally(async () => {
  await prisma.$disconnect()
})
