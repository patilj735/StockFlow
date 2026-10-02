import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  categoryId: z.coerce.number().min(1, "Category is required"),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
