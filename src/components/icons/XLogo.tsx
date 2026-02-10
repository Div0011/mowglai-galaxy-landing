import React from "react";

export interface XLogoProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const XLogo = ({ size = 24, className, ...props }: XLogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M18.244 2H21l-6.53 7.46L22 22h-6.838l-4.98-6.51L4.8 22H2l7.02-8.02L2 2h6.838l4.5 5.88L18.244 2zM16.8 20h1.53L7.32 4H5.69l11.11 16z" />
        </svg>
    );
};

export default XLogo;
