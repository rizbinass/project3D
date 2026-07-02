"use client";

import { Check } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { Popover } from "./Popover";
import { menuItemBase } from "./styles";

export interface DropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  onSelect: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: readonly DropdownItem[];
  align?: "start" | "end";
}

export function Dropdown({ trigger, items, align }: DropdownProps) {
  return (
    <Popover trigger={trigger} align={align}>
      <div role="menu" className="grid gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={item.onSelect}
            className={cn(menuItemBase, "flex items-center justify-between")}
          >
            {item.label}
            {item.selected && <Icon icon={Check} size="sm" tone="accent" />}
          </button>
        ))}
      </div>
    </Popover>
  );
}
