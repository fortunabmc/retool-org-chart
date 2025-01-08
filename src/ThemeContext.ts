import { createContext } from "react";

type OrgChartThemeContext = {
  controls: {
    color: string;
    bgColor: string;
    hoverBgColor: string;
  };
};

const ThemeContext = createContext<OrgChartThemeContext>({
  controls: {
    color: "white",
    bgColor: "blue",
    hoverBgColor: "darkblue"
  }
});

export default ThemeContext;
