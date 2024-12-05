import { prisma } from "../app.js";

export async function createRenters() {
  const renterList = [
    "Locatário 1", // id: 1
    "Locatário 2", // id: 2
    "Locatário 3", // id: 3
  ];

  for (const renterName of renterList) {
    await createRenter({ name: renterName });
  }
}

export async function createRenter(params = {}) {
  return prisma.renter.create({
    data: generateValidRenterBody(params),
  });
}

export const generateValidRenterBody = (params = {}) => ({
  name: params.name,
});
