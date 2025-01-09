import { Retool } from "@tryretool/custom-component-support";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/ErrorFallback";
import { OrgChartComponent } from "./components/OrgChart";
import ThemeContext from "./lib/ThemeContext";

import type { Layout } from "d3-org-chart";

export const OrgChart: React.FC = () => {
  Retool.useComponentSettings({
    defaultHeight: 60,
    defaultWidth: 10
  });

  const [data] = Retool.useStateArray({
    name: "data",
    label: "User List",
    description: "Array of users with `id` and `parentId`"
  });

  const [layout] = Retool.useStateEnumeration<Layout[]>({
    name: "layout",
    label: "Layout Style",
    description: "Direction of layout for the tree",
    enumDefinition: ["left", "top", "bottom", "right"],
    inspector: "segmented",
    initialValue: "left"
  });

  const [nodeHeight] = Retool.useStateNumber({
    name: "nodeHeight",
    label: "Node Height",
    description: "Height of the rendered node",
    initialValue: 200
  });

  const [nodeWidth] = Retool.useStateNumber({
    name: "nodeWidth",
    label: "Node Width",
    description: "Width of the rendered node",
    initialValue: 250
  });

  const [childrenMargin] = Retool.useStateNumber({
    name: "childrenMargin",
    label: "Parent / Child Gap",
    description: "Vertical spacing between parent and children",
    initialValue: 60
  });

  const [siblingsMargin] = Retool.useStateNumber({
    name: "siblingsMargin",
    label: "Siblings Gap",
    description: "Horizontal spacing between sibling nodes",
    initialValue: 60
  });

  const [neighbourMargin] = Retool.useStateNumber({
    name: "neighbourMargin",
    label: "Neighbor Spacing",
    description: "Horizontal spacing between groups of child nodes",
    initialValue: 80
  });

  const [compactMarginPair] = Retool.useStateNumber({
    name: "compactMarginPair",
    label: "Child X Gap",
    description: "Horizontal spacing between sibling child nodes",
    initialValue: 100
  });

  const [compactMarginBetween] = Retool.useStateNumber({
    name: "compactMarginBetween",
    label: "Child Y Gap",
    description: "Vertical spacing between sibling child nodes",
    initialValue: 50
  });

  const [linkColor] = Retool.useStateString({
    name: "linkColor",
    label: "Link Color",
    description: "Color for the links between nodes",
    initialValue: "#FFF"
  });

  const [linkWidth] = Retool.useStateNumber({
    name: "linkWidth",
    label: "Link Width",
    description: "Stroke width of the links between nodes",
    initialValue: 2
  });

  const [nodeTemplateStyle] = Retool.useStateString({
    name: "nodeTemplateStyle",
    label: "Node Template CSS",
    description:
      'CSS for rendering the nodes. Define classes and use them in node HTML. EX: <p class="styled">Hello <? user.name ?></p>'
  });

  const [nodeTemplate] = Retool.useStateString({
    name: "nodeTemplate",
    label: "Node Template HTML",
    description:
      "HTML template for rendering the nodes. User and Node props available as vars to templates. EX: <p>Hello <? user.name ?></p>"
  });

  const onNodeClick = Retool.useEventCallback({
    name: "onNodeClick"
  });

  const [_, setClickedNode] = Retool.useStateObject({
    name: "onNodeClick"
  });

  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.log(error, info.componentStack);
  };

  return (
    <ThemeContext.Provider
      value={{
        controls: {
          fontSize: "1em",
          color: "white",
          bgColor: "blue",
          hoverBgColor: "darkblue"
        }
      }}
    >
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleError}
      >
        <OrgChartComponent
          data={data}
          linkColor={linkColor}
          templateDelimeters={["<?", "?>"]}
          nodeTemplate={nodeTemplate}
          nodeTemplateStyle={nodeTemplateStyle}
          layout={layout}
          nodeWidth={nodeWidth}
          nodeHeight={nodeHeight}
          linkWidth={linkWidth}
          childrenMargin={childrenMargin}
          siblingsMargin={siblingsMargin}
          neighbourMargin={neighbourMargin}
          compactMarginPair={compactMarginPair}
          compactMarginBetween={compactMarginBetween}
          onNodeClick={onNodeClick}
          setClickedNode={setClickedNode}
        />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};
