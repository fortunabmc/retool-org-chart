import { createContext } from "react";

const DEFAULT_THEME = {
  controls: {
    fontSize: "1.2em",
    color: "white",
    bgColor: "blue",
    hoverBgColor: "darkblue"
  }
};

type OrgChartThemeContext = typeof DEFAULT_THEME;

const ThemeContext = createContext<OrgChartThemeContext>(DEFAULT_THEME);

export default ThemeContext;

export type { OrgChartThemeContext };
