import XNode from "./x-node";

export default class TextNode extends XNode {
  public text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }
}
