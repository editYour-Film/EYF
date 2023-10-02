import React, { useEffect, useState, useRef } from "react";

type textSplitProps = {
  input: string;
  type?: "line" | "word" | "char";
  noLH?: boolean;
};

export const TextSplit = ({ input, type, noLH }: textSplitProps) => {
  const [words, setWords] = useState<{ content: string; charStart: number }[]>(
    []
  );

  const splitInput = () => {
    parseInput(input);
  };

  const parseInput = (input: textSplitProps["input"]) => {
    const _words = input.split(" ");
    const wordsVal = [];
    let charIndex = 0;
    for (let i = 0; i < _words.length; i++) {
      wordsVal.push({
        content: _words[i],
        charStart: charIndex,
      });

      charIndex += _words[i].length;
    }
    setWords(wordsVal);
  };

  useEffect(() => {
    splitInput();    
  }, [input]);

  return (
    <span className={`split-content ${noLH && "leading-none"}`}>
      {words.map((word, i) => (
        <Word
          key={i}
          chars={word.content}
          i={i}
          wordsNb={words.length}
          charStart={word.charStart}
        />
      ))}
    </span>
  );
};

type WordProps = {
  chars: string;
  i: number;
  wordsNb: number;
  charStart: number;
};

const Word = ({ chars, i, wordsNb, charStart }: WordProps) => {
  const charsArray = chars.replace(/\s+/g, "").split("");
  const el = useRef<HTMLSpanElement>(null);
  const [lineNb, setLineNb] = useState(0);

  useEffect(() => {
    const top = el.current !== null ? el.current.offsetTop : 0;
    const lineH =
      el.current !== null
        ? parseInt(getComputedStyle(el.current).lineHeight, 10)
        : 0;
    setLineNb(Math.ceil(top / lineH));
  }, []);

  return (
    <>
      <span
        ref={el}
        className="split-word"
        data-split-word-index={i}
        data-split-word
        data-split-line-index={lineNb}
        style={
          {
            "--split-word-i": i,
            "--split-line-i": lineNb,
          } as React.CSSProperties
        }
      >
        {charsArray.map((char, i) => (
          <Char key={i} char={char} i={i} charStart={charStart} />
        ))}
      </span>
      {i !== wordsNb - 1 && <WhiteSpace />}
    </>
  );
};

type CharProps = {
  char: string;
  i: number;
  charStart: number;
};
const Char = ({ char, i, charStart }: CharProps) => {
  return (
    <span
      className="split-char"
      data-split-char-index={i + charStart}
      data-split-char
      style={
        {
          "--split-char-i": i + charStart,
        } as React.CSSProperties
      }
    >
      <span className="char-content" split-content={char}>
        {char}
      </span>
    </span>
  );
};

const WhiteSpace = () => {
  return (
    <span className="split-white-space" data-split-white-space>
      {" "}
    </span>
  );
};
