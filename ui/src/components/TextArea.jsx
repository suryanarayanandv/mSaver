import React, { useState, useMemo } from "react";
import "../styles/textarea.css";

// Result component
import Result from "./Result";

const TextArea = ({ auto }) => {
  const [value, setValue] = useState("");
  const [matching, setMatching] = useState([]);
  const currentUpdated = useMemo(() => ({ word: "", match: "" }), []);

  // Handle the key press
  function handleSearch(e) {
    setValue(e.target.value);

    // if key == space call searchWords
    if (e && e.keyCode == 32) {
      let words = value.split(" ");
      words.pop();
      let lastWord = words.pop();
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

  // Search for matching words api call
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
        let matchList = data.words;

        // auto correct -> change text
        if (matchList.length > 0) {
          if (auto) {
            let newText = changeText(word, matchList[0]);
            if (newText) {
              currentUpdated.word = word;
              currentUpdated.match = matchList[0];
              setValue(newText);
            }
          }

          // Not auto correct -> create key mappings
          else {
            setMatching((prev) => [...prev, { word: word, match: matchList[0] }]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Button mapping click handler
  function handleManualCorrection(selectedSuggestion) {
    let newText = changeText(selectedSuggestion.word, selectedSuggestion.match);
    if (newText) {
      setValue(newText);
      // remove that suggestion from the list
      let newMatching = matching.filter(
        (match) => match.word !== selectedSuggestion.word
      );
      setMatching(newMatching);
    }
  }

  function handleChange() {
    let newText = changeText(matching[0].word, matching[0].match);
    if (newText) {
      setValue(newText);
    }
  }

  // Update matching words
  function changeText(word, match) {
    let text = value;
    let newText = text.replace(word, match);
    if (newText !== text && newText !== "") {
      return newText;
    } else {
      return false;
    }
  }

  return (
    <>
      <textarea
        className="textarea"
        rows="10"
        cols="80"
        value={value}
        onKeyUp={(e) => handleSearch(e)}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <br />
      <div className="changes">
        {matching.map((match, index) => (
          <button key={index} onClick={() => handleManualCorrection(match)}>
            {match.word + " -> " + match.match}
          </button>
        ))}
      </div>
      <Result value={value} />
    </>
  );
};

export default TextArea;
