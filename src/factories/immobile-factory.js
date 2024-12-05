import { prisma } from "../app.js";

export async function createImmobiles() {
  const immobileList = [
    { name: "Loja 1", renterId: 1 }, // Associar ao Locatário 1; id: 1
    { name: "Loja 2", renterId: 2 }, // Associar ao Locatário 2; id: 2
    { name: "Loja 3", renterId: 3 }, // Associar ao Locatário 3; id: 3
    { name: "Loja 4", renterId: 3 }, // Associar ao Locatário 3; id: 4
  ];

  for (const immobile of immobileList) {
    await createImmobile(immobile);
  }
}

export async function createImmobile(params = {}) {
  return prisma.immobile.create({
    data: generateValidImmobileBody(params),
  });
}

export const generateValidImmobileBody = (params = {}) => ({
  name: params.name,
  renterId: params.renterId,
});
