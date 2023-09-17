import { createContext, useState } from "react";
import { Task } from "../interface";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../services/tasks";

interface TaskContextInterface {
  tasks: Task[];
  createTask: (task: Task) => void;
  getTasks: () => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Promise<Task | void>;
  updateTask: (id: string ,task: Task) => void;
}

export const TaskContext = createContext<TaskContextInterface>({
  tasks: [],
  createTask: () => {},
  getTasks: () => {},
  deleteTask: () => {},
  getTask: async () => {},
  updateTask: () => {},
});

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task: Task) => {
    try {
      await createTaskRequest(task);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id: string): Promise<Task | void> => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id: string, task: Task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
