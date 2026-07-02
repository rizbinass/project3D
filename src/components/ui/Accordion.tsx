"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { focusRing } from "./styles";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div
      className={cn("divide-border border-border bg-card divide-y rounded-lg border", className)}
    >
      {items.map((item) => {
        const open = item.id === openId;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id}>
            <button
              id={triggerId}
              type="button"
              className={cn(
                "text-text-primary flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium",
                focusRing,
              )}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.title}
              <Icon icon={ChevronDown} size="sm" className={cn(open && "rotate-180")} />
            </button>
            {open && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="text-text-secondary px-5 pb-5 text-sm leading-6"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
