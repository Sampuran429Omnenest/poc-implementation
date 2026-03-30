import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginFlow } from "../../shared/hooks/useLoginFlow";
import { LoginForm } from "../../features/auth/Login/components/LoginForm";
import { OtpForm } from "../../features/auth/Login/components/OtpForm";
import { ForgotUserIdForm } from "../../features/auth/Login/components/ForgotUserIdForm";
import { ForgotUserPasswordForm } from "../../features/auth/Login/components/ForgotUserPasswordForm";
import { useForgotFlow } from "../../shared/hooks/useForgotFlow";
import { ChangeUserPasswordForm } from "../../features/auth/Login/components/ChangeUserPasswordForm";
import { UnblockUserForm } from "../../features/auth/Login/components/UnblockUserForm";
const Login = () => {
    const navigate = useNavigate();
    const {
        step,
        loading: loginLoading,
        error: loginError,
        isBlocked,
        setStep,
        initiateHandshake,
        submitCredentials,
        submitOtp,
        setIsBlocked,
    } = useLoginFlow();
    const {
        loading: forgotLoading,
        error: forgotError,
        successMessage,
        recoveryType,
        forgetUserId,
        forgetUserPassword,
        changeUserPassword,
        verifyRecoveryOtp,
        unblockUser,
        setSuccessMessage,
        setRecoveryType,
    } = useForgotFlow();

    const isLoading = loginLoading || forgotLoading;
    const currentError = loginError || forgotError;

    useEffect(() => {
        initiateHandshake();
    }, []);
    useEffect(() => {
        if (step === "success") navigate("/orders", { replace: true });
    }, [step]);

    const handleOtpSubmit = async (otp: number) => {
        try {
            //always reset recoveryType to null when a recovery flow completes so the next normal login hits the correct else branch.
            if (recoveryType === "password") {
                await verifyRecoveryOtp(otp);
                setRecoveryType(null);
                setStep("change-password");
            } else if (recoveryType === "unblock") {
                await verifyRecoveryOtp(otp);
                setSuccessMessage(
                    "Your account has been successfully unblocked. Please login.",
                );
                setIsBlocked(false);
                setRecoveryType(null);
                setStep("credentials");
            } else {
                await submitOtp(otp);
            }
        } catch {
            // error handled in hooks
        }
    };
    return (
        <>
            {step === "credentials" && (
                <LoginForm
                    onSubmit={submitCredentials}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                    onForgotUserId={() => setStep("forgot-userid")}
                    onForgotPassword={() => setStep("forgot-password")}
                    onUnblockUser={() => setStep("unblock-user")}
                    isBlocked={isBlocked}
                />
            )}
            {step === "otp" && (
                <OtpForm
                    purpose={
                        recoveryType === "password"
                            ? "password-reset"
                            : recoveryType === "unblock"
                                ? "unblock"
                                : "login"
                    }
                    onSubmit={handleOtpSubmit}
                    loading={isLoading}
                    error={currentError}
                />
            )}
            {step === "change-password" && (
                <ChangeUserPasswordForm
                    onSubmit={changeUserPassword}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                    onBack={() => setStep("credentials")}
                />
            )}
            {step === "forgot-userid" && (
                <ForgotUserIdForm
                    onSubmit={forgetUserId}
                    onBack={() => setStep("credentials")}
                    onSwitchToPassword={() => setStep("forgot-password")}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                />
            )}
            {step === "forgot-password" && (
                <ForgotUserPasswordForm
                    onSubmit={forgetUserPassword}
                    onBack={() => setStep("credentials")}
                    loading={isLoading}
                    onSwitchToUserId={() => setStep("forgot-userid")}
                    error={currentError}
                    successMessage={successMessage}
                />
            )}
            {step === "unblock-user" && (
                <UnblockUserForm
                    onSubmit={unblockUser}
                    onBack={() => setStep("credentials")}
                    loading={isLoading}
                    error={currentError}
                />
            )}
        </>
    );
};

export default Login;
