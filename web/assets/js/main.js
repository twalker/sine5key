const go = new Go();
WebAssembly.instantiateStreaming(
  fetch("../../wasm/main.wasm"),
  go.importObject,
).then((result) => {
  console.log("go.run...");
  go.run(result.instance);
});
