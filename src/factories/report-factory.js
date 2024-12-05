import { faker } from "@faker-js/faker";
import { prisma } from "../app.js";

export async function createReports(years) {
  const immobiles = await prisma.immobile.findMany({ select: { id: true } });

  if (immobiles.length === 0) {
    throw new Error("Nenhum imóvel encontrado no banco de dados.");
  }

  const promises = immobiles.map((immobile) =>
    createReportsForImmobile(immobile.id, years)
  );

  await Promise.all(promises);
}

async function createReportsForImmobile(immobileId, years) {
  const isSpecialImmobile = immobileId === 3 || immobileId === 4;

  const reports = years.flatMap((year) =>
    Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;

      // Sempre cria o relatório de tipo "Locação" (reportTypeId: 2)
      const locacaoReport = generateValidReportBody(immobileId, year, month, 2);

      // Cria o relatório "Complementar" (reportTypeId: 1) apenas para imóveis especiais com 50% de chance
      const complementarReport =
        isSpecialImmobile && Math.random() > 0.5
          ? generateValidReportBody(immobileId, year, month, 1)
          : null;

      return complementarReport
        ? [locacaoReport, complementarReport]
        : [locacaoReport];
    }).flat()
  );

  await prisma.report.createMany({ data: reports });
}

function generateValidReportBody(immobileId, year, month, reportTypeId) {
  const day = 5;
  const date = new Date(year, month - 1, day);

  const minReceived = reportTypeId === 1 ? 50000 : 100000; // Complementar: 50k, Locação: 100k
  const maxReceived = reportTypeId === 1 ? 100000 : 200000; // Complementar: 100k, Locação: 200k

  return {
    immobileId,
    reportTypeId,
    date,
    received: parseFloat(
      faker.finance.amount({ min: minReceived, max: maxReceived, dec: 2 })
    ),
  };
}
