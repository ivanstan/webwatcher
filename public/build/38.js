webpackJsonp([38],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js ***!
  \****************************************************************************/
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
        lineComment: '//',
        blockComment: ['(*', '*)'],
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
        { open: '"', close: '"' }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' }
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*//\\s*#region\\b|^\\s*\\(\\*\\s*#region(.*)\\*\\)"),
            end: new RegExp("^\\s*//\\s*#endregion\\b|^\\s*\\(\\*\\s*#endregion\\s*\\*\\)")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.fs',
    keywords: [
        'abstract', 'and', 'atomic', 'as',
        'assert', 'asr', 'base', 'begin',
        'break', 'checked', 'component',
        'const', 'constraint', 'constructor',
        'continue', 'class', 'default',
        'delegate', 'do', 'done', 'downcast',
        'downto', 'elif', 'else', 'end',
        'exception', 'eager', 'event', 'external',
        'extern', 'false', 'finally', 'for',
        'fun', 'function', 'fixed', 'functor',
        'global', 'if', 'in', 'include', 'inherit',
        'inline', 'interface', 'internal', 'land',
        'lor', 'lsl', 'lsr', 'lxor', 'lazy', 'let',
        'match', 'member', 'mod', 'module', 'mutable',
        'namespace', 'method', 'mixin', 'new', 'not',
        'null', 'of', 'open', 'or', 'object',
        'override', 'private', 'parallel', 'process',
        'protected', 'pure', 'public', 'rec', 'return',
        'static', 'sealed', 'struct', 'sig', 'then',
        'to', 'true', 'tailcall', 'trait',
        'try', 'type', 'upcast', 'use',
        'val', 'void', 'virtual', 'volatile',
        'when', 'while', 'with', 'yield'
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\^%;\.,\/]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /[uU]?[yslnLI]?/,
    floatsuffix: /[fFmM]?/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
            // whitespace
            { include: '@whitespace' },
            // [< attributes >].
            [/\[<.*>\]/, 'annotation'],
            // Preprocessor directive
            [/^#(if|else|endif)/, 'keyword'],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, 'delimiter'],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/0x[0-9a-fA-F]+LF/, 'number.float'],
            [/0x[0-9a-fA-F]+(@integersuffix)/, 'number.hex'],
            [/0b[0-1]+(@integersuffix)/, 'number.bin'],
            [/\d+(@integersuffix)/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"""/, 'string', '@string."""'],
            [/"/, 'string', '@string."'],
            // literal string
            [/\@"/, { token: 'string.quote', next: '@litstring' }],
            // characters
            [/'[^\\']'B?/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\(\*(?!\))/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\*]+/, 'comment'],
            [/\*\)/, 'comment', '@pop'],
            [/\*/, 'comment']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/("""|"B?)/, {
                    cases: {
                        '$#==$S2': { token: 'string', next: '@pop' },
                        '@default': 'string'
                    }
                }]
        ],
        litstring: [
            [/[^"]+/, 'string'],
            [/""/, 'string.escape'],
            [/"/, { token: 'string.quote', next: '@pop' }]
        ],
    },
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLDhDQUE4QyxJQUFJLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0Q0FBNEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdDQUFnQztBQUNwRTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNDQUFzQztBQUN6RDtBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiIzOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnKConLCAnKiknXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9XG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH1cbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqLy9cXFxccyojcmVnaW9uXFxcXGJ8XlxcXFxzKlxcXFwoXFxcXCpcXFxccyojcmVnaW9uKC4qKVxcXFwqXFxcXClcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqLy9cXFxccyojZW5kcmVnaW9uXFxcXGJ8XlxcXFxzKlxcXFwoXFxcXCpcXFxccyojZW5kcmVnaW9uXFxcXHMqXFxcXCpcXFxcKVwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuZnMnLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdhYnN0cmFjdCcsICdhbmQnLCAnYXRvbWljJywgJ2FzJyxcbiAgICAgICAgJ2Fzc2VydCcsICdhc3InLCAnYmFzZScsICdiZWdpbicsXG4gICAgICAgICdicmVhaycsICdjaGVja2VkJywgJ2NvbXBvbmVudCcsXG4gICAgICAgICdjb25zdCcsICdjb25zdHJhaW50JywgJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgJ2NvbnRpbnVlJywgJ2NsYXNzJywgJ2RlZmF1bHQnLFxuICAgICAgICAnZGVsZWdhdGUnLCAnZG8nLCAnZG9uZScsICdkb3duY2FzdCcsXG4gICAgICAgICdkb3dudG8nLCAnZWxpZicsICdlbHNlJywgJ2VuZCcsXG4gICAgICAgICdleGNlcHRpb24nLCAnZWFnZXInLCAnZXZlbnQnLCAnZXh0ZXJuYWwnLFxuICAgICAgICAnZXh0ZXJuJywgJ2ZhbHNlJywgJ2ZpbmFsbHknLCAnZm9yJyxcbiAgICAgICAgJ2Z1bicsICdmdW5jdGlvbicsICdmaXhlZCcsICdmdW5jdG9yJyxcbiAgICAgICAgJ2dsb2JhbCcsICdpZicsICdpbicsICdpbmNsdWRlJywgJ2luaGVyaXQnLFxuICAgICAgICAnaW5saW5lJywgJ2ludGVyZmFjZScsICdpbnRlcm5hbCcsICdsYW5kJyxcbiAgICAgICAgJ2xvcicsICdsc2wnLCAnbHNyJywgJ2x4b3InLCAnbGF6eScsICdsZXQnLFxuICAgICAgICAnbWF0Y2gnLCAnbWVtYmVyJywgJ21vZCcsICdtb2R1bGUnLCAnbXV0YWJsZScsXG4gICAgICAgICduYW1lc3BhY2UnLCAnbWV0aG9kJywgJ21peGluJywgJ25ldycsICdub3QnLFxuICAgICAgICAnbnVsbCcsICdvZicsICdvcGVuJywgJ29yJywgJ29iamVjdCcsXG4gICAgICAgICdvdmVycmlkZScsICdwcml2YXRlJywgJ3BhcmFsbGVsJywgJ3Byb2Nlc3MnLFxuICAgICAgICAncHJvdGVjdGVkJywgJ3B1cmUnLCAncHVibGljJywgJ3JlYycsICdyZXR1cm4nLFxuICAgICAgICAnc3RhdGljJywgJ3NlYWxlZCcsICdzdHJ1Y3QnLCAnc2lnJywgJ3RoZW4nLFxuICAgICAgICAndG8nLCAndHJ1ZScsICd0YWlsY2FsbCcsICd0cmFpdCcsXG4gICAgICAgICd0cnknLCAndHlwZScsICd1cGNhc3QnLCAndXNlJyxcbiAgICAgICAgJ3ZhbCcsICd2b2lkJywgJ3ZpcnR1YWwnLCAndm9sYXRpbGUnLFxuICAgICAgICAnd2hlbicsICd3aGlsZScsICd3aXRoJywgJ3lpZWxkJ1xuICAgIF0sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXF4lO1xcLixcXC9dKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICBpbnRlZ2Vyc3VmZml4OiAvW3VVXT9beXNsbkxJXT8vLFxuICAgIGZsb2F0c3VmZml4OiAvW2ZGbU1dPy8sXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIC8vIGlkZW50aWZpZXJzIGFuZCBrZXl3b3Jkc1xuICAgICAgICAgICAgWy9bYS16QS1aX11cXHcqLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6IHsgdG9rZW46ICdrZXl3b3JkLiQwJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIHdoaXRlc3BhY2VcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgLy8gWzwgYXR0cmlidXRlcyA+XS5cbiAgICAgICAgICAgIFsvXFxbPC4qPlxcXS8sICdhbm5vdGF0aW9uJ10sXG4gICAgICAgICAgICAvLyBQcmVwcm9jZXNzb3IgZGlyZWN0aXZlXG4gICAgICAgICAgICBbL14jKGlmfGVsc2V8ZW5kaWYpLywgJ2tleXdvcmQnXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnMgYW5kIG9wZXJhdG9yc1xuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8weFswLTlhLWZBLUZdK0xGLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8weFswLTlhLWZBLUZdKyhAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8wYlswLTFdKyhAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLmJpbiddLFxuICAgICAgICAgICAgWy9cXGQrKEBpbnRlZ2Vyc3VmZml4KS8sICdudW1iZXInXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcjogYWZ0ZXIgbnVtYmVyIGJlY2F1c2Ugb2YgLlxcZCBmbG9hdHNcbiAgICAgICAgICAgIFsvWzssLl0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICAvLyBzdHJpbmdzXG4gICAgICAgICAgICBbL1wiKFteXCJcXFxcXXxcXFxcLikqJC8sICdzdHJpbmcuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIlwiXCIvLCAnc3RyaW5nJywgJ0BzdHJpbmcuXCJcIlwiJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAc3RyaW5nLlwiJ10sXG4gICAgICAgICAgICAvLyBsaXRlcmFsIHN0cmluZ1xuICAgICAgICAgICAgWy9cXEBcIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBuZXh0OiAnQGxpdHN0cmluZycgfV0sXG4gICAgICAgICAgICAvLyBjaGFyYWN0ZXJzXG4gICAgICAgICAgICBbLydbXlxcXFwnXSdCPy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ11cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy9cXChcXCooPyFcXCkpLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwvXFwvLiokLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy9bXlxcKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwqXFwpLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9cXCovLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy8oXCJcIlwifFwiQj8pLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzInOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgXSxcbiAgICAgICAgbGl0c3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXCJdKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvXCJcIi8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1wiLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgIH0sXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9mc2hhcnAvZnNoYXJwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMzgiXSwic291cmNlUm9vdCI6IiJ9