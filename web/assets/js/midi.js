export async function getMidiDevices() {
  return navigator
    .requestMIDIAccess()
    .then((midiAccess) => {
      console.log("MIDI Access granted:", midiAccess);
      return midiAccess;
    })
    .catch((err) => {
      console.error("Midi access error", err);
      throw err;
    });
}
