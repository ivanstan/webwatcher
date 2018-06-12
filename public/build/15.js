webpackJsonp([15],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.js ***!
  \************************************************************************/
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
    tokenPostfix: '.rust',
    defaultToken: 'invalid',
    keywords: [
        'as', 'box', 'break', 'const', 'continue', 'crate', 'else', 'enum',
        'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop',
        'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self',
        'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use',
        'where', 'while', 'catch', 'default', 'union', 'static', 'abstract',
        'alignof', 'become', 'do', 'final', 'macro', 'offsetof', 'override',
        'priv', 'proc', 'pure', 'sizeof', 'typeof', 'unsized', 'virtual',
        'yield',
    ],
    typeKeywords: [
        'Self', 'm32', 'm64', 'm128', 'f80', 'f16', 'f128', 'int', 'uint',
        'float', 'char', 'bool', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'i8',
        'i16', 'i32', 'i64', 'str', 'Option', 'Either', 'c_float', 'c_double',
        'c_void', 'FILE', 'fpos_t', 'DIR', 'dirent', 'c_char', 'c_schar',
        'c_uchar', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long',
        'c_ulong', 'size_t', 'ptrdiff_t', 'clock_t', 'time_t', 'c_longlong',
        'c_ulonglong', 'intptr_t', 'uintptr_t', 'off_t', 'dev_t', 'ino_t',
        'pid_t', 'mode_t', 'ssize_t',
    ],
    constants: [
        'true', 'false', 'Some', 'None', 'Left', 'Right', 'Ok', 'Err',
    ],
    supportConstants: [
        'EXIT_FAILURE', 'EXIT_SUCCESS', 'RAND_MAX', 'EOF', 'SEEK_SET',
        'SEEK_CUR', 'SEEK_END', '_IOFBF', '_IONBF', '_IOLBF', 'BUFSIZ',
        'FOPEN_MAX', 'FILENAME_MAX', 'L_tmpnam', 'TMP_MAX', 'O_RDONLY',
        'O_WRONLY', 'O_RDWR', 'O_APPEND', 'O_CREAT', 'O_EXCL', 'O_TRUNC',
        'S_IFIFO', 'S_IFCHR', 'S_IFBLK', 'S_IFDIR', 'S_IFREG', 'S_IFMT',
        'S_IEXEC', 'S_IWRITE', 'S_IREAD', 'S_IRWXU', 'S_IXUSR', 'S_IWUSR',
        'S_IRUSR', 'F_OK', 'R_OK', 'W_OK', 'X_OK', 'STDIN_FILENO',
        'STDOUT_FILENO', 'STDERR_FILENO',
    ],
    supportMacros: [
        'format!', 'print!', 'println!', 'panic!', 'format_args!', 'unreachable!',
        'write!', 'writeln!'
    ],
    operators: [
        '!', '!=', '%', '%=', '&', '&=', '&&', '*', '*=', '+', '+=', '-', '-=',
        '->', '.', '..', '...', '/', '/=', ':', ';', '<<', '<<=', '<', '<=', '=',
        '==', '=>', '>', '>=', '>>', '>>=', '@', '^', '^=', '|', '|=', '||', '_',
        '?', '#'
    ],
    escapes: /\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,
    delimiters: /[,]/,
    symbols: /[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,
    intSuffixes: /[iu](8|16|32|64|128|size)/,
    floatSuffixes: /f(32|64)/,
    tokenizer: {
        root: [
            [/[a-zA-Z][a-zA-Z0-9_]*!?|_[a-zA-Z0-9_]+/,
                {
                    cases: {
                        '@typeKeywords': 'keyword.type',
                        '@keywords': 'keyword',
                        '@supportConstants': 'keyword',
                        '@supportMacros': 'keyword',
                        '@constants': 'keyword',
                        '@default': 'identifier',
                    }
                }
            ],
            // Designator
            [/\$/, 'identifier'],
            // Lifetime annotations
            [/'[a-zA-Z_][a-zA-Z0-9_]*(?=[^\'])/, 'identifier'],
            // Byte literal
            [/'\S'/, 'string.byteliteral'],
            // Strings
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            { include: '@numbers' },
            // Whitespace + comments
            { include: '@whitespace' },
            [/@delimiters/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'delimiter'
                    }
                }],
            [/[{}()\[\]<>]/, '@brackets'],
            [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        numbers: [
            //Octal
            [/(0o[0-7_]+)(@intSuffixes)?/, { token: 'number' }],
            //Binary
            [/(0b[0-1_]+)(@intSuffixes)?/, { token: 'number' }],
            //Exponent
            [/[\d][\d_]*(\.[\d][\d_]*)?[eE][+-][\d_]+(@floatSuffixes)?/, { token: 'number' }],
            //Float
            [/\b(\d\.?[\d_]*)(@floatSuffixes)?\b/, { token: 'number' }],
            //Hexadecimal
            [/(0x[\da-fA-F]+)_?(@intSuffixes)?/, { token: 'number' }],
            //Integer
            [/[\d][\d_]*(@intSuffixes?)?/, { token: 'number' }],
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3J1c3QvcnVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0RBQXdEO0FBQ2pFLFNBQVMsMkNBQTJDO0FBQ3BEO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRTtBQUNqRDtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJEQUEyRDtBQUM5RSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLDBCQUEwQixTQUFTLDJDQUEyQyxFQUFFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUF5RDtBQUM1RTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsa0JBQWtCO0FBQzlEO0FBQ0EsNENBQTRDLGtCQUFrQjtBQUM5RDtBQUNBLDBFQUEwRSxrQkFBa0I7QUFDNUY7QUFDQSxvREFBb0Qsa0JBQWtCO0FBQ3RFO0FBQ0Esa0RBQWtELGtCQUFrQjtBQUNwRTtBQUNBLDRDQUE0QyxrQkFBa0I7QUFDOUQ7QUFDQTtBQUNBIiwiZmlsZSI6IjE1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcvLycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK3JlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNwcmFnbWFcXFxccytlbmRyZWdpb25cXFxcYlwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgdG9rZW5Qb3N0Zml4OiAnLnJ1c3QnLFxuICAgIGRlZmF1bHRUb2tlbjogJ2ludmFsaWQnLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdhcycsICdib3gnLCAnYnJlYWsnLCAnY29uc3QnLCAnY29udGludWUnLCAnY3JhdGUnLCAnZWxzZScsICdlbnVtJyxcbiAgICAgICAgJ2V4dGVybicsICdmYWxzZScsICdmbicsICdmb3InLCAnaWYnLCAnaW1wbCcsICdpbicsICdsZXQnLCAnbG9vcCcsXG4gICAgICAgICdtYXRjaCcsICdtb2QnLCAnbW92ZScsICdtdXQnLCAncHViJywgJ3JlZicsICdyZXR1cm4nLCAnc2VsZicsXG4gICAgICAgICdzdGF0aWMnLCAnc3RydWN0JywgJ3N1cGVyJywgJ3RyYWl0JywgJ3RydWUnLCAndHlwZScsICd1bnNhZmUnLCAndXNlJyxcbiAgICAgICAgJ3doZXJlJywgJ3doaWxlJywgJ2NhdGNoJywgJ2RlZmF1bHQnLCAndW5pb24nLCAnc3RhdGljJywgJ2Fic3RyYWN0JyxcbiAgICAgICAgJ2FsaWdub2YnLCAnYmVjb21lJywgJ2RvJywgJ2ZpbmFsJywgJ21hY3JvJywgJ29mZnNldG9mJywgJ292ZXJyaWRlJyxcbiAgICAgICAgJ3ByaXYnLCAncHJvYycsICdwdXJlJywgJ3NpemVvZicsICd0eXBlb2YnLCAndW5zaXplZCcsICd2aXJ0dWFsJyxcbiAgICAgICAgJ3lpZWxkJyxcbiAgICBdLFxuICAgIHR5cGVLZXl3b3JkczogW1xuICAgICAgICAnU2VsZicsICdtMzInLCAnbTY0JywgJ20xMjgnLCAnZjgwJywgJ2YxNicsICdmMTI4JywgJ2ludCcsICd1aW50JyxcbiAgICAgICAgJ2Zsb2F0JywgJ2NoYXInLCAnYm9vbCcsICd1OCcsICd1MTYnLCAndTMyJywgJ3U2NCcsICdmMzInLCAnZjY0JywgJ2k4JyxcbiAgICAgICAgJ2kxNicsICdpMzInLCAnaTY0JywgJ3N0cicsICdPcHRpb24nLCAnRWl0aGVyJywgJ2NfZmxvYXQnLCAnY19kb3VibGUnLFxuICAgICAgICAnY192b2lkJywgJ0ZJTEUnLCAnZnBvc190JywgJ0RJUicsICdkaXJlbnQnLCAnY19jaGFyJywgJ2Nfc2NoYXInLFxuICAgICAgICAnY191Y2hhcicsICdjX3Nob3J0JywgJ2NfdXNob3J0JywgJ2NfaW50JywgJ2NfdWludCcsICdjX2xvbmcnLFxuICAgICAgICAnY191bG9uZycsICdzaXplX3QnLCAncHRyZGlmZl90JywgJ2Nsb2NrX3QnLCAndGltZV90JywgJ2NfbG9uZ2xvbmcnLFxuICAgICAgICAnY191bG9uZ2xvbmcnLCAnaW50cHRyX3QnLCAndWludHB0cl90JywgJ29mZl90JywgJ2Rldl90JywgJ2lub190JyxcbiAgICAgICAgJ3BpZF90JywgJ21vZGVfdCcsICdzc2l6ZV90JyxcbiAgICBdLFxuICAgIGNvbnN0YW50czogW1xuICAgICAgICAndHJ1ZScsICdmYWxzZScsICdTb21lJywgJ05vbmUnLCAnTGVmdCcsICdSaWdodCcsICdPaycsICdFcnInLFxuICAgIF0sXG4gICAgc3VwcG9ydENvbnN0YW50czogW1xuICAgICAgICAnRVhJVF9GQUlMVVJFJywgJ0VYSVRfU1VDQ0VTUycsICdSQU5EX01BWCcsICdFT0YnLCAnU0VFS19TRVQnLFxuICAgICAgICAnU0VFS19DVVInLCAnU0VFS19FTkQnLCAnX0lPRkJGJywgJ19JT05CRicsICdfSU9MQkYnLCAnQlVGU0laJyxcbiAgICAgICAgJ0ZPUEVOX01BWCcsICdGSUxFTkFNRV9NQVgnLCAnTF90bXBuYW0nLCAnVE1QX01BWCcsICdPX1JET05MWScsXG4gICAgICAgICdPX1dST05MWScsICdPX1JEV1InLCAnT19BUFBFTkQnLCAnT19DUkVBVCcsICdPX0VYQ0wnLCAnT19UUlVOQycsXG4gICAgICAgICdTX0lGSUZPJywgJ1NfSUZDSFInLCAnU19JRkJMSycsICdTX0lGRElSJywgJ1NfSUZSRUcnLCAnU19JRk1UJyxcbiAgICAgICAgJ1NfSUVYRUMnLCAnU19JV1JJVEUnLCAnU19JUkVBRCcsICdTX0lSV1hVJywgJ1NfSVhVU1InLCAnU19JV1VTUicsXG4gICAgICAgICdTX0lSVVNSJywgJ0ZfT0snLCAnUl9PSycsICdXX09LJywgJ1hfT0snLCAnU1RESU5fRklMRU5PJyxcbiAgICAgICAgJ1NURE9VVF9GSUxFTk8nLCAnU1RERVJSX0ZJTEVOTycsXG4gICAgXSxcbiAgICBzdXBwb3J0TWFjcm9zOiBbXG4gICAgICAgICdmb3JtYXQhJywgJ3ByaW50IScsICdwcmludGxuIScsICdwYW5pYyEnLCAnZm9ybWF0X2FyZ3MhJywgJ3VucmVhY2hhYmxlIScsXG4gICAgICAgICd3cml0ZSEnLCAnd3JpdGVsbiEnXG4gICAgXSxcbiAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJyEnLCAnIT0nLCAnJScsICclPScsICcmJywgJyY9JywgJyYmJywgJyonLCAnKj0nLCAnKycsICcrPScsICctJywgJy09JyxcbiAgICAgICAgJy0+JywgJy4nLCAnLi4nLCAnLi4uJywgJy8nLCAnLz0nLCAnOicsICc7JywgJzw8JywgJzw8PScsICc8JywgJzw9JywgJz0nLFxuICAgICAgICAnPT0nLCAnPT4nLCAnPicsICc+PScsICc+PicsICc+Pj0nLCAnQCcsICdeJywgJ149JywgJ3wnLCAnfD0nLCAnfHwnLCAnXycsXG4gICAgICAgICc/JywgJyMnXG4gICAgXSxcbiAgICBlc2NhcGVzOiAvXFxcXChbbnJ0MFxcXCInJ1xcXFxdfHhcXGh7Mn18dVxce1xcaHsxLDZ9XFx9KS8sXG4gICAgZGVsaW1pdGVyczogL1ssXS8sXG4gICAgc3ltYm9sczogL1tcXCNcXCFcXCVcXCZcXCpcXCtcXC1cXC5cXC9cXDpcXDtcXDxcXD1cXD5cXEBcXF5cXHxfXFw/XSsvLFxuICAgIGludFN1ZmZpeGVzOiAvW2l1XSg4fDE2fDMyfDY0fDEyOHxzaXplKS8sXG4gICAgZmxvYXRTdWZmaXhlczogL2YoMzJ8NjQpLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgWy9bYS16QS1aXVthLXpBLVowLTlfXSohP3xfW2EtekEtWjAtOV9dKy8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0B0eXBlS2V5d29yZHMnOiAna2V5d29yZC50eXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQHN1cHBvcnRDb25zdGFudHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQHN1cHBvcnRNYWNyb3MnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGNvbnN0YW50cyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBEZXNpZ25hdG9yXG4gICAgICAgICAgICBbL1xcJC8sICdpZGVudGlmaWVyJ10sXG4gICAgICAgICAgICAvLyBMaWZldGltZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgWy8nW2EtekEtWl9dW2EtekEtWjAtOV9dKig/PVteXFwnXSkvLCAnaWRlbnRpZmllciddLFxuICAgICAgICAgICAgLy8gQnl0ZSBsaXRlcmFsXG4gICAgICAgICAgICBbLydcXFMnLywgJ3N0cmluZy5ieXRlbGl0ZXJhbCddLFxuICAgICAgICAgICAgLy8gU3RyaW5nc1xuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQG9wZW4nLCBuZXh0OiAnQHN0cmluZycgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAbnVtYmVycycgfSxcbiAgICAgICAgICAgIC8vIFdoaXRlc3BhY2UgKyBjb21tZW50c1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICBbL0BkZWxpbWl0ZXJzLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdkZWxpbWl0ZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvW3t9KClcXFtcXF08Pl0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywgeyBjYXNlczogeyAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcicsICdAZGVmYXVsdCc6ICcnIH0gfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICd3aGl0ZSddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teXFwvKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQnLCAnQHB1c2gnXSxcbiAgICAgICAgICAgIFtcIlxcXFwqL1wiLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAY2xvc2UnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgbnVtYmVyczogW1xuICAgICAgICAgICAgLy9PY3RhbFxuICAgICAgICAgICAgWy8oMG9bMC03X10rKShAaW50U3VmZml4ZXMpPy8sIHsgdG9rZW46ICdudW1iZXInIH1dLFxuICAgICAgICAgICAgLy9CaW5hcnlcbiAgICAgICAgICAgIFsvKDBiWzAtMV9dKykoQGludFN1ZmZpeGVzKT8vLCB7IHRva2VuOiAnbnVtYmVyJyB9XSxcbiAgICAgICAgICAgIC8vRXhwb25lbnRcbiAgICAgICAgICAgIFsvW1xcZF1bXFxkX10qKFxcLltcXGRdW1xcZF9dKik/W2VFXVsrLV1bXFxkX10rKEBmbG9hdFN1ZmZpeGVzKT8vLCB7IHRva2VuOiAnbnVtYmVyJyB9XSxcbiAgICAgICAgICAgIC8vRmxvYXRcbiAgICAgICAgICAgIFsvXFxiKFxcZFxcLj9bXFxkX10qKShAZmxvYXRTdWZmaXhlcyk/XFxiLywgeyB0b2tlbjogJ251bWJlcicgfV0sXG4gICAgICAgICAgICAvL0hleGFkZWNpbWFsXG4gICAgICAgICAgICBbLygweFtcXGRhLWZBLUZdKylfPyhAaW50U3VmZml4ZXMpPy8sIHsgdG9rZW46ICdudW1iZXInIH1dLFxuICAgICAgICAgICAgLy9JbnRlZ2VyXG4gICAgICAgICAgICBbL1tcXGRdW1xcZF9dKihAaW50U3VmZml4ZXM/KT8vLCB7IHRva2VuOiAnbnVtYmVyJyB9XSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcnVzdC9ydXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcnVzdC9ydXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTUiXSwic291cmNlUm9vdCI6IiJ9