#!/usr/bin/env python3

# System
import json
import sys
from collections import Counter

def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <json-file>")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        data = json.load(f)

    cards = data.get("cards", data)
    fronts = [card["front"] for card in cards]
    counts = Counter(fronts)
    duplicates = [front for front, count in counts.items() if count > 1]

    if duplicates:
        print(f"Found {len(duplicates)} duplicate(s):")
        for dup in duplicates:
            print(f"  - {dup} ({counts[dup]}x)")
        sys.exit(1)

    print(f"No duplicates found ({len(fronts)} entries)")
    sys.exit(0)

if __name__ == "__main__":
    main()
