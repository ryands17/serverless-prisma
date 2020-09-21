import { config } from 'dotenv'
config()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  //await prisma.user.deleteMany({})
  //initial_seed
  //addMaterialsToUsers()
}

main().finally(async () => {
  await prisma.disconnect()
})
