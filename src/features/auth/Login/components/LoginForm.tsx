import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchemaWithUserCheck, type LoginFormValues } from '../schema/login.schema';
import { PasswordField } from './PasswordField';
import { ErrorAlert } from './ErrorAlert';
import type { LoginPayload } from '../../../../shared/types/userAuthType';
import logo from '../../../../assets/logo.svg';
//import preferences_setup from '../../../assets/Preferences_Setup.svg';
import qrSvg from '../../../../assets/qr.svg';
import { AdPanel } from './AdPanel';

interface LoginFormProps {
    onSubmit: (payload: LoginPayload) => Promise<void>;
    onForgotUserId: () => void;
    onForgotPassword: () => void;
    onUnblockUser: () => void;
    loading: boolean;
    error: string | null;
    successMessage:string|null;
    isBlocked:boolean
}

export const LoginForm = ({ 
    onSubmit,  
    onForgotUserId,
    onUnblockUser,
    loading, 
    error,
    successMessage,
    isBlocked
}: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchemaWithUserCheck),
    });

    const username = watch('username');
    const password = watch('password');
    const canSubmit = !!username && !!password && !loading;

    const submit = (data: LoginFormValues) => {
        onSubmit({ username: data.username, password: data.password });
    };

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
           
            {/* <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-6 xl:p-12 overflow-hidden bg-white">
                <div
                    className="relative flex flex-col items-center justify-center gap-8 text-center shadow-[0_20px_50px_rgba(15,98,254,0.2)]"
                    style={{
                        width: '90%',
                        maxWidth: '667px',
                        height: '85vh',
                        maxHeight: '890px',
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
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-md px-8 w-full h-full">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-[clamp(24px,3vw,32px)] font-semibold leading-tight">
                                Take Charge of Your Investments with Us
                            </h2>
                            <p className="text-white/70 text-sm">
                                Secure, fast, and reliable access to your portfolio.
                            </p>
                        </div>
                        <img
                            src={preferences_setup}
                            alt="Trading Illustration"
                            className="h-[25%] min-h-[180px] object-contain"
                        />
                    </div>
                </div>
            </div> */}
            <AdPanel/>

        
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8 border-l border-gray-50">
                <div className="w-full max-w-[350px] flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="relative right-14 w-[140px] h-[40px] object-contain mb-1"
                        />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-7">
                            Welcome to Nest App
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-8">
                        
                        <div className="flex flex-col gap-6">
                           {successMessage && (
                            <div className="flex items-center gap-4 w-full px-4 py-3 rounded-[4px] bg-[#E9FAF0] border border-[#ccf5df]"
                                role="status">
                                    <svg className="w-5 h-5 text-[#1A8245] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-[#2A2A2B] text-[13px] font-medium leading-tight">
                                        {successMessage}
                                    </p>
                            </div>
                           )}
                           <div className="flex flex-col gap-2">
                                <label className="text-[#555555] text-sm font-medium">
                                    Mobile no. / Email / Client ID
                                </label>
                                <input
                                    {...register('username')}
                                    type="text"
                                    placeholder="Enter Mobile no. / Email"
                                    className={`h-[48px] w-full border rounded px-4 text-[#2A2A2B] focus:outline-none transition-colors ${
                                        errors.username ? 'border-red-500' : 'border-[#ECEDEE] focus:border-[#0F62FE]'
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
                                className="w-fit px-4 h-[40px] flex items-center justify-center gap-2 mx-auto border-2 border-[#0F62FE] rounded text-[#0F62FE] text-[12px] font-semibold hover:bg-blue-50 transition-colors"
                            >
                                <img src={qrSvg} alt="QR" className="w-[18px] h-[18px]" />
                                Login with QR code
                            </button>
                        </div>

                      
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`w-full h-[48px] text-base font-semibold rounded transition-all active:scale-[0.98] ${
                                    canSubmit
                                        ? 'bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer'
                                        : 'bg-[#ECEDEE] text-[#A0A0A0] cursor-not-allowed'
                                }`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="flex flex-row items-center justify-between w-full gap-2">
                                <div className="flex items-center gap-2 text-[#0F62FE] text-[12px] font-semibold">
                                    <button type="button" onClick={onForgotUserId} className="hover:underline text-left">Forgot user ID or password?</button>
                                    {/* <span className="text-gray-300">|</span> */}
                                    {/* <button type="button" onClick={onForgotPassword} className="hover:underline">Forgot Password?</button> */}
                                </div>
                                <button type="button" className="text-[#0F62FE] text-[12px] font-semibold hover:underline  whitespace-nowrap">
                                    Guest login
                                </button>
                            </div>
                        </div>
                        {isBlocked ? (
                            <div className="bg-[#FAEBE9] border border-[#f5d0cc] p-3 rounded flex items-center justify-between gap-3">
                                <span className="text-red-600 text-xs font-medium">
                                    Your account has been blocked due to multiple failed attempts.
                                </span>
                                <button
                                    type="button"
                                    onClick={onUnblockUser}
                                    className="text-[#0F62FE] text-[12px] font-semibold whitespace-nowrap hover:underline shrink-0"
                                >
                                    Unblock Account
                                </button>
                            </div>
                        ):(
                            error && <ErrorAlert message="Invalid username or password" />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};