"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils/cn";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
}

interface TriggerElementProps {
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "dialog";
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export function Popover({ trigger, children, align = "start" }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popoverId = useId();
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((current) => !current), []);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggle();
  };

  useEscapeKey(open, close);
  useOutsideClick(ref, open, close);

  const triggerAriaProps = {
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? popoverId : undefined,
  } satisfies Pick<TriggerElementProps, "aria-haspopup" | "aria-expanded" | "aria-controls">;

  const renderedTrigger = isValidElement<TriggerElementProps>(trigger) ? (
    cloneElement(trigger as ReactElement<TriggerElementProps>, {
      ...triggerAriaProps,
      onClick: (event) => {
        trigger.props.onClick?.(event);
        toggle();
      },
      onKeyDown: (event) => {
        trigger.props.onKeyDown?.(event);
        handleTriggerKeyDown(event);
      },
      className: cn("focus-visible:outline-none", trigger.props.className),
    })
  ) : (
    <button
      type="button"
      className="inline-flex cursor-pointer focus-visible:outline-none"
      onClick={toggle}
      onKeyDown={handleTriggerKeyDown}
      {...triggerAriaProps}
    >
      {trigger}
    </button>
  );

  return (
    <div ref={ref} className="relative inline-flex">
      {renderedTrigger}
      {open && (
        <div
          id={popoverId}
          role="dialog"
          className={cn(
            "z-popover border-border bg-card shadow-floating absolute top-full mt-2 min-w-64 rounded-lg border p-3",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
