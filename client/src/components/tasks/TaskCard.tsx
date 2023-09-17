import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../interface";
import { Button, ButtonLink, Card } from "../ui";

const TaskCard = ({ task }: { task: Task }) => {
  const { deleteTask } = useTasks();
  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{task.date && new Date(task.date).toLocaleDateString("en-US")}</p>
      <div className="mt-3 flex justify-between">
        <Button name="delete" onClick={() => deleteTask(task._id)}>Delete</Button>
        <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
      </div>
    </Card>
  );
};

export default TaskCard;
