import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";


type Inputs = {
  title: string;
  description: string;
  descriptionRequired: string;
};

export default function CreateTodoForm() {
  const router = useRouter();
  const createTodo = api.todos.createTodo.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await createTodo.mutateAsync(data).catch((err) => {
      console.error(err);
    });
   await router.push("/");
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Title"
        className="input-bordered input-info input w-full max-w-xs"
        {...register("title")}
      />

      <input
        placeholder="Description"
        className="input-bordered input-info input w-full max-w-xs"
        {...register("description", { required: true })}
      />
      {errors.description && <span>This field is required</span>}

      <button className="btn-success btn">Submit</button>
    </form>
  );
}
