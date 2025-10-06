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

function onStartClick(e) {
  console.log("Starting");
  const app = new App();
  app.init();
}

document.getElementById("start").addEventListener("click", onStartClick);
