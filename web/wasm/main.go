package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	js.Global().Set("greetGo", js.FuncOf(greet))
	select {} // Keep the program running
}

func greet(this js.Value, args []js.Value) interface{} {
	name := args[0].String()
	fmt.Printf("Hello, %s from Go!\n", name)
	return nil
}
