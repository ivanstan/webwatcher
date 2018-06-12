webpackJsonp([16],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.js ***!
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
        lineComment: '#',
        blockComment: ['=begin', '=end'],
    },
    brackets: [
        ['(', ')'],
        ['{', '}'],
        ['[', ']']
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
    ]
};
/*
 * Ruby language definition
 *
 * Quite a complex language due to elaborate escape sequences
 * and quoting of literate strings/regular expressions, and
 * an 'end' keyword that does not always apply to modifiers like until and while,
 * and a 'do' keyword that sometimes starts a block, but sometimes is part of
 * another statement (like 'while').
 *
 * (1) end blocks:
 * 'end' may end declarations like if or until, but sometimes 'if' or 'until'
 * are modifiers where there is no 'end'. Also, 'do' sometimes starts a block
 * that is ended by 'end', but sometimes it is part of a 'while', 'for', or 'until'
 * To do proper brace matching we do some elaborate state manipulation.
 * some examples:
 *
 *   until bla do
 *     work until tired
 *     list.each do
 *       something if test
 *     end
 *   end
 *
 * or
 *
 * if test
 *  something (if test then x end)
 *  bar if bla
 * end
 *
 * or, how about using class as a property..
 *
 * class Test
 *   def endpoint
 *     self.class.endpoint || routes
 *   end
 * end
 *
 * (2) quoting:
 * there are many kinds of strings and escape sequences. But also, one can
 * start many string-like things as '%qx' where q specifies the kind of string
 * (like a command, escape expanded, regular expression, symbol etc.), and x is
 * some character and only another 'x' ends the sequence. Except for brackets
 * where the closing bracket ends the sequence.. and except for a nested bracket
 * inside the string like entity. Also, such strings can contain interpolated
 * ruby expressions again (and span multiple lines). Moreover, expanded
 * regular expression can also contain comments.
 */
