import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.show);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: usersApi.changePassword,
    onSuccess: () => {
      showToast("Password updated successfully!", "success");
      reset();
      navigate("/profile");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <div>
      <Link
        to="/profile"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <Card className="mx-auto max-w-lg p-6">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">Change Password</h1>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input
            label="Current password"
            type="password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
          <Input
            label="New password"
            type="password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <Input
            label="Confirm new password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            Update password
          </Button>
        </form>
      </Card>
    </div>
  );
}
