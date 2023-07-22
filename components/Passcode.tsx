import React, { useEffect, useRef, useState } from "react";

export default function Passcord() {
  const [arrayValue, setArrayValue] = useState<(string | number)[]>([
    "",
    "",
    "",
    ""
  ]);
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
  // storing reference of current element
  const inputRefs = useRef<Array<HTMLInputElement> | []>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key;
    if (!(keyCode >= "0" && keyCode <= "9") && keyCode !== "Backspace") {
      e.preventDefault();
    }
  };
  // making sure the value provided is numeric
  const onChange = (e: React.BaseSyntheticEvent, index: number) => {
    setArrayValue((preValue: (string | number)[]) => {
      const newArray = [...preValue];
      if (parseInt(e.target.value)) {
        newArray[index] = parseInt(e.target.value);
      } else {
        newArray[index] = e.target.value;
      }
      return newArray;
    });
  };

 const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
   if (e.key === "Backspace") {
     if (index === 0) {
       setCurrentFocusedIndex(0);
     } else {
       setCurrentFocusedIndex(index - 1);
       if (inputRefs && inputRefs.current && inputRefs.current[index - 1]) {
         inputRefs.current[index - 1].focus();
       }
     }
   } else if (/^\d$/.test(e.key) && index <= arrayValue.length - 2) {
     setArrayValue((prevArray) => {
       const newArray = [...prevArray];
       newArray[index] = parseInt(e.key);
       return newArray;
     });
     setCurrentFocusedIndex(index + 1);
     if (inputRefs && inputRefs.current && inputRefs.current[index + 1]) {
       inputRefs.current[index + 1].focus();
     }
   }
 };

  // on focus event
  const onFocus = (e: React.BaseSyntheticEvent, index: number) => {
    setCurrentFocusedIndex(index);
  };

  return (
    <>
      <div>currentFocusedIndex:{currentFocusedIndex}</div>
      {arrayValue.map((value: string | number, index: number) => (
        <input
          key={`index-${index}`}
          ref={(el) => el && (inputRefs.current[index] = el)}
          maxLength={1}
          pattern="\d{1}"
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e, index)}
          onKeyUp={(e) => onKeyUp(e, index)}
          onKeyDown={(e) => onKeyDown(e)}
          onFocus={(e) => onFocus(e, index)}
        />
      ))}
    </>
  );
}
