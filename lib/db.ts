import { PrismaClient } from '../src/app/generated/prisma'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getUserFromDb(rollNumber: string, password: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { rollNumber, password },
        });
        return user;
    } catch (error) {
        console.error("Database error in getUserFromDb:", error);
        return null; // or throw error, depending on your needs
    }
}

export default prisma