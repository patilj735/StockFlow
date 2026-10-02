import { z } from "zod";

export const transactionSchema = z.object({
  borrowerName: z.string().min(2, "Borrower name is required"),
  borrowerEmail: z.string().email("Valid email required"),
  itemId: z.coerce.number().min(1, "Item is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
