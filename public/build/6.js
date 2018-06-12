webpackJsonp([6],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.js ***!
  \************************************************************************/
/*! exports provided: conf, language */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
var conf = {
    comments: {
        lineComment: '#'
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    folding: {
        offSide: true
    }
};
var language = {
    tokenPostfix: '.yaml',
    brackets: [
        { token: 'delimiter.bracket', open: '{', close: '}' },
        { token: 'delimiter.square', open: '[', close: ']' }
    ],
    keywords: ['true', 'True', 'TRUE', 'false', 'False', 'FALSE', 'null', 'Null', 'Null', '~'],
    numberInteger: /(?:0|[+-]?[0-9]+)/,
    numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,
    numberOctal: /0o[0-7]+/,
    numberHex: /0x[0-9a-fA-F]+/,
    numberInfinity: /[+-]?\.(?:inf|Inf|INF)/,
    numberNaN: /\.(?:nan|Nan|NAN)/,
    numberDate: /\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,
    escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
    tokenizer: {
        root: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Directive
            [/%[^ ]+.*$/, 'meta.directive'],
            // Document Markers
            [/---/, 'operators.directivesEnd'],
            [/\.{3}/, 'operators.documentEnd'],
            // Block Structure Indicators
            [/[-?:](?= )/, 'operators'],
            { include: '@anchor' },
            { include: '@tagHandle' },
            { include: '@flowCollections' },
            { include: '@blockStyle' },
            // Numbers
            [/@numberInteger(?![ \t]*\S+)/, 'number'],
            [/@numberFloat(?![ \t]*\S+)/, 'number.float'],
            [/@numberOctal(?![ \t]*\S+)/, 'number.octal'],
            [/@numberHex(?![ \t]*\S+)/, 'number.hex'],
            [/@numberInfinity(?![ \t]*\S+)/, 'number.infinity'],
            [/@numberNaN(?![ \t]*\S+)/, 'number.nan'],
            [/@numberDate(?![ \t]*\S+)/, 'number.date'],
            // Key:Value pair
            [/(".*?"|'.*?'|.*?)([ \t]*)(:)( |$)/, ['type', 'white', 'operators', 'white']],
            { include: '@flowScalars' },
            // String nodes
            [/.+$/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // Flow Collection: Flow Mapping
        object: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Flow Mapping termination
            [/\}/, '@brackets', '@pop'],
            // Flow Mapping delimiter
            [/,/, 'delimiter.comma'],
            // Flow Mapping Key:Value delimiter
            [/:(?= )/, 'operators'],
            // Flow Mapping Key:Value key
            [/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, 'type'],
            // Start Flow Style
            { include: '@flowCollections' },
            { include: '@flowScalars' },
            // Scalar Data types
            { include: '@tagHandle' },
            { include: '@anchor' },
            { include: '@flowNumber' },
            // Other value (keyword or string)
            [/[^\},]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // Flow Collection: Flow Sequence
        array: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Flow Sequence termination
            [/\]/, '@brackets', '@pop'],
            // Flow Sequence delimiter
            [/,/, 'delimiter.comma'],
            // Start Flow Style
            { include: '@flowCollections' },
            { include: '@flowScalars' },
            // Scalar Data types
            { include: '@tagHandle' },
            { include: '@anchor' },
            { include: '@flowNumber' },
            // Other value (keyword or string)
            [/[^\],]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // Flow Scalars (quoted strings)
        string: [
            [/[^\\"']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'string', next: '@pop' },
                        '@default': 'string'
                    }
                }]
        ],
        // First line of a Block Style
        multiString: [
            [/^( +).+$/, 'string', '@multiStringContinued.$1']
        ],
        // Further lines of a Block Style
        //   Workaround for indentation detection
        multiStringContinued: [
            [/^( *).+$/, {
                    cases: {
                        '$1==$S2': 'string',
                        '@default': { token: '@rematch', next: '@popall' }
                    }
                }]
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white']
        ],
        // Only line comments
        comment: [
            [/#.*$/, 'comment']
        ],
        // Start Flow Collections
        flowCollections: [
            [/\[/, '@brackets', '@array'],
            [/\{/, '@brackets', '@object']
        ],
        // Start Flow Scalars (quoted strings)
        flowScalars: [
            [/"/, 'string', '@string."'],
            [/'/, 'string', '@string.\'']
        ],
        // Start Block Scalar
        blockStyle: [
            [/[>|][0-9]*[+-]?$/, 'operators', '@multiString']
        ],
        // Numbers in Flow Collections (terminate with ,]})
        flowNumber: [
            [/@numberInteger(?=[ \t]*[,\]\}])/, 'number'],
            [/@numberFloat(?=[ \t]*[,\]\}])/, 'number.float'],
            [/@numberOctal(?=[ \t]*[,\]\}])/, 'number.octal'],
            [/@numberHex(?=[ \t]*[,\]\}])/, 'number.hex'],
            [/@numberInfinity(?=[ \t]*[,\]\}])/, 'number.infinity'],
            [/@numberNaN(?=[ \t]*[,\]\}])/, 'number.nan'],
            [/@numberDate(?=[ \t]*[,\]\}])/, 'number.date']
        ],
        tagHandle: [
            [/\![^ ]*/, 'tag']
        ],
        anchor: [
            [/[&*][^ ]+/, 'namespace']
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3lhbWwveWFtbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUNBQXFDLFlBQVksR0FBRztBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixFQUFFO0FBQ3RCLHNEQUFzRCxFQUFFO0FBQ3hEO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixFQUFFO0FBQ25CO0FBQ0E7QUFDQSxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLDhCQUE4QjtBQUMzQyxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHNCQUFzQjtBQUNuQztBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsYUFBYSw4QkFBOEI7QUFDM0MsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLHlCQUF5QjtBQUN0QztBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4QkFBOEI7QUFDM0MsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnQ0FBZ0M7QUFDcEU7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQSwyQ0FBMkM7QUFDM0MseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx1Q0FBdUM7QUFDdkMsNENBQTRDO0FBQzVDLHVDQUF1QztBQUN2Qyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcjJ1xuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBvZmZTaWRlOiB0cnVlXG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgdG9rZW5Qb3N0Zml4OiAnLnlhbWwnLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcsIG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScsIG9wZW46ICdbJywgY2xvc2U6ICddJyB9XG4gICAgXSxcbiAgICBrZXl3b3JkczogWyd0cnVlJywgJ1RydWUnLCAnVFJVRScsICdmYWxzZScsICdGYWxzZScsICdGQUxTRScsICdudWxsJywgJ051bGwnLCAnTnVsbCcsICd+J10sXG4gICAgbnVtYmVySW50ZWdlcjogLyg/OjB8WystXT9bMC05XSspLyxcbiAgICBudW1iZXJGbG9hdDogLyg/OjB8WystXT9bMC05XSspKD86XFwuWzAtOV0rKT8oPzplWy0rXVsxLTldWzAtOV0qKT8vLFxuICAgIG51bWJlck9jdGFsOiAvMG9bMC03XSsvLFxuICAgIG51bWJlckhleDogLzB4WzAtOWEtZkEtRl0rLyxcbiAgICBudW1iZXJJbmZpbml0eTogL1srLV0/XFwuKD86aW5mfEluZnxJTkYpLyxcbiAgICBudW1iZXJOYU46IC9cXC4oPzpuYW58TmFufE5BTikvLFxuICAgIG51bWJlckRhdGU6IC9cXGR7NH0tXFxkXFxkLVxcZFxcZChbVHQgXVxcZFxcZDpcXGRcXGQ6XFxkXFxkKFxcLlxcZCspPygoID9bKy1dXFxkXFxkPyg6XFxkXFxkKT8pfFopPyk/LyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OltidG5mclxcXFxcIiddfFswLTddWzAtN10/fFswLTNdWzAtN117Mn0pLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tbWVudCcgfSxcbiAgICAgICAgICAgIC8vIERpcmVjdGl2ZVxuICAgICAgICAgICAgWy8lW14gXSsuKiQvLCAnbWV0YS5kaXJlY3RpdmUnXSxcbiAgICAgICAgICAgIC8vIERvY3VtZW50IE1hcmtlcnNcbiAgICAgICAgICAgIFsvLS0tLywgJ29wZXJhdG9ycy5kaXJlY3RpdmVzRW5kJ10sXG4gICAgICAgICAgICBbL1xcLnszfS8sICdvcGVyYXRvcnMuZG9jdW1lbnRFbmQnXSxcbiAgICAgICAgICAgIC8vIEJsb2NrIFN0cnVjdHVyZSBJbmRpY2F0b3JzXG4gICAgICAgICAgICBbL1stPzpdKD89ICkvLCAnb3BlcmF0b3JzJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYW5jaG9yJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHRhZ0hhbmRsZScgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93Q29sbGVjdGlvbnMnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYmxvY2tTdHlsZScgfSxcbiAgICAgICAgICAgIC8vIE51bWJlcnNcbiAgICAgICAgICAgIFsvQG51bWJlckludGVnZXIoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJGbG9hdCg/IVsgXFx0XSpcXFMrKS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvQG51bWJlck9jdGFsKD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5vY3RhbCddLFxuICAgICAgICAgICAgWy9AbnVtYmVySGV4KD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvQG51bWJlckluZmluaXR5KD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5pbmZpbml0eSddLFxuICAgICAgICAgICAgWy9AbnVtYmVyTmFOKD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5uYW4nXSxcbiAgICAgICAgICAgIFsvQG51bWJlckRhdGUoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLmRhdGUnXSxcbiAgICAgICAgICAgIC8vIEtleTpWYWx1ZSBwYWlyXG4gICAgICAgICAgICBbLyhcIi4qP1wifCcuKj8nfC4qPykoWyBcXHRdKikoOikoIHwkKS8sIFsndHlwZScsICd3aGl0ZScsICdvcGVyYXRvcnMnLCAnd2hpdGUnXV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd1NjYWxhcnMnIH0sXG4gICAgICAgICAgICAvLyBTdHJpbmcgbm9kZXNcbiAgICAgICAgICAgIFsvLiskLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBGbG93IENvbGxlY3Rpb246IEZsb3cgTWFwcGluZ1xuICAgICAgICBvYmplY3Q6IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnQnIH0sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgdGVybWluYXRpb25cbiAgICAgICAgICAgIFsvXFx9LywgJ0BicmFja2V0cycsICdAcG9wJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgZGVsaW1pdGVyXG4gICAgICAgICAgICBbLywvLCAnZGVsaW1pdGVyLmNvbW1hJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgS2V5OlZhbHVlIGRlbGltaXRlclxuICAgICAgICAgICAgWy86KD89ICkvLCAnb3BlcmF0b3JzJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgS2V5OlZhbHVlIGtleVxuICAgICAgICAgICAgWy8oPzpcIi4qP1wifCcuKj8nfFteLFxce1xcW10rPykoPz06ICkvLCAndHlwZSddLFxuICAgICAgICAgICAgLy8gU3RhcnQgRmxvdyBTdHlsZVxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dDb2xsZWN0aW9ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93U2NhbGFycycgfSxcbiAgICAgICAgICAgIC8vIFNjYWxhciBEYXRhIHR5cGVzXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGFnSGFuZGxlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGFuY2hvcicgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93TnVtYmVyJyB9LFxuICAgICAgICAgICAgLy8gT3RoZXIgdmFsdWUgKGtleXdvcmQgb3Igc3RyaW5nKVxuICAgICAgICAgICAgWy9bXlxcfSxdKy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gRmxvdyBDb2xsZWN0aW9uOiBGbG93IFNlcXVlbmNlXG4gICAgICAgIGFycmF5OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0Bjb21tZW50JyB9LFxuICAgICAgICAgICAgLy8gRmxvdyBTZXF1ZW5jZSB0ZXJtaW5hdGlvblxuICAgICAgICAgICAgWy9cXF0vLCAnQGJyYWNrZXRzJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIC8vIEZsb3cgU2VxdWVuY2UgZGVsaW1pdGVyXG4gICAgICAgICAgICBbLywvLCAnZGVsaW1pdGVyLmNvbW1hJ10sXG4gICAgICAgICAgICAvLyBTdGFydCBGbG93IFN0eWxlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd0NvbGxlY3Rpb25zJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dTY2FsYXJzJyB9LFxuICAgICAgICAgICAgLy8gU2NhbGFyIERhdGEgdHlwZXNcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0YWdIYW5kbGUnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYW5jaG9yJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dOdW1iZXInIH0sXG4gICAgICAgICAgICAvLyBPdGhlciB2YWx1ZSAoa2V5d29yZCBvciBzdHJpbmcpXG4gICAgICAgICAgICBbL1teXFxdLF0rLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBGbG93IFNjYWxhcnMgKHF1b3RlZCBzdHJpbmdzKVxuICAgICAgICBzdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCInXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1tcIiddLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzInOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gRmlyc3QgbGluZSBvZiBhIEJsb2NrIFN0eWxlXG4gICAgICAgIG11bHRpU3RyaW5nOiBbXG4gICAgICAgICAgICBbL14oICspLiskLywgJ3N0cmluZycsICdAbXVsdGlTdHJpbmdDb250aW51ZWQuJDEnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBGdXJ0aGVyIGxpbmVzIG9mIGEgQmxvY2sgU3R5bGVcbiAgICAgICAgLy8gICBXb3JrYXJvdW5kIGZvciBpbmRlbnRhdGlvbiBkZXRlY3Rpb25cbiAgICAgICAgbXVsdGlTdHJpbmdDb250aW51ZWQ6IFtcbiAgICAgICAgICAgIFsvXiggKikuKyQvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDE9PSRTMic6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3BhbGwnIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICd3aGl0ZSddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIE9ubHkgbGluZSBjb21tZW50c1xuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbLyMuKiQvLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFN0YXJ0IEZsb3cgQ29sbGVjdGlvbnNcbiAgICAgICAgZmxvd0NvbGxlY3Rpb25zOiBbXG4gICAgICAgICAgICBbL1xcWy8sICdAYnJhY2tldHMnLCAnQGFycmF5J10sXG4gICAgICAgICAgICBbL1xcey8sICdAYnJhY2tldHMnLCAnQG9iamVjdCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFN0YXJ0IEZsb3cgU2NhbGFycyAocXVvdGVkIHN0cmluZ3MpXG4gICAgICAgIGZsb3dTY2FsYXJzOiBbXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAc3RyaW5nLlwiJ10sXG4gICAgICAgICAgICBbLycvLCAnc3RyaW5nJywgJ0BzdHJpbmcuXFwnJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gU3RhcnQgQmxvY2sgU2NhbGFyXG4gICAgICAgIGJsb2NrU3R5bGU6IFtcbiAgICAgICAgICAgIFsvWz58XVswLTldKlsrLV0/JC8sICdvcGVyYXRvcnMnLCAnQG11bHRpU3RyaW5nJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gTnVtYmVycyBpbiBGbG93IENvbGxlY3Rpb25zICh0ZXJtaW5hdGUgd2l0aCAsXX0pXG4gICAgICAgIGZsb3dOdW1iZXI6IFtcbiAgICAgICAgICAgIFsvQG51bWJlckludGVnZXIoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXInXSxcbiAgICAgICAgICAgIFsvQG51bWJlckZsb2F0KD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLmZsb2F0J10sXG4gICAgICAgICAgICBbL0BudW1iZXJPY3RhbCg/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5vY3RhbCddLFxuICAgICAgICAgICAgWy9AbnVtYmVySGV4KD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy9AbnVtYmVySW5maW5pdHkoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIuaW5maW5pdHknXSxcbiAgICAgICAgICAgIFsvQG51bWJlck5hTig/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5uYW4nXSxcbiAgICAgICAgICAgIFsvQG51bWJlckRhdGUoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIuZGF0ZSddXG4gICAgICAgIF0sXG4gICAgICAgIHRhZ0hhbmRsZTogW1xuICAgICAgICAgICAgWy9cXCFbXiBdKi8sICd0YWcnXVxuICAgICAgICBdLFxuICAgICAgICBhbmNob3I6IFtcbiAgICAgICAgICAgIFsvWyYqXVteIF0rLywgJ25hbWVzcGFjZSddXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3lhbWwveWFtbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3lhbWwveWFtbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDYiXSwic291cmNlUm9vdCI6IiJ9