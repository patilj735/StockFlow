import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteCategoryModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: DeleteCategoryModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Category">
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this category?
        </p>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
