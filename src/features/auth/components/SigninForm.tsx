import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { HtmlHTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../useAuth";

const schema = z.object({
  email: z.string().email("Check your email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  nickname: z.string().min(5, "Nickname must be at least 5 characters long"),
});

export type LoginFormData = z.infer<typeof schema>;

interface LoginFormProps extends HtmlHTMLAttributes<HTMLDivElement> {
  setLoginErrorMessage: (msg: string) => void;
}

export default function LoginForm({ setLoginErrorMessage }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const { mutation } = useLoginMutation({ setLoginErrorMessage });

  useEffect(() => {
    if (errors.email || errors.password) {
      const message =
        errors.email?.message ||
        errors.password?.message ||
        "Invalid information";
      setLoginErrorMessage(message);
      clearErrors();
      reset(getValues());
    }
  }, [
    reset,
    clearErrors,
    errors.email,
    errors.password,
    setLoginErrorMessage,
    getValues,
  ]);

  const onSubmit = async (data: LoginFormData) => {
    if (!mutation.isPending) {
      try {
        await mutation.mutateAsync(data);
      } catch (e) {
        console.error(e);
        clearErrors();
        reset();
      }
    }
  };

  const { isPending } = mutation;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 items-center pt-4 pb-10  relative"
    >
      <label className="group overflow-clip input input-bordered flex items-center gap-2 rounded-2xl w-8/12 h-11 focus-within:input-success">
        <EnvelopeIcon className="flex-shrink-0 h-4 w-4 opacity-70  group-focus-within:text-success" />
        <input
          type="text"
          className="w-full"
          placeholder="Email*"
          required
          {...register("email")}
        />
      </label>
      <label className="group overflow-clip input input-bordered flex items-center gap-2 rounded-2xl w-8/12 h-11 focus-within:input-success">
        <KeyIcon className="flex-shrink-0 h-4 w-4 opacity-70 group-focus-within:text-success" />
        <input
          type="password"
          placeholder="Password*"
          className="w-full"
          required
          {...register("password")}
        />
      </label>

      <label className="group overflow-clip input input-bordered flex items-center gap-2 rounded-2xl w-8/12 h-11 focus-within:input-success">
        <UserIcon className="flex-shrink-0 h-4 w-4 opacity-70 group-focus-within:text-success" />
        <input
          type="nickname"
          placeholder="Nickname"
          className="w-full"
          required={false}
          {...register("nickname")}
        />
      </label>

      <div className="w-full flex flex-col justify-start items-center absolute top-full left-0 right-0 py-5">
        <button
          className={clsx(
            "btn btn-success btn-sm text-neutral-50 rounded-full w-8/12 font-extrabold text-lg h-10",
            isPending && "btn-disabled"
          )}
          type="submit"
        >
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>Register</span>
          )}
        </button>
      </div>
    </form>
  );
}
