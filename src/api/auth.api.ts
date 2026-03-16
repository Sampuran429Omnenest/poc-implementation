import api from './axios';
import { getAuthHeaders } from '../shared/utils/requestHeader';
import type {
    PreAuthResponse,
    LoginPayload,
    OtpPayload,
    ValidateOtpResponse,
} from '../shared/types/userAuthType';

export const preAuthHandshake = async (): Promise<PreAuthResponse> => {
    const response = await api.post<PreAuthResponse>(
        '/v1/api/auth/pre-auth',
        {},
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