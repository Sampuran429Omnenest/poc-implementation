import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import logo from '../../../assets/logo.svg';
import preferences_setup from '../../../assets/Preferences_Setup.svg';
import type { ForgetPasswordPayload } from '../../../shared/types/userAuthType';

const schema = z.object({
    panNumber: z.string().min(10).max(10),
    username: z.string().min(1, "Username is required"),
});

interface ForgotPasswordProps {
    onSubmit: (payload: ForgetPasswordPayload) => Promise<void>;
    onBack: () => void;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

export const ForgotUserPasswordForm = ({ onSubmit, onBack, loading, error, successMessage }: ForgotPasswordProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordPayload>({
        resolver: zodResolver(schema),
    });

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            {/* Left Panel - Exact copy of LoginForm */}
            <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-6 xl:p-12 overflow-hidden">
                <div className="absolute inset-0" style={{ border: '1px solid transparent', borderImage: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%) 1' }} />
                <div className="relative flex flex-col items-center justify-center gap-8 text-center shadow-2xl" style={{ width: '90%', maxWidth: '667px', height: '85vh', borderRadius: 24, backgroundColor: '#0F62FE', overflow: 'hidden' }}>
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-8">
                        <h2 className="text-white text-[clamp(24px,3vw,32px)] font-semibold leading-tight">Security Reset</h2>
                        <img src={preferences_setup} alt="Illustration" className="h-[25%] min-h-[180px] object-contain" />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8">
                <div className="w-full max-w-[350px] flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <img src={logo} alt="Logo" className="w-[140px] h-[40px] object-contain mb-2" />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold">Forgot your Password</h1>
                    </div>

                    {successMessage ? (
                        <div className="flex flex-col gap-6">
                            <p className="text-green-600 text-sm font-medium bg-green-50 p-4 rounded border border-green-100">{successMessage}</p>
                            <button onClick={onBack} className="w-full h-[48px] bg-[#0F62FE] text-white font-semibold rounded">Back to Login</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#555555] text-sm font-medium">PAN Number</label>
                                    <input {...register('panNumber')} className={`h-[48px] border rounded px-4 uppercase ${errors.panNumber ? 'border-red-500' : 'border-[#ECEDEE]'}`} placeholder="Enter PAN" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#555555] text-sm font-medium">Username / Client ID</label>
                                    <input {...register('username')} className={`h-[48px] border rounded px-4 ${errors.username ? 'border-red-500' : 'border-[#ECEDEE]'}`} placeholder="Enter ID" />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs -mt-4">{error}</p>}

                            <div className="flex flex-col gap-4">
                                <button type="submit" disabled={loading} className="w-full h-[48px] bg-[#0F62FE] text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-200">
                                    {loading ? 'Submitting...' : 'Reset Password'}
                                </button>
                                <button type="button" onClick={onBack} className="text-[#0F62FE] text-xs font-semibold mx-auto">Back to Login</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};