import { Router } from "express";
import adminsRouter from "./admins.js";

const r = Router();

r.use("/admins", adminsRouter);

export default r;
