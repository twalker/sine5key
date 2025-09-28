package main

import (
	"flag"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"
)

func main() {
	port := flag.Int("port", 4000, "the port to listen on")
	flag.Parse()

	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("web"))
	//mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.FS(fileSystem))))
	//mux.Handle("/", http.StripPrefix("/web/", fs))
	mux.Handle("/", fs)

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", *port),
		Handler:      mux,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	slog.Info("Serving files", "Addr", server.Addr, "pid", os.Getpid())

	err := server.ListenAndServe()
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
