import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="bg-zinc-800 min-w-[26rem] max-w-[26rem] p-8 rounded-md m-2">
      <h1 className="text-2xl font-bold mb-2">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2 p-2"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2 p-2"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2 p-2"
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

        <button
          type="submit"
          className="bg-slate-800 px-4 py-2 rounded-md mt-4"
        >
          Register
        </button>
      </form>

      <p className="flex gap-x-2 mt-2">
        Already have an account? <Link className="text-sky-500" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
