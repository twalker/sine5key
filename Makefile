
all: build test

build:
	@echo "Building..."
	$go build -o ./bin/sine5key cmd/sine5key/main.go

# Run the application
run:
	@go run cmd/sine5key/main.go

# Test the application
test:
	@echo "Testing..."
	@go test ./... -v


# Tidy module dependencies and format all .go files
tidy:
	@echo 'Tidying module dependencies...'
	go mod tidy
	@echo 'Verifying and vendoring module dependencies...'
	go mod verify
	@echo 'Formatting .go files...'
	go fmt ./...


# Clean the binary
clean:
	@echo "Cleaning..."
	@rm -rf bin

# Live Reload
dev:
	@if command -v air > /dev/null; then \
            air; \
            echo "Watching...";\
        else \
            read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
            if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
                go install github.com/air-verse/air@latest; \
                air; \
                echo "Watching...";\
            else \
                echo "You chose not to install air. Exiting..."; \
                exit 1; \
            fi; \
        fi

.PHONY: all build run test tidy clean dev
