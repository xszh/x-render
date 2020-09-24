import EventEmitter from "../utils/event-emitter";
import { AnyClass } from "../utils/types";

export type Attributes = { [key: string]: string };
export type PropertyType = AnyClass;
export interface Property {
  type: PropertyType;
  default: any;
  required: boolean;
}
export type Properties = { [key: string]: Property | string };
export type Styles = { [key: string]: any } | string;
export type ClassType = { [key: string]: boolean };
export type Classes = Array<ClassType> | ClassType;
export type Callback = (...args: any[]) => any;
export type Listeners = { [key: string]: Callback };

export interface XNodeOptions {
  attrs: Attributes;
  style: Styles;
  class: Classes;
  on: Listeners;
  ref: string | Symbol;
}

export default class XNode extends EventEmitter {
  public attrs?: Attributes;
  public style?: Styles;
  public class?: Classes;
  public parent?: XNode;
  public children: Array<XNode | string> = [];

  setOptions(options: XNodeOptions) {
    if (options) {
      this.attrs = options.attrs;
      this.style = options.style;
      this.class = options.class;
      if (options.on) {
        for (const key in options.on) {
          const func = options.on[key];
          this.on(key, func);
        }
      }
    }
  }
  setChildren(children: (XNode | string)[] = undefined) {
    if (children && children.length) {
      children.forEach((child) => {
        this.children.push(child);
      });
    }
  }
  addChild(child: XNode | string) {
    if (child) {
      this.children.push(child);
    }
  }
  removeChild(child: XNode | string) {
    if (child) {
      const idx = this.children.indexOf(child);
      if (idx >= 0) {
        this.children.splice(idx, 1);
      }
    }
  }
}
