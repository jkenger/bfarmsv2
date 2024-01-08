import { useEffect } from "react";

export function useKeyDown(key: string, action: any) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
