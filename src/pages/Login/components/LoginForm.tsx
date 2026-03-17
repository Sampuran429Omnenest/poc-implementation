import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchemaWithUserCheck, type LoginFormValues } from '../schema/login.schema';
import { PasswordField } from './PasswordField';
import type { LoginPayload } from '../../../shared/types/userAuthType';
import logo from '../../../assets/logo.svg';
import preferences_setup from '../../../assets/Preferences_Setup.svg';
import qrSvg from '../../../assets/qr.svg';

interface LoginFormProps {
    onSubmit: (payload: LoginPayload) => Promise<void>;
    onForgotUserId: () => void; 
    onForgotPassword: () => void; 
    loading: boolean;
    error: string | null;
}

export const LoginForm = ({ onSubmit, loading, error,onForgotUserId }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchemaWithUserCheck),
    });

    const username  = watch('username');
    const password  = watch('password');
    const canSubmit = !!username && !!password && !loading;

    const submit = (data: LoginFormValues) => {
        onSubmit({ username: data.username, password: data.password });
    };

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-6 xl:p-12 overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        border: '1px solid transparent',
                        borderImage: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%) 1',
                    }}
                />
                <div
                    className="relative flex flex-col items-center justify-center gap-8 text-center shadow-2xl"
                    style={{
                        width: '90%',
                        maxWidth: '667px',
                        height: '85vh',
                        borderRadius: 24,
                        backgroundColor: '#0F62FE',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                            `,
                            backgroundSize: '48px 48px',
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(15,98,254,0.6) 0%, transparent 70%)',
                        }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-md px-8 w-full h-full">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-[clamp(24px,3vw,32px)] font-semibold leading-tight">Take Charge of Your Investments with Us</h2>
                            <p className="text-white/70 text-sm">
                                Secure, fast, and reliable access to your portfolio.
                            </p>
                        </div>
                        <img
                            src={preferences_setup}
                            alt="Trading Illustration"
                            className="h-[25%] min-h-[180px] object-contain"
                        />
                        <div className="flex gap-2 mt-4">
                            <div className="w-4 h-2 rounded-full bg-white/40"/>
                            <div className="w-2 h-2 rounded-full bg-white"/>
                            <div className="w-2 h-2 rounded-full bg-white"/>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8">
                <div className="w-full max-w-[350px] flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-[140px] h-[40px] object-contain mb-2"
                        />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-7">
                            Login
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#555555] text-sm font-medium">
                                    Mobile no. / Email / Client ID
                                </label>
                                <input
                                    {...register('username')}
                                    type="text"
                                    placeholder="Enter Mobile no. / Email"
                                    className={`h-[48px] w-full border rounded px-4 text-[#2A2A2B]
                                        focus:outline-none transition-colors
                                        ${errors.username
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-[#ECEDEE] focus:border-[#0F62FE]'
                                        }`}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-[12px]">{errors.username.message}</p>
                                )}
                            </div>
                            <PasswordField
                                {...register('password')}
                                error={errors.password?.message}
                            />
                            <button
                                type="button"
                                className="w-fit px-4 h-[40px] flex items-center justify-center gap-2 mx-auto
                                    border-2 border-[#0F62FE] rounded text-[#0F62FE] text-[12px]
                                    font-semibold hover:bg-blue-50 transition-colors"
                            >
                                <img src={qrSvg} alt="QR" className="w-[18px] h-[18px]" />
                                Login with QR code
                            </button>

                        </div>

                        {error && (
                            <div className="flex items-center gap-1.5 -mt-4 " role="alert">
                                <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-500 text-[12px] font-medium">{error}</p>
                            </div>
                        )}

                        
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`w-full h-[48px] text-base font-semibold rounded transition-all active:scale-[0.98]
                                    ${canSubmit
                                        ? 'bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer'
                                        : 'bg-[#ECEDEE] text-[#A0A0A0] cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="flex justify-between items-center w-full">
                                <button 
                                    type="button" 
                                    onClick={onForgotUserId} 
                                    className="text-[#0F62FE] hover:underline text-xs font-semibold"
                                >
                                    Forgot user id or password?
                                </button>
                                <button type="button" className="text-[#0F62FE] hover:text-[#0F62FE] text-xs font-semibold">
                                    Guest login
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};