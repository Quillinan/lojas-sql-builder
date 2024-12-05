import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import { createReportTypes } from "./factories/reportType-factory.js";
import { createRenters } from "./factories/renter-factory.js";
import { createImmobiles } from "./factories/immobile-factory.js";
import { createReports } from "./factories/report-factory.js";

export const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

async function seedDatabase() {
  const years = [2021, 2022, 2023, 2024];

  await createReportTypes();
  await createRenters();
  await createImmobiles();
  await createReports(years);
  console.log("Fake data gerado");
}

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
  await seedDatabase();
});

process.on("SIGINT", async () => {
  console.log("Desligando servidor...");
  await prisma.$disconnect();
  process.exit(0);
});
