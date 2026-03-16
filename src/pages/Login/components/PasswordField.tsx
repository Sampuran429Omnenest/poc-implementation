import { forwardRef, useState } from 'react';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ error, ...props }, ref) => {
        const [show, setShow] = useState(false);

        return (
            <div className="flex flex-col gap-2">
                <label className="text-[#555555] text-sm font-medium">
                    Password
                </label>
                <div className="relative">
                    <input
                        ref={ref}
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        className={`h-[48px] w-full border rounded px-4 pr-12 text-[#2A2A2B]
                            focus:outline-none transition-colors
                            ${error
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-[#ECEDEE] focus:border-[#0F62FE]'
                            }`}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShow(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                        tabIndex={-1}
                    >
                        {show ? (
                            <svg className="w-5 h-5 text-[#555555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-[#555555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-[12px]">{error}</p>
                )}
            </div>
        );
    }
);