import { getMidiDevices } from "./midi.js";

export class App {
  constructor() {
    this.elMidiSource = document.getElementById("midiSource");
    this.elWave = document.getElementById("wave");
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
    }

    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    // this.elMidiSource.addEventListener('change', function onMidiSourceChange(e) {

    // })
  }
}
