import hctk from './mod.ts';

// Constants
const TEXT_ARG = '--text=';
const DICT_ARG = '--dict=';

function parseArg(name: string) {
  const fullArg = Deno.args.find((arg) => arg.includes(name));

  if (fullArg) {
    const [, value] = fullArg.split('=');

    return value;
  }
}

const text = parseArg(TEXT_ARG);
const filePath = parseArg(DICT_ARG);

if (text) {
  hctk(text, filePath).then(console.log);
} else {
  console.error('Please provide the correct input text');
}
