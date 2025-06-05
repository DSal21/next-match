import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>