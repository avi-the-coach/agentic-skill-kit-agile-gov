#!/usr/bin/env python3
"""Assemble an offline prototype using only the standard library."""
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def build(app_path, output):
    shell = (ROOT / 'templates/prototype.html').read_text(encoding='utf-8')
    app = Path(app_path).read_text(encoding='utf-8')
    if 'window.PrototypeApp' not in app:
        raise ValueError('Adapter must define window.PrototypeApp')
    parts = {
        '/*__STYLE__*/': (ROOT / 'assets/review.css').read_text(encoding='utf-8'),
        '/*__APP__*/': app,
        '/*__RUNTIME__*/': (ROOT / 'assets/review-runtime.js').read_text(encoding='utf-8'),
    }
    for marker, content in parts.items():
        if shell.count(marker) != 1:
            raise ValueError(f'Expected one assembly marker: {marker}')
        # A literal closing tag would break the containing raw-text element.
        closing = '</style' if marker == '/*__STYLE__*/' else '</script'
        if closing in content.lower():
            raise ValueError(f'Inline asset contains unsafe {closing}; escape it in the source')
        shell = shell.replace(marker, content)
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(shell, encoding='utf-8')
    print(f'Built {output} ({len(shell.encode("utf-8"))} bytes)')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    build(args.app, args.output)
