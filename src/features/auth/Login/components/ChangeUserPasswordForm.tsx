import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdPanel } from "./AdPanel";
import { changePasswordSchema } from "../schema/changePasswordSchema";
import logo from "../../../../assets/logo.svg"
import { ErrorAlert } from "./ErrorAlert";
import { PasswordField } from "./PasswordField";
import type { changePasswordPayload } from "../../../../shared/types/userAuthType";
type ChangePasswordFormFields = {
    password: string;
    reenterPassword: string;
}

interface ChangeUserPasswordFormProps {
    onSubmit: (payload: changePasswordPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
    onBack: () => void;
}

export const ChangeUserPasswordForm = ({ onSubmit, loading, error, successMessage, onBack }: ChangeUserPasswordFormProps) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordFormFields>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange"
    });

    const password = watch('password') ?? '';
    const reenterPassword = watch('reenterPassword') ?? '';
    const canSubmit = !!password && !!reenterPassword && !loading;

    const requirements = [
        { label: "Minimum 8+ characters", met: password.length >= 8 },
        { label: "Minimum 1 uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Minimum 1 digit", met: /[0-9]/.test(password) },
        { label: "Minimum 1 special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
    const submit = (data: ChangePasswordFormFields) => {
        onSubmit({
            username:'',
            newPassword: data.password,
        });
    };
    return (
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <AdPanel />
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8">
                <div className="w-full max-w-[350px] flex flex-col gap-10">

                    {/* LOGO + TITLE */}
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

                    {/* SUCCESS STATE */}
                    {successMessage ? (
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#E9FAF0] border border-[#ccf5df] p-4 rounded-[4px] flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#1A8245]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-[#1A8245] text-sm font-medium">{successMessage}</p>
                            </div>
                            <button
                                onClick={onBack}
                                className="w-full h-[48px] bg-[#0F62FE] text-white font-semibold rounded hover:bg-blue-700 transition-all"
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-8">
                            <div className="flex flex-col gap-6">

                                <PasswordField
                                    label="New Password"
                                    {...register('password')}
                                    error={errors.password?.message}
                                    placeholder="Enter new password"
                                />

                                <PasswordField
                                    label="Re-enter Password"
                                    {...register('reenterPassword')}
                                    error={errors.reenterPassword?.message}
                                    placeholder="Confirm new password"
                                />

                                {/* REQUIREMENTS — dot and label are siblings, not nested */}
                                <div className="grid grid-cols-2 gap-y-2 mt-2">
                                    {requirements.map((req, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${req.met ? 'bg-green-500' : 'bg-gray-300'}`} />
                                            <span className={`text-[11px] ${req.met ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {error && <ErrorAlert message={error} />}

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
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}