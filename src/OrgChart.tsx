import React from "react";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";

import type { OrgChartProps, User } from "./types";

/**
 * D3 Based OrgChart
 *
 * @see https://github.com/bumbeishvili/org-chart
 */
export const OrgChartComponent: React.FC<OrgChartProps> = ({
  data,
  primaryColor,
  nodeWidth,
  nodeHeight,
  linkWidth,
  linkColor,
  siblingsMargin,
  childrenMargin,
  neighbourMargin,
  compactMarginPair,
  compactMarginBetween,
  ...chartProps
}) => {
  const d3Container = React.useRef(null);
  const chartRef = React.useRef(new OrgChart<User>());
  const styles = {
    container: {
      paddingTop: "30px",
      backgroundColor: "none",
      marginLeft: "1px",
      borderRadius: "6px",
      overflow: "visible"
    } as React.CSSProperties,
    content: {
      paddingTop: "0px",
      backgroundColor: "white",
      border: "1px solid lightgray",
      borderRadius: "5px"
    } as React.CSSProperties,
    profileImg: {
      width: "60px",
      height: "60px",
      borderRadius: "100px"
    } as React.CSSProperties,
    hr: {
      marginTop: "-38px",
      height: "10px",
      borderRadius: "1px",
      backgroundColor: primaryColor
    } as React.CSSProperties,
    footer: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: "15px",
      paddingRight: "15px"
    } as React.CSSProperties
  };

  React.useLayoutEffect(() => {
    if (data && d3Container.current) {
      const chart = chartRef.current;

      chart.childrenMargin(() => withDefault(childrenMargin, 60));
      chart.siblingsMargin(() => withDefault(siblingsMargin, 20));
      chart.neighbourMargin(() => withDefault(neighbourMargin, 80));
      chart.compactMarginPair(() => withDefault(compactMarginPair, 100));
      chart.compactMarginBetween(() => withDefault(compactMarginBetween, 50));

      chart.onNodeClick((d) => {
        chartProps.setClickedNode(d.data.id);
        chartProps.onNodeClick();
      });

      // Define custom link style
      chart.linkUpdate(function (_d) {
        // @ts-expect-error not sure how else to do `this`...
        d3.select(this) //
          .attr("stroke", linkColor ?? primaryColor ?? "white")
          .attr("stroke-width", linkWidth ?? 1);
      });

      // Define node dimensions
      chart
        .nodeHeight(() => nodeHeight ?? 150)
        .nodeWidth(() => nodeWidth ?? 250);

      // Define custom node content
      chart.nodeContent((d) => {
        const containerStyle = {
          ...styles.container,
          height: `${d.height}px`
        };
        const contentStyle = {
          ...styles.content,
          height: `${d.height - 32}px`
        };
        const hrStyle = {
          ...styles.hr,
          width: `${d.width - 2}px`
        };

        return `
            <div style="${toCss(containerStyle)}">
                <div style="${toCss(contentStyle)}">
                    <img src="${d.data.imageUrl}" style="${toCss(styles.profileImg)}"} />
                    <div style="${toCss(hrStyle)}"></div>
                    <div style="padding:20px; padding-top:35px;text-align:center">
                        <div style="color:#111672;font-size:16px;font-weight:bold">
                            ${d.data.name}
                        </div>
                        <div style="color:#404040;font-size:16px;margin-top:4px">
                            ${d.data.positionName}
                        </div>
                    </div>
                    <div style="${toCss(styles.footer)}">
                        <div>Manages:  ${d.data._directSubordinates} 👤</div>
                        <div>Oversees: ${d.data._totalSubordinates} 👤</div>
                    </div>
                </div>
            </div>`;
      });

      chart
        .container(d3Container.current)
        .data(Array.from(data) as unknown as User[])
        .render();
    }
  }, [data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container}></div>
    </div>
  );
};

function withDefault(
  value: string | number | undefined,
  defaultValue: number
): number {
  const $value = Number(value);
  return $value <= 0 ? defaultValue : $value;
}

function toCss(styles: React.CSSProperties): string {
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
