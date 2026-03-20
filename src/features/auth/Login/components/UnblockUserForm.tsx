import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdPanel } from './AdPanel';
import logo from "../../../../assets/logo.svg"
import goBack from "../../../../assets/goBack.svg"

import type { unblockUserPayload } from '../../../../shared/types/userAuthType';
const schema = z.object({
    username: z.string().min(1, "Client ID is required"),
    panNumber: z.string()
        .trim()
        .length(10, "PAN must be 10 characters")
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please use ALL CAPS for PAN"),
});

interface UnblockUserFormProps {
    onSubmit: (payload: unblockUserPayload) => Promise<void>;
    onBack: () => void;
    loading: boolean;
    error: string | null;
}

export const UnblockUserForm = ({ onSubmit, onBack, loading, error }: UnblockUserFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<unblockUserPayload>({
        resolver: zodResolver(schema),
    });

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <AdPanel />
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8">
                <div className="w-full max-w-[350px] flex flex-col gap-10">

                    
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

                    
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#2A2A2B] text-base font-semibold">
                            Unblock Account
                        </h2>
                        <p className="text-[#555555] text-xs">
                            Enter your details to unblock your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">

                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[#555555] text-sm font-medium">Client ID</label>
                                <input
                                    {...register('username')}
                                    placeholder="Enter Client ID"
                                    className={`h-[48px] border rounded px-4 focus:outline-none focus:border-[#0F62FE] transition-colors ${errors.username ? 'border-red-500' : 'border-[#ECEDEE]'}`}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-[11px] mt-1">{errors.username.message}</p>
                                )}
                            </div>

                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[#555555] text-sm font-medium">PAN</label>
                                <input
                                    {...register('panNumber')}
                                    placeholder="Enter PAN"
                                    className={`h-[48px] border rounded px-4 uppercase focus:outline-none focus:border-[#0F62FE] transition-colors ${errors.panNumber ? 'border-red-500' : 'border-[#ECEDEE]'}`}
                                />
                                {errors.panNumber && (
                                    <p className="text-red-500 text-[11px] mt-1">{errors.panNumber.message}</p>
                                )}
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
                                {loading ? 'Processing...' : 'Unblock Account'}
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

                </div>
            </div>
        </div>
    );
};