import { useForm } from "react-hook-form";
import type { changePasswordPayload } from "../../../shared/types/userAuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdPanel } from "./AdPanel";
import { changePasswordSchema } from "../schema/changePasswordSchema";
import logo from '../../../assets/logo.svg';
import { ErrorAlert } from "./ErrorAlert";
import { PasswordField } from "./PasswordField";

interface ChangeUserPasswordFormProps{
    onSubmit:(payload:changePasswordPayload)=>Promise<void>
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}
export const ChangeUserPasswordForm=({onSubmit,loading,error}:ChangeUserPasswordFormProps)=>{
    const {register,handleSubmit,watch,formState:{ errors } }=useForm<changePasswordPayload>({
        resolver: zodResolver(changePasswordSchema),
        mode:"onChange" //this is for the live updates
    })
    const oldPassword=watch('oldPassword')
    const newPassword=watch('newPassword')
    const canSubmit=!!oldPassword && !!newPassword && !loading;
    const requirements = [
        { label: "Minimum 8+ characters", met: newPassword.length >= 8 }, 
        { label: "Minimum 1 uppercase letter", met: /[A-Z]/.test(newPassword) },
        { label: "Minimum 1 digit", met: /[0-9]/.test(newPassword) },
        { label: "Minimum 1 special character", met: /[^A-Za-z0-9]/.test(newPassword) },
    ];
    const submit = (data:changePasswordPayload) => {
        onSubmit({ oldPassword: data.oldPassword, newPassword: data.newPassword });
    };
    return(
        <div className="h-screen w-full flex font-sans overflow-hidden bg-white">
            <AdPanel/>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-8 border-l border-gray-50">
                <div className="w-full max-w-[350px] flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="relative right-14 w-[140px] h-[40px] object-contain mb-1"
                        />
                        <h1 className="text-[#2A2A2B] text-[20px] font-semibold leading-7">
                            Welcome to Nest App
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-8">
                        
                        <div className="flex flex-col gap-6">
                            <PasswordField
                            label="New Password"
                            {...register('oldPassword')}
                            error={errors.oldPassword?.message}
                            placeholder="Enter new Password"
                            />
                            <PasswordField
                            label="Re-enter Password"
                            {...register('newPassword')}
                            error={errors.newPassword?.message}
                            placeholder="Confirm new Password"
                            />
                            <div className="grid grid-cols-2 gap-y-2 mt-2">
                                {requirements.map((req,i)=>(
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${req.met ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <span className={`text-[11px] ${req.met ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                      
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

                        
                        {error && <ErrorAlert message={error} />}{/**check for this also */}
                    </form>
                </div>
            </div>
        </div>
    );
}