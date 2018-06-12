webpackJsonp([10],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/st/st.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/st/st.js ***!
  \********************************************************************/
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
        ['(', ')'],
        ['var', 'end_var'],
        ['var_input', 'end_var'],
        ['var_output', 'end_var'],
        ['var_in_out', 'end_var'],
        ['var_temp', 'end_var'],
        ['var_global', 'end_var'],
        ['var_access', 'end_var'],
        ['var_external', 'end_var'],
        ['type', 'end_type'],
        ['struct', 'end_struct'],
        ['program', 'end_program'],
        ['function', 'end_function'],
        ['function_block', 'end_function_block'],
        ['action', 'end_action'],
        ['step', 'end_step'],
        ['initial_step', 'end_step'],
        ['transaction', 'end_transaction'],
        ['configuration', 'end_configuration'],
        ['tcp', 'end_tcp'],
        ['recource', 'end_recource'],
        ['channel', 'end_channel'],
        ['library', 'end_library'],
        ['folder', 'end_folder'],
        ['binaries', 'end_binaries'],
        ['includes', 'end_includes'],
        ['sources', 'end_sources']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '/*', close: '*/' },
        { open: '\'', close: '\'', notIn: ['string_sq'] },
        { open: '"', close: '"', notIn: ['string_dq'] },
        { open: 'var', close: 'end_var' },
        { open: 'var_input', close: 'end_var' },
        { open: 'var_output', close: 'end_var' },
        { open: 'var_in_out', close: 'end_var' },
        { open: 'var_temp', close: 'end_var' },
        { open: 'var_global', close: 'end_var' },
        { open: 'var_access', close: 'end_var' },
        { open: 'var_external', close: 'end_var' },
        { open: 'type', close: 'end_type' },
        { open: 'struct', close: 'end_struct' },
        { open: 'program', close: 'end_program' },
        { open: 'function', close: 'end_function' },
        { open: 'function_block', close: 'end_function_block' },
        { open: 'action', close: 'end_action' },
        { open: 'step', close: 'end_step' },
        { open: 'initial_step', close: 'end_step' },
        { open: 'transaction', close: 'end_transaction' },
        { open: 'configuration', close: 'end_configuration' },
        { open: 'tcp', close: 'end_tcp' },
        { open: 'recource', close: 'end_recource' },
        { open: 'channel', close: 'end_channel' },
        { open: 'library', close: 'end_library' },
        { open: 'folder', close: 'end_folder' },
        { open: 'binaries', close: 'end_binaries' },
        { open: 'includes', close: 'end_includes' },
        { open: 'sources', close: 'end_sources' }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: 'var', close: 'end_var' },
        { open: 'var_input', close: 'end_var' },
        { open: 'var_output', close: 'end_var' },
        { open: 'var_in_out', close: 'end_var' },
        { open: 'var_temp', close: 'end_var' },
        { open: 'var_global', close: 'end_var' },
        { open: 'var_access', close: 'end_var' },
        { open: 'var_external', close: 'end_var' },
        { open: 'type', close: 'end_type' },
        { open: 'struct', close: 'end_struct' },
        { open: 'program', close: 'end_program' },
        { open: 'function', close: 'end_function' },
        { open: 'function_block', close: 'end_function_block' },
        { open: 'action', close: 'end_action' },
        { open: 'step', close: 'end_step' },
        { open: 'initial_step', close: 'end_step' },
        { open: 'transaction', close: 'end_transaction' },
        { open: 'configuration', close: 'end_configuration' },
        { open: 'tcp', close: 'end_tcp' },
        { open: 'recource', close: 'end_recource' },
        { open: 'channel', close: 'end_channel' },
        { open: 'library', close: 'end_library' },
        { open: 'folder', close: 'end_folder' },
        { open: 'binaries', close: 'end_binaries' },
        { open: 'includes', close: 'end_includes' },
        { open: 'sources', close: 'end_sources' }
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
    tokenPostfix: '.st',
    ignoreCase: true,
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' }
    ],
    keywords: ['if', 'end_if', 'elsif', 'else', 'case', 'of', 'to',
        'do', 'with', 'by', 'while', 'repeat', 'end_while', 'end_repeat', 'end_case',
        'for', 'end_for', 'task', 'retain', 'non_retain', 'constant', 'with', 'at',
        'exit', 'return', 'interval', 'priority', 'address', 'port', 'on_channel',
        'then', 'iec', 'file', 'uses', 'version', 'packagetype', 'displayname',
        'copyright', 'summary', 'vendor', 'common_source', 'from'],
    constant: ['false', 'true', 'null'],
    defineKeywords: [
        'var', 'var_input', 'var_output', 'var_in_out', 'var_temp', 'var_global',
        'var_access', 'var_external', 'end_var',
        'type', 'end_type', 'struct', 'end_struct', 'program', 'end_program',
        'function', 'end_function', 'function_block', 'end_function_block',
        'configuration', 'end_configuration', 'tcp', 'end_tcp', 'recource',
        'end_recource', 'channel', 'end_channel', 'library', 'end_library',
        'folder', 'end_folder', 'binaries', 'end_binaries', 'includes',
        'end_includes', 'sources', 'end_sources',
        'action', 'end_action', 'step', 'initial_step', 'end_step', 'transaction', 'end_transaction'
    ],
    typeKeywords: ['int', 'sint', 'dint', 'lint', 'usint', 'uint', 'udint', 'ulint',
        'real', 'lreal', 'time', 'date', 'time_of_day', 'date_and_time', 'string',
        'bool', 'byte', 'world', 'dworld', 'array', 'pointer', 'lworld'],
    operators: ['=', '>', '<', ':', ':=', '<=', '>=', '<>', '&', '+', '-', '*', '**',
        'MOD', '^', 'or', 'and', 'not', 'xor', 'abs', 'acos', 'asin', 'atan', 'cos',
        'exp', 'expt', 'ln', 'log', 'sin', 'sqrt', 'tan', 'sel', 'max', 'min', 'limit',
        'mux', 'shl', 'shr', 'rol', 'ror', 'indexof', 'sizeof', 'adr', 'adrinst',
        'bitadr', 'is_valid'],
    builtinVariables: [],
    builtinFunctions: ['sr', 'rs', 'tp', 'ton', 'tof', 'eq', 'ge', 'le', 'lt',
        'ne', 'round', 'trunc', 'ctd', 'сtu', 'ctud', 'r_trig', 'f_trig',
        'move', 'concat', 'delete', 'find', 'insert', 'left', 'len', 'replace',
        'right', 'rtc'],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/(T|DT|TOD)#[0-9:-_shmyd]*/, 'tag'],
            [/[A-Za-z]{1,6}#[0-9]*/, 'tag'],
            [/\%(I|Q|M)(X|B|W|D|L)[0-9\.]*/, 'tag'],
            [/\%(I|Q|M)[0-9\.]*/, 'tag'],
            [/(TO_|CTU_|CTD_|CTUD_|MUX_|SEL_)[A_Za-z]*/, 'predefined'],
            [/[A_Za-z]*(_TO_)[A_Za-z]*/, 'predefined'],
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@operators': 'operators',
                        '@keywords': 'keyword',
                        '@typeKeywords': 'type',
                        '@defineKeywords': 'variable',
                        '@constant': 'constant',
                        '@builtinVariables': 'predefined',
                        '@builtinFunctions': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            { include: '@whitespace' },
            [/[;.]/, 'delimiter'],
            [/[{}()\[\]]/, '@brackets'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/16#[0-9a-fA-F]+/, 'number.hex'],
            [/2#[0-9_]+/, 'number.binary'],
            [/\d+/, 'number'],
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string_dq' }],
            [/'/, { token: 'string.quote', bracket: '@open', next: '@string_sq' }],
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        comment2: [
            [/[^\(*]+/, 'comment'],
            [/\(\*/, 'comment', '@push'],
            ["\\*\\)", 'comment', '@pop'],
            [/[\(*]/, 'comment']
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
            [/\(\*/, 'comment', '@comment2'],
        ],
        string_dq: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        string_sq: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3N0L3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsZ0RBQWdEO0FBQ3pELFNBQVMsOENBQThDO0FBQ3ZELFNBQVMsZ0NBQWdDO0FBQ3pDLFNBQVMsc0NBQXNDO0FBQy9DLFNBQVMsdUNBQXVDO0FBQ2hELFNBQVMsdUNBQXVDO0FBQ2hELFNBQVMscUNBQXFDO0FBQzlDLFNBQVMsdUNBQXVDO0FBQ2hELFNBQVMsdUNBQXVDO0FBQ2hELFNBQVMseUNBQXlDO0FBQ2xELFNBQVMsa0NBQWtDO0FBQzNDLFNBQVMsc0NBQXNDO0FBQy9DLFNBQVMsd0NBQXdDO0FBQ2pELFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsc0RBQXNEO0FBQy9ELFNBQVMsc0NBQXNDO0FBQy9DLFNBQVMsa0NBQWtDO0FBQzNDLFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsZ0RBQWdEO0FBQ3pELFNBQVMsb0RBQW9EO0FBQzdELFNBQVMsZ0NBQWdDO0FBQ3pDLFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsd0NBQXdDO0FBQ2pELFNBQVMsd0NBQXdDO0FBQ2pELFNBQVMsc0NBQXNDO0FBQy9DLFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsMENBQTBDO0FBQ25ELFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHFDQUFxQztBQUM5QyxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHlDQUF5QztBQUNsRCxTQUFTLGtDQUFrQztBQUMzQyxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLHNEQUFzRDtBQUMvRCxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLGtDQUFrQztBQUMzQyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLGdEQUFnRDtBQUN6RCxTQUFTLG9EQUFvRDtBQUM3RCxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLDBDQUEwQztBQUNuRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1DQUFtQyxZQUFZLEdBQUc7QUFDM0QsU0FBUyx3REFBd0Q7QUFDakUsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsSUFBSSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLElBQUk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYSx5QkFBeUI7QUFDdEMsZ0JBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDhEQUE4RDtBQUNqRixtQkFBbUIsOERBQThEO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQXlEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQXlEO0FBQzVFO0FBQ0E7QUFDQSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnKConLCAnKiknXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ10sXG4gICAgICAgIFsndmFyJywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfaW5wdXQnLCAnZW5kX3ZhciddLFxuICAgICAgICBbJ3Zhcl9vdXRwdXQnLCAnZW5kX3ZhciddLFxuICAgICAgICBbJ3Zhcl9pbl9vdXQnLCAnZW5kX3ZhciddLFxuICAgICAgICBbJ3Zhcl90ZW1wJywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfZ2xvYmFsJywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfYWNjZXNzJywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfZXh0ZXJuYWwnLCAnZW5kX3ZhciddLFxuICAgICAgICBbJ3R5cGUnLCAnZW5kX3R5cGUnXSxcbiAgICAgICAgWydzdHJ1Y3QnLCAnZW5kX3N0cnVjdCddLFxuICAgICAgICBbJ3Byb2dyYW0nLCAnZW5kX3Byb2dyYW0nXSxcbiAgICAgICAgWydmdW5jdGlvbicsICdlbmRfZnVuY3Rpb24nXSxcbiAgICAgICAgWydmdW5jdGlvbl9ibG9jaycsICdlbmRfZnVuY3Rpb25fYmxvY2snXSxcbiAgICAgICAgWydhY3Rpb24nLCAnZW5kX2FjdGlvbiddLFxuICAgICAgICBbJ3N0ZXAnLCAnZW5kX3N0ZXAnXSxcbiAgICAgICAgWydpbml0aWFsX3N0ZXAnLCAnZW5kX3N0ZXAnXSxcbiAgICAgICAgWyd0cmFuc2FjdGlvbicsICdlbmRfdHJhbnNhY3Rpb24nXSxcbiAgICAgICAgWydjb25maWd1cmF0aW9uJywgJ2VuZF9jb25maWd1cmF0aW9uJ10sXG4gICAgICAgIFsndGNwJywgJ2VuZF90Y3AnXSxcbiAgICAgICAgWydyZWNvdXJjZScsICdlbmRfcmVjb3VyY2UnXSxcbiAgICAgICAgWydjaGFubmVsJywgJ2VuZF9jaGFubmVsJ10sXG4gICAgICAgIFsnbGlicmFyeScsICdlbmRfbGlicmFyeSddLFxuICAgICAgICBbJ2ZvbGRlcicsICdlbmRfZm9sZGVyJ10sXG4gICAgICAgIFsnYmluYXJpZXMnLCAnZW5kX2JpbmFyaWVzJ10sXG4gICAgICAgIFsnaW5jbHVkZXMnLCAnZW5kX2luY2x1ZGVzJ10sXG4gICAgICAgIFsnc291cmNlcycsICdlbmRfc291cmNlcyddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJy8qJywgY2xvc2U6ICcqLycgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnLCBub3RJbjogWydzdHJpbmdfc3EnXSB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmdfZHEnXSB9LFxuICAgICAgICB7IG9wZW46ICd2YXInLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9pbnB1dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX291dHB1dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX2luX291dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX3RlbXAnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9nbG9iYWwnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9hY2Nlc3MnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9leHRlcm5hbCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndHlwZScsIGNsb3NlOiAnZW5kX3R5cGUnIH0sXG4gICAgICAgIHsgb3BlbjogJ3N0cnVjdCcsIGNsb3NlOiAnZW5kX3N0cnVjdCcgfSxcbiAgICAgICAgeyBvcGVuOiAncHJvZ3JhbScsIGNsb3NlOiAnZW5kX3Byb2dyYW0nIH0sXG4gICAgICAgIHsgb3BlbjogJ2Z1bmN0aW9uJywgY2xvc2U6ICdlbmRfZnVuY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ2Z1bmN0aW9uX2Jsb2NrJywgY2xvc2U6ICdlbmRfZnVuY3Rpb25fYmxvY2snIH0sXG4gICAgICAgIHsgb3BlbjogJ2FjdGlvbicsIGNsb3NlOiAnZW5kX2FjdGlvbicgfSxcbiAgICAgICAgeyBvcGVuOiAnc3RlcCcsIGNsb3NlOiAnZW5kX3N0ZXAnIH0sXG4gICAgICAgIHsgb3BlbjogJ2luaXRpYWxfc3RlcCcsIGNsb3NlOiAnZW5kX3N0ZXAnIH0sXG4gICAgICAgIHsgb3BlbjogJ3RyYW5zYWN0aW9uJywgY2xvc2U6ICdlbmRfdHJhbnNhY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ2NvbmZpZ3VyYXRpb24nLCBjbG9zZTogJ2VuZF9jb25maWd1cmF0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICd0Y3AnLCBjbG9zZTogJ2VuZF90Y3AnIH0sXG4gICAgICAgIHsgb3BlbjogJ3JlY291cmNlJywgY2xvc2U6ICdlbmRfcmVjb3VyY2UnIH0sXG4gICAgICAgIHsgb3BlbjogJ2NoYW5uZWwnLCBjbG9zZTogJ2VuZF9jaGFubmVsJyB9LFxuICAgICAgICB7IG9wZW46ICdsaWJyYXJ5JywgY2xvc2U6ICdlbmRfbGlicmFyeScgfSxcbiAgICAgICAgeyBvcGVuOiAnZm9sZGVyJywgY2xvc2U6ICdlbmRfZm9sZGVyJyB9LFxuICAgICAgICB7IG9wZW46ICdiaW5hcmllcycsIGNsb3NlOiAnZW5kX2JpbmFyaWVzJyB9LFxuICAgICAgICB7IG9wZW46ICdpbmNsdWRlcycsIGNsb3NlOiAnZW5kX2luY2x1ZGVzJyB9LFxuICAgICAgICB7IG9wZW46ICdzb3VyY2VzJywgY2xvc2U6ICdlbmRfc291cmNlcycgfVxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXInLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9pbnB1dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX291dHB1dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX2luX291dCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyX3RlbXAnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9nbG9iYWwnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9hY2Nlc3MnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9leHRlcm5hbCcsIGNsb3NlOiAnZW5kX3ZhcicgfSxcbiAgICAgICAgeyBvcGVuOiAndHlwZScsIGNsb3NlOiAnZW5kX3R5cGUnIH0sXG4gICAgICAgIHsgb3BlbjogJ3N0cnVjdCcsIGNsb3NlOiAnZW5kX3N0cnVjdCcgfSxcbiAgICAgICAgeyBvcGVuOiAncHJvZ3JhbScsIGNsb3NlOiAnZW5kX3Byb2dyYW0nIH0sXG4gICAgICAgIHsgb3BlbjogJ2Z1bmN0aW9uJywgY2xvc2U6ICdlbmRfZnVuY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ2Z1bmN0aW9uX2Jsb2NrJywgY2xvc2U6ICdlbmRfZnVuY3Rpb25fYmxvY2snIH0sXG4gICAgICAgIHsgb3BlbjogJ2FjdGlvbicsIGNsb3NlOiAnZW5kX2FjdGlvbicgfSxcbiAgICAgICAgeyBvcGVuOiAnc3RlcCcsIGNsb3NlOiAnZW5kX3N0ZXAnIH0sXG4gICAgICAgIHsgb3BlbjogJ2luaXRpYWxfc3RlcCcsIGNsb3NlOiAnZW5kX3N0ZXAnIH0sXG4gICAgICAgIHsgb3BlbjogJ3RyYW5zYWN0aW9uJywgY2xvc2U6ICdlbmRfdHJhbnNhY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ2NvbmZpZ3VyYXRpb24nLCBjbG9zZTogJ2VuZF9jb25maWd1cmF0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICd0Y3AnLCBjbG9zZTogJ2VuZF90Y3AnIH0sXG4gICAgICAgIHsgb3BlbjogJ3JlY291cmNlJywgY2xvc2U6ICdlbmRfcmVjb3VyY2UnIH0sXG4gICAgICAgIHsgb3BlbjogJ2NoYW5uZWwnLCBjbG9zZTogJ2VuZF9jaGFubmVsJyB9LFxuICAgICAgICB7IG9wZW46ICdsaWJyYXJ5JywgY2xvc2U6ICdlbmRfbGlicmFyeScgfSxcbiAgICAgICAgeyBvcGVuOiAnZm9sZGVyJywgY2xvc2U6ICdlbmRfZm9sZGVyJyB9LFxuICAgICAgICB7IG9wZW46ICdiaW5hcmllcycsIGNsb3NlOiAnZW5kX2JpbmFyaWVzJyB9LFxuICAgICAgICB7IG9wZW46ICdpbmNsdWRlcycsIGNsb3NlOiAnZW5kX2luY2x1ZGVzJyB9LFxuICAgICAgICB7IG9wZW46ICdzb3VyY2VzJywgY2xvc2U6ICdlbmRfc291cmNlcycgfVxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyojcHJhZ21hXFxcXHMrcmVnaW9uXFxcXGJcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK2VuZHJlZ2lvblxcXFxiXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJy5zdCcsXG4gICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnLCBvcGVuOiAnWycsIGNsb3NlOiAnXScgfVxuICAgIF0sXG4gICAga2V5d29yZHM6IFsnaWYnLCAnZW5kX2lmJywgJ2Vsc2lmJywgJ2Vsc2UnLCAnY2FzZScsICdvZicsICd0bycsXG4gICAgICAgICdkbycsICd3aXRoJywgJ2J5JywgJ3doaWxlJywgJ3JlcGVhdCcsICdlbmRfd2hpbGUnLCAnZW5kX3JlcGVhdCcsICdlbmRfY2FzZScsXG4gICAgICAgICdmb3InLCAnZW5kX2ZvcicsICd0YXNrJywgJ3JldGFpbicsICdub25fcmV0YWluJywgJ2NvbnN0YW50JywgJ3dpdGgnLCAnYXQnLFxuICAgICAgICAnZXhpdCcsICdyZXR1cm4nLCAnaW50ZXJ2YWwnLCAncHJpb3JpdHknLCAnYWRkcmVzcycsICdwb3J0JywgJ29uX2NoYW5uZWwnLFxuICAgICAgICAndGhlbicsICdpZWMnLCAnZmlsZScsICd1c2VzJywgJ3ZlcnNpb24nLCAncGFja2FnZXR5cGUnLCAnZGlzcGxheW5hbWUnLFxuICAgICAgICAnY29weXJpZ2h0JywgJ3N1bW1hcnknLCAndmVuZG9yJywgJ2NvbW1vbl9zb3VyY2UnLCAnZnJvbSddLFxuICAgIGNvbnN0YW50OiBbJ2ZhbHNlJywgJ3RydWUnLCAnbnVsbCddLFxuICAgIGRlZmluZUtleXdvcmRzOiBbXG4gICAgICAgICd2YXInLCAndmFyX2lucHV0JywgJ3Zhcl9vdXRwdXQnLCAndmFyX2luX291dCcsICd2YXJfdGVtcCcsICd2YXJfZ2xvYmFsJyxcbiAgICAgICAgJ3Zhcl9hY2Nlc3MnLCAndmFyX2V4dGVybmFsJywgJ2VuZF92YXInLFxuICAgICAgICAndHlwZScsICdlbmRfdHlwZScsICdzdHJ1Y3QnLCAnZW5kX3N0cnVjdCcsICdwcm9ncmFtJywgJ2VuZF9wcm9ncmFtJyxcbiAgICAgICAgJ2Z1bmN0aW9uJywgJ2VuZF9mdW5jdGlvbicsICdmdW5jdGlvbl9ibG9jaycsICdlbmRfZnVuY3Rpb25fYmxvY2snLFxuICAgICAgICAnY29uZmlndXJhdGlvbicsICdlbmRfY29uZmlndXJhdGlvbicsICd0Y3AnLCAnZW5kX3RjcCcsICdyZWNvdXJjZScsXG4gICAgICAgICdlbmRfcmVjb3VyY2UnLCAnY2hhbm5lbCcsICdlbmRfY2hhbm5lbCcsICdsaWJyYXJ5JywgJ2VuZF9saWJyYXJ5JyxcbiAgICAgICAgJ2ZvbGRlcicsICdlbmRfZm9sZGVyJywgJ2JpbmFyaWVzJywgJ2VuZF9iaW5hcmllcycsICdpbmNsdWRlcycsXG4gICAgICAgICdlbmRfaW5jbHVkZXMnLCAnc291cmNlcycsICdlbmRfc291cmNlcycsXG4gICAgICAgICdhY3Rpb24nLCAnZW5kX2FjdGlvbicsICdzdGVwJywgJ2luaXRpYWxfc3RlcCcsICdlbmRfc3RlcCcsICd0cmFuc2FjdGlvbicsICdlbmRfdHJhbnNhY3Rpb24nXG4gICAgXSxcbiAgICB0eXBlS2V5d29yZHM6IFsnaW50JywgJ3NpbnQnLCAnZGludCcsICdsaW50JywgJ3VzaW50JywgJ3VpbnQnLCAndWRpbnQnLCAndWxpbnQnLFxuICAgICAgICAncmVhbCcsICdscmVhbCcsICd0aW1lJywgJ2RhdGUnLCAndGltZV9vZl9kYXknLCAnZGF0ZV9hbmRfdGltZScsICdzdHJpbmcnLFxuICAgICAgICAnYm9vbCcsICdieXRlJywgJ3dvcmxkJywgJ2R3b3JsZCcsICdhcnJheScsICdwb2ludGVyJywgJ2x3b3JsZCddLFxuICAgIG9wZXJhdG9yczogWyc9JywgJz4nLCAnPCcsICc6JywgJzo9JywgJzw9JywgJz49JywgJzw+JywgJyYnLCAnKycsICctJywgJyonLCAnKionLFxuICAgICAgICAnTU9EJywgJ14nLCAnb3InLCAnYW5kJywgJ25vdCcsICd4b3InLCAnYWJzJywgJ2Fjb3MnLCAnYXNpbicsICdhdGFuJywgJ2NvcycsXG4gICAgICAgICdleHAnLCAnZXhwdCcsICdsbicsICdsb2cnLCAnc2luJywgJ3NxcnQnLCAndGFuJywgJ3NlbCcsICdtYXgnLCAnbWluJywgJ2xpbWl0JyxcbiAgICAgICAgJ211eCcsICdzaGwnLCAnc2hyJywgJ3JvbCcsICdyb3InLCAnaW5kZXhvZicsICdzaXplb2YnLCAnYWRyJywgJ2Fkcmluc3QnLFxuICAgICAgICAnYml0YWRyJywgJ2lzX3ZhbGlkJ10sXG4gICAgYnVpbHRpblZhcmlhYmxlczogW10sXG4gICAgYnVpbHRpbkZ1bmN0aW9uczogWydzcicsICdycycsICd0cCcsICd0b24nLCAndG9mJywgJ2VxJywgJ2dlJywgJ2xlJywgJ2x0JyxcbiAgICAgICAgJ25lJywgJ3JvdW5kJywgJ3RydW5jJywgJ2N0ZCcsICfRgXR1JywgJ2N0dWQnLCAncl90cmlnJywgJ2ZfdHJpZycsXG4gICAgICAgICdtb3ZlJywgJ2NvbmNhdCcsICdkZWxldGUnLCAnZmluZCcsICdpbnNlcnQnLCAnbGVmdCcsICdsZW4nLCAncmVwbGFjZScsXG4gICAgICAgICdyaWdodCcsICdydGMnXSxcbiAgICAvLyB3ZSBpbmNsdWRlIHRoZXNlIGNvbW1vbiByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVdKy8sXG4gICAgLy8gQyMgc3R5bGUgc3RyaW5nc1xuICAgIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvKFR8RFR8VE9EKSNbMC05Oi1fc2hteWRdKi8sICd0YWcnXSxcbiAgICAgICAgICAgIFsvW0EtWmEtel17MSw2fSNbMC05XSovLCAndGFnJ10sXG4gICAgICAgICAgICBbL1xcJShJfFF8TSkoWHxCfFd8RHxMKVswLTlcXC5dKi8sICd0YWcnXSxcbiAgICAgICAgICAgIFsvXFwlKEl8UXxNKVswLTlcXC5dKi8sICd0YWcnXSxcbiAgICAgICAgICAgIFsvKFRPX3xDVFVffENURF98Q1RVRF98TVVYX3xTRUxfKVtBX1phLXpdKi8sICdwcmVkZWZpbmVkJ10sXG4gICAgICAgICAgICBbL1tBX1phLXpdKihfVE9fKVtBX1phLXpdKi8sICdwcmVkZWZpbmVkJ10sXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAb3BlcmF0b3JzJzogJ29wZXJhdG9ycycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0B0eXBlS2V5d29yZHMnOiAndHlwZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmluZUtleXdvcmRzJzogJ3ZhcmlhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAY29uc3RhbnQnOiAnY29uc3RhbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGluVmFyaWFibGVzJzogJ3ByZWRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGluRnVuY3Rpb25zJzogJ3ByZWRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgWy9bOy5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8xNiNbMC05YS1mQS1GXSsvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8yI1swLTlfXSsvLCAnbnVtYmVyLmJpbmFyeSddLFxuICAgICAgICAgICAgWy9cXGQrLywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgYnJhY2tldDogJ0BvcGVuJywgbmV4dDogJ0BzdHJpbmdfZHEnIH1dLFxuICAgICAgICAgICAgWy8nLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAb3BlbicsIG5leHQ6ICdAc3RyaW5nX3NxJyB9XSxcbiAgICAgICAgICAgIFsvJ1teXFxcXCddJy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ11cbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy9bXlxcLypdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50JywgJ0BwdXNoJ10sXG4gICAgICAgICAgICBbXCJcXFxcKi9cIiwgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXFwvKl0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQyOiBbXG4gICAgICAgICAgICBbL1teXFwoKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwoXFwqLywgJ2NvbW1lbnQnLCAnQHB1c2gnXSxcbiAgICAgICAgICAgIFtcIlxcXFwqXFxcXClcIiwgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXFwoKl0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICd3aGl0ZSddLFxuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXChcXCovLCAnY29tbWVudCcsICdAY29tbWVudDInXSxcbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nX2RxOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAY2xvc2UnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nX3NxOiBbXG4gICAgICAgICAgICBbL1teXFxcXCddKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvJy8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQGNsb3NlJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3N0L3N0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvc3Qvc3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCJdLCJzb3VyY2VSb290IjoiIn0=