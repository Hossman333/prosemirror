const { Schema, DOMParser, ProsemirrorNode } = require("prosemirror-model");
const { EditorView } = require("prosemirror-view");
const { EditorState } = require("prosemirror-state");
const { schema } = require("prosemirror-schema-basic");
const { addListNodes } = require("prosemirror-schema-list");
const { addTableNodes } = require("prosemirror-schema-table");
const { exampleSetup } = require("prosemirror-example-setup");

const demoSchema = new Schema({
  nodes: addListNodes(
    addTableNodes(schema.spec.nodes, "block+", "block"),
    "paragraph block*",
    "block"
  ),
  marks: schema.spec.marks
});

let nodeViews = {
  link: (node, view, getPos, decorations) => {
    const container = document.createElement("div");
    container.style.backgroundColor = "#ff0000";
    container.innerHTML = "testing";

    console.log(container);
    console.log(container.innerHTML);
    return { dom: container };
  },
  image: (node, view, getPos, decorations) => {
    const imgContainer = document.createElement("div");
    const imgDom = document.createElement("img");
    imgDom.style.border = "1px solid red";
    imgDom.src = node.attrs.src;
    imgContainer.appendChild(imgDom);
    return { dom: imgContainer };
  }
};

let state = EditorState.create({
  doc: DOMParser.fromSchema(demoSchema).parse(
    document.querySelector("#content")
  ),
  plugins: exampleSetup({ schema: demoSchema })
});

let view = (window.view = new EditorView(document.querySelector(".full"), {
  state,
  editable: () => false,
  nodeViews
}));
