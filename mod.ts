import { readJson } from 'https://deno.land/std/fs/read_json.ts';

import { cedict } from './cedict.ts';

async function hctk(text: string, filePath?: string) {
  if (/\w+/.test(text)) return 'N/A';

  const dict = filePath
    ? ((await readJson(filePath)) as { [key: string]: string })
    : cedict;

  return text
    .split('')
    .map((char) =>
      Object.entries(dict)
        .find(([key]) => key === char)
        ?.pop()
    )
    .join('');
}

export { hctk as default, hctk };
