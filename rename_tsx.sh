#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Searching and renaming .jsx files to .tsx..."

# Find all .jsx files recursively and process them safely
find . -type f -name "*.jsx" | while IFS= read -r file; do
    # Remove .jsx from the end and append .tsx
    newfile="${file%.jsx}.tsx"
    
    mv "$file" "$newfile"
    echo "Renamed: $file -> $newfile"
done

echo "Done! All .jsx files have been converted to .tsx."