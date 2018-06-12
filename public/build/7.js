webpackJsonp([7],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.js ***!
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
        blockComment: ['<!--', '-->'],
    },
    brackets: [
        ['<', '>']
    ],
    autoClosingPairs: [
        { open: '<', close: '>' },
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
    ],
    surroundingPairs: [
        { open: '<', close: '>' },
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.xml',
    ignoreCase: true,
    // Useful regular expressions
    qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
    tokenizer: {
        root: [
            [/[^<&]+/, ''],
            { include: '@whitespace' },
            // Standard opening tag
            [/(<)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'tag', next: '@tag' }
                ]],
            // Standard closing tag
            [/(<\/)(@qualifiedName)(\s*)(>)/, [
                    { token: 'delimiter' },
                    { token: 'tag' },
                    '',
                    { token: 'delimiter' }
                ]],
            // Meta tags - instruction
            [/(<\?)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'metatag', next: '@tag' }
                ]],
            // Meta tags - declaration
            [/(<\!)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'metatag', next: '@tag' }
                ]],
            // CDATA
            [/<\!\[CDATA\[/, { token: 'delimiter.cdata', next: '@cdata' }],
            [/&\w+;/, 'string.escape'],
        ],
        cdata: [
            [/[^\]]+/, ''],
            [/\]\]>/, { token: 'delimiter.cdata', next: '@pop' }],
            [/\]/, '']
        ],
        tag: [
            [/[ \t\r\n]+/, ''],
            [/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name', '', 'attribute.value']],
            [/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/, ['attribute.name', '', 'attribute.value']],
            [/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/, ['attribute.name', '', 'attribute.value']],
            [/@qualifiedName/, 'attribute.name'],
            [/\?>/, { token: 'delimiter', next: '@pop' }],
            [/(\/)(>)/, [
                    { token: 'tag' },
                    { token: 'delimiter', next: '@pop' }
                ]],
            [/>/, { token: 'delimiter', next: '@pop' }],
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/<!--/, { token: 'comment', next: '@comment' }]
        ],
        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, { token: 'comment', next: '@pop' }],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ],
    },
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3htbC94bWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMscUJBQXFCLGVBQWU7QUFDcEM7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDhCQUE4QiwyQ0FBMkM7QUFDekUsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5Q0FBeUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtQ0FBbUM7QUFDeEQ7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQyxxQkFBcUI7QUFDckI7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxQ0FBcUM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGJsb2NrQ29tbWVudDogWyc8IS0tJywgJy0tPiddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyc8JywgJz4nXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+JyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+JyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIF1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnhtbCcsXG4gICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICAvLyBVc2VmdWwgcmVndWxhciBleHByZXNzaW9uc1xuICAgIHF1YWxpZmllZE5hbWU6IC8oPzpbXFx3XFwuXFwtXSs6KT9bXFx3XFwuXFwtXSsvLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICBbL1tePCZdKy8sICcnXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgLy8gU3RhbmRhcmQgb3BlbmluZyB0YWdcbiAgICAgICAgICAgIFsvKDwpKEBxdWFsaWZpZWROYW1lKS8sIFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ3RhZycsIG5leHQ6ICdAdGFnJyB9XG4gICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICAvLyBTdGFuZGFyZCBjbG9zaW5nIHRhZ1xuICAgICAgICAgICAgWy8oPFxcLykoQHF1YWxpZmllZE5hbWUpKFxccyopKD4pLywgW1xuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAndGFnJyB9LFxuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlcicgfVxuICAgICAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgLy8gTWV0YSB0YWdzIC0gaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgIFsvKDxcXD8pKEBxdWFsaWZpZWROYW1lKS8sIFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ21ldGF0YWcnLCBuZXh0OiAnQHRhZycgfVxuICAgICAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgLy8gTWV0YSB0YWdzIC0gZGVjbGFyYXRpb25cbiAgICAgICAgICAgIFsvKDxcXCEpKEBxdWFsaWZpZWROYW1lKS8sIFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ21ldGF0YWcnLCBuZXh0OiAnQHRhZycgfVxuICAgICAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgLy8gQ0RBVEFcbiAgICAgICAgICAgIFsvPFxcIVxcW0NEQVRBXFxbLywgeyB0b2tlbjogJ2RlbGltaXRlci5jZGF0YScsIG5leHQ6ICdAY2RhdGEnIH1dLFxuICAgICAgICAgICAgWy8mXFx3KzsvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICBdLFxuICAgICAgICBjZGF0YTogW1xuICAgICAgICAgICAgWy9bXlxcXV0rLywgJyddLFxuICAgICAgICAgICAgWy9cXF1cXF0+LywgeyB0b2tlbjogJ2RlbGltaXRlci5jZGF0YScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvXFxdLywgJyddXG4gICAgICAgIF0sXG4gICAgICAgIHRhZzogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy8oQHF1YWxpZmllZE5hbWUpKFxccyo9XFxzKikoXCJbXlwiXSpcInwnW14nXSonKS8sIFsnYXR0cmlidXRlLm5hbWUnLCAnJywgJ2F0dHJpYnV0ZS52YWx1ZSddXSxcbiAgICAgICAgICAgIFsvKEBxdWFsaWZpZWROYW1lKShcXHMqPVxccyopKFwiW15cIj4/XFwvXSp8J1teJz4/XFwvXSopKD89W1xcP1xcL11cXD4pLywgWydhdHRyaWJ1dGUubmFtZScsICcnLCAnYXR0cmlidXRlLnZhbHVlJ11dLFxuICAgICAgICAgICAgWy8oQHF1YWxpZmllZE5hbWUpKFxccyo9XFxzKikoXCJbXlwiPl0qfCdbXic+XSopLywgWydhdHRyaWJ1dGUubmFtZScsICcnLCAnYXR0cmlidXRlLnZhbHVlJ11dLFxuICAgICAgICAgICAgWy9AcXVhbGlmaWVkTmFtZS8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy9cXD8+LywgeyB0b2tlbjogJ2RlbGltaXRlcicsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvKFxcLykoPikvLCBbXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICd0YWcnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXInLCBuZXh0OiAnQHBvcCcgfVxuICAgICAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlcicsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy88IS0tLywgeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQGNvbW1lbnQnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW148XFwtXSsvLCAnY29tbWVudC5jb250ZW50J10sXG4gICAgICAgICAgICBbLy0tPi8sIHsgdG9rZW46ICdjb21tZW50JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88IS0tLywgJ2NvbW1lbnQuY29udGVudC5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1s8XFwtXS8sICdjb21tZW50LmNvbnRlbnQnXVxuICAgICAgICBdLFxuICAgIH0sXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3htbC94bWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy94bWwveG1sLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyJdLCJzb3VyY2VSb290IjoiIn0=