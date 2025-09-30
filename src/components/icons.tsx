import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 21h10" />
    <path d="M12 21V7L5 4l7-3 7 3-7 3" />
    <path d="M5 4v7h14V4" />
    <path d="M5 11h14" />
  </svg>
);
