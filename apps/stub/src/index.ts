import { PrismaClient } from "database";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.get("/", (req, res) => {
  const user = prisma.user.findMany();
  res.send({ user });
});

app.listen(9000, () => {
  console.log("Server started on port 3000");
});
