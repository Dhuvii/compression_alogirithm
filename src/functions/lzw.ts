export type Detail = {
  startPointer: number;
  endPointer: number;
  letters: string;
  value: number;
  desc: string;
  compressedIndex: number;
  previousLetters?: string;
};

export function lzw(word: string) {
  const wordArray = word
    .trim()
    .toLowerCase()
    .split("")
    .filter((letter) => letter != " ");
  let startPointer = 0;
  let endPointer = 1;

  type Map = {
    [x in typeof wordArray[number]]: number;
  };

  let map: Map = buildMap(word);

  let nextMapIndex = Object.keys(map).length + 1;
  const compressed = [];

  const details: Detail[] = [];

  while (endPointer <= wordArray.length) {
    const letters = wordArray.slice(startPointer, endPointer).join("");
    if (letters in map) {
      let detail: any = {
        startPointer,
        endPointer: endPointer,
        letters,
        value: map[letters],
      };
      if (startPointer + letters.length === wordArray.length) {
        compressed.push(map[letters]);
        detail.compressedIndex = compressed.length - 1;
        detail.desc = `Since | ${letters.toUpperCase()} | is in the map, and the word ends, we can add the value for | ${letters.toUpperCase()} | which is ${
          map[letters]
        } to the compressed string.`;
      } else {
        detail.desc = `Since | ${letters.toUpperCase()} | is in the map, join the next letter, which becomes ${wordArray
          .slice(startPointer, endPointer + 1)
          .join("")
          .toUpperCase()}`;
      }

      details.push(detail);
      endPointer++;
    } else {
      map[letters] = nextMapIndex;
      const previousLetters = wordArray
        .slice(startPointer, endPointer - 1)
        .join("");

      compressed.push(map[previousLetters]);

      const detail: Detail = {
        startPointer: startPointer,
        endPointer: endPointer,
        letters,
        previousLetters: previousLetters,
        value: nextMapIndex,
        compressedIndex: compressed.length - 1,
        desc: `Add an entry for | ${letters.toUpperCase()} | with the value of ${nextMapIndex}, add the value for | ${previousLetters.toUpperCase()} | which is ${
          map[previousLetters]
        } in the compressed string.`,
      };

      details.push(detail);

      startPointer = endPointer - 1;
      nextMapIndex++;
    }
  }

  return { compressed, details, map };
}

function buildMap(word: string) {
  const map: {
    [x in string]: number;
  } = {};

  let index = 1;
  let wordArray = word
    .trim()
    .toLowerCase()
    .split("")
    .filter((letter) => letter !== " ");

  wordArray.sort((a, b) => (a > b ? 1 : -1));
  wordArray.forEach((letter) => {
    if (!(letter in map)) {
      map[letter] = index;
      index++;
    }
  });

  return map;
}
