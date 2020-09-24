import XNode from "../x-node/x-node";
import TextNode from "../x-node/text-node";

export type RenderNode = Element | any;

export default abstract class Adapter {
  render(
    xnode: XNode,
    parent: RenderNode,
    index: number,
    ...args: any
  ): RenderNode {
    let elem: RenderNode;
    if (xnode instanceof TextNode) {
      elem = this.renderText(xnode, parent, index);
    }
    if (elem) {
      xnode.children.forEach((child, index) => {
        if (child instanceof XNode) {
          this.render(child, elem, index);
        } else {
          this.setText(child, elem, index);
        }
      });
    }
    return elem;
  }
  abstract renderText(
    textNode: TextNode,
    parent: RenderNode,
    index: number
  ): RenderNode;
  abstract setText(text: string, parent: RenderNode, index: number): void;
  abstract initContainer(): RenderNode;
}
