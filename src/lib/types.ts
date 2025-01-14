import type { Retool } from "@tryretool/custom-component-support";

export interface IUser extends Retool.SerializableObject {
  name: string;
  area: string;
  profileUrl: string;
  positionName: string;
  id: string;
  parentId: string;
  size: null;
}

export type ControlMessage = {
  action: "fit" | "expandAll" | "collapseAll" | "export";
};

export type DollarProps<T extends object> = {
  [K in keyof T as `$${string & K}`]: string;
};

export type UseStateObjectParameter = Parameters<
  typeof Retool.useStateObject
>[0];

export type UseStateObjectInitialValue<T extends Retool.SerializableObject> =
  UseStateObjectParameter & {
    intialValue: T;
  };
