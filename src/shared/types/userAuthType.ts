export interface LoginPayload{
    username:string
    password:string
}
export interface OtpPayload{
    username:string
    otp:number
}
export interface PreAuthResponse{
    message:string
    bffPublicKey:string
}
export type LoginResponse=void

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
export type LoginStep = 'idle' | 'credentials' | 'otp' | 'success';

//currently keeping it as type and not interface when there are things to be added
export type  AuthUser=
    Pick<ValidateOtpResponse,
        'firstName' | 'lastName' | 'username' | 'userId' |
        'accountId' | 'emailId' | 'phoneNumber' | 'brokerName' |
        'userType' | 'enabledExchanges' | 'enabledProductCode' |
        'sipEnabled' | 'marketWatchCount' | 'userSessionId' |
        'isPasswordExpired' | 'indexEnabledExchanges'
    > 