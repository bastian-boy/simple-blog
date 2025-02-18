import { createElement } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className = "" }: HeadingProps) {
  const baseStyles =
    level === 1
      ? "text-4xl font-bold mb-8"
      : level === 2
      ? "text-3xl font-semibold mb-6"
      : "text-2xl font-semibold mb-4";

  return createElement(
    `h${level}`,
    { className: `${baseStyles} ${className}`.trim() },
    children
  );
}