var language = {
    tokenPostfix: '.ruby',
    keywords: [
        '__LINE__', '__ENCODING__', '__FILE__', 'BEGIN', 'END', 'alias', 'and', 'begin',
        'break', 'case', 'class', 'def', 'defined?', 'do', 'else', 'elsif', 'end',
        'ensure', 'for', 'false', 'if', 'in', 'module', 'next', 'nil', 'not', 'or', 'redo',
        'rescue', 'retry', 'return', 'self', 'super', 'then', 'true', 'undef', 'unless',
        'until', 'when', 'while', 'yield',
    ],
    keywordops: [
        '::', '..', '...', '?', ':', '=>'
    ],
    builtins: [
        'require', 'public', 'private', 'include', 'extend', 'attr_reader',
        'protected', 'private_class_method', 'protected_class_method', 'new'
    ],
    // these are closed by 'end' (if, while and until are handled separately)
    declarations: [
        'module', 'class', 'def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'
    ],
    linedecls: [
        'def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'
    ],
    operators: [
        '^', '&', '|', '<=>', '==', '===', '!~', '=~', '>', '>=', '<', '<=', '<<', '>>', '+',
        '-', '*', '/', '%', '**', '~', '+@', '-@', '[]', '[]=', '`',
        '+=', '-=', '*=', '**=', '/=', '^=', '%=', '<<=', '>>=', '&=', '&&=', '||=', '|='
    ],
    brackets: [
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.square' }
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,
    // escape sequences
    escape: /(?:[abefnrstv\\"'\n\r]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{4})/,
    escapes: /\\(?:C\-(@escape|.)|c(@escape|.)|@escape)/,
    decpart: /\d(_?\d)*/,
    decimal: /0|@decpart/,
    delim: /[^a-zA-Z0-9\s\n\r]/,
    heredelim: /(?:\w+|'[^']*'|"[^"]*"|`[^`]*`)/,
    regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
    regexpesc: /\\(?:[AzZbBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})?/,
    // The main tokenizer for our languages
    tokenizer: {
        // Main entry.
        // root.<decl> where decl is the current opening declaration (like 'class')
        root: [
            // identifiers and keywords
            // most complexity here is due to matching 'end' correctly with declarations.
            // We distinguish a declaration that comes first on a line, versus declarations further on a line (which are most likey modifiers)
            [/^(\s*)([a-z_]\w*[!?=]?)/, ['white',
                    {
                        cases: {
                            'for|until|while': { token: 'keyword.$2', next: '@dodecl.$2' },
                            '@declarations': { token: 'keyword.$2', next: '@root.$2' },
                            'end': { token: 'keyword.$S2', next: '@pop' },
                            '@keywords': 'keyword',
                            '@builtins': 'predefined',
                            '@default': 'identifier'
                        }
                    }]],
            [/[a-z_]\w*[!?=]?/,
                {
                    cases: {
                        'if|unless|while|until': { token: 'keyword.$0x', next: '@modifier.$0x' },
                        'for': { token: 'keyword.$2', next: '@dodecl.$2' },
                        '@linedecls': { token: 'keyword.$0', next: '@root.$0' },
                        'end': { token: 'keyword.$S2', next: '@pop' },
                        '@keywords': 'keyword',
                        '@builtins': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            [/[A-Z][\w]*[!?=]?/, 'constructor.identifier'],
            [/\$[\w]*/, 'global.constant'],
            [/@[\w]*/, 'namespace.instance.identifier'],
            [/@@[\w]*/, 'namespace.class.identifier'],
            // here document
            [/<<[-~](@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],
            [/[ \t\r\n]+<<(@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],
            [/^<<(@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],
            // whitespace
            { include: '@whitespace' },
            // strings
            [/"/, { token: 'string.d.delim', next: '@dstring.d."' }],
            [/'/, { token: 'string.sq.delim', next: '@sstring.sq' }],
            // % literals. For efficiency, rematch in the 'pstring' state
            [/%([rsqxwW]|Q?)/, { token: '@rematch', next: 'pstring' }],
            // commands and symbols
            [/`/, { token: 'string.x.delim', next: '@dstring.x.`' }],
            [/:(\w|[$@])\w*[!?=]?/, 'string.s'],
            [/:"/, { token: 'string.s.delim', next: '@dstring.s."' }],
            [/:'/, { token: 'string.s.delim', next: '@sstring.s' }],
            // regular expressions. Lookahead for a (not escaped) closing forwardslash on the same line
            [/\/(?=(\\\/|[^\/\n])+\/)/, { token: 'regexp.delim', next: '@regexp' }],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/, {
                    cases: {
                        '@keywordops': 'keyword',
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],
            [/[;,]/, 'delimiter'],
            // numbers
            [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, 'number.hex'],
            [/0[_oO][0-7](_?[0-7])*/, 'number.octal'],
            [/0[bB][01](_?[01])*/, 'number.binary'],
            [/0[dD]@decpart/, 'number'],
            [/@decimal((\.@decpart)?([eE][\-+]?@decpart)?)/, {
                    cases: {
                        '$1': 'number.float',
                        '@default': 'number'
                    }
                }],
        ],
        // used to not treat a 'do' as a block opener if it occurs on the same
        // line as a 'do' statement: 'while|until|for'
        // dodecl.<decl> where decl is the declarations started, like 'while'
        dodecl: [
            [/^/, { token: '', switchTo: '@root.$S2' }],
            [/[a-z_]\w*[!?=]?/, {
                    cases: {
                        'end': { token: 'keyword.$S2', next: '@pop' },
                        'do': { token: 'keyword', switchTo: '@root.$S2' },
                        '@linedecls': { token: '@rematch', switchTo: '@root.$S2' },
                        '@keywords': 'keyword',
                        '@builtins': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            { include: '@root' }
        ],
        // used to prevent potential modifiers ('if|until|while|unless') to match
        // with 'end' keywords.
        // modifier.<decl>x where decl is the declaration starter, like 'if'
        modifier: [
            [/^/, '', '@pop'],
            [/[a-z_]\w*[!?=]?/, {
                    cases: {
                        'end': { token: 'keyword.$S2', next: '@pop' },
                        'then|else|elsif|do': { token: 'keyword', switchTo: '@root.$S2' },
                        '@linedecls': { token: '@rematch', switchTo: '@root.$S2' },
                        '@keywords': 'keyword',
                        '@builtins': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            { include: '@root' }
        ],
        // single quote strings (also used for symbols)
        // sstring.<kind>  where kind is 'sq' (single quote) or 's' (symbol)
        sstring: [
            [/[^\\']+/, 'string.$S2'],
            [/\\\\|\\'|\\$/, 'string.$S2.escape'],
            [/\\./, 'string.$S2.invalid'],
            [/'/, { token: 'string.$S2.delim', next: '@pop' }]
        ],
        // double quoted "string".
        // dstring.<kind>.<delim> where kind is 'd' (double quoted), 'x' (command), or 's' (symbol)
        // and delim is the ending delimiter (" or `)
        dstring: [
            [/[^\\`"#]+/, 'string.$S2'],
            [/#/, 'string.$S2.escape', '@interpolated'],
            [/\\$/, 'string.$S2.escape'],
            [/@escapes/, 'string.$S2.escape'],
            [/\\./, 'string.$S2.escape.invalid'],
            [/[`"]/, {
                    cases: {
                        '$#==$S3': { token: 'string.$S2.delim', next: '@pop' },
                        '@default': 'string.$S2'
                    }
                }]
        ],
        // literal documents
        // heredoc.<close> where close is the closing delimiter
        heredoc: [
            [/^(\s*)(@heredelim)$/, {
                    cases: {
                        '$2==$S2': ['string.heredoc', { token: 'string.heredoc.delimiter', next: '@pop' }],
                        '@default': ['string.heredoc', 'string.heredoc']
                    }
                }],
            [/.*/, 'string.heredoc'],
        ],
        // interpolated sequence
        interpolated: [
            [/\$\w*/, 'global.constant', '@pop'],
            [/@\w*/, 'namespace.class.identifier', '@pop'],
            [/@@\w*/, 'namespace.instance.identifier', '@pop'],
            [/[{]/, { token: 'string.escape.curly', switchTo: '@interpolated_compound' }],
            ['', '', '@pop'],
        ],
        // any code
        interpolated_compound: [
            [/[}]/, { token: 'string.escape.curly', next: '@pop' }],
            { include: '@root' },
        ],
        // %r quoted regexp
        // pregexp.<open>.<close> where open/close are the open/close delimiter
        pregexp: [
            { include: '@whitespace' },
            // turns out that you can quote using regex control characters, aargh!
            // for example; %r|kgjgaj| is ok (even though | is used for alternation)
            // so, we need to match those first
            [/[^\(\{\[\\]/, {
                    cases: {
                        '$#==$S3': { token: 'regexp.delim', next: '@pop' },
                        '$#==$S2': { token: 'regexp.delim', next: '@push' },
                        '~[)}\\]]': '@brackets.regexp.escape.control',
                        '~@regexpctl': 'regexp.escape.control',
                        '@default': 'regexp'
                    }
                }],
            { include: '@regexcontrol' },
        ],
        // We match regular expression quite precisely
        regexp: [
            { include: '@regexcontrol' },
            [/[^\\\/]/, 'regexp'],
            ['/[ixmp]*', { token: 'regexp.delim' }, '@pop'],
        ],
        regexcontrol: [
            [/(\{)(\d+(?:,\d*)?)(\})/, ['@brackets.regexp.escape.control', 'regexp.escape.control', '@brackets.regexp.escape.control']],
            [/(\[)(\^?)/, ['@brackets.regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
            [/(\()(\?[:=!])/, ['@brackets.regexp.escape.control', 'regexp.escape.control']],
            [/\(\?#/, { token: 'regexp.escape.control', next: '@regexpcomment' }],
            [/[()]/, '@brackets.regexp.escape.control'],
            [/@regexpctl/, 'regexp.escape.control'],
            [/\\$/, 'regexp.escape'],
            [/@regexpesc/, 'regexp.escape'],
            [/\\\./, 'regexp.invalid'],
            [/#/, 'regexp.escape', '@interpolated'],
        ],
        regexrange: [
            [/-/, 'regexp.escape.control'],
            [/\^/, 'regexp.invalid'],
            [/\\$/, 'regexp.escape'],
            [/@regexpesc/, 'regexp.escape'],
            [/[^\]]/, 'regexp'],
            [/\]/, '@brackets.regexp.escape.control', '@pop'],
        ],
        regexpcomment: [
            [/[^)]+/, 'comment'],
            [/\)/, { token: 'regexp.escape.control', next: '@pop' }]
        ],
        // % quoted strings
        // A bit repetitive since we need to often special case the kind of ending delimiter
        pstring: [
            [/%([qws])\(/, { token: 'string.$1.delim', switchTo: '@qstring.$1.(.)' }],
            [/%([qws])\[/, { token: 'string.$1.delim', switchTo: '@qstring.$1.[.]' }],
            [/%([qws])\{/, { token: 'string.$1.delim', switchTo: '@qstring.$1.{.}' }],
            [/%([qws])</, { token: 'string.$1.delim', switchTo: '@qstring.$1.<.>' }],
            [/%([qws])(@delim)/, { token: 'string.$1.delim', switchTo: '@qstring.$1.$2.$2' }],
            [/%r\(/, { token: 'regexp.delim', switchTo: '@pregexp.(.)' }],
            [/%r\[/, { token: 'regexp.delim', switchTo: '@pregexp.[.]' }],
            [/%r\{/, { token: 'regexp.delim', switchTo: '@pregexp.{.}' }],
            [/%r</, { token: 'regexp.delim', switchTo: '@pregexp.<.>' }],
            [/%r(@delim)/, { token: 'regexp.delim', switchTo: '@pregexp.$1.$1' }],
            [/%(x|W|Q?)\(/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.(.)' }],
            [/%(x|W|Q?)\[/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.[.]' }],
            [/%(x|W|Q?)\{/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.{.}' }],
            [/%(x|W|Q?)</, { token: 'string.$1.delim', switchTo: '@qqstring.$1.<.>' }],
            [/%(x|W|Q?)(@delim)/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.$2.$2' }],
            [/%([rqwsxW]|Q?)./, { token: 'invalid', next: '@pop' }],
            [/./, { token: 'invalid', next: '@pop' }],
        ],
        // non-expanded quoted string.
        // qstring.<kind>.<open>.<close>
        //  kind = q|w|s  (single quote, array, symbol)
        //  open = open delimiter
        //  close = close delimiter
        qstring: [
            [/\\$/, 'string.$S2.escape'],
            [/\\./, 'string.$S2.escape'],
            [/./, {
                    cases: {
                        '$#==$S4': { token: 'string.$S2.delim', next: '@pop' },
                        '$#==$S3': { token: 'string.$S2.delim', next: '@push' },
                        '@default': 'string.$S2'
                    }
                }],
        ],
        // expanded quoted string.
        // qqstring.<kind>.<open>.<close>
        //  kind = Q|W|x  (double quote, array, command)
        //  open = open delimiter
        //  close = close delimiter
        qqstring: [
            [/#/, 'string.$S2.escape', '@interpolated'],
            { include: '@qstring' }
        ],
        // whitespace & comments
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/^\s*=begin\b/, 'comment', '@comment'],
            [/#.*$/, 'comment'],
        ],
        comment: [
            [/[^=]+/, 'comment'],
            [/^\s*=begin\b/, 'comment.invalid'],
            [/^\s*=end\b.*/, 'comment', '@pop'],
            [/[=]/, 'comment']
        ],
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3J1YnkvcnVieS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3REFBd0Q7QUFDakUsU0FBUyxTQUFTLFlBQVksNkJBQTZCO0FBQzNELFNBQVM7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUErQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3REFBd0Q7QUFDcEYsNEJBQTRCLHdEQUF3RDtBQUNwRix3QkFBd0IsSUFBSSxtREFBbUQsRUFBRSxHQUFHO0FBQ3BGLDJCQUEyQix3REFBd0Q7QUFDbkYsa0NBQWtDLDBEQUEwRDtBQUM1RixzQkFBc0Isa0RBQWtEO0FBQ3hFLHNCQUFzQixrREFBa0Q7QUFDeEUsa0JBQWtCLElBQUksNkNBQTZDLEVBQUUsR0FBRztBQUN4RSxxQkFBcUIsa0RBQWtEO0FBQ3ZFLDRCQUE0QixvREFBb0Q7QUFDaEYsNkJBQTZCLHlEQUF5RDtBQUN0Riw2QkFBNkIseURBQXlEO0FBQ3RGLHlCQUF5QixJQUFJLG9EQUFvRCxFQUFFLEdBQUc7QUFDdEYsNEJBQTRCLHlEQUF5RDtBQUNyRixtQ0FBbUMsMkRBQTJEO0FBQzlGLGlDQUFpQyxpQ0FBaUM7QUFDbEUsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDBDQUEwQztBQUM5RSxvQ0FBb0MsMkNBQTJDO0FBQy9FO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJyMnLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnPWJlZ2luJywgJz1lbmQnXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsnKCcsICcpJ10sXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdXG59O1xuLypcbiAqIFJ1YnkgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuICpcbiAqIFF1aXRlIGEgY29tcGxleCBsYW5ndWFnZSBkdWUgdG8gZWxhYm9yYXRlIGVzY2FwZSBzZXF1ZW5jZXNcbiAqIGFuZCBxdW90aW5nIG9mIGxpdGVyYXRlIHN0cmluZ3MvcmVndWxhciBleHByZXNzaW9ucywgYW5kXG4gKiBhbiAnZW5kJyBrZXl3b3JkIHRoYXQgZG9lcyBub3QgYWx3YXlzIGFwcGx5IHRvIG1vZGlmaWVycyBsaWtlIHVudGlsIGFuZCB3aGlsZSxcbiAqIGFuZCBhICdkbycga2V5d29yZCB0aGF0IHNvbWV0aW1lcyBzdGFydHMgYSBibG9jaywgYnV0IHNvbWV0aW1lcyBpcyBwYXJ0IG9mXG4gKiBhbm90aGVyIHN0YXRlbWVudCAobGlrZSAnd2hpbGUnKS5cbiAqXG4gKiAoMSkgZW5kIGJsb2NrczpcbiAqICdlbmQnIG1heSBlbmQgZGVjbGFyYXRpb25zIGxpa2UgaWYgb3IgdW50aWwsIGJ1dCBzb21ldGltZXMgJ2lmJyBvciAndW50aWwnXG4gKiBhcmUgbW9kaWZpZXJzIHdoZXJlIHRoZXJlIGlzIG5vICdlbmQnLiBBbHNvLCAnZG8nIHNvbWV0aW1lcyBzdGFydHMgYSBibG9ja1xuICogdGhhdCBpcyBlbmRlZCBieSAnZW5kJywgYnV0IHNvbWV0aW1lcyBpdCBpcyBwYXJ0IG9mIGEgJ3doaWxlJywgJ2ZvcicsIG9yICd1bnRpbCdcbiAqIFRvIGRvIHByb3BlciBicmFjZSBtYXRjaGluZyB3ZSBkbyBzb21lIGVsYWJvcmF0ZSBzdGF0ZSBtYW5pcHVsYXRpb24uXG4gKiBzb21lIGV4YW1wbGVzOlxuICpcbiAqICAgdW50aWwgYmxhIGRvXG4gKiAgICAgd29yayB1bnRpbCB0aXJlZFxuICogICAgIGxpc3QuZWFjaCBkb1xuICogICAgICAgc29tZXRoaW5nIGlmIHRlc3RcbiAqICAgICBlbmRcbiAqICAgZW5kXG4gKlxuICogb3JcbiAqXG4gKiBpZiB0ZXN0XG4gKiAgc29tZXRoaW5nIChpZiB0ZXN0IHRoZW4geCBlbmQpXG4gKiAgYmFyIGlmIGJsYVxuICogZW5kXG4gKlxuICogb3IsIGhvdyBhYm91dCB1c2luZyBjbGFzcyBhcyBhIHByb3BlcnR5Li5cbiAqXG4gKiBjbGFzcyBUZXN0XG4gKiAgIGRlZiBlbmRwb2ludFxuICogICAgIHNlbGYuY2xhc3MuZW5kcG9pbnQgfHwgcm91dGVzXG4gKiAgIGVuZFxuICogZW5kXG4gKlxuICogKDIpIHF1b3Rpbmc6XG4gKiB0aGVyZSBhcmUgbWFueSBraW5kcyBvZiBzdHJpbmdzIGFuZCBlc2NhcGUgc2VxdWVuY2VzLiBCdXQgYWxzbywgb25lIGNhblxuICogc3RhcnQgbWFueSBzdHJpbmctbGlrZSB0aGluZ3MgYXMgJyVxeCcgd2hlcmUgcSBzcGVjaWZpZXMgdGhlIGtpbmQgb2Ygc3RyaW5nXG4gKiAobGlrZSBhIGNvbW1hbmQsIGVzY2FwZSBleHBhbmRlZCwgcmVndWxhciBleHByZXNzaW9uLCBzeW1ib2wgZXRjLiksIGFuZCB4IGlzXG4gKiBzb21lIGNoYXJhY3RlciBhbmQgb25seSBhbm90aGVyICd4JyBlbmRzIHRoZSBzZXF1ZW5jZS4gRXhjZXB0IGZvciBicmFja2V0c1xuICogd2hlcmUgdGhlIGNsb3NpbmcgYnJhY2tldCBlbmRzIHRoZSBzZXF1ZW5jZS4uIGFuZCBleGNlcHQgZm9yIGEgbmVzdGVkIGJyYWNrZXRcbiAqIGluc2lkZSB0aGUgc3RyaW5nIGxpa2UgZW50aXR5LiBBbHNvLCBzdWNoIHN0cmluZ3MgY2FuIGNvbnRhaW4gaW50ZXJwb2xhdGVkXG4gKiBydWJ5IGV4cHJlc3Npb25zIGFnYWluIChhbmQgc3BhbiBtdWx0aXBsZSBsaW5lcykuIE1vcmVvdmVyLCBleHBhbmRlZFxuICogcmVndWxhciBleHByZXNzaW9uIGNhbiBhbHNvIGNvbnRhaW4gY29tbWVudHMuXG4gKi9cbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgdG9rZW5Qb3N0Zml4OiAnLnJ1YnknLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdfX0xJTkVfXycsICdfX0VOQ09ESU5HX18nLCAnX19GSUxFX18nLCAnQkVHSU4nLCAnRU5EJywgJ2FsaWFzJywgJ2FuZCcsICdiZWdpbicsXG4gICAgICAgICdicmVhaycsICdjYXNlJywgJ2NsYXNzJywgJ2RlZicsICdkZWZpbmVkPycsICdkbycsICdlbHNlJywgJ2Vsc2lmJywgJ2VuZCcsXG4gICAgICAgICdlbnN1cmUnLCAnZm9yJywgJ2ZhbHNlJywgJ2lmJywgJ2luJywgJ21vZHVsZScsICduZXh0JywgJ25pbCcsICdub3QnLCAnb3InLCAncmVkbycsXG4gICAgICAgICdyZXNjdWUnLCAncmV0cnknLCAncmV0dXJuJywgJ3NlbGYnLCAnc3VwZXInLCAndGhlbicsICd0cnVlJywgJ3VuZGVmJywgJ3VubGVzcycsXG4gICAgICAgICd1bnRpbCcsICd3aGVuJywgJ3doaWxlJywgJ3lpZWxkJyxcbiAgICBdLFxuICAgIGtleXdvcmRvcHM6IFtcbiAgICAgICAgJzo6JywgJy4uJywgJy4uLicsICc/JywgJzonLCAnPT4nXG4gICAgXSxcbiAgICBidWlsdGluczogW1xuICAgICAgICAncmVxdWlyZScsICdwdWJsaWMnLCAncHJpdmF0ZScsICdpbmNsdWRlJywgJ2V4dGVuZCcsICdhdHRyX3JlYWRlcicsXG4gICAgICAgICdwcm90ZWN0ZWQnLCAncHJpdmF0ZV9jbGFzc19tZXRob2QnLCAncHJvdGVjdGVkX2NsYXNzX21ldGhvZCcsICduZXcnXG4gICAgXSxcbiAgICAvLyB0aGVzZSBhcmUgY2xvc2VkIGJ5ICdlbmQnIChpZiwgd2hpbGUgYW5kIHVudGlsIGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkpXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgICdtb2R1bGUnLCAnY2xhc3MnLCAnZGVmJywgJ2Nhc2UnLCAnZG8nLCAnYmVnaW4nLCAnZm9yJywgJ2lmJywgJ3doaWxlJywgJ3VudGlsJywgJ3VubGVzcydcbiAgICBdLFxuICAgIGxpbmVkZWNsczogW1xuICAgICAgICAnZGVmJywgJ2Nhc2UnLCAnZG8nLCAnYmVnaW4nLCAnZm9yJywgJ2lmJywgJ3doaWxlJywgJ3VudGlsJywgJ3VubGVzcydcbiAgICBdLFxuICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnXicsICcmJywgJ3wnLCAnPD0+JywgJz09JywgJz09PScsICchficsICc9ficsICc+JywgJz49JywgJzwnLCAnPD0nLCAnPDwnLCAnPj4nLCAnKycsXG4gICAgICAgICctJywgJyonLCAnLycsICclJywgJyoqJywgJ34nLCAnK0AnLCAnLUAnLCAnW10nLCAnW109JywgJ2AnLFxuICAgICAgICAnKz0nLCAnLT0nLCAnKj0nLCAnKio9JywgJy89JywgJ149JywgJyU9JywgJzw8PScsICc+Pj0nLCAnJj0nLCAnJiY9JywgJ3x8PScsICd8PSdcbiAgICBdLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJyB9XG4gICAgXSxcbiAgICAvLyB3ZSBpbmNsdWRlIHRoZXNlIGNvbW1vbiByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVcXC5dKy8sXG4gICAgLy8gZXNjYXBlIHNlcXVlbmNlc1xuICAgIGVzY2FwZTogLyg/OlthYmVmbnJzdHZcXFxcXCInXFxuXFxyXXxbMC03XXsxLDN9fHhbMC05QS1GYS1mXXsxLDJ9fHVbMC05QS1GYS1mXXs0fSkvLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86Q1xcLShAZXNjYXBlfC4pfGMoQGVzY2FwZXwuKXxAZXNjYXBlKS8sXG4gICAgZGVjcGFydDogL1xcZChfP1xcZCkqLyxcbiAgICBkZWNpbWFsOiAvMHxAZGVjcGFydC8sXG4gICAgZGVsaW06IC9bXmEtekEtWjAtOVxcc1xcblxccl0vLFxuICAgIGhlcmVkZWxpbTogLyg/Olxcdyt8J1teJ10qJ3xcIlteXCJdKlwifGBbXmBdKmApLyxcbiAgICByZWdleHBjdGw6IC9bKCl7fVxcW1xcXVxcJFxcXnxcXC0qKz9cXC5dLyxcbiAgICByZWdleHBlc2M6IC9cXFxcKD86W0F6WmJCZERmbnJzdHZ3V24wXFxcXFxcL118QHJlZ2V4cGN0bHxjW0EtWl18eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fSk/LyxcbiAgICAvLyBUaGUgbWFpbiB0b2tlbml6ZXIgZm9yIG91ciBsYW5ndWFnZXNcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgLy8gTWFpbiBlbnRyeS5cbiAgICAgICAgLy8gcm9vdC48ZGVjbD4gd2hlcmUgZGVjbCBpcyB0aGUgY3VycmVudCBvcGVuaW5nIGRlY2xhcmF0aW9uIChsaWtlICdjbGFzcycpXG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIC8vIGlkZW50aWZpZXJzIGFuZCBrZXl3b3Jkc1xuICAgICAgICAgICAgLy8gbW9zdCBjb21wbGV4aXR5IGhlcmUgaXMgZHVlIHRvIG1hdGNoaW5nICdlbmQnIGNvcnJlY3RseSB3aXRoIGRlY2xhcmF0aW9ucy5cbiAgICAgICAgICAgIC8vIFdlIGRpc3Rpbmd1aXNoIGEgZGVjbGFyYXRpb24gdGhhdCBjb21lcyBmaXJzdCBvbiBhIGxpbmUsIHZlcnN1cyBkZWNsYXJhdGlvbnMgZnVydGhlciBvbiBhIGxpbmUgKHdoaWNoIGFyZSBtb3N0IGxpa2V5IG1vZGlmaWVycylcbiAgICAgICAgICAgIFsvXihcXHMqKShbYS16X11cXHcqWyE/PV0/KS8sIFsnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3J8dW50aWx8d2hpbGUnOiB7IHRva2VuOiAna2V5d29yZC4kMicsIG5leHQ6ICdAZG9kZWNsLiQyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAZGVjbGFyYXRpb25zJzogeyB0b2tlbjogJ2tleXdvcmQuJDInLCBuZXh0OiAnQHJvb3QuJDInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IHsgdG9rZW46ICdrZXl3b3JkLiRTMicsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGlucyc6ICdwcmVkZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfV1dLFxuICAgICAgICAgICAgWy9bYS16X11cXHcqWyE/PV0/LyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWZ8dW5sZXNzfHdoaWxlfHVudGlsJzogeyB0b2tlbjogJ2tleXdvcmQuJDB4JywgbmV4dDogJ0Btb2RpZmllci4kMHgnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZm9yJzogeyB0b2tlbjogJ2tleXdvcmQuJDInLCBuZXh0OiAnQGRvZGVjbC4kMicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAbGluZWRlY2xzJzogeyB0b2tlbjogJ2tleXdvcmQuJDAnLCBuZXh0OiAnQHJvb3QuJDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5kJzogeyB0b2tlbjogJ2tleXdvcmQuJFMyJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGlucyc6ICdwcmVkZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1tBLVpdW1xcd10qWyE/PV0/LywgJ2NvbnN0cnVjdG9yLmlkZW50aWZpZXInXSxcbiAgICAgICAgICAgIFsvXFwkW1xcd10qLywgJ2dsb2JhbC5jb25zdGFudCddLFxuICAgICAgICAgICAgWy9AW1xcd10qLywgJ25hbWVzcGFjZS5pbnN0YW5jZS5pZGVudGlmaWVyJ10sXG4gICAgICAgICAgICBbL0BAW1xcd10qLywgJ25hbWVzcGFjZS5jbGFzcy5pZGVudGlmaWVyJ10sXG4gICAgICAgICAgICAvLyBoZXJlIGRvY3VtZW50XG4gICAgICAgICAgICBbLzw8Wy1+XShAaGVyZWRlbGltKS4qLywgeyB0b2tlbjogJ3N0cmluZy5oZXJlZG9jLmRlbGltaXRlcicsIG5leHQ6ICdAaGVyZWRvYy4kMScgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSs8PChAaGVyZWRlbGltKS4qLywgeyB0b2tlbjogJ3N0cmluZy5oZXJlZG9jLmRlbGltaXRlcicsIG5leHQ6ICdAaGVyZWRvYy4kMScgfV0sXG4gICAgICAgICAgICBbL148PChAaGVyZWRlbGltKS4qLywgeyB0b2tlbjogJ3N0cmluZy5oZXJlZG9jLmRlbGltaXRlcicsIG5leHQ6ICdAaGVyZWRvYy4kMScgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIHN0cmluZ3NcbiAgICAgICAgICAgIFsvXCIvLCB7IHRva2VuOiAnc3RyaW5nLmQuZGVsaW0nLCBuZXh0OiAnQGRzdHJpbmcuZC5cIicgfV0sXG4gICAgICAgICAgICBbLycvLCB7IHRva2VuOiAnc3RyaW5nLnNxLmRlbGltJywgbmV4dDogJ0Bzc3RyaW5nLnNxJyB9XSxcbiAgICAgICAgICAgIC8vICUgbGl0ZXJhbHMuIEZvciBlZmZpY2llbmN5LCByZW1hdGNoIGluIHRoZSAncHN0cmluZycgc3RhdGVcbiAgICAgICAgICAgIFsvJShbcnNxeHdXXXxRPykvLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAncHN0cmluZycgfV0sXG4gICAgICAgICAgICAvLyBjb21tYW5kcyBhbmQgc3ltYm9sc1xuICAgICAgICAgICAgWy9gLywgeyB0b2tlbjogJ3N0cmluZy54LmRlbGltJywgbmV4dDogJ0Bkc3RyaW5nLnguYCcgfV0sXG4gICAgICAgICAgICBbLzooXFx3fFskQF0pXFx3KlshPz1dPy8sICdzdHJpbmcucyddLFxuICAgICAgICAgICAgWy86XCIvLCB7IHRva2VuOiAnc3RyaW5nLnMuZGVsaW0nLCBuZXh0OiAnQGRzdHJpbmcucy5cIicgfV0sXG4gICAgICAgICAgICBbLzonLywgeyB0b2tlbjogJ3N0cmluZy5zLmRlbGltJywgbmV4dDogJ0Bzc3RyaW5nLnMnIH1dLFxuICAgICAgICAgICAgLy8gcmVndWxhciBleHByZXNzaW9ucy4gTG9va2FoZWFkIGZvciBhIChub3QgZXNjYXBlZCkgY2xvc2luZyBmb3J3YXJkc2xhc2ggb24gdGhlIHNhbWUgbGluZVxuICAgICAgICAgICAgWy9cXC8oPz0oXFxcXFxcL3xbXlxcL1xcbl0pK1xcLykvLCB7IHRva2VuOiAncmVnZXhwLmRlbGltJywgbmV4dDogJ0ByZWdleHAnIH1dLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRvcHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1s7LF0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBbLzBbeFhdWzAtOWEtZkEtRl0oXz9bMC05YS1mQS1GXSkqLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvMFtfb09dWzAtN10oXz9bMC03XSkqLywgJ251bWJlci5vY3RhbCddLFxuICAgICAgICAgICAgWy8wW2JCXVswMV0oXz9bMDFdKSovLCAnbnVtYmVyLmJpbmFyeSddLFxuICAgICAgICAgICAgWy8wW2REXUBkZWNwYXJ0LywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9AZGVjaW1hbCgoXFwuQGRlY3BhcnQpPyhbZUVdW1xcLStdP0BkZWNwYXJ0KT8pLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQxJzogJ251bWJlci5mbG9hdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIHVzZWQgdG8gbm90IHRyZWF0IGEgJ2RvJyBhcyBhIGJsb2NrIG9wZW5lciBpZiBpdCBvY2N1cnMgb24gdGhlIHNhbWVcbiAgICAgICAgLy8gbGluZSBhcyBhICdkbycgc3RhdGVtZW50OiAnd2hpbGV8dW50aWx8Zm9yJ1xuICAgICAgICAvLyBkb2RlY2wuPGRlY2w+IHdoZXJlIGRlY2wgaXMgdGhlIGRlY2xhcmF0aW9ucyBzdGFydGVkLCBsaWtlICd3aGlsZSdcbiAgICAgICAgZG9kZWNsOiBbXG4gICAgICAgICAgICBbL14vLCB7IHRva2VuOiAnJywgc3dpdGNoVG86ICdAcm9vdC4kUzInIH1dLFxuICAgICAgICAgICAgWy9bYS16X11cXHcqWyE/PV0/Lywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2VuZCc6IHsgdG9rZW46ICdrZXl3b3JkLiRTMicsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RvJzogeyB0b2tlbjogJ2tleXdvcmQnLCBzd2l0Y2hUbzogJ0Byb290LiRTMicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAbGluZWRlY2xzJzogeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcm9vdC4kUzInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGlucyc6ICdwcmVkZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAcm9vdCcgfVxuICAgICAgICBdLFxuICAgICAgICAvLyB1c2VkIHRvIHByZXZlbnQgcG90ZW50aWFsIG1vZGlmaWVycyAoJ2lmfHVudGlsfHdoaWxlfHVubGVzcycpIHRvIG1hdGNoXG4gICAgICAgIC8vIHdpdGggJ2VuZCcga2V5d29yZHMuXG4gICAgICAgIC8vIG1vZGlmaWVyLjxkZWNsPnggd2hlcmUgZGVjbCBpcyB0aGUgZGVjbGFyYXRpb24gc3RhcnRlciwgbGlrZSAnaWYnXG4gICAgICAgIG1vZGlmaWVyOiBbXG4gICAgICAgICAgICBbL14vLCAnJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW2Etel9dXFx3KlshPz1dPy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbmQnOiB7IHRva2VuOiAna2V5d29yZC4kUzInLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aGVufGVsc2V8ZWxzaWZ8ZG8nOiB7IHRva2VuOiAna2V5d29yZCcsIHN3aXRjaFRvOiAnQHJvb3QuJFMyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BsaW5lZGVjbHMnOiB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0Byb290LiRTMicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGJ1aWx0aW5zJzogJ3ByZWRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0Byb290JyB9XG4gICAgICAgIF0sXG4gICAgICAgIC8vIHNpbmdsZSBxdW90ZSBzdHJpbmdzIChhbHNvIHVzZWQgZm9yIHN5bWJvbHMpXG4gICAgICAgIC8vIHNzdHJpbmcuPGtpbmQ+ICB3aGVyZSBraW5kIGlzICdzcScgKHNpbmdsZSBxdW90ZSkgb3IgJ3MnIChzeW1ib2wpXG4gICAgICAgIHNzdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcJ10rLywgJ3N0cmluZy4kUzInXSxcbiAgICAgICAgICAgIFsvXFxcXFxcXFx8XFxcXCd8XFxcXCQvLCAnc3RyaW5nLiRTMi5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLiRTMi5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbLycvLCB7IHRva2VuOiAnc3RyaW5nLiRTMi5kZWxpbScsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBkb3VibGUgcXVvdGVkIFwic3RyaW5nXCIuXG4gICAgICAgIC8vIGRzdHJpbmcuPGtpbmQ+LjxkZWxpbT4gd2hlcmUga2luZCBpcyAnZCcgKGRvdWJsZSBxdW90ZWQpLCAneCcgKGNvbW1hbmQpLCBvciAncycgKHN5bWJvbClcbiAgICAgICAgLy8gYW5kIGRlbGltIGlzIHRoZSBlbmRpbmcgZGVsaW1pdGVyIChcIiBvciBgKVxuICAgICAgICBkc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXGBcIiNdKy8sICdzdHJpbmcuJFMyJ10sXG4gICAgICAgICAgICBbLyMvLCAnc3RyaW5nLiRTMi5lc2NhcGUnLCAnQGludGVycG9sYXRlZCddLFxuICAgICAgICAgICAgWy9cXFxcJC8sICdzdHJpbmcuJFMyLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuJFMyLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuJFMyLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1tgXCJdLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzMnOiB7IHRva2VuOiAnc3RyaW5nLiRTMi5kZWxpbScsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZy4kUzInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBsaXRlcmFsIGRvY3VtZW50c1xuICAgICAgICAvLyBoZXJlZG9jLjxjbG9zZT4gd2hlcmUgY2xvc2UgaXMgdGhlIGNsb3NpbmcgZGVsaW1pdGVyXG4gICAgICAgIGhlcmVkb2M6IFtcbiAgICAgICAgICAgIFsvXihcXHMqKShAaGVyZWRlbGltKSQvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDI9PSRTMic6IFsnc3RyaW5nLmhlcmVkb2MnLCB7IHRva2VuOiAnc3RyaW5nLmhlcmVkb2MuZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWydzdHJpbmcuaGVyZWRvYycsICdzdHJpbmcuaGVyZWRvYyddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvLiovLCAnc3RyaW5nLmhlcmVkb2MnXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gaW50ZXJwb2xhdGVkIHNlcXVlbmNlXG4gICAgICAgIGludGVycG9sYXRlZDogW1xuICAgICAgICAgICAgWy9cXCRcXHcqLywgJ2dsb2JhbC5jb25zdGFudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL0BcXHcqLywgJ25hbWVzcGFjZS5jbGFzcy5pZGVudGlmaWVyJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvQEBcXHcqLywgJ25hbWVzcGFjZS5pbnN0YW5jZS5pZGVudGlmaWVyJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW3tdLywgeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUuY3VybHknLCBzd2l0Y2hUbzogJ0BpbnRlcnBvbGF0ZWRfY29tcG91bmQnIH1dLFxuICAgICAgICAgICAgWycnLCAnJywgJ0Bwb3AnXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gYW55IGNvZGVcbiAgICAgICAgaW50ZXJwb2xhdGVkX2NvbXBvdW5kOiBbXG4gICAgICAgICAgICBbL1t9XS8sIHsgdG9rZW46ICdzdHJpbmcuZXNjYXBlLmN1cmx5JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHJvb3QnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vICVyIHF1b3RlZCByZWdleHBcbiAgICAgICAgLy8gcHJlZ2V4cC48b3Blbj4uPGNsb3NlPiB3aGVyZSBvcGVuL2Nsb3NlIGFyZSB0aGUgb3Blbi9jbG9zZSBkZWxpbWl0ZXJcbiAgICAgICAgcHJlZ2V4cDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICAvLyB0dXJucyBvdXQgdGhhdCB5b3UgY2FuIHF1b3RlIHVzaW5nIHJlZ2V4IGNvbnRyb2wgY2hhcmFjdGVycywgYWFyZ2ghXG4gICAgICAgICAgICAvLyBmb3IgZXhhbXBsZTsgJXJ8a2dqZ2FqfCBpcyBvayAoZXZlbiB0aG91Z2ggfCBpcyB1c2VkIGZvciBhbHRlcm5hdGlvbilcbiAgICAgICAgICAgIC8vIHNvLCB3ZSBuZWVkIHRvIG1hdGNoIHRob3NlIGZpcnN0XG4gICAgICAgICAgICBbL1teXFwoXFx7XFxbXFxcXF0vLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJCM9PSRTMyc6IHsgdG9rZW46ICdyZWdleHAuZGVsaW0nLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICckIz09JFMyJzogeyB0b2tlbjogJ3JlZ2V4cC5kZWxpbScsIG5leHQ6ICdAcHVzaCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd+Wyl9XFxcXF1dJzogJ0BicmFja2V0cy5yZWdleHAuZXNjYXBlLmNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ35AcmVnZXhwY3RsJzogJ3JlZ2V4cC5lc2NhcGUuY29udHJvbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAncmVnZXhwJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAcmVnZXhjb250cm9sJyB9LFxuICAgICAgICBdLFxuICAgICAgICAvLyBXZSBtYXRjaCByZWd1bGFyIGV4cHJlc3Npb24gcXVpdGUgcHJlY2lzZWx5XG4gICAgICAgIHJlZ2V4cDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHJlZ2V4Y29udHJvbCcgfSxcbiAgICAgICAgICAgIFsvW15cXFxcXFwvXS8sICdyZWdleHAnXSxcbiAgICAgICAgICAgIFsnL1tpeG1wXSonLCB7IHRva2VuOiAncmVnZXhwLmRlbGltJyB9LCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgICAgICByZWdleGNvbnRyb2w6IFtcbiAgICAgICAgICAgIFsvKFxceykoXFxkKyg/OixcXGQqKT8pKFxcfSkvLCBbJ0BicmFja2V0cy5yZWdleHAuZXNjYXBlLmNvbnRyb2wnLCAncmVnZXhwLmVzY2FwZS5jb250cm9sJywgJ0BicmFja2V0cy5yZWdleHAuZXNjYXBlLmNvbnRyb2wnXV0sXG4gICAgICAgICAgICBbLyhcXFspKFxcXj8pLywgWydAYnJhY2tldHMucmVnZXhwLmVzY2FwZS5jb250cm9sJywgeyB0b2tlbjogJ3JlZ2V4cC5lc2NhcGUuY29udHJvbCcsIG5leHQ6ICdAcmVnZXhyYW5nZScgfV1dLFxuICAgICAgICAgICAgWy8oXFwoKShcXD9bOj0hXSkvLCBbJ0BicmFja2V0cy5yZWdleHAuZXNjYXBlLmNvbnRyb2wnLCAncmVnZXhwLmVzY2FwZS5jb250cm9sJ11dLFxuICAgICAgICAgICAgWy9cXChcXD8jLywgeyB0b2tlbjogJ3JlZ2V4cC5lc2NhcGUuY29udHJvbCcsIG5leHQ6ICdAcmVnZXhwY29tbWVudCcgfV0sXG4gICAgICAgICAgICBbL1soKV0vLCAnQGJyYWNrZXRzLnJlZ2V4cC5lc2NhcGUuY29udHJvbCddLFxuICAgICAgICAgICAgWy9AcmVnZXhwY3RsLywgJ3JlZ2V4cC5lc2NhcGUuY29udHJvbCddLFxuICAgICAgICAgICAgWy9cXFxcJC8sICdyZWdleHAuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL0ByZWdleHBlc2MvLCAncmVnZXhwLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcXFwuLywgJ3JlZ2V4cC5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbLyMvLCAncmVnZXhwLmVzY2FwZScsICdAaW50ZXJwb2xhdGVkJ10sXG4gICAgICAgIF0sXG4gICAgICAgIHJlZ2V4cmFuZ2U6IFtcbiAgICAgICAgICAgIFsvLS8sICdyZWdleHAuZXNjYXBlLmNvbnRyb2wnXSxcbiAgICAgICAgICAgIFsvXFxeLywgJ3JlZ2V4cC5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1xcXFwkLywgJ3JlZ2V4cC5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvQHJlZ2V4cGVzYy8sICdyZWdleHAuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1teXFxdXS8sICdyZWdleHAnXSxcbiAgICAgICAgICAgIFsvXFxdLywgJ0BicmFja2V0cy5yZWdleHAuZXNjYXBlLmNvbnRyb2wnLCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgICAgICByZWdleHBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teKV0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwpLywgeyB0b2tlbjogJ3JlZ2V4cC5lc2NhcGUuY29udHJvbCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyAlIHF1b3RlZCBzdHJpbmdzXG4gICAgICAgIC8vIEEgYml0IHJlcGV0aXRpdmUgc2luY2Ugd2UgbmVlZCB0byBvZnRlbiBzcGVjaWFsIGNhc2UgdGhlIGtpbmQgb2YgZW5kaW5nIGRlbGltaXRlclxuICAgICAgICBwc3RyaW5nOiBbXG4gICAgICAgICAgICBbLyUoW3F3c10pXFwoLywgeyB0b2tlbjogJ3N0cmluZy4kMS5kZWxpbScsIHN3aXRjaFRvOiAnQHFzdHJpbmcuJDEuKC4pJyB9XSxcbiAgICAgICAgICAgIFsvJShbcXdzXSlcXFsvLCB7IHRva2VuOiAnc3RyaW5nLiQxLmRlbGltJywgc3dpdGNoVG86ICdAcXN0cmluZy4kMS5bLl0nIH1dLFxuICAgICAgICAgICAgWy8lKFtxd3NdKVxcey8sIHsgdG9rZW46ICdzdHJpbmcuJDEuZGVsaW0nLCBzd2l0Y2hUbzogJ0Bxc3RyaW5nLiQxLnsufScgfV0sXG4gICAgICAgICAgICBbLyUoW3F3c10pPC8sIHsgdG9rZW46ICdzdHJpbmcuJDEuZGVsaW0nLCBzd2l0Y2hUbzogJ0Bxc3RyaW5nLiQxLjwuPicgfV0sXG4gICAgICAgICAgICBbLyUoW3F3c10pKEBkZWxpbSkvLCB7IHRva2VuOiAnc3RyaW5nLiQxLmRlbGltJywgc3dpdGNoVG86ICdAcXN0cmluZy4kMS4kMi4kMicgfV0sXG4gICAgICAgICAgICBbLyVyXFwoLywgeyB0b2tlbjogJ3JlZ2V4cC5kZWxpbScsIHN3aXRjaFRvOiAnQHByZWdleHAuKC4pJyB9XSxcbiAgICAgICAgICAgIFsvJXJcXFsvLCB7IHRva2VuOiAncmVnZXhwLmRlbGltJywgc3dpdGNoVG86ICdAcHJlZ2V4cC5bLl0nIH1dLFxuICAgICAgICAgICAgWy8lclxcey8sIHsgdG9rZW46ICdyZWdleHAuZGVsaW0nLCBzd2l0Y2hUbzogJ0BwcmVnZXhwLnsufScgfV0sXG4gICAgICAgICAgICBbLyVyPC8sIHsgdG9rZW46ICdyZWdleHAuZGVsaW0nLCBzd2l0Y2hUbzogJ0BwcmVnZXhwLjwuPicgfV0sXG4gICAgICAgICAgICBbLyVyKEBkZWxpbSkvLCB7IHRva2VuOiAncmVnZXhwLmRlbGltJywgc3dpdGNoVG86ICdAcHJlZ2V4cC4kMS4kMScgfV0sXG4gICAgICAgICAgICBbLyUoeHxXfFE/KVxcKC8sIHsgdG9rZW46ICdzdHJpbmcuJDEuZGVsaW0nLCBzd2l0Y2hUbzogJ0BxcXN0cmluZy4kMS4oLiknIH1dLFxuICAgICAgICAgICAgWy8lKHh8V3xRPylcXFsvLCB7IHRva2VuOiAnc3RyaW5nLiQxLmRlbGltJywgc3dpdGNoVG86ICdAcXFzdHJpbmcuJDEuWy5dJyB9XSxcbiAgICAgICAgICAgIFsvJSh4fFd8UT8pXFx7LywgeyB0b2tlbjogJ3N0cmluZy4kMS5kZWxpbScsIHN3aXRjaFRvOiAnQHFxc3RyaW5nLiQxLnsufScgfV0sXG4gICAgICAgICAgICBbLyUoeHxXfFE/KTwvLCB7IHRva2VuOiAnc3RyaW5nLiQxLmRlbGltJywgc3dpdGNoVG86ICdAcXFzdHJpbmcuJDEuPC4+JyB9XSxcbiAgICAgICAgICAgIFsvJSh4fFd8UT8pKEBkZWxpbSkvLCB7IHRva2VuOiAnc3RyaW5nLiQxLmRlbGltJywgc3dpdGNoVG86ICdAcXFzdHJpbmcuJDEuJDIuJDInIH1dLFxuICAgICAgICAgICAgWy8lKFtycXdzeFddfFE/KS4vLCB7IHRva2VuOiAnaW52YWxpZCcsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvLi8sIHsgdG9rZW46ICdpbnZhbGlkJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICAvLyBub24tZXhwYW5kZWQgcXVvdGVkIHN0cmluZy5cbiAgICAgICAgLy8gcXN0cmluZy48a2luZD4uPG9wZW4+LjxjbG9zZT5cbiAgICAgICAgLy8gIGtpbmQgPSBxfHd8cyAgKHNpbmdsZSBxdW90ZSwgYXJyYXksIHN5bWJvbClcbiAgICAgICAgLy8gIG9wZW4gPSBvcGVuIGRlbGltaXRlclxuICAgICAgICAvLyAgY2xvc2UgPSBjbG9zZSBkZWxpbWl0ZXJcbiAgICAgICAgcXN0cmluZzogW1xuICAgICAgICAgICAgWy9cXFxcJC8sICdzdHJpbmcuJFMyLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuJFMyLmVzY2FwZSddLFxuICAgICAgICAgICAgWy8uLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzQnOiB7IHRva2VuOiAnc3RyaW5nLiRTMi5kZWxpbScsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzMnOiB7IHRva2VuOiAnc3RyaW5nLiRTMi5kZWxpbScsIG5leHQ6ICdAcHVzaCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcuJFMyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIGV4cGFuZGVkIHF1b3RlZCBzdHJpbmcuXG4gICAgICAgIC8vIHFxc3RyaW5nLjxraW5kPi48b3Blbj4uPGNsb3NlPlxuICAgICAgICAvLyAga2luZCA9IFF8V3x4ICAoZG91YmxlIHF1b3RlLCBhcnJheSwgY29tbWFuZClcbiAgICAgICAgLy8gIG9wZW4gPSBvcGVuIGRlbGltaXRlclxuICAgICAgICAvLyAgY2xvc2UgPSBjbG9zZSBkZWxpbWl0ZXJcbiAgICAgICAgcXFzdHJpbmc6IFtcbiAgICAgICAgICAgIFsvIy8sICdzdHJpbmcuJFMyLmVzY2FwZScsICdAaW50ZXJwb2xhdGVkJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAcXN0cmluZycgfVxuICAgICAgICBdLFxuICAgICAgICAvLyB3aGl0ZXNwYWNlICYgY29tbWVudHNcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy9eXFxzKj1iZWdpblxcYi8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbLyMuKiQvLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1tePV0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXlxccyo9YmVnaW5cXGIvLCAnY29tbWVudC5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL15cXHMqPWVuZFxcYi4qLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bPV0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9ydWJ5L3J1YnkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9ydWJ5L3J1YnkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNiJdLCJzb3VyY2VSb290IjoiIn0=