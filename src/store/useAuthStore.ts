import { create } from "zustand";
import type { AuthUser, LoginStep } from "../shared/types/userAuthType";

interface AuthState{
    user:AuthUser|null
    accessToken:string|null
    username:string|null
    bffPublicKey:string|null
    step:LoginStep
    isAuthenticated:boolean
    setPreAuth:()=>void
    setUsername:(username:string)=>void
    setAuthenticated:(user:AuthUser,accessToken:string)=>void
    setStep:(step:LoginStep)=>void
    reset:()=>void
}
const initialState={
    user:null,
    accessToken:null,
    username:null,
    bffPublicKey:null,
    step:'idle' as LoginStep,
    isAuthenticated:false,
}
export const useAuthStore=create<AuthState>((set)=>({
    ... initialState,
    //When you add `crypto.ts` later**, only two lines change:
    //- store the key → `setPreAuth(bffPublicKey)`
    //- encrypt before sending → `encryptPassword(password, bffPublicKey)`
    setPreAuth:()=>
        set({step:'credentials'}),
    setUsername:(username)=>
        set({username,step:'otp'}),
    setAuthenticated:(user,accessToken)=>
        set({user,accessToken,isAuthenticated:true,step:'success'}),
    setStep:(step)=>
        set({step}),
    reset:()=>
        set(initialState)
}))