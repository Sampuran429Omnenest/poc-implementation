import { useRef, useState, useEffect } from 'react';
//import preferences_setup from '../../../assets/Preferences_Setup.svg';
import logo from '../../../assets/logo.svg';
import { AdPanel } from './AdPanel';
interface OtpFormProps {
    onSubmit: (otp: number) => Promise<void>;
    loading: boolean;
    error: string | null;
    purpose: 'login' | 'userid-recovery' | 'password-reset';
}

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export const OtpForm = ({ onSubmit, loading, error,purpose }: OtpFormProps) => {
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

    //dynamically change this 
    const getButtonText=()=>{
        if(loading) return 'Verifying...'
        if(purpose==='password-reset') return 'Verify & Set Password'
        if(purpose==='userid-recovery') return 'Verify & Get User ID';
        return 'Login'  
    }
    const allFilled = digits.every(d => d !== '');
    const hasError  = !!error;

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <AdPanel/>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12 border-l border-gray-50">
                <div className="w-full max-w-[350px] flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="relative right-14 w-[140px] h-[40px] object-contain mb-1"
                        />
                        <h1 className="text-[#2A2A2B] text-xl font-semibold">
                            Welcome to Nest App
                        </h1>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#2A2A2B] text-base font-semibold">
    {purpose === 'password-reset'
        ? 'Forgot your password'
        : purpose === 'userid-recovery'
        ? 'Forgot your User ID'
        : 'Enter OTP'}
</h2>
                        <p className="text-[#555555] text-xs">OTP sent on your registered number</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-2">
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
                            <div className="flex items-center gap-1.5" role="alert">
                                <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-500 text-[12px] font-medium">{error}</p>
                            </div>
                        )}
                    </div>

                    <div className="h-[33px] flex items-center -mt-4">
                        {timer > 0 ? (
                            <span className="text-[#555555] text-sm font-medium">
                                Resend in <span className="text-[#2A2A2B] font-bold">{formatted}</span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setTimer(RESEND_SECONDS)}
                                className="text-[#0F62FE] text-sm font-semibold hover:underline"
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
                        {getButtonText()}
                    </button>

                </div>
            </div>
        </div>
    );
};