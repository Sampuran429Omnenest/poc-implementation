import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginFlow } from '../../shared/hooks/useLoginFlow';
import { LoginForm } from './components/LoginForm';
import { OtpForm } from './components/OtpForm';

const Login = () => {
    const navigate = useNavigate();
    const { step, loading, error, initiateHandshake, submitCredentials, submitOtp } = useLoginFlow();

    useEffect(() => {
        initiateHandshake();
    }, []);

    useEffect(() => {
        if (step === 'success') navigate('/dashboard', { replace: true });
    }, [step]);

    return (
        <>
            {step === 'credentials' && (
                <LoginForm
                    onSubmit={submitCredentials}
                    loading={loading}
                    error={error}
                />
            )}
            {step === 'otp' && (
                <OtpForm
                    onSubmit={submitOtp}
                    loading={loading}
                    error={error}
                />
            )}
        </>
    );
};

export default Login;