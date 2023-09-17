import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Input, Button } from "../components/ui";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      await signin(userData);
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="bg-zinc-800 min-w-[26rem] max-w-[26rem] p-8 rounded-md m-2">
        <h1 className="text-2xl font-bold mb-2">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder="Write your password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          {loginErrors?.map((error: string, index: number) => (
            <div key={index} className="text-red-500">
              {error}
            </div>
          ))}

          <Button
            name="form"
          >
            Login
          </Button>
        </form>

        <p className="flex gap-x-2 mt-2">
          Don't have an account?{" "}
          <Link className="text-sky-500" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
