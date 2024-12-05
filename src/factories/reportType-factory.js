import { prisma } from "../app.js";

export async function createReportTypes() {
  const reportTypeList = [
    "Complementar", // id: 1
    "Locação", // id: 2
  ];

  for (const reportTypeName of reportTypeList) {
    await createReportType({ name: reportTypeName });
  }
}

export async function createReportType(params = {}) {
  return prisma.reportType.create({
    data: generateValidReportTypeBody(params),
  });
}

export const generateValidReportTypeBody = (params = {}) => ({
  name: params.name,
});
