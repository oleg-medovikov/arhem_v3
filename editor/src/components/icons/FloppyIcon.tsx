import { forwardRef, SVGAttributes } from 'react';

export const FloppyIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGElement>>(
  function FloppyIcon({ color = 'currentColor', ...iconProps }, iconRef) {
    return (
      <svg
        width="20"
        height="20"
        fill="none"
        {...iconProps}
        ref={iconRef}
        viewBox="-2 -2 28 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="1.75" stroke={color}>
          <path d="M22.5,22.5H1.5V1.5H18.68L22.5,5.32Z" />
          <path d="M7.23,1.5h9.55a0,0,0,0,1,0,0V6.27a1,1,0,0,1-1,1H8.18a1,1,0,0,1-1-1V1.5A0,0,0,0,1,7.23,1.5Z" />
          <rect x="6.27" y="14.86" width="11.45" height="7.64" />
          <line x1="9.14" y1="18.68" x2="14.86" y2="18.68" />
        </g>
      </svg>
    );
  }
);
