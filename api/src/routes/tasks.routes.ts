import { Router } from "express";
import { authRequired } from "../middlewares";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers";
import { validateSchema } from "../middlewares";
import { createTaskSchema } from "../schemas";

const router = Router();

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", getTask)

router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

export default router;
