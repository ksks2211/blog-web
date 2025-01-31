import { zodResolver } from "@hookform/resolvers/zod";
import { HtmlHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../useAuth";

const schema = z.object({
  email: z.string().email("Check your email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export type LoginFormData = z.infer<typeof schema>;

interface LoginFormProps extends HtmlHTMLAttributes<HTMLDivElement> {
  setLoginErrorMessage: (msg: string | undefined) => void;
}

export default function LoginForm({ setLoginErrorMessage }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const { mutation } = useLoginMutation({ setLoginErrorMessage });

  const onSubmit = async (data: LoginFormData) => {
    if (!mutation.isPending) {
      await mutation.mutateAsync(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
