import React, { useRef, useState } from "react";
import Table from "./components/Table";
import { Detail, lzw } from "./functions/lzw";
import splitWord from "./utilities/splitWord";

const LzwAlgorithm = () => {
  const [compressed, setCompressed] = useState<number[]>([]);
  const [details, setDetails] = useState<Detail[] | null>(null);
  const [map, setMap] = useState<null | any>({});
  const wordEl = useRef<HTMLInputElement>(null);

  const handleRunAlgorithm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const word = wordEl?.current?.value || "";

    if (word) {
      const { compressed, details, map } = lzw(word);
      setCompressed(compressed);
      setMap(map);
      setDetails(details);
    }
  };

  const clear = () => {
    setCompressed([]);
    setDetails(null);
    setMap(null);
    if (wordEl && wordEl.current) {
      wordEl.current.value = "";
    }
  };
  type Headings = "letter" | "code";

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full h-full border p-10 pb-0 rounded-xl">
        <div className="mb-10">
          <h1 className="pb-10 text-2xl text-center font-bold text-gray-800">
            Lempel-Ziv-Welsh Calculator
          </h1>
          <form
            onSubmit={handleRunAlgorithm}
            className="w-full flex flex-col md:flex-row md:flex- items-center justify-center gap-5"
          >
            <div className="w-full relative ">
              <input
                ref={wordEl}
                autoComplete="off"
                type="text"
                id="word_input_lzw"
                className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="word_input_lzw"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Enter word
              </label>
            </div>

            <div className="w-full md:w-auto flex items-center justify-end gap-5">
              <button
                type="submit"
                className="w-full md:w-auto px-5 py-2.5 text-center font-medium rounded-lg text-sm text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-green-300 transition-all duration-300"
              >
                Run
              </button>

              {details && (
                <button
                  type="button"
                  onClick={clear}
                  className="w-full md:w-auto px-5 py-2.5 text-center font-medium rounded-lg text-sm text-gray-600 bg-gradient-to-r  hover:bg-gray-200 focus-visible:ring-4 focus-visible:outline-none focus-visible:ring-gray-300"
                >
                  clear
                </button>
              )}
            </div>
          </form>
        </div>

        {details && (
          <div className="w-full flex gap-3 flex-col-reverse md:flex-row justify-between">
            <div className="w-full  py-5 pb-10 flex flex-col md:max-h-[500px] md:overflow-y-auto">
              <>
                {details &&
                  details.map((detail, idx) => (
                    <div key={idx}>
                      <div className="mb-5">
                        <Highlighter
                          textBeforeHighlight={splitWord(
                            wordEl.current?.value,
                            0,
                            detail.startPointer
                          )}
                          textToBeHighlighted={splitWord(
                            wordEl.current?.value,
                            detail.startPointer,
                            detail.endPointer
                          )}
                          textAfterHighlight={splitWord(
                            wordEl.current?.value,
                            detail.endPointer,
                            wordEl.current?.value.split("").length || 0
                          )}
                          type={detail.previousLetters ? "add" : "advance"}
                          description={detail.desc}
                        />
                      </div>

                      {detail.previousLetters && (
                        <>
                          <div className="flex items-center justify-start gap-1">
                            <p className="text-sm font-bold text-gray-800">
                              Compressed :{" "}
                            </p>
                            <div className="px-2 bg-gray-200 rounded-md text-gray-700">
                              {compressed
                                .slice(0, detail.compressedIndex + 1)
                                .join(", ")}
                            </div>
                          </div>

                          <div className="w-full border-t my-10"></div>
                        </>
                      )}
                    </div>
                  ))}

                {compressed.length > 0 && (
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-sm font-bold text-gray-800">
                      Final Compressed :{" "}
                    </p>
                    <div className="px-2 bg-gray-200 rounded-md text-gray-700">
                      {compressed.join(", ")}
                    </div>
                  </div>
                )}
              </>
              {/* scroll indicator */}
            </div>

            <div className="h-full pb-10">
              <Table<Headings>
                title="Map"
                classNames="h-full md:max-h-[500px]"
                headings={["letter", "code"]}
                datas={Object.entries(map).map(
                  ([key, value]) =>
                    ({
                      letter: {
                        value: key.toUpperCase(),
                        badge: true,
                        className: `${key.length > 1 && "bg-blue-50"} `,
                      },
                      code: {
                        value: `${value}`,
                        className: `${
                          key.length > 1 && "bg-blue-50 text-blue-900"
                        } `,
                      },
                    } as any)
                )}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface IHighlighterProps {
  textBeforeHighlight?: string;
  textAfterHighlight?: string;
  textToBeHighlighted: string;
  description?: string;
  type: "advance" | "add";
}

function Highlighter({
  textBeforeHighlight,
  textAfterHighlight,
  textToBeHighlighted,
  type,
  description,
}: IHighlighterProps) {
  return (
    <div className="">
      <p className="text-xl font-bold text-gray-800">
        {textBeforeHighlight && textBeforeHighlight}
        <span
          className={`px-2 py-1 rounded-md ${
            type === "advance" ? " bg-yellow-300" : " bg-blue-300"
          }`}
        >
          {textToBeHighlighted}
        </span>
        {textAfterHighlight && textAfterHighlight}
      </p>

      {description && (
        <p className="mt-1 text-xs text-gray-600 italic">{description}</p>
      )}
    </div>
  );
}

/* 
 DADABCADDABDA
*/

export default LzwAlgorithm;
