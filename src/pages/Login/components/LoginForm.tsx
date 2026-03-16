import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchemaWithUserCheck, type LoginFormValues } from '../schema/login.schema';
import type { LoginPayload } from '../../../shared/types/userAuthType';
import { useState } from 'react';

interface LoginFormProps {
    onSubmit: (payload: LoginPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchemaWithUserCheck),
    });

    const submit = (data: LoginFormValues) => {
        onSubmit({ username: data.username, password: data.password });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-white text-2xl font-semibold tracking-tight">
                        Sign in
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Enter your credentials to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">

                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">
                            Username
                        </label>
                        <input
                            {...register('username')}
                            type="text"
                            autoComplete="username"
                            placeholder="Enter username"
                            className={`w-full bg-zinc-900 border text-white text-sm px-4 py-3 rounded-lg outline-none
                                placeholder:text-zinc-600 transition-colors
                                focus:border-zinc-500
                                ${errors.username ? 'border-red-500/70' : 'border-zinc-800'}`}
                        />
                        {errors.username && (
                            <p className="text-red-400 text-xs">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Enter password"
                                className={`w-full bg-zinc-900 border text-white text-sm px-4 py-3 pr-11 rounded-lg outline-none
                                    placeholder:text-zinc-600 transition-colors
                                    focus:border-zinc-500
                                    ${errors.password ? 'border-red-500/70' : 'border-zinc-800'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {showPassword ? (
                                    // eye-off
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    // eye
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs">{errors.password.message}</p>
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
                        {loading ? 'Signing in...' : 'Continue'}
                    </button>

                </form>
            </div>
        </div>
    );
};