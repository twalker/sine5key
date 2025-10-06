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

export function getMidiMessage(midiMessage) {
  const command = midiMessage.data[0];
  const noteNumber = midiMessage.data[1];
  const velocity = midiMessage.data[2];

  // Check if it's a Note On or Note Off message
  if (command >= 0x90 && command <= 0x9f) {
    // Note On (0x90-0x9F for channels 0-15)
    if (velocity > 0) {
      return {
        noteNumber,
        velocity,
        command: "on",
      };
    } else {
      // Velocity 0 indicates Note Off
      return {
        noteNumber,
        velocity,
        command: "off",
      };
    }
  } else if (command >= 0x80 && command <= 0x8f) {
    // Note Off (0x80-0x8F for channels 0-15)
    return {
      noteNumber,
      velocity,
      command: "off",
    };
  }
  // You can add more conditions to handle other MIDI message types like Control Change, Pitch Bend, etc.
  // https://www.google.com/search?client=firefox-b-1-d&q=how+to+get+note+data+from+MIDIMessageEvent&udm=50&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZud1z6kQpMfoEdCJxnpm_3YlUqOpj4OTU_HmqxOd8LCYAmZcz3xp4-s3ijYzIP40LlddfBAhJDuHsBzPcairVH6jEyLRYOBQgKx39vFebUA6gMRyOjUtKr2tAgLt8-riYCxo7cqYvgVIxY_03doEIFjWWiF6brNIzAObqF7XNPBoa6nWqDYwiLKQb2ooNcABsdF3WMg&ved=2ahUKEwjpkb-Uu46QAxVmGTQIHY1oAGIQ0NsOegQIJRAA&aep=10&ntc=1&mtid=ZiTjaISTGMz20PEPkKzYoQE&mstk=AUtExfA6jRvf7iLxQIkJf4Dt8v8vSeThbSH-Z0lir6Rny66Vgh-dw-D3k0735EBcmjSsoSPIyZcoJpwhJ0pDVwLRO79orNVtoBVxaT7fqiMFqhC7vsCUZjEIdXq4BzSax15vsiHGkeP_TZ00x2JfRPFOjp860rTRy3wMGZ_5FnJXrzfmx9x8aemrYCwd7gNkC2jF-pQ7zz8pZD5DcJKBXBryDilSluwmNg2X1_xngSkG8NQJYMI-COg_Y4uM-8frvUUpZv2nwHwFBy9lJg&csuir=1
  return null;
}
