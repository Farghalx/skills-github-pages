import React from 'react';

const MagneticButton = ({ children, className, onClick, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden group transition-transform duration-300 hover:scale-103 ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-accent transform origin-left rtl:origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100 z-0"></span>
        </button>
    );
};

export default MagneticButton;
