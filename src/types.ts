import type { Retool } from "@tryretool/custom-component-support";

export type OrgChartProps = {
  data: Retool.SerializableArray;
  onNodeClick: () => void;
  setClickedNode: (id: string) => void;
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
