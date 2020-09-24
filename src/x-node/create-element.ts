import { Class } from "../utils/types";
import XComponent, { XComponents } from "../x-component/x-component";
import XNode, { XNodeOptions } from "./x-node";

export type CreateElement = (
  comp: Class<XComponent> | string,
  options: XNodeOptions,
  children: (XNode | string)[]
) => XNode;

export function createElement(
  comp: Class<XComponent> | string,
  options: XNodeOptions,
  children: (XNode | string)[]
): XNode {
  if (!(this instanceof XComponent)) {
    throw new Error("Create Element must be bound to XComponent instance");
  }
  let Ctor: Class<XComponent>;
  if (typeof comp === "string") {
    Ctor = XComponents.get(comp);
  } else {
    Ctor = comp;
  }
  let component: XComponent = new Ctor(options);
  let xnode: XNode = component.render(createElement.bind(component));
  xnode.setOptions(options);
  if (children && children.length) {
    children.forEach((child) => {
      if (child instanceof XNode) {
        child.parent = xnode;
      }
    });
  }
  xnode.setChildren(children);
  return xnode;
}
