"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { menuItemBase } from "./styles";

export interface ContextMenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  onSelect: () => void;
}

export interface ContextMenuProps {
  children: ReactNode;
  items: readonly ContextMenuItem[];
}

export function ContextMenu({ children, items }: ContextMenuProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setPosition(null), []);

  useEscapeKey(Boolean(position), close);
  useOutsideClick(ref, Boolean(position), close);

  return (
    <div
      onContextMenu={(event) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
      }}
    >
      {children}
      {position && (
        <div
          ref={ref}
          role="menu"
          className="z-popover border-border bg-card shadow-floating fixed max-w-[calc(100vw-1rem)] min-w-48 rounded-lg border p-1"
          style={{
            left: `min(${position.x}px, calc(100vw - 13rem))`,
            top: `min(${position.y}px, calc(100vh - 14rem))`,
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect();
                close();
              }}
              className={menuItemBase}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
