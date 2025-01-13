import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
import React, { useCallback, useLayoutEffect, useRef } from "react";

import { useMustache } from "../hooks/useMustache";
import { withDefault } from "../lib/utils";
import styles from "./OrgChart.module.css";

import type { ControlMessage, IUser } from "../lib/types";
import type { Retool } from "@tryretool/custom-component-support";
import type { Layout } from "d3-org-chart";
import type { OpeningAndClosingTags } from "mustache";

type OrgChartProps = {
  data: Retool.SerializableArray;
  layout: Layout;
  nodeTemplate: string;
  nodeTemplateStyle: string;
  linkColor: string;
  nodeWidth: number;
  nodeHeight: number;
  linkWidth: number;
  childrenMargin: number;
  siblingsMargin: number;
  neighbourMargin: number;
  compactMarginPair: number;
  compactMarginBetween: number;
  templateDelimeters: OpeningAndClosingTags;
  onNodeClick(): void;
  setClickedNode(user: IUser): void;
  onControlClicked(onMessage: (data: ControlMessage) => void): void;
};

type EventHandlers = Record<ControlMessage["action"], () => void>;

/**
 * @see https://github.com/bumbeishvili/org-chart
 */
export const OrgChartComponent: React.FC<OrgChartProps> = ({
  data,
  layout,
  nodeWidth,
  nodeHeight,
  nodeTemplate,
  nodeTemplateStyle,
  templateDelimeters,
  linkWidth,
  linkColor,
  siblingsMargin,
  childrenMargin,
  neighbourMargin,
  compactMarginPair,
  compactMarginBetween,
  onControlClicked,
  ...chartProps
}) => {
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart<IUser>());
  const renderTemplate = useMustache(templateDelimeters);

  const eventHandlers: EventHandlers = {
    fit: () => chartRef.current.fit(),
    expandAll: () => chartRef.current.expandAll(),
    collapseAll: () => chartRef.current.collapseAll()
  };

  const nodeInfo = {
    linkColor,
    width: nodeWidth,
    height: nodeHeight
  };

  const resizeSvgContainer = () => {
    d3.select(d3Container.current)
      .selectChild(".svg-chart-container")
      .attr("height", "1400px");
  };

  const styleNodes = useCallback(() => {
    const d3Ctx = d3.select(d3Container.current);
    const interpolatedCSS = renderTemplate(nodeTemplateStyle, {
      node: nodeInfo
    });
    //console.log(interpolatedCSS);
    d3Ctx.selectChild(`#nodeStyles`).remove();
    d3Ctx.append("style").attr("id", "nodeStyles").text(interpolatedCSS);
  }, [nodeTemplateStyle]);

  onControlClicked((data) => {
    console.log("STORAGE EVENT!", data);
    return eventHandlers[data.action]();
  });

  useLayoutEffect(() => {
    if (d3Container.current) {
      resizeSvgContainer();
    }
  }, [d3Container.current]);

  useLayoutEffect(() => {
    if (d3Container.current) {
      // Node Template Styles
      styleNodes();

      if (data) {
        const chart = chartRef.current;

        // Node Template HTML
        chart.nodeContent((d) =>
          renderTemplate(nodeTemplate, {
            user: d.data,
            node: nodeInfo
          })
        );

        // Define custom link style
        chart.linkUpdate(function (_d) {
          // @ts-expect-error not sure how else to do `this`...
          d3.select(this) //
            .attr("stroke", linkColor ?? "white")
            .attr("stroke-width", linkWidth ?? 1);
        });

        // Setup dimensions and layout
        chart
          .layout(layout ?? "top")
          .nodeWidth(() => nodeWidth ?? 250)
          .nodeHeight(() => nodeHeight ?? 150)
          .childrenMargin(() => withDefault(childrenMargin, 60))
          .siblingsMargin(() => withDefault(siblingsMargin, 20))
          .neighbourMargin(() => withDefault(neighbourMargin, 80))
          .compactMarginPair(() => withDefault(compactMarginPair, 100))
          .compactMarginBetween(() => withDefault(compactMarginBetween, 50));

        chart.onNodeClick(function (d) {
          chartProps.setClickedNode(d.data);
          chartProps.onNodeClick();
        });

        chart
          .container(d3Container.current)
          .data(Array.from(data) as unknown as IUser[])
          .setActiveNodeCentered(true)
          .render();
      }

      resizeSvgContainer();
    }
  }, [data, d3Container.current, nodeTemplateStyle]);

  return (
    <div className={styles.ReactOrgChartWrapper}>
      <div
        id="ReactOrgChart"
        ref={d3Container}
        className={styles.ReactOrgChart}
      ></div>
    </div>
  );
};
