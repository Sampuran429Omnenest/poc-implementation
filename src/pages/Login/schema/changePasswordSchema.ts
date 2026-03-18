import {z} from 'zod'
export const changePasswordSchema=z.object({
    oldPassword:z.string().min(8,'Password must be at least 8 characters')
              .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
              .regex(/[0-9]/, 'Password must contain at least 1 number')
              .regex(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character'),
    newPassword:z.string().min(8,'Password must be at least 8 characters')
              .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
              .regex(/[0-9]/, 'Password must contain at least 1 number')
              .regex(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character')
})