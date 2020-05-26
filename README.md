# Deno HantChar to Keyboard 漢字轉鍵盤配置

## Features

Parsing HantChar input to Keyboard output

## Limitations

Doesn't support **Polyphones** 不支援 **破音字**

For example:
  - 好大喜功
    - Output: `cl4`284vu3ej/
  - 功夫很好
    - Correct output: ej/zjcp3`cl3`
    - Current output: ej/zjcp3`cl4`

## Usage

### API

```javascript
// Default import
import hctk from 'https://deno.land/x/hctk/mod.ts';
// Named import
import { hctk } from 'https://deno.land/x/hctk/mod.ts';

// Use built-in dictionary
hctk('測試').then(console.log); // Output: hk4g4

// Use specific dictionary
hctk('測試', 'cedict.json').then(console.log); // Output: hk4g4
```

### CLI

```bash
# ===From source code===

# Use built-in dictionary
$ deno run mod_cli.ts --text=測試
# Output: hk4g4

# Use specific dictionary (Args' order doesn't matter)
$ deno run --allow-read mod_cli.ts --text=測試 --dict=cedict.json
# Output: hk4g4

# ===From bundled code===

# Use built-in dictionary
$ deno run hctk --text=測試
# Output: hk4g4

# Use specific dictionary (Args' order doesn't matter)
$ deno run --allow-read hctk --text=測試 --dict=cedict.json
# Output: hk4g4
```

## CEDICT Parser CLI

To generate the parsed CEDICT JSON file (cedict.json) for further usages

This tool requires the following permissions:
  - `--allow-read` OR `--allow-read=<cedict-file-path>`
  - `--allow-write` OR `--allow-write=cedict.json`

### Usage

```bash
# ===From source code===

$ deno run --allow-read --allow-write cedict_parser_cli.ts cedict

$ deno run --allow-read=cedict --allow-write=cedict.json cedict_parser_cli.ts cedict

# ===From bundled code===

$ deno run --allow-read --allow-write cedict_parser cedict

$ deno run --allow-read=cedict --allow-write=cedict.json cedict_parser cedict
```
