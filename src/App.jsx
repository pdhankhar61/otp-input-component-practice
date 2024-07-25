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

  // for backspace- backward jumping
  function handleKeyUP(e) {
    if (e.code === "Backspace" || e.which === 8) {
      if (e.target.value.length === 0) {
        const prevSibling = e.target.previousElementSibling;
        if (prevSibling) {
          prevSibling.focus();
          prevSibling.select();
        }
      }
    }
  }

  function pasteMainLogic(e) {
    // reads clipboard.
    const copied_otp = e.clipboardData.getData("text");
    /*
    Checks length and type of "copied_otp".
    IF (length===fieldCount && it is a number) -> paste the value.
    ELSE -> do nothing.

    // parseInt is used here because isNaN was considering space(" ") and "" as number.
    */
    if (copied_otp.length === fieldCount && !isNaN(parseInt(copied_otp, 10))) {
      const all_input_fields = document.getElementsByTagName("input");
      for (let i = 0; i < all_input_fields.length; i++) {
        all_input_fields[i].value = copied_otp[i];
      }
      all_input_fields[all_input_fields.length - 1].focus();
      setFinalValue(Array.from(copied_otp));
    }
  }

  // for pasting.
  function handlePaste(e) {
    e.preventDefault();
    pasteMainLogic(e);
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
              onPaste={handlePaste}
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
