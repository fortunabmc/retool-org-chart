import * as d3 from "d3";
import { type Layout, OrgChart } from "d3-org-chart";
import { type OpeningAndClosingTags } from "mustache";
import React, { useCallback, useLayoutEffect, useRef } from "react";

import { useMustache } from "../hooks/useMustache";
import { withDefault } from "../lib/utils";
import Button from "./Button";

import type { IUser } from "../lib/IUser";
import type { Retool } from "@tryretool/custom-component-support";

type OrgChartProps = {
  data: Retool.SerializableArray;
  nodeTemplate: string;
  nodeTemplateStyle: string;
  templateDelimeters: OpeningAndClosingTags;
  onNodeClick: () => void;
  setClickedNode: (user: IUser) => void;
  layout: Layout;
  linkColor: string;
  nodeWidth: number;
  nodeHeight: number;
  linkWidth: number;
  childrenMargin: number;
  siblingsMargin: number;
  neighbourMargin: number;
  compactMarginPair: number;
  compactMarginBetween: number;
};

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
  ...chartProps
}) => {
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart<IUser>());
  const renderTemplate = useMustache(templateDelimeters);

  const nodeInfo = {
    linkColor,
    width: nodeWidth,
    height: nodeHeight
  };

  const reloadNodeStyles = useCallback(() => {
    const d3Ctx = d3.select(d3Container.current);
    const interpolatedCSS = renderTemplate(nodeTemplateStyle, {
      node: nodeInfo
    });
    //console.log(interpolatedCSS);
    d3Ctx.selectChild(`#nodeStyles`).remove();
    d3Ctx.append("style").attr("id", "nodeStyles").text(interpolatedCSS);
  }, [nodeTemplateStyle]);

  useLayoutEffect(() => {
    if (d3Container.current) {
      // Node Template Styles
      reloadNodeStyles();

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

        chart.onNodeClick((d) => {
          chartProps.setClickedNode(d.data);
          chartProps.onNodeClick();
        });

        chart
          .container(d3Container.current)
          .data(Array.from(data) as unknown as IUser[])
          .setActiveNodeCentered(true)
          .render();
      }
    }
  }, [data, d3Container.current, nodeTemplateStyle]);

  return (
    <div>
      <Button onClick={() => chartRef.current.fit()}>Fit To Screen</Button>
      <Button onClick={() => chartRef.current.expandAll()}>Expand All</Button>
      <Button onClick={() => chartRef.current.collapseAll()}>
        Collapse All
      </Button>
      <Button
        onClick={() => {
          reloadNodeStyles();
          chartRef.current.restyleForeignObjectElements();
        }}
      >
        Repaint Nodes
      </Button>
      <div ref={d3Container}></div>
    </div>
  );
};
