import { useContext } from "react";
import ThemeContext, { type OrgChartThemeContext } from "./ThemeContext";

export function useTheme(): OrgChartThemeContext {
  return useContext(ThemeContext);
}
