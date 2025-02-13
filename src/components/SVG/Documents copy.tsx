import React from 'react';
import { SVGComponentProps } from './props';

export default function BackArrowSVG({ className, fill, onClick }: SVGComponentProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            stroke={fill}
            fill="none" 
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            onClick={onClick}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />

    </svg>
    );
}

