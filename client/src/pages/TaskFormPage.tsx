import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTasks } from "../hooks/useTasks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {Input, Button} from "../components/ui"

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        if (task) {
          setValue("title", task.title);
          setValue("description", task.description);
        }
      }
    };
    loadTask();
  }, [getTask, params.id, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = params.id;
    const taskData = {
      title: data.title,
      description: data.description,
    };
    if (id) {
      updateTask(id, taskData);
    } else {
      createTask(taskData);
    }
    return navigate("/tasks");
  };

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center font-bold text-2xl mb-2">Task Form</h1>

          <label htmlFor="title">Title</label>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            placeholder="description"
            className="w-full min-h-[6rem] max-h-[6rem] bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <Button
            name="form"
          >
            {params.id ? "Edit" : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
