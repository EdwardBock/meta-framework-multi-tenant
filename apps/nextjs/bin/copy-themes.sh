#!/bin/zsh


# Get the directory of the script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

# Change into the script's directory
cd "$SCRIPT_DIR/../public" || { echo "Error: Could not change directory to $SCRIPT_DIR"; exit 1; }

rm -rf themes
cp -R ../../../packages/ui/src/styles/themes themes
