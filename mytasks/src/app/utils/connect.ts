import { PrismaClient } from "@prisma/client";

// Declare global variable for PrismaClient


// Use let instead of var
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances in development
  if (!prisma) {
    prisma = new PrismaClient();
  }
  prisma = prisma;
}

export default prisma;


