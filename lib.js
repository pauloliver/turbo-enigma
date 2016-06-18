'use strict';

const START = String.fromCharCode(2);
const END = String.fromCharCode(3);

function tokenize(string) {
    return string.match(/\S+/g);
}

/**
 *
 * @param {Array<String>} corpus
 */
function createChain(corpus) {
    let markovChain = {};

    for (let string of corpus) {
        let tokenizedString = tokenize(string);
        tokenizedString.unshift(START);
        tokenizedString.push(END);

        for (let i = 0; i < tokenizedString.length - 1; i++) {
            let curWordChain = markovChain[tokenizedString[i]] || [];
            curWordChain.push(tokenizedString[i+1]);

            markovChain[tokenizedString[i]] = curWordChain;
        }
    }
    return markovChain;
}

function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * (arrayLength));
}

function generateText(chain) {
    let generatedText = [];
    let currentWord = START;

    while (currentWord !== END) {
        const wordChain = chain[currentWord];
        currentWord = wordChain[getRandomIndex(wordChain.length)];
        generatedText.push(currentWord);
    }

    return generatedText.join(' ');
}

module.exports = {createChain, generateText};