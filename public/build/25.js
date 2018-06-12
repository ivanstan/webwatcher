webpackJsonp([25],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js ***!
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
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '(', close: ')', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] }
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*(#|\/\/)region\\b"),
            end: new RegExp("^\\s*(#|\/\/)endregion\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '',
    // ignoreCase: true,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.root' }],
            [/<!DOCTYPE/, 'metatag.html', '@doctype'],
            [/<!--/, 'comment.html', '@comment'],
            [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],
            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],
            [/(<)([:\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/(<\/)(\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/</, 'delimiter.html'],
            [/[^<]+/] // text
        ],
        doctype: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],
            [/[^>]+/, 'metatag.content.html'],
            [/>/, 'metatag.html', '@pop'],
        ],
        comment: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],
            [/-->/, 'comment.html', '@pop'],
            [/[^-]+/, 'comment.content.html'],
            [/./, 'comment.content.html']
        ],
        otherTag: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.otherTag' }],
            [/\/?>/, 'delimiter.html', '@pop'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
        ],
        // -- BEGIN <script> tags handling
        // After <script
        script: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.script' }],
            [/type/, 'attribute.name', '@scriptAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/(<\/)(script\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]
        ],
        // After <script ... type
        scriptAfterType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterType' }],
            [/=/, 'delimiter', '@scriptAfterTypeEquals'],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type =
        scriptAfterTypeEquals: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterTypeEquals' }],
            [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type = $S2
        scriptWithCustomType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptWithCustomType.$S2' }],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptEmbedded: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],
            [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <script> tags handling
        // -- BEGIN <style> tags handling
        // After <style
        style: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.style' }],
            [/type/, 'attribute.name', '@styleAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/(<\/)(style\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]
        ],
        // After <style ... type
        styleAfterType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterType' }],
            [/=/, 'delimiter', '@styleAfterTypeEquals'],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type =
        styleAfterTypeEquals: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterTypeEquals' }],
            [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type = $S2
        styleWithCustomType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleWithCustomType.$S2' }],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleEmbedded: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],
            [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <style> tags handling
        phpInSimpleState: [
            [/<\?((php)|=)?/, 'metatag.php'],
            [/\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3' }],
            { include: 'phpRoot' }
        ],
        phpInEmbeddedState: [
            [/<\?((php)|=)?/, 'metatag.php'],
            [/\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],
            { include: 'phpRoot' }
        ],
        phpRoot: [
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@phpKeywords': { token: 'keyword.php' },
                        '@phpCompileTimeConstants': { token: 'constant.php' },
                        '@default': 'identifier.php'
                    }
                }],
            [/[$a-zA-Z_]\w*/, {
                    cases: {
                        '@phpPreDefinedVariables': { token: 'variable.predefined.php' },
                        '@default': 'variable.php'
                    }
                }],
            // brackets
            [/[{}]/, 'delimiter.bracket.php'],
            [/[\[\]]/, 'delimiter.array.php'],
            [/[()]/, 'delimiter.parenthesis.php'],
            // whitespace
            [/[ \t\r\n]+/],
            // comments
            [/#/, 'comment.php', '@phpLineComment'],
            [/\/\//, 'comment.php', '@phpLineComment'],
            // block comments
            [/\/\*/, 'comment.php', '@phpComment'],
            // strings
            [/"/, 'string.php', '@phpDoubleQuoteString'],
            [/'/, 'string.php', '@phpSingleQuoteString'],
            // delimiters
            [/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,\@]/, 'delimiter.php'],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?/, 'number.float.php'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float.php'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.php'],
            [/0[0-7']*[0-7]/, 'number.octal.php'],
            [/0[bB][0-1']*[0-1]/, 'number.binary.php'],
            [/\d[\d']*/, 'number.php'],
            [/\d/, 'number.php'],
        ],
        phpComment: [
            [/\*\//, 'comment.php', '@pop'],
            [/[^*]+/, 'comment.php'],
            [/./, 'comment.php']
        ],
        phpLineComment: [
            [/\?>/, { token: '@rematch', next: '@pop' }],
            [/.$/, 'comment.php', '@pop'],
            [/[^?]+$/, 'comment.php', '@pop'],
            [/[^?]+/, 'comment.php'],
            [/./, 'comment.php']
        ],
        phpDoubleQuoteString: [
            [/[^\\"]+/, 'string.php'],
            [/@escapes/, 'string.escape.php'],
            [/\\./, 'string.escape.invalid.php'],
            [/"/, 'string.php', '@pop']
        ],
        phpSingleQuoteString: [
            [/[^\\']+/, 'string.php'],
            [/@escapes/, 'string.escape.php'],
            [/\\./, 'string.escape.invalid.php'],
            [/'/, 'string.php', '@pop']
        ],
    },
    phpKeywords: [
        'abstract', 'and', 'array', 'as', 'break',
        'callable', 'case', 'catch', 'cfunction', 'class', 'clone',
        'const', 'continue', 'declare', 'default', 'do',
        'else', 'elseif', 'enddeclare', 'endfor', 'endforeach',
        'endif', 'endswitch', 'endwhile', 'extends', 'false', 'final',
        'for', 'foreach', 'function', 'global', 'goto',
        'if', 'implements', 'interface', 'instanceof', 'insteadof',
        'namespace', 'new', 'null', 'object', 'old_function', 'or', 'private',
        'protected', 'public', 'resource', 'static', 'switch', 'throw', 'trait',
        'try', 'true', 'use', 'var', 'while', 'xor',
        'die', 'echo', 'empty', 'exit', 'eval',
        'include', 'include_once', 'isset', 'list', 'require',
        'require_once', 'return', 'print', 'unset', 'yield',
        '__construct'
    ],
    phpCompileTimeConstants: [
        '__CLASS__',
        '__DIR__',
        '__FILE__',
        '__LINE__',
        '__NAMESPACE__',
        '__METHOD__',
        '__FUNCTION__',
        '__TRAIT__'
    ],
    phpPreDefinedVariables: [
        '$GLOBALS',
        '$_SERVER',
        '$_GET',
        '$_POST',
        '$_FILES',
        '$_REQUEST',
        '$_SESSION',
        '$_ENV',
        '$_COOKIE',
        '$php_errormsg',
        '$HTTP_RAW_POST_DATA',
        '$http_response_header',
        '$argc',
        '$argv'
    ],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3BocC9waHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLElBQUksTUFBTTtBQUM5RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxzQkFBc0I7QUFDcEQsU0FBUywyQ0FBMkM7QUFDcEQsU0FBUywyQ0FBMkM7QUFDcEQsU0FBUywyQ0FBMkM7QUFDcEQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3REFBd0Q7QUFDdkY7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHFDQUFxQztBQUNyRiwrQ0FBK0Msb0NBQW9DO0FBQ25GLGdEQUFnRCx1Q0FBdUM7QUFDdkYsK0NBQStDLHVDQUF1QztBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwyREFBMkQ7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMkRBQTJEO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNERBQTREO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBEQUEwRDtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9HQUFvRztBQUN2SDtBQUNBLG9FQUFvRSx3Q0FBd0M7QUFDNUc7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1FQUFtRTtBQUNsRztBQUNBLG1CQUFtQixvR0FBb0c7QUFDdkg7QUFDQSwrQkFBK0Isa0NBQWtDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5RUFBeUU7QUFDeEcsMkJBQTJCLGlFQUFpRTtBQUM1RiwyQkFBMkIsaUVBQWlFO0FBQzVGLG1CQUFtQixvR0FBb0c7QUFDdkg7QUFDQSwrQkFBK0Isa0NBQWtDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0RUFBNEU7QUFDM0csbUJBQW1CLDRFQUE0RTtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtDQUFrQztBQUNqRTtBQUNBO0FBQ0EsK0JBQStCLDhGQUE4RjtBQUM3SCwyQkFBMkIsd0RBQXdEO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseURBQXlEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUZBQXFGO0FBQ3hHO0FBQ0EsbUVBQW1FLHdDQUF3QztBQUMzRztBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0VBQWtFO0FBQ2pHO0FBQ0EsbUJBQW1CLHFGQUFxRjtBQUN4RztBQUNBLDhCQUE4QixrQ0FBa0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHdFQUF3RTtBQUN2RywyQkFBMkIsZ0VBQWdFO0FBQzNGLDJCQUEyQixnRUFBZ0U7QUFDM0YsbUJBQW1CLHFGQUFxRjtBQUN4RztBQUNBLDhCQUE4QixrQ0FBa0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDJFQUEyRTtBQUMxRyxtQkFBbUIsMkVBQTJFO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQSwrQkFBK0IsNkZBQTZGO0FBQzVILDBCQUEwQix3REFBd0Q7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkNBQTZDO0FBQ2xFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0VBQWtFO0FBQ3ZGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyx1QkFBdUI7QUFDaEUscURBQXFELHdCQUF3QjtBQUM3RTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvREFBb0QsbUNBQW1DO0FBQ3ZGO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtDQUFrQztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxJQUFJLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDbEYiLCJmaWxlIjoiMjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICB3b3JkUGF0dGVybjogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXGBcXH5cXCFcXEBcXCNcXCVcXF5cXCZcXCpcXChcXClcXC1cXD1cXCtcXFtcXHtcXF1cXH1cXFxcXFx8XFw7XFw6XFwnXFxcIlxcLFxcLlxcPFxcPlxcL1xcP1xcc10rKS9nLFxuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXVxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9Jywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIG5vdEluOiBbJ3N0cmluZyddIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfVxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyooI3xcXC9cXC8pcmVnaW9uXFxcXGJcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqKCN8XFwvXFwvKWVuZHJlZ2lvblxcXFxiXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJycsXG4gICAgLy8gaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICAvLyBUaGUgbWFpbiB0b2tlbml6ZXIgZm9yIG91ciBsYW5ndWFnZXNcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluU2ltcGxlU3RhdGUucm9vdCcgfV0sXG4gICAgICAgICAgICBbLzwhRE9DVFlQRS8sICdtZXRhdGFnLmh0bWwnLCAnQGRvY3R5cGUnXSxcbiAgICAgICAgICAgIFsvPCEtLS8sICdjb21tZW50Lmh0bWwnLCAnQGNvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvKDwpKFxcdyspKFxcLz4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsICdkZWxpbWl0ZXIuaHRtbCddXSxcbiAgICAgICAgICAgIFsvKDwpKHNjcmlwdCkvLCBbJ2RlbGltaXRlci5odG1sJywgeyB0b2tlbjogJ3RhZy5odG1sJywgbmV4dDogJ0BzY3JpcHQnIH1dXSxcbiAgICAgICAgICAgIFsvKDwpKHN0eWxlKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQHN0eWxlJyB9XV0sXG4gICAgICAgICAgICBbLyg8KShbOlxcd10rKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQG90aGVyVGFnJyB9XV0sXG4gICAgICAgICAgICBbLyg8XFwvKShcXHcrKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQG90aGVyVGFnJyB9XV0sXG4gICAgICAgICAgICBbLzwvLCAnZGVsaW1pdGVyLmh0bWwnXSxcbiAgICAgICAgICAgIFsvW148XSsvXSAvLyB0ZXh0XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3R5cGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLmNvbW1lbnQnIH1dLFxuICAgICAgICAgICAgWy9bXj5dKy8sICdtZXRhdGFnLmNvbnRlbnQuaHRtbCddLFxuICAgICAgICAgICAgWy8+LywgJ21ldGF0YWcuaHRtbCcsICdAcG9wJ10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLmNvbW1lbnQnIH1dLFxuICAgICAgICAgICAgWy8tLT4vLCAnY29tbWVudC5odG1sJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW14tXSsvLCAnY29tbWVudC5jb250ZW50Lmh0bWwnXSxcbiAgICAgICAgICAgIFsvLi8sICdjb21tZW50LmNvbnRlbnQuaHRtbCddXG4gICAgICAgIF0sXG4gICAgICAgIG90aGVyVGFnOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5vdGhlclRhZycgfV0sXG4gICAgICAgICAgICBbL1xcLz8+LywgJ2RlbGltaXRlci5odG1sJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIC0tIEJFR0lOIDxzY3JpcHQ+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdFxuICAgICAgICBzY3JpcHQ6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL3R5cGUvLCAnYXR0cmlidXRlLm5hbWUnLCAnQHNjcmlwdEFmdGVyVHlwZSddLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvW1xcd1xcLV0rLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLnRleHQvamF2YXNjcmlwdCcsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvKDxcXC8pKHNjcmlwdFxccyopKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAcG9wJyB9XV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdCAuLi4gdHlwZVxuICAgICAgICBzY3JpcHRBZnRlclR5cGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnNjcmlwdEFmdGVyVHlwZScgfV0sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJywgJ0BzY3JpcHRBZnRlclR5cGVFcXVhbHMnXSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc2NyaXB0RW1iZWRkZWQudGV4dC9qYXZhc2NyaXB0JywgbmV4dEVtYmVkZGVkOiAndGV4dC9qYXZhc2NyaXB0JyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdCAuLi4gdHlwZSA9XG4gICAgICAgIHNjcmlwdEFmdGVyVHlwZUVxdWFsczogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluU2ltcGxlU3RhdGUuc2NyaXB0QWZ0ZXJUeXBlRXF1YWxzJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIHN3aXRjaFRvOiAnQHNjcmlwdFdpdGhDdXN0b21UeXBlLiQxJyB9XSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIHN3aXRjaFRvOiAnQHNjcmlwdFdpdGhDdXN0b21UeXBlLiQxJyB9XSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc2NyaXB0RW1iZWRkZWQudGV4dC9qYXZhc2NyaXB0JywgbmV4dEVtYmVkZGVkOiAndGV4dC9qYXZhc2NyaXB0JyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdCAuLi4gdHlwZSA9ICRTMlxuICAgICAgICBzY3JpcHRXaXRoQ3VzdG9tVHlwZTogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluU2ltcGxlU3RhdGUuc2NyaXB0V2l0aEN1c3RvbVR5cGUuJFMyJyB9XSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc2NyaXB0RW1iZWRkZWQuJFMyJywgbmV4dEVtYmVkZGVkOiAnJFMyJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zY3JpcHRcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICBzY3JpcHRFbWJlZGRlZDogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluRW1iZWRkZWRTdGF0ZS5zY3JpcHRFbWJlZGRlZC4kUzInLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvPFxcL3NjcmlwdC8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJywgbmV4dEVtYmVkZGVkOiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gLS0gRU5EIDxzY3JpcHQ+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgLy8gLS0gQkVHSU4gPHN0eWxlPiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZVxuICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluU2ltcGxlU3RhdGUuc3R5bGUnIH1dLFxuICAgICAgICAgICAgWy90eXBlLywgJ2F0dHJpYnV0ZS5uYW1lJywgJ0BzdHlsZUFmdGVyVHlwZSddLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvW1xcd1xcLV0rLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQudGV4dC9jc3MnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2NzcycgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvKDxcXC8pKHN0eWxlXFxzKikoPikvLCBbJ2RlbGltaXRlci5odG1sJywgJ3RhZy5odG1sJywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0Bwb3AnIH1dXVxuICAgICAgICBdLFxuICAgICAgICAvLyBBZnRlciA8c3R5bGUgLi4uIHR5cGVcbiAgICAgICAgc3R5bGVBZnRlclR5cGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnN0eWxlQWZ0ZXJUeXBlJyB9XSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInLCAnQHN0eWxlQWZ0ZXJUeXBlRXF1YWxzJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQudGV4dC9jc3MnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2NzcycgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlID1cbiAgICAgICAgc3R5bGVBZnRlclR5cGVFcXVhbHM6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnN0eWxlQWZ0ZXJUeXBlRXF1YWxzJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIHN3aXRjaFRvOiAnQHN0eWxlV2l0aEN1c3RvbVR5cGUuJDEnIH1dLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgc3dpdGNoVG86ICdAc3R5bGVXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQudGV4dC9jc3MnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2NzcycgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlID0gJFMyXG4gICAgICAgIHN0eWxlV2l0aEN1c3RvbVR5cGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnN0eWxlV2l0aEN1c3RvbVR5cGUuJFMyJyB9XSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc3R5bGVFbWJlZGRlZC4kUzInLCBuZXh0RW1iZWRkZWQ6ICckUzInIH1dLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvW1xcd1xcLV0rLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgc3R5bGVFbWJlZGRlZDogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluRW1iZWRkZWRTdGF0ZS5zdHlsZUVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88XFwvc3R5bGUvLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIC0tIEVORCA8c3R5bGU+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgcGhwSW5TaW1wbGVTdGF0ZTogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sICdtZXRhdGFnLnBocCddLFxuICAgICAgICAgICAgWy9cXD8+LywgeyB0b2tlbjogJ21ldGF0YWcucGhwJywgc3dpdGNoVG86ICdAJFMyLiRTMycgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdwaHBSb290JyB9XG4gICAgICAgIF0sXG4gICAgICAgIHBocEluRW1iZWRkZWRTdGF0ZTogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sICdtZXRhdGFnLnBocCddLFxuICAgICAgICAgICAgWy9cXD8+LywgeyB0b2tlbjogJ21ldGF0YWcucGhwJywgc3dpdGNoVG86ICdAJFMyLiRTMycsIG5leHRFbWJlZGRlZDogJyRTMycgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdwaHBSb290JyB9XG4gICAgICAgIF0sXG4gICAgICAgIHBocFJvb3Q6IFtcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcGhwS2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC5waHAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQHBocENvbXBpbGVUaW1lQ29uc3RhbnRzJzogeyB0b2tlbjogJ2NvbnN0YW50LnBocCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyLnBocCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9bJGEtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcGhwUHJlRGVmaW5lZFZhcmlhYmxlcyc6IHsgdG9rZW46ICd2YXJpYWJsZS5wcmVkZWZpbmVkLnBocCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICd2YXJpYWJsZS5waHAnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIGJyYWNrZXRzXG4gICAgICAgICAgICBbL1t7fV0vLCAnZGVsaW1pdGVyLmJyYWNrZXQucGhwJ10sXG4gICAgICAgICAgICBbL1tcXFtcXF1dLywgJ2RlbGltaXRlci5hcnJheS5waHAnXSxcbiAgICAgICAgICAgIFsvWygpXS8sICdkZWxpbWl0ZXIucGFyZW50aGVzaXMucGhwJ10sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIC8vIGNvbW1lbnRzXG4gICAgICAgICAgICBbLyMvLCAnY29tbWVudC5waHAnLCAnQHBocExpbmVDb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcLy8sICdjb21tZW50LnBocCcsICdAcGhwTGluZUNvbW1lbnQnXSxcbiAgICAgICAgICAgIC8vIGJsb2NrIGNvbW1lbnRzXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50LnBocCcsICdAcGhwQ29tbWVudCddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcucGhwJywgJ0BwaHBEb3VibGVRdW90ZVN0cmluZyddLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5waHAnLCAnQHBocFNpbmdsZVF1b3RlU3RyaW5nJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXJzXG4gICAgICAgICAgICBbL1tcXCtcXC1cXCpcXCVcXCZcXHxcXF5cXH5cXCFcXD1cXDxcXD5cXC9cXD9cXDtcXDpcXC5cXCxcXEBdLywgJ2RlbGltaXRlci5waHAnXSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvXFxkKlxcZCtbZUVdKFtcXC0rXT9cXGQrKT8vLCAnbnVtYmVyLmZsb2F0LnBocCddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPy8sICdudW1iZXIuZmxvYXQucGhwJ10sXG4gICAgICAgICAgICBbLzBbeFhdWzAtOWEtZkEtRiddKlswLTlhLWZBLUZdLywgJ251bWJlci5oZXgucGhwJ10sXG4gICAgICAgICAgICBbLzBbMC03J10qWzAtN10vLCAnbnVtYmVyLm9jdGFsLnBocCddLFxuICAgICAgICAgICAgWy8wW2JCXVswLTEnXSpbMC0xXS8sICdudW1iZXIuYmluYXJ5LnBocCddLFxuICAgICAgICAgICAgWy9cXGRbXFxkJ10qLywgJ251bWJlci5waHAnXSxcbiAgICAgICAgICAgIFsvXFxkLywgJ251bWJlci5waHAnXSxcbiAgICAgICAgXSxcbiAgICAgICAgcGhwQ29tbWVudDogW1xuICAgICAgICAgICAgWy9cXCpcXC8vLCAnY29tbWVudC5waHAnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXipdKy8sICdjb21tZW50LnBocCddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQucGhwJ11cbiAgICAgICAgXSxcbiAgICAgICAgcGhwTGluZUNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvXFw/Pi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvLiQvLCAnY29tbWVudC5waHAnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXj9dKyQvLCAnY29tbWVudC5waHAnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXj9dKy8sICdjb21tZW50LnBocCddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQucGhwJ11cbiAgICAgICAgXSxcbiAgICAgICAgcGhwRG91YmxlUXVvdGVTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCJdKy8sICdzdHJpbmcucGhwJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUucGhwJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZC5waHAnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nLnBocCcsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICAgICAgcGhwU2luZ2xlUXVvdGVTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcJ10rLywgJ3N0cmluZy5waHAnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZS5waHAnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkLnBocCddLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5waHAnLCAnQHBvcCddXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICBwaHBLZXl3b3JkczogW1xuICAgICAgICAnYWJzdHJhY3QnLCAnYW5kJywgJ2FycmF5JywgJ2FzJywgJ2JyZWFrJyxcbiAgICAgICAgJ2NhbGxhYmxlJywgJ2Nhc2UnLCAnY2F0Y2gnLCAnY2Z1bmN0aW9uJywgJ2NsYXNzJywgJ2Nsb25lJyxcbiAgICAgICAgJ2NvbnN0JywgJ2NvbnRpbnVlJywgJ2RlY2xhcmUnLCAnZGVmYXVsdCcsICdkbycsXG4gICAgICAgICdlbHNlJywgJ2Vsc2VpZicsICdlbmRkZWNsYXJlJywgJ2VuZGZvcicsICdlbmRmb3JlYWNoJyxcbiAgICAgICAgJ2VuZGlmJywgJ2VuZHN3aXRjaCcsICdlbmR3aGlsZScsICdleHRlbmRzJywgJ2ZhbHNlJywgJ2ZpbmFsJyxcbiAgICAgICAgJ2ZvcicsICdmb3JlYWNoJywgJ2Z1bmN0aW9uJywgJ2dsb2JhbCcsICdnb3RvJyxcbiAgICAgICAgJ2lmJywgJ2ltcGxlbWVudHMnLCAnaW50ZXJmYWNlJywgJ2luc3RhbmNlb2YnLCAnaW5zdGVhZG9mJyxcbiAgICAgICAgJ25hbWVzcGFjZScsICduZXcnLCAnbnVsbCcsICdvYmplY3QnLCAnb2xkX2Z1bmN0aW9uJywgJ29yJywgJ3ByaXZhdGUnLFxuICAgICAgICAncHJvdGVjdGVkJywgJ3B1YmxpYycsICdyZXNvdXJjZScsICdzdGF0aWMnLCAnc3dpdGNoJywgJ3Rocm93JywgJ3RyYWl0JyxcbiAgICAgICAgJ3RyeScsICd0cnVlJywgJ3VzZScsICd2YXInLCAnd2hpbGUnLCAneG9yJyxcbiAgICAgICAgJ2RpZScsICdlY2hvJywgJ2VtcHR5JywgJ2V4aXQnLCAnZXZhbCcsXG4gICAgICAgICdpbmNsdWRlJywgJ2luY2x1ZGVfb25jZScsICdpc3NldCcsICdsaXN0JywgJ3JlcXVpcmUnLFxuICAgICAgICAncmVxdWlyZV9vbmNlJywgJ3JldHVybicsICdwcmludCcsICd1bnNldCcsICd5aWVsZCcsXG4gICAgICAgICdfX2NvbnN0cnVjdCdcbiAgICBdLFxuICAgIHBocENvbXBpbGVUaW1lQ29uc3RhbnRzOiBbXG4gICAgICAgICdfX0NMQVNTX18nLFxuICAgICAgICAnX19ESVJfXycsXG4gICAgICAgICdfX0ZJTEVfXycsXG4gICAgICAgICdfX0xJTkVfXycsXG4gICAgICAgICdfX05BTUVTUEFDRV9fJyxcbiAgICAgICAgJ19fTUVUSE9EX18nLFxuICAgICAgICAnX19GVU5DVElPTl9fJyxcbiAgICAgICAgJ19fVFJBSVRfXydcbiAgICBdLFxuICAgIHBocFByZURlZmluZWRWYXJpYWJsZXM6IFtcbiAgICAgICAgJyRHTE9CQUxTJyxcbiAgICAgICAgJyRfU0VSVkVSJyxcbiAgICAgICAgJyRfR0VUJyxcbiAgICAgICAgJyRfUE9TVCcsXG4gICAgICAgICckX0ZJTEVTJyxcbiAgICAgICAgJyRfUkVRVUVTVCcsXG4gICAgICAgICckX1NFU1NJT04nLFxuICAgICAgICAnJF9FTlYnLFxuICAgICAgICAnJF9DT09LSUUnLFxuICAgICAgICAnJHBocF9lcnJvcm1zZycsXG4gICAgICAgICckSFRUUF9SQVdfUE9TVF9EQVRBJyxcbiAgICAgICAgJyRodHRwX3Jlc3BvbnNlX2hlYWRlcicsXG4gICAgICAgICckYXJnYycsXG4gICAgICAgICckYXJndidcbiAgICBdLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3BocC9waHAuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9waHAvcGhwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMjUiXSwic291cmNlUm9vdCI6IiJ9