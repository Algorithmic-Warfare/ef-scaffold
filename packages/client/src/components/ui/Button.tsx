import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses: Record<string, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700",
  ghost: "bg-transparent text-gray-100 hover:bg-gray-800"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = "primary", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={clsx(
          "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-indigo-500/50 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
