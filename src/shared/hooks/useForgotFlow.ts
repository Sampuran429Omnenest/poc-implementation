import { useState } from "react"
import type { changePasswordPayload, ForgetPasswordPayload, ForgetUserIdPayload, unblockUserPayload } from "../types/userAuthType"
import { forgetUserId as forgetUserIdApi, forgetUserPassword as forgetUserPasswordApi, changeUserPassword as changeUserPasswordApi, authenticateOtp, unblockUser as unblockUserApi } from "../../api/auth.api"
import { useAuthStore } from "../../store/useAuthStore"
import { parseApiError } from "../utils/parseApiError"

export const useForgotFlow = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [recoveryType, setRecoveryType] = useState<'userid' | 'password' | 'unblock' | null>(null)
    const { username, setStep, setUsername } = useAuthStore();

    const forgetUserId = async (payload: ForgetUserIdPayload) => {
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await forgetUserIdApi(payload)
            setRecoveryType('userid');
            setSuccessMessage("Your User ID has been sent to your registered mobile/email.")
            setStep('credentials')
        } catch (err) {
            const { message } = parseApiError(err)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const forgetUserPassword = async (payload: ForgetPasswordPayload) => {
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await forgetUserPasswordApi(payload)
            setUsername(payload.username)
            setRecoveryType('password')
            setStep('otp')
        } catch (err) {
            const { message } = parseApiError(err)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const changeUserPassword = async (payload: changePasswordPayload) => {
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await changeUserPasswordApi({
                username: username!,
                newPassword: payload.newPassword,
            })
            setSuccessMessage("Password is set successfully.")
            setStep('credentials')
        } catch (err) {
            const { message } = parseApiError(err)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const verifyRecoveryOtp = async (otp: number) => {
        if (!username) return;
        setLoading(true);
        setError(null);
        try {
            await authenticateOtp({ otp, username, isUserBlocked: recoveryType === 'unblock' })
        } catch (err) {
            const { message } = parseApiError(err)
            setError(message)
            throw err;
        } finally {
            setLoading(false)
        }
    }

    const unblockUser = async (payload: unblockUserPayload) => {
        setLoading(true)
        setError(null)
        setSuccessMessage(null);
        try {
            await unblockUserApi(payload)
            setRecoveryType('unblock')
            setStep('otp')
        } catch (err) {
            const { message } = parseApiError(err)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        successMessage,
        recoveryType,
        forgetUserId,
        forgetUserPassword,
        changeUserPassword,
        setSuccessMessage,
        setRecoveryType,
        verifyRecoveryOtp,
        unblockUser
    }
}
