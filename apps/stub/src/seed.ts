import { faker } from "@faker-js/faker";
import { hasAdmin, prisma } from "./db.js";

if (!(await hasAdmin())) {
  await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.random.alphaNumeric(20),
      role: "admin",
      provider: "local",
      providerId: "local",
    },
  });
}
