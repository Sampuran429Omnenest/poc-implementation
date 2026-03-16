import { z } from 'zod';
export const loginSchema=z.object({
    username:z.string().min(1,'Username is required'),
    password:z.string().min(8,'Password must be at least 8 characters')
              .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
              .regex(/[0-9]/, 'Password must contain at least 1 number')
              .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
              .regex(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character')
})
//password cannot contain username
export const loginSchemaWithUserCheck = loginSchema.refine(
    (data) => {
        if (!data.username) return true
        return !data.password.toLowerCase().includes(data.username.toLowerCase())
    }, 
    {
        message: 'Password cannot contain your username', 
        path: ['password'],
    }
);

export type LoginFormValues = z.infer<typeof loginSchemaWithUserCheck>