import { useState } from "react"
import type { changePasswordPayload, ForgetPasswordPayload, ForgetUserIdPayload } from "../types/userAuthType"
import { forgetUserId as forgetUerIdApi,forgetUserPassword as forgetUserPasswordApi,changeUserPassword as changeUserPasswordApi } from "../../api/auth.api"
import { useAuthStore } from "../../store/useAuthStore"
export const useForgotFlow=()=>{
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
    const [successMessage,setSuccessMessage]=useState<string|null>(null)
    const [recoveryType,setRecoveryType]=useState<'userid'|'password'|null>(null)
    const {setStep,setUsername}=useAuthStore();
    const forgetUserId=async(payload:ForgetUserIdPayload)=>{
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await forgetUerIdApi(payload)
            setRecoveryType('userid');
            setStep('otp')
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
    const forgetUserPassword=async(payload:ForgetPasswordPayload)=>{
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await forgetUserPasswordApi(payload)
            setUsername(payload.username)
            setRecoveryType('password')
            setStep('otp')
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
    const changeUserPassword=async(payload:changePasswordPayload)=>{
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await changeUserPasswordApi(payload)
            setSuccessMessage("Password is set successfully.")
            setStep('credentials')
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
    return{
        loading,
        error,
        successMessage,
        recoveryType,
        forgetUserId,
        forgetUserPassword,
        changeUserPassword,
        setSuccessMessage,
        setRecoveryType
    }
}