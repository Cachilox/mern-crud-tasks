import { Router } from "express";
import { authRequired } from "../middlewares";

const router = Router();

router.get("/tasks", authRequired, (req, res) => {
  return res.json("Tasks")
})

export default router;