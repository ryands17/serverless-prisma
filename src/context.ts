import { PrismaClient } from '@prisma/client'
import { request } from 'http'

const prisma = new PrismaClient({
  log: ['query'],
})

export interface Context {
  prisma: PrismaClient
  request: any
}

export function createContext(): Context {
  return { prisma, request }
}
