const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // might have to add the $extend thingy later
module.exports = prisma;

