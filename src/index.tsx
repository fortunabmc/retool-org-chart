import React from "react";
import { Retool } from "@tryretool/custom-component-support";

import { OrgChartComponent } from "./OrgChart";

export const OrgChart: React.FC = () => {
  Retool.useComponentSettings({
    defaultHeight: 60,
    defaultWidth: 10
  });

  const [data, setData] = Retool.useStateArray({
    name: "data",
    label: "User List",
    description: "Array of users with `id` and `parentId`"
  });

  const [nodeHeight] = Retool.useStateNumber({
    name: "nodeHeight",
    label: "Node Height",
    initialValue: 200,
    description: "Height of the rendered node"
  });

  const [nodeWidth] = Retool.useStateNumber({
    name: "nodeWidth",
    label: "Node Height",
    initialValue: 250,
    description: "Width of the rendered node"
  });

  const [childrenMargin] = Retool.useStateNumber({
    name: "childrenMargin",
    label: "Children-Parent Gap",
    initialValue: 60,
    description: "Vertical spacing between parent and children"
  });

  const [siblingsMargin] = Retool.useStateNumber({
    name: "siblingsMargin",
    label: "Siblings Gap",
    initialValue: 60,
    description: "Horizontal spacing between sibling nodes"
  });

  const [neighbourMargin] = Retool.useStateNumber({
    name: "neighbourMargin",
    label: "Neighbor Spacing",
    initialValue: 80,
    description: "Horizontal spacing between groups of child nodes"
  });

  const [compactMarginPair] = Retool.useStateNumber({
    name: "compactMarginPair",
    label: "Child X Gap",
    initialValue: 100,
    description: "Horizontal spacing between sibling child nodes"
  });

  const [compactMarginBetween] = Retool.useStateNumber({
    name: "compactMarginBetween",
    label: "Child Y Gap",
    initialValue: 50,
    description: "Vertical spacing between sibling child nodes"
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
    initialValue: 2,
    description: "Stroke width of the links between nodes"
  });

  const onNodeClick = Retool.useEventCallback({
    name: "onNodeClick"
  });

  const [_, setClickedNode] = Retool.useStateString({
    name: "clickedNode",
    inspector: "hidden"
  });

  return (
    <OrgChartComponent
      data={data}
      linkColor={linkColor}
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
  );
};
