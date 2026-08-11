import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorsApi } from "@/api/authors";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().min(0, "Age must be positive"),
  email: z.string().email("Enter a valid email"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function AuthorFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);

  const { data: author, isLoading } = useQuery({
    queryKey: ["admin", "author", id],
    queryFn: () => authorsApi.get(Number(id)),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", age: 0, email: "" },
  });

  useEffect(() => {
    if (author) reset(author);
  }, [author, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      isEdit ? authorsApi.update(Number(id), values) : authorsApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "authors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast(isEdit ? "Author updated" : "Author created", "success");
      navigate("/admin/authors");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isEdit && isLoading) return <Spinner label="Loading author…" />;

  return (
    <div>
      <Link
        to="/admin/authors"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to authors
      </Link>

      <Card className="mx-auto max-w-lg p-6">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          {isEdit ? "Edit Author" : "Add Author"}
        </h1>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register("name")} />
          <Input
            label="Age"
            type="number"
            error={errors.age?.message}
            {...register("age")}
          />
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            {isEdit ? "Save changes" : "Create author"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
