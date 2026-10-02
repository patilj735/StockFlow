import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import ItemsTable from "../components/items/ItemsTable";
import ItemModal from "../components/items/ItemModal";
import DeleteItemModal from "../components/items/DeleteItemModal";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../services/itemService";
import type { Item, CreateItemPayload } from "../types/item";

const ITEMS_PER_PAGE = 5;

export default function ItemsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "asc";
  const page = Number(searchParams.get("page") || 1);
  const { data, isLoading } = useQuery({
    queryKey: ["items", { search, sort, page }],

    queryFn: () =>
      getItems({
        search,
        page,
        pageSize: ITEMS_PER_PAGE,
        sortBy: "name",
        sortOrder: sort,
      }),
  });

  const items = data?.items || [];

  const totalCount = data?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  const createMutation = useMutation({
    mutationFn: createItem,

    onSuccess: () => {
      toast.success("Item created successfully");

      setModalOpen(false);
    },

    onError: () => {
      toast.error("Failed to create item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;

      payload: CreateItemPayload;
    }) => updateItem(id, payload),

    onSuccess: () => {
      toast.success("Item updated successfully");

      setSelectedItem(null);

      setModalOpen(false);
    },

    onError: () => {
      toast.error("Failed to update item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,

    onSuccess: () => {
      toast.success("Item deleted successfully");

      setSelectedItem(null);

      setDeleteOpen(false);
    },

    onError: () => {
      toast.error("Failed to delete item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  function handleCreate() {
    setSelectedItem(null);

    setModalOpen(true);
  }

  function handleEdit(item: Item) {
    setSelectedItem(item);

    setModalOpen(true);
  }

  function handleDelete(item: Item) {
    setSelectedItem(item);

    setDeleteOpen(true);
  }

  function handleSubmit(payload: CreateItemPayload) {
    if (selectedItem) {
      updateMutation.mutate({
        id: selectedItem.id,
        payload,
      });

      return;
    }

    createMutation.mutate(payload);
  }

  function confirmDelete() {
    if (!selectedItem) {
      return;
    }

    deleteMutation.mutate(selectedItem.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Items
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage inventory items and stock
          </p>
        </div>

        <Button onClick={handleCreate}>Create Item</Button>
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
              placeholder="Search items..."
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
            <ItemsTable
              items={items}
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

      <ItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        item={selectedItem}
      />

      <DeleteItemModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
