import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

function Input({ type, placeholder, value, onChange }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    onChange("");
  });

  return (
    <input
      className="search"
      type={type ? type : "text"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Input;
