import { useEffect, useRef, useState } from "react";

export default function Passcord() {
  const [arrayValue, setArrayValue] = useState<(string | number)[]>([
    "",
    "",
    ""
  ]);
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement> | []>([]);

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
        />
      ))}
    </>
  );
}

