import { writeJson } from 'https://deno.land/std/fs/write_json.ts';
import { BufReader } from 'https://deno.land/std/io/bufio.ts';

import { sMap } from './syllable_map.ts';
import { tMap } from './tone_map.ts';

if (Deno.args.length) {
  // Constants
  const CEDICT_PATH = Deno.args[0];
  const CEDICT_OUTPUT_PATH = 'cedict.json';
  const PARSE_DURATION_KEY = 'ParsedIn';

  console.time(PARSE_DURATION_KEY);

  const splitTCAndPY = (source: string) => {
    const regex = /^(?<tc>[^\s\d]+)\s.+\s\[(?<py>[^\[\]]+)\]/g;
    const results = regex.exec(source);

    if (results && results.groups) {
      const {
        groups: { tc, py },
      } = results;
      // Bypass symbol, number, surrogate code contents
      if (!/(\w+|[\ud800-\udfff])/.test(tc)) {
        return { tc, py };
      }
    }
  };

  const splitSyllableAndTone = (source: string) => {
    const regex = /(?<syllable>[^\d]+)(?<tone>\d)/g;
    const results = regex.exec(source);

    if (results && results.groups) {
      const {
        groups: { syllable, tone },
      } = results;

      const key = syllable.toLowerCase();

      type Valid = Extract<keyof typeof sMap, string>;

      const isValid = (k: string): k is Valid => Object.keys(sMap).includes(k);

      if (isValid(key)) return `${sMap[key]}${tMap[Number(tone) - 1]}`;
    }
  };

  const file = await Deno.open(CEDICT_PATH);

  const bufReader = new BufReader(file);

  const dictionary: { [key: string]: string } = {};

  let line: string | null;

  const isValidKey = (key?: string): key is string => key !== undefined;

  while ((line = await bufReader.readString('\n'))) {
    if (line.startsWith('#!')) console.log(line);

    if (!line.startsWith('#')) {
      const tcpy = splitTCAndPY(line);

      if (tcpy) {
        const keys = tcpy.py
          .split(' ')
          .map(splitSyllableAndTone)
          .filter(isValidKey);

        tcpy.tc
          .split('')
          .forEach((char, i) => keys[i] && (dictionary[char] = keys[i]));
      }
    }
  }

  file.close();

  await writeJson(CEDICT_OUTPUT_PATH, dictionary);

  console.timeEnd(PARSE_DURATION_KEY);
} else {
  console.log('Please provide the correct path of CEDICT file');
}
