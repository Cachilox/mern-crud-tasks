import { Router } from "express";
import { authRequired } from "../middlewares";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers";

const router = Router();

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", getTask)

router.post("/tasks", authRequired, createTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

export default router;
