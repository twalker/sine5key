
const go = new Go();
WebAssembly.instantiateStreaming(
	fetch('../../wasm/main.wasm'),
	go.importObject,
).then(result => {
	console.log('go.run...');
	go.run(result.instance);
	greetGo('BrowserJS');
});

// Get the importObject from the go instance.
const {importObject} = go;

// Instantiate our wasm module
const wasmModule = await wasmBrowserInstantiate('./main.wasm', importObject);

// Allow the wasm_exec go instance, bootstrap and execute our wasm module
go.run(wasmModule.instance);

// Get our exports object, with all of our exported Wasm Properties
const {exports} = wasmModule.instance;

export default exports;
