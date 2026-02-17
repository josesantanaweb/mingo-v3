import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'El nombre del comprador es requerido'),
});

export type FormData = z.infer<typeof userSchema>;
