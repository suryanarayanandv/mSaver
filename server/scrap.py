import json
import shutil
from bs4 import BeautifulSoup
import requests
import regex as re


def fetchWords(letter: str) -> dict:
    url_start = r"https://www.thefreedictionary.com/words-that-start-with-" + letter.lower()
    url_mid = r"https://www.thefreedictionary.com/words-containing-" + letter.lower()
    
    response_start = requests.get(url_start, stream=True)
    response_mid = requests.get(url_mid, stream=True)

    divs = []
    
    # Getting WOrds starting with the specified letter
    soup = BeautifulSoup(response_start.text, 'html.parser')
    for i in range(3, 16):
        divs.append(soup.find("div", {"id": "w" + str(i)}))
        
    # Getting Words containing the specified letter
    soup = BeautifulSoup(response_mid.text, 'html.parser')
    for i in range(3, 16):
        divs.append(soup.find("div", {"id": "w" + str(i)}))


    # write it to a file
    filename = "words-" + letter + ".txt"
    with open(filename, "w") as f:
        for div in divs:
            for li in div.find_all('li'):
                f.write(li.text + "\n")
                
    return generateMap(letter, filename)

def generateMap(letter: str, path: str):
    Words = []
    word_mapping = {}
    with open(path, "r") as f:
        Words = f.readlines()

    for word in Words:
        # remove the new line character
        word = word.strip()
        letters = list(word)
        if letters[0] == letter:
            word_mapping[''.join(letters[1::])] = word[0:len(word)]
            
        elif letter in word:
            word_mapping[word.replace(letter, "")] = word[0:len(word)]
            

    return word_mapping


def findMatches(word: str, word_mapping: dict):
    if word in word_mapping:
        matches = {
            "words": [word_mapping[word]],
        }
    else:
        return json.dumps({"words": []})

    return json.dumps(matches)