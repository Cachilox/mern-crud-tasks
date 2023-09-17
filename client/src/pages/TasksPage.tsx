import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/tasks/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No tasks</h1>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2">
      {tasks?.map((task) => {
        return <TaskCard key={task._id} task={task} />;
      })}
    </div>
  );
};

export default TasksPage;
