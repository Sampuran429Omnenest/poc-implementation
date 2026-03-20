import preferences_setup from '../../../../assets/Preferences_Setup.svg';
export const AdPanel=()=>{
    return(
          <div className="hidden lg:flex flex-col relative w-1/2 items-center justify-center p-6 xl:p-12 overflow-hidden bg-white">
                <div
                    className="relative flex flex-col items-center justify-center gap-8 text-center shadow-[0_20px_50px_rgba(15,98,254,0.2)]"
                    style={{
                        width: '90%',
                        maxWidth: '667px',
                        height: '85vh',
                        maxHeight: '890px',
                        borderRadius: 24,
                        backgroundColor: '#0F62FE',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                            `,
                            backgroundSize: '48px 48px',
                        }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-md px-8 w-full h-full">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-[clamp(24px,3vw,32px)] font-semibold leading-tight">
                                Take Charge of Your Investments with Us
                            </h2>
                            <p className="text-white/70 text-sm">
                                Secure, fast, and reliable access to your portfolio.
                            </p>
                        </div>
                        <img
                            src={preferences_setup}
                            alt="Trading Illustration"
                            className="h-[25%] min-h-[180px] object-contain"
                        />
                    </div>
                </div>
            </div>
    );
}