import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 2 9h10c0-4 2-6 2-9a7 7 0 0 0-7-7Z" />
      <path d="M12 12h.01" />
    </svg>
  );
}
