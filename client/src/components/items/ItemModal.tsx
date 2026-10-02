import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import FormField from "../forms/FormField";
import FormSection from "../forms/FormSection";
import { itemSchema, type ItemFormValues } from "../../schemas/itemSchema";
import { getCategoryOptions } from "../../services/categoryLookupService";
import type { Item } from "../../types/item";

interface ItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: ItemFormValues) => void;
  loading?: boolean;
  item?: Item | null;
}

export default function ItemModal({
  open,
  onClose,
  onSubmit,
  loading = false,
  item,
}: ItemModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),

    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: 0,
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["category-options"],

    queryFn: getCategoryOptions,
  });

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        description: item.description || "",
        price: item.price,
        quantity: item.quantity,
        categoryId: item.categoryId,
      });

      return;
    }

    reset({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: 0,
    });
  }, [item, reset, open]);

  function handleClose() {
    reset();

    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={item ? "Edit Item" : "Create Item"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection
          title="Item Information"
          description="Manage inventory item details"
        >
          <FormField label="Name" error={errors.name?.message}>
            <Input placeholder="Enter item name" {...register("name")} />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <Textarea
              placeholder="Optional description"
              {...register("description")}
            />
          </FormField>

          <FormField label="Category" error={errors.categoryId?.message}>
            <select
              {...register("categoryId")}
              className="
                w-full rounded-lg border border-slate-300
                bg-white px-3 py-2 text-sm
                focus:border-blue-500
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value={0}>Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Price" error={errors.price?.message}>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price")}
              />
            </FormField>

            <FormField label="Quantity" error={errors.quantity?.message}>
              <Input type="number" placeholder="0" {...register("quantity")} />
            </FormField>
          </div>
        </FormSection>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : item ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
