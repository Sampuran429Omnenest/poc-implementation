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
    loading: boolean;
    error: string | null;
}

export const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
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
        <div className="min-h-screen w-full flex font-sans">

            {/* ── Left panel ── */}
            <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-12 overflow-hidden">

                {/* outer radial gradient border effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        border: '1px solid transparent',
                        borderImage: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%) 1',
                    }}
                />

                {/* blue card with white grid */}
                <div
                    className="relative flex flex-col items-center justify-center gap-8 text-center"
                    style={{
                        width: 667,
                        height: 890,
                        borderRadius: 24,
                        backgroundColor: '#0F62FE',
                        overflow: 'hidden',
                    }}
                >
                    {/* white grid overlay */}
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

                    {/* subtle radial fade over grid so center is clear */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(15,98,254,0.6) 0%, transparent 70%)',
                        }}
                    />

                    {/* content */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-md px-12 w-full h-full">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-[32px] font-semibold leading-[140%]">Take Charge of Your Investments with Us</h2>
                            <p className="text-white/70 text-[14px]">
                                Secure, fast, and reliable access to your portfolio.
                            </p>
                        </div>
                        <img
                            src={preferences_setup}
                            alt="Trading Illustration"
                            className="w-[240px] h-[240px] object-contain"
                        />
                        <div className="flex gap-2">
                            <div className="w-4 h-2 rounded-full bg-white/40"/>
                            <div className="w-2 h-2 rounded-full bg-white"/>
                            <div className="w-2 h-2 rounded-full bg-white"/>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
                <div className="w-full max-w-[350px] flex flex-col gap-[64px]">

                    {/* Header */}
                    <div className="flex flex-col gap-[8px]">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-[162px] h-[48px] object-contain mb-2 object-left mb-2"
                        />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-7">
                            Login
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(submit)} noValidate>
                        <div className="flex flex-col gap-[24px]">

                            {/* Username */}
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

                            {/* Password */}
                            <PasswordField
                                {...register('password')}
                                error={errors.password?.message}
                            />

                            {/* QR — wired later */}
                            <button
                                type="button"
                                className="w-[147px] h-[40px] flex items-center justify-center gap-2 mx-auto
                                    border-2 border-[#0F62FE] rounded text-[#0F62FE] text-[12px]
                                    font-semibold hover:bg-blue-50 transition-colors"
                            >
                                <img src={qrSvg} alt="QR" className="w-[18px] h-[18px]" />
                                Login with QR code
                            </button>

                        </div>

                        {/* API error */}
                        {error && (
                            <div className="flex items-center gap-1.5 mt-4" role="alert">
                                <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-500 text-[12px] font-medium">{error}</p>
                            </div>
                        )}

                        {/* Bottom actions */}
                        <div className="flex flex-col gap-[16px] mt-[64px]">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`w-full h-[48px] text-[16px] font-semibold rounded transition-colors
                                    ${canSubmit
                                        ? 'bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer'
                                        : 'bg-[#ECEDEE] text-[#A0A0A0] cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="flex justify-between items-center w-full mt-2">
                                <button type="button" className="text-[#0F62FE] hover:text-[#0F62FE] text-[12px] font-semibold transition-colors">
                                    Forgot user id or password?
                                </button>
                                <button type="button" className="text-[#0F62FE] hover:text-[#0F62FE] text-[12px] font-semibold transition-colors">
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