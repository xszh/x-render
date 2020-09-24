import XComponent from "./x-component/x-component";
import { createElement } from "./x-node/create-element";
import IAdapter, { RenderNode } from "./x-adapter/x-adapter";
import SVGAdapter from "./x-adapter/svg-adapter";
import XNode from "./x-node/x-node";
import TextNode from "./x-node/text-node";

export const AdapterMapping = new Map<string, IAdapter>();
AdapterMapping.set("svg", new SVGAdapter());

export interface XRenderOptions {
  component: XComponent;
  renderer: IAdapter | string;
}

export default class XRender {
  root: XComponent;
  adapter: IAdapter;
  constructor(options: XRenderOptions) {
    this.root = options.component;
    if (options.renderer instanceof IAdapter) {
      this.adapter = options.renderer;
    } else if (typeof options.renderer === "string") {
      this.adapter = AdapterMapping.get(options.renderer);
      if (!this.adapter) {
        throw new Error(`Invalid renderer: ${options.renderer}`);
      }
    }
  }
  mount(el: RenderNode) {
    const rootNode = this.root.render(createElement.bind(this.root));
    const container = this.adapter.initContainer();
    this.adapter.render(rootNode, container, 0);
    el.appendChild(container);
  }
}

export { XComponent };
export { SVGAdapter };
export { XNode, TextNode };
