import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    schoolId: z.string().length(10),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date())
});