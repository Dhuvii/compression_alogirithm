import React, { useRef, useState } from "react";
import Table, { Props } from "./components/Table";
import { DataType, run } from "./functions/shanoFanoAlgorithm";

const ShanoFanoAlgorithm = () => {
  const [compressed, setCompressed] = useState(null);
  const [sorted, setSorted] = useState<DataType[]>([]);
  const wordEl = useRef<HTMLInputElement>(null);

  const handleRunAlgorithm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const word = wordEl?.current?.value || "";
    if (word.length) {
      setCompressed(() => run(word).compressedData);
      setSorted(() => run(word).sortedData);
    }
  };

  const clear = () => {
    setCompressed(null);
    if (wordEl && wordEl.current) {
      wordEl.current.value = "";
    }
  };

  type Headings = "letter" | "code";
  type SortedHeadings = "letter" | "frequency";
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full h-full border p-10 rounded-xl">
        <h1 className="pb-10 text-2xl text-center font-bold text-gray-800">
          Shannon-Fano coding calculator
        </h1>
        <form
          onSubmit={handleRunAlgorithm}
          className="w-full flex items-center justify-center gap-5"
        >
          <div className="w-full relative ">
            <input
              ref={wordEl}
              autoComplete="off"
              type="text"
              id="word_input"
              className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="word_input"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Enter word
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 text-center font-medium rounded-lg text-sm text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-green-300 transition-all duration-300"
          >
            Run
          </button>

          {compressed && (
            <button
              type="button"
              onClick={clear}
              className="px-5 py-2.5 text-center font-medium rounded-lg text-sm text-gray-600 bg-gradient-to-r  hover:bg-gray-200 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-gray-300"
            >
              clear
            </button>
          )}
        </form>

        {compressed && (
          <div className="mt-10 w-full flex items-center justify-between gap-10">
            <Table<SortedHeadings>
              title={"Frequency Table"}
              headings={["letter", "frequency"]}
              datas={
                sorted.map(({ letter, frequency }) => ({
                  letter: {
                    value: letter,
                    badge: true,
                  },
                  frequency: {
                    value: frequency.toString(),
                    className: "",
                  },
                })) as any
              }
            />
            <Table<Headings>
              title={"Code"}
              headings={["letter", "code"]}
              datas={
                Object.entries(compressed).map(([key, value]) => ({
                  letter: {
                    value: key,
                    badge: true,
                  },
                  code: {
                    value: value,
                    className: "",
                  },
                })) as Props<Headings>["datas"]
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ShanoFanoAlgorithm;
