import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:active:scale-[0.97]",
  {
    variants: {
      variant: {
        // The single loud element: volt lime fill.
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.08)_inset] hover:brightness-105 hover:shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
        outline: "border border-border bg-card/60 text-foreground hover:border-foreground/40 hover:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4 pointer-coarse:h-11",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3 pointer-coarse:h-11",
        lg: "h-12 px-7 text-[0.95rem] has-[>svg]:px-6",
        icon: "size-10 pointer-coarse:size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
