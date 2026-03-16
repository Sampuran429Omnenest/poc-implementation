import { useRef, useState, useEffect } from 'react';
import preferences_setup from '../../../assets/Preferences_Setup.svg';
import logo from '../../../assets/logo.svg';
interface OtpFormProps {
    onSubmit: (otp: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export const OtpForm = ({ onSubmit, loading, error }: OtpFormProps) => {
    const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer]   = useState(RESEND_SECONDS);
    const inputRefs           = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer === 0) return;
        const id = setTimeout(() => setTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer]);

    const formatted = `00:${String(timer).padStart(2, '0')}`;

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...digits];
        next[index] = value;
        setDigits(next);
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        const next = Array(OTP_LENGTH).fill('');
        pasted.split('').forEach((char, i) => { next[i] = char; });
        setDigits(next);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleSubmit = () => {
        const otp = Number(digits.join(''));
        onSubmit(otp);
    };

    const allFilled = digits.every(d => d !== '');
    const hasError  = !!error;

    return (
        // 1. outer bg removed
        <div className="min-h-screen w-full flex font-sans">

            {/* ── Left panel — identical to LoginForm ── */}
            <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-12 overflow-hidden">

                {/* radial gradient border */}
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

                    {/* radial fade over grid */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(15,98,254,0.6) 0%, transparent 70%)',
                        }}
                    />

                    {/* 2. content — text top, image center, dots bottom */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-md px-12 w-full h-full">

                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-[32px] font-semibold leading-[140%]">
                                Welcome to the Future of Trading
                            </h2>
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
                            <div className="w-4 h-2 rounded-full bg-white/40" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>

                    </div>
                </div>
            </div>

            {/* ── Right OTP panel ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
                <div className="w-full max-w-[350px] flex flex-col gap-6">
                    <div className="flex flex-col gap-[8px]">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-[162px] h-[48px] object-contain mb-2 object-left mb-2"
                        />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-7">
                            Welcome to Nest App
                        </h1>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#2A2A2B] text-[16px] font-semibold">Enter OTP</h2>
                        <p className="text-[#555555] text-[12px]">OTP sent on your registered number</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            {digits.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => { inputRefs.current[i] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    className={`w-[48px] h-[48px] rounded-[4px] border bg-white text-center
                                        text-lg font-semibold focus:outline-none transition-all shadow-sm
                                        ${hasError
                                            ? 'border-red-500 text-red-500 focus:ring-1 focus:ring-red-500'
                                            : 'border-[#ECEDEE] focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE]'
                                        }`}
                                />
                            ))}
                        </div>

                        {hasError && (
                            <div className="flex items-center gap-1.5 mt-1" role="alert">
                                <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-500 text-[12px] font-medium">{error}</p>
                            </div>
                        )}
                    </div>

                    <div className="h-[33px] flex items-center">
                        {timer > 0 ? (
                            <span className="text-[#555555] text-[14px] font-medium">
                                Resend in <span className="text-[#2A2A2B] font-bold">{formatted}</span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setTimer(RESEND_SECONDS)}
                                className="text-[#0F62FE] text-[14px] font-semibold hover:underline"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!allFilled || loading}
                        className={`w-full h-[48px] text-[16px] font-semibold rounded-[4px] transition-all active:scale-[0.98]
                            ${allFilled && !loading
                                ? 'bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer'
                                : 'bg-[#ECEDEE] text-[#A0A0A0] cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>

                </div>
            </div>
        </div>
    );
};