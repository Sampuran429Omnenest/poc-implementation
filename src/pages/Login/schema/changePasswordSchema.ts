import { z } from 'zod'

export const changePasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
        .regex(/[0-9]/, 'Must contain at least 1 number')
        .regex(/[^a-zA-Z0-9]/, 'Must contain at least 1 special character'),
    reenterPassword: z.string()
        .min(1, 'Please re-enter your password'),
}).refine((data) => data.password === data.reenterPassword, {
    message: "Passwords do not match",
    path: ["reenterPassword"],
})