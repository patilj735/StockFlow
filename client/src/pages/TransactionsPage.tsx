import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import TransactionModal from "../components/transactions/TransactionModal";
import TransactionsTable from "../components/transactions/TransactionsTable";
import {
  createTransaction,
  getTransactions,
  returnTransaction,
} from "../services/transactionService";
import type {
  Transaction,
  CreateTransactionPayload,
} from "../types/transaction";

const ITEMS_PER_PAGE = 5;

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const page = Number(searchParams.get("page") || 1);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.borrowerName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.itemName?.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const comparison =
        new Date(a.issuedAt).getTime() - new Date(b.issuedAt).getTime();

      return sort === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, search, sort]);

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,

    page * ITEMS_PER_PAGE,
  );

  const totalPages =
    Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1;

  const createMutation = useMutation({
    mutationFn: createTransaction,

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["transactions"],
      });

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      const optimisticTransaction: Transaction = {
        id: Date.now(),
        borrowerName: payload.borrowerName,
        borrowerEmail: payload.borrowerEmail,
        itemId: payload.itemId,
        itemName: "Loading...",
        quantity: payload.quantity,
        issuedAt: new Date().toISOString(),
        isReturned: false,
      };

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) => [
        optimisticTransaction,
        ...old,
      ]);

      setModalOpen(false);

      return {
        previousTransactions,
      };
    },

    onError: (_error, _payload, context) => {
      queryClient.setQueryData(["transactions"], context?.previousTransactions);

      toast.error("Failed to issue item");
    },

    onSuccess: () => {
      toast.success("Item issued successfully");

      queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const returnMutation = useMutation({
    mutationFn: returnTransaction,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["transactions"],
      });

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
        old.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                isReturned: true,
                returnedAt: new Date().toISOString(),
              }
            : transaction,
        ),
      );

      return {
        previousTransactions,
      };
    },

    onError: (_error, _id, context) => {
      queryClient.setQueryData(["transactions"], context?.previousTransactions);

      toast.error("Failed to return item");
    },

    onSuccess: () => {
      toast.success("Item returned successfully");

      queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  function handleSubmit(payload: CreateTransactionPayload) {
    createMutation.mutate(payload);
  }

  function handleReturn(transaction: Transaction) {
    returnMutation.mutate(transaction.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track inventory issue and return operations
          </p>
        </div>

        <Button onClick={() => setModalOpen(true)}>Issue Item</Button>
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
              placeholder="Search transactions..."
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
            <option value="desc">Newest</option>

            <option value="asc">Oldest</option>
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
            <TransactionsTable
              transactions={paginatedTransactions}
              onReturn={handleReturn}
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

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />
    </div>
  );
}
