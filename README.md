src/
│   App.tsx
│   main.tsx
│   index.css
│
├── api/
│       axios.ts                          # Axios instance + base config
│       auth.api.ts                       # preAuthHandshake, login, validateOtp
│       interceptors.ts                   # Request/response interceptors
│
├── bootstrap/
│       services.ts                       # App-level service init
│
├── pages/
│   └── Login/
│       │   Login.tsx                     # Page orchestrator (step controller)
│       │
│       ├── components/
│       │       PasswordField.tsx         # Password input with show/hide
│       │       OtpInput.tsx              # OTP 6-digit input
│       │       LoginForm.tsx             # Username + password form
│       │       OtpForm.tsx               # OTP verification form
│       │
│       └── schema/
│               login.schema.ts           # Zod schema — username + password
│               login.otpSchema.ts        # Zod schema — otp number
│
├── shared/
│   ├── components/
│   │       InputField.tsx                # Generic controlled input
│   │       SessionManager.ts            # Session lifecycle (cookie-aware)
│   │
│   ├── hooks/
│   │       useLoginFlow.ts              # Step machine: handshake→login→otp
│   │
│   ├── types/
│   │       userAuthType.ts              # AuthUser, LoginPayload, OtpPayload etc
│   │
│   └── utils/
│           authQueue.ts                 # Queue requests during re-auth
│           requestHeader.ts             # Inject headers (x-request-id etc)
│
├── store/
│       useAuthStore.ts                  # Zustand: user, token, step, status
│
├── routes/
│       ProtectedRoute.tsx
│       PublicRoute.tsx
│
└── features/
    └── auth/                            # (reserved for future auth expansions)