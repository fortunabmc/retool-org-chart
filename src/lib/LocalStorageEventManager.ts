import { useEffect } from "react";

import type { Retool } from "@tryretool/custom-component-support";

export function LocalStorageEventManager<
  T extends Record<string, Retool.SerializableType>
>(config?: { namespace: string }) {
  const namespace = config?.namespace ?? `LSEM_${new Date().getTime()}`;
  const context = {
    loaded: localStorage.getItem(namespace),
    parsed: {}
  };

  if (!context.loaded) {
    localStorage.setItem(namespace, "{}");
    context.parsed = {};
  } else {
    context.parsed = JSON.parse(context.loaded);
  }

  const getEmitter = (emitter: keyof T) => {
    const emit = (data: T[keyof T]): void => {
      try {
        const context = {
          loaded: localStorage.getItem(namespace),
          parsed: {}
        };

        if (!context.loaded) {
          localStorage.setItem(namespace, "{}");
          context.parsed = {};
        } else {
          context.parsed = JSON.parse(context.loaded);
        }

        localStorage.setItem(
          namespace,
          JSON.stringify({
            ...context.parsed,
            [emitter]: data
          })
        );
      } catch (error) {
        console.error("Failed to emit localStorage event:", error);
      }
    };

    return emit;
  };

  const getListenerHook = (eventName: keyof T) => {
    const listen = (onMessage: (data: T[keyof T]) => void) => {
      useEffect(() => {
        const handleStorageEvent = (event: StorageEvent) => {
          if (event.key === namespace && event.newValue) {
            try {
              const parsedData = JSON.parse(event.newValue) as Record<
                keyof T,
                T[keyof T]
              >;
              const eventData = parsedData[eventName];

              if (eventData !== undefined) {
                onMessage(eventData);

                // Use object destructuring to exclude eventName
                const { [eventName]: _, ...updatedData } = parsedData;
                localStorage.setItem(namespace, JSON.stringify(updatedData));
              }
            } catch (error) {
              console.error("Failed to parse localStorage message:", error);
            }
          }
        };

        window.addEventListener("storage", handleStorageEvent);

        return () => {
          window.removeEventListener("storage", handleStorageEvent);
        };
      }, [namespace, eventName, onMessage]);
    };

    return listen;
  };

  return { getEmitter, getListenerHook };
}
