import { PrismaClient } from './generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { resolve } from 'path'

const path = resolve(__dirname, '..', 'prisma', 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: `file:${path}` })

export const prisma = new PrismaClient({ adapter })

export { PrismaClient } from './generated/prisma/client'
export type { User, Post, Prisma } from './generated/prisma/client'
