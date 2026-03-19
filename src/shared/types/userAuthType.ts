export interface LoginPayload{
    username:string
    password:string
}
export interface OtpPayload{
    username:string
    otp:number
}
export interface AuthenticateOtpPayload{
    otp:number
    username:string
    isUserBlocked:boolean
}
export interface ForgetUserIdPayload{
    panNumber:string
    emailId:string
}
export interface ForgetPasswordPayload{
    panNumber:string,
    username:string
}
export interface changePasswordPayload{
    username:string,
    newPassword:string
}
export interface unblockUserPayload{
    panNumber:string,
    username:string
}
export interface PreAuthResponse{
    message:string
    bffPublicKey:string
}
export type LoginResponse=void
export type ForgetUserIdResponse=void
export type ForgetPasswordResponse=void
export type changePasswordResponse=void
export type AuthenticateOtpResponse=void
export type unblockUserResponse=void
export interface KraResponse {
    kraMessage: string
    kraUrl: string[]
}

export interface JwtTokens{
    accessToken:string
    refreshToken:string
}

export interface ValidateOtpResponse{
    firstName:string
    lastName:string
    username:string
    userId:number
    accountId:string
    emailId:string
    phoneNumber:number
    enabledExchanges:string[]
    enabledProductCode:string[]
    brokerName:string
    branchId:string
    userType:string
    jwtTokens:JwtTokens
    loginMessage:string
    discloseUrl:string
    gttEnabled:boolean
    kraResponse:KraResponse
    sipEnabled:boolean
    marketWatchCount:string
    userSessionId:number
    isPasswordExpired:boolean
    indexEnabledExchanges:string[]|null
}
export type LoginStep = 'idle' | 'credentials' | 'otp' | 'forgot-userid' | 'change-password' | 'forgot-password' | 'unblock-user' | 'success';
//currently keeping it as type and not interface when there are things to be added
export type  AuthUser=
    Pick<ValidateOtpResponse,
        'firstName' | 'lastName' | 'username' | 'userId' |
        'accountId' | 'emailId' | 'phoneNumber' | 'brokerName' |
        'userType' | 'enabledExchanges' | 'enabledProductCode' |
        'sipEnabled' | 'marketWatchCount' | 'userSessionId' |
        'isPasswordExpired' | 'indexEnabledExchanges'
    > 