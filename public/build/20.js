webpackJsonp([20],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js":
/*!******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js ***!
  \******************************************************************/
/*! exports provided: conf, language */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.r',
    roxygen: [
        '@param',
        '@return',
        '@name',
        '@rdname',
        '@examples',
        '@include',
        '@docType',
        '@S3method',
        '@TODO',
        '@aliases',
        '@alias',
        '@assignee',
        '@author',
        '@callGraphDepth',
        '@callGraph',
        '@callGraphPrimitives',
        '@concept',
        '@exportClass',
        '@exportMethod',
        '@exportPattern',
        '@export',
        '@formals',
        '@format',
        '@importClassesFrom',
        '@importFrom',
        '@importMethodsFrom',
        '@import',
        '@keywords',
        '@method',
        '@nord',
        '@note',
        '@references',
        '@seealso',
        '@setClass',
        '@slot',
        '@source',
        '@title',
        '@usage'
    ],
    constants: [
        'NULL',
        'FALSE',
        'TRUE',
        'NA',
        'Inf',
        'NaN ',
        'NA_integer_',
        'NA_real_',
        'NA_complex_',
        'NA_character_ ',
        'T',
        'F',
        'LETTERS',
        'letters',
        'month.abb',
        'month.name',
        'pi',
        'R.version.string'
    ],
    keywords: [
        'break',
        'next',
        'return',
        'if',
        'else',
        'for',
        'in',
        'repeat',
        'while',
        'array',
        'category',
        'character',
        'complex',
        'double',
        'function',
        'integer',
        'list',
        'logical',
        'matrix',
        'numeric',
        'vector',
        'data.frame',
        'factor',
        'library',
        'require',
        'attach',
        'detach',
        'source'
    ],
    special: [
        '\\n',
        '\\r',
        '\\t',
        '\\b',
        '\\a',
        '\\f',
        '\\v',
        '\\\'',
        '\\"',
        '\\\\'
    ],
    brackets: [
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.bracket' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    tokenizer: {
        root: [
            { include: '@numbers' },
            { include: '@strings' },
            [/[{}\[\]()]/, '@brackets'],
            { include: '@operators' },
            [/#'/, 'comment.doc', '@roxygen'],
            [/(^#.*$)/, 'comment'],
            [/\s+/, 'white'],
            [/[,:;]/, 'delimiter'],
            [/@[a-zA-Z]\w*/, 'tag'],
            [/[a-zA-Z]\w*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@constants': 'constant',
                        '@default': 'identifier'
                    }
                }]
        ],
        // Recognize Roxygen comments
        roxygen: [
            [/@\w+/, {
                    cases: {
                        '@roxygen': 'tag',
                        '@eos': { token: 'comment.doc', next: '@pop' },
                        '@default': 'comment.doc'
                    }
                }],
            [/\s+/, {
                    cases: {
                        '@eos': { token: 'comment.doc', next: '@pop' },
                        '@default': 'comment.doc'
                    }
                }],
            [/.*/, { token: 'comment.doc', next: '@pop' }]
        ],
        // Recognize positives, negatives, decimals, imaginaries, and scientific notation
        numbers: [
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+\-]?\d+)?/, 'number']
        ],
        // Recognize operators
        operators: [
            [/<{1,2}-/, 'operator'],
            [/->{1,2}/, 'operator'],
            [/%[^%\s]+%/, 'operator'],
            [/\*\*/, 'operator'],
            [/%%/, 'operator'],
            [/&&/, 'operator'],
            [/\|\|/, 'operator'],
            [/<</, 'operator'],
            [/>>/, 'operator'],
            [/[-+=&|!<>^~*/:$]/, 'operator']
        ],
        // Recognize strings, including those broken across lines
        strings: [
            [/'/, 'string.escape', '@stringBody'],
            [/"/, 'string.escape', '@dblStringBody']
        ],
        stringBody: [
            [/\\./, {
                    cases: {
                        '@special': 'string',
                        '@default': 'error-token'
                    }
                }],
            [/'/, 'string.escape', '@popall'],
            [/./, 'string'],
        ],
        dblStringBody: [
            [/\\./, {
                    cases: {
                        '@special': 'string',
                        '@default': 'error-token'
                    }
                }],
            [/"/, 'string.escape', '@popall'],
            [/./, 'string'],
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Ivci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSw2QkFBNkI7QUFDM0QsU0FBUyxvREFBb0Q7QUFDN0QsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsc0JBQXNCO0FBQ25DLGlCQUFpQjtBQUNqQixhQUFhLHdCQUF3QjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFDQUFxQztBQUN0RTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQ0FBaUMscUNBQXFDO0FBQ3RFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsb0JBQW9CLHFDQUFxQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLElBQUk7QUFDcEIsaUJBQWlCLElBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIyMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnIydcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgXVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcucicsXG4gICAgcm94eWdlbjogW1xuICAgICAgICAnQHBhcmFtJyxcbiAgICAgICAgJ0ByZXR1cm4nLFxuICAgICAgICAnQG5hbWUnLFxuICAgICAgICAnQHJkbmFtZScsXG4gICAgICAgICdAZXhhbXBsZXMnLFxuICAgICAgICAnQGluY2x1ZGUnLFxuICAgICAgICAnQGRvY1R5cGUnLFxuICAgICAgICAnQFMzbWV0aG9kJyxcbiAgICAgICAgJ0BUT0RPJyxcbiAgICAgICAgJ0BhbGlhc2VzJyxcbiAgICAgICAgJ0BhbGlhcycsXG4gICAgICAgICdAYXNzaWduZWUnLFxuICAgICAgICAnQGF1dGhvcicsXG4gICAgICAgICdAY2FsbEdyYXBoRGVwdGgnLFxuICAgICAgICAnQGNhbGxHcmFwaCcsXG4gICAgICAgICdAY2FsbEdyYXBoUHJpbWl0aXZlcycsXG4gICAgICAgICdAY29uY2VwdCcsXG4gICAgICAgICdAZXhwb3J0Q2xhc3MnLFxuICAgICAgICAnQGV4cG9ydE1ldGhvZCcsXG4gICAgICAgICdAZXhwb3J0UGF0dGVybicsXG4gICAgICAgICdAZXhwb3J0JyxcbiAgICAgICAgJ0Bmb3JtYWxzJyxcbiAgICAgICAgJ0Bmb3JtYXQnLFxuICAgICAgICAnQGltcG9ydENsYXNzZXNGcm9tJyxcbiAgICAgICAgJ0BpbXBvcnRGcm9tJyxcbiAgICAgICAgJ0BpbXBvcnRNZXRob2RzRnJvbScsXG4gICAgICAgICdAaW1wb3J0JyxcbiAgICAgICAgJ0BrZXl3b3JkcycsXG4gICAgICAgICdAbWV0aG9kJyxcbiAgICAgICAgJ0Bub3JkJyxcbiAgICAgICAgJ0Bub3RlJyxcbiAgICAgICAgJ0ByZWZlcmVuY2VzJyxcbiAgICAgICAgJ0BzZWVhbHNvJyxcbiAgICAgICAgJ0BzZXRDbGFzcycsXG4gICAgICAgICdAc2xvdCcsXG4gICAgICAgICdAc291cmNlJyxcbiAgICAgICAgJ0B0aXRsZScsXG4gICAgICAgICdAdXNhZ2UnXG4gICAgXSxcbiAgICBjb25zdGFudHM6IFtcbiAgICAgICAgJ05VTEwnLFxuICAgICAgICAnRkFMU0UnLFxuICAgICAgICAnVFJVRScsXG4gICAgICAgICdOQScsXG4gICAgICAgICdJbmYnLFxuICAgICAgICAnTmFOICcsXG4gICAgICAgICdOQV9pbnRlZ2VyXycsXG4gICAgICAgICdOQV9yZWFsXycsXG4gICAgICAgICdOQV9jb21wbGV4XycsXG4gICAgICAgICdOQV9jaGFyYWN0ZXJfICcsXG4gICAgICAgICdUJyxcbiAgICAgICAgJ0YnLFxuICAgICAgICAnTEVUVEVSUycsXG4gICAgICAgICdsZXR0ZXJzJyxcbiAgICAgICAgJ21vbnRoLmFiYicsXG4gICAgICAgICdtb250aC5uYW1lJyxcbiAgICAgICAgJ3BpJyxcbiAgICAgICAgJ1IudmVyc2lvbi5zdHJpbmcnXG4gICAgXSxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnYnJlYWsnLFxuICAgICAgICAnbmV4dCcsXG4gICAgICAgICdyZXR1cm4nLFxuICAgICAgICAnaWYnLFxuICAgICAgICAnZWxzZScsXG4gICAgICAgICdmb3InLFxuICAgICAgICAnaW4nLFxuICAgICAgICAncmVwZWF0JyxcbiAgICAgICAgJ3doaWxlJyxcbiAgICAgICAgJ2FycmF5JyxcbiAgICAgICAgJ2NhdGVnb3J5JyxcbiAgICAgICAgJ2NoYXJhY3RlcicsXG4gICAgICAgICdjb21wbGV4JyxcbiAgICAgICAgJ2RvdWJsZScsXG4gICAgICAgICdmdW5jdGlvbicsXG4gICAgICAgICdpbnRlZ2VyJyxcbiAgICAgICAgJ2xpc3QnLFxuICAgICAgICAnbG9naWNhbCcsXG4gICAgICAgICdtYXRyaXgnLFxuICAgICAgICAnbnVtZXJpYycsXG4gICAgICAgICd2ZWN0b3InLFxuICAgICAgICAnZGF0YS5mcmFtZScsXG4gICAgICAgICdmYWN0b3InLFxuICAgICAgICAnbGlicmFyeScsXG4gICAgICAgICdyZXF1aXJlJyxcbiAgICAgICAgJ2F0dGFjaCcsXG4gICAgICAgICdkZXRhY2gnLFxuICAgICAgICAnc291cmNlJ1xuICAgIF0sXG4gICAgc3BlY2lhbDogW1xuICAgICAgICAnXFxcXG4nLFxuICAgICAgICAnXFxcXHInLFxuICAgICAgICAnXFxcXHQnLFxuICAgICAgICAnXFxcXGInLFxuICAgICAgICAnXFxcXGEnLFxuICAgICAgICAnXFxcXGYnLFxuICAgICAgICAnXFxcXHYnLFxuICAgICAgICAnXFxcXFxcJycsXG4gICAgICAgICdcXFxcXCInLFxuICAgICAgICAnXFxcXFxcXFwnXG4gICAgXSxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JywgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0JyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH1cbiAgICBdLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAbnVtYmVycycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzdHJpbmdzJyB9LFxuICAgICAgICAgICAgWy9be31cXFtcXF0oKV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAb3BlcmF0b3JzJyB9LFxuICAgICAgICAgICAgWy8jJy8sICdjb21tZW50LmRvYycsICdAcm94eWdlbiddLFxuICAgICAgICAgICAgWy8oXiMuKiQpLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFxzKy8sICd3aGl0ZSddLFxuICAgICAgICAgICAgWy9bLDo7XS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvQFthLXpBLVpdXFx3Ki8sICd0YWcnXSxcbiAgICAgICAgICAgIFsvW2EtekEtWl1cXHcqLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAY29uc3RhbnRzJzogJ2NvbnN0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVjb2duaXplIFJveHlnZW4gY29tbWVudHNcbiAgICAgICAgcm94eWdlbjogW1xuICAgICAgICAgICAgWy9AXFx3Ky8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcm94eWdlbic6ICd0YWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnY29tbWVudC5kb2MnLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdjb21tZW50LmRvYydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9cXHMrLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnY29tbWVudC5kb2MnLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdjb21tZW50LmRvYydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy8uKi8sIHsgdG9rZW46ICdjb21tZW50LmRvYycsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBSZWNvZ25pemUgcG9zaXRpdmVzLCBuZWdhdGl2ZXMsIGRlY2ltYWxzLCBpbWFnaW5hcmllcywgYW5kIHNjaWVudGlmaWMgbm90YXRpb25cbiAgICAgICAgbnVtYmVyczogW1xuICAgICAgICAgICAgWy8wW3hYXVswLTlhLWZBLUZdKy8sICdudW1iZXIuaGV4J10sXG4gICAgICAgICAgICBbLy0/KFxcZCpcXC4pP1xcZCsoW2VFXVsrXFwtXT9cXGQrKT8vLCAnbnVtYmVyJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVjb2duaXplIG9wZXJhdG9yc1xuICAgICAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgICAgIFsvPHsxLDJ9LS8sICdvcGVyYXRvciddLFxuICAgICAgICAgICAgWy8tPnsxLDJ9LywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbLyVbXiVcXHNdKyUvLCAnb3BlcmF0b3InXSxcbiAgICAgICAgICAgIFsvXFwqXFwqLywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbLyUlLywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbLyYmLywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbL1xcfFxcfC8sICdvcGVyYXRvciddLFxuICAgICAgICAgICAgWy88PC8sICdvcGVyYXRvciddLFxuICAgICAgICAgICAgWy8+Pi8sICdvcGVyYXRvciddLFxuICAgICAgICAgICAgWy9bLSs9JnwhPD5efiovOiRdLywgJ29wZXJhdG9yJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVjb2duaXplIHN0cmluZ3MsIGluY2x1ZGluZyB0aG9zZSBicm9rZW4gYWNyb3NzIGxpbmVzXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuZXNjYXBlJywgJ0BzdHJpbmdCb2R5J10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZy5lc2NhcGUnLCAnQGRibFN0cmluZ0JvZHknXVxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmdCb2R5OiBbXG4gICAgICAgICAgICBbL1xcXFwuLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BzcGVjaWFsJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnZXJyb3ItdG9rZW4nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuZXNjYXBlJywgJ0Bwb3BhbGwnXSxcbiAgICAgICAgICAgIFsvLi8sICdzdHJpbmcnXSxcbiAgICAgICAgXSxcbiAgICAgICAgZGJsU3RyaW5nQm9keTogW1xuICAgICAgICAgICAgWy9cXFxcLi8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAc3BlY2lhbCc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2Vycm9yLXRva2VuJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZy5lc2NhcGUnLCAnQHBvcGFsbCddLFxuICAgICAgICAgICAgWy8uLywgJ3N0cmluZyddLFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9yL3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9yL3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyMCJdLCJzb3VyY2VSb290IjoiIn0=