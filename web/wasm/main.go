package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	js.Global().Set("greetGo", js.FuncOf(greet))
	js.Global().Set("playAudio", js.FuncOf(playAudio))
	select {} // Keep the program running
}

func greet(this js.Value, args []js.Value) interface{} {
	name := args[0].String()
	fmt.Printf("Hello, %s from Go!\n", name)
	return nil
}
func playAudio(this js.Value, args []js.Value) interface{} {
	// Create an AudioContext
	audioContext := js.Global().Get("AudioContext").New()

	// Create an OscillatorNode
	oscillator := audioContext.Call("createOscillator")
	oscillator.Set("type", "sine")                // Set oscillator type (e.g., sine, square, sawtooth, triangle)
	oscillator.Get("frequency").Set("value", 440) // Set frequency to 440 Hz (A4)

	// Connect the oscillator to the AudioContext destination
	oscillator.Call("connect", audioContext.Get("destination"))

	// Start and stop the oscillator
	oscillator.Call("start")
	js.Global().Get("setTimeout").Invoke(js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		oscillator.Call("stop")
		return nil
	}), 1000) // Stop after 1 second

	return nil
}
