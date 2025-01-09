import { useContext } from "react";

import ThemeContext, { type OrgChartThemeContext } from "../lib/ThemeContext";

export function useTheme(): OrgChartThemeContext {
  return useContext(ThemeContext);
}
