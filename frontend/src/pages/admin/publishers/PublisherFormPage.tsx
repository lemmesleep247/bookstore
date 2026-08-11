import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publishersApi } from "@/api/publishers";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function PublisherFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);

  const { data: publisher, isLoading } = useQuery({
    queryKey: ["admin", "publisher", id],
    queryFn: () => publishersApi.get(Number(id)),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (publisher) {
      reset({
        name: publisher.name,
        email: publisher.email,
        address: publisher.address ?? "",
        phone: publisher.phone ?? "",
      });
    }
  }, [publisher, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      isEdit ? publishersApi.update(Number(id), values) : publishersApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "publishers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast(isEdit ? "Publisher updated" : "Publisher created", "success");
      navigate("/admin/publishers");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isEdit && isLoading) return <Spinner label="Loading publisher…" />;

  return (
    <div>
      <Link
        to="/admin/publishers"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to publishers
      </Link>

      <Card className="mx-auto max-w-lg p-6">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          {isEdit ? "Edit Publisher" : "Add Publisher"}
        </h1>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register("name")} />
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
          <Input label="Address" error={errors.address?.message} {...register("address")} />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            {isEdit ? "Save changes" : "Create publisher"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
