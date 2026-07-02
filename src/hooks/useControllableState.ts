"use client";

import { useCallback, useState } from "react";

interface ControllableStateOptions<TValue> {
  value?: TValue;
  defaultValue: TValue;
  onChange?: (value: TValue) => void;
}

export const useControllableState = <TValue>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<TValue>): [TValue, (nextValue: TValue) => void] => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue: TValue): void => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue];
};
