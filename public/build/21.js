webpackJsonp([21],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/python/python.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/python/python.js ***!
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
        lineComment: '#',
        blockComment: ['\'\'\'', '\'\'\''],
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
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    folding: {
        offSide: true,
        markers: {
            start: new RegExp("^\\s*#region\\b"),
            end: new RegExp("^\\s*#endregion\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.python',
    keywords: [
        'and',
        'as',
        'assert',
        'break',
        'class',
        'continue',
        'def',
        'del',
        'elif',
        'else',
        'except',
        'exec',
        'finally',
        'for',
        'from',
        'global',
        'if',
        'import',
        'in',
        'is',
        'lambda',
        'None',
        'not',
        'or',
        'pass',
        'print',
        'raise',
        'return',
        'self',
        'try',
        'while',
        'with',
        'yield',
        'int',
        'float',
        'long',
        'complex',
        'hex',
        'abs',
        'all',
        'any',
        'apply',
        'basestring',
        'bin',
        'bool',
        'buffer',
        'bytearray',
        'callable',
        'chr',
        'classmethod',
        'cmp',
        'coerce',
        'compile',
        'complex',
        'delattr',
        'dict',
        'dir',
        'divmod',
        'enumerate',
        'eval',
        'execfile',
        'file',
        'filter',
        'format',
        'frozenset',
        'getattr',
        'globals',
        'hasattr',
        'hash',
        'help',
        'id',
        'input',
        'intern',
        'isinstance',
        'issubclass',
        'iter',
        'len',
        'locals',
        'list',
        'map',
        'max',
        'memoryview',
        'min',
        'next',
        'object',
        'oct',
        'open',
        'ord',
        'pow',
        'print',
        'property',
        'reversed',
        'range',
        'raw_input',
        'reduce',
        'reload',
        'repr',
        'reversed',
        'round',
        'set',
        'setattr',
        'slice',
        'sorted',
        'staticmethod',
        'str',
        'sum',
        'super',
        'tuple',
        'type',
        'unichr',
        'unicode',
        'vars',
        'xrange',
        'zip',
        'True',
        'False',
        '__dict__',
        '__methods__',
        '__members__',
        '__class__',
        '__bases__',
        '__name__',
        '__mro__',
        '__subclasses__',
        '__init__',
        '__import__'
    ],
    brackets: [
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.bracket' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    tokenizer: {
        root: [
            { include: '@whitespace' },
            { include: '@numbers' },
            { include: '@strings' },
            [/[,:;]/, 'delimiter'],
            [/[{}\[\]()]/, '@brackets'],
            [/@[a-zA-Z]\w*/, 'tag'],
            [/[a-zA-Z]\w*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }]
        ],
        // Deal with white space, including single and multi-line comments
        whitespace: [
            [/\s+/, 'white'],
            [/(^#.*$)/, 'comment'],
            [/('''.*''')|(""".*""")/, 'string'],
            [/'''.*$/, 'string', '@endDocString'],
            [/""".*$/, 'string', '@endDblDocString']
        ],
        endDocString: [
            [/\\'/, 'string'],
            [/.*'''/, 'string', '@popall'],
            [/.*$/, 'string']
        ],
        endDblDocString: [
            [/\\"/, 'string'],
            [/.*"""/, 'string', '@popall'],
            [/.*$/, 'string']
        ],
        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']
        ],
        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [
            [/'$/, 'string.escape', '@popall'],
            [/'/, 'string.escape', '@stringBody'],
            [/"$/, 'string.escape', '@popall'],
            [/"/, 'string.escape', '@dblStringBody']
        ],
        stringBody: [
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/.(?=.*')/, 'string'],
            [/.*\\$/, 'string'],
            [/.*$/, 'string', '@popall']
        ],
        dblStringBody: [
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/.(?=.*")/, 'string'],
            [/.*\\$/, 'string'],
            [/.*$/, 'string', '@popall']
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3B5dGhvbi9weXRob24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDJDQUEyQztBQUNwRCxTQUFTLHdEQUF3RDtBQUNqRTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSw2QkFBNkI7QUFDM0QsU0FBUyxvREFBb0Q7QUFDN0QsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsc0JBQXNCO0FBQ25DLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJyMnLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnXFwnXFwnXFwnJywgJ1xcJ1xcJ1xcJyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgb2ZmU2lkZTogdHJ1ZSxcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3JlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNlbmRyZWdpb25cXFxcYlwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcucHl0aG9uJyxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnYW5kJyxcbiAgICAgICAgJ2FzJyxcbiAgICAgICAgJ2Fzc2VydCcsXG4gICAgICAgICdicmVhaycsXG4gICAgICAgICdjbGFzcycsXG4gICAgICAgICdjb250aW51ZScsXG4gICAgICAgICdkZWYnLFxuICAgICAgICAnZGVsJyxcbiAgICAgICAgJ2VsaWYnLFxuICAgICAgICAnZWxzZScsXG4gICAgICAgICdleGNlcHQnLFxuICAgICAgICAnZXhlYycsXG4gICAgICAgICdmaW5hbGx5JyxcbiAgICAgICAgJ2ZvcicsXG4gICAgICAgICdmcm9tJyxcbiAgICAgICAgJ2dsb2JhbCcsXG4gICAgICAgICdpZicsXG4gICAgICAgICdpbXBvcnQnLFxuICAgICAgICAnaW4nLFxuICAgICAgICAnaXMnLFxuICAgICAgICAnbGFtYmRhJyxcbiAgICAgICAgJ05vbmUnLFxuICAgICAgICAnbm90JyxcbiAgICAgICAgJ29yJyxcbiAgICAgICAgJ3Bhc3MnLFxuICAgICAgICAncHJpbnQnLFxuICAgICAgICAncmFpc2UnLFxuICAgICAgICAncmV0dXJuJyxcbiAgICAgICAgJ3NlbGYnLFxuICAgICAgICAndHJ5JyxcbiAgICAgICAgJ3doaWxlJyxcbiAgICAgICAgJ3dpdGgnLFxuICAgICAgICAneWllbGQnLFxuICAgICAgICAnaW50JyxcbiAgICAgICAgJ2Zsb2F0JyxcbiAgICAgICAgJ2xvbmcnLFxuICAgICAgICAnY29tcGxleCcsXG4gICAgICAgICdoZXgnLFxuICAgICAgICAnYWJzJyxcbiAgICAgICAgJ2FsbCcsXG4gICAgICAgICdhbnknLFxuICAgICAgICAnYXBwbHknLFxuICAgICAgICAnYmFzZXN0cmluZycsXG4gICAgICAgICdiaW4nLFxuICAgICAgICAnYm9vbCcsXG4gICAgICAgICdidWZmZXInLFxuICAgICAgICAnYnl0ZWFycmF5JyxcbiAgICAgICAgJ2NhbGxhYmxlJyxcbiAgICAgICAgJ2NocicsXG4gICAgICAgICdjbGFzc21ldGhvZCcsXG4gICAgICAgICdjbXAnLFxuICAgICAgICAnY29lcmNlJyxcbiAgICAgICAgJ2NvbXBpbGUnLFxuICAgICAgICAnY29tcGxleCcsXG4gICAgICAgICdkZWxhdHRyJyxcbiAgICAgICAgJ2RpY3QnLFxuICAgICAgICAnZGlyJyxcbiAgICAgICAgJ2Rpdm1vZCcsXG4gICAgICAgICdlbnVtZXJhdGUnLFxuICAgICAgICAnZXZhbCcsXG4gICAgICAgICdleGVjZmlsZScsXG4gICAgICAgICdmaWxlJyxcbiAgICAgICAgJ2ZpbHRlcicsXG4gICAgICAgICdmb3JtYXQnLFxuICAgICAgICAnZnJvemVuc2V0JyxcbiAgICAgICAgJ2dldGF0dHInLFxuICAgICAgICAnZ2xvYmFscycsXG4gICAgICAgICdoYXNhdHRyJyxcbiAgICAgICAgJ2hhc2gnLFxuICAgICAgICAnaGVscCcsXG4gICAgICAgICdpZCcsXG4gICAgICAgICdpbnB1dCcsXG4gICAgICAgICdpbnRlcm4nLFxuICAgICAgICAnaXNpbnN0YW5jZScsXG4gICAgICAgICdpc3N1YmNsYXNzJyxcbiAgICAgICAgJ2l0ZXInLFxuICAgICAgICAnbGVuJyxcbiAgICAgICAgJ2xvY2FscycsXG4gICAgICAgICdsaXN0JyxcbiAgICAgICAgJ21hcCcsXG4gICAgICAgICdtYXgnLFxuICAgICAgICAnbWVtb3J5dmlldycsXG4gICAgICAgICdtaW4nLFxuICAgICAgICAnbmV4dCcsXG4gICAgICAgICdvYmplY3QnLFxuICAgICAgICAnb2N0JyxcbiAgICAgICAgJ29wZW4nLFxuICAgICAgICAnb3JkJyxcbiAgICAgICAgJ3BvdycsXG4gICAgICAgICdwcmludCcsXG4gICAgICAgICdwcm9wZXJ0eScsXG4gICAgICAgICdyZXZlcnNlZCcsXG4gICAgICAgICdyYW5nZScsXG4gICAgICAgICdyYXdfaW5wdXQnLFxuICAgICAgICAncmVkdWNlJyxcbiAgICAgICAgJ3JlbG9hZCcsXG4gICAgICAgICdyZXByJyxcbiAgICAgICAgJ3JldmVyc2VkJyxcbiAgICAgICAgJ3JvdW5kJyxcbiAgICAgICAgJ3NldCcsXG4gICAgICAgICdzZXRhdHRyJyxcbiAgICAgICAgJ3NsaWNlJyxcbiAgICAgICAgJ3NvcnRlZCcsXG4gICAgICAgICdzdGF0aWNtZXRob2QnLFxuICAgICAgICAnc3RyJyxcbiAgICAgICAgJ3N1bScsXG4gICAgICAgICdzdXBlcicsXG4gICAgICAgICd0dXBsZScsXG4gICAgICAgICd0eXBlJyxcbiAgICAgICAgJ3VuaWNocicsXG4gICAgICAgICd1bmljb2RlJyxcbiAgICAgICAgJ3ZhcnMnLFxuICAgICAgICAneHJhbmdlJyxcbiAgICAgICAgJ3ppcCcsXG4gICAgICAgICdUcnVlJyxcbiAgICAgICAgJ0ZhbHNlJyxcbiAgICAgICAgJ19fZGljdF9fJyxcbiAgICAgICAgJ19fbWV0aG9kc19fJyxcbiAgICAgICAgJ19fbWVtYmVyc19fJyxcbiAgICAgICAgJ19fY2xhc3NfXycsXG4gICAgICAgICdfX2Jhc2VzX18nLFxuICAgICAgICAnX19uYW1lX18nLFxuICAgICAgICAnX19tcm9fXycsXG4gICAgICAgICdfX3N1YmNsYXNzZXNfXycsXG4gICAgICAgICdfX2luaXRfXycsXG4gICAgICAgICdfX2ltcG9ydF9fJ1xuICAgIF0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9XG4gICAgXSxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAbnVtYmVycycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzdHJpbmdzJyB9LFxuICAgICAgICAgICAgWy9bLDo7XS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvW3t9XFxbXFxdKCldLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9AW2EtekEtWl1cXHcqLywgJ3RhZyddLFxuICAgICAgICAgICAgWy9bYS16QS1aXVxcdyovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBEZWFsIHdpdGggd2hpdGUgc3BhY2UsIGluY2x1ZGluZyBzaW5nbGUgYW5kIG11bHRpLWxpbmUgY29tbWVudHNcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9cXHMrLywgJ3doaXRlJ10sXG4gICAgICAgICAgICBbLyheIy4qJCkvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy8oJycnLionJycpfChcIlwiXCIuKlwiXCJcIikvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLycnJy4qJC8sICdzdHJpbmcnLCAnQGVuZERvY1N0cmluZyddLFxuICAgICAgICAgICAgWy9cIlwiXCIuKiQvLCAnc3RyaW5nJywgJ0BlbmREYmxEb2NTdHJpbmcnXVxuICAgICAgICBdLFxuICAgICAgICBlbmREb2NTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvXFxcXCcvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLy4qJycnLywgJ3N0cmluZycsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbLy4qJC8sICdzdHJpbmcnXVxuICAgICAgICBdLFxuICAgICAgICBlbmREYmxEb2NTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvXFxcXFwiLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy8uKlwiXCJcIi8sICdzdHJpbmcnLCAnQHBvcGFsbCddLFxuICAgICAgICAgICAgWy8uKiQvLCAnc3RyaW5nJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVjb2duaXplIGhleCwgbmVnYXRpdmVzLCBkZWNpbWFscywgaW1hZ2luYXJpZXMsIGxvbmdzLCBhbmQgc2NpZW50aWZpYyBub3RhdGlvblxuICAgICAgICBudW1iZXJzOiBbXG4gICAgICAgICAgICBbLy0/MHgoW2FiY2RlZl18W0FCQ0RFRl18XFxkKStbbExdPy8sICdudW1iZXIuaGV4J10sXG4gICAgICAgICAgICBbLy0/KFxcZCpcXC4pP1xcZCsoW2VFXVsrXFwtXT9cXGQrKT9bakpdP1tsTF0/LywgJ251bWJlciddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFJlY29nbml6ZSBzdHJpbmdzLCBpbmNsdWRpbmcgdGhvc2UgYnJva2VuIGFjcm9zcyBsaW5lcyB3aXRoIFxcIChidXQgbm90IHdpdGhvdXQpXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvJyQvLCAnc3RyaW5nLmVzY2FwZScsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbLycvLCAnc3RyaW5nLmVzY2FwZScsICdAc3RyaW5nQm9keSddLFxuICAgICAgICAgICAgWy9cIiQvLCAnc3RyaW5nLmVzY2FwZScsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZy5lc2NhcGUnLCAnQGRibFN0cmluZ0JvZHknXVxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmdCb2R5OiBbXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5lc2NhcGUnLCAnQHBvcGFsbCddLFxuICAgICAgICAgICAgWy8uKD89LionKS8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvLipcXFxcJC8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvLiokLywgJ3N0cmluZycsICdAcG9wYWxsJ11cbiAgICAgICAgXSxcbiAgICAgICAgZGJsU3RyaW5nQm9keTogW1xuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nLmVzY2FwZScsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbLy4oPz0uKlwiKS8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvLipcXFxcJC8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvLiokLywgJ3N0cmluZycsICdAcG9wYWxsJ11cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcHl0aG9uL3B5dGhvbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3B5dGhvbi9weXRob24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSJdLCJzb3VyY2VSb290IjoiIn0=