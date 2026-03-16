import {z} from 'zod'

export const otpSchema=z.object({
    otp:z
        .string()
        .min(1,'OTP is required')
        .regex(/^\d+$/, 'OTP must be numeric')
        .transform((val)=>Number(val)),
})
export type OtpFormValues=z.infer<typeof otpSchema>