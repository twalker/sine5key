export async function getMidiDevices() {
  return navigator
    .requestMIDIAccess()
    .then((midiAccess) => {
      console.log("MIDI Access granted:", midiAccess);
      return midiAccess;
    })
    .catch((error) => {
      console.error("Midi access error", error);
      throw error;
    });
}
