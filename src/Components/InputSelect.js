import { useState } from "react";

export function InputSelect({ options, onChange, id, label }) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select onChange={onChange} id={id ? id : ""}>
        {options.map((option) => {
          return (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}
