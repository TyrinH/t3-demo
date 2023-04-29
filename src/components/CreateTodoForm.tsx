import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

type Inputs = {
  title: string;
  description: string;
  descriptionRequired: string;
};

export default function CreateTodoForm() {
  const createTodo = api.todos.createTodo.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    createTodo.mutateAsync(data).catch((err) => {
      console.error(err);
    });
  };
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ title: "", description: "" });
    }
  }, [formState, reset]);
  // console.log(watch("title")); // watch input value by passing the name of it

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
