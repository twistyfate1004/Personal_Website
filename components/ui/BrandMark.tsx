interface BrandMarkProps {
  className: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="48"
        cy="48"
        r="34"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M48 14V82"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M14 48H82"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M48 24L60 48L48 72L36 48L48 24Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle
        cx="48"
        cy="48"
        r="6"
        fill="currentColor"
      />
    </svg>
  );
}
