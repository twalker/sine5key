import { App } from "./app.js";

const go = new Go();
WebAssembly.instantiateStreaming(
  fetch("../../wasm/main.wasm"),
  go.importObject,
).then((result) => {
  console.log("go.run...");
  go.run(result.instance);
  greetGo("BrowserJS");
});

const app = new App();
app.init();
