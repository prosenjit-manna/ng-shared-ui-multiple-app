#!/bin/bash
set -e

# Restore dependencies if needed
if [ ! -d "bin" ]; then
    echo "Restoring dependencies..."
    dotnet restore
fi

# Run with watch
echo "Starting dotnet watch..."
exec dotnet watch run --non-interactive --urls http://0.0.0.0:8080
