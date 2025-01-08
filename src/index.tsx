import React from "react";
import { Retool } from "@tryretool/custom-component-support";

import { OrgChartComponent } from "./OrgChart";
import ThemeContext from "./ThemeContext";

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

  const [layout] = Retool.useStateEnumeration({
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
    label: "Node Height",
    description: "Width of the rendered node",
    initialValue: 250
  });

  const [childrenMargin] = Retool.useStateNumber({
    name: "childrenMargin",
    label: "Children-Parent Gap",
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

  const [primaryColor] = Retool.useStateString({
    name: "primaryColor",
    label: "Primary Color",
    description: "Color for the accent"
  });

  const [linkColor] = Retool.useStateString({
    name: "linkColor",
    label: "Link Color",
    description: "Color for the links between nodes"
  });

  const [linkWidth] = Retool.useStateNumber({
    name: "linkWidth",
    label: "Link Width",
    description: "Stroke width of the links between nodes",
    initialValue: 2
  });

  const onNodeClick = Retool.useEventCallback({
    name: "onNodeClick"
  });

  const [_, setClickedNode] = Retool.useStateObject({
    name: "onNodeClick"
  });

  return (
    <ThemeContext.Provider
      value={{
        controls: {
          color: "white",
          bgColor: "blue",
          hoverBgColor: "#870BC8"
        }
      }}
    >
      <OrgChartComponent
        data={data}
        linkColor={linkColor}
        layout={layout as Layout}
        primaryColor={primaryColor}
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
    </ThemeContext.Provider>
  );
};
