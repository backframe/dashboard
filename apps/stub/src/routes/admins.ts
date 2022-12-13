import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { ICreateAdmin, ResStatus } from "shared";
import { prisma } from "../db.js";

const r = Router();

r.post("/create", async (req, res) => {
  const { email, password, passwordConfirm } = req.body as ICreateAdmin;

  // server validation
  if (password !== passwordConfirm) {
    return res.status(404).json({
      status: ResStatus.ERROR,
      msg: "Password fields do not match",
    });
  }

  try {
    const {
      email: em,
      name,
      id,
    } = await prisma.user.create({
      data: {
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        provider: "local",
        providerId: "local",
        role: "admin",
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    res.status(201).json({
      status: ResStatus.SUCCESS,
      msg: "User created successfully",
      user: { em, name, id },
      token: jwt.sign({ id }, "someJwtSecret", { expiresIn: "1h" }),
    });
  } catch (error) {
    res.status(400).json({
      status: ResStatus.ERROR,
      msg: "An error occurred, try again later",
    });
  }
});

r.post("/email-auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const {
      email: em,
      id,
      passwordHash,
      name,
    } = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!bcrypt.compareSync(password, passwordHash)) {
      res.status(400).json({
        status: ResStatus.ERROR,
        msg: "Invalid login credentials",
      });
    } else {
      res.status(200).json({
        status: ResStatus.SUCCESS,
        msg: "Logged in successfully",
        user: { em, name, id },
        token: jwt.sign({ id }, "someJwtSecret", { expiresIn: "1h" }),
      });
    }
  } catch (error) {
    res.status(400).json({
      status: ResStatus.ERROR,
      msg: "Invalid login credentials",
    });
  }
});

export default r;
