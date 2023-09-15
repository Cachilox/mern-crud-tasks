import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <form className="" onSubmit={handleSubmit(onSubmit)}>
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
          <div key={index} className="bg-red-500 p-2 m-2">
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
    </div>
  );
};

export default RegisterPage;
