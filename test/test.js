'use strict';

const expect = require('expect.js');
const lib = require('./../lib');

describe('Markov Chains', () => {

    it('should generate a correct Markov chain', () => {
        const START = '\u0002';
        const END = '\u0003';

        const testStrings = [
            '`I am a string!`',
            'I am also a string.',
            'I am'
        ];

        const chain = lib.createChain(testStrings);

        let expected = {
            '`I': ['am'],
            'am': ['a', 'also', lib.END],
            'a': ['string!`', 'string.'],
            'string!`': [END],
            'I': ['am', 'am'],
            'also': ['a'],
            'string.': [END]
        };
        expected[START] = ['`I', 'I', 'I'];

        expect(chain).to.eql(expected);
    });
});