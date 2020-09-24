import "reflect-metadata";
import XNode from "../x-node/x-node";
import { Class } from "../utils/types";
import { CreateElement } from "../x-node/create-element";

export default abstract class XComponent {
  abstract render(h: CreateElement): XNode;
  protected getPropertyDefinition(propName: string): PropertyDefinition {
    const propsMap = Reflect.getMetadata(PropertyMapMetaKey, this);
    if (propsMap && propsMap.has(propName)) return propsMap.get(propName);
    throw new Error(`Property ${propName} not defined with decorator`);
  }
}

export const XComponents = new Map<string, Class<XComponent>>();

export interface PropertyDefinition {}

const PropertyMapMetaKey = Symbol("PropertyMapMetaKey");
export function Prop(propDef: PropertyDefinition = {}): PropertyDecorator {
  return function PropDecorator(target: Object, propertyKey: string | symbol) {
    let propsMap = Reflect.getMetadata(PropertyMapMetaKey, target);
    if (!propsMap) {
      propsMap = new Map<string, PropertyDefinition>();
      Reflect.defineMetadata(PropertyMapMetaKey, propsMap, target);
    }
    propsMap.set(propertyKey, propDef);
  };
}
