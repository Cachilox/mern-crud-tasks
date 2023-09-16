import { Request, Response } from "express";
import Task from "../models/task.model";
import { CustomRequest } from "../interface/types";

export const getTasks = async ({ user }: CustomRequest, res: Response) => {
  try {
    const tasks = await Task.find({
      user: user.id,
    }).populate("user");

    return res.json(tasks);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async ({ params }: Request, res: Response) => {
  try {
    const TaskFound = await Task.findById(params.id).populate("user");

    if (!TaskFound) return res.json({ message: "Task not found" });

    return res.json(TaskFound);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async ({ body, user }: CustomRequest, res: Response) => {
  try {
    const { title, description, date } = body;

    const newTask = new Task({
      title,
      description,
      date,
      user: user.id,
    });

    const savedTask = await newTask.save();
    return res.json(savedTask);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async ({ params }: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);
    if (!deletedTask) return res.json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async ({ params, body }: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!task) return res.json({ message: "Task not found" });
    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
