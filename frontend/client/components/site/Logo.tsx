// No React import needed for this component

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" stroke="url(#grad)" strokeWidth="4" />
      <path
        d="M44 36a12 12 0 1 1-24 0 12 12 0 0 1 24 0Z"
        stroke="url(#grad)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M40 20c0 6-4 8-8 12s-8 6-8 12"
        stroke="url(#grad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default Logo;
