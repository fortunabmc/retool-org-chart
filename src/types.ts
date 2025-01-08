import type { Retool } from "@tryretool/custom-component-support";
import type { Layout } from "d3-org-chart";

export type OrgChartProps = {
  data: Retool.SerializableArray;
  onNodeClick: () => void;
  setClickedNode: (user: User) => void;
  layout?: Layout;
  primaryColor?: string;
  linkColor?: string;
  nodeWidth?: number;
  nodeHeight?: number;
  linkWidth?: number;
  childrenMargin?: number;
  siblingsMargin?: number;
  neighbourMargin?: number;
  compactMarginPair?: number;
  compactMarginBetween?: number;
};

export interface User extends Retool.SerializableObject {
  name: string;
  area: string;
  profileUrl: string;
  positionName: string;
  id: string;
  parentId: string;
  size: null;
}
