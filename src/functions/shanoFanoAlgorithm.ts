import sortObject from "../utilities/sortObject";
import divideArray from "../utilities/divideArray";

export type DataType = {
  letter: string;
  frequency: number;
};

function recSplit(array: DataType[], map: any = {}): any {
  if (array.length <= 1) return map;
  const { splitIndex } = divideArray(array.map((data) => data.frequency));
  const array1 = array.slice(0, splitIndex);
  const array2 = array.slice(splitIndex, array.length);

  array1.forEach((data) => {
    if (data.letter in map) map[data.letter] += "0";
    else map[data.letter] = "0";
  });

  array2.forEach((data) => {
    if (data.letter in map) map[data.letter] += "1";
    else map[data.letter] = "1";
  });

  return { ...recSplit(array1, map), ...recSplit(array2, map) };
}

function tokenizeString(word: string): DataType[] {
  const map: any = {};
  word
    .toUpperCase()
    .trim()
    .split(" ")
    .join("")
    .split("")
    .forEach((letter) => {
      if (letter in map) map[letter] += 1;
      else map[letter] = 1;
    });

  return Object.entries(map).map(([letter, frequency]) => ({
    letter,
    frequency,
  })) as DataType[];
}

const run = (word: string) => {
  const temp: DataType[] = [
    {
      letter: "A",
      frequency: 0.2,
    },
    {
      letter: "B",
      frequency: 0.15,
    },
    {
      letter: "C",
      frequency: 0.25,
    },
    {
      letter: "D",
      frequency: 0.1,
    },
    {
      letter: "E",
      frequency: 0.05,
    },
    {
      letter: "F",
      frequency: 0.15,
    },
    {
      letter: "$",
      frequency: 0.1,
    },
  ];
  const datas: DataType[] = tokenizeString(word);

  const sortedDatas = datas.sort((a, b) =>
    sortObject(a, b, "frequency", "desc")
  );

  return { sortedData: sortedDatas, compressedData: recSplit(sortedDatas) };
};

export { run };
