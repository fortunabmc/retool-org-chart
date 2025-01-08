import type { CSSProperties } from "react";

export function withDefault(
  value: string | number | undefined,
  defaultValue: number
): number {
  const $value = Number(value);
  return $value <= 0 ? defaultValue : $value;
}

export function toCss(styles: CSSProperties): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      );
      return `${kebabKey}: ${value};`;
    })
    .join(" ");
}
