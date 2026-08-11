import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { booksApi } from "@/api/books";
import { categoriesApi } from "@/api/categories";
import { publishersApi } from "@/api/publishers";
import { authorsApi } from "@/api/authors";
import { getErrorMessage } from "@/api/client";
import { useToastStore } from "@/store/toastStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  authorIds: z.array(z.string()).min(1, "Select at least one author"),
  copies: z.coerce.number().min(0, "Copies must be positive"),
  price: z.coerce.number().positive("Price must be greater than zero"),
  categoryId: z.coerce.number().positive("Select a category"),
  publisherId: z.coerce.number().positive("Select a publisher"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function BookFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);

  const { data: book, isLoading: isBookLoading } = useQuery({
    queryKey: ["admin", "book", id],
    queryFn: () => booksApi.get(Number(id)),
    enabled: isEdit,
  });

  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: categoriesApi.listAdmin,
  });
  const { data: publishers } = useQuery({
    queryKey: ["admin", "publishers"],
    queryFn: publishersApi.listAdmin,
  });
  const { data: authors } = useQuery({ queryKey: ["admin", "authors"], queryFn: authorsApi.list });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", authorIds: [], copies: 0, price: 0 },
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        description: book.description ?? "",
        authorIds: book.authorIds ?? [],
        copies: book.copies,
        price: book.price,
        categoryId: book.categoryId,
        publisherId: book.publisherId,
      });
    }
    // Re-run once categories/publishers/authors finish loading too: a <select>
    // ignores reset() for an option value that doesn't exist in the DOM yet.
  }, [book, categories, publishers, authors, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      isEdit ? booksApi.update(Number(id), values) : booksApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      showToast(isEdit ? "Book updated" : "Book created", "success");
      navigate("/admin/books");
    },
    onError: (error) => showToast(getErrorMessage(error), "error"),
  });

  if (isEdit && isBookLoading) return <Spinner label="Loading book…" />;

  return (
    <div>
      <Link
        to="/admin/books"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to books
      </Link>

      <Card className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          {isEdit ? "Edit Book" : "Add Book"}
        </h1>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input label="Title" error={errors.title?.message} {...register("title")} />
          <TextArea
            label="Description"
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" error={errors.categoryId?.message} {...register("categoryId")}>
              <option value="">Select category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Select
              label="Publisher"
              error={errors.publisherId?.message}
              {...register("publisherId")}
            >
              <option value="">Select publisher</option>
              {publishers?.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Copies"
              type="number"
              error={errors.copies?.message}
              {...register("copies")}
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              error={errors.price?.message}
              {...register("price")}
            />
          </div>

          <div>
            <span className="text-sm font-medium text-slate-700">Authors</span>
            <Controller
              control={control}
              name="authorIds"
              render={({ field }) => (
                <div className="mt-2 grid max-h-40 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-slate-300 p-3">
                  {authors?.map((author) => {
                    const value = String(author.id);
                    const checked = field.value.includes(value);

                    return (
                      <label key={author.id} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            field.onChange(
                              e.target.checked
                                ? [...field.value, value]
                                : field.value.filter((v) => v !== value)
                            );
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                        />
                        {author.name}
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.authorIds && (
              <span className="mt-1 block text-xs text-red-600">{errors.authorIds.message}</span>
            )}
          </div>

          <Button type="submit" className="w-full" loading={mutation.isPending}>
            {isEdit ? "Save changes" : "Create book"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
