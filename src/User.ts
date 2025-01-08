import type { Retool } from "@tryretool/custom-component-support";

export interface User extends Retool.SerializableObject {
  name: string;
  area: string;
  profileUrl: string;
  positionName: string;
  id: string;
  parentId: string;
  size: null;
}
