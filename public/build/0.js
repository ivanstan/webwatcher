webpackJsonp([0],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js ***!
  \**********************************************************************/
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
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*#pragma\\s+region\\b"),
            end: new RegExp("^\\s*#pragma\\s+endregion\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.cpp',
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' },
        { token: 'delimiter.angle', open: '<', close: '>' }
    ],
    keywords: [
        'abstract',
        'amp',
        'array',
        'auto',
        'bool',
        'break',
        'case',
        'catch',
        'char',
        'class',
        'const',
        'constexpr',
        'const_cast',
        'continue',
        'cpu',
        'decltype',
        'default',
        'delegate',
        'delete',
        'do',
        'double',
        'dynamic_cast',
        'each',
        'else',
        'enum',
        'event',
        'explicit',
        'export',
        'extern',
        'false',
        'final',
        'finally',
        'float',
        'for',
        'friend',
        'gcnew',
        'generic',
        'goto',
        'if',
        'in',
        'initonly',
        'inline',
        'int',
        'interface',
        'interior_ptr',
        'internal',
        'literal',
        'long',
        'mutable',
        'namespace',
        'new',
        'noexcept',
        'nullptr',
        '__nullptr',
        'operator',
        'override',
        'partial',
        'pascal',
        'pin_ptr',
        'private',
        'property',
        'protected',
        'public',
        'ref',
        'register',
        'reinterpret_cast',
        'restrict',
        'return',
        'safe_cast',
        'sealed',
        'short',
        'signed',
        'sizeof',
        'static',
        'static_assert',
        'static_cast',
        'struct',
        'switch',
        'template',
        'this',
        'thread_local',
        'throw',
        'tile_static',
        'true',
        'try',
        'typedef',
        'typeid',
        'typename',
        'union',
        'unsigned',
        'using',
        'virtual',
        'void',
        'volatile',
        'wchar_t',
        'where',
        'while',
        '_asm',
        '_based',
        '_cdecl',
        '_declspec',
        '_fastcall',
        '_if_exists',
        '_if_not_exists',
        '_inline',
        '_multiple_inheritance',
        '_pascal',
        '_single_inheritance',
        '_stdcall',
        '_virtual_inheritance',
        '_w64',
        '__abstract',
        '__alignof',
        '__asm',
        '__assume',
        '__based',
        '__box',
        '__builtin_alignof',
        '__cdecl',
        '__clrcall',
        '__declspec',
        '__delegate',
        '__event',
        '__except',
        '__fastcall',
        '__finally',
        '__forceinline',
        '__gc',
        '__hook',
        '__identifier',
        '__if_exists',
        '__if_not_exists',
        '__inline',
        '__int128',
        '__int16',
        '__int32',
        '__int64',
        '__int8',
        '__interface',
        '__leave',
        '__m128',
        '__m128d',
        '__m128i',
        '__m256',
        '__m256d',
        '__m256i',
        '__m64',
        '__multiple_inheritance',
        '__newslot',
        '__nogc',
        '__noop',
        '__nounwind',
        '__novtordisp',
        '__pascal',
        '__pin',
        '__pragma',
        '__property',
        '__ptr32',
        '__ptr64',
        '__raise',
        '__restrict',
        '__resume',
        '__sealed',
        '__single_inheritance',
        '__stdcall',
        '__super',
        '__thiscall',
        '__try',
        '__try_cast',
        '__typeof',
        '__unaligned',
        '__unhook',
        '__uuidof',
        '__value',
        '__virtual_inheritance',
        '__w64',
        '__wchar_t'
    ],
    operators: [
        '=', '>', '<', '!', '~', '?', ':',
        '==', '<=', '>=', '!=', '&&', '||', '++', '--',
        '+', '-', '*', '/', '&', '|', '^', '%', '<<',
        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
        '^=', '%=', '<<=', '>>=', '>>>='
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // C++ 11 Raw String
            [/@encoding?R\"(?:([^ ()\\\t]*))\(/, { token: 'string.raw.begin', next: '@raw.$1' }],
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
            // whitespace
            { include: '@whitespace' },
            // [[ attributes ]].
            [/\[\[.*\]\]/, 'annotation'],
            [/^\s*#include/, { token: 'keyword.directive.include', next: '@include' }],
            // Preprocessor directive
            [/^\s*#\s*\w+/, 'keyword'],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
            [/\d[\d']*\d(@integersuffix)/, 'number'],
            [/\d(@integersuffix)/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        //Identical copy of comment above, except for the addition of .doc
        doccomment: [
            [/[^\/*]+/, 'comment.doc'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        raw: [
            [/(.*)(\))(?:([^ ()\\\t]*))(\")/, {
                    cases: {
                        '$3==$S2': ['string.raw', 'string.raw.end', 'string.raw.end', { token: 'string.raw.end', next: '@pop' }],
                        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']
                    }
                }
            ],
            [/.*/, 'string.raw']
        ],
        include: [
            [/(\s*)(<)([^<>]*)(>)/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]],
            [/(\s*)(")([^"]*)(")/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]]
        ]
    },
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NwcC9jcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdEQUF3RDtBQUNqRSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1DQUFtQyxZQUFZLEdBQUc7QUFDM0QsU0FBUyx3REFBd0Q7QUFDakUsU0FBUyxtREFBbUQ7QUFDNUQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxJQUFJLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsNkNBQTZDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQSw4QkFBOEIsdURBQXVEO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLHdDQUF3QztBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBHQUEwRyx1REFBdUQ7QUFDaksseUdBQXlHLHVEQUF1RDtBQUNoSztBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcvLycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK3JlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNwcmFnbWFcXFxccytlbmRyZWdpb25cXFxcYlwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuY3BwJyxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnLCBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5hbmdsZScsIG9wZW46ICc8JywgY2xvc2U6ICc+JyB9XG4gICAgXSxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnYWJzdHJhY3QnLFxuICAgICAgICAnYW1wJyxcbiAgICAgICAgJ2FycmF5JyxcbiAgICAgICAgJ2F1dG8nLFxuICAgICAgICAnYm9vbCcsXG4gICAgICAgICdicmVhaycsXG4gICAgICAgICdjYXNlJyxcbiAgICAgICAgJ2NhdGNoJyxcbiAgICAgICAgJ2NoYXInLFxuICAgICAgICAnY2xhc3MnLFxuICAgICAgICAnY29uc3QnLFxuICAgICAgICAnY29uc3RleHByJyxcbiAgICAgICAgJ2NvbnN0X2Nhc3QnLFxuICAgICAgICAnY29udGludWUnLFxuICAgICAgICAnY3B1JyxcbiAgICAgICAgJ2RlY2x0eXBlJyxcbiAgICAgICAgJ2RlZmF1bHQnLFxuICAgICAgICAnZGVsZWdhdGUnLFxuICAgICAgICAnZGVsZXRlJyxcbiAgICAgICAgJ2RvJyxcbiAgICAgICAgJ2RvdWJsZScsXG4gICAgICAgICdkeW5hbWljX2Nhc3QnLFxuICAgICAgICAnZWFjaCcsXG4gICAgICAgICdlbHNlJyxcbiAgICAgICAgJ2VudW0nLFxuICAgICAgICAnZXZlbnQnLFxuICAgICAgICAnZXhwbGljaXQnLFxuICAgICAgICAnZXhwb3J0JyxcbiAgICAgICAgJ2V4dGVybicsXG4gICAgICAgICdmYWxzZScsXG4gICAgICAgICdmaW5hbCcsXG4gICAgICAgICdmaW5hbGx5JyxcbiAgICAgICAgJ2Zsb2F0JyxcbiAgICAgICAgJ2ZvcicsXG4gICAgICAgICdmcmllbmQnLFxuICAgICAgICAnZ2NuZXcnLFxuICAgICAgICAnZ2VuZXJpYycsXG4gICAgICAgICdnb3RvJyxcbiAgICAgICAgJ2lmJyxcbiAgICAgICAgJ2luJyxcbiAgICAgICAgJ2luaXRvbmx5JyxcbiAgICAgICAgJ2lubGluZScsXG4gICAgICAgICdpbnQnLFxuICAgICAgICAnaW50ZXJmYWNlJyxcbiAgICAgICAgJ2ludGVyaW9yX3B0cicsXG4gICAgICAgICdpbnRlcm5hbCcsXG4gICAgICAgICdsaXRlcmFsJyxcbiAgICAgICAgJ2xvbmcnLFxuICAgICAgICAnbXV0YWJsZScsXG4gICAgICAgICduYW1lc3BhY2UnLFxuICAgICAgICAnbmV3JyxcbiAgICAgICAgJ25vZXhjZXB0JyxcbiAgICAgICAgJ251bGxwdHInLFxuICAgICAgICAnX19udWxscHRyJyxcbiAgICAgICAgJ29wZXJhdG9yJyxcbiAgICAgICAgJ292ZXJyaWRlJyxcbiAgICAgICAgJ3BhcnRpYWwnLFxuICAgICAgICAncGFzY2FsJyxcbiAgICAgICAgJ3Bpbl9wdHInLFxuICAgICAgICAncHJpdmF0ZScsXG4gICAgICAgICdwcm9wZXJ0eScsXG4gICAgICAgICdwcm90ZWN0ZWQnLFxuICAgICAgICAncHVibGljJyxcbiAgICAgICAgJ3JlZicsXG4gICAgICAgICdyZWdpc3RlcicsXG4gICAgICAgICdyZWludGVycHJldF9jYXN0JyxcbiAgICAgICAgJ3Jlc3RyaWN0JyxcbiAgICAgICAgJ3JldHVybicsXG4gICAgICAgICdzYWZlX2Nhc3QnLFxuICAgICAgICAnc2VhbGVkJyxcbiAgICAgICAgJ3Nob3J0JyxcbiAgICAgICAgJ3NpZ25lZCcsXG4gICAgICAgICdzaXplb2YnLFxuICAgICAgICAnc3RhdGljJyxcbiAgICAgICAgJ3N0YXRpY19hc3NlcnQnLFxuICAgICAgICAnc3RhdGljX2Nhc3QnLFxuICAgICAgICAnc3RydWN0JyxcbiAgICAgICAgJ3N3aXRjaCcsXG4gICAgICAgICd0ZW1wbGF0ZScsXG4gICAgICAgICd0aGlzJyxcbiAgICAgICAgJ3RocmVhZF9sb2NhbCcsXG4gICAgICAgICd0aHJvdycsXG4gICAgICAgICd0aWxlX3N0YXRpYycsXG4gICAgICAgICd0cnVlJyxcbiAgICAgICAgJ3RyeScsXG4gICAgICAgICd0eXBlZGVmJyxcbiAgICAgICAgJ3R5cGVpZCcsXG4gICAgICAgICd0eXBlbmFtZScsXG4gICAgICAgICd1bmlvbicsXG4gICAgICAgICd1bnNpZ25lZCcsXG4gICAgICAgICd1c2luZycsXG4gICAgICAgICd2aXJ0dWFsJyxcbiAgICAgICAgJ3ZvaWQnLFxuICAgICAgICAndm9sYXRpbGUnLFxuICAgICAgICAnd2NoYXJfdCcsXG4gICAgICAgICd3aGVyZScsXG4gICAgICAgICd3aGlsZScsXG4gICAgICAgICdfYXNtJyxcbiAgICAgICAgJ19iYXNlZCcsXG4gICAgICAgICdfY2RlY2wnLFxuICAgICAgICAnX2RlY2xzcGVjJyxcbiAgICAgICAgJ19mYXN0Y2FsbCcsXG4gICAgICAgICdfaWZfZXhpc3RzJyxcbiAgICAgICAgJ19pZl9ub3RfZXhpc3RzJyxcbiAgICAgICAgJ19pbmxpbmUnLFxuICAgICAgICAnX211bHRpcGxlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19wYXNjYWwnLFxuICAgICAgICAnX3NpbmdsZV9pbmhlcml0YW5jZScsXG4gICAgICAgICdfc3RkY2FsbCcsXG4gICAgICAgICdfdmlydHVhbF9pbmhlcml0YW5jZScsXG4gICAgICAgICdfdzY0JyxcbiAgICAgICAgJ19fYWJzdHJhY3QnLFxuICAgICAgICAnX19hbGlnbm9mJyxcbiAgICAgICAgJ19fYXNtJyxcbiAgICAgICAgJ19fYXNzdW1lJyxcbiAgICAgICAgJ19fYmFzZWQnLFxuICAgICAgICAnX19ib3gnLFxuICAgICAgICAnX19idWlsdGluX2FsaWdub2YnLFxuICAgICAgICAnX19jZGVjbCcsXG4gICAgICAgICdfX2NscmNhbGwnLFxuICAgICAgICAnX19kZWNsc3BlYycsXG4gICAgICAgICdfX2RlbGVnYXRlJyxcbiAgICAgICAgJ19fZXZlbnQnLFxuICAgICAgICAnX19leGNlcHQnLFxuICAgICAgICAnX19mYXN0Y2FsbCcsXG4gICAgICAgICdfX2ZpbmFsbHknLFxuICAgICAgICAnX19mb3JjZWlubGluZScsXG4gICAgICAgICdfX2djJyxcbiAgICAgICAgJ19faG9vaycsXG4gICAgICAgICdfX2lkZW50aWZpZXInLFxuICAgICAgICAnX19pZl9leGlzdHMnLFxuICAgICAgICAnX19pZl9ub3RfZXhpc3RzJyxcbiAgICAgICAgJ19faW5saW5lJyxcbiAgICAgICAgJ19faW50MTI4JyxcbiAgICAgICAgJ19faW50MTYnLFxuICAgICAgICAnX19pbnQzMicsXG4gICAgICAgICdfX2ludDY0JyxcbiAgICAgICAgJ19faW50OCcsXG4gICAgICAgICdfX2ludGVyZmFjZScsXG4gICAgICAgICdfX2xlYXZlJyxcbiAgICAgICAgJ19fbTEyOCcsXG4gICAgICAgICdfX20xMjhkJyxcbiAgICAgICAgJ19fbTEyOGknLFxuICAgICAgICAnX19tMjU2JyxcbiAgICAgICAgJ19fbTI1NmQnLFxuICAgICAgICAnX19tMjU2aScsXG4gICAgICAgICdfX202NCcsXG4gICAgICAgICdfX211bHRpcGxlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19fbmV3c2xvdCcsXG4gICAgICAgICdfX25vZ2MnLFxuICAgICAgICAnX19ub29wJyxcbiAgICAgICAgJ19fbm91bndpbmQnLFxuICAgICAgICAnX19ub3Z0b3JkaXNwJyxcbiAgICAgICAgJ19fcGFzY2FsJyxcbiAgICAgICAgJ19fcGluJyxcbiAgICAgICAgJ19fcHJhZ21hJyxcbiAgICAgICAgJ19fcHJvcGVydHknLFxuICAgICAgICAnX19wdHIzMicsXG4gICAgICAgICdfX3B0cjY0JyxcbiAgICAgICAgJ19fcmFpc2UnLFxuICAgICAgICAnX19yZXN0cmljdCcsXG4gICAgICAgICdfX3Jlc3VtZScsXG4gICAgICAgICdfX3NlYWxlZCcsXG4gICAgICAgICdfX3NpbmdsZV9pbmhlcml0YW5jZScsXG4gICAgICAgICdfX3N0ZGNhbGwnLFxuICAgICAgICAnX19zdXBlcicsXG4gICAgICAgICdfX3RoaXNjYWxsJyxcbiAgICAgICAgJ19fdHJ5JyxcbiAgICAgICAgJ19fdHJ5X2Nhc3QnLFxuICAgICAgICAnX190eXBlb2YnLFxuICAgICAgICAnX191bmFsaWduZWQnLFxuICAgICAgICAnX191bmhvb2snLFxuICAgICAgICAnX191dWlkb2YnLFxuICAgICAgICAnX192YWx1ZScsXG4gICAgICAgICdfX3ZpcnR1YWxfaW5oZXJpdGFuY2UnLFxuICAgICAgICAnX193NjQnLFxuICAgICAgICAnX193Y2hhcl90J1xuICAgIF0sXG4gICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICc9JywgJz4nLCAnPCcsICchJywgJ34nLCAnPycsICc6JyxcbiAgICAgICAgJz09JywgJzw9JywgJz49JywgJyE9JywgJyYmJywgJ3x8JywgJysrJywgJy0tJyxcbiAgICAgICAgJysnLCAnLScsICcqJywgJy8nLCAnJicsICd8JywgJ14nLCAnJScsICc8PCcsXG4gICAgICAgICc+PicsICc+Pj4nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJj0nLCAnfD0nLFxuICAgICAgICAnXj0nLCAnJT0nLCAnPDw9JywgJz4+PScsICc+Pj49J1xuICAgIF0sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gICAgaW50ZWdlcnN1ZmZpeDogLyhsbHxMTHx1fFV8bHxMKT8obGx8TEx8dXxVfGx8TCk/LyxcbiAgICBmbG9hdHN1ZmZpeDogL1tmRmxMXT8vLFxuICAgIGVuY29kaW5nOiAvdXx1OHxVfEwvLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBDKysgMTEgUmF3IFN0cmluZ1xuICAgICAgICAgICAgWy9AZW5jb2Rpbmc/UlxcXCIoPzooW14gKClcXFxcXFx0XSopKVxcKC8sIHsgdG9rZW46ICdzdHJpbmcucmF3LmJlZ2luJywgbmV4dDogJ0ByYXcuJDEnIH1dLFxuICAgICAgICAgICAgLy8gaWRlbnRpZmllcnMgYW5kIGtleXdvcmRzXG4gICAgICAgICAgICBbL1thLXpBLVpfXVxcdyovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQuJDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gd2hpdGVzcGFjZVxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICAvLyBbWyBhdHRyaWJ1dGVzIF1dLlxuICAgICAgICAgICAgWy9cXFtcXFsuKlxcXVxcXS8sICdhbm5vdGF0aW9uJ10sXG4gICAgICAgICAgICBbL15cXHMqI2luY2x1ZGUvLCB7IHRva2VuOiAna2V5d29yZC5kaXJlY3RpdmUuaW5jbHVkZScsIG5leHQ6ICdAaW5jbHVkZScgfV0sXG4gICAgICAgICAgICAvLyBQcmVwcm9jZXNzb3IgZGlyZWN0aXZlXG4gICAgICAgICAgICBbL15cXHMqI1xccypcXHcrLywgJ2tleXdvcmQnXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnMgYW5kIG9wZXJhdG9yc1xuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BvcGVyYXRvcnMnOiAnZGVsaW1pdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvXFxkKlxcZCtbZUVdKFtcXC0rXT9cXGQrKT8oQGZsb2F0c3VmZml4KS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvXFxkKlxcLlxcZCsoW2VFXVtcXC0rXT9cXGQrKT8oQGZsb2F0c3VmZml4KS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvMFt4WF1bMC05YS1mQS1GJ10qWzAtOWEtZkEtRl0oQGludGVnZXJzdWZmaXgpLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvMFswLTcnXSpbMC03XShAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLm9jdGFsJ10sXG4gICAgICAgICAgICBbLzBbYkJdWzAtMSddKlswLTFdKEBpbnRlZ2Vyc3VmZml4KS8sICdudW1iZXIuYmluYXJ5J10sXG4gICAgICAgICAgICBbL1xcZFtcXGQnXSpcXGQoQGludGVnZXJzdWZmaXgpLywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9cXGQoQGludGVnZXJzdWZmaXgpLywgJ251bWJlciddLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVyOiBhZnRlciBudW1iZXIgYmVjYXVzZSBvZiAuXFxkIGZsb2F0c1xuICAgICAgICAgICAgWy9bOywuXS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIC8vIHN0cmluZ3NcbiAgICAgICAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAc3RyaW5nJ10sXG4gICAgICAgICAgICAvLyBjaGFyYWN0ZXJzXG4gICAgICAgICAgICBbLydbXlxcXFwnXScvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbJ3N0cmluZycsICdzdHJpbmcuZXNjYXBlJywgJ3N0cmluZyddXSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuaW52YWxpZCddXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICcnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqXFwqKD8hXFwvKS8sICdjb21tZW50LmRvYycsICdAZG9jY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teXFwvKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXFwvKl0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vSWRlbnRpY2FsIGNvcHkgb2YgY29tbWVudCBhYm92ZSwgZXhjZXB0IGZvciB0aGUgYWRkaXRpb24gb2YgLmRvY1xuICAgICAgICBkb2Njb21tZW50OiBbXG4gICAgICAgICAgICBbL1teXFwvKl0rLywgJ2NvbW1lbnQuZG9jJ10sXG4gICAgICAgICAgICBbL1xcKlxcLy8sICdjb21tZW50LmRvYycsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50LmRvYyddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQHBvcCddXG4gICAgICAgIF0sXG4gICAgICAgIHJhdzogW1xuICAgICAgICAgICAgWy8oLiopKFxcKSkoPzooW14gKClcXFxcXFx0XSopKShcXFwiKS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckMz09JFMyJzogWydzdHJpbmcucmF3JywgJ3N0cmluZy5yYXcuZW5kJywgJ3N0cmluZy5yYXcuZW5kJywgeyB0b2tlbjogJ3N0cmluZy5yYXcuZW5kJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWydzdHJpbmcucmF3JywgJ3N0cmluZy5yYXcnLCAnc3RyaW5nLnJhdycsICdzdHJpbmcucmF3J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbLy4qLywgJ3N0cmluZy5yYXcnXVxuICAgICAgICBdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICBbLyhcXHMqKSg8KShbXjw+XSopKD4pLywgWycnLCAna2V5d29yZC5kaXJlY3RpdmUuaW5jbHVkZS5iZWdpbicsICdzdHJpbmcuaW5jbHVkZS5pZGVudGlmaWVyJywgeyB0b2tlbjogJ2tleXdvcmQuZGlyZWN0aXZlLmluY2x1ZGUuZW5kJywgbmV4dDogJ0Bwb3AnIH1dXSxcbiAgICAgICAgICAgIFsvKFxccyopKFwiKShbXlwiXSopKFwiKS8sIFsnJywgJ2tleXdvcmQuZGlyZWN0aXZlLmluY2x1ZGUuYmVnaW4nLCAnc3RyaW5nLmluY2x1ZGUuaWRlbnRpZmllcicsIHsgdG9rZW46ICdrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmVuZCcsIG5leHQ6ICdAcG9wJyB9XV1cbiAgICAgICAgXVxuICAgIH0sXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NwcC9jcHAuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9jcHAvY3BwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=