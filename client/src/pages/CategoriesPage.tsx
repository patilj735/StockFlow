import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryModal from "../components/categories/CategoryModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import type { Category, CreateCategoryPayload } from "../types/category";

const ITEMS_PER_PAGE = 5;

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "asc";
  const page = Number(searchParams.get("page") || 1);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],

    queryFn: getCategories,
  });

  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return sort === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [categories, search, sort]);

  const paginatedCategories = filteredCategories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE,);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE) || 1;

  const createMutation = useMutation({
    mutationFn: createCategory,

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["categories"],
      });

      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      const optimisticCategory: Category = {
        id: Date.now(),
        name: payload.name,
        description: payload.description,
      };

      queryClient.setQueryData<Category[]>(["categories"], (old = []) => [
        optimisticCategory,
        ...old,
      ]);

      setModalOpen(false);

      return {
        previousCategories,
      };
    },

    onError: (_error, _payload, context) => {
      queryClient.setQueryData(["categories"], context?.previousCategories);

      toast.error("Failed to create category");
    },

    onSuccess: () => {
      toast.success("Category created successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;

      payload: CreateCategoryPayload;
    }) => updateCategory(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({
        queryKey: ["categories"],
      });

      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      queryClient.setQueryData<Category[]>(["categories"], (old = []) =>
        old.map((category) =>
          category.id === id
            ? {
                ...category,
                ...payload,
              }
            : category,
        ),
      );

      setModalOpen(false);

      return {
        previousCategories,
      };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["categories"], context?.previousCategories);

      toast.error("Failed to update category");
    },

    onSuccess: () => {
      toast.success("Category updated successfully");

      setSelectedCategory(null);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["categories"],
      });

      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      queryClient.setQueryData<Category[]>(["categories"], (old = []) =>
        old.filter((category) => category.id !== id),
      );

      setDeleteOpen(false);

      return {
        previousCategories,
      };
    },

    onError: (_error, _id, context) => {
      queryClient.setQueryData(["categories"], context?.previousCategories);

      toast.error("Failed to delete category");
    },

    onSuccess: () => {
      toast.success("Category deleted successfully");

      setSelectedCategory(null);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  function handleCreate() {
    setSelectedCategory(null);

    setModalOpen(true);
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);

    setModalOpen(true);
  }

  function handleDelete(category: Category) {
    setSelectedCategory(category);

    setDeleteOpen(true);
  }

  function handleSubmit(payload: CreateCategoryPayload) {
    if (selectedCategory) {
      updateMutation.mutate({
        id: selectedCategory.id,
        payload,
      });

      return;
    }

    createMutation.mutate(payload);
  }

  function confirmDelete() {
    if (!selectedCategory) {
      return;
    }

    deleteMutation.mutate(selectedCategory.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage inventory categories
          </p>
        </div>

        <Button onClick={handleCreate}>Create Category</Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              value={search}
              onChange={(event) => {
                setSearchParams({
                  search: event.target.value,
                  sort,
                  page: "1",
                });
              }}
              placeholder="Search categories..."
            />
          </div>

          <select
            value={sort}
            onChange={(event) =>
              setSearchParams({
                search,
                sort: event.target.value,
                page: "1",
              })
            }
            className="
              rounded-lg border border-slate-300
              bg-white px-3 py-2 text-sm
              focus:border-blue-500
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="asc">A-Z</option>

            <option value="desc">Z-A</option>
          </select>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <>
            <CategoriesTable
              categories={paginatedCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() =>
                    setSearchParams({
                      search,
                      sort,
                      page: String(page - 1),
                    })
                  }
                >
                  Previous
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setSearchParams({
                      search,
                      sort,
                      page: String(page + 1),
                    })
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
