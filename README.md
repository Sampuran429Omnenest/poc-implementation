# poc-implementation

## Tickets Completed

- **PR 2.3**: Login via User ID (Pre auth Token, login)
- **PR 2.4**: Password Policy
    - 8 characters
    - Alphanumeric
    - One special character
    - One uppercase character
    - Can’t contain userid
- **PR 2.5**: Forgot User ID
- **PR 2.6**: Forgot Password
- **Change Password form creation and logic
- **Unblock User with authenticate otp form creation and logic 

## Folder Structure

```
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
public/
src/
    App.css
    App.tsx
    index.css
    main.tsx
    api/
        auth.api.ts
        axios.ts
        interceptors.ts
    assets/
        bootstrap/
            services.ts
    pages/
        Login/
            Login.tsx
            components/
                AdPanel.tsx(Reusable)
                ChangeUserPasswordForm.tsx
                ErrorAlert.tsx(Reusable)
                ForgotUserIdForm.tsx
                ForgotUserPasswordForm.tsx
                LoginForm.tsx
                OtpForm.tsx
                OtpInput.tsx
                PasswordField.tsx
                UnblockUserForm.tsx
            schema/
                login.otpSchema.ts
                login.schema.ts
    routes/
        ProtectedRoute.tsx
        PublicRoute.tsx
    shared/
        components/
            InputField.tsx
            SessionManager.tsx
        hooks/
            useLoginFlow.ts
        types/
            userAuthType.ts
        utils/
            authQueue.ts
            parseApiError.ts
            requestHeader.ts
    store/
        useAuthStore.ts
```
