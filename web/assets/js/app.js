import { getMidiDevices, getMidiMessage } from "./midi.js";

export class App {
  constructor() {
    this.elMidiSource = document.getElementById("midiSource");
    this.elWave = document.getElementById("wave");
    this.elKeys = document.getElementById("keys");
  }

  async init() {
    let midiDevices;
    try {
      midiDevices = await getMidiDevices();
    } catch (error) {
      console.error(error);
    }

    for (const [key, input] of midiDevices.inputs) {
      this.elMidiSource.add(new Option(input.name, key));
      console.log(
        `Input port [type:'${input.type}'] id:'${input.id}' name:'${input.name}'`,
      );
      input.addEventListener("midimessage", this.onMIDIMessage.bind(this));
    }

    const audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    this.audioCtx = audioCtx;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    this.elMidiSource.addEventListener(
      "change",
      function onMidiSourceChange(e) {
        console.log("TODO: change midi source");
      },
    );
    this.elKeys.addEventListener("click", this.onKeysClick.bind(this));
  }
  onKeysClick(e) {
    const elKey = e.target.closest(".key");
    if (!elKey) {
      return;
    }
    elKey.classList.toggle("on");
    const elKeys = Array.from(this.elKeys.querySelectorAll(".key"));
    const idx = elKeys.indexOf(elKey);
    console.log("clicked", idx, elKey);
  }

  onMIDIMessage(e) {
    const msg = getMidiMessage(e);
    if (msg) {
      console.log(msg);
    }
  }
}
