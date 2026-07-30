import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider({ delayDuration, delay, ...props }) {
  return <TooltipPrimitive.Provider delay={delay ?? delayDuration} {...props} />;
}

function Tooltip({ ...props }) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger({ asChild, children, ...props }) {
  if (asChild) {
    return <TooltipPrimitive.Trigger render={children} {...props} />;
  }

  return <TooltipPrimitive.Trigger {...props}>{children}</TooltipPrimitive.Trigger>;
}

function TooltipContent({
  align = "center",
  className,
  side = "top",
  sideOffset = 4,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          className={cn("z-50 text-xs shadow-md", className)}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
