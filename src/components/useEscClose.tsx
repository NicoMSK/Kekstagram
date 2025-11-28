import { useEffect } from "react";

export function useEscClose(callback: () => void) {
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [callback]);
}
