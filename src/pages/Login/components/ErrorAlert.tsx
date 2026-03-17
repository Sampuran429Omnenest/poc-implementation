import errorIcon from '../../../assets/errorIcon.svg';

export const ErrorAlert = ({ message }: { message: string }) => (
    <div 
        className="flex items-center gap-4 w-full px-4 py-3 rounded-[4px] bg-[#FAEBE9] border border-[#f5d0cc]"
        role="alert"
    >
        {/* Your downloaded SVG icon */}
        <img 
            src={errorIcon} 
            alt="Error" 
            className="w-5 h-5 shrink-0" 
        />
        
        <p className="text-[#2A2A2B] text-[13px] font-medium leading-tight">
            {message}
        </p>
    </div>
);