import Adapter from "./x-adapter";
import TextNode from "../x-node/text-node";
import XNode, { Styles, Classes } from "../x-node/x-node";

const $new = (tag: string): SVGElement => {
  const xmlns = "http://www.w3.org/2000/svg";
  return document.createElementNS(xmlns, tag);
};

const style2inline = (style: Styles) => {
  return "";
};

const class2inline = (classes: Classes) => {
  return "";
};

const $attrs = (el: SVGElement, node: XNode): SVGElement => {
  el.setAttribute("style", style2inline(node.style));
  el.setAttribute("class", class2inline(node.class));
  return el;
};

export default class SVGAdapter extends Adapter {
  initContainer() {
    return $new("svg");
  }
  setText(text: string, elem: SVGElement): void {
    elem.textContent = text;
  }
  renderText(textNode: TextNode, parent: SVGElement, ...args: any) {
    const textEl = $new("text");
    textEl.textContent = textNode.text;
    $attrs(textEl, textNode);
    parent.appendChild(textEl);
  }
}
