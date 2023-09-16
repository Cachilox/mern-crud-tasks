import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors } = useAuth();

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

  return (
    <div className="bg-zinc-800 min-w-[26rem] max-w-[26rem] p-8 rounded-md m-2">
      <h1 className="text-2xl font-bold mb-2">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        {loginErrors?.map((error: string, index: number) => (
          <div key={index} className="text-red-500">
            {error}
          </div>
        ))}

        <button
          type="submit"
          className="bg-slate-800 px-4 py-2 rounded-md mt-4"
        >
          Login
        </button>
      </form>

      <p className="flex gap-x-2 mt-2">
        Don't have an account? <Link className="text-sky-500" to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
