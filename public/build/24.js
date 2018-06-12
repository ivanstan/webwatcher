webpackJsonp([24],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.js ***!
  \********************************************************************************/
/*! exports provided: conf, language */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Artyom Shalkhakov. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *
 *  Based on the ATS/Postiats lexer by Hongwei Xi.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    comments: {
        lineComment: '//',
        blockComment: ['(*', '*)'],
    },
    brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
    autoClosingPairs: [
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '{', close: '}', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
    ]
};
var language = {
    tokenPostfix: '.pats',
    // TODO: staload and dynload are followed by a special kind of string literals
    // with {$IDENTIFER} variables, and it also may make sense to highlight
    // the punctuation (. and / and \) differently.
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    // keyword reference: https://github.com/githwxi/ATS-Postiats/blob/master/src/pats_lexing_token.dats
    keywords: [
        //
        "abstype",
        "abst0ype",
        "absprop",
        "absview",
        "absvtype",
        "absviewtype",
        "absvt0ype",
        "absviewt0ype",
        //
        "as",
        //
        "and",
        //
        "assume",
        //
        "begin",
        //
        /*
                "case", // CASE
        */
        //
        "classdec",
        //
        "datasort",
        //
        "datatype",
        "dataprop",
        "dataview",
        "datavtype",
        "dataviewtype",
        //
        "do",
        //
        "end",
        //
        "extern",
        "extype",
        "extvar",
        //
        "exception",
        //
        "fn",
        "fnx",
        "fun",
        //
        "prfn",
        "prfun",
        //
        "praxi",
        "castfn",
        //
        "if",
        "then",
        "else",
        //
        "ifcase",
        //
        "in",
        //
        "infix",
        "infixl",
        "infixr",
        "prefix",
        "postfix",
        //
        "implmnt",
        "implement",
        //
        "primplmnt",
        "primplement",
        //
        "import",
        //
        /*
                "lam", // LAM
                "llam", // LLAM
                "fix", // FIX
        */
        //
        "let",
        //
        "local",
        //
        "macdef",
        "macrodef",
        //
        "nonfix",
        //
        "symelim",
        "symintr",
        "overload",
        //
        "of",
        "op",
        //
        "rec",
        //
        "sif",
        "scase",
        //
        "sortdef",
        /*
        // HX: [sta] is now deprecated
        */
        "sta",
        "stacst",
        "stadef",
        "static",
        /*
                "stavar", // T_STAVAR
        */
        //
        "staload",
        "dynload",
        //
        "try",
        //
        "tkindef",
        //
        /*
                "type", // TYPE
        */
        "typedef",
        "propdef",
        "viewdef",
        "vtypedef",
        "viewtypedef",
        //
        /*
                "val", // VAL
        */
        "prval",
        //
        "var",
        "prvar",
        //
        "when",
        "where",
        //
        /*
                "for", // T_FOR
                "while", // T_WHILE
        */
        //
        "with",
        //
        "withtype",
        "withprop",
        "withview",
        "withvtype",
        "withviewtype",
    ],
    keywords_dlr: [
        "$delay",
        "$ldelay",
        //
        "$arrpsz",
        "$arrptrsize",
        //
        "$d2ctype",
        //
        "$effmask",
        "$effmask_ntm",
        "$effmask_exn",
        "$effmask_ref",
        "$effmask_wrt",
        "$effmask_all",
        //
        "$extern",
        "$extkind",
        "$extype",
        "$extype_struct",
        //
        "$extval",
        "$extfcall",
        "$extmcall",
        //
        "$literal",
        //
        "$myfilename",
        "$mylocation",
        "$myfunction",
        //
        "$lst",
        "$lst_t",
        "$lst_vt",
        "$list",
        "$list_t",
        "$list_vt",
        //
        "$rec",
        "$rec_t",
        "$rec_vt",
        "$record",
        "$record_t",
        "$record_vt",
        //
        "$tup",
        "$tup_t",
        "$tup_vt",
        "$tuple",
        "$tuple_t",
        "$tuple_vt",
        //
        "$break",
        "$continue",
        //
        "$raise",
        //
        "$showtype",
        //
        "$vcopyenv_v",
        "$vcopyenv_vt",
        //
        "$tempenver",
        //
        "$solver_assert",
        "$solver_verify",
    ],
    keywords_srp: [
        //
        "#if",
        "#ifdef",
        "#ifndef",
        //
        "#then",
        //
        "#elif",
        "#elifdef",
        "#elifndef",
        //
        "#else",
        "#endif",
        //
        "#error",
        //
        "#prerr",
        "#print",
        //
        "#assert",
        //
        "#undef",
        "#define",
        //
        "#include",
        "#require",
        //
        "#pragma",
        "#codegen2",
        "#codegen3",
    ],
    irregular_keyword_list: [
        "val+",
        "val-",
        "val",
        "case+",
        "case-",
        "case",
        "addr@",
        "addr",
        "fold@",
        "free@",
        "fix@",
        "fix",
        "lam@",
        "lam",
        "llam@",
        "llam",
        "viewt@ype+",
        "viewt@ype-",
        "viewt@ype",
        "viewtype+",
        "viewtype-",
        "viewtype",
        "view+",
        "view-",
        "view@",
        "view",
        "type+",
        "type-",
        "type",
        "vtype+",
        "vtype-",
        "vtype",
        "vt@ype+",
        "vt@ype-",
        "vt@ype",
        "viewt@ype+",
        "viewt@ype-",
        "viewt@ype",
        "viewtype+",
        "viewtype-",
        "viewtype",
        "prop+",
        "prop-",
        "prop",
        "type+",
        "type-",
        "type",
        "t@ype",
        "t@ype+",
        "t@ype-",
        "abst@ype",
        "abstype",
        "absviewt@ype",
        "absvt@ype",
        "for*",
        "for",
        "while*",
        "while"
    ],
    keywords_types: [
        'bool',
        'double',
        'byte',
        'int',
        'short',
        'char',
        'void',
        'unit',
        'long',
        'float',
        'string',
        'strptr'
    ],
    // TODO: reference for this?
    keywords_effects: [
        "0",
        "fun",
        "clo",
        "prf",
        "funclo",
        "cloptr",
        "cloref",
        "ref",
        "ntm",
        "1" // all effects
    ],
    operators: [
        "@",
        "!",
        "|",
        "`",
        ":",
        "$",
        ".",
        "=",
        "#",
        "~",
        //
        "..",
        "...",
        //
        "=>",
        // "=<", // T_EQLT
        "=<>",
        "=/=>",
        "=>>",
        "=/=>>",
        //
        "<",
        ">",
        //
        "><",
        //
        ".<",
        ">.",
        //
        ".<>.",
        //
        "->",
        //"-<", // T_MINUSLT
        "-<>",
    ],
    brackets: [
        { open: ',(', close: ')', token: 'delimiter.parenthesis' },
        { open: '`(', close: ')', token: 'delimiter.parenthesis' },
        { open: '%(', close: ')', token: 'delimiter.parenthesis' },
        { open: '\'(', close: ')', token: 'delimiter.parenthesis' },
        { open: '\'{', close: '}', token: 'delimiter.parenthesis' },
        { open: '@(', close: ')', token: 'delimiter.parenthesis' },
        { open: '@{', close: '}', token: 'delimiter.brace' },
        { open: '@[', close: ']', token: 'delimiter.square' },
        { open: '#[', close: ']', token: 'delimiter.square' },
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
        { open: '<', close: '>', token: 'delimiter.angle' }
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    IDENTFST: /[a-zA-Z_]/,
    IDENTRST: /[a-zA-Z0-9_'$]/,
    symbolic: /[%&+-./:=@~`^|*!$#?<>]/,
    digit: /[0-9]/,
    digitseq0: /@digit*/,
    xdigit: /[0-9A-Za-z]/,
    xdigitseq0: /@xdigit*/,
    INTSP: /[lLuU]/,
    FLOATSP: /[fFlL]/,
    fexponent: /[eE][+-]?[0-9]+/,
    fexponent_bin: /[pP][+-]?[0-9]+/,
    deciexp: /\.[0-9]*@fexponent?/,
    hexiexp: /\.[0-9a-zA-Z]*@fexponent_bin?/,
    irregular_keywords: /val[+-]?|case[+-]?|addr\@?|fold\@|free\@|fix\@?|lam\@?|llam\@?|prop[+-]?|type[+-]?|view[+-@]?|viewt@?ype[+-]?|t@?ype[+-]?|v(iew)?t@?ype[+-]?|abst@?ype|absv(iew)?t@?ype|for\*?|while\*?/,
    ESCHAR: /[ntvbrfa\\\?'"\(\[\{]/,
    start: 'root',
    // The main tokenizer for ATS/Postiats
    // reference: https://github.com/githwxi/ATS-Postiats/blob/master/src/pats_lexing.dats
    tokenizer: {
        root: [
            // lexing_blankseq0
            { regex: /[ \t\r\n]+/, action: { token: '' } },
            // NOTE: (*) is an invalid ML-like comment!
            { regex: /\(\*\)/, action: { token: 'invalid' } },
            { regex: /\(\*/, action: { token: 'comment', next: 'lexing_COMMENT_block_ml' } },
            { regex: /\(/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /\)/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /\[/, action: '@brackets' /*{ token: 'delimiter.bracket' }*/ },
            { regex: /\]/, action: '@brackets' /*{ token: 'delimiter.bracket' }*/ },
            { regex: /\{/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            { regex: /\}/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            // lexing_COMMA
            { regex: /,\(/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /,/, action: { token: 'delimiter.comma' } },
            { regex: /;/, action: { token: 'delimiter.semicolon' } },
            // lexing_AT
            { regex: /@\(/, action: '@brackets' /* { token: 'delimiter.parenthesis' }*/ },
            { regex: /@\[/, action: '@brackets' /* { token: 'delimiter.bracket' }*/ },
            { regex: /@\{/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            // lexing_COLON
            { regex: /:</, action: { token: 'keyword', next: '@lexing_EFFECT_commaseq0' } },
            /*
            lexing_DOT:

            . // SYMBOLIC => lexing_IDENT_sym
            . FLOATDOT => lexing_FLOAT_deciexp
            . DIGIT => T_DOTINT
            */
            { regex: /\.@symbolic+/, action: { token: 'identifier.sym' } },
            // FLOATDOT case
            { regex: /\.@digit*@fexponent@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /\.@digit+/, action: { token: 'number.float' } },
            // lexing_DOLLAR:
            // '$' IDENTFST IDENTRST* => lexing_IDENT_dlr, _ => lexing_IDENT_sym
            {
                regex: /\$@IDENTFST@IDENTRST*/,
                action: {
                    cases: {
                        '@keywords_dlr': { token: 'keyword.dlr' },
                        '@default': { token: 'namespace' },
                    }
                }
            },
            // lexing_SHARP:
            // '#' IDENTFST IDENTRST* => lexing_ident_srp, _ => lexing_IDENT_sym
            {
                regex: /\#@IDENTFST@IDENTRST*/,
                action: {
                    cases: {
                        '@keywords_srp': { token: 'keyword.srp' },
                        '@default': { token: 'identifier' },
                    }
                }
            },
            // lexing_PERCENT:
            { regex: /%\(/, action: { token: 'delimiter.parenthesis' } },
            { regex: /^%{(#|\^|\$)?/, action: { token: 'keyword', next: '@lexing_EXTCODE', nextEmbedded: 'text/javascript' } },
            { regex: /^%}/, action: { token: 'keyword' } },
            // lexing_QUOTE
            { regex: /'\(/, action: { token: 'delimiter.parenthesis' } },
            { regex: /'\[/, action: { token: 'delimiter.bracket' } },
            { regex: /'\{/, action: { token: 'delimiter.brace' } },
            [/(')(\\@ESCHAR|\\[xX]@xdigit+|\\@digit+)(')/, ['string', 'string.escape', 'string']],
            [/'[^\\']'/, 'string'],
            // lexing_DQUOTE
            [/"/, 'string.quote', '@lexing_DQUOTE'],
            // lexing_BQUOTE
            { regex: /`\(/, action: '@brackets' /* { token: 'delimiter.parenthesis' }*/ },
            // TODO: otherwise, try lexing_IDENT_sym
            { regex: /\\/, action: { token: 'punctuation' } },
            // lexing_IDENT_alp:
            // NOTE: (?!regex) is syntax for "not-followed-by" regex
            // to resolve ambiguity such as foreach$fwork being incorrectly lexed as [for] [each$fwork]!
            { regex: /@irregular_keywords(?!@IDENTRST)/, action: { token: 'keyword' } },
            {
                regex: /@IDENTFST@IDENTRST*[<!\[]?/,
                action: {
                    cases: {
                        // TODO: dynload and staload should be specially parsed
                        // dynload whitespace+ "special_string"
                        // this special string is really:
                        //  '/' '\\' '.' => punctuation
                        // ({\$)([a-zA-Z_][a-zA-Z_0-9]*)(}) => punctuation,keyword,punctuation
                        // [^"] => identifier/literal
                        '@keywords': { token: 'keyword' },
                        '@keywords_types': { token: 'type' },
                        '@default': { token: 'identifier' }
                    }
                }
            },
            // lexing_IDENT_sym:
            { regex: /\/\/\/\//, action: { token: 'comment', next: '@lexing_COMMENT_rest' } },
            { regex: /\/\/.*$/, action: { token: 'comment' } },
            { regex: /\/\*/, action: { token: 'comment', next: '@lexing_COMMENT_block_c' } },
            // AS-20160627: specifically for effect annotations
            { regex: /-<|=</, action: { token: 'keyword', next: '@lexing_EFFECT_commaseq0' } },
            {
                regex: /@symbolic+/,
                action: {
                    cases: {
                        '@operators': 'keyword',
                        '@default': 'operator'
                    }
                }
            },
            // lexing_ZERO:
            // FIXME: this one is quite messy/unfinished yet
            // TODO: lexing_INT_hex
            // - testing_hexiexp => lexing_FLOAT_hexiexp
            // - testing_fexponent_bin => lexing_FLOAT_hexiexp
            // - testing_intspseq0 => T_INT_hex
            // lexing_INT_hex:
            { regex: /0[xX]@xdigit+(@hexiexp|@fexponent_bin)@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /0[xX]@xdigit+@INTSP*/, action: { token: 'number.hex' } },
            { regex: /0[0-7]+(?![0-9])@INTSP*/, action: { token: 'number.octal' } },
            //{regex: /0/, action: { token: 'number' } }, // INTZERO
            // lexing_INT_dec:
            // - testing_deciexp => lexing_FLOAT_deciexp
            // - testing_fexponent => lexing_FLOAT_deciexp
            // - otherwise => intspseq0 ([0-9]*[lLuU]?)
            { regex: /@digit+(@fexponent|@deciexp)@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /@digit@digitseq0@INTSP*/, action: { token: 'number.decimal' } },
            // DIGIT, if followed by digitseq0, is lexing_INT_dec
            { regex: /@digit+@INTSP*/, action: { token: 'number' } },
        ],
        lexing_COMMENT_block_ml: [
            [/[^\(\*]+/, 'comment'],
            [/\(\*/, 'comment', '@push'],
            [/\(\*/, 'comment.invalid'],
            [/\*\)/, 'comment', '@pop'],
            [/\*/, 'comment']
        ],
        lexing_COMMENT_block_c: [
            [/[^\/*]+/, 'comment'],
            // [/\/\*/, 'comment', '@push' ],    // nested C-style block comments not allowed
            // [/\/\*/,    'comment.invalid' ],	// NOTE: this breaks block comments in the shape of /* //*/
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        lexing_COMMENT_rest: [
            [/$/, 'comment', '@pop'],
            [/.*/, 'comment']
        ],
        // NOTE: added by AS, specifically for highlighting
        lexing_EFFECT_commaseq0: [
            {
                regex: /@IDENTFST@IDENTRST+|@digit+/,
                action: {
                    cases: {
                        '@keywords_effects': { token: 'type.effect' },
                        '@default': { token: 'identifier' }
                    }
                }
            },
            { regex: /,/, action: { token: 'punctuation' } },
            { regex: />/, action: { token: '@rematch', next: '@pop' } },
        ],
        lexing_EXTCODE: [
            { regex: /^%}/, action: { token: '@rematch', next: '@pop', nextEmbedded: '@pop' } },
            { regex: /[^%]+/, action: '' },
        ],
        lexing_DQUOTE: [
            { regex: /"/, action: { token: 'string.quote', next: '@pop' } },
            // AS-20160628: additional hi-lighting for variables in staload/dynload strings
            { regex: /(\{\$)(@IDENTFST@IDENTRST*)(\})/, action: [{ token: 'string.escape' }, { token: 'identifier' }, { token: 'string.escape' }] },
            { regex: /\\$/, action: { token: 'string.escape' } },
            { regex: /\\(@ESCHAR|[xX]@xdigit+|@digit+)/, action: { token: 'string.escape' } },
            { regex: /[^\\"]+/, action: { token: 'string' } }
        ],
    },
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Bvc3RpYXRzL3Bvc3RpYXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsa0JBQWtCLEtBQUs7QUFDdkI7QUFDQSxTQUFTLHNEQUFzRDtBQUMvRCxTQUFTLFNBQVMsWUFBWSxpQ0FBaUM7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx1QkFBdUI7QUFDckUscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsYUFBYSxzQkFBc0IsdUJBQXVCLEVBQUU7QUFDNUQsYUFBYSxzQkFBc0Isa0NBQWtDLEVBQUU7QUFDdkU7QUFDQTtBQUNBLGFBQWEsWUFBWSxZQUFZLHdEQUF3RCxFQUFFO0FBQy9GLGFBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQSxhQUFhLHNCQUFzQixzQ0FBc0MsRUFBRTtBQUMzRTtBQUNBLGFBQWEsWUFBWSwyQkFBMkIsY0FBYyx5QkFBeUIsR0FBRyxzQkFBc0IsR0FBRyx5QkFBeUIsR0FBRztBQUNuSixhQUFhLHdCQUF3Qix5QkFBeUIsRUFBRTtBQUNoRSxhQUFhLHFEQUFxRCx5QkFBeUIsRUFBRTtBQUM3RixhQUFhLDRCQUE0QixrQkFBa0I7QUFDM0Q7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoiMjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgQXJ0eW9tIFNoYWxraGFrb3YuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiAgQmFzZWQgb24gdGhlIEFUUy9Qb3N0aWF0cyBsZXhlciBieSBIb25nd2VpIFhpLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcvLycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycoKicsICcqKSddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtbJ3snLCAnfSddLCBbJ1snLCAnXSddLCBbJygnLCAnKSddLCBbJzwnLCAnPiddXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICBdXG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICB0b2tlblBvc3RmaXg6ICcucGF0cycsXG4gICAgLy8gVE9ETzogc3RhbG9hZCBhbmQgZHlubG9hZCBhcmUgZm9sbG93ZWQgYnkgYSBzcGVjaWFsIGtpbmQgb2Ygc3RyaW5nIGxpdGVyYWxzXG4gICAgLy8gd2l0aCB7JElERU5USUZFUn0gdmFyaWFibGVzLCBhbmQgaXQgYWxzbyBtYXkgbWFrZSBzZW5zZSB0byBoaWdobGlnaHRcbiAgICAvLyB0aGUgcHVuY3R1YXRpb24gKC4gYW5kIC8gYW5kIFxcKSBkaWZmZXJlbnRseS5cbiAgICAvLyBTZXQgZGVmYXVsdFRva2VuIHRvIGludmFsaWQgdG8gc2VlIHdoYXQgeW91IGRvIG5vdCB0b2tlbml6ZSB5ZXRcbiAgICBkZWZhdWx0VG9rZW46ICdpbnZhbGlkJyxcbiAgICAvLyBrZXl3b3JkIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL2dpdGh3eGkvQVRTLVBvc3RpYXRzL2Jsb2IvbWFzdGVyL3NyYy9wYXRzX2xleGluZ190b2tlbi5kYXRzXG4gICAga2V5d29yZHM6IFtcbiAgICAgICAgLy9cbiAgICAgICAgXCJhYnN0eXBlXCIsXG4gICAgICAgIFwiYWJzdDB5cGVcIixcbiAgICAgICAgXCJhYnNwcm9wXCIsXG4gICAgICAgIFwiYWJzdmlld1wiLFxuICAgICAgICBcImFic3Z0eXBlXCIsXG4gICAgICAgIFwiYWJzdmlld3R5cGVcIixcbiAgICAgICAgXCJhYnN2dDB5cGVcIixcbiAgICAgICAgXCJhYnN2aWV3dDB5cGVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJhc1wiLFxuICAgICAgICAvL1xuICAgICAgICBcImFuZFwiLFxuICAgICAgICAvL1xuICAgICAgICBcImFzc3VtZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcImJlZ2luXCIsXG4gICAgICAgIC8vXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJjYXNlXCIsIC8vIENBU0VcbiAgICAgICAgKi9cbiAgICAgICAgLy9cbiAgICAgICAgXCJjbGFzc2RlY1wiLFxuICAgICAgICAvL1xuICAgICAgICBcImRhdGFzb3J0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZGF0YXR5cGVcIixcbiAgICAgICAgXCJkYXRhcHJvcFwiLFxuICAgICAgICBcImRhdGF2aWV3XCIsXG4gICAgICAgIFwiZGF0YXZ0eXBlXCIsXG4gICAgICAgIFwiZGF0YXZpZXd0eXBlXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZG9cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJlbmRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJleHRlcm5cIixcbiAgICAgICAgXCJleHR5cGVcIixcbiAgICAgICAgXCJleHR2YXJcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJleGNlcHRpb25cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJmblwiLFxuICAgICAgICBcImZueFwiLFxuICAgICAgICBcImZ1blwiLFxuICAgICAgICAvL1xuICAgICAgICBcInByZm5cIixcbiAgICAgICAgXCJwcmZ1blwiLFxuICAgICAgICAvL1xuICAgICAgICBcInByYXhpXCIsXG4gICAgICAgIFwiY2FzdGZuXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiaWZcIixcbiAgICAgICAgXCJ0aGVuXCIsXG4gICAgICAgIFwiZWxzZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcImlmY2FzZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcImluXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiaW5maXhcIixcbiAgICAgICAgXCJpbmZpeGxcIixcbiAgICAgICAgXCJpbmZpeHJcIixcbiAgICAgICAgXCJwcmVmaXhcIixcbiAgICAgICAgXCJwb3N0Zml4XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiaW1wbG1udFwiLFxuICAgICAgICBcImltcGxlbWVudFwiLFxuICAgICAgICAvL1xuICAgICAgICBcInByaW1wbG1udFwiLFxuICAgICAgICBcInByaW1wbGVtZW50XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiaW1wb3J0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJsYW1cIiwgLy8gTEFNXG4gICAgICAgICAgICAgICAgXCJsbGFtXCIsIC8vIExMQU1cbiAgICAgICAgICAgICAgICBcImZpeFwiLCAvLyBGSVhcbiAgICAgICAgKi9cbiAgICAgICAgLy9cbiAgICAgICAgXCJsZXRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJsb2NhbFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIm1hY2RlZlwiLFxuICAgICAgICBcIm1hY3JvZGVmXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwibm9uZml4XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwic3ltZWxpbVwiLFxuICAgICAgICBcInN5bWludHJcIixcbiAgICAgICAgXCJvdmVybG9hZFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIm9mXCIsXG4gICAgICAgIFwib3BcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJyZWNcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJzaWZcIixcbiAgICAgICAgXCJzY2FzZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcInNvcnRkZWZcIixcbiAgICAgICAgLypcbiAgICAgICAgLy8gSFg6IFtzdGFdIGlzIG5vdyBkZXByZWNhdGVkXG4gICAgICAgICovXG4gICAgICAgIFwic3RhXCIsXG4gICAgICAgIFwic3RhY3N0XCIsXG4gICAgICAgIFwic3RhZGVmXCIsXG4gICAgICAgIFwic3RhdGljXCIsXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJzdGF2YXJcIiwgLy8gVF9TVEFWQVJcbiAgICAgICAgKi9cbiAgICAgICAgLy9cbiAgICAgICAgXCJzdGFsb2FkXCIsXG4gICAgICAgIFwiZHlubG9hZFwiLFxuICAgICAgICAvL1xuICAgICAgICBcInRyeVwiLFxuICAgICAgICAvL1xuICAgICAgICBcInRraW5kZWZcIixcbiAgICAgICAgLy9cbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICBcInR5cGVcIiwgLy8gVFlQRVxuICAgICAgICAqL1xuICAgICAgICBcInR5cGVkZWZcIixcbiAgICAgICAgXCJwcm9wZGVmXCIsXG4gICAgICAgIFwidmlld2RlZlwiLFxuICAgICAgICBcInZ0eXBlZGVmXCIsXG4gICAgICAgIFwidmlld3R5cGVkZWZcIixcbiAgICAgICAgLy9cbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICBcInZhbFwiLCAvLyBWQUxcbiAgICAgICAgKi9cbiAgICAgICAgXCJwcnZhbFwiLFxuICAgICAgICAvL1xuICAgICAgICBcInZhclwiLFxuICAgICAgICBcInBydmFyXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwid2hlblwiLFxuICAgICAgICBcIndoZXJlXCIsXG4gICAgICAgIC8vXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJmb3JcIiwgLy8gVF9GT1JcbiAgICAgICAgICAgICAgICBcIndoaWxlXCIsIC8vIFRfV0hJTEVcbiAgICAgICAgKi9cbiAgICAgICAgLy9cbiAgICAgICAgXCJ3aXRoXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwid2l0aHR5cGVcIixcbiAgICAgICAgXCJ3aXRocHJvcFwiLFxuICAgICAgICBcIndpdGh2aWV3XCIsXG4gICAgICAgIFwid2l0aHZ0eXBlXCIsXG4gICAgICAgIFwid2l0aHZpZXd0eXBlXCIsXG4gICAgXSxcbiAgICBrZXl3b3Jkc19kbHI6IFtcbiAgICAgICAgXCIkZGVsYXlcIixcbiAgICAgICAgXCIkbGRlbGF5XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJGFycnBzelwiLFxuICAgICAgICBcIiRhcnJwdHJzaXplXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJGQyY3R5cGVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkZWZmbWFza1wiLFxuICAgICAgICBcIiRlZmZtYXNrX250bVwiLFxuICAgICAgICBcIiRlZmZtYXNrX2V4blwiLFxuICAgICAgICBcIiRlZmZtYXNrX3JlZlwiLFxuICAgICAgICBcIiRlZmZtYXNrX3dydFwiLFxuICAgICAgICBcIiRlZmZtYXNrX2FsbFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRleHRlcm5cIixcbiAgICAgICAgXCIkZXh0a2luZFwiLFxuICAgICAgICBcIiRleHR5cGVcIixcbiAgICAgICAgXCIkZXh0eXBlX3N0cnVjdFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRleHR2YWxcIixcbiAgICAgICAgXCIkZXh0ZmNhbGxcIixcbiAgICAgICAgXCIkZXh0bWNhbGxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkbGl0ZXJhbFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRteWZpbGVuYW1lXCIsXG4gICAgICAgIFwiJG15bG9jYXRpb25cIixcbiAgICAgICAgXCIkbXlmdW5jdGlvblwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRsc3RcIixcbiAgICAgICAgXCIkbHN0X3RcIixcbiAgICAgICAgXCIkbHN0X3Z0XCIsXG4gICAgICAgIFwiJGxpc3RcIixcbiAgICAgICAgXCIkbGlzdF90XCIsXG4gICAgICAgIFwiJGxpc3RfdnRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkcmVjXCIsXG4gICAgICAgIFwiJHJlY190XCIsXG4gICAgICAgIFwiJHJlY192dFwiLFxuICAgICAgICBcIiRyZWNvcmRcIixcbiAgICAgICAgXCIkcmVjb3JkX3RcIixcbiAgICAgICAgXCIkcmVjb3JkX3Z0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJHR1cFwiLFxuICAgICAgICBcIiR0dXBfdFwiLFxuICAgICAgICBcIiR0dXBfdnRcIixcbiAgICAgICAgXCIkdHVwbGVcIixcbiAgICAgICAgXCIkdHVwbGVfdFwiLFxuICAgICAgICBcIiR0dXBsZV92dFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRicmVha1wiLFxuICAgICAgICBcIiRjb250aW51ZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRyYWlzZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRzaG93dHlwZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiR2Y29weWVudl92XCIsXG4gICAgICAgIFwiJHZjb3B5ZW52X3Z0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJHRlbXBlbnZlclwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRzb2x2ZXJfYXNzZXJ0XCIsXG4gICAgICAgIFwiJHNvbHZlcl92ZXJpZnlcIixcbiAgICBdLFxuICAgIGtleXdvcmRzX3NycDogW1xuICAgICAgICAvL1xuICAgICAgICBcIiNpZlwiLFxuICAgICAgICBcIiNpZmRlZlwiLFxuICAgICAgICBcIiNpZm5kZWZcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjdGhlblwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNlbGlmXCIsXG4gICAgICAgIFwiI2VsaWZkZWZcIixcbiAgICAgICAgXCIjZWxpZm5kZWZcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjZWxzZVwiLFxuICAgICAgICBcIiNlbmRpZlwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNlcnJvclwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNwcmVyclwiLFxuICAgICAgICBcIiNwcmludFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNhc3NlcnRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjdW5kZWZcIixcbiAgICAgICAgXCIjZGVmaW5lXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiI2luY2x1ZGVcIixcbiAgICAgICAgXCIjcmVxdWlyZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNwcmFnbWFcIixcbiAgICAgICAgXCIjY29kZWdlbjJcIixcbiAgICAgICAgXCIjY29kZWdlbjNcIixcbiAgICBdLFxuICAgIGlycmVndWxhcl9rZXl3b3JkX2xpc3Q6IFtcbiAgICAgICAgXCJ2YWwrXCIsXG4gICAgICAgIFwidmFsLVwiLFxuICAgICAgICBcInZhbFwiLFxuICAgICAgICBcImNhc2UrXCIsXG4gICAgICAgIFwiY2FzZS1cIixcbiAgICAgICAgXCJjYXNlXCIsXG4gICAgICAgIFwiYWRkckBcIixcbiAgICAgICAgXCJhZGRyXCIsXG4gICAgICAgIFwiZm9sZEBcIixcbiAgICAgICAgXCJmcmVlQFwiLFxuICAgICAgICBcImZpeEBcIixcbiAgICAgICAgXCJmaXhcIixcbiAgICAgICAgXCJsYW1AXCIsXG4gICAgICAgIFwibGFtXCIsXG4gICAgICAgIFwibGxhbUBcIixcbiAgICAgICAgXCJsbGFtXCIsXG4gICAgICAgIFwidmlld3RAeXBlK1wiLFxuICAgICAgICBcInZpZXd0QHlwZS1cIixcbiAgICAgICAgXCJ2aWV3dEB5cGVcIixcbiAgICAgICAgXCJ2aWV3dHlwZStcIixcbiAgICAgICAgXCJ2aWV3dHlwZS1cIixcbiAgICAgICAgXCJ2aWV3dHlwZVwiLFxuICAgICAgICBcInZpZXcrXCIsXG4gICAgICAgIFwidmlldy1cIixcbiAgICAgICAgXCJ2aWV3QFwiLFxuICAgICAgICBcInZpZXdcIixcbiAgICAgICAgXCJ0eXBlK1wiLFxuICAgICAgICBcInR5cGUtXCIsXG4gICAgICAgIFwidHlwZVwiLFxuICAgICAgICBcInZ0eXBlK1wiLFxuICAgICAgICBcInZ0eXBlLVwiLFxuICAgICAgICBcInZ0eXBlXCIsXG4gICAgICAgIFwidnRAeXBlK1wiLFxuICAgICAgICBcInZ0QHlwZS1cIixcbiAgICAgICAgXCJ2dEB5cGVcIixcbiAgICAgICAgXCJ2aWV3dEB5cGUrXCIsXG4gICAgICAgIFwidmlld3RAeXBlLVwiLFxuICAgICAgICBcInZpZXd0QHlwZVwiLFxuICAgICAgICBcInZpZXd0eXBlK1wiLFxuICAgICAgICBcInZpZXd0eXBlLVwiLFxuICAgICAgICBcInZpZXd0eXBlXCIsXG4gICAgICAgIFwicHJvcCtcIixcbiAgICAgICAgXCJwcm9wLVwiLFxuICAgICAgICBcInByb3BcIixcbiAgICAgICAgXCJ0eXBlK1wiLFxuICAgICAgICBcInR5cGUtXCIsXG4gICAgICAgIFwidHlwZVwiLFxuICAgICAgICBcInRAeXBlXCIsXG4gICAgICAgIFwidEB5cGUrXCIsXG4gICAgICAgIFwidEB5cGUtXCIsXG4gICAgICAgIFwiYWJzdEB5cGVcIixcbiAgICAgICAgXCJhYnN0eXBlXCIsXG4gICAgICAgIFwiYWJzdmlld3RAeXBlXCIsXG4gICAgICAgIFwiYWJzdnRAeXBlXCIsXG4gICAgICAgIFwiZm9yKlwiLFxuICAgICAgICBcImZvclwiLFxuICAgICAgICBcIndoaWxlKlwiLFxuICAgICAgICBcIndoaWxlXCJcbiAgICBdLFxuICAgIGtleXdvcmRzX3R5cGVzOiBbXG4gICAgICAgICdib29sJyxcbiAgICAgICAgJ2RvdWJsZScsXG4gICAgICAgICdieXRlJyxcbiAgICAgICAgJ2ludCcsXG4gICAgICAgICdzaG9ydCcsXG4gICAgICAgICdjaGFyJyxcbiAgICAgICAgJ3ZvaWQnLFxuICAgICAgICAndW5pdCcsXG4gICAgICAgICdsb25nJyxcbiAgICAgICAgJ2Zsb2F0JyxcbiAgICAgICAgJ3N0cmluZycsXG4gICAgICAgICdzdHJwdHInXG4gICAgXSxcbiAgICAvLyBUT0RPOiByZWZlcmVuY2UgZm9yIHRoaXM/XG4gICAga2V5d29yZHNfZWZmZWN0czogW1xuICAgICAgICBcIjBcIixcbiAgICAgICAgXCJmdW5cIixcbiAgICAgICAgXCJjbG9cIixcbiAgICAgICAgXCJwcmZcIixcbiAgICAgICAgXCJmdW5jbG9cIixcbiAgICAgICAgXCJjbG9wdHJcIixcbiAgICAgICAgXCJjbG9yZWZcIixcbiAgICAgICAgXCJyZWZcIixcbiAgICAgICAgXCJudG1cIixcbiAgICAgICAgXCIxXCIgLy8gYWxsIGVmZmVjdHNcbiAgICBdLFxuICAgIG9wZXJhdG9yczogW1xuICAgICAgICBcIkBcIixcbiAgICAgICAgXCIhXCIsXG4gICAgICAgIFwifFwiLFxuICAgICAgICBcImBcIixcbiAgICAgICAgXCI6XCIsXG4gICAgICAgIFwiJFwiLFxuICAgICAgICBcIi5cIixcbiAgICAgICAgXCI9XCIsXG4gICAgICAgIFwiI1wiLFxuICAgICAgICBcIn5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIuLlwiLFxuICAgICAgICBcIi4uLlwiLFxuICAgICAgICAvL1xuICAgICAgICBcIj0+XCIsXG4gICAgICAgIC8vIFwiPTxcIiwgLy8gVF9FUUxUXG4gICAgICAgIFwiPTw+XCIsXG4gICAgICAgIFwiPS89PlwiLFxuICAgICAgICBcIj0+PlwiLFxuICAgICAgICBcIj0vPT4+XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiPFwiLFxuICAgICAgICBcIj5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCI+PFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIi48XCIsXG4gICAgICAgIFwiPi5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIuPD4uXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiLT5cIixcbiAgICAgICAgLy9cIi08XCIsIC8vIFRfTUlOVVNMVFxuICAgICAgICBcIi08PlwiLFxuICAgIF0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyBvcGVuOiAnLCgnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAnYCgnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAnJSgnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnKCcsIGNsb3NlOiAnKScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCd7JywgY2xvc2U6ICd9JywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJ0AoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJ0B7JywgY2xvc2U6ICd9JywgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2UnIH0sXG4gICAgICAgIHsgb3BlbjogJ0BbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJyB9LFxuICAgICAgICB7IG9wZW46ICcjWycsIGNsb3NlOiAnXScsIHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScgfSxcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJzwnLCBjbG9zZTogJz4nLCB0b2tlbjogJ2RlbGltaXRlci5hbmdsZScgfVxuICAgIF0sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICAgIElERU5URlNUOiAvW2EtekEtWl9dLyxcbiAgICBJREVOVFJTVDogL1thLXpBLVowLTlfJyRdLyxcbiAgICBzeW1ib2xpYzogL1slJistLi86PUB+YF58KiEkIz88Pl0vLFxuICAgIGRpZ2l0OiAvWzAtOV0vLFxuICAgIGRpZ2l0c2VxMDogL0BkaWdpdCovLFxuICAgIHhkaWdpdDogL1swLTlBLVphLXpdLyxcbiAgICB4ZGlnaXRzZXEwOiAvQHhkaWdpdCovLFxuICAgIElOVFNQOiAvW2xMdVVdLyxcbiAgICBGTE9BVFNQOiAvW2ZGbExdLyxcbiAgICBmZXhwb25lbnQ6IC9bZUVdWystXT9bMC05XSsvLFxuICAgIGZleHBvbmVudF9iaW46IC9bcFBdWystXT9bMC05XSsvLFxuICAgIGRlY2lleHA6IC9cXC5bMC05XSpAZmV4cG9uZW50Py8sXG4gICAgaGV4aWV4cDogL1xcLlswLTlhLXpBLVpdKkBmZXhwb25lbnRfYmluPy8sXG4gICAgaXJyZWd1bGFyX2tleXdvcmRzOiAvdmFsWystXT98Y2FzZVsrLV0/fGFkZHJcXEA/fGZvbGRcXEB8ZnJlZVxcQHxmaXhcXEA/fGxhbVxcQD98bGxhbVxcQD98cHJvcFsrLV0/fHR5cGVbKy1dP3x2aWV3WystQF0/fHZpZXd0QD95cGVbKy1dP3x0QD95cGVbKy1dP3x2KGlldyk/dEA/eXBlWystXT98YWJzdEA/eXBlfGFic3YoaWV3KT90QD95cGV8Zm9yXFwqP3x3aGlsZVxcKj8vLFxuICAgIEVTQ0hBUjogL1tudHZicmZhXFxcXFxcPydcIlxcKFxcW1xce10vLFxuICAgIHN0YXJ0OiAncm9vdCcsXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBBVFMvUG9zdGlhdHNcbiAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9naXRod3hpL0FUUy1Qb3N0aWF0cy9ibG9iL21hc3Rlci9zcmMvcGF0c19sZXhpbmcuZGF0c1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBsZXhpbmdfYmxhbmtzZXEwXG4gICAgICAgICAgICB7IHJlZ2V4OiAvWyBcXHRcXHJcXG5dKy8sIGFjdGlvbjogeyB0b2tlbjogJycgfSB9LFxuICAgICAgICAgICAgLy8gTk9URTogKCopIGlzIGFuIGludmFsaWQgTUwtbGlrZSBjb21tZW50IVxuICAgICAgICAgICAgeyByZWdleDogL1xcKFxcKlxcKS8sIGFjdGlvbjogeyB0b2tlbjogJ2ludmFsaWQnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXChcXCovLCBhY3Rpb246IHsgdG9rZW46ICdjb21tZW50JywgbmV4dDogJ2xleGluZ19DT01NRU5UX2Jsb2NrX21sJyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwoLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKnsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0qLyB9LFxuICAgICAgICAgICAgeyByZWdleDogL1xcKS8sIGFjdGlvbjogJ0BicmFja2V0cycgLyp7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXFsvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0JyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXF0vLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0JyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXHsvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5icmFjZScgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFx9LywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKnsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2UnIH0qLyB9LFxuICAgICAgICAgICAgLy8gbGV4aW5nX0NPTU1BXG4gICAgICAgICAgICB7IHJlZ2V4OiAvLFxcKC8sIGFjdGlvbjogJ0BicmFja2V0cycgLyp7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8sLywgYWN0aW9uOiB7IHRva2VuOiAnZGVsaW1pdGVyLmNvbW1hJyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvOy8sIGFjdGlvbjogeyB0b2tlbjogJ2RlbGltaXRlci5zZW1pY29sb24nIH0gfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19BVFxuICAgICAgICAgICAgeyByZWdleDogL0BcXCgvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0qLyB9LFxuICAgICAgICAgICAgeyByZWdleDogL0BcXFsvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qIHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvQFxcey8sIGFjdGlvbjogJ0BicmFja2V0cycgLyp7IHRva2VuOiAnZGVsaW1pdGVyLmJyYWNlJyB9Ki8gfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19DT0xPTlxuICAgICAgICAgICAgeyByZWdleDogLzo8LywgYWN0aW9uOiB7IHRva2VuOiAna2V5d29yZCcsIG5leHQ6ICdAbGV4aW5nX0VGRkVDVF9jb21tYXNlcTAnIH0gfSxcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBsZXhpbmdfRE9UOlxuXG4gICAgICAgICAgICAuIC8vIFNZTUJPTElDID0+IGxleGluZ19JREVOVF9zeW1cbiAgICAgICAgICAgIC4gRkxPQVRET1QgPT4gbGV4aW5nX0ZMT0FUX2RlY2lleHBcbiAgICAgICAgICAgIC4gRElHSVQgPT4gVF9ET1RJTlRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwuQHN5bWJvbGljKy8sIGFjdGlvbjogeyB0b2tlbjogJ2lkZW50aWZpZXIuc3ltJyB9IH0sXG4gICAgICAgICAgICAvLyBGTE9BVERPVCBjYXNlXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwuQGRpZ2l0KkBmZXhwb25lbnRARkxPQVRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXIuZmxvYXQnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXC5AZGlnaXQrLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyLmZsb2F0JyB9IH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfRE9MTEFSOlxuICAgICAgICAgICAgLy8gJyQnIElERU5URlNUIElERU5UUlNUKiA9PiBsZXhpbmdfSURFTlRfZGxyLCBfID0+IGxleGluZ19JREVOVF9zeW1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWdleDogL1xcJEBJREVOVEZTVEBJREVOVFJTVCovLFxuICAgICAgICAgICAgICAgIGFjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkc19kbHInOiB7IHRva2VuOiAna2V5d29yZC5kbHInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiAnbmFtZXNwYWNlJyB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19TSEFSUDpcbiAgICAgICAgICAgIC8vICcjJyBJREVOVEZTVCBJREVOVFJTVCogPT4gbGV4aW5nX2lkZW50X3NycCwgXyA9PiBsZXhpbmdfSURFTlRfc3ltXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCNASURFTlRGU1RASURFTlRSU1QqLyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHNfc3JwJzogeyB0b2tlbjogJ2tleXdvcmQuc3JwJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ2lkZW50aWZpZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbGV4aW5nX1BFUkNFTlQ6XG4gICAgICAgICAgICB7IHJlZ2V4OiAvJVxcKC8sIGFjdGlvbjogeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL14leygjfFxcXnxcXCQpPy8sIGFjdGlvbjogeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGxleGluZ19FWFRDT0RFJywgbmV4dEVtYmVkZGVkOiAndGV4dC9qYXZhc2NyaXB0JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXiV9LywgYWN0aW9uOiB7IHRva2VuOiAna2V5d29yZCcgfSB9LFxuICAgICAgICAgICAgLy8gbGV4aW5nX1FVT1RFXG4gICAgICAgICAgICB7IHJlZ2V4OiAvJ1xcKC8sIGFjdGlvbjogeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogLydcXFsvLCBhY3Rpb246IHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogLydcXHsvLCBhY3Rpb246IHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2UnIH0gfSxcbiAgICAgICAgICAgIFsvKCcpKFxcXFxARVNDSEFSfFxcXFxbeFhdQHhkaWdpdCt8XFxcXEBkaWdpdCspKCcpLywgWydzdHJpbmcnLCAnc3RyaW5nLmVzY2FwZScsICdzdHJpbmcnXV0sXG4gICAgICAgICAgICBbLydbXlxcXFwnXScvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICAvLyBsZXhpbmdfRFFVT1RFXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZy5xdW90ZScsICdAbGV4aW5nX0RRVU9URSddLFxuICAgICAgICAgICAgLy8gbGV4aW5nX0JRVU9URVxuICAgICAgICAgICAgeyByZWdleDogL2BcXCgvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0qLyB9LFxuICAgICAgICAgICAgLy8gVE9ETzogb3RoZXJ3aXNlLCB0cnkgbGV4aW5nX0lERU5UX3N5bVxuICAgICAgICAgICAgeyByZWdleDogL1xcXFwvLCBhY3Rpb246IHsgdG9rZW46ICdwdW5jdHVhdGlvbicgfSB9LFxuICAgICAgICAgICAgLy8gbGV4aW5nX0lERU5UX2FscDpcbiAgICAgICAgICAgIC8vIE5PVEU6ICg/IXJlZ2V4KSBpcyBzeW50YXggZm9yIFwibm90LWZvbGxvd2VkLWJ5XCIgcmVnZXhcbiAgICAgICAgICAgIC8vIHRvIHJlc29sdmUgYW1iaWd1aXR5IHN1Y2ggYXMgZm9yZWFjaCRmd29yayBiZWluZyBpbmNvcnJlY3RseSBsZXhlZCBhcyBbZm9yXSBbZWFjaCRmd29ya10hXG4gICAgICAgICAgICB7IHJlZ2V4OiAvQGlycmVndWxhcl9rZXl3b3Jkcyg/IUBJREVOVFJTVCkvLCBhY3Rpb246IHsgdG9rZW46ICdrZXl3b3JkJyB9IH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9ASURFTlRGU1RASURFTlRSU1QqWzwhXFxbXT8vLFxuICAgICAgICAgICAgICAgIGFjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZHlubG9hZCBhbmQgc3RhbG9hZCBzaG91bGQgYmUgc3BlY2lhbGx5IHBhcnNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHlubG9hZCB3aGl0ZXNwYWNlKyBcInNwZWNpYWxfc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgc3BlY2lhbCBzdHJpbmcgaXMgcmVhbGx5OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICcvJyAnXFxcXCcgJy4nID0+IHB1bmN0dWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAoe1xcJCkoW2EtekEtWl9dW2EtekEtWl8wLTldKikofSkgPT4gcHVuY3R1YXRpb24sa2V5d29yZCxwdW5jdHVhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gW15cIl0gPT4gaWRlbnRpZmllci9saXRlcmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzX3R5cGVzJzogeyB0b2tlbjogJ3R5cGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiAnaWRlbnRpZmllcicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19JREVOVF9zeW06XG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwvXFwvXFwvXFwvLywgYWN0aW9uOiB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAbGV4aW5nX0NPTU1FTlRfcmVzdCcgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL1xcL1xcLy4qJC8sIGFjdGlvbjogeyB0b2tlbjogJ2NvbW1lbnQnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXC9cXCovLCBhY3Rpb246IHsgdG9rZW46ICdjb21tZW50JywgbmV4dDogJ0BsZXhpbmdfQ09NTUVOVF9ibG9ja19jJyB9IH0sXG4gICAgICAgICAgICAvLyBBUy0yMDE2MDYyNzogc3BlY2lmaWNhbGx5IGZvciBlZmZlY3QgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgIHsgcmVnZXg6IC8tPHw9PC8sIGFjdGlvbjogeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGxleGluZ19FRkZFQ1RfY29tbWFzZXEwJyB9IH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9Ac3ltYm9saWMrLyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAb3BlcmF0b3JzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ29wZXJhdG9yJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19aRVJPOlxuICAgICAgICAgICAgLy8gRklYTUU6IHRoaXMgb25lIGlzIHF1aXRlIG1lc3N5L3VuZmluaXNoZWQgeWV0XG4gICAgICAgICAgICAvLyBUT0RPOiBsZXhpbmdfSU5UX2hleFxuICAgICAgICAgICAgLy8gLSB0ZXN0aW5nX2hleGlleHAgPT4gbGV4aW5nX0ZMT0FUX2hleGlleHBcbiAgICAgICAgICAgIC8vIC0gdGVzdGluZ19mZXhwb25lbnRfYmluID0+IGxleGluZ19GTE9BVF9oZXhpZXhwXG4gICAgICAgICAgICAvLyAtIHRlc3RpbmdfaW50c3BzZXEwID0+IFRfSU5UX2hleFxuICAgICAgICAgICAgLy8gbGV4aW5nX0lOVF9oZXg6XG4gICAgICAgICAgICB7IHJlZ2V4OiAvMFt4WF1AeGRpZ2l0KyhAaGV4aWV4cHxAZmV4cG9uZW50X2JpbilARkxPQVRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXIuZmxvYXQnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8wW3hYXUB4ZGlnaXQrQElOVFNQKi8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlci5oZXgnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8wWzAtN10rKD8hWzAtOV0pQElOVFNQKi8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlci5vY3RhbCcgfSB9LFxuICAgICAgICAgICAgLy97cmVnZXg6IC8wLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyJyB9IH0sIC8vIElOVFpFUk9cbiAgICAgICAgICAgIC8vIGxleGluZ19JTlRfZGVjOlxuICAgICAgICAgICAgLy8gLSB0ZXN0aW5nX2RlY2lleHAgPT4gbGV4aW5nX0ZMT0FUX2RlY2lleHBcbiAgICAgICAgICAgIC8vIC0gdGVzdGluZ19mZXhwb25lbnQgPT4gbGV4aW5nX0ZMT0FUX2RlY2lleHBcbiAgICAgICAgICAgIC8vIC0gb3RoZXJ3aXNlID0+IGludHNwc2VxMCAoWzAtOV0qW2xMdVVdPylcbiAgICAgICAgICAgIHsgcmVnZXg6IC9AZGlnaXQrKEBmZXhwb25lbnR8QGRlY2lleHApQEZMT0FUU1AqLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyLmZsb2F0JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvQGRpZ2l0QGRpZ2l0c2VxMEBJTlRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXIuZGVjaW1hbCcgfSB9LFxuICAgICAgICAgICAgLy8gRElHSVQsIGlmIGZvbGxvd2VkIGJ5IGRpZ2l0c2VxMCwgaXMgbGV4aW5nX0lOVF9kZWNcbiAgICAgICAgICAgIHsgcmVnZXg6IC9AZGlnaXQrQElOVFNQKi8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlcicgfSB9LFxuICAgICAgICBdLFxuICAgICAgICBsZXhpbmdfQ09NTUVOVF9ibG9ja19tbDogW1xuICAgICAgICAgICAgWy9bXlxcKFxcKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwoXFwqLywgJ2NvbW1lbnQnLCAnQHB1c2gnXSxcbiAgICAgICAgICAgIFsvXFwoXFwqLywgJ2NvbW1lbnQuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cXCpcXCkvLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1xcKi8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgbGV4aW5nX0NPTU1FTlRfYmxvY2tfYzogW1xuICAgICAgICAgICAgWy9bXlxcLypdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICAvLyBbL1xcL1xcKi8sICdjb21tZW50JywgJ0BwdXNoJyBdLCAgICAvLyBuZXN0ZWQgQy1zdHlsZSBibG9jayBjb21tZW50cyBub3QgYWxsb3dlZFxuICAgICAgICAgICAgLy8gWy9cXC9cXCovLCAgICAnY29tbWVudC5pbnZhbGlkJyBdLFx0Ly8gTk9URTogdGhpcyBicmVha3MgYmxvY2sgY29tbWVudHMgaW4gdGhlIHNoYXBlIG9mIC8qIC8vKi9cbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXFwvKl0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIGxleGluZ19DT01NRU5UX3Jlc3Q6IFtcbiAgICAgICAgICAgIFsvJC8sICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvLiovLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIE5PVEU6IGFkZGVkIGJ5IEFTLCBzcGVjaWZpY2FsbHkgZm9yIGhpZ2hsaWdodGluZ1xuICAgICAgICBsZXhpbmdfRUZGRUNUX2NvbW1hc2VxMDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvQElERU5URlNUQElERU5UUlNUK3xAZGlnaXQrLyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHNfZWZmZWN0cyc6IHsgdG9rZW46ICd0eXBlLmVmZmVjdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdpZGVudGlmaWVyJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyByZWdleDogLywvLCBhY3Rpb246IHsgdG9rZW46ICdwdW5jdHVhdGlvbicgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogLz4vLCBhY3Rpb246IHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9IH0sXG4gICAgICAgIF0sXG4gICAgICAgIGxleGluZ19FWFRDT0RFOiBbXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXiV9LywgYWN0aW9uOiB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9bXiVdKy8sIGFjdGlvbjogJycgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGV4aW5nX0RRVU9URTogW1xuICAgICAgICAgICAgeyByZWdleDogL1wiLywgYWN0aW9uOiB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgbmV4dDogJ0Bwb3AnIH0gfSxcbiAgICAgICAgICAgIC8vIEFTLTIwMTYwNjI4OiBhZGRpdGlvbmFsIGhpLWxpZ2h0aW5nIGZvciB2YXJpYWJsZXMgaW4gc3RhbG9hZC9keW5sb2FkIHN0cmluZ3NcbiAgICAgICAgICAgIHsgcmVnZXg6IC8oXFx7XFwkKShASURFTlRGU1RASURFTlRSU1QqKShcXH0pLywgYWN0aW9uOiBbeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnIH0sIHsgdG9rZW46ICdpZGVudGlmaWVyJyB9LCB7IHRva2VuOiAnc3RyaW5nLmVzY2FwZScgfV0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXFxcJC8sIGFjdGlvbjogeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXFxcKEBFU0NIQVJ8W3hYXUB4ZGlnaXQrfEBkaWdpdCspLywgYWN0aW9uOiB7IHRva2VuOiAnc3RyaW5nLmVzY2FwZScgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL1teXFxcXFwiXSsvLCBhY3Rpb246IHsgdG9rZW46ICdzdHJpbmcnIH0gfVxuICAgICAgICBdLFxuICAgIH0sXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Bvc3RpYXRzL3Bvc3RpYXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcG9zdGlhdHMvcG9zdGlhdHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyNCJdLCJzb3VyY2VSb290IjoiIn0=