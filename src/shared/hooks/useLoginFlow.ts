import { useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { login, preAuthHandshake, validateOtp} from "../../api/auth.api"
import type { AuthUser, LoginPayload } from "../types/userAuthType"

export const useLoginFlow=()=>{
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
    //const [successMessage,setSuccessMessage]=useState<string|null>(null)
    const {
        step,
        username,
        setPreAuth,
        setUsername,
        setAuthenticated,
        setStep,
    }=useAuthStore()
    const initiateHandshake=async()=>{
        setLoading(true)
        setError(null)
        try {
            await preAuthHandshake()
            setPreAuth();
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
    const submitCredentials=async(payload:LoginPayload)=>{
        setLoading(true)
        setError(null)
        try {
            await login(payload)
            setUsername(payload.username)
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
   
    const submitOtp=async(otp:number)=>{
        if(!username) return
        setLoading(true)
        setError(null)
        try {
            const res=await validateOtp({username,otp})
            const user:AuthUser={
                firstName:             res.firstName,
                lastName:              res.lastName,
                username:              res.username,
                userId:                res.userId,
                accountId:             res.accountId,
                emailId:               res.emailId,
                phoneNumber:           res.phoneNumber,
                brokerName:            res.brokerName,
                userType:              res.userType,
                enabledExchanges:      res.enabledExchanges,
                enabledProductCode:    res.enabledProductCode,
                sipEnabled:            res.sipEnabled,
                marketWatchCount:      res.marketWatchCount,
                userSessionId:         res.userSessionId,
                isPasswordExpired:     res.isPasswordExpired,
                indexEnabledExchanges: res.indexEnabledExchanges,
            }
            setAuthenticated(user,res.jwtTokens.accessToken)
        } catch (err) {
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }
    return{
         step,
        loading,
        error,
        //successMessage,
        setStep,
        initiateHandshake,
        submitCredentials,
        // forgetUserId,
        // forgetUserPassword,
        submitOtp
    }
}
