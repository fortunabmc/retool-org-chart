export const MESSAGE_NS = "ReactOrgChartControls";

export function withDefault(
  value: string | number | undefined,
  defaultValue: number
): number {
  const $value = Number(value);
  return $value <= 0 ? defaultValue : $value;
}
