import React, {useState} from "react";

function ConfigArea({ isAutoComplete, setAutoComplete }) {
    const [value, setValue] = useState("");
    const [letters, setLetters] = useState([]);
    const [auto, setAuto] = useState(isAutoComplete);


    function handleConfig() {
      fetch("http://127.0.0.1:8000/saver/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          letter: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    // Single letter config
    // TODO: Add multiple letter config
    // TODO: Add Keyboard layout
    return (
      <>
        <input id="input" value={ value } onChange={(e) => handleChange(e)} />
        <br />
        <input type="checkbox" id="auto" name="auto" checked={auto} onChange={() => {
            setAuto(!auto);
            setAutoComplete(!auto);
        }} />AutoCorrect
        <br />
        <button onClick={handleConfig}>Config</button>
      </>
    );
}

export default ConfigArea;