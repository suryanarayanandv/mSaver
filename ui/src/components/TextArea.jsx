import React, { useState, useMemo } from "react";

const TextArea = ({ auto }) => {
  const [value, setValue] = useState("");
  const [matchlist, setMatchlist] = useState([]);
  const currentUpdated = useMemo(() => ({ word: "", match: "" }), []);
  const localValue = useMemo(() => value, [value]);

  function handleSearch(e) {
    setValue(e.target.value);
    
    // if key == space call searchWords
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
          // Reset Current updated values
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

        // auto -> change text
        // else -> create button mappings
        // TODO: fix button mappings (undefined behavior)
        if (matching.length > 0) {
          if (auto) {
            console.log("line 64 executing...", auto);
            let newText = changeText(word, matching[0]);
            if (newText) {
              currentUpdated.word = word;
              currentUpdated.match = matching[0];
              setValue(newText);
            }
          } else {
            /**
             * understand that these buttons only revert back to the 
             * previous states not to change the current one
             * they don't have access to current one
             * ? drop button mappings
             */
            matching.forEach((match) => {
              setMatchlist((prev) => {
                prev.push({"word": word, "match": match});
                return prev;
              });
              console.log("matching: ", matchlist);

              let changeText = changes.appendChild(button)
              changeText.innerHTML = word + " => " + match;
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange() {
    let newText = changeText(matching[0].word, matching[0].match);
    if (newText) {
      setValue(newText);
      console.log(value, newText);
    }
  }

  function changeText(word, match) {
    let text = localValue;
    let newText = text.replace(word, match);
    console.log("line 100 executing", text, newText);
    if (newText !== text && newText !== "") {
      return newText;
    } else {
      return false;
    }
  }

  return (
    <>
      <textarea className="textarea"
        id="input"
        rows="10"
        cols="50"
        value={value}
        onKeyUp={(e) => handleSearch(e)}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <br />
      <span className="changes" id="changes"></span>
      <br />
      <span className="result" id="result">{value}</span>
    </>
  );
};

export default TextArea;
