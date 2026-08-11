import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, UserPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { authApi } from "@/api/auth";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { Card } from "@/components/ui/Card";
import { AuthLayout } from "./AuthLayout";

const schema = z
  .object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function RegisterPage() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.show);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const password = watch("password") ?? "";

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

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      showToast("Account created! You can now sign in.", "success");
      navigate("/login", { replace: true });
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <AuthLayout
      eyebrow="Join us"
      title="Create an account and build your personal library."
      subtitle="Member pricing, saved wishlists, and order tracking — all in one place."
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-2xl"
      >
        <Card className="rounded-2xl border-white/80 p-6 shadow-2xl shadow-slate-200/70 sm:p-9">
          <div className="mb-7 flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                Create your account
              </h1>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                A few details and your next great read is within reach.
              </p>
            </div>
          </div>
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(
              ({ confirmPassword: _confirmPassword, ...values }) =>
                mutation.mutate(values),
            )}
            className="grid gap-x-5 gap-y-4 sm:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <Input
                label="Full name"
                placeholder="Your full name"
                autoComplete="name"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                label="Username"
                placeholder="Choose a username"
                autoComplete="username"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.userName?.message}
                {...register("userName")}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-2">
              <Input
                label="Email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.email?.message}
                {...register("email")}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.password?.message}
                {...register("password")}
              />
              <PasswordStrengthMeter password={password} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PasswordInput
                label="Confirm password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-2">
              <Input
                label="Mobile number"
                placeholder="9876543210"
                type="text"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.mobileNo?.message}
                {...register("mobileNo", {
                  onChange: handleMobileNoChange,
                })}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className="group h-11 w-full rounded-xl shadow-lg shadow-brand-200"
                loading={mutation.isPending}
              >
                Create account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </motion.form>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-1.5 text-center text-sm text-slate-500"
          >
            <Check className="h-4 w-4 text-emerald-500" />
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          </motion.p>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}
