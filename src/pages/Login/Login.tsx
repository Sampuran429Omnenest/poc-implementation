import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginFlow } from '../../shared/hooks/useLoginFlow';
import { LoginForm } from './components/LoginForm';
import { OtpForm } from './components/OtpForm';
import { ForgotUserIdForm } from './components/ForgotUserIdForm';
import { ForgotUserPasswordForm } from './components/ForgotUserPasswordForm';
import { useForgotFlow } from '../../shared/hooks/useForgotFlow';
import { ChangeUserPasswordForm } from './components/ChangeUserPasswordForm';
import { UnblockUserForm } from './components/UnblockUserForm'; // FIX: missing import

const Login = () => {
    const navigate = useNavigate();
    const { step, loading: loginLoading, error: loginError,isBlocked,setStep, initiateHandshake, submitCredentials, submitOtp } = useLoginFlow();
    const { loading: forgotLoading, error: forgotError, successMessage, recoveryType, forgetUserId, forgetUserPassword, changeUserPassword, verifyRecoveryOtp, unblockUser } = useForgotFlow();

    const isLoading = loginLoading || forgotLoading;
    const currentError = loginError || forgotError;

    useEffect(() => { initiateHandshake(); }, []);
    useEffect(() => {
        if (step === 'success') navigate('/dashboard', { replace: true });
    }, [step]);

    const handleOtpSubmit = async (otp: number) => {
        try {
            if (recoveryType === 'password') {
                await verifyRecoveryOtp(otp);
                setStep('change-password');
            } else if (recoveryType === 'unblock') {
                await verifyRecoveryOtp(otp);
                setStep('credentials');
            } else {
                await submitOtp(otp);
            }
        } catch {
            // error handled in hooks
        }
    }
    console.log(isBlocked)
    console.log(currentError)
    console.log(loginError)
    console.log(forgotError)
    return (
        <>
            {step === 'credentials' && (
                <LoginForm
                    onSubmit={submitCredentials}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                    onForgotUserId={() => setStep('forgot-userid')}
                    onForgotPassword={() => setStep('forgot-password')}
                    onUnblockUser={()=>setStep('unblock-user')}
                    isBlocked={isBlocked}
                />
            )}
            {step === 'otp' && (
                <OtpForm
                    purpose={
                        recoveryType === 'password' ? 'password-reset' :
                        recoveryType === 'unblock'  ? 'unblock'        :
                        'login'
                    }
                    onSubmit={handleOtpSubmit}
                    loading={isLoading}
                    error={currentError}
                />
            )}
            {step === 'change-password' && (
                <ChangeUserPasswordForm
                    onSubmit={changeUserPassword}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                    onBack={() => setStep('credentials')}
                />
            )}
            {step === 'forgot-userid' && (
                <ForgotUserIdForm
                    onSubmit={forgetUserId}
                    onBack={() => setStep('credentials')}
                    onSwitchToPassword={() => setStep('forgot-password')}
                    loading={isLoading}
                    error={currentError}
                    successMessage={successMessage}
                />
            )}
            {step === 'forgot-password' && (
                <ForgotUserPasswordForm
                    onSubmit={forgetUserPassword}
                    onBack={() => setStep('credentials')}
                    loading={isLoading}
                    onSwitchToUserId={() => setStep('forgot-userid')}
                    error={currentError}
                    successMessage={successMessage}
                />
            )}
            {step === 'unblock-user' && (
                <UnblockUserForm
                    onSubmit={unblockUser}
                    onBack={() => setStep('credentials')}
                    loading={isLoading}
                    error={currentError}
                />
            )}
        </>
    );
};

export default Login;