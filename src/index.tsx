import "./index.module.css";

import { Retool } from "@tryretool/custom-component-support";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import CssButton, { type ButtonProps } from "./components/CssButton";
import ErrorFallback from "./components/ErrorFallback";
import { OrgChartComponent } from "./components/OrgChart";
import { useForceUpdate } from "./hooks/useForceUpdate";
import { LocalStorageEventManager } from "./lib/LocalStorageEventManager";
import ThemeContext from "./lib/ThemeContext";

import type { ControlMessage } from "./lib/types";
import type { Layout } from "d3-org-chart";

type Events = {
  CONTROL_CLICKED: ControlMessage;
};

const LSEM = LocalStorageEventManager<Events>({ namespace: "orgChartControl" });

/**
 * Org Chart Component
 */
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
    name: "onNodeClick",
    inspector: "hidden",
    initialValue: {}
  });

  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.log(error, info.componentStack);
  };

  const useControlClickedEffect = LSEM.getListenerHook("CONTROL_CLICKED");

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
          layout={layout}
          linkColor={linkColor}
          linkWidth={linkWidth}
          nodeWidth={nodeWidth}
          nodeHeight={nodeHeight}
          childrenMargin={childrenMargin}
          siblingsMargin={siblingsMargin}
          neighbourMargin={neighbourMargin}
          compactMarginPair={compactMarginPair}
          compactMarginBetween={compactMarginBetween}
          nodeTemplate={nodeTemplate}
          nodeTemplateStyle={nodeTemplateStyle}
          templateDelimeters={["<?", "?>"]}
          onNodeClick={onNodeClick}
          setClickedNode={setClickedNode}
          onControlClicked={useControlClickedEffect}
        />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

/**
 * Org Chart Controls Component
 */
export const OrgChartControls: React.FC = () => {
  const repaint = useForceUpdate();

  const [containerStyle] = Retool.useStateObject({
    name: "containerStyle",
    label: "Container CSS",
    description: "Object that satisfies React.CSSProperties for the container.",
    initialValue: {}
  });

  const [buttonStyle] = Retool.useStateObject({
    name: "buttonStyle",
    label: "Button CSS",
    description: "Object that satisfies React.CSSProperties for the buttons.",
    initialValue: {}
  });

  useEffect(repaint, [containerStyle, buttonStyle]);

  const controlClicked = Retool.useEventCallback({ name: "controlClicked" });

  const emit = LSEM.getEmitter("CONTROL_CLICKED");

  const act = (action: ControlMessage["action"]) => {
    emit({ action });
    controlClicked();
  };

  const StyledButton = ({ children, ...props }: Omit<ButtonProps, "style">) => (
    <div
      style={buttonStyle}
      {...props}
    >
      <div style={{ marginTop: "auto", marginBottom: "auto" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ height: "100vh" }}>
      <div style={containerStyle}>
        <StyledButton onClick={() => act("fit")}>Fit To Screen</StyledButton>
        <StyledButton onClick={() => act("expandAll")}>Expand All</StyledButton>
        <StyledButton onClick={() => act("collapseAll")}>
          Collapse All
        </StyledButton>
        <StyledButton onClick={() => act("export")}>Export</StyledButton>
      </div>
    </div>
  );
};
