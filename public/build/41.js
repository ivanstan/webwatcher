webpackJsonp([41],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js ***!
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
    brackets: [],
    autoClosingPairs: [],
    surroundingPairs: []
};
var language = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',
    keywords: [],
    typeKeywords: [],
    tokenPostfix: '.csp',
    operators: [],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
        root: [
            [/child-src/, 'string.quote'],
            [/connect-src/, 'string.quote'],
            [/default-src/, 'string.quote'],
            [/font-src/, 'string.quote'],
            [/frame-src/, 'string.quote'],
            [/img-src/, 'string.quote'],
            [/manifest-src/, 'string.quote'],
            [/media-src/, 'string.quote'],
            [/object-src/, 'string.quote'],
            [/script-src/, 'string.quote'],
            [/style-src/, 'string.quote'],
            [/worker-src/, 'string.quote'],
            [/base-uri/, 'string.quote'],
            [/plugin-types/, 'string.quote'],
            [/sandbox/, 'string.quote'],
            [/disown-opener/, 'string.quote'],
            [/form-action/, 'string.quote'],
            [/frame-ancestors/, 'string.quote'],
            [/report-uri/, 'string.quote'],
            [/report-to/, 'string.quote'],
            [/upgrade-insecure-requests/, 'string.quote'],
            [/block-all-mixed-content/, 'string.quote'],
            [/require-sri-for/, 'string.quote'],
            [/reflected-xss/, 'string.quote'],
            [/referrer/, 'string.quote'],
            [/policy-uri/, 'string.quote'],
            [/'self'/, 'string.quote'],
            [/'unsafe-inline'/, 'string.quote'],
            [/'unsafe-eval'/, 'string.quote'],
            [/'strict-dynamic'/, 'string.quote'],
            [/'unsafe-hashed-attributes'/, 'string.quote']
        ]
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NzcC9jc3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNDEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBicmFja2V0czogW10sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW10sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW11cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIC8vIFNldCBkZWZhdWx0VG9rZW4gdG8gaW52YWxpZCB0byBzZWUgd2hhdCB5b3UgZG8gbm90IHRva2VuaXplIHlldFxuICAgIC8vIGRlZmF1bHRUb2tlbjogJ2ludmFsaWQnLFxuICAgIGtleXdvcmRzOiBbXSxcbiAgICB0eXBlS2V5d29yZHM6IFtdLFxuICAgIHRva2VuUG9zdGZpeDogJy5jc3AnLFxuICAgIG9wZXJhdG9yczogW10sXG4gICAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVdKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgWy9jaGlsZC1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2Nvbm5lY3Qtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9kZWZhdWx0LXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvZm9udC1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2ZyYW1lLXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvaW1nLXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvbWFuaWZlc3Qtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9tZWRpYS1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL29iamVjdC1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3NjcmlwdC1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3N0eWxlLXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvd29ya2VyLXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvYmFzZS11cmkvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3BsdWdpbi10eXBlcy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvc2FuZGJveC8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvZGlzb3duLW9wZW5lci8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvZm9ybS1hY3Rpb24vLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2ZyYW1lLWFuY2VzdG9ycy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcmVwb3J0LXVyaS8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcmVwb3J0LXRvLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy91cGdyYWRlLWluc2VjdXJlLXJlcXVlc3RzLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9ibG9jay1hbGwtbWl4ZWQtY29udGVudC8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcmVxdWlyZS1zcmktZm9yLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9yZWZsZWN0ZWQteHNzLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9yZWZlcnJlci8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcG9saWN5LXVyaS8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvJ3NlbGYnLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy8ndW5zYWZlLWlubGluZScvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbLyd1bnNhZmUtZXZhbCcvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbLydzdHJpY3QtZHluYW1pYycvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbLyd1bnNhZmUtaGFzaGVkLWF0dHJpYnV0ZXMnLywgJ3N0cmluZy5xdW90ZSddXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NzcC9jc3AuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9jc3AvY3NwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gNDEiXSwic291cmNlUm9vdCI6IiJ9