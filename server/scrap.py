import json
from bs4 import BeautifulSoup
import requests
import regex as re

# Single letter words
# @param initialLength -> Minimum length of the words to be fetched
def fetchWords(letter: str, initialLength: int) -> list:
    url_start = r"https://www.thefreedictionary.com/words-that-start-with-" + letter.lower()
    url_mid = r"https://www.thefreedictionary.com/words-containing-" + letter.lower()
    
    response_start = requests.get(url_start, stream=True)
    response_mid = requests.get(url_mid, stream=True)

    divs = []
    
    # Fetching words with length >= 2*initialLength
        
    # Getting WOrds starting with the specified letter
    soup = BeautifulSoup(response_start.text, 'html.parser')
    for i in range(max(4, 2*initialLength), 16):
        divs.append(soup.find("div", {"id": "w" + str(i)}))
        
    # Getting Words containing the specified letter
    soup = BeautifulSoup(response_mid.text, 'html.parser')
    for i in range(max(4, 2*initialLength), 16):
        divs.append(soup.find("div", {"id": "w" + str(i)}))

    # Extracting words from divs
    words = []
    for div in divs:
        for li in div.find_all("li"):
            words.append(li.text)

    return words

# Multiple letters word mappings
def fetchWordsMul(letters: list, initialLength: int) -> dict:
    Words = []
    
    for letter in letters:
        Words += fetchWords(letter, initialLength)
        
    return Words

# Words excluding missing keys
def fetchWodswithMissedKeys(letters: list, Words: list):
    missedKeyWords = []
    
    for word in Words:
        for letter in letters:
            word = word.replace(letter, "")
        missedKeyWords.append(word)
        
    return missedKeyWords
    
# Generating mappings { word with missed keys -> word }
def generateMappings(letters: list):
    initialLength = len(letters)
    Words = fetchWordsMul(letters, initialLength)
    missedKeyWords = fetchWodswithMissedKeys(letters, Words)

    mappings = {}
    for i in range(len(Words)):
        mappings[missedKeyWords[i]] = Words[i]
        
    return mappings

# Generating mappings.json
def generateMappingFile(letters: list):
    try:
        with open("mappings.json", "w") as f:
            f.write(json.dumps(generateMappings(letters)))
        return True
    except:
        return False

# Finding matches from mappings.json
def findMatches(word: str):
    word_mapping = {}
    try:
        with open("mappings.json", "r") as f:
            word_mapping = json.load(f)
    
        if word in word_mapping:
            matches = {
                "words": [word_mapping[word]],
            }
        else:
            return json.dumps({"words": []})

        return json.dumps(matches)
    
    except:
        return False