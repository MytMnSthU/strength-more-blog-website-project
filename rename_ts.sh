#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Searching and renaming .js files to .ts..."

# Find all .js files recursively and process them safely
find . -type f -name "*.js" | while IFS= read -r file; do
    # Remove .js from the end and append .ts
    newfile="${file%.js}.ts"
    
    mv "$file" "$newfile"
    echo "Renamed: $file -> $newfile"
done

echo "Done! All .js files have been converted to .ts."