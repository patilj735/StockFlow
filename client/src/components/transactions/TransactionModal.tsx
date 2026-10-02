import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FormField from "../forms/FormField";
import FormSection from "../forms/FormSection";
import { getItems } from "../../services/itemService";
import {
  transactionSchema,
  type TransactionFormValues,
} from "../../schemas/transactionSchema";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: TransactionFormValues) => void;
  loading?: boolean;
}

export default function TransactionModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: TransactionModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      borrowerName: "",
      borrowerEmail: "",
      itemId: 0,
      quantity: 1,
    },
  });

  const { data } = useQuery({
    queryKey: ["items", { pageSize: 0 }],
    queryFn: () => getItems({ pageSize: 0 }),
  });

  const items = data?.items || [];

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Issue Item">
      <form
        onSubmit={handleSubmit((values) =>
          onSubmit(values as TransactionFormValues),
        )}
        className="space-y-6"
      >
        <FormSection
          title="Borrower Information"
          description="Issue inventory item to borrower"
        >
          <FormField label="Borrower Name" error={errors.borrowerName?.message}>
            <Input
              placeholder="Enter borrower name"
              {...register("borrowerName")}
            />
          </FormField>

          <FormField
            label="Borrower Email"
            error={errors.borrowerEmail?.message}
          >
            <Input
              type="email"
              placeholder="Enter borrower email"
              {...register("borrowerEmail")}
            />
          </FormField>

          <FormField label="Item" error={errors.itemId?.message}>
            <select
              {...register("itemId")}
              className="
                w-full rounded-lg border border-slate-300
                bg-white px-3 py-2 text-sm
                focus:border-blue-500
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value={0}>Select item</option>

              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Quantity" error={errors.quantity?.message}>
            <Input type="number" {...register("quantity")} />
          </FormField>
        </FormSection>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Issuing..." : "Issue Item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
