import api from './axios';
import { getAuthHeaders } from '../shared/utils/requestHeader';
import type {
    PreAuthResponse,
    LoginPayload,
    OtpPayload,
    ValidateOtpResponse,
    ForgetUserIdPayload,
    ForgetUserIdResponse,
    ForgetPasswordPayload,
    ForgetPasswordResponse,
    changePasswordPayload,
    AuthenticateOtpPayload,
    AuthenticateOtpResponse,
    changePasswordResponse,
    unblockUserPayload,
    unblockUserResponse,
} from '../shared/types/userAuthType';

export const preAuthHandshake = async (): Promise<PreAuthResponse> => {
    const response = await api.post<PreAuthResponse>(
        '/v1/api/auth/pre-auth-handshake',
        {
            devicePublicKey: import.meta.env.VITE_STATIC_PUBLIC_KEY,
        },
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const login = async (payload: LoginPayload): Promise<void> => {
    await api.post(
        '/v1/api/auth/login',
        {
            username: payload.username,
            password: payload.password,
        },
        { headers: getAuthHeaders() }
    );
};

export const validateOtp = async (payload: OtpPayload): Promise<ValidateOtpResponse> => {
    const response = await api.post<ValidateOtpResponse>(
        '/v2/api/auth/validate-otp',
        {
            username: payload.username,
            otp: Number(payload.otp),       // broker spec: number
        },
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const authenticateOtp=async(payload:AuthenticateOtpPayload):Promise<AuthenticateOtpResponse>=>{
    await api.post(
        '/v1/api/auth/authenticate-otp',
        {
            otp:payload.otp,
            username:payload.username,
            isUserBlocked:payload.isUserBlocked,
        },
        {headers:getAuthHeaders()}
    );
};
export const forgetUserId=async (payload:ForgetUserIdPayload):Promise<ForgetUserIdResponse>=>{
    await api.post(
        '/v1/api/auth/forgot-user-id',
        {
            panNumber:payload.panNumber,
            emailId:payload.emailId,
        },
        {headers:getAuthHeaders()}
    );
};

export const forgetUserPassword=async (payload:ForgetPasswordPayload):Promise<ForgetPasswordResponse>=>{
    await api.post(
        '/v1/api/auth/forgot-password',
        {
            panNumber:payload.panNumber,
            username:payload.username,
        },
        {headers:getAuthHeaders()}
    );
};

export const changeUserPassword=async (payload:changePasswordPayload):Promise<changePasswordResponse>=>{
    await api.post(
        '/v1/api/auth/set-password',
        {
            username:payload.username,
            password:payload.newPassword,
        },
        {headers:getAuthHeaders()},
    );
};

export const unblockUser=async (payload:unblockUserPayload):Promise<unblockUserResponse>=>{
    await api.post(
        '/v1/api/auth/unblock-user',
        {
            username:payload.username,
            panNumber:payload.panNumber,
        },
        {headers:getAuthHeaders()},
    );
};
