import { z } from 'zod';
import type { ForgetUserIdPayload } from '../../../../shared/types/userAuthType';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import logo from '../../../../assets/logo.svg';
import { AdPanel } from './AdPanel';
import goBack from "../../../../assets/goBack.svg"

const schema = z.object({
    panNumber: z.string()
        .trim()
        .length(10, "PAN must be 10 characters")
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please use ALL CAPS for PAN"),
    emailId: z.string()
        .trim()
        .toLowerCase()
        .min(1, "Mobile or Email is required")
});

interface ForgotUserIdProps {
    onSubmit: (payload: ForgetUserIdPayload) => Promise<void>;
    onBack: () => void;
    loading: boolean;
    onSwitchToPassword: () => void;
    error: string | null;
    successMessage: string | null;
}

export const ForgotUserIdForm = ({ onSubmit, onBack, loading, error, successMessage, onSwitchToPassword }: ForgotUserIdProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetUserIdPayload>({
        resolver: zodResolver(schema)
    });

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <AdPanel />
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8">
                <div className="w-full max-w-[350px] flex flex-col gap-10">

                    <div className="flex flex-col gap-4">

                        
                        <div className="flex flex-col gap-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="relative right-14 w-[140px] h-[40px] object-contain"
                            />
                            <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-tight">
                                Nest App
                            </h1>
                        </div>

                        
                        <div className="mt-2 border-b border-[#ECEDEE]">
                            <div className="flex justify-center items-center gap-10">

                                {/* FIX: Was incorrectly marked as ACTIVE and had the onClick handler.
                                    This tab should be INACTIVE since we are on the Forgot User ID form.
                                    Added onClick={onSwitchToPassword} to navigate away from this form. */}
                                <button
                                    type="button"
                                    onClick={onSwitchToPassword}
                                    className="text-[#6B7280] text-[14px] font-semibold pb-2 border-b-2 border-transparent hover:text-[#0F62FE] hover:border-[#0F62FE] transition-all"
                                >
                                    Forgot Password
                                </button>

                                {/* FIX: Was incorrectly marked as INACTIVE and had no onClick handler.
                                    This tab should be ACTIVE since we are currently on the Forgot User ID form.
                                    Removed onClick as clicking the current active tab should do nothing. */}
                                <button
                                    type="button"
                                    className="text-[#0F62FE] text-[14px] font-semibold pb-2 border-b-2 border-[#0F62FE]"
                                >
                                    Forgot User ID
                                </button>

                            </div>
                        </div>

                    </div>

                    {successMessage ? (
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#E9FAF0] border border-[#ccf5df] p-4 rounded-[4px] flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#1A8245]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-[#1A8245] text-sm font-medium">{successMessage}</p>
                            </div>
                            <button onClick={onBack} className="w-full h-[48px] bg-[#0F62FE] text-white font-semibold rounded hover:bg-blue-700 transition-all">
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#555555] text-sm font-medium">Mobile/Email ID</label>
                                    <input
                                        {...register('emailId')}
                                        className={`h-[48px] border rounded px-4 focus:outline-none focus:border-[#0F62FE] transition-colors ${errors.emailId ? 'border-red-500' : 'border-[#ECEDEE]'}`}
                                        placeholder="Enter mobile/Email ID"
                                    />
                                    {errors.emailId && <p className="text-red-500 text-[11px] mt-1">{errors.emailId.message}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[#555555] text-sm font-medium">PAN</label>
                                    <input
                                        {...register('panNumber')}
                                        className={`h-[48px] border rounded px-4 focus:outline-none focus:border-[#0F62FE] transition-colors ${errors.panNumber ? 'border-red-500' : 'border-[#ECEDEE]'}`}
                                        placeholder="Enter PAN"
                                    />
                                    {errors.panNumber && <p className="text-red-500 text-[11px] mt-1">{errors.panNumber.message}</p>}
                                </div>
                            </div>

                            {error && (
                                <div className="bg-[#FAEBE9] border border-[#f5d0cc] p-3 rounded flex items-center gap-2">
                                    <span className="text-red-600 text-xs font-medium">{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col gap-4 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full h-[48px] text-white font-semibold rounded active:scale-[0.98] transition-all ${loading ? 'bg-gray-300' : 'bg-[#0F62FE] hover:bg-blue-700'}`}
                                >
                                    {loading ? 'Processing...' : 'Proceed'}
                                </button>
                                <div className="flex items-center gap-1 justify-center">
                                    <img src={goBack} alt="GoBack" className="w-4 h-4" />
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        className="text-[#0F62FE] text-[12px] font-semibold hover:underline"
                                    >
                                        Go back
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};