const go = new Go();
WebAssembly.instantiateStreaming(
  fetch("../../wasm/main.wasm"),
  go.importObject,
).then((result) => {
  console.log("go.run...");
  go.run(result.instance);
  greetGo("BrowserJS");
});

import { getMidiDevices } from "./midi.js";

let midiDevices;
try {
  midiDevices = await getMidiDevices();
} catch (err) {
  console.error(err);
}

const elDevices = document.getElementById("inputDevices");
for (const [key, input] of midiDevices.inputs) {
  //const input = entry[1];
  console.log("key", key);
  console.dir(input);
  elDevices.add(new Option(input.name, key));
  console.log(
    `Input port [type:'${input.type}'] id:'${input.id}' name:'${input.name}'`,
  );
  // Attach event listener to receive MIDI messages
  //input.onmidimessage = onMIDIMessage;
}
