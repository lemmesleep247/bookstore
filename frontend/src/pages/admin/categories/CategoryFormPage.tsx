import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/api/categories";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CategoryFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);

  const { data: category, isLoading } = useQuery({
    queryKey: ["admin", "category", id],
    queryFn: () => categoriesApi.get(Number(id)),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (category) reset({ name: category.name, description: category.description ?? "" });
  }, [category, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      isEdit ? categoriesApi.update(Number(id), values) : categoriesApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast(isEdit ? "Category updated" : "Category created", "success");
      navigate("/admin/categories");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isEdit && isLoading) return <Spinner label="Loading category…" />;

  return (
    <div>
      <Link
        to="/admin/categories"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to categories
      </Link>

      <Card className="mx-auto max-w-lg p-6">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          {isEdit ? "Edit Category" : "Add Category"}
        </h1>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register("name")} />
          <TextArea
            label="Description"
            error={errors.description?.message}
            {...register("description")}
          />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            {isEdit ? "Save changes" : "Create category"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
