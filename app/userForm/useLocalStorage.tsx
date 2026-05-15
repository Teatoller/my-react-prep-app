import { useEffect, useState } from "react";

const isBrowser = globalThis.window !== undefined;

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const storedValue = globalThis.window.localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    try {
      globalThis.window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  return [value, setValue] as const;
}
