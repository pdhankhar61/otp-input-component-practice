import { useState } from "react";
import "./App.css";

export default function App({ fieldCount }) {
  const [otpInputs] = useState(() => {
    const temp_array = [];
    for (let i = 1; i <= fieldCount; i++) {
      temp_array.push({ id: `input_${i}`, name: `input_${i}` });
    }
    return temp_array;
  });
  const [finalValue, setFinalValue] = useState([]);

  // for handling Input in field - forward jumping
  function handleInput(e) {
    // parseInt is used here because isNaN was considering space(" ") and "" as number.
    const isNotANumber = isNaN(parseInt(e.target.value, 10));
    if (isNotANumber) {
      e.target.value = "";
    }

    setFinalValue((prev) => {
      const temp_array = [...prev];
      temp_array[e.target.dataset.index] = e.target.value;
      return temp_array;
    });

    if (e.target.value.length === 1) {
      const nextSibling = e.target.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  }

  function handleKeyUP(e) {
    if (e.code === "Backspace" || e.which === 8) {
      const prevSibling = e.target.previousElementSibling;
      if (e.target.value.length === 0 && prevSibling) {
        prevSibling.focus();
        prevSibling.select();
      }
    }
  }

  function handleSubmit() {
    alert("OTP is- " + finalValue.join(""));
  }

  console.log(
    finalValue,
    "array_length: " + finalValue.length,
    "string_length: " + finalValue.join("").length
  );

  return (
    <main>
      <div className="otp_container">
        {otpInputs.map((item, index) => {
          return (
            <input
              data-index={index}
              key={item.id}
              id={item.id}
              name={item.name}
              type="text"
              autoFocus={item.id === otpInputs[0].id}
              maxLength={1}
              inputMode="numeric"
              onInput={handleInput}
              onKeyUp={handleKeyUP}
            />
          );
        })}
      </div>
      <button
        id="button"
        disabled={finalValue.join("").length !== fieldCount}
        onClick={handleSubmit}
      >
        Verify OTP
      </button>
    </main>
  );
}
