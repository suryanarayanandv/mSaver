import React, { useState, useMemo, useRef } from "react";

const TextArea = ({ auto }) => {
  const [value, setValue] = useState("");
  const [matching, setMatching] = useState([]);
  
  const currentUpdated = useMemo(() => ({ word: "", match: "" }), []);

  function handleSearch(e) {
    // if key == space call searchWords
    setValue(e.target.value);
    if (e && e.keyCode == 32) {
      let words = value.split(" ");
      words.pop();
      let lastWord = words.pop();
      console.log("line 16 executing...", lastWord);
      searchWords(lastWord);
    }
    // if key == backspace
    if (e && e.keyCode == 8) {
      if (currentUpdated.word == "" || currentUpdated.match == "") {
        return;
      } else {
        let words = value.split(" ");
        let prevWord = words.pop();
        if (prevWord == currentUpdated.match) {
          let newText = changeText(currentUpdated.match, currentUpdated.word);
          if (newText) {
            setValue(newText + " ");
          }
          // reset currentUpdated
          currentUpdated.word = "";
          currentUpdated.match = "";
        }
      }
    }
  }

  function searchWords(word) {
    fetch("http://127.0.0.1:8000/saver/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let matching = data.words;
        console.log("line 30...", word, data);
        let changes = document.getElementById("changes");
        console.log(matching);

        // if matching is not empty
        // auto -> change text
        // else -> create button mappings
        // TODO: fix button mappings (undefined behavior)
        if (matching.length > 0) {
          if (auto) {
            console.log("line 39 executing...", auto);
            let newText = changeText(word, matching[0]);
            if (newText) {
              currentUpdated.word = word;
              currentUpdated.match = matching[0];
              console.log("line 44 executing...", currentUpdated);
              setValue(newText);
            }
          } else {
            matching.forEach((match) => {
              let button = changes.appendChild(
                document.createElement("button")
              );
              button.innerHTML = word + " => " + match;
              button.addEventListener("click", () => {
                handleChange(word, match);
                button.remove();
              });
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(word, match) {
    let newText = changeText(word, match);
    if (newText) {
      setValue(newText);
      console.log(value, newText);
    }
  }

  function changeText(word, match) {
    console.log("line 51 executing...", value);
    let text = value;
    let newText = text.replace(word, match);
    console.log("line 54 executing..." + value + " " + newText);
    if (newText !== text && newText !== "") {
      return newText;
    } else {
      return false;
    }
  }

  return (
    <>
      <textarea
        id="input"
        rows="10"
        cols="50"
        value={value}
        onKeyUp={(e) => handleSearch(e)}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <br />
      <span id="changes"></span>
      <br />
      <span id="result">{value}</span>
    </>
  );
};

export default TextArea;
