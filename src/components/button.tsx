import localFont from "next/font/local";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({ children, onClick = () => { }, disabled = false, className }: ButtonProps) {
    return (
        <button
            className={`${className} border-primary flex items-center justify-center gap-2 px-2 py-4 text-3xl bg-primary focus:outline-orange-400  font-semibold ${disabled ? ` text-gray-600 ` : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}