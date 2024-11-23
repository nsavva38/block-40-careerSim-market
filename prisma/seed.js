const prisma = require("../prisma");
const seed = async () => {
  const products = Array.from({ length: 20}, (_,i) => ({
    title: `Product ${i + 1}`,
    description: `Description for product ${i +1}`,
    price: parseFloat((Math.random() * 50).toFixed(2))
  }));
  await prisma.product.createMany({
    data: products
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })