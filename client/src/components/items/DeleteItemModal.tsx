import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface DeleteItemModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteItemModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: DeleteItemModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Item">
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
