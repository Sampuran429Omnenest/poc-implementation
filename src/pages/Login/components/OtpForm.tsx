import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, type OtpFormValues } from '../schema/login.otpSchema';

interface OtpFormProps {
    onSubmit: (otp: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const OtpForm = ({ onSubmit, loading, error }: OtpFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
    });

    const submit = (data: OtpFormValues) => {
        onSubmit(data.otp);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-white text-2xl font-semibold tracking-tight">
                        Verify OTP
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Enter the OTP sent to your registered number
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">

                    {/* OTP */}
                    <div className="space-y-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">
                            OTP
                        </label>
                        <input
                            {...register('otp')}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Enter OTP"
                            className={`w-full bg-zinc-900 border text-white text-sm px-4 py-3 rounded-lg outline-none
                                placeholder:text-zinc-600 tracking-widest transition-colors
                                focus:border-zinc-500
                                ${errors.otp ? 'border-red-500/70' : 'border-zinc-800'}`}
                        />
                        {errors.otp && (
                            <p className="text-red-400 text-xs">{errors.otp.message}</p>
                        )}
                    </div>

                    {/* API error */}
                    {error && (
                        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black text-sm font-medium py-3 rounded-lg
                            hover:bg-zinc-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                </form>
            </div>
        </div>
    );
};