"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, className }: TabsProps) {
  const id = useId();
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id);
  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeTabId), [activeTabId, tabs]);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % tabs.length
            : (index - 1 + tabs.length) % tabs.length;

    setActiveTabId(tabs[nextIndex]?.id);
    requestAnimationFrame(() => {
      document.getElementById(`${id}-tab-${tabs[nextIndex]?.id}`)?.focus();
    });
  };

  return (
    <div className={className}>
      <div role="tablist" className="border-border bg-surface inline-flex rounded-lg border p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${id}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            aria-controls={`${id}-tabpanel-${tab.id}`}
            tabIndex={tab.id === activeTabId ? 0 : -1}
            className={cn(
              "text-text-secondary h-9 rounded-md px-4 text-sm transition",
              tab.id === activeTabId && "bg-card text-text-primary shadow-soft",
            )}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab && (
        <div
          id={`${id}-tabpanel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${activeTab.id}`}
          className="mt-6"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
