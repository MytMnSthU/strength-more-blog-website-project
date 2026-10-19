#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Searching and renaming files (excluding node_modules and dist)..."

# Find .jsx and .js files while pruning out node_modules and dist folders
find . \( -name "node_modules" -o -name "dist" \) -prune -o -type f \( -name "*.jsx" -o -name "*.js" \) -print | while IFS= read -r file; do
    # Determine new file extension based on the current one
    if [[ "$file" == *.jsx ]]; then
        newfile="${file%.jsx}.tsx"
    elif [[ "$file" == *.js ]]; then
        newfile="${file%.js}.ts"
    else
        continue
    fi
    
    mv "$file" "$newfile"
    echo "Renamed: $file -> $newfile"
done

echo "Done! All target files have been converted."