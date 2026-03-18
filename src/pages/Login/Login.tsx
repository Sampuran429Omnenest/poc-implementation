import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginFlow } from '../../shared/hooks/useLoginFlow';
import { LoginForm } from './components/LoginForm';
import { OtpForm } from './components/OtpForm';
import { ForgotUserIdForm } from './components/ForgotUserIdForm';
import { ForgotUserPasswordForm } from './components/ForgotUserPasswordForm';
import { useForgotFlow } from '../../shared/hooks/useForgotFlow';
import { ChangeUserPasswordForm } from './components/ChangeUserPasswordForm';
const Login = () => {
    const navigate = useNavigate();
    const {step,loading:loginLoading, error:loginError,setStep, initiateHandshake, submitCredentials, submitOtp} = useLoginFlow();
    const {loading:forgotLoading,error:forgotError,successMessage,recoveryType,setSuccessMessage,forgetUserId,forgetUserPassword,changeUserPassword}=useForgotFlow();
    const isLoading = loginLoading || forgotLoading;
    const currentError = loginError || forgotError;
    useEffect(() => { initiateHandshake(); }, []);
    useEffect(() => {
        if (step === 'success') navigate('/dashboard', { replace: true });
    }, [step]);

    const handleOtpSubmit=async(otp:number)=>{
        try {
            await submitOtp(otp);
        if(recoveryType==='userid'){
            setSuccessMessage("User ID sent to your registered mobile/email.");
            setStep('credentials')
        }else if(recoveryType==='password'){
            setStep('change-password')
        }
        } catch  {
            // error is handled
        }
    }
    
    return (
        <>
            {step === 'credentials' && (
                <LoginForm onSubmit={submitCredentials} loading={isLoading} error={currentError} successMessage={successMessage}  onForgotUserId={() => setStep('forgot-userid')} onForgotPassword={() => setStep('forgot-password')}/>
            )}
            {step === 'otp' && (
                <OtpForm purpose={recoveryType === 'password' ? 'password-reset' : recoveryType === 'userid' ? 'userid-recovery' : 'login'} onSubmit={handleOtpSubmit} loading={isLoading} error={currentError} />
            )}
            {step==='change-password' && (
                <ChangeUserPasswordForm onSubmit={changeUserPassword} loading={isLoading} error={currentError} successMessage={successMessage}/>
            )}
            {step === 'forgot-userid' && (
                <ForgotUserIdForm 
                    onSubmit={forgetUserId} 
                    onBack={() => setStep('credentials')}
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
                    error={currentError}
                    successMessage={successMessage}
                />
            )}
        </>
    );
};

export default Login;