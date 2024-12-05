import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

async function seedDatabase() {
  //console.log("Fake data gerado");
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
