import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";
import {
  categorySchema,
  type CategoryFormValues,
} from "../../schemas/categorySchema";
import type { Category } from "../../types/category";
import FormField from "../forms/FormField";
import FormSection from "../forms/FormSection";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CategoryFormValues) => void;
  loading?: boolean;
  category?: Category | null;
}

export default function CategoryModal({
  open,
  onClose,
  onSubmit,
  loading = false,
  category,
}: CategoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
      });

      return;
    }

    reset({
      name: "",
      description: "",
    });
  }, [category, reset, open]);

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormSection
          title="Category Information"
          description="Manage inventory category details"
        >
          <FormField label="Name" error={errors.name?.message}>
            <Input placeholder="Enter category name" {...register("name")} />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <Textarea
              placeholder="Optional description"
              {...register("description")}
            />
          </FormField>
        </FormSection>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : category ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
