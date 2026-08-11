import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { getErrorMessage } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  mobileNo: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined || value === "" || /^[0-9]{10}$/.test(value),
      {
        message: "Mobile number must be exactly 10 digits",
      },
    ),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EditProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);
  const updateFullName = useAuthStore((state) => state.updateFullName);

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: usersApi.me,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const sanitizeMobileNo = (value: string) =>
    value.replace(/\D/g, "").slice(0, 10);

  const handleMobileNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = sanitizeMobileNo(event.target.value);
    event.target.value = nextValue;
    setValue("mobileNo", nextValue || undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        mobileNo: user.mobileNo ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: usersApi.update,
    onSuccess: (updated) => {
      queryClient.setQueryData(["me"], updated);
      updateFullName(updated.fullName);
      showToast("Profile updated successfully!", "success");
      navigate("/profile");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isLoading) return <Spinner label="Loading profile…" />;

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
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          Edit Details
        </h1>
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
        >
          <Input
            label="Full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Mobile number"
            type="text"
            inputMode="numeric"
            maxLength={10}
            error={errors.mobileNo?.message}
            {...register("mobileNo", {
              onChange: handleMobileNoChange,
            })}
          />
          <Input
            label="Address"
            error={errors.address?.message}
            {...register("address")}
          />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
