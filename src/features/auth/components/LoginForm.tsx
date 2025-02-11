import { zodResolver } from "@hookform/resolvers/zod";
import { HtmlHTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import googleLogo from "../../shared/assets/google.svg";
import { useLoginMutation } from "../useAuth";

const schema = z.object({
  email: z.string().email("Check your email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export type LoginFormData = z.infer<typeof schema>;

const API_URL = import.meta.env.VITE_API_URL as string;

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
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { mutation } = useLoginMutation({ setLoginErrorMessage });

  const [params, setParams] = useSearchParams();

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
      } catch {
        clearErrors();

        setTimeout(() => {
          setFocus("email");
          reset(getValues());
        }, 500);
      }
    }
  };

  const handleGoogleLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    location.href = `${API_URL}/api/oauth2/authorization/google`;
  };

  const { isPending } = mutation;

  useEffect(() => {
    const email = params.get("email");

    if (email && email.length > 0) {
      setValue("email", email);
      setParams();
      setFocus("password");
    }
  }, [params, setFocus, setParams, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 items-center pt-4 pb-10  relative"
    >
      <label className="group overflow-clip input input-bordered flex items-center gap-2 rounded-2xl w-8/12 h-11 focus-within:input-success ">
        <EnvelopeIcon className="group-focus-within:text-success flex-shrink-0 h-4 w-4 opacity-70 peer-focus:text-success" />
        <input
          type="text"
          className="w-full"
          placeholder="Email"
          // autoComplete="off"
          {...register("email")}
        />
      </label>
      <label className="group overflow-clip input input-bordered flex items-center gap-2 rounded-2xl w-8/12 h-11 focus-within:input-success">
        <KeyIcon className="group-focus-within:text-success flex-shrink-0 h-4 w-4 opacity-70" />
        <input
          type="password"
          placeholder="Password"
          className="w-full"
          {...register("password")}
        />
      </label>

      <div className="w-full flex flex-col justify-around items-center absolute top-full h-full left-0 right-0 py-5">
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
            <span>Login</span>
          )}
        </button>

        <button
          type="button"
          className={
            "btn btn-neutral btn-outline btn-sm rounded-full w-8/12 text-base font-normal h-10 hover:btn-info opacity-75"
          }
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="google" className="size-5" />
          Continue with Google
        </button>
      </div>
    </form>
  );
}
