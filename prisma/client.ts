import { PrismaClient } from '@prisma/client';

/*
  Global instance of PrismaClient
*/
const prismaClient = new PrismaClient();

export default prismaClient;
