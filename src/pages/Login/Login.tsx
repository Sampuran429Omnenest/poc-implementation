import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginFlow } from '../../shared/hooks/useLoginFlow';
import { LoginForm } from './components/LoginForm';
import { OtpForm } from './components/OtpForm';
import { ForgotUserIdForm } from './components/ForgotUserIdForm';
import { ForgotUserPasswordForm } from './components/ForgotUserPasswordForm';
const Login = () => {
    const navigate = useNavigate();
    const { step, loading, error,successMessage,setStep, initiateHandshake, submitCredentials, submitOtp,forgetUserId,forgetUserPassword } = useLoginFlow();

    useEffect(() => { initiateHandshake(); }, []);

    useEffect(() => {
        if (step === 'success') navigate('/dashboard', { replace: true });
    }, [step]);

    return (
        <>
            {step === 'credentials' && (
                <LoginForm onSubmit={submitCredentials} loading={loading} error={error} onForgotUserId={() => setStep('forgot-userid')} onForgotPassword={() => setStep('forgot-password')}/>
            )}
            {step === 'otp' && (
                <OtpForm onSubmit={submitOtp} loading={loading} error={error} />
            )}
            {step === 'forgot-userid' && (
                <ForgotUserIdForm 
                    onSubmit={forgetUserId} 
                    onBack={() => setStep('credentials')}
                    loading={loading} 
                    error={error}
                    successMessage={successMessage}
                />
            )}
            {step === 'forgot-password' && (
                <ForgotUserPasswordForm 
                    onSubmit={forgetUserPassword} 
                    onBack={() => setStep('credentials')}
                    loading={loading} 
                    error={error}
                    successMessage={successMessage}
                />
            )}
        </>
    );
};

export default Login;