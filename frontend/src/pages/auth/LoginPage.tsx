import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { authApi } from "@/api/auth";
import { getErrorMessage } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Card } from "@/components/ui/Card";
import { AuthLayout } from "./AuthLayout";

const schema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useToastStore((state) => state.show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data);
      showToast(`Welcome back, ${data.fullName}!`, "success");
      navigate(data.role === "ADMIN" ? "/admin" : "/", { replace: true });
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in and pick up right where you left off."
      subtitle="Track orders, revisit your wishlist, and discover new arrivals curated just for you."
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-md"
      >
        <Card className="rounded-2xl border-white/80 p-6 shadow-2xl shadow-slate-200/70 sm:p-9">
          <div className="mb-8">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><LockKeyhole className="h-5 w-5" /></span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">Enter your details to continue your reading journey.</p>
          </div>
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit((values) => mutation.mutate(values))}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <Input
                label="Username"
                placeholder="Enter your username"
                autoComplete="username"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.userName?.message}
                {...register("userName")}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-11 bg-slate-50/70 transition-colors focus:bg-white"
                error={errors.password?.message}
                {...register("password")}
              />
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="group h-11 w-full rounded-xl shadow-lg shadow-brand-200" loading={mutation.isPending}>
                Sign in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </motion.form>
          <div className="my-7 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><UserRound className="h-4 w-4 text-slate-300" /><span className="h-px flex-1 bg-slate-200" /></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-slate-500"
          >
            New here?{" "}
            <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
              Create an account
            </Link>
          </motion.p>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}
