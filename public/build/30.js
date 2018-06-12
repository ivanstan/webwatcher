webpackJsonp([30],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/markdown/markdown.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/markdown/markdown.js ***!
  \********************************************************************************/
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

var TOKEN_HEADER_LEAD = 'keyword';
var TOKEN_HEADER = 'keyword';
var TOKEN_EXT_HEADER = 'keyword';
var TOKEN_SEPARATOR = 'meta.separator';
var TOKEN_QUOTE = 'comment';
var TOKEN_LIST = 'keyword';
var TOKEN_BLOCK = 'string';
var TOKEN_BLOCK_CODE = 'variable.source';
var DELIM_ASSIGN = 'delimiter.html';
var ATTRIB_NAME = 'attribute.name.html';
var ATTRIB_VALUE = 'string.html';
function getTag(name) {
    return 'tag';
}
var conf = {
    comments: {
        blockComment: ['<!--', '-->',]
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
        { open: '<', close: '>', notIn: ['string'] }
    ],
    surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '`', close: '`' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
            end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.md',
    // escape codes
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
    escapes: /\\(?:@control)/,
    // escape codes for javascript/CSS strings
    jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
    // non matched elements
    empty: [
        'area', 'base', 'basefont', 'br', 'col', 'frame',
        'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'
    ],
    tokenizer: {
        root: [
            // headers (with #)
            [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', TOKEN_HEADER_LEAD, TOKEN_HEADER, TOKEN_HEADER]],
            // headers (with =)
            [/^\s*(=+|\-+)\s*$/, TOKEN_EXT_HEADER],
            // headers (with ***)
            [/^\s*((\*[ ]?)+)\s*$/, TOKEN_SEPARATOR],
            // quote
            [/^\s*>+/, TOKEN_QUOTE],
            // list (starting with * or number)
            [/^\s*([\*\-+:]|\d+\.)\s/, TOKEN_LIST],
            // code block (4 spaces indent)
            [/^(\t|[ ]{4})[^ ].*$/, TOKEN_BLOCK],
            // code block (3 tilde)
            [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, { token: TOKEN_BLOCK, next: '@codeblock' }],
            // github style code blocks (with backticks and language)
            [/^\s*```\s*((?:\w|[\/\-#])+)\s*$/, { token: TOKEN_BLOCK, next: '@codeblockgh', nextEmbedded: '$1' }],
            // github style code blocks (with backticks but no language)
            [/^\s*```\s*$/, { token: TOKEN_BLOCK, next: '@codeblock' }],
            // markup within lines
            { include: '@linecontent' },
        ],
        codeblock: [
            [/^\s*~~~\s*$/, { token: TOKEN_BLOCK, next: '@pop' }],
            [/^\s*```\s*$/, { token: TOKEN_BLOCK, next: '@pop' }],
            [/.*$/, TOKEN_BLOCK_CODE],
        ],
        // github style code blocks
        codeblockgh: [
            [/```\s*$/, { token: TOKEN_BLOCK_CODE, next: '@pop', nextEmbedded: '@pop' }],
            [/[^`]+/, TOKEN_BLOCK_CODE],
        ],
        linecontent: [
            // escapes
            [/&\w+;/, 'string.escape'],
            [/@escapes/, 'escape'],
            // various markup
            [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'strong'],
            [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'strong'],
            [/\b_[^_]+_\b/, 'emphasis'],
            [/\*([^\\*]|@escapes)+\*/, 'emphasis'],
            [/`([^\\`]|@escapes)+`/, 'variable'],
            // links
            [/\{[^}]+\}/, 'string.target'],
            [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ['string.link', '', 'string.link']],
            [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'string.link'],
            // or html
            { include: 'html' },
        ],
        // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
        // but currently there is a limitation in Monarch that prevents us from doing it: The opening
        // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
        // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
        // we cannot correctly tokenize it in that mode yet.
        html: [
            // html tags
            [/<(\w+)\/>/, getTag('$1')],
            [/<(\w+)/, {
                    cases: {
                        '@empty': { token: getTag('$1'), next: '@tag.$1' },
                        '@default': { token: getTag('$1'), next: '@tag.$1' }
                    }
                }],
            [/<\/(\w+)\s*>/, { token: getTag('$1') }],
            [/<!--/, 'comment', '@comment']
        ],
        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, 'comment', '@pop'],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ],
        // Almost full HTML tag matching, complete with embedded scripts & styles
        tag: [
            [/[ \t\r\n]+/, 'white'],
            [/(type)(\s*=\s*)(")([^"]+)(")/, [ATTRIB_NAME, DELIM_ASSIGN, ATTRIB_VALUE,
                    { token: ATTRIB_VALUE, switchTo: '@tag.$S2.$4' },
                    ATTRIB_VALUE]],
            [/(type)(\s*=\s*)(')([^']+)(')/, [ATTRIB_NAME, DELIM_ASSIGN, ATTRIB_VALUE,
                    { token: ATTRIB_VALUE, switchTo: '@tag.$S2.$4' },
                    ATTRIB_VALUE]],
            [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, [ATTRIB_NAME, DELIM_ASSIGN, ATTRIB_VALUE]],
            [/\w+/, ATTRIB_NAME],
            [/\/>/, getTag('$S2'), '@pop'],
            [/>/, {
                    cases: {
                        '$S2==style': { token: getTag('$S2'), switchTo: 'embeddedStyle', nextEmbedded: 'text/css' },
                        '$S2==script': {
                            cases: {
                                '$S3': { token: getTag('$S2'), switchTo: 'embeddedScript', nextEmbedded: '$S3' },
                                '@default': { token: getTag('$S2'), switchTo: 'embeddedScript', nextEmbedded: 'text/javascript' }
                            }
                        },
                        '@default': { token: getTag('$S2'), next: '@pop' }
                    }
                }],
        ],
        embeddedStyle: [
            [/[^<]+/, ''],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, '']
        ],
        embeddedScript: [
            [/[^<]+/, ''],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, '']
        ],
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL21hcmtkb3duL21hcmtkb3duLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLHdEQUF3RCxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsSUFBSTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsRUFBRTtBQUN6QjtBQUNBLGtEQUFrRCx5Q0FBeUM7QUFDM0Y7QUFDQSxpREFBaUQsK0RBQStEO0FBQ2hIO0FBQ0EsNkJBQTZCLHlDQUF5QztBQUN0RTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0E7QUFDQSw2QkFBNkIsbUNBQW1DO0FBQ2hFLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOERBQThEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsR0FBRyxJQUFJO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdUNBQXVDO0FBQzFFLHFDQUFxQztBQUNyQztBQUNBLGlCQUFpQjtBQUNqQiw4QkFBOEIsc0JBQXNCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBK0M7QUFDcEU7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBK0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDRFQUE0RTtBQUNuSDtBQUNBO0FBQ0Esd0NBQXdDLHdFQUF3RTtBQUNoSCw2Q0FBNkM7QUFDN0M7QUFDQSx5QkFBeUI7QUFDekIscUNBQXFDO0FBQ3JDO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix3REFBd0Q7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isd0RBQXdEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjMwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG52YXIgVE9LRU5fSEVBREVSX0xFQUQgPSAna2V5d29yZCc7XG52YXIgVE9LRU5fSEVBREVSID0gJ2tleXdvcmQnO1xudmFyIFRPS0VOX0VYVF9IRUFERVIgPSAna2V5d29yZCc7XG52YXIgVE9LRU5fU0VQQVJBVE9SID0gJ21ldGEuc2VwYXJhdG9yJztcbnZhciBUT0tFTl9RVU9URSA9ICdjb21tZW50JztcbnZhciBUT0tFTl9MSVNUID0gJ2tleXdvcmQnO1xudmFyIFRPS0VOX0JMT0NLID0gJ3N0cmluZyc7XG52YXIgVE9LRU5fQkxPQ0tfQ09ERSA9ICd2YXJpYWJsZS5zb3VyY2UnO1xudmFyIERFTElNX0FTU0lHTiA9ICdkZWxpbWl0ZXIuaHRtbCc7XG52YXIgQVRUUklCX05BTUUgPSAnYXR0cmlidXRlLm5hbWUuaHRtbCc7XG52YXIgQVRUUklCX1ZBTFVFID0gJ3N0cmluZy5odG1sJztcbmZ1bmN0aW9uIGdldFRhZyhuYW1lKSB7XG4gICAgcmV0dXJuICd0YWcnO1xufVxuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGJsb2NrQ29tbWVudDogWyc8IS0tJywgJy0tPicsXVxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+Jywgbm90SW46IFsnc3RyaW5nJ10gfVxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICdgJywgY2xvc2U6ICdgJyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyo8IS0tXFxcXHMqIz9yZWdpb25cXFxcYi4qLS0+XCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKjwhLS1cXFxccyojP2VuZHJlZ2lvblxcXFxiLiotLT5cIilcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLm1kJyxcbiAgICAvLyBlc2NhcGUgY29kZXNcbiAgICBjb250cm9sOiAvW1xcXFxgKl9cXFtcXF17fSgpIytcXC1cXC4hXS8sXG4gICAgbm9uY29udHJvbDogL1teXFxcXGAqX1xcW1xcXXt9KCkjK1xcLVxcLiFdLyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OkBjb250cm9sKS8sXG4gICAgLy8gZXNjYXBlIGNvZGVzIGZvciBqYXZhc2NyaXB0L0NTUyBzdHJpbmdzXG4gICAganNlc2NhcGVzOiAvXFxcXCg/OltidG5mclxcXFxcIiddfFswLTddWzAtN10/fFswLTNdWzAtN117Mn0pLyxcbiAgICAvLyBub24gbWF0Y2hlZCBlbGVtZW50c1xuICAgIGVtcHR5OiBbXG4gICAgICAgICdhcmVhJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYnInLCAnY29sJywgJ2ZyYW1lJyxcbiAgICAgICAgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdpc2luZGV4JywgJ2xpbmsnLCAnbWV0YScsICdwYXJhbSdcbiAgICBdLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBoZWFkZXJzICh3aXRoICMpXG4gICAgICAgICAgICBbL14oXFxzezAsM30pKCMrKSgoPzpbXlxcXFwjXXxAZXNjYXBlcykrKSgoPzojKyk/KS8sIFsnd2hpdGUnLCBUT0tFTl9IRUFERVJfTEVBRCwgVE9LRU5fSEVBREVSLCBUT0tFTl9IRUFERVJdXSxcbiAgICAgICAgICAgIC8vIGhlYWRlcnMgKHdpdGggPSlcbiAgICAgICAgICAgIFsvXlxccyooPSt8XFwtKylcXHMqJC8sIFRPS0VOX0VYVF9IRUFERVJdLFxuICAgICAgICAgICAgLy8gaGVhZGVycyAod2l0aCAqKiopXG4gICAgICAgICAgICBbL15cXHMqKChcXCpbIF0/KSspXFxzKiQvLCBUT0tFTl9TRVBBUkFUT1JdLFxuICAgICAgICAgICAgLy8gcXVvdGVcbiAgICAgICAgICAgIFsvXlxccyo+Ky8sIFRPS0VOX1FVT1RFXSxcbiAgICAgICAgICAgIC8vIGxpc3QgKHN0YXJ0aW5nIHdpdGggKiBvciBudW1iZXIpXG4gICAgICAgICAgICBbL15cXHMqKFtcXCpcXC0rOl18XFxkK1xcLilcXHMvLCBUT0tFTl9MSVNUXSxcbiAgICAgICAgICAgIC8vIGNvZGUgYmxvY2sgKDQgc3BhY2VzIGluZGVudClcbiAgICAgICAgICAgIFsvXihcXHR8WyBdezR9KVteIF0uKiQvLCBUT0tFTl9CTE9DS10sXG4gICAgICAgICAgICAvLyBjb2RlIGJsb2NrICgzIHRpbGRlKVxuICAgICAgICAgICAgWy9eXFxzKn5+flxccyooKD86XFx3fFtcXC9cXC0jXSkrKT9cXHMqJC8sIHsgdG9rZW46IFRPS0VOX0JMT0NLLCBuZXh0OiAnQGNvZGVibG9jaycgfV0sXG4gICAgICAgICAgICAvLyBnaXRodWIgc3R5bGUgY29kZSBibG9ja3MgKHdpdGggYmFja3RpY2tzIGFuZCBsYW5ndWFnZSlcbiAgICAgICAgICAgIFsvXlxccypgYGBcXHMqKCg/Olxcd3xbXFwvXFwtI10pKylcXHMqJC8sIHsgdG9rZW46IFRPS0VOX0JMT0NLLCBuZXh0OiAnQGNvZGVibG9ja2doJywgbmV4dEVtYmVkZGVkOiAnJDEnIH1dLFxuICAgICAgICAgICAgLy8gZ2l0aHViIHN0eWxlIGNvZGUgYmxvY2tzICh3aXRoIGJhY2t0aWNrcyBidXQgbm8gbGFuZ3VhZ2UpXG4gICAgICAgICAgICBbL15cXHMqYGBgXFxzKiQvLCB7IHRva2VuOiBUT0tFTl9CTE9DSywgbmV4dDogJ0Bjb2RlYmxvY2snIH1dLFxuICAgICAgICAgICAgLy8gbWFya3VwIHdpdGhpbiBsaW5lc1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGxpbmVjb250ZW50JyB9LFxuICAgICAgICBdLFxuICAgICAgICBjb2RlYmxvY2s6IFtcbiAgICAgICAgICAgIFsvXlxccyp+fn5cXHMqJC8sIHsgdG9rZW46IFRPS0VOX0JMT0NLLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbL15cXHMqYGBgXFxzKiQvLCB7IHRva2VuOiBUT0tFTl9CTE9DSywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy8uKiQvLCBUT0tFTl9CTE9DS19DT0RFXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gZ2l0aHViIHN0eWxlIGNvZGUgYmxvY2tzXG4gICAgICAgIGNvZGVibG9ja2doOiBbXG4gICAgICAgICAgICBbL2BgYFxccyokLywgeyB0b2tlbjogVE9LRU5fQkxPQ0tfQ09ERSwgbmV4dDogJ0Bwb3AnLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvW15gXSsvLCBUT0tFTl9CTE9DS19DT0RFXSxcbiAgICAgICAgXSxcbiAgICAgICAgbGluZWNvbnRlbnQ6IFtcbiAgICAgICAgICAgIC8vIGVzY2FwZXNcbiAgICAgICAgICAgIFsvJlxcdys7LywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnZXNjYXBlJ10sXG4gICAgICAgICAgICAvLyB2YXJpb3VzIG1hcmt1cFxuICAgICAgICAgICAgWy9cXGJfXyhbXlxcXFxfXXxAZXNjYXBlc3xfKD8hXykpK19fXFxiLywgJ3N0cm9uZyddLFxuICAgICAgICAgICAgWy9cXCpcXCooW15cXFxcKl18QGVzY2FwZXN8XFwqKD8hXFwqKSkrXFwqXFwqLywgJ3N0cm9uZyddLFxuICAgICAgICAgICAgWy9cXGJfW15fXStfXFxiLywgJ2VtcGhhc2lzJ10sXG4gICAgICAgICAgICBbL1xcKihbXlxcXFwqXXxAZXNjYXBlcykrXFwqLywgJ2VtcGhhc2lzJ10sXG4gICAgICAgICAgICBbL2AoW15cXFxcYF18QGVzY2FwZXMpK2AvLCAndmFyaWFibGUnXSxcbiAgICAgICAgICAgIC8vIGxpbmtzXG4gICAgICAgICAgICBbL1xce1tefV0rXFx9LywgJ3N0cmluZy50YXJnZXQnXSxcbiAgICAgICAgICAgIFsvKCE/XFxbKSgoPzpbXlxcXVxcXFxdfEBlc2NhcGVzKSopKFxcXVxcKFteXFwpXStcXCkpLywgWydzdHJpbmcubGluaycsICcnLCAnc3RyaW5nLmxpbmsnXV0sXG4gICAgICAgICAgICBbLyghP1xcWykoKD86W15cXF1cXFxcXXxAZXNjYXBlcykqKShcXF0pLywgJ3N0cmluZy5saW5rJ10sXG4gICAgICAgICAgICAvLyBvciBodG1sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdodG1sJyB9LFxuICAgICAgICBdLFxuICAgICAgICAvLyBOb3RlOiBpdCBpcyB0ZW1wdGluZyB0byByYXRoZXIgc3dpdGNoIHRvIHRoZSByZWFsIEhUTUwgbW9kZSBpbnN0ZWFkIG9mIGJ1aWxkaW5nIG91ciBvd24gaGVyZVxuICAgICAgICAvLyBidXQgY3VycmVudGx5IHRoZXJlIGlzIGEgbGltaXRhdGlvbiBpbiBNb25hcmNoIHRoYXQgcHJldmVudHMgdXMgZnJvbSBkb2luZyBpdDogVGhlIG9wZW5pbmdcbiAgICAgICAgLy8gJzwnIHdvdWxkIHN0YXJ0IHRoZSBIVE1MIG1vZGUsIGhvd2V2ZXIgdGhlcmUgaXMgbm8gd2F5IHRvIGp1bXAgMSBjaGFyYWN0ZXIgYmFjayB0byBsZXQgdGhlXG4gICAgICAgIC8vIEhUTUwgbW9kZSBhbHNvIHRva2VuaXplIHRoZSBvcGVuaW5nIGFuZ2xlIGJyYWNrZXQuIFRodXMsIGV2ZW4gdGhvdWdoIHdlIGNvdWxkIGp1bXAgdG8gSFRNTCxcbiAgICAgICAgLy8gd2UgY2Fubm90IGNvcnJlY3RseSB0b2tlbml6ZSBpdCBpbiB0aGF0IG1vZGUgeWV0LlxuICAgICAgICBodG1sOiBbXG4gICAgICAgICAgICAvLyBodG1sIHRhZ3NcbiAgICAgICAgICAgIFsvPChcXHcrKVxcLz4vLCBnZXRUYWcoJyQxJyldLFxuICAgICAgICAgICAgWy88KFxcdyspLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BlbXB0eSc6IHsgdG9rZW46IGdldFRhZygnJDEnKSwgbmV4dDogJ0B0YWcuJDEnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiBnZXRUYWcoJyQxJyksIG5leHQ6ICdAdGFnLiQxJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvPFxcLyhcXHcrKVxccyo+LywgeyB0b2tlbjogZ2V0VGFnKCckMScpIH1dLFxuICAgICAgICAgICAgWy88IS0tLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1tePFxcLV0rLywgJ2NvbW1lbnQuY29udGVudCddLFxuICAgICAgICAgICAgWy8tLT4vLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbLzwhLS0vLCAnY29tbWVudC5jb250ZW50LmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvWzxcXC1dLywgJ2NvbW1lbnQuY29udGVudCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFsbW9zdCBmdWxsIEhUTUwgdGFnIG1hdGNoaW5nLCBjb21wbGV0ZSB3aXRoIGVtYmVkZGVkIHNjcmlwdHMgJiBzdHlsZXNcbiAgICAgICAgdGFnOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXSxcbiAgICAgICAgICAgIFsvKHR5cGUpKFxccyo9XFxzKikoXCIpKFteXCJdKykoXCIpLywgW0FUVFJJQl9OQU1FLCBERUxJTV9BU1NJR04sIEFUVFJJQl9WQUxVRSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogQVRUUklCX1ZBTFVFLCBzd2l0Y2hUbzogJ0B0YWcuJFMyLiQ0JyB9LFxuICAgICAgICAgICAgICAgICAgICBBVFRSSUJfVkFMVUVdXSxcbiAgICAgICAgICAgIFsvKHR5cGUpKFxccyo9XFxzKikoJykoW14nXSspKCcpLywgW0FUVFJJQl9OQU1FLCBERUxJTV9BU1NJR04sIEFUVFJJQl9WQUxVRSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogQVRUUklCX1ZBTFVFLCBzd2l0Y2hUbzogJ0B0YWcuJFMyLiQ0JyB9LFxuICAgICAgICAgICAgICAgICAgICBBVFRSSUJfVkFMVUVdXSxcbiAgICAgICAgICAgIFsvKFxcdyspKFxccyo9XFxzKikoXCJbXlwiXSpcInwnW14nXSonKS8sIFtBVFRSSUJfTkFNRSwgREVMSU1fQVNTSUdOLCBBVFRSSUJfVkFMVUVdXSxcbiAgICAgICAgICAgIFsvXFx3Ky8sIEFUVFJJQl9OQU1FXSxcbiAgICAgICAgICAgIFsvXFwvPi8sIGdldFRhZygnJFMyJyksICdAcG9wJ10sXG4gICAgICAgICAgICBbLz4vLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJFMyPT1zdHlsZSc6IHsgdG9rZW46IGdldFRhZygnJFMyJyksIHN3aXRjaFRvOiAnZW1iZWRkZWRTdHlsZScsIG5leHRFbWJlZGRlZDogJ3RleHQvY3NzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJyRTMj09c2NyaXB0Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICckUzMnOiB7IHRva2VuOiBnZXRUYWcoJyRTMicpLCBzd2l0Y2hUbzogJ2VtYmVkZGVkU2NyaXB0JywgbmV4dEVtYmVkZGVkOiAnJFMzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiBnZXRUYWcoJyRTMicpLCBzd2l0Y2hUbzogJ2VtYmVkZGVkU2NyaXB0JywgbmV4dEVtYmVkZGVkOiAndGV4dC9qYXZhc2NyaXB0JyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46IGdldFRhZygnJFMyJyksIG5leHQ6ICdAcG9wJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgZW1iZWRkZWRTdHlsZTogW1xuICAgICAgICAgICAgWy9bXjxdKy8sICcnXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88LywgJyddXG4gICAgICAgIF0sXG4gICAgICAgIGVtYmVkZGVkU2NyaXB0OiBbXG4gICAgICAgICAgICBbL1tePF0rLywgJyddLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88LywgJyddXG4gICAgICAgIF0sXG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9tYXJrZG93bi9tYXJrZG93bi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL21hcmtkb3duL21hcmtkb3duLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMzAiXSwic291cmNlUm9vdCI6IiJ9