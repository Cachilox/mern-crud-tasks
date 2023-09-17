import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../components/ui";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      await signup(userData);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="bg-zinc-800 min-w-[26rem] max-w-[26rem] p-8 rounded-md m-2">
        <h1 className="text-2xl font-bold mb-2">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          {registerErrors?.map((error: string, index: number) => (
            <div key={index} className="text-red-500">
              {error}
            </div>
          ))}

          <Button name="form">Register</Button>
        </form>

        <p className="flex gap-x-2 mt-2">
          Already have an account?{" "}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
