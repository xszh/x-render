import XRender, { XComponent, TextNode } from "../../dist/x-render.js";

class Root extends XComponent {
  render(h) {
    return new TextNode("abc");
  }
}

const xrender = new XRender({
  component: new Root(),
  renderer: "svg",
});

const contaier = document.createElement("div");
contaier.style.width = '400px';
contaier.style.height = '300px';
document.body.appendChild(contaier);

xrender.mount(contaier);
