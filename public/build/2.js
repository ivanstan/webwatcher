webpackJsonp([2],{

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js ***!
  \*****************************************************************************************/
/*! exports provided: removeProperty, setProperty, applyEdit, isWS */
/*! exports used: applyEdit, setProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export removeProperty */
/* harmony export (immutable) */ __webpack_exports__["b"] = setProperty;
/* harmony export (immutable) */ __webpack_exports__["a"] = applyEdit;
/* unused harmony export isWS */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__format_js__ = __webpack_require__(/*! ./format.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_js__ = __webpack_require__(/*! ./parser.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



function removeProperty(text, path, formattingOptions) {
    return setProperty(text, path, void 0, formattingOptions);
}
function setProperty(text, path, value, formattingOptions, getInsertionIndex) {
    var errors = [];
    var root = Object(__WEBPACK_IMPORTED_MODULE_1__parser_js__["e" /* parseTree */])(text, errors);
    var parent = void 0;
    var lastSegment = void 0;
    while (path.length > 0) {
        lastSegment = path.pop();
        parent = Object(__WEBPACK_IMPORTED_MODULE_1__parser_js__["a" /* findNodeAtLocation */])(root, path);
        if (parent === void 0 && value !== void 0) {
            if (typeof lastSegment === 'string') {
                value = (_a = {}, _a[lastSegment] = value, _a);
            }
            else {
                value = [value];
            }
        }
        else {
            break;
        }
    }
    if (!parent) {
        // empty document
        if (value === void 0) {
            throw new Error('Can not delete in empty document');
        }
        return withFormatting(text, { offset: root ? root.offset : 0, length: root ? root.length : 0, content: JSON.stringify(value) }, formattingOptions);
    }
    else if (parent.type === 'object' && typeof lastSegment === 'string' && Array.isArray(parent.children)) {
        var existing = Object(__WEBPACK_IMPORTED_MODULE_1__parser_js__["a" /* findNodeAtLocation */])(parent, [lastSegment]);
        if (existing !== void 0) {
            if (value === void 0) {
                if (!existing.parent) {
                    throw new Error('Malformed AST');
                }
                var propertyIndex = parent.children.indexOf(existing.parent);
                var removeBegin = void 0;
                var removeEnd = existing.parent.offset + existing.parent.length;
                if (propertyIndex > 0) {
                    // remove the comma of the previous node
                    var previous = parent.children[propertyIndex - 1];
                    removeBegin = previous.offset + previous.length;
                }
                else {
                    removeBegin = parent.offset + 1;
                    if (parent.children.length > 1) {
                        // remove the comma of the next node
                        var next = parent.children[1];
                        removeEnd = next.offset;
                    }
                }
                return withFormatting(text, { offset: removeBegin, length: removeEnd - removeBegin, content: '' }, formattingOptions);
            }
            else {
                // set value of existing property
                return withFormatting(text, { offset: existing.offset, length: existing.length, content: JSON.stringify(value) }, formattingOptions);
            }
        }
        else {
            if (value === void 0) {
                return []; // property does not exist, nothing to do
            }
            var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
            var index = getInsertionIndex ? getInsertionIndex(parent.children.map(function (p) { return p.children[0].value; })) : parent.children.length;
            var edit = void 0;
            if (index > 0) {
                var previous = parent.children[index - 1];
                edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
            }
            else if (parent.children.length === 0) {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty };
            }
            else {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty + ',' };
            }
            return withFormatting(text, edit, formattingOptions);
        }
    }
    else if (parent.type === 'array' && typeof lastSegment === 'number' && Array.isArray(parent.children)) {
        var insertIndex = lastSegment;
        if (insertIndex === -1) {
            // Insert
            var newProperty = "" + JSON.stringify(value);
            var edit = void 0;
            if (parent.children.length === 0) {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty };
            }
            else {
                var previous = parent.children[parent.children.length - 1];
                edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
            }
            return withFormatting(text, edit, formattingOptions);
        }
        else {
            if (value === void 0 && parent.children.length >= 0) {
                //Removal
                var removalIndex = lastSegment;
                var toRemove = parent.children[removalIndex];
                var edit = void 0;
                if (parent.children.length === 1) {
                    // only item
                    edit = { offset: parent.offset + 1, length: parent.length - 2, content: '' };
                }
                else if (parent.children.length - 1 === removalIndex) {
                    // last item
                    var previous = parent.children[removalIndex - 1];
                    var offset = previous.offset + previous.length;
                    var parentEndOffset = parent.offset + parent.length;
                    edit = { offset: offset, length: parentEndOffset - 2 - offset, content: '' };
                }
                else {
                    edit = { offset: toRemove.offset, length: parent.children[removalIndex + 1].offset - toRemove.offset, content: '' };
                }
                return withFormatting(text, edit, formattingOptions);
            }
            else {
                throw new Error('Array modification not supported yet');
            }
        }
    }
    else {
        throw new Error("Can not add " + (typeof lastSegment !== 'number' ? 'index' : 'property') + " to parent of type " + parent.type);
    }
    var _a;
}
function withFormatting(text, edit, formattingOptions) {
    // apply the edit
    var newText = applyEdit(text, edit);
    // format the new text
    var begin = edit.offset;
    var end = edit.offset + edit.content.length;
    if (edit.length === 0 || edit.content.length === 0) {
        while (begin > 0 && !Object(__WEBPACK_IMPORTED_MODULE_0__format_js__["b" /* isEOL */])(newText, begin - 1)) {
            begin--;
        }
        while (end < newText.length && !Object(__WEBPACK_IMPORTED_MODULE_0__format_js__["b" /* isEOL */])(newText, end)) {
            end++;
        }
    }
    var edits = Object(__WEBPACK_IMPORTED_MODULE_0__format_js__["a" /* format */])(newText, { offset: begin, length: end - begin }, formattingOptions);
    // apply the formatting edits and track the begin and end offsets of the changes
    for (var i = edits.length - 1; i >= 0; i--) {
        var edit_1 = edits[i];
        newText = applyEdit(newText, edit_1);
        begin = Math.min(begin, edit_1.offset);
        end = Math.max(end, edit_1.offset + edit_1.length);
        end += edit_1.content.length - edit_1.length;
    }
    // create a single edit with all changes
    var editLength = text.length - (newText.length - end) - begin;
    return [{ offset: begin, length: editLength, content: newText.substring(begin, end) }];
}
function applyEdit(text, edit) {
    return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
}
function isWS(text, offset) {
    return '\r\n \t'.indexOf(text.charAt(offset)) !== -1;
}
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js ***!
  \*******************************************************************************************/
/*! exports provided: format, isEOL */
/*! exports used: format, isEOL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = format;
/* harmony export (immutable) */ __webpack_exports__["b"] = isEOL;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scanner_js__ = __webpack_require__(/*! ./scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function format(documentText, range, options) {
    var initialIndentLevel;
    var formatText;
    var formatTextStart;
    var rangeStart;
    var rangeEnd;
    if (range) {
        rangeStart = range.offset;
        rangeEnd = rangeStart + range.length;
        formatTextStart = rangeStart;
        while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
            formatTextStart--;
        }
        var endOffset = rangeEnd;
        while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
            endOffset++;
        }
        formatText = documentText.substring(formatTextStart, endOffset);
        initialIndentLevel = computeIndentLevel(formatText, 0, options);
    }
    else {
        formatText = documentText;
        initialIndentLevel = 0;
        formatTextStart = 0;
        rangeStart = 0;
        rangeEnd = documentText.length;
    }
    var eol = getEOL(options, documentText);
    var lineBreak = false;
    var indentLevel = 0;
    var indentValue;
    if (options.insertSpaces) {
        indentValue = repeat(' ', options.tabSize || 4);
    }
    else {
        indentValue = '\t';
    }
    var scanner = Object(__WEBPACK_IMPORTED_MODULE_0__scanner_js__["a" /* createScanner */])(formatText, false);
    var hasError = false;
    function newLineAndIndent() {
        return eol + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    function scanNext() {
        var token = scanner.scan();
        lineBreak = false;
        while (token === 15 /* Trivia */ || token === 14 /* LineBreakTrivia */) {
            lineBreak = lineBreak || (token === 14 /* LineBreakTrivia */);
            token = scanner.scan();
        }
        hasError = token === 16 /* Unknown */ || scanner.getTokenError() !== 0 /* None */;
        return token;
    }
    var editOperations = [];
    function addEdit(text, startOffset, endOffset) {
        if (!hasError && startOffset < rangeEnd && endOffset > rangeStart && documentText.substring(startOffset, endOffset) !== text) {
            editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
        }
    }
    var firstToken = scanNext();
    if (firstToken !== 17 /* EOF */) {
        var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
        var initialIndent = repeat(indentValue, initialIndentLevel);
        addEdit(initialIndent, formatTextStart, firstTokenStart);
    }
    while (firstToken !== 17 /* EOF */) {
        var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
        var secondToken = scanNext();
        var replaceContent = '';
        while (!lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
            // comments on the same line: keep them on the same line, but ignore them otherwise
            var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
            addEdit(' ', firstTokenEnd, commentTokenStart);
            firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
            replaceContent = secondToken === 12 /* LineCommentTrivia */ ? newLineAndIndent() : '';
            secondToken = scanNext();
        }
        if (secondToken === 2 /* CloseBraceToken */) {
            if (firstToken !== 1 /* OpenBraceToken */) {
                indentLevel--;
                replaceContent = newLineAndIndent();
            }
        }
        else if (secondToken === 4 /* CloseBracketToken */) {
            if (firstToken !== 3 /* OpenBracketToken */) {
                indentLevel--;
                replaceContent = newLineAndIndent();
            }
        }
        else {
            switch (firstToken) {
                case 3 /* OpenBracketToken */:
                case 1 /* OpenBraceToken */:
                    indentLevel++;
                    replaceContent = newLineAndIndent();
                    break;
                case 5 /* CommaToken */:
                case 12 /* LineCommentTrivia */:
                    replaceContent = newLineAndIndent();
                    break;
                case 13 /* BlockCommentTrivia */:
                    if (lineBreak) {
                        replaceContent = newLineAndIndent();
                    }
                    else {
                        // symbol following comment on the same line: keep on same line, separate with ' '
                        replaceContent = ' ';
                    }
                    break;
                case 6 /* ColonToken */:
                    replaceContent = ' ';
                    break;
                case 10 /* StringLiteral */:
                    if (secondToken === 6 /* ColonToken */) {
                        replaceContent = '';
                        break;
                    }
                // fall through
                case 7 /* NullKeyword */:
                case 8 /* TrueKeyword */:
                case 9 /* FalseKeyword */:
                case 11 /* NumericLiteral */:
                case 2 /* CloseBraceToken */:
                case 4 /* CloseBracketToken */:
                    if (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */) {
                        replaceContent = ' ';
                    }
                    else if (secondToken !== 5 /* CommaToken */ && secondToken !== 17 /* EOF */) {
                        hasError = true;
                    }
                    break;
                case 16 /* Unknown */:
                    hasError = true;
                    break;
            }
            if (lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
                replaceContent = newLineAndIndent();
            }
        }
        var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
        addEdit(replaceContent, firstTokenEnd, secondTokenStart);
        firstToken = secondToken;
    }
    return editOperations;
}
function repeat(s, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += s;
    }
    return result;
}
function computeIndentLevel(content, offset, options) {
    var i = 0;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
        var ch = content.charAt(i);
        if (ch === ' ') {
            nChars++;
        }
        else if (ch === '\t') {
            nChars += tabSize;
        }
        else {
            break;
        }
        i++;
    }
    return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch === '\r') {
            if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
                return '\r\n';
            }
            return '\r';
        }
        else if (ch === '\n') {
            return '\n';
        }
    }
    return (options && options.eol) || '\n';
}
function isEOL(text, offset) {
    return '\r\n'.indexOf(text.charAt(offset)) !== -1;
}
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js ***!
  \*******************************************************************************************/
/*! exports provided: getLocation, parse, parseTree, findNodeAtLocation, getNodeValue, visit, stripComments */
/*! exports used: findNodeAtLocation, getLocation, getNodeValue, parse, parseTree, stripComments, visit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getLocation;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse;
/* harmony export (immutable) */ __webpack_exports__["e"] = parseTree;
/* harmony export (immutable) */ __webpack_exports__["a"] = findNodeAtLocation;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNodeValue;
/* harmony export (immutable) */ __webpack_exports__["g"] = visit;
/* harmony export (immutable) */ __webpack_exports__["f"] = stripComments;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scanner_js__ = __webpack_require__(/*! ./scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/**
 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
 */
function getLocation(text, position) {
    var segments = []; // strings or numbers
    var earlyReturnException = new Object();
    var previousNode = void 0;
    var previousNodeInst = {
        value: {},
        offset: 0,
        length: 0,
        type: 'object'
    };
    var isAtPropertyKey = false;
    function setPreviousNode(value, offset, length, type) {
        previousNodeInst.value = value;
        previousNodeInst.offset = offset;
        previousNodeInst.length = length;
        previousNodeInst.type = type;
        previousNodeInst.columnOffset = void 0;
        previousNode = previousNodeInst;
    }
    try {
        visit(text, {
            onObjectBegin: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                isAtPropertyKey = position > offset;
                segments.push(''); // push a placeholder (will be replaced)
            },
            onObjectProperty: function (name, offset, length) {
                if (position < offset) {
                    throw earlyReturnException;
                }
                setPreviousNode(name, offset, length, 'property');
                segments[segments.length - 1] = name;
                if (position <= offset + length) {
                    throw earlyReturnException;
                }
            },
            onObjectEnd: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.pop();
            },
            onArrayBegin: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.push(0);
            },
            onArrayEnd: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.pop();
            },
            onLiteralValue: function (value, offset, length) {
                if (position < offset) {
                    throw earlyReturnException;
                }
                setPreviousNode(value, offset, length, getLiteralNodeType(value));
                if (position <= offset + length) {
                    throw earlyReturnException;
                }
            },
            onSeparator: function (sep, offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                if (sep === ':' && previousNode && previousNode.type === 'property') {
                    previousNode.columnOffset = offset;
                    isAtPropertyKey = false;
                    previousNode = void 0;
                }
                else if (sep === ',') {
                    var last = segments[segments.length - 1];
                    if (typeof last === 'number') {
                        segments[segments.length - 1] = last + 1;
                    }
                    else {
                        isAtPropertyKey = true;
                        segments[segments.length - 1] = '';
                    }
                    previousNode = void 0;
                }
            }
        });
    }
    catch (e) {
        if (e !== earlyReturnException) {
            throw e;
        }
    }
    return {
        path: segments,
        previousNode: previousNode,
        isAtPropertyKey: isAtPropertyKey,
        matches: function (pattern) {
            var k = 0;
            for (var i = 0; k < pattern.length && i < segments.length; i++) {
                if (pattern[k] === segments[i] || pattern[k] === '*') {
                    k++;
                }
                else if (pattern[k] !== '**') {
                    return false;
                }
            }
            return k === pattern.length;
        }
    };
}
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */
function parse(text, errors, options) {
    if (errors === void 0) { errors = []; }
    var currentProperty = null;
    var currentParent = [];
    var previousParents = [];
    function onValue(value) {
        if (Array.isArray(currentParent)) {
            currentParent.push(value);
        }
        else if (currentProperty) {
            currentParent[currentProperty] = value;
        }
    }
    var visitor = {
        onObjectBegin: function () {
            var object = {};
            onValue(object);
            previousParents.push(currentParent);
            currentParent = object;
            currentProperty = null;
        },
        onObjectProperty: function (name) {
            currentProperty = name;
        },
        onObjectEnd: function () {
            currentParent = previousParents.pop();
        },
        onArrayBegin: function () {
            var array = [];
            onValue(array);
            previousParents.push(currentParent);
            currentParent = array;
            currentProperty = null;
        },
        onArrayEnd: function () {
            currentParent = previousParents.pop();
        },
        onLiteralValue: onValue,
        onError: function (error, offset, length) {
            errors.push({ error: error, offset: offset, length: length });
        }
    };
    visit(text, visitor, options);
    return currentParent[0];
}
/**
 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 */
function parseTree(text, errors, options) {
    if (errors === void 0) { errors = []; }
    var currentParent = { type: 'array', offset: -1, length: -1, children: [] }; // artificial root
    function ensurePropertyComplete(endOffset) {
        if (currentParent.type === 'property') {
            currentParent.length = endOffset - currentParent.offset;
            currentParent = currentParent.parent;
        }
    }
    function onValue(valueNode) {
        currentParent.children.push(valueNode);
        return valueNode;
    }
    var visitor = {
        onObjectBegin: function (offset) {
            currentParent = onValue({ type: 'object', offset: offset, length: -1, parent: currentParent, children: [] });
        },
        onObjectProperty: function (name, offset, length) {
            currentParent = onValue({ type: 'property', offset: offset, length: -1, parent: currentParent, children: [] });
            currentParent.children.push({ type: 'string', value: name, offset: offset, length: length, parent: currentParent });
        },
        onObjectEnd: function (offset, length) {
            currentParent.length = offset + length - currentParent.offset;
            currentParent = currentParent.parent;
            ensurePropertyComplete(offset + length);
        },
        onArrayBegin: function (offset, length) {
            currentParent = onValue({ type: 'array', offset: offset, length: -1, parent: currentParent, children: [] });
        },
        onArrayEnd: function (offset, length) {
            currentParent.length = offset + length - currentParent.offset;
            currentParent = currentParent.parent;
            ensurePropertyComplete(offset + length);
        },
        onLiteralValue: function (value, offset, length) {
            onValue({ type: getLiteralNodeType(value), offset: offset, length: length, parent: currentParent, value: value });
            ensurePropertyComplete(offset + length);
        },
        onSeparator: function (sep, offset, length) {
            if (currentParent.type === 'property') {
                if (sep === ':') {
                    currentParent.columnOffset = offset;
                }
                else if (sep === ',') {
                    ensurePropertyComplete(offset);
                }
            }
        },
        onError: function (error, offset, length) {
            errors.push({ error: error, offset: offset, length: length });
        }
    };
    visit(text, visitor, options);
    var result = currentParent.children[0];
    if (result) {
        delete result.parent;
    }
    return result;
}
/**
 * Finds the node at the given path in a JSON DOM.
 */
function findNodeAtLocation(root, path) {
    if (!root) {
        return void 0;
    }
    var node = root;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var segment = path_1[_i];
        if (typeof segment === 'string') {
            if (node.type !== 'object' || !Array.isArray(node.children)) {
                return void 0;
            }
            var found = false;
            for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
                var propertyNode = _b[_a];
                if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
                    node = propertyNode.children[1];
                    found = true;
                    break;
                }
            }
            if (!found) {
                return void 0;
            }
        }
        else {
            var index = segment;
            if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
                return void 0;
            }
            node = node.children[index];
        }
    }
    return node;
}
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
function getNodeValue(node) {
    if (node.type === 'array') {
        return node.children.map(getNodeValue);
    }
    else if (node.type === 'object') {
        var obj = Object.create(null);
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var prop = _a[_i];
            obj[prop.children[0].value] = getNodeValue(prop.children[1]);
        }
        return obj;
    }
    return node.value;
}
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */
function visit(text, visitor, options) {
    var _scanner = Object(__WEBPACK_IMPORTED_MODULE_0__scanner_js__["a" /* createScanner */])(text, false);
    function toNoArgVisit(visitFunction) {
        return visitFunction ? function () { return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
    }
    function toOneArgVisit(visitFunction) {
        return visitFunction ? function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
    }
    var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
    var disallowComments = options && options.disallowComments;
    var allowTrailingComma = options && options.allowTrailingComma;
    function scanNext() {
        while (true) {
            var token = _scanner.scan();
            switch (_scanner.getTokenError()) {
                case 4 /* InvalidUnicode */:
                    handleError(14 /* InvalidUnicode */);
                    break;
                case 5 /* InvalidEscapeCharacter */:
                    handleError(15 /* InvalidEscapeCharacter */);
                    break;
                case 3 /* UnexpectedEndOfNumber */:
                    handleError(13 /* UnexpectedEndOfNumber */);
                    break;
                case 1 /* UnexpectedEndOfComment */:
                    if (!disallowComments) {
                        handleError(11 /* UnexpectedEndOfComment */);
                    }
                    break;
                case 2 /* UnexpectedEndOfString */:
                    handleError(12 /* UnexpectedEndOfString */);
                    break;
                case 6 /* InvalidCharacter */:
                    handleError(16 /* InvalidCharacter */);
                    break;
            }
            switch (token) {
                case 12 /* LineCommentTrivia */:
                case 13 /* BlockCommentTrivia */:
                    if (disallowComments) {
                        handleError(10 /* InvalidCommentToken */);
                    }
                    else {
                        onComment();
                    }
                    break;
                case 16 /* Unknown */:
                    handleError(1 /* InvalidSymbol */);
                    break;
                case 15 /* Trivia */:
                case 14 /* LineBreakTrivia */:
                    break;
                default:
                    return token;
            }
        }
    }
    function handleError(error, skipUntilAfter, skipUntil) {
        if (skipUntilAfter === void 0) { skipUntilAfter = []; }
        if (skipUntil === void 0) { skipUntil = []; }
        onError(error);
        if (skipUntilAfter.length + skipUntil.length > 0) {
            var token = _scanner.getToken();
            while (token !== 17 /* EOF */) {
                if (skipUntilAfter.indexOf(token) !== -1) {
                    scanNext();
                    break;
                }
                else if (skipUntil.indexOf(token) !== -1) {
                    break;
                }
                token = scanNext();
            }
        }
    }
    function parseString(isValue) {
        var value = _scanner.getTokenValue();
        if (isValue) {
            onLiteralValue(value);
        }
        else {
            onObjectProperty(value);
        }
        scanNext();
        return true;
    }
    function parseLiteral() {
        switch (_scanner.getToken()) {
            case 11 /* NumericLiteral */:
                var value = 0;
                try {
                    value = JSON.parse(_scanner.getTokenValue());
                    if (typeof value !== 'number') {
                        handleError(2 /* InvalidNumberFormat */);
                        value = 0;
                    }
                }
                catch (e) {
                    handleError(2 /* InvalidNumberFormat */);
                }
                onLiteralValue(value);
                break;
            case 7 /* NullKeyword */:
                onLiteralValue(null);
                break;
            case 8 /* TrueKeyword */:
                onLiteralValue(true);
                break;
            case 9 /* FalseKeyword */:
                onLiteralValue(false);
                break;
            default:
                return false;
        }
        scanNext();
        return true;
    }
    function parseProperty() {
        if (_scanner.getToken() !== 10 /* StringLiteral */) {
            handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            return false;
        }
        parseString(false);
        if (_scanner.getToken() === 6 /* ColonToken */) {
            onSeparator(':');
            scanNext(); // consume colon
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
        }
        else {
            handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
        return true;
    }
    function parseObject() {
        onObjectBegin();
        scanNext(); // consume open brace
        var needsComma = false;
        while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseProperty()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onObjectEnd();
        if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
            handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
        }
        else {
            scanNext(); // consume close brace
        }
        return true;
    }
    function parseArray() {
        onArrayBegin();
        scanNext(); // consume open bracket
        var needsComma = false;
        while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onArrayEnd();
        if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
            handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
        }
        else {
            scanNext(); // consume close bracket
        }
        return true;
    }
    function parseValue() {
        switch (_scanner.getToken()) {
            case 3 /* OpenBracketToken */:
                return parseArray();
            case 1 /* OpenBraceToken */:
                return parseObject();
            case 10 /* StringLiteral */:
                return parseString(true);
            default:
                return parseLiteral();
        }
    }
    scanNext();
    if (_scanner.getToken() === 17 /* EOF */) {
        return true;
    }
    if (!parseValue()) {
        handleError(4 /* ValueExpected */, [], []);
        return false;
    }
    if (_scanner.getToken() !== 17 /* EOF */) {
        handleError(9 /* EndOfFileExpected */, [], []);
    }
    return true;
}
/**
 * Takes JSON with JavaScript-style comments and remove
 * them. Optionally replaces every none-newline character
 * of comments with a replaceCharacter
 */
function stripComments(text, replaceCh) {
    var _scanner = Object(__WEBPACK_IMPORTED_MODULE_0__scanner_js__["a" /* createScanner */])(text), parts = [], kind, offset = 0, pos;
    do {
        pos = _scanner.getPosition();
        kind = _scanner.scan();
        switch (kind) {
            case 12 /* LineCommentTrivia */:
            case 13 /* BlockCommentTrivia */:
            case 17 /* EOF */:
                if (offset !== pos) {
                    parts.push(text.substring(offset, pos));
                }
                if (replaceCh !== void 0) {
                    parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
                }
                offset = _scanner.getPosition();
                break;
        }
    } while (kind !== 17 /* EOF */);
    return parts.join('');
}
function getLiteralNodeType(value) {
    switch (typeof value) {
        case 'boolean': return 'boolean';
        case 'number': return 'number';
        case 'string': return 'string';
        default: return 'null';
    }
}
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js ***!
  \********************************************************************************************/
/*! exports provided: createScanner */
/*! exports used: createScanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createScanner;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
function createScanner(text, ignoreTrivia) {
    if (ignoreTrivia === void 0) { ignoreTrivia = false; }
    var pos = 0, len = text.length, value = '', tokenOffset = 0, token = 16 /* Unknown */, scanError = 0 /* None */;
    function scanHexDigits(count, exact) {
        var digits = 0;
        var value = 0;
        while (digits < count || !exact) {
            var ch = text.charCodeAt(pos);
            if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                value = value * 16 + ch - 48 /* _0 */;
            }
            else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                value = value * 16 + ch - 65 /* A */ + 10;
            }
            else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
                value = value * 16 + ch - 97 /* a */ + 10;
            }
            else {
                break;
            }
            pos++;
            digits++;
        }
        if (digits < count) {
            value = -1;
        }
        return value;
    }
    function setPosition(newPosition) {
        pos = newPosition;
        value = '';
        tokenOffset = 0;
        token = 16 /* Unknown */;
        scanError = 0 /* None */;
    }
    function scanNumber() {
        var start = pos;
        if (text.charCodeAt(pos) === 48 /* _0 */) {
            pos++;
        }
        else {
            pos++;
            while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
            }
        }
        if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
            pos++;
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
                return text.substring(start, pos);
            }
        }
        var end = pos;
        if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
            pos++;
            if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
                pos++;
            }
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
                end = pos;
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
            }
        }
        return text.substring(start, end);
    }
    function scanString() {
        var result = '', start = pos;
        while (true) {
            if (pos >= len) {
                result += text.substring(start, pos);
                scanError = 2 /* UnexpectedEndOfString */;
                break;
            }
            var ch = text.charCodeAt(pos);
            if (ch === 34 /* doubleQuote */) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === 92 /* backslash */) {
                result += text.substring(start, pos);
                pos++;
                if (pos >= len) {
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                ch = text.charCodeAt(pos++);
                switch (ch) {
                    case 34 /* doubleQuote */:
                        result += '\"';
                        break;
                    case 92 /* backslash */:
                        result += '\\';
                        break;
                    case 47 /* slash */:
                        result += '/';
                        break;
                    case 98 /* b */:
                        result += '\b';
                        break;
                    case 102 /* f */:
                        result += '\f';
                        break;
                    case 110 /* n */:
                        result += '\n';
                        break;
                    case 114 /* r */:
                        result += '\r';
                        break;
                    case 116 /* t */:
                        result += '\t';
                        break;
                    case 117 /* u */:
                        var ch_1 = scanHexDigits(4, true);
                        if (ch_1 >= 0) {
                            result += String.fromCharCode(ch_1);
                        }
                        else {
                            scanError = 4 /* InvalidUnicode */;
                        }
                        break;
                    default:
                        scanError = 5 /* InvalidEscapeCharacter */;
                }
                start = pos;
                continue;
            }
            if (ch >= 0 && ch <= 0x1f) {
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                else {
                    scanError = 6 /* InvalidCharacter */;
                    // mark as error but continue with string
                }
            }
            pos++;
        }
        return result;
    }
    function scanNext() {
        value = '';
        scanError = 0 /* None */;
        tokenOffset = pos;
        if (pos >= len) {
            // at the end
            tokenOffset = len;
            return token = 17 /* EOF */;
        }
        var code = text.charCodeAt(pos);
        // trivia: whitespace
        if (isWhiteSpace(code)) {
            do {
                pos++;
                value += String.fromCharCode(code);
                code = text.charCodeAt(pos);
            } while (isWhiteSpace(code));
            return token = 15 /* Trivia */;
        }
        // trivia: newlines
        if (isLineBreak(code)) {
            pos++;
            value += String.fromCharCode(code);
            if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                pos++;
                value += '\n';
            }
            return token = 14 /* LineBreakTrivia */;
        }
        switch (code) {
            // tokens: []{}:,
            case 123 /* openBrace */:
                pos++;
                return token = 1 /* OpenBraceToken */;
            case 125 /* closeBrace */:
                pos++;
                return token = 2 /* CloseBraceToken */;
            case 91 /* openBracket */:
                pos++;
                return token = 3 /* OpenBracketToken */;
            case 93 /* closeBracket */:
                pos++;
                return token = 4 /* CloseBracketToken */;
            case 58 /* colon */:
                pos++;
                return token = 6 /* ColonToken */;
            case 44 /* comma */:
                pos++;
                return token = 5 /* CommaToken */;
            // strings
            case 34 /* doubleQuote */:
                pos++;
                value = scanString();
                return token = 10 /* StringLiteral */;
            // comments
            case 47 /* slash */:
                var start = pos - 1;
                // Single-line comment
                if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                    pos += 2;
                    while (pos < len) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    value = text.substring(start, pos);
                    return token = 12 /* LineCommentTrivia */;
                }
                // Multi-line comment
                if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                    pos += 2;
                    var commentClosed = false;
                    while (pos < len) {
                        var ch = text.charCodeAt(pos);
                        if (ch === 42 /* asterisk */ && (pos + 1 < len) && text.charCodeAt(pos + 1) === 47 /* slash */) {
                            pos += 2;
                            commentClosed = true;
                            break;
                        }
                        pos++;
                    }
                    if (!commentClosed) {
                        pos++;
                        scanError = 1 /* UnexpectedEndOfComment */;
                    }
                    value = text.substring(start, pos);
                    return token = 13 /* BlockCommentTrivia */;
                }
                // just a single slash
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
            // numbers
            case 45 /* minus */:
                value += String.fromCharCode(code);
                pos++;
                if (pos === len || !isDigit(text.charCodeAt(pos))) {
                    return token = 16 /* Unknown */;
                }
            // found a minus, followed by a number so
            // we fall through to proceed with scanning
            // numbers
            case 48 /* _0 */:
            case 49 /* _1 */:
            case 50 /* _2 */:
            case 51 /* _3 */:
            case 52 /* _4 */:
            case 53 /* _5 */:
            case 54 /* _6 */:
            case 55 /* _7 */:
            case 56 /* _8 */:
            case 57 /* _9 */:
                value += scanNumber();
                return token = 11 /* NumericLiteral */;
            // literals and unknown symbols
            default:
                // is a literal? Read the full word.
                while (pos < len && isUnknownContentCharacter(code)) {
                    pos++;
                    code = text.charCodeAt(pos);
                }
                if (tokenOffset !== pos) {
                    value = text.substring(tokenOffset, pos);
                    // keywords: true, false, null
                    switch (value) {
                        case 'true': return token = 8 /* TrueKeyword */;
                        case 'false': return token = 9 /* FalseKeyword */;
                        case 'null': return token = 7 /* NullKeyword */;
                    }
                    return token = 16 /* Unknown */;
                }
                // some
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
        }
    }
    function isUnknownContentCharacter(code) {
        if (isWhiteSpace(code) || isLineBreak(code)) {
            return false;
        }
        switch (code) {
            case 125 /* closeBrace */:
            case 93 /* closeBracket */:
            case 123 /* openBrace */:
            case 91 /* openBracket */:
            case 34 /* doubleQuote */:
            case 58 /* colon */:
            case 44 /* comma */:
                return false;
        }
        return true;
    }
    function scanNextNonTrivia() {
        var result;
        do {
            result = scanNext();
        } while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
        return result;
    }
    return {
        setPosition: setPosition,
        getPosition: function () { return pos; },
        scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
        getToken: function () { return token; },
        getTokenValue: function () { return value; },
        getTokenOffset: function () { return tokenOffset; },
        getTokenLength: function () { return pos - tokenOffset; },
        getTokenError: function () { return scanError; }
    };
}
function isWhiteSpace(ch) {
    return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ ||
        ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ ||
        ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
}
function isLineBreak(ch) {
    return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */;
}
function isDigit(ch) {
    return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
}
//# sourceMappingURL=scanner.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js ***!
  \************************************************************************************/
/*! exports provided: createScanner, getLocation, parse, parseTree, findNodeAtLocation, getNodeValue, visit, stripComments, format, modify, applyEdits */
/*! exports used: createScanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createScanner; });
/* unused harmony export getLocation */
/* unused harmony export parse */
/* unused harmony export parseTree */
/* unused harmony export findNodeAtLocation */
/* unused harmony export getNodeValue */
/* unused harmony export visit */
/* unused harmony export stripComments */
/* unused harmony export format */
/* unused harmony export modify */
/* unused harmony export applyEdits */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__impl_format_js__ = __webpack_require__(/*! ./impl/format.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__impl_edit_js__ = __webpack_require__(/*! ./impl/edit.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__impl_scanner_js__ = __webpack_require__(/*! ./impl/scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__ = __webpack_require__(/*! ./impl/parser.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
var createScanner = __WEBPACK_IMPORTED_MODULE_2__impl_scanner_js__["a" /* createScanner */];
/**
 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
 */
var getLocation = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["b" /* getLocation */];
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */
var parse = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["d" /* parse */];
/**
 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 */
var parseTree = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["e" /* parseTree */];
/**
 * Finds the node at the given path in a JSON DOM.
 */
var findNodeAtLocation = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["a" /* findNodeAtLocation */];
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
var getNodeValue = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["c" /* getNodeValue */];
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */
var visit = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["g" /* visit */];
/**
 * Takes JSON with JavaScript-style comments and remove
 * them. Optionally replaces every none-newline character
 * of comments with a replaceCharacter
 */
var stripComments = __WEBPACK_IMPORTED_MODULE_3__impl_parser_js__["f" /* stripComments */];
/**
 * Computes the edits needed to format a JSON document.
 *
 * @param documentText The input text
 * @param range The range to format or `undefined` to format the full content
 * @param options The formatting options
 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
 * text in the original document. However, multiple edits can have
 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
 * To apply edits to an input, you can use `applyEdits`
 */
function format(documentText, range, options) {
    return __WEBPACK_IMPORTED_MODULE_0__impl_format_js__["a" /* format */](documentText, range, options);
}
/**
 * Computes the edits needed to modify a value in the JSON document.
 *
 * @param documentText The input text
 * @param path The path of the value to change. The path represents either to the document root, a property or an array item.
 * If the path points to an non-existing property or item, it will be created.
 * @param value The new value for the specified property or item. If the value is undefined,
 * the property or item will be removed.
 * @param options Options
 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
 * text in the original document. However, multiple edits can have
 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
 * To apply edits to an input, you can use `applyEdits`
 */
function modify(text, path, value, options) {
    return __WEBPACK_IMPORTED_MODULE_1__impl_edit_js__["b" /* setProperty */](text, path, value, options.formattingOptions, options.getInsertionIndex);
}
/**
 * Applies edits to a input string.
 */
function applyEdits(text, edits) {
    for (var i = edits.length - 1; i >= 0; i--) {
        text = __WEBPACK_IMPORTED_MODULE_1__impl_edit_js__["a" /* applyEdit */](text, edits[i]);
    }
    return text;
}
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js ***!
  \***************************************************************************************************/
/*! exports provided: Position, Range, Location, DiagnosticSeverity, Diagnostic, Command, TextEdit, TextDocumentEdit, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, CompletionItemKind, InsertTextFormat, CompletionItem, CompletionList, MarkedString, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolInformation, CodeActionContext, CodeLens, FormattingOptions, DocumentLink, EOL, TextDocument, TextDocumentSaveReason */
/*! exports used: CompletionItemKind, DiagnosticSeverity, InsertTextFormat, MarkupKind, SymbolKind, TextEdit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Position */
/* unused harmony export Range */
/* unused harmony export Location */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DiagnosticSeverity; });
/* unused harmony export Diagnostic */
/* unused harmony export Command */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TextEdit; });
/* unused harmony export TextDocumentEdit */
/* unused harmony export WorkspaceChange */
/* unused harmony export TextDocumentIdentifier */
/* unused harmony export VersionedTextDocumentIdentifier */
/* unused harmony export TextDocumentItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MarkupKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompletionItemKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InsertTextFormat; });
/* unused harmony export CompletionItem */
/* unused harmony export CompletionList */
/* unused harmony export MarkedString */
/* unused harmony export ParameterInformation */
/* unused harmony export SignatureInformation */
/* unused harmony export DocumentHighlightKind */
/* unused harmony export DocumentHighlight */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SymbolKind; });
/* unused harmony export SymbolInformation */
/* unused harmony export CodeActionContext */
/* unused harmony export CodeLens */
/* unused harmony export FormattingOptions */
/* unused harmony export DocumentLink */
/* unused harmony export EOL */
/* unused harmony export TextDocument */
/* unused harmony export TextDocumentSaveReason */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The diagnostic's serverity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.string(candidate.source) || Is.undefined(candidate.source));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.title);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
})(TextEdit || (TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && VersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (textDocumentEdit) {
                    var textEditChange = new TextEditChangeImpl(textDocumentEdit.edits);
                    _this._textEditChanges[textDocumentEdit.textDocument.uri] = textEditChange;
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for versioned document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    return WorkspaceChange;
}());

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.number(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
})(MarkedString || (MarkedString = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrance.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containg the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics) {
        return { diagnostics: diagnostics };
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is);
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data))
            result.data = data;
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
var DocumentLink = /** @class */ (function () {
    function DocumentLink() {
    }
    return DocumentLink;
}());

/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target) {
        return { range: range, target: target };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
var EOL = ['\n', '\r\n', '\r'];
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return 0;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Ovelapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (TextDocumentSaveReason = {}));
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = null;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === null) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js ***!
  \*********************************************************************/
/*! exports provided: setupMode */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setupMode"] = setupMode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__workerManager_js__ = __webpack_require__(/*! ./workerManager.js */ "./node_modules/monaco-editor/esm/vs/language/json/workerManager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__ = __webpack_require__(/*! ./languageFeatures.js */ "./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tokenization_js__ = __webpack_require__(/*! ./tokenization.js */ "./node_modules/monaco-editor/esm/vs/language/json/tokenization.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




function setupMode(defaults) {
    var disposables = [];
    var client = new __WEBPACK_IMPORTED_MODULE_0__workerManager_js__["a" /* WorkerManager */](defaults);
    disposables.push(client);
    var worker = function () {
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        return client.getLanguageServiceWorker.apply(client, uris);
    };
    var languageId = defaults.languageId;
    disposables.push(monaco.languages.registerCompletionItemProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["a" /* CompletionAdapter */](worker)));
    disposables.push(monaco.languages.registerHoverProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["g" /* HoverAdapter */](worker)));
    disposables.push(monaco.languages.registerDocumentSymbolProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["f" /* DocumentSymbolAdapter */](worker)));
    disposables.push(monaco.languages.registerDocumentFormattingEditProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["d" /* DocumentFormattingEditProvider */](worker)));
    disposables.push(monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["e" /* DocumentRangeFormattingEditProvider */](worker)));
    disposables.push(new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["b" /* DiagnosticsAdapter */](languageId, worker, defaults));
    disposables.push(monaco.languages.setTokensProvider(languageId, Object(__WEBPACK_IMPORTED_MODULE_2__tokenization_js__["a" /* createTokenizationSupport */])(true)));
    disposables.push(monaco.languages.setLanguageConfiguration(languageId, richEditConfiguration));
    disposables.push(monaco.languages.registerColorProvider(languageId, new __WEBPACK_IMPORTED_MODULE_1__languageFeatures_js__["c" /* DocumentColorAdapter */](worker)));
}
var richEditConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] }
    ]
};


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js ***!
  \*****************************************************************************/
/*! exports provided: DiagnosticsAdapter, CompletionAdapter, HoverAdapter, DocumentSymbolAdapter, DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider, DocumentColorAdapter */
/*! exports used: CompletionAdapter, DiagnosticsAdapter, DocumentColorAdapter, DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider, DocumentSymbolAdapter, HoverAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DiagnosticsAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompletionAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return HoverAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return DocumentSymbolAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DocumentFormattingEditProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DocumentRangeFormattingEditProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DocumentColorAdapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__ = __webpack_require__(/*! ./_deps/vscode-languageserver-types/main.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var Uri = monaco.Uri;
var Range = monaco.Range;
// --- diagnostics --- ---
var DiagnosticsAdapter = /** @class */ (function () {
    function DiagnosticsAdapter(_languageId, _worker, defaults) {
        var _this = this;
        this._languageId = _languageId;
        this._worker = _worker;
        this._disposables = [];
        this._listener = Object.create(null);
        var onModelAdd = function (model) {
            var modeId = model.getModeId();
            if (modeId !== _this._languageId) {
                return;
            }
            var handle;
            _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
                clearTimeout(handle);
                handle = setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 500);
            });
            _this._doValidate(model.uri, modeId);
        };
        var onModelRemoved = function (model) {
            monaco.editor.setModelMarkers(model, _this._languageId, []);
            var uriStr = model.uri.toString();
            var listener = _this._listener[uriStr];
            if (listener) {
                listener.dispose();
                delete _this._listener[uriStr];
            }
        };
        this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd));
        this._disposables.push(monaco.editor.onWillDisposeModel(function (model) {
            onModelRemoved(model);
            _this._resetSchema(model.uri);
        }));
        this._disposables.push(monaco.editor.onDidChangeModelLanguage(function (event) {
            onModelRemoved(event.model);
            onModelAdd(event.model);
            _this._resetSchema(event.model.uri);
        }));
        this._disposables.push(defaults.onDidChange(function (_) {
            monaco.editor.getModels().forEach(function (model) {
                if (model.getModeId() === _this._languageId) {
                    onModelRemoved(model);
                    onModelAdd(model);
                }
            });
        }));
        this._disposables.push({
            dispose: function () {
                monaco.editor.getModels().forEach(onModelRemoved);
                for (var key in _this._listener) {
                    _this._listener[key].dispose();
                }
            }
        });
        monaco.editor.getModels().forEach(onModelAdd);
    }
    DiagnosticsAdapter.prototype.dispose = function () {
        this._disposables.forEach(function (d) { return d && d.dispose(); });
        this._disposables = [];
    };
    DiagnosticsAdapter.prototype._resetSchema = function (resource) {
        this._worker().then(function (worker) {
            worker.resetSchema(resource.toString());
        });
    };
    DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
        this._worker(resource).then(function (worker) {
            return worker.doValidation(resource.toString()).then(function (diagnostics) {
                var markers = diagnostics.map(function (d) { return toDiagnostics(resource, d); });
                var model = monaco.editor.getModel(resource);
                if (model.getModeId() === languageId) {
                    monaco.editor.setModelMarkers(model, languageId, markers);
                }
            });
        }).then(undefined, function (err) {
            console.error(err);
        });
    };
    return DiagnosticsAdapter;
}());

function toSeverity(lsSeverity) {
    switch (lsSeverity) {
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["b" /* DiagnosticSeverity */].Error: return monaco.MarkerSeverity.Error;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["b" /* DiagnosticSeverity */].Warning: return monaco.MarkerSeverity.Warning;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["b" /* DiagnosticSeverity */].Information: return monaco.MarkerSeverity.Info;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["b" /* DiagnosticSeverity */].Hint: return monaco.MarkerSeverity.Hint;
        default:
            return monaco.MarkerSeverity.Info;
    }
}
function toDiagnostics(resource, diag) {
    var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
    return {
        severity: toSeverity(diag.severity),
        startLineNumber: diag.range.start.line + 1,
        startColumn: diag.range.start.character + 1,
        endLineNumber: diag.range.end.line + 1,
        endColumn: diag.range.end.character + 1,
        message: diag.message,
        code: code,
        source: diag.source
    };
}
// --- completion ------
function fromPosition(position) {
    if (!position) {
        return void 0;
    }
    return { character: position.column - 1, line: position.lineNumber - 1 };
}
function fromRange(range) {
    if (!range) {
        return void 0;
    }
    return { start: { line: range.startLineNumber - 1, character: range.startColumn - 1 }, end: { line: range.endLineNumber - 1, character: range.endColumn - 1 } };
}
function toRange(range) {
    if (!range) {
        return void 0;
    }
    return new Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function toCompletionItemKind(kind) {
    var mItemKind = monaco.languages.CompletionItemKind;
    switch (kind) {
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Text: return mItemKind.Text;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Method: return mItemKind.Method;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Function: return mItemKind.Function;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Constructor: return mItemKind.Constructor;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Field: return mItemKind.Field;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Variable: return mItemKind.Variable;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Class: return mItemKind.Class;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Interface: return mItemKind.Interface;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Module: return mItemKind.Module;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Property: return mItemKind.Property;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Unit: return mItemKind.Unit;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Value: return mItemKind.Value;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Enum: return mItemKind.Enum;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Keyword: return mItemKind.Keyword;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Snippet: return mItemKind.Snippet;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Color: return mItemKind.Color;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].File: return mItemKind.File;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Reference: return mItemKind.Reference;
    }
    return mItemKind.Property;
}
function fromCompletionItemKind(kind) {
    var mItemKind = monaco.languages.CompletionItemKind;
    switch (kind) {
        case mItemKind.Text: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Text;
        case mItemKind.Method: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Method;
        case mItemKind.Function: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Function;
        case mItemKind.Constructor: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Constructor;
        case mItemKind.Field: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Field;
        case mItemKind.Variable: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Variable;
        case mItemKind.Class: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Class;
        case mItemKind.Interface: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Interface;
        case mItemKind.Module: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Module;
        case mItemKind.Property: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Property;
        case mItemKind.Unit: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Unit;
        case mItemKind.Value: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Value;
        case mItemKind.Enum: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Enum;
        case mItemKind.Keyword: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Keyword;
        case mItemKind.Snippet: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Snippet;
        case mItemKind.Color: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Color;
        case mItemKind.File: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].File;
        case mItemKind.Reference: return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Reference;
    }
    return __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["a" /* CompletionItemKind */].Property;
}
function toTextEdit(textEdit) {
    if (!textEdit) {
        return void 0;
    }
    return {
        range: toRange(textEdit.range),
        text: textEdit.newText
    };
}
function toCompletionItem(entry) {
    return {
        label: entry.label,
        insertText: entry.insertText,
        sortText: entry.sortText,
        filterText: entry.filterText,
        documentation: entry.documentation,
        detail: entry.detail,
        kind: toCompletionItemKind(entry.kind),
        textEdit: toTextEdit(entry.textEdit),
        data: entry.data
    };
}
function fromMarkdownString(entry) {
    return {
        kind: (typeof entry === 'string' ? __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["d" /* MarkupKind */].PlainText : __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["d" /* MarkupKind */].Markdown),
        value: (typeof entry === 'string' ? entry : entry.value)
    };
}
function fromCompletionItem(entry) {
    var item = {
        label: entry.label,
        sortText: entry.sortText,
        filterText: entry.filterText,
        documentation: fromMarkdownString(entry.documentation),
        detail: entry.detail,
        kind: fromCompletionItemKind(entry.kind),
        data: entry.data
    };
    if (typeof entry.insertText === 'object' && typeof entry.insertText.value === 'string') {
        item.insertText = entry.insertText.value;
        item.insertTextFormat = __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["c" /* InsertTextFormat */].Snippet;
    }
    else {
        item.insertText = entry.insertText;
    }
    if (entry.range) {
        item.textEdit = __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["f" /* TextEdit */].replace(fromRange(entry.range), item.insertText);
    }
    return item;
}
var CompletionAdapter = /** @class */ (function () {
    function CompletionAdapter(_worker) {
        this._worker = _worker;
    }
    Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
        get: function () {
            return [' ', ':'];
        },
        enumerable: true,
        configurable: true
    });
    CompletionAdapter.prototype.provideCompletionItems = function (model, position, token) {
        var wordInfo = model.getWordUntilPosition(position);
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) {
            return worker.doComplete(resource.toString(), fromPosition(position));
        }).then(function (info) {
            if (!info) {
                return;
            }
            var items = info.items.map(function (entry) {
                var item = {
                    label: entry.label,
                    insertText: entry.insertText,
                    sortText: entry.sortText,
                    filterText: entry.filterText,
                    documentation: entry.documentation,
                    detail: entry.detail,
                    kind: toCompletionItemKind(entry.kind),
                };
                if (entry.textEdit) {
                    item.range = toRange(entry.textEdit.range);
                    item.insertText = entry.textEdit.newText;
                }
                if (entry.insertTextFormat === __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["c" /* InsertTextFormat */].Snippet) {
                    item.insertText = { value: item.insertText };
                }
                return item;
            });
            return {
                isIncomplete: info.isIncomplete,
                items: items
            };
        }));
    };
    return CompletionAdapter;
}());

function isMarkupContent(thing) {
    return thing && typeof thing === 'object' && typeof thing.kind === 'string';
}
function toMarkdownString(entry) {
    if (typeof entry === 'string') {
        return {
            value: entry
        };
    }
    if (isMarkupContent(entry)) {
        if (entry.kind === 'plaintext') {
            return {
                value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
            };
        }
        return {
            value: entry.value
        };
    }
    return { value: '```' + entry.language + '\n' + entry.value + '\n```\n' };
}
function toMarkedStringArray(contents) {
    if (!contents) {
        return void 0;
    }
    if (Array.isArray(contents)) {
        return contents.map(toMarkdownString);
    }
    return [toMarkdownString(contents)];
}
// --- hover ------
var HoverAdapter = /** @class */ (function () {
    function HoverAdapter(_worker) {
        this._worker = _worker;
    }
    HoverAdapter.prototype.provideHover = function (model, position, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) {
            return worker.doHover(resource.toString(), fromPosition(position));
        }).then(function (info) {
            if (!info) {
                return;
            }
            return {
                range: toRange(info.range),
                contents: toMarkedStringArray(info.contents)
            };
        }));
    };
    return HoverAdapter;
}());

// --- definition ------
function toLocation(location) {
    return {
        uri: Uri.parse(location.uri),
        range: toRange(location.range)
    };
}
// --- document symbols ------
function toSymbolKind(kind) {
    var mKind = monaco.languages.SymbolKind;
    switch (kind) {
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].File: return mKind.Array;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Module: return mKind.Module;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Namespace: return mKind.Namespace;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Package: return mKind.Package;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Class: return mKind.Class;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Method: return mKind.Method;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Property: return mKind.Property;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Field: return mKind.Field;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Constructor: return mKind.Constructor;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Enum: return mKind.Enum;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Interface: return mKind.Interface;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Function: return mKind.Function;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Variable: return mKind.Variable;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Constant: return mKind.Constant;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].String: return mKind.String;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Number: return mKind.Number;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Boolean: return mKind.Boolean;
        case __WEBPACK_IMPORTED_MODULE_0__deps_vscode_languageserver_types_main_js__["e" /* SymbolKind */].Array: return mKind.Array;
    }
    return mKind.Function;
}
var DocumentSymbolAdapter = /** @class */ (function () {
    function DocumentSymbolAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.findDocumentSymbols(resource.toString()); }).then(function (items) {
            if (!items) {
                return;
            }
            return items.map(function (item) { return ({
                name: item.name,
                containerName: item.containerName,
                kind: toSymbolKind(item.kind),
                location: toLocation(item.location)
            }); });
        }));
    };
    return DocumentSymbolAdapter;
}());

function fromFormattingOptions(options) {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    };
}
var DocumentFormattingEditProvider = /** @class */ (function () {
    function DocumentFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) {
            return worker.format(resource.toString(), null, fromFormattingOptions(options)).then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        }));
    };
    return DocumentFormattingEditProvider;
}());

var DocumentRangeFormattingEditProvider = /** @class */ (function () {
    function DocumentRangeFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) {
            return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        }));
    };
    return DocumentRangeFormattingEditProvider;
}());

var DocumentColorAdapter = /** @class */ (function () {
    function DocumentColorAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentColorAdapter.prototype.provideDocumentColors = function (model, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.findDocumentColors(resource.toString()); }).then(function (infos) {
            if (!infos) {
                return;
            }
            return infos.map(function (item) { return ({
                color: item.color,
                range: toRange(item.range)
            }); });
        }));
    };
    DocumentColorAdapter.prototype.provideColorPresentations = function (model, info, token) {
        var resource = model.uri;
        return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range)); }).then(function (presentations) {
            if (!presentations) {
                return;
            }
            return presentations.map(function (presentation) {
                var item = {
                    label: presentation.label,
                };
                if (presentation.textEdit) {
                    item.textEdit = toTextEdit(presentation.textEdit);
                }
                if (presentation.additionalTextEdits) {
                    item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
                }
                return item;
            });
        }));
    };
    return DocumentColorAdapter;
}());

/**
 * Hook a cancellation token to a WinJS Promise
 */
function wireCancellationToken(token, promise) {
    if (promise.cancel) {
        token.onCancellationRequested(function () { return promise.cancel(); });
    }
    return promise;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/tokenization.js":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/tokenization.js ***!
  \*************************************************************************/
/*! exports provided: createTokenizationSupport, TOKEN_DELIM_OBJECT, TOKEN_DELIM_ARRAY, TOKEN_DELIM_COLON, TOKEN_DELIM_COMMA, TOKEN_VALUE_BOOLEAN, TOKEN_VALUE_NULL, TOKEN_VALUE_STRING, TOKEN_VALUE_NUMBER, TOKEN_PROPERTY_NAME, TOKEN_COMMENT_BLOCK, TOKEN_COMMENT_LINE */
/*! exports used: createTokenizationSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createTokenizationSupport;
/* unused harmony export TOKEN_DELIM_OBJECT */
/* unused harmony export TOKEN_DELIM_ARRAY */
/* unused harmony export TOKEN_DELIM_COLON */
/* unused harmony export TOKEN_DELIM_COMMA */
/* unused harmony export TOKEN_VALUE_BOOLEAN */
/* unused harmony export TOKEN_VALUE_NULL */
/* unused harmony export TOKEN_VALUE_STRING */
/* unused harmony export TOKEN_VALUE_NUMBER */
/* unused harmony export TOKEN_PROPERTY_NAME */
/* unused harmony export TOKEN_COMMENT_BLOCK */
/* unused harmony export TOKEN_COMMENT_LINE */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deps_jsonc_parser_main_js__ = __webpack_require__(/*! ./_deps/jsonc-parser/main.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function createTokenizationSupport(supportComments) {
    return {
        getInitialState: function () { return new JSONState(null, null, false); },
        tokenize: function (line, state, offsetDelta, stopAtOffset) { return tokenize(supportComments, line, state, offsetDelta, stopAtOffset); }
    };
}
var TOKEN_DELIM_OBJECT = 'delimiter.bracket.json';
var TOKEN_DELIM_ARRAY = 'delimiter.array.json';
var TOKEN_DELIM_COLON = 'delimiter.colon.json';
var TOKEN_DELIM_COMMA = 'delimiter.comma.json';
var TOKEN_VALUE_BOOLEAN = 'keyword.json';
var TOKEN_VALUE_NULL = 'keyword.json';
var TOKEN_VALUE_STRING = 'string.value.json';
var TOKEN_VALUE_NUMBER = 'number.json';
var TOKEN_PROPERTY_NAME = 'string.key.json';
var TOKEN_COMMENT_BLOCK = 'comment.block.json';
var TOKEN_COMMENT_LINE = 'comment.line.json';
var JSONState = /** @class */ (function () {
    function JSONState(state, scanError, lastWasColon) {
        this._state = state;
        this.scanError = scanError;
        this.lastWasColon = lastWasColon;
    }
    JSONState.prototype.clone = function () {
        return new JSONState(this._state, this.scanError, this.lastWasColon);
    };
    JSONState.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        if (!other || !(other instanceof JSONState)) {
            return false;
        }
        return this.scanError === other.scanError &&
            this.lastWasColon === other.lastWasColon;
    };
    JSONState.prototype.getStateData = function () {
        return this._state;
    };
    JSONState.prototype.setStateData = function (state) {
        this._state = state;
    };
    return JSONState;
}());
function tokenize(comments, line, state, offsetDelta, stopAtOffset) {
    if (offsetDelta === void 0) { offsetDelta = 0; }
    // handle multiline strings and block comments
    var numberOfInsertedCharacters = 0, adjustOffset = false;
    switch (state.scanError) {
        case 2 /* UnexpectedEndOfString */:
            line = '"' + line;
            numberOfInsertedCharacters = 1;
            break;
        case 1 /* UnexpectedEndOfComment */:
            line = '/*' + line;
            numberOfInsertedCharacters = 2;
            break;
    }
    var scanner = __WEBPACK_IMPORTED_MODULE_0__deps_jsonc_parser_main_js__["a" /* createScanner */](line), kind, ret, lastWasColon = state.lastWasColon;
    ret = {
        tokens: [],
        endState: state.clone()
    };
    while (true) {
        var offset = offsetDelta + scanner.getPosition(), type = '';
        kind = scanner.scan();
        if (kind === 17 /* EOF */) {
            break;
        }
        // Check that the scanner has advanced
        if (offset === offsetDelta + scanner.getPosition()) {
            throw new Error('Scanner did not advance, next 3 characters are: ' + line.substr(scanner.getPosition(), 3));
        }
        // In case we inserted /* or " character, we need to
        // adjust the offset of all tokens (except the first)
        if (adjustOffset) {
            offset -= numberOfInsertedCharacters;
        }
        adjustOffset = numberOfInsertedCharacters > 0;
        // brackets and type
        switch (kind) {
            case 1 /* OpenBraceToken */:
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 2 /* CloseBraceToken */:
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 3 /* OpenBracketToken */:
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 4 /* CloseBracketToken */:
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 6 /* ColonToken */:
                type = TOKEN_DELIM_COLON;
                lastWasColon = true;
                break;
            case 5 /* CommaToken */:
                type = TOKEN_DELIM_COMMA;
                lastWasColon = false;
                break;
            case 8 /* TrueKeyword */:
            case 9 /* FalseKeyword */:
                type = TOKEN_VALUE_BOOLEAN;
                lastWasColon = false;
                break;
            case 7 /* NullKeyword */:
                type = TOKEN_VALUE_NULL;
                lastWasColon = false;
                break;
            case 10 /* StringLiteral */:
                type = lastWasColon ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
                lastWasColon = false;
                break;
            case 11 /* NumericLiteral */:
                type = TOKEN_VALUE_NUMBER;
                lastWasColon = false;
                break;
        }
        // comments, iff enabled
        if (comments) {
            switch (kind) {
                case 12 /* LineCommentTrivia */:
                    type = TOKEN_COMMENT_LINE;
                    break;
                case 13 /* BlockCommentTrivia */:
                    type = TOKEN_COMMENT_BLOCK;
                    break;
            }
        }
        ret.endState = new JSONState(state.getStateData(), scanner.getTokenError(), lastWasColon);
        ret.tokens.push({
            startIndex: offset,
            scopes: type
        });
    }
    return ret;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/workerManager.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/workerManager.js ***!
  \**************************************************************************/
/*! exports provided: WorkerManager */
/*! exports used: WorkerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkerManager; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var Promise = monaco.Promise;
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000; // 2min
var WorkerManager = /** @class */ (function () {
    function WorkerManager(defaults) {
        var _this = this;
        this._defaults = defaults;
        this._worker = null;
        this._idleCheckInterval = setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
        this._lastUsedTime = 0;
        this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
    }
    WorkerManager.prototype._stopWorker = function () {
        if (this._worker) {
            this._worker.dispose();
            this._worker = null;
        }
        this._client = null;
    };
    WorkerManager.prototype.dispose = function () {
        clearInterval(this._idleCheckInterval);
        this._configChangeListener.dispose();
        this._stopWorker();
    };
    WorkerManager.prototype._checkIfIdle = function () {
        if (!this._worker) {
            return;
        }
        var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
        if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
            this._stopWorker();
        }
    };
    WorkerManager.prototype._getClient = function () {
        this._lastUsedTime = Date.now();
        if (!this._client) {
            this._worker = monaco.editor.createWebWorker({
                // module that exports the create() method and returns a `JSONWorker` instance
                moduleId: 'vs/language/json/jsonWorker',
                label: this._defaults.languageId,
                // passed in to the create() method
                createData: {
                    languageSettings: this._defaults.diagnosticsOptions,
                    languageId: this._defaults.languageId
                }
            });
            this._client = this._worker.getProxy();
        }
        return this._client;
    };
    WorkerManager.prototype.getLanguageServiceWorker = function () {
        var _this = this;
        var resources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resources[_i] = arguments[_i];
        }
        var _client;
        return toShallowCancelPromise(this._getClient().then(function (client) {
            _client = client;
        }).then(function (_) {
            return _this._worker.withSyncedResources(resources);
        }).then(function (_) { return _client; }));
    };
    return WorkerManager;
}());

function toShallowCancelPromise(p) {
    var completeCallback;
    var errorCallback;
    var r = new Promise(function (c, e) {
        completeCallback = c;
        errorCallback = e;
    }, function () { });
    p.then(completeCallback, errorCallback);
    return r;
}


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9lZGl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9pbXBsL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL2ltcGwvc2Nhbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdHlwZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9sYW5ndWFnZUZlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL3Rva2VuaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi93b3JrZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDd0I7QUFDZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpR0FBaUc7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9FQUFvRTtBQUNqSDtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsbUZBQW1GO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxnR0FBZ0csNEJBQTRCLEVBQUU7QUFDOUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUFpQyxxQ0FBcUM7QUFDdEU7QUFDQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw0RUFBNEU7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7Ozs7O0FDdktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzRUFBc0U7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ3RpQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxzQkFBc0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsWUFBWSxFQUFFO0FBQ2hEO0FBQ0EsK0JBQStCLGNBQWMsRUFBRTtBQUMvQyxvQ0FBb0MsY0FBYyxFQUFFO0FBQ3BELHFDQUFxQyxvQkFBb0IsRUFBRTtBQUMzRCxx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QTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxDQUFDLDRCQUE0QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0RBQXdEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdEQUF3RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNTlCakI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dCO0FBQ3hCO0FBQ29DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsSUFBSTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksc0JBQXNCO0FBQ3BELFNBQVMsMkNBQTJDO0FBQ3BELFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsNkNBQTZDLEVBQUU7QUFDaEcsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCx5QkFBeUIsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELG1DQUFtQyxFQUFFO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUyxvRUFBb0UsUUFBUSxnRUFBZ0U7QUFDaks7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7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QztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxlQUFlLEVBQUU7QUFDdEI7QUFDQTtBQUNBIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7IGZvcm1hdCwgaXNFT0wgfSBmcm9tICcuL2Zvcm1hdC5qcyc7XG5pbXBvcnQgeyBwYXJzZVRyZWUsIGZpbmROb2RlQXRMb2NhdGlvbiB9IGZyb20gJy4vcGFyc2VyLmpzJztcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQcm9wZXJ0eSh0ZXh0LCBwYXRoLCBmb3JtYXR0aW5nT3B0aW9ucykge1xuICAgIHJldHVybiBzZXRQcm9wZXJ0eSh0ZXh0LCBwYXRoLCB2b2lkIDAsIGZvcm1hdHRpbmdPcHRpb25zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9wZXJ0eSh0ZXh0LCBwYXRoLCB2YWx1ZSwgZm9ybWF0dGluZ09wdGlvbnMsIGdldEluc2VydGlvbkluZGV4KSB7XG4gICAgdmFyIGVycm9ycyA9IFtdO1xuICAgIHZhciByb290ID0gcGFyc2VUcmVlKHRleHQsIGVycm9ycyk7XG4gICAgdmFyIHBhcmVudCA9IHZvaWQgMDtcbiAgICB2YXIgbGFzdFNlZ21lbnQgPSB2b2lkIDA7XG4gICAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBsYXN0U2VnbWVudCA9IHBhdGgucG9wKCk7XG4gICAgICAgIHBhcmVudCA9IGZpbmROb2RlQXRMb2NhdGlvbihyb290LCBwYXRoKTtcbiAgICAgICAgaWYgKHBhcmVudCA9PT0gdm9pZCAwICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGFzdFNlZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoX2EgPSB7fSwgX2FbbGFzdFNlZ21lbnRdID0gdmFsdWUsIF9hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIC8vIGVtcHR5IGRvY3VtZW50XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZGVsZXRlIGluIGVtcHR5IGRvY3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIHsgb2Zmc2V0OiByb290ID8gcm9vdC5vZmZzZXQgOiAwLCBsZW5ndGg6IHJvb3QgPyByb290Lmxlbmd0aCA6IDAsIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSB9LCBmb3JtYXR0aW5nT3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbGFzdFNlZ21lbnQgPT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkocGFyZW50LmNoaWxkcmVuKSkge1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSBmaW5kTm9kZUF0TG9jYXRpb24ocGFyZW50LCBbbGFzdFNlZ21lbnRdKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgQVNUJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eUluZGV4ID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2YoZXhpc3RpbmcucGFyZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlQmVnaW4gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZUVuZCA9IGV4aXN0aW5nLnBhcmVudC5vZmZzZXQgKyBleGlzdGluZy5wYXJlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNvbW1hIG9mIHRoZSBwcmV2aW91cyBub2RlXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHBhcmVudC5jaGlsZHJlbltwcm9wZXJ0eUluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJlZ2luID0gcHJldmlvdXMub2Zmc2V0ICsgcHJldmlvdXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQmVnaW4gPSBwYXJlbnQub2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNvbW1hIG9mIHRoZSBuZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gcGFyZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW5kID0gbmV4dC5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIHsgb2Zmc2V0OiByZW1vdmVCZWdpbiwgbGVuZ3RoOiByZW1vdmVFbmQgLSByZW1vdmVCZWdpbiwgY29udGVudDogJycgfSwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHZhbHVlIG9mIGV4aXN0aW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIHsgb2Zmc2V0OiBleGlzdGluZy5vZmZzZXQsIGxlbmd0aDogZXhpc3RpbmcubGVuZ3RoLCBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgfSwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107IC8vIHByb3BlcnR5IGRvZXMgbm90IGV4aXN0LCBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3UHJvcGVydHkgPSBKU09OLnN0cmluZ2lmeShsYXN0U2VnbWVudCkgKyBcIjogXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbnNlcnRpb25JbmRleCA/IGdldEluc2VydGlvbkluZGV4KHBhcmVudC5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKHApIHsgcmV0dXJuIHAuY2hpbGRyZW5bMF0udmFsdWU7IH0pKSA6IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZWRpdCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXMgPSBwYXJlbnQuY2hpbGRyZW5baW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHByZXZpb3VzLm9mZnNldCArIHByZXZpb3VzLmxlbmd0aCwgbGVuZ3RoOiAwLCBjb250ZW50OiAnLCcgKyBuZXdQcm9wZXJ0eSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGVkaXQgPSB7IG9mZnNldDogcGFyZW50Lm9mZnNldCArIDEsIGxlbmd0aDogMCwgY29udGVudDogbmV3UHJvcGVydHkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVkaXQgPSB7IG9mZnNldDogcGFyZW50Lm9mZnNldCArIDEsIGxlbmd0aDogMCwgY29udGVudDogbmV3UHJvcGVydHkgKyAnLCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3aXRoRm9ybWF0dGluZyh0ZXh0LCBlZGl0LCBmb3JtYXR0aW5nT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdhcnJheScgJiYgdHlwZW9mIGxhc3RTZWdtZW50ID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KHBhcmVudC5jaGlsZHJlbikpIHtcbiAgICAgICAgdmFyIGluc2VydEluZGV4ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgIGlmIChpbnNlcnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEluc2VydFxuICAgICAgICAgICAgdmFyIG5ld1Byb3BlcnR5ID0gXCJcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgIHZhciBlZGl0ID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHBhcmVudC5vZmZzZXQgKyAxLCBsZW5ndGg6IDAsIGNvbnRlbnQ6IG5ld1Byb3BlcnR5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXMgPSBwYXJlbnQuY2hpbGRyZW5bcGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGVkaXQgPSB7IG9mZnNldDogcHJldmlvdXMub2Zmc2V0ICsgcHJldmlvdXMubGVuZ3RoLCBsZW5ndGg6IDAsIGNvbnRlbnQ6ICcsJyArIG5ld1Byb3BlcnR5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2l0aEZvcm1hdHRpbmcodGV4dCwgZWRpdCwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDAgJiYgcGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmFsXG4gICAgICAgICAgICAgICAgdmFyIHJlbW92YWxJbmRleCA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgIHZhciB0b1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbltyZW1vdmFsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBlZGl0ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgaXRlbVxuICAgICAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHBhcmVudC5vZmZzZXQgKyAxLCBsZW5ndGg6IHBhcmVudC5sZW5ndGggLSAyLCBjb250ZW50OiAnJyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSA9PT0gcmVtb3ZhbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxhc3QgaXRlbVxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXMgPSBwYXJlbnQuY2hpbGRyZW5bcmVtb3ZhbEluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBwcmV2aW91cy5vZmZzZXQgKyBwcmV2aW91cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRFbmRPZmZzZXQgPSBwYXJlbnQub2Zmc2V0ICsgcGFyZW50Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZWRpdCA9IHsgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogcGFyZW50RW5kT2Zmc2V0IC0gMiAtIG9mZnNldCwgY29udGVudDogJycgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXQgPSB7IG9mZnNldDogdG9SZW1vdmUub2Zmc2V0LCBsZW5ndGg6IHBhcmVudC5jaGlsZHJlbltyZW1vdmFsSW5kZXggKyAxXS5vZmZzZXQgLSB0b1JlbW92ZS5vZmZzZXQsIGNvbnRlbnQ6ICcnIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB3aXRoRm9ybWF0dGluZyh0ZXh0LCBlZGl0LCBmb3JtYXR0aW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IG1vZGlmaWNhdGlvbiBub3Qgc3VwcG9ydGVkIHlldCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gbm90IGFkZCBcIiArICh0eXBlb2YgbGFzdFNlZ21lbnQgIT09ICdudW1iZXInID8gJ2luZGV4JyA6ICdwcm9wZXJ0eScpICsgXCIgdG8gcGFyZW50IG9mIHR5cGUgXCIgKyBwYXJlbnQudHlwZSk7XG4gICAgfVxuICAgIHZhciBfYTtcbn1cbmZ1bmN0aW9uIHdpdGhGb3JtYXR0aW5nKHRleHQsIGVkaXQsIGZvcm1hdHRpbmdPcHRpb25zKSB7XG4gICAgLy8gYXBwbHkgdGhlIGVkaXRcbiAgICB2YXIgbmV3VGV4dCA9IGFwcGx5RWRpdCh0ZXh0LCBlZGl0KTtcbiAgICAvLyBmb3JtYXQgdGhlIG5ldyB0ZXh0XG4gICAgdmFyIGJlZ2luID0gZWRpdC5vZmZzZXQ7XG4gICAgdmFyIGVuZCA9IGVkaXQub2Zmc2V0ICsgZWRpdC5jb250ZW50Lmxlbmd0aDtcbiAgICBpZiAoZWRpdC5sZW5ndGggPT09IDAgfHwgZWRpdC5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aGlsZSAoYmVnaW4gPiAwICYmICFpc0VPTChuZXdUZXh0LCBiZWdpbiAtIDEpKSB7XG4gICAgICAgICAgICBiZWdpbi0tO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChlbmQgPCBuZXdUZXh0Lmxlbmd0aCAmJiAhaXNFT0wobmV3VGV4dCwgZW5kKSkge1xuICAgICAgICAgICAgZW5kKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVkaXRzID0gZm9ybWF0KG5ld1RleHQsIHsgb2Zmc2V0OiBiZWdpbiwgbGVuZ3RoOiBlbmQgLSBiZWdpbiB9LCBmb3JtYXR0aW5nT3B0aW9ucyk7XG4gICAgLy8gYXBwbHkgdGhlIGZvcm1hdHRpbmcgZWRpdHMgYW5kIHRyYWNrIHRoZSBiZWdpbiBhbmQgZW5kIG9mZnNldHMgb2YgdGhlIGNoYW5nZXNcbiAgICBmb3IgKHZhciBpID0gZWRpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGVkaXRfMSA9IGVkaXRzW2ldO1xuICAgICAgICBuZXdUZXh0ID0gYXBwbHlFZGl0KG5ld1RleHQsIGVkaXRfMSk7XG4gICAgICAgIGJlZ2luID0gTWF0aC5taW4oYmVnaW4sIGVkaXRfMS5vZmZzZXQpO1xuICAgICAgICBlbmQgPSBNYXRoLm1heChlbmQsIGVkaXRfMS5vZmZzZXQgKyBlZGl0XzEubGVuZ3RoKTtcbiAgICAgICAgZW5kICs9IGVkaXRfMS5jb250ZW50Lmxlbmd0aCAtIGVkaXRfMS5sZW5ndGg7XG4gICAgfVxuICAgIC8vIGNyZWF0ZSBhIHNpbmdsZSBlZGl0IHdpdGggYWxsIGNoYW5nZXNcbiAgICB2YXIgZWRpdExlbmd0aCA9IHRleHQubGVuZ3RoIC0gKG5ld1RleHQubGVuZ3RoIC0gZW5kKSAtIGJlZ2luO1xuICAgIHJldHVybiBbeyBvZmZzZXQ6IGJlZ2luLCBsZW5ndGg6IGVkaXRMZW5ndGgsIGNvbnRlbnQ6IG5ld1RleHQuc3Vic3RyaW5nKGJlZ2luLCBlbmQpIH1dO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RWRpdCh0ZXh0LCBlZGl0KSB7XG4gICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKDAsIGVkaXQub2Zmc2V0KSArIGVkaXQuY29udGVudCArIHRleHQuc3Vic3RyaW5nKGVkaXQub2Zmc2V0ICsgZWRpdC5sZW5ndGgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzV1ModGV4dCwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuICdcXHJcXG4gXFx0Jy5pbmRleE9mKHRleHQuY2hhckF0KG9mZnNldCkpICE9PSAtMTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVkaXQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9lZGl0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9pbXBsL2VkaXQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQgeyBjcmVhdGVTY2FubmVyIH0gZnJvbSAnLi9zY2FubmVyLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZG9jdW1lbnRUZXh0LCByYW5nZSwgb3B0aW9ucykge1xuICAgIHZhciBpbml0aWFsSW5kZW50TGV2ZWw7XG4gICAgdmFyIGZvcm1hdFRleHQ7XG4gICAgdmFyIGZvcm1hdFRleHRTdGFydDtcbiAgICB2YXIgcmFuZ2VTdGFydDtcbiAgICB2YXIgcmFuZ2VFbmQ7XG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICAgIHJhbmdlU3RhcnQgPSByYW5nZS5vZmZzZXQ7XG4gICAgICAgIHJhbmdlRW5kID0gcmFuZ2VTdGFydCArIHJhbmdlLmxlbmd0aDtcbiAgICAgICAgZm9ybWF0VGV4dFN0YXJ0ID0gcmFuZ2VTdGFydDtcbiAgICAgICAgd2hpbGUgKGZvcm1hdFRleHRTdGFydCA+IDAgJiYgIWlzRU9MKGRvY3VtZW50VGV4dCwgZm9ybWF0VGV4dFN0YXJ0IC0gMSkpIHtcbiAgICAgICAgICAgIGZvcm1hdFRleHRTdGFydC0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbmRPZmZzZXQgPSByYW5nZUVuZDtcbiAgICAgICAgd2hpbGUgKGVuZE9mZnNldCA8IGRvY3VtZW50VGV4dC5sZW5ndGggJiYgIWlzRU9MKGRvY3VtZW50VGV4dCwgZW5kT2Zmc2V0KSkge1xuICAgICAgICAgICAgZW5kT2Zmc2V0Kys7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0VGV4dCA9IGRvY3VtZW50VGV4dC5zdWJzdHJpbmcoZm9ybWF0VGV4dFN0YXJ0LCBlbmRPZmZzZXQpO1xuICAgICAgICBpbml0aWFsSW5kZW50TGV2ZWwgPSBjb21wdXRlSW5kZW50TGV2ZWwoZm9ybWF0VGV4dCwgMCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3JtYXRUZXh0ID0gZG9jdW1lbnRUZXh0O1xuICAgICAgICBpbml0aWFsSW5kZW50TGV2ZWwgPSAwO1xuICAgICAgICBmb3JtYXRUZXh0U3RhcnQgPSAwO1xuICAgICAgICByYW5nZVN0YXJ0ID0gMDtcbiAgICAgICAgcmFuZ2VFbmQgPSBkb2N1bWVudFRleHQubGVuZ3RoO1xuICAgIH1cbiAgICB2YXIgZW9sID0gZ2V0RU9MKG9wdGlvbnMsIGRvY3VtZW50VGV4dCk7XG4gICAgdmFyIGxpbmVCcmVhayA9IGZhbHNlO1xuICAgIHZhciBpbmRlbnRMZXZlbCA9IDA7XG4gICAgdmFyIGluZGVudFZhbHVlO1xuICAgIGlmIChvcHRpb25zLmluc2VydFNwYWNlcykge1xuICAgICAgICBpbmRlbnRWYWx1ZSA9IHJlcGVhdCgnICcsIG9wdGlvbnMudGFiU2l6ZSB8fCA0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluZGVudFZhbHVlID0gJ1xcdCc7XG4gICAgfVxuICAgIHZhciBzY2FubmVyID0gY3JlYXRlU2Nhbm5lcihmb3JtYXRUZXh0LCBmYWxzZSk7XG4gICAgdmFyIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gbmV3TGluZUFuZEluZGVudCgpIHtcbiAgICAgICAgcmV0dXJuIGVvbCArIHJlcGVhdChpbmRlbnRWYWx1ZSwgaW5pdGlhbEluZGVudExldmVsICsgaW5kZW50TGV2ZWwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzY2FuTmV4dCgpIHtcbiAgICAgICAgdmFyIHRva2VuID0gc2Nhbm5lci5zY2FuKCk7XG4gICAgICAgIGxpbmVCcmVhayA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodG9rZW4gPT09IDE1IC8qIFRyaXZpYSAqLyB8fCB0b2tlbiA9PT0gMTQgLyogTGluZUJyZWFrVHJpdmlhICovKSB7XG4gICAgICAgICAgICBsaW5lQnJlYWsgPSBsaW5lQnJlYWsgfHwgKHRva2VuID09PSAxNCAvKiBMaW5lQnJlYWtUcml2aWEgKi8pO1xuICAgICAgICAgICAgdG9rZW4gPSBzY2FubmVyLnNjYW4oKTtcbiAgICAgICAgfVxuICAgICAgICBoYXNFcnJvciA9IHRva2VuID09PSAxNiAvKiBVbmtub3duICovIHx8IHNjYW5uZXIuZ2V0VG9rZW5FcnJvcigpICE9PSAwIC8qIE5vbmUgKi87XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgdmFyIGVkaXRPcGVyYXRpb25zID0gW107XG4gICAgZnVuY3Rpb24gYWRkRWRpdCh0ZXh0LCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0KSB7XG4gICAgICAgIGlmICghaGFzRXJyb3IgJiYgc3RhcnRPZmZzZXQgPCByYW5nZUVuZCAmJiBlbmRPZmZzZXQgPiByYW5nZVN0YXJ0ICYmIGRvY3VtZW50VGV4dC5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkgIT09IHRleHQpIHtcbiAgICAgICAgICAgIGVkaXRPcGVyYXRpb25zLnB1c2goeyBvZmZzZXQ6IHN0YXJ0T2Zmc2V0LCBsZW5ndGg6IGVuZE9mZnNldCAtIHN0YXJ0T2Zmc2V0LCBjb250ZW50OiB0ZXh0IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBmaXJzdFRva2VuID0gc2Nhbk5leHQoKTtcbiAgICBpZiAoZmlyc3RUb2tlbiAhPT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgIHZhciBmaXJzdFRva2VuU3RhcnQgPSBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkgKyBmb3JtYXRUZXh0U3RhcnQ7XG4gICAgICAgIHZhciBpbml0aWFsSW5kZW50ID0gcmVwZWF0KGluZGVudFZhbHVlLCBpbml0aWFsSW5kZW50TGV2ZWwpO1xuICAgICAgICBhZGRFZGl0KGluaXRpYWxJbmRlbnQsIGZvcm1hdFRleHRTdGFydCwgZmlyc3RUb2tlblN0YXJ0KTtcbiAgICB9XG4gICAgd2hpbGUgKGZpcnN0VG9rZW4gIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICB2YXIgZmlyc3RUb2tlbkVuZCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSArIHNjYW5uZXIuZ2V0VG9rZW5MZW5ndGgoKSArIGZvcm1hdFRleHRTdGFydDtcbiAgICAgICAgdmFyIHNlY29uZFRva2VuID0gc2Nhbk5leHQoKTtcbiAgICAgICAgdmFyIHJlcGxhY2VDb250ZW50ID0gJyc7XG4gICAgICAgIHdoaWxlICghbGluZUJyZWFrICYmIChzZWNvbmRUb2tlbiA9PT0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi8gfHwgc2Vjb25kVG9rZW4gPT09IDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLykpIHtcbiAgICAgICAgICAgIC8vIGNvbW1lbnRzIG9uIHRoZSBzYW1lIGxpbmU6IGtlZXAgdGhlbSBvbiB0aGUgc2FtZSBsaW5lLCBidXQgaWdub3JlIHRoZW0gb3RoZXJ3aXNlXG4gICAgICAgICAgICB2YXIgY29tbWVudFRva2VuU3RhcnQgPSBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkgKyBmb3JtYXRUZXh0U3RhcnQ7XG4gICAgICAgICAgICBhZGRFZGl0KCcgJywgZmlyc3RUb2tlbkVuZCwgY29tbWVudFRva2VuU3RhcnQpO1xuICAgICAgICAgICAgZmlyc3RUb2tlbkVuZCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSArIHNjYW5uZXIuZ2V0VG9rZW5MZW5ndGgoKSArIGZvcm1hdFRleHRTdGFydDtcbiAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gc2Vjb25kVG9rZW4gPT09IDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovID8gbmV3TGluZUFuZEluZGVudCgpIDogJyc7XG4gICAgICAgICAgICBzZWNvbmRUb2tlbiA9IHNjYW5OZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlY29uZFRva2VuID09PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLykge1xuICAgICAgICAgICAgaWYgKGZpcnN0VG9rZW4gIT09IDEgLyogT3BlbkJyYWNlVG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICBpbmRlbnRMZXZlbC0tO1xuICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gbmV3TGluZUFuZEluZGVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlY29uZFRva2VuID09PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RUb2tlbiAhPT0gMyAvKiBPcGVuQnJhY2tldFRva2VuICovKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50TGV2ZWwtLTtcbiAgICAgICAgICAgICAgICByZXBsYWNlQ29udGVudCA9IG5ld0xpbmVBbmRJbmRlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZmlyc3RUb2tlbikge1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBPcGVuQnJhY2tldFRva2VuICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBPcGVuQnJhY2VUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50TGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBuZXdMaW5lQW5kSW5kZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBDb21tYVRva2VuICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gbmV3TGluZUFuZEluZGVudCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBuZXdMaW5lQW5kSW5kZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzeW1ib2wgZm9sbG93aW5nIGNvbW1lbnQgb24gdGhlIHNhbWUgbGluZToga2VlcCBvbiBzYW1lIGxpbmUsIHNlcGFyYXRlIHdpdGggJyAnXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ29udGVudCA9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDYgLyogQ29sb25Ub2tlbiAqLzpcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAgLyogU3RyaW5nTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFRva2VuID09PSA2IC8qIENvbG9uVG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgNyAvKiBOdWxsS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDggLyogVHJ1ZUtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgY2FzZSA5IC8qIEZhbHNlS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDExIC8qIE51bWVyaWNMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVG9rZW4gPT09IDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovIHx8IHNlY29uZFRva2VuID09PSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlY29uZFRva2VuICE9PSA1IC8qIENvbW1hVG9rZW4gKi8gJiYgc2Vjb25kVG9rZW4gIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTYgLyogVW5rbm93biAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW5lQnJlYWsgJiYgKHNlY29uZFRva2VuID09PSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLyB8fCBzZWNvbmRUb2tlbiA9PT0gMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovKSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gbmV3TGluZUFuZEluZGVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBzZWNvbmRUb2tlblN0YXJ0ID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpICsgZm9ybWF0VGV4dFN0YXJ0O1xuICAgICAgICBhZGRFZGl0KHJlcGxhY2VDb250ZW50LCBmaXJzdFRva2VuRW5kLCBzZWNvbmRUb2tlblN0YXJ0KTtcbiAgICAgICAgZmlyc3RUb2tlbiA9IHNlY29uZFRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gZWRpdE9wZXJhdGlvbnM7XG59XG5mdW5jdGlvbiByZXBlYXQocywgY291bnQpIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY29tcHV0ZUluZGVudExldmVsKGNvbnRlbnQsIG9mZnNldCwgb3B0aW9ucykge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbkNoYXJzID0gMDtcbiAgICB2YXIgdGFiU2l6ZSA9IG9wdGlvbnMudGFiU2l6ZSB8fCA0O1xuICAgIHdoaWxlIChpIDwgY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoID0gY29udGVudC5jaGFyQXQoaSk7XG4gICAgICAgIGlmIChjaCA9PT0gJyAnKSB7XG4gICAgICAgICAgICBuQ2hhcnMrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIG5DaGFycyArPSB0YWJTaXplO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcihuQ2hhcnMgLyB0YWJTaXplKTtcbn1cbmZ1bmN0aW9uIGdldEVPTChvcHRpb25zLCB0ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaCA9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICBpZiAoY2ggPT09ICdcXHInKSB7XG4gICAgICAgICAgICBpZiAoaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdcXHJcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdcXHInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICAgICAgcmV0dXJuICdcXG4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAob3B0aW9ucyAmJiBvcHRpb25zLmVvbCkgfHwgJ1xcbic7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFT0wodGV4dCwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuICdcXHJcXG4nLmluZGV4T2YodGV4dC5jaGFyQXQob2Zmc2V0KSkgIT09IC0xO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybWF0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL2ltcGwvZm9ybWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9pbXBsL2Zvcm1hdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7IGNyZWF0ZVNjYW5uZXIgfSBmcm9tICcuL3NjYW5uZXIuanMnO1xuLyoqXG4gKiBGb3IgYSBnaXZlbiBvZmZzZXQsIGV2YWx1YXRlIHRoZSBsb2NhdGlvbiBpbiB0aGUgSlNPTiBkb2N1bWVudC4gRWFjaCBzZWdtZW50IGluIHRoZSBsb2NhdGlvbiBwYXRoIGlzIGVpdGhlciBhIHByb3BlcnR5IG5hbWUgb3IgYW4gYXJyYXkgaW5kZXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbih0ZXh0LCBwb3NpdGlvbikge1xuICAgIHZhciBzZWdtZW50cyA9IFtdOyAvLyBzdHJpbmdzIG9yIG51bWJlcnNcbiAgICB2YXIgZWFybHlSZXR1cm5FeGNlcHRpb24gPSBuZXcgT2JqZWN0KCk7XG4gICAgdmFyIHByZXZpb3VzTm9kZSA9IHZvaWQgMDtcbiAgICB2YXIgcHJldmlvdXNOb2RlSW5zdCA9IHtcbiAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICB9O1xuICAgIHZhciBpc0F0UHJvcGVydHlLZXkgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBzZXRQcmV2aW91c05vZGUodmFsdWUsIG9mZnNldCwgbGVuZ3RoLCB0eXBlKSB7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcHJldmlvdXNOb2RlSW5zdC5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LnR5cGUgPSB0eXBlO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LmNvbHVtbk9mZnNldCA9IHZvaWQgMDtcbiAgICAgICAgcHJldmlvdXNOb2RlID0gcHJldmlvdXNOb2RlSW5zdDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmlzaXQodGV4dCwge1xuICAgICAgICAgICAgb25PYmplY3RCZWdpbjogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlzQXRQcm9wZXJ0eUtleSA9IHBvc2l0aW9uID4gb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goJycpOyAvLyBwdXNoIGEgcGxhY2Vob2xkZXIgKHdpbGwgYmUgcmVwbGFjZWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25PYmplY3RQcm9wZXJ0eTogZnVuY3Rpb24gKG5hbWUsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRQcmV2aW91c05vZGUobmFtZSwgb2Zmc2V0LCBsZW5ndGgsICdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdID0gbmFtZTtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0ICsgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk9iamVjdEVuZDogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnBvcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQXJyYXlCZWdpbjogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BcnJheUVuZDogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnBvcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRQcmV2aW91c05vZGUodmFsdWUsIG9mZnNldCwgbGVuZ3RoLCBnZXRMaXRlcmFsTm9kZVR5cGUodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0ICsgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblNlcGFyYXRvcjogZnVuY3Rpb24gKHNlcCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VwID09PSAnOicgJiYgcHJldmlvdXNOb2RlICYmIHByZXZpb3VzTm9kZS50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzTm9kZS5jb2x1bW5PZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQXRQcm9wZXJ0eUtleSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlcCA9PT0gJywnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdID0gbGFzdCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F0UHJvcGVydHlLZXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgIT09IGVhcmx5UmV0dXJuRXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IHNlZ21lbnRzLFxuICAgICAgICBwcmV2aW91c05vZGU6IHByZXZpb3VzTm9kZSxcbiAgICAgICAgaXNBdFByb3BlcnR5S2V5OiBpc0F0UHJvcGVydHlLZXksXG4gICAgICAgIG1hdGNoZXM6IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgayA8IHBhdHRlcm4ubGVuZ3RoICYmIGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuW2tdID09PSBzZWdtZW50c1tpXSB8fCBwYXR0ZXJuW2tdID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXR0ZXJuW2tdICE9PSAnKionKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gayA9PT0gcGF0dGVybi5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHRleHQgYW5kIHJldHVybnMgdGhlIG9iamVjdCB0aGUgSlNPTiBjb250ZW50IHJlcHJlc2VudHMuIE9uIGludmFsaWQgaW5wdXQsIHRoZSBwYXJzZXIgdHJpZXMgdG8gYmUgYXMgZmF1bHQgdG9sZXJhbnQgYXMgcG9zc2libGUsIGJ1dCBzdGlsbCByZXR1cm4gYSByZXN1bHQuXG4gKiBUaGVyZWZvcmUgYWx3YXlzIGNoZWNrIHRoZSBlcnJvcnMgbGlzdCB0byBmaW5kIG91dCBpZiB0aGUgaW5wdXQgd2FzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodGV4dCwgZXJyb3JzLCBvcHRpb25zKSB7XG4gICAgaWYgKGVycm9ycyA9PT0gdm9pZCAwKSB7IGVycm9ycyA9IFtdOyB9XG4gICAgdmFyIGN1cnJlbnRQcm9wZXJ0eSA9IG51bGw7XG4gICAgdmFyIGN1cnJlbnRQYXJlbnQgPSBbXTtcbiAgICB2YXIgcHJldmlvdXNQYXJlbnRzID0gW107XG4gICAgZnVuY3Rpb24gb25WYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50UGFyZW50KSkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJyZW50UHJvcGVydHkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnRbY3VycmVudFByb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciB2aXNpdG9yID0ge1xuICAgICAgICBvbk9iamVjdEJlZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgICAgICBvblZhbHVlKG9iamVjdCk7XG4gICAgICAgICAgICBwcmV2aW91c1BhcmVudHMucHVzaChjdXJyZW50UGFyZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvYmplY3Q7XG4gICAgICAgICAgICBjdXJyZW50UHJvcGVydHkgPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgY3VycmVudFByb3BlcnR5ID0gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PYmplY3RFbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBwcmV2aW91c1BhcmVudHMucG9wKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXJyYXlCZWdpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICBvblZhbHVlKGFycmF5KTtcbiAgICAgICAgICAgIHByZXZpb3VzUGFyZW50cy5wdXNoKGN1cnJlbnRQYXJlbnQpO1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IGFycmF5O1xuICAgICAgICAgICAgY3VycmVudFByb3BlcnR5ID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IHByZXZpb3VzUGFyZW50cy5wb3AoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25MaXRlcmFsVmFsdWU6IG9uVmFsdWUsXG4gICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3I6IGVycm9yLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZpc2l0KHRleHQsIHZpc2l0b3IsIG9wdGlvbnMpO1xuICAgIHJldHVybiBjdXJyZW50UGFyZW50WzBdO1xufVxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHRleHQgYW5kIHJldHVybnMgYSB0cmVlIHJlcHJlc2VudGF0aW9uIHRoZSBKU09OIGNvbnRlbnQuIE9uIGludmFsaWQgaW5wdXQsIHRoZSBwYXJzZXIgdHJpZXMgdG8gYmUgYXMgZmF1bHQgdG9sZXJhbnQgYXMgcG9zc2libGUsIGJ1dCBzdGlsbCByZXR1cm4gYSByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRyZWUodGV4dCwgZXJyb3JzLCBvcHRpb25zKSB7XG4gICAgaWYgKGVycm9ycyA9PT0gdm9pZCAwKSB7IGVycm9ycyA9IFtdOyB9XG4gICAgdmFyIGN1cnJlbnRQYXJlbnQgPSB7IHR5cGU6ICdhcnJheScsIG9mZnNldDogLTEsIGxlbmd0aDogLTEsIGNoaWxkcmVuOiBbXSB9OyAvLyBhcnRpZmljaWFsIHJvb3RcbiAgICBmdW5jdGlvbiBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKGVuZE9mZnNldCkge1xuICAgICAgICBpZiAoY3VycmVudFBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50Lmxlbmd0aCA9IGVuZE9mZnNldCAtIGN1cnJlbnRQYXJlbnQub2Zmc2V0O1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVmFsdWUodmFsdWVOb2RlKSB7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQuY2hpbGRyZW4ucHVzaCh2YWx1ZU5vZGUpO1xuICAgICAgICByZXR1cm4gdmFsdWVOb2RlO1xuICAgIH1cbiAgICB2YXIgdmlzaXRvciA9IHtcbiAgICAgICAgb25PYmplY3RCZWdpbjogZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IG9uVmFsdWUoeyB0eXBlOiAnb2JqZWN0Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvblZhbHVlKHsgdHlwZTogJ3Byb3BlcnR5Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZHJlbi5wdXNoKHsgdHlwZTogJ3N0cmluZycsIHZhbHVlOiBuYW1lLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGgsIHBhcmVudDogY3VycmVudFBhcmVudCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PYmplY3RFbmQ6IGZ1bmN0aW9uIChvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5sZW5ndGggPSBvZmZzZXQgKyBsZW5ndGggLSBjdXJyZW50UGFyZW50Lm9mZnNldDtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvblZhbHVlKHsgdHlwZTogJ2FycmF5Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkFycmF5RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQubGVuZ3RoID0gb2Zmc2V0ICsgbGVuZ3RoIC0gY3VycmVudFBhcmVudC5vZmZzZXQ7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKG9mZnNldCArIGxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTGl0ZXJhbFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBvblZhbHVlKHsgdHlwZTogZ2V0TGl0ZXJhbE5vZGVUeXBlKHZhbHVlKSwgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogbGVuZ3RoLCBwYXJlbnQ6IGN1cnJlbnRQYXJlbnQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXBhcmF0b3I6IGZ1bmN0aW9uIChzZXAsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlcCA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQuY29sdW1uT2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZXAgPT09ICcsJykge1xuICAgICAgICAgICAgICAgICAgICBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKG9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkVycm9yOiBmdW5jdGlvbiAoZXJyb3IsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaCh7IGVycm9yOiBlcnJvciwgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogbGVuZ3RoIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2aXNpdCh0ZXh0LCB2aXNpdG9yLCBvcHRpb25zKTtcbiAgICB2YXIgcmVzdWx0ID0gY3VycmVudFBhcmVudC5jaGlsZHJlblswXTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGRlbGV0ZSByZXN1bHQucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGaW5kcyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gcGF0aCBpbiBhIEpTT04gRE9NLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGVBdExvY2F0aW9uKHJvb3QsIHBhdGgpIHtcbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgdmFyIG5vZGUgPSByb290O1xuICAgIGZvciAodmFyIF9pID0gMCwgcGF0aF8xID0gcGF0aDsgX2kgPCBwYXRoXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBzZWdtZW50ID0gcGF0aF8xW19pXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ29iamVjdCcgfHwgIUFycmF5LmlzQXJyYXkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIF9iID0gbm9kZS5jaGlsZHJlbjsgX2EgPCBfYi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlOb2RlID0gX2JbX2FdO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BlcnR5Tm9kZS5jaGlsZHJlbikgJiYgcHJvcGVydHlOb2RlLmNoaWxkcmVuWzBdLnZhbHVlID09PSBzZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBwcm9wZXJ0eU5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzZWdtZW50O1xuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ2FycmF5JyB8fCBpbmRleCA8IDAgfHwgIUFycmF5LmlzQXJyYXkobm9kZS5jaGlsZHJlbikgfHwgaW5kZXggPj0gbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIEphdmFTY3JpcHQgb2JqZWN0IG9mIHRoZSBnaXZlbiBKU09OIERPTSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlVmFsdWUobm9kZSkge1xuICAgIGlmIChub2RlLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW4ubWFwKGdldE5vZGVWYWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBub2RlLmNoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBfYVtfaV07XG4gICAgICAgICAgICBvYmpbcHJvcC5jaGlsZHJlblswXS52YWx1ZV0gPSBnZXROb2RlVmFsdWUocHJvcC5jaGlsZHJlblsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUudmFsdWU7XG59XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXQodGV4dCwgdmlzaXRvciwgb3B0aW9ucykge1xuICAgIHZhciBfc2Nhbm5lciA9IGNyZWF0ZVNjYW5uZXIodGV4dCwgZmFsc2UpO1xuICAgIGZ1bmN0aW9uIHRvTm9BcmdWaXNpdCh2aXNpdEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB2aXNpdEZ1bmN0aW9uID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmlzaXRGdW5jdGlvbihfc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpLCBfc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpKTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvT25lQXJnVmlzaXQodmlzaXRGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdmlzaXRGdW5jdGlvbiA/IGZ1bmN0aW9uIChhcmcpIHsgcmV0dXJuIHZpc2l0RnVuY3Rpb24oYXJnLCBfc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpLCBfc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpKTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgfVxuICAgIHZhciBvbk9iamVjdEJlZ2luID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RCZWdpbiksIG9uT2JqZWN0UHJvcGVydHkgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RQcm9wZXJ0eSksIG9uT2JqZWN0RW5kID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RFbmQpLCBvbkFycmF5QmVnaW4gPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbkFycmF5QmVnaW4pLCBvbkFycmF5RW5kID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25BcnJheUVuZCksIG9uTGl0ZXJhbFZhbHVlID0gdG9PbmVBcmdWaXNpdCh2aXNpdG9yLm9uTGl0ZXJhbFZhbHVlKSwgb25TZXBhcmF0b3IgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25TZXBhcmF0b3IpLCBvbkNvbW1lbnQgPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbkNvbW1lbnQpLCBvbkVycm9yID0gdG9PbmVBcmdWaXNpdCh2aXNpdG9yLm9uRXJyb3IpO1xuICAgIHZhciBkaXNhbGxvd0NvbW1lbnRzID0gb3B0aW9ucyAmJiBvcHRpb25zLmRpc2FsbG93Q29tbWVudHM7XG4gICAgdmFyIGFsbG93VHJhaWxpbmdDb21tYSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1RyYWlsaW5nQ29tbWE7XG4gICAgZnVuY3Rpb24gc2Nhbk5leHQoKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBfc2Nhbm5lci5zY2FuKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKF9zY2FubmVyLmdldFRva2VuRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBJbnZhbGlkVW5pY29kZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTQgLyogSW52YWxpZFVuaWNvZGUgKi8pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogSW52YWxpZEVzY2FwZUNoYXJhY3RlciAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTUgLyogSW52YWxpZEVzY2FwZUNoYXJhY3RlciAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBVbmV4cGVjdGVkRW5kT2ZOdW1iZXIgKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEzIC8qIFVuZXhwZWN0ZWRFbmRPZk51bWJlciAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBVbmV4cGVjdGVkRW5kT2ZDb21tZW50ICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc2FsbG93Q29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDExIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNiAvKiBJbnZhbGlkQ2hhcmFjdGVyICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxNiAvKiBJbnZhbGlkQ2hhcmFjdGVyICovKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FsbG93Q29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEwIC8qIEludmFsaWRDb21tZW50VG9rZW4gKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNiAvKiBVbmtub3duICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxIC8qIEludmFsaWRTeW1ib2wgKi8pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE1IC8qIFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDE0IC8qIExpbmVCcmVha1RyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yLCBza2lwVW50aWxBZnRlciwgc2tpcFVudGlsKSB7XG4gICAgICAgIGlmIChza2lwVW50aWxBZnRlciA9PT0gdm9pZCAwKSB7IHNraXBVbnRpbEFmdGVyID0gW107IH1cbiAgICAgICAgaWYgKHNraXBVbnRpbCA9PT0gdm9pZCAwKSB7IHNraXBVbnRpbCA9IFtdOyB9XG4gICAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgICBpZiAoc2tpcFVudGlsQWZ0ZXIubGVuZ3RoICsgc2tpcFVudGlsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IF9zY2FubmVyLmdldFRva2VuKCk7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW4gIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgICAgIGlmIChza2lwVW50aWxBZnRlci5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nhbk5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNraXBVbnRpbC5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuID0gc2Nhbk5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVN0cmluZyhpc1ZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IF9zY2FubmVyLmdldFRva2VuVmFsdWUoKTtcbiAgICAgICAgaWYgKGlzVmFsdWUpIHtcbiAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9uT2JqZWN0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5OZXh0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpdGVyYWwoKSB7XG4gICAgICAgIHN3aXRjaCAoX3NjYW5uZXIuZ2V0VG9rZW4oKSkge1xuICAgICAgICAgICAgY2FzZSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShfc2Nhbm5lci5nZXRUb2tlblZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMiAvKiBJbnZhbGlkTnVtYmVyRm9ybWF0ICovKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigyIC8qIEludmFsaWROdW1iZXJGb3JtYXQgKi8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkxpdGVyYWxWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDcgLyogTnVsbEtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgb25MaXRlcmFsVmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDggLyogVHJ1ZUtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgb25MaXRlcmFsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDkgLyogRmFsc2VLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5OZXh0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVByb3BlcnR5KCkge1xuICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gMTAgLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoMyAvKiBQcm9wZXJ0eU5hbWVFeHBlY3RlZCAqLywgW10sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGFyc2VTdHJpbmcoZmFsc2UpO1xuICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gNiAvKiBDb2xvblRva2VuICovKSB7XG4gICAgICAgICAgICBvblNlcGFyYXRvcignOicpO1xuICAgICAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb2xvblxuICAgICAgICAgICAgaWYgKCFwYXJzZVZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoNSAvKiBDb2xvbkV4cGVjdGVkICovLCBbXSwgWzIgLyogQ2xvc2VCcmFjZVRva2VuICovLCA1IC8qIENvbW1hVG9rZW4gKi9dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VPYmplY3QoKSB7XG4gICAgICAgIG9uT2JqZWN0QmVnaW4oKTtcbiAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBvcGVuIGJyYWNlXG4gICAgICAgIHZhciBuZWVkc0NvbW1hID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLyAmJiBfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA1IC8qIENvbW1hVG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5lZWRzQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvblNlcGFyYXRvcignLCcpO1xuICAgICAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY29tbWFcbiAgICAgICAgICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8gJiYgYWxsb3dUcmFpbGluZ0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5lZWRzQ29tbWEpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig2IC8qIENvbW1hRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhcnNlUHJvcGVydHkoKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDQgLyogVmFsdWVFeHBlY3RlZCAqLywgW10sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZWVkc0NvbW1hID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvbk9iamVjdEVuZCgpO1xuICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8pIHtcbiAgICAgICAgICAgIGhhbmRsZUVycm9yKDcgLyogQ2xvc2VCcmFjZUV4cGVjdGVkICovLCBbMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi9dLCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIGNsb3NlIGJyYWNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlQXJyYXkoKSB7XG4gICAgICAgIG9uQXJyYXlCZWdpbigpO1xuICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIG9wZW4gYnJhY2tldFxuICAgICAgICB2YXIgbmVlZHNDb21tYSA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoX3NjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLyAmJiBfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA1IC8qIENvbW1hVG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5lZWRzQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvblNlcGFyYXRvcignLCcpO1xuICAgICAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY29tbWFcbiAgICAgICAgICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLyAmJiBhbGxvd1RyYWlsaW5nQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDYgLyogQ29tbWFFeHBlY3RlZCAqLywgW10sIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFyc2VWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgWzQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmVlZHNDb21tYSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgb25BcnJheUVuZCgpO1xuICAgICAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLykge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoOCAvKiBDbG9zZUJyYWNrZXRFeHBlY3RlZCAqLywgWzQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi9dLCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIGNsb3NlIGJyYWNrZXRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VWYWx1ZSgpIHtcbiAgICAgICAgc3dpdGNoIChfc2Nhbm5lci5nZXRUb2tlbigpKSB7XG4gICAgICAgICAgICBjYXNlIDMgLyogT3BlbkJyYWNrZXRUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VBcnJheSgpO1xuICAgICAgICAgICAgY2FzZSAxIC8qIE9wZW5CcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZU9iamVjdCgpO1xuICAgICAgICAgICAgY2FzZSAxMCAvKiBTdHJpbmdMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZVN0cmluZyh0cnVlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlTGl0ZXJhbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjYW5OZXh0KCk7XG4gICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgPT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFwYXJzZVZhbHVlKCkpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoOSAvKiBFbmRPZkZpbGVFeHBlY3RlZCAqLywgW10sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIFRha2VzIEpTT04gd2l0aCBKYXZhU2NyaXB0LXN0eWxlIGNvbW1lbnRzIGFuZCByZW1vdmVcbiAqIHRoZW0uIE9wdGlvbmFsbHkgcmVwbGFjZXMgZXZlcnkgbm9uZS1uZXdsaW5lIGNoYXJhY3RlclxuICogb2YgY29tbWVudHMgd2l0aCBhIHJlcGxhY2VDaGFyYWN0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQ29tbWVudHModGV4dCwgcmVwbGFjZUNoKSB7XG4gICAgdmFyIF9zY2FubmVyID0gY3JlYXRlU2Nhbm5lcih0ZXh0KSwgcGFydHMgPSBbXSwga2luZCwgb2Zmc2V0ID0gMCwgcG9zO1xuICAgIGRvIHtcbiAgICAgICAgcG9zID0gX3NjYW5uZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAga2luZCA9IF9zY2FubmVyLnNjYW4oKTtcbiAgICAgICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgICAgICBjYXNlIDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgY2FzZSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICBjYXNlIDE3IC8qIEVPRiAqLzpcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh0ZXh0LnN1YnN0cmluZyhvZmZzZXQsIHBvcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZUNoICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaChfc2Nhbm5lci5nZXRUb2tlblZhbHVlKCkucmVwbGFjZSgvW15cXHJcXG5dL2csIHJlcGxhY2VDaCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBfc2Nhbm5lci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSB3aGlsZSAoa2luZCAhPT0gMTcgLyogRU9GICovKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG59XG5mdW5jdGlvbiBnZXRMaXRlcmFsTm9kZVR5cGUodmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuICdib29sZWFuJztcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogcmV0dXJuICdudW1iZXInO1xuICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gJ3N0cmluZyc7XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiAnbnVsbCc7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFyc2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL2ltcGwvcGFyc2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9pbXBsL3BhcnNlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIEpTT04gc2Nhbm5lciBvbiB0aGUgZ2l2ZW4gdGV4dC5cbiAqIElmIGlnbm9yZVRyaXZpYSBpcyBzZXQsIHdoaXRlc3BhY2VzIG9yIGNvbW1lbnRzIGFyZSBpZ25vcmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2Nhbm5lcih0ZXh0LCBpZ25vcmVUcml2aWEpIHtcbiAgICBpZiAoaWdub3JlVHJpdmlhID09PSB2b2lkIDApIHsgaWdub3JlVHJpdmlhID0gZmFsc2U7IH1cbiAgICB2YXIgcG9zID0gMCwgbGVuID0gdGV4dC5sZW5ndGgsIHZhbHVlID0gJycsIHRva2VuT2Zmc2V0ID0gMCwgdG9rZW4gPSAxNiAvKiBVbmtub3duICovLCBzY2FuRXJyb3IgPSAwIC8qIE5vbmUgKi87XG4gICAgZnVuY3Rpb24gc2NhbkhleERpZ2l0cyhjb3VudCwgZXhhY3QpIHtcbiAgICAgICAgdmFyIGRpZ2l0cyA9IDA7XG4gICAgICAgIHZhciB2YWx1ZSA9IDA7XG4gICAgICAgIHdoaWxlIChkaWdpdHMgPCBjb3VudCB8fCAhZXhhY3QpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgaWYgKGNoID49IDQ4IC8qIF8wICovICYmIGNoIDw9IDU3IC8qIF85ICovKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIDE2ICsgY2ggLSA0OCAvKiBfMCAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID49IDY1IC8qIEEgKi8gJiYgY2ggPD0gNzAgLyogRiAqLykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKiAxNiArIGNoIC0gNjUgLyogQSAqLyArIDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPj0gOTcgLyogYSAqLyAmJiBjaCA8PSAxMDIgLyogZiAqLykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKiAxNiArIGNoIC0gOTcgLyogYSAqLyArIDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIGRpZ2l0cysrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaWdpdHMgPCBjb3VudCkge1xuICAgICAgICAgICAgdmFsdWUgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBvc2l0aW9uKG5ld1Bvc2l0aW9uKSB7XG4gICAgICAgIHBvcyA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICB0b2tlbk9mZnNldCA9IDA7XG4gICAgICAgIHRva2VuID0gMTYgLyogVW5rbm93biAqLztcbiAgICAgICAgc2NhbkVycm9yID0gMCAvKiBOb25lICovO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzY2FuTnVtYmVyKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBwb3M7XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gNDggLyogXzAgKi8pIHtcbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgdGV4dC5sZW5ndGggJiYgaXNEaWdpdCh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQ2IC8qIGRvdCAqLykge1xuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgaXNEaWdpdCh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zIDwgdGV4dC5sZW5ndGggJiYgaXNEaWdpdCh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NhbkVycm9yID0gMyAvKiBVbmV4cGVjdGVkRW5kT2ZOdW1iZXIgKi87XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBlbmQgPSBwb3M7XG4gICAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiAodGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDY5IC8qIEUgKi8gfHwgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDEwMSAvKiBlICovKSkge1xuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQzIC8qIHBsdXMgKi8gfHwgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQ1IC8qIG1pbnVzICovKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgaXNEaWdpdCh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zIDwgdGV4dC5sZW5ndGggJiYgaXNEaWdpdCh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVuZCA9IHBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDMgLyogVW5leHBlY3RlZEVuZE9mTnVtYmVyICovO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2NhblN0cmluZygpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnLCBzdGFydCA9IHBvcztcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPj0gbGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IDM0IC8qIGRvdWJsZVF1b3RlICovKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoID09PSA5MiAvKiBiYWNrc2xhc2ggKi8pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+PSBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2NhbkVycm9yID0gMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaCA9IHRleHQuY2hhckNvZGVBdChwb3MrKyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM0IC8qIGRvdWJsZVF1b3RlICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXFwiJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDkyIC8qIGJhY2tzbGFzaCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0NyAvKiBzbGFzaCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OCAvKiBiICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXGInO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTAyIC8qIGYgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcZic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTAgLyogbiAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNCAvKiByICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXHInO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE2IC8qIHQgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTcgLyogdSAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaF8xID0gc2NhbkhleERpZ2l0cyg0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaF8xID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDQgLyogSW52YWxpZFVuaWNvZGUgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDUgLyogSW52YWxpZEVzY2FwZUNoYXJhY3RlciAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBwb3M7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2ggPj0gMCAmJiBjaCA8PSAweDFmKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGluZUJyZWFrKGNoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDYgLyogSW52YWxpZENoYXJhY3RlciAqLztcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayBhcyBlcnJvciBidXQgY29udGludWUgd2l0aCBzdHJpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzY2FuTmV4dCgpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgc2NhbkVycm9yID0gMCAvKiBOb25lICovO1xuICAgICAgICB0b2tlbk9mZnNldCA9IHBvcztcbiAgICAgICAgaWYgKHBvcyA+PSBsZW4pIHtcbiAgICAgICAgICAgIC8vIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIHRva2VuT2Zmc2V0ID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTcgLyogRU9GICovO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgIC8vIHRyaXZpYTogd2hpdGVzcGFjZVxuICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlKGNvZGUpKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgICAgICBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICB9IHdoaWxlIChpc1doaXRlU3BhY2UoY29kZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTUgLyogVHJpdmlhICovO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRyaXZpYTogbmV3bGluZXNcbiAgICAgICAgaWYgKGlzTGluZUJyZWFrKGNvZGUpKSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gMTMgLyogY2FycmlhZ2VSZXR1cm4gKi8gJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDEwIC8qIGxpbmVGZWVkICovKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNCAvKiBMaW5lQnJlYWtUcml2aWEgKi87XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICAvLyB0b2tlbnM6IFtde306LFxuICAgICAgICAgICAgY2FzZSAxMjMgLyogb3BlbkJyYWNlICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDEgLyogT3BlbkJyYWNlVG9rZW4gKi87XG4gICAgICAgICAgICBjYXNlIDEyNSAvKiBjbG9zZUJyYWNlICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDIgLyogQ2xvc2VCcmFjZVRva2VuICovO1xuICAgICAgICAgICAgY2FzZSA5MSAvKiBvcGVuQnJhY2tldCAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAzIC8qIE9wZW5CcmFja2V0VG9rZW4gKi87XG4gICAgICAgICAgICBjYXNlIDkzIC8qIGNsb3NlQnJhY2tldCAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovO1xuICAgICAgICAgICAgY2FzZSA1OCAvKiBjb2xvbiAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSA2IC8qIENvbG9uVG9rZW4gKi87XG4gICAgICAgICAgICBjYXNlIDQ0IC8qIGNvbW1hICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDUgLyogQ29tbWFUb2tlbiAqLztcbiAgICAgICAgICAgIC8vIHN0cmluZ3NcbiAgICAgICAgICAgIGNhc2UgMzQgLyogZG91YmxlUXVvdGUgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzY2FuU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTAgLyogU3RyaW5nTGl0ZXJhbCAqLztcbiAgICAgICAgICAgIC8vIGNvbW1lbnRzXG4gICAgICAgICAgICBjYXNlIDQ3IC8qIHNsYXNoICovOlxuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHBvcyAtIDE7XG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlLWxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQocG9zICsgMSkgPT09IDQ3IC8qIHNsYXNoICovKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNMaW5lQnJlYWsodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gNDIgLyogYXN0ZXJpc2sgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50Q2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSA0MiAvKiBhc3RlcmlzayAqLyAmJiAocG9zICsgMSA8IGxlbikgJiYgdGV4dC5jaGFyQ29kZUF0KHBvcyArIDEpID09PSA0NyAvKiBzbGFzaCAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21tZW50Q2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGp1c3QgYSBzaW5nbGUgc2xhc2hcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE2IC8qIFVua25vd24gKi87XG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ1IC8qIG1pbnVzICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gbGVuIHx8ICFpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvdW5kIGEgbWludXMsIGZvbGxvd2VkIGJ5IGEgbnVtYmVyIHNvXG4gICAgICAgICAgICAvLyB3ZSBmYWxsIHRocm91Z2ggdG8gcHJvY2VlZCB3aXRoIHNjYW5uaW5nXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ4IC8qIF8wICovOlxuICAgICAgICAgICAgY2FzZSA0OSAvKiBfMSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTAgLyogXzIgKi86XG4gICAgICAgICAgICBjYXNlIDUxIC8qIF8zICovOlxuICAgICAgICAgICAgY2FzZSA1MiAvKiBfNCAqLzpcbiAgICAgICAgICAgIGNhc2UgNTMgLyogXzUgKi86XG4gICAgICAgICAgICBjYXNlIDU0IC8qIF82ICovOlxuICAgICAgICAgICAgY2FzZSA1NSAvKiBfNyAqLzpcbiAgICAgICAgICAgIGNhc2UgNTYgLyogXzggKi86XG4gICAgICAgICAgICBjYXNlIDU3IC8qIF85ICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IHNjYW5OdW1iZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLztcbiAgICAgICAgICAgIC8vIGxpdGVyYWxzIGFuZCB1bmtub3duIHN5bWJvbHNcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gaXMgYSBsaXRlcmFsPyBSZWFkIHRoZSBmdWxsIHdvcmQuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGxlbiAmJiBpc1Vua25vd25Db250ZW50Q2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbk9mZnNldCAhPT0gcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGV4dC5zdWJzdHJpbmcodG9rZW5PZmZzZXQsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleXdvcmRzOiB0cnVlLCBmYWxzZSwgbnVsbFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0cnVlJzogcmV0dXJuIHRva2VuID0gOCAvKiBUcnVlS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzogcmV0dXJuIHRva2VuID0gOSAvKiBGYWxzZUtleXdvcmQgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudWxsJzogcmV0dXJuIHRva2VuID0gNyAvKiBOdWxsS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVW5rbm93bkNvbnRlbnRDaGFyYWN0ZXIoY29kZSkge1xuICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlKGNvZGUpIHx8IGlzTGluZUJyZWFrKGNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEyNSAvKiBjbG9zZUJyYWNlICovOlxuICAgICAgICAgICAgY2FzZSA5MyAvKiBjbG9zZUJyYWNrZXQgKi86XG4gICAgICAgICAgICBjYXNlIDEyMyAvKiBvcGVuQnJhY2UgKi86XG4gICAgICAgICAgICBjYXNlIDkxIC8qIG9wZW5CcmFja2V0ICovOlxuICAgICAgICAgICAgY2FzZSAzNCAvKiBkb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTggLyogY29sb24gKi86XG4gICAgICAgICAgICBjYXNlIDQ0IC8qIGNvbW1hICovOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2Nhbk5leHROb25Ucml2aWEoKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHNjYW5OZXh0KCk7XG4gICAgICAgIH0gd2hpbGUgKHJlc3VsdCA+PSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLyAmJiByZXN1bHQgPD0gMTUgLyogVHJpdmlhICovKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0UG9zaXRpb246IHNldFBvc2l0aW9uLFxuICAgICAgICBnZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zOyB9LFxuICAgICAgICBzY2FuOiBpZ25vcmVUcml2aWEgPyBzY2FuTmV4dE5vblRyaXZpYSA6IHNjYW5OZXh0LFxuICAgICAgICBnZXRUb2tlbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdG9rZW47IH0sXG4gICAgICAgIGdldFRva2VuVmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9LFxuICAgICAgICBnZXRUb2tlbk9mZnNldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdG9rZW5PZmZzZXQ7IH0sXG4gICAgICAgIGdldFRva2VuTGVuZ3RoOiBmdW5jdGlvbiAoKSB7IHJldHVybiBwb3MgLSB0b2tlbk9mZnNldDsgfSxcbiAgICAgICAgZ2V0VG9rZW5FcnJvcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NhbkVycm9yOyB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzV2hpdGVTcGFjZShjaCkge1xuICAgIHJldHVybiBjaCA9PT0gMzIgLyogc3BhY2UgKi8gfHwgY2ggPT09IDkgLyogdGFiICovIHx8IGNoID09PSAxMSAvKiB2ZXJ0aWNhbFRhYiAqLyB8fCBjaCA9PT0gMTIgLyogZm9ybUZlZWQgKi8gfHxcbiAgICAgICAgY2ggPT09IDE2MCAvKiBub25CcmVha2luZ1NwYWNlICovIHx8IGNoID09PSA1NzYwIC8qIG9naGFtICovIHx8IGNoID49IDgxOTIgLyogZW5RdWFkICovICYmIGNoIDw9IDgyMDMgLyogemVyb1dpZHRoU3BhY2UgKi8gfHxcbiAgICAgICAgY2ggPT09IDgyMzkgLyogbmFycm93Tm9CcmVha1NwYWNlICovIHx8IGNoID09PSA4Mjg3IC8qIG1hdGhlbWF0aWNhbFNwYWNlICovIHx8IGNoID09PSAxMjI4OCAvKiBpZGVvZ3JhcGhpY1NwYWNlICovIHx8IGNoID09PSA2NTI3OSAvKiBieXRlT3JkZXJNYXJrICovO1xufVxuZnVuY3Rpb24gaXNMaW5lQnJlYWsoY2gpIHtcbiAgICByZXR1cm4gY2ggPT09IDEwIC8qIGxpbmVGZWVkICovIHx8IGNoID09PSAxMyAvKiBjYXJyaWFnZVJldHVybiAqLyB8fCBjaCA9PT0gODIzMiAvKiBsaW5lU2VwYXJhdG9yICovIHx8IGNoID09PSA4MjMzIC8qIHBhcmFncmFwaFNlcGFyYXRvciAqLztcbn1cbmZ1bmN0aW9uIGlzRGlnaXQoY2gpIHtcbiAgICByZXR1cm4gY2ggPj0gNDggLyogXzAgKi8gJiYgY2ggPD0gNTcgLyogXzkgKi87XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2FubmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL2ltcGwvc2Nhbm5lci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9zY2FubmVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICogYXMgZm9ybWF0dGVyIGZyb20gJy4vaW1wbC9mb3JtYXQuanMnO1xuaW1wb3J0ICogYXMgZWRpdCBmcm9tICcuL2ltcGwvZWRpdC5qcyc7XG5pbXBvcnQgKiBhcyBzY2FubmVyIGZyb20gJy4vaW1wbC9zY2FubmVyLmpzJztcbmltcG9ydCAqIGFzIHBhcnNlciBmcm9tICcuL2ltcGwvcGFyc2VyLmpzJztcbi8qKlxuICogQ3JlYXRlcyBhIEpTT04gc2Nhbm5lciBvbiB0aGUgZ2l2ZW4gdGV4dC5cbiAqIElmIGlnbm9yZVRyaXZpYSBpcyBzZXQsIHdoaXRlc3BhY2VzIG9yIGNvbW1lbnRzIGFyZSBpZ25vcmVkLlxuICovXG5leHBvcnQgdmFyIGNyZWF0ZVNjYW5uZXIgPSBzY2FubmVyLmNyZWF0ZVNjYW5uZXI7XG4vKipcbiAqIEZvciBhIGdpdmVuIG9mZnNldCwgZXZhbHVhdGUgdGhlIGxvY2F0aW9uIGluIHRoZSBKU09OIGRvY3VtZW50LiBFYWNoIHNlZ21lbnQgaW4gdGhlIGxvY2F0aW9uIHBhdGggaXMgZWl0aGVyIGEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBpbmRleC5cbiAqL1xuZXhwb3J0IHZhciBnZXRMb2NhdGlvbiA9IHBhcnNlci5nZXRMb2NhdGlvbjtcbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiB0ZXh0IGFuZCByZXR1cm5zIHRoZSBvYmplY3QgdGhlIEpTT04gY29udGVudCByZXByZXNlbnRzLiBPbiBpbnZhbGlkIGlucHV0LCB0aGUgcGFyc2VyIHRyaWVzIHRvIGJlIGFzIGZhdWx0IHRvbGVyYW50IGFzIHBvc3NpYmxlLCBidXQgc3RpbGwgcmV0dXJuIGEgcmVzdWx0LlxuICogVGhlcmVmb3JlIGFsd2F5cyBjaGVjayB0aGUgZXJyb3JzIGxpc3QgdG8gZmluZCBvdXQgaWYgdGhlIGlucHV0IHdhcyB2YWxpZC5cbiAqL1xuZXhwb3J0IHZhciBwYXJzZSA9IHBhcnNlci5wYXJzZTtcbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiB0ZXh0IGFuZCByZXR1cm5zIGEgdHJlZSByZXByZXNlbnRhdGlvbiB0aGUgSlNPTiBjb250ZW50LiBPbiBpbnZhbGlkIGlucHV0LCB0aGUgcGFyc2VyIHRyaWVzIHRvIGJlIGFzIGZhdWx0IHRvbGVyYW50IGFzIHBvc3NpYmxlLCBidXQgc3RpbGwgcmV0dXJuIGEgcmVzdWx0LlxuICovXG5leHBvcnQgdmFyIHBhcnNlVHJlZSA9IHBhcnNlci5wYXJzZVRyZWU7XG4vKipcbiAqIEZpbmRzIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBwYXRoIGluIGEgSlNPTiBET00uXG4gKi9cbmV4cG9ydCB2YXIgZmluZE5vZGVBdExvY2F0aW9uID0gcGFyc2VyLmZpbmROb2RlQXRMb2NhdGlvbjtcbi8qKlxuICogRXZhbHVhdGVzIHRoZSBKYXZhU2NyaXB0IG9iamVjdCBvZiB0aGUgZ2l2ZW4gSlNPTiBET00gbm9kZVxuICovXG5leHBvcnQgdmFyIGdldE5vZGVWYWx1ZSA9IHBhcnNlci5nZXROb2RlVmFsdWU7XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgdmFyIHZpc2l0ID0gcGFyc2VyLnZpc2l0O1xuLyoqXG4gKiBUYWtlcyBKU09OIHdpdGggSmF2YVNjcmlwdC1zdHlsZSBjb21tZW50cyBhbmQgcmVtb3ZlXG4gKiB0aGVtLiBPcHRpb25hbGx5IHJlcGxhY2VzIGV2ZXJ5IG5vbmUtbmV3bGluZSBjaGFyYWN0ZXJcbiAqIG9mIGNvbW1lbnRzIHdpdGggYSByZXBsYWNlQ2hhcmFjdGVyXG4gKi9cbmV4cG9ydCB2YXIgc3RyaXBDb21tZW50cyA9IHBhcnNlci5zdHJpcENvbW1lbnRzO1xuLyoqXG4gKiBDb21wdXRlcyB0aGUgZWRpdHMgbmVlZGVkIHRvIGZvcm1hdCBhIEpTT04gZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50VGV4dCBUaGUgaW5wdXQgdGV4dFxuICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0byBmb3JtYXQgb3IgYHVuZGVmaW5lZGAgdG8gZm9ybWF0IHRoZSBmdWxsIGNvbnRlbnRcbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBmb3JtYXR0aW5nIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBlZGl0IG9wZXJhdGlvbnMgZGVzY3JpYmluZyB0aGUgZm9ybWF0dGluZyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gRWRpdHMgY2FuIGJlIGVpdGhlciBpbnNlcnRzLCByZXBsYWNlbWVudHMgb3JcbiAqIHJlbW92YWxzIG9mIHRleHQgc2VnbWVudHMuIEFsbCBvZmZzZXRzIHJlZmVyIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQuIE5vIHR3byBlZGl0cyBtdXN0IGNoYW5nZSBvciByZW1vdmUgdGhlIHNhbWUgcmFuZ2Ugb2ZcbiAqIHRleHQgaW4gdGhlIG9yaWdpbmFsIGRvY3VtZW50LiBIb3dldmVyLCBtdWx0aXBsZSBlZGl0cyBjYW4gaGF2ZVxuICogdGhlIHNhbWUgb2Zmc2V0LCBmb3IgZXhhbXBsZSBtdWx0aXBsZSBpbnNlcnRzLCBvciBhbiBpbnNlcnQgZm9sbG93ZWQgYnkgYSByZW1vdmUgb3IgcmVwbGFjZS4gVGhlIG9yZGVyIGluIHRoZSBhcnJheSBkZWZpbmVzIHdoaWNoIGVkaXQgaXMgYXBwbGllZCBmaXJzdC5cbiAqIFRvIGFwcGx5IGVkaXRzIHRvIGFuIGlucHV0LCB5b3UgY2FuIHVzZSBgYXBwbHlFZGl0c2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkb2N1bWVudFRleHQsIHJhbmdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXQoZG9jdW1lbnRUZXh0LCByYW5nZSwgb3B0aW9ucyk7XG59XG4vKipcbiAqIENvbXB1dGVzIHRoZSBlZGl0cyBuZWVkZWQgdG8gbW9kaWZ5IGEgdmFsdWUgaW4gdGhlIEpTT04gZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50VGV4dCBUaGUgaW5wdXQgdGV4dFxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb2YgdGhlIHZhbHVlIHRvIGNoYW5nZS4gVGhlIHBhdGggcmVwcmVzZW50cyBlaXRoZXIgdG8gdGhlIGRvY3VtZW50IHJvb3QsIGEgcHJvcGVydHkgb3IgYW4gYXJyYXkgaXRlbS5cbiAqIElmIHRoZSBwYXRoIHBvaW50cyB0byBhbiBub24tZXhpc3RpbmcgcHJvcGVydHkgb3IgaXRlbSwgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb3IgaXRlbS4gSWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCxcbiAqIHRoZSBwcm9wZXJ0eSBvciBpdGVtIHdpbGwgYmUgcmVtb3ZlZC5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBlZGl0IG9wZXJhdGlvbnMgZGVzY3JpYmluZyB0aGUgZm9ybWF0dGluZyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gRWRpdHMgY2FuIGJlIGVpdGhlciBpbnNlcnRzLCByZXBsYWNlbWVudHMgb3JcbiAqIHJlbW92YWxzIG9mIHRleHQgc2VnbWVudHMuIEFsbCBvZmZzZXRzIHJlZmVyIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQuIE5vIHR3byBlZGl0cyBtdXN0IGNoYW5nZSBvciByZW1vdmUgdGhlIHNhbWUgcmFuZ2Ugb2ZcbiAqIHRleHQgaW4gdGhlIG9yaWdpbmFsIGRvY3VtZW50LiBIb3dldmVyLCBtdWx0aXBsZSBlZGl0cyBjYW4gaGF2ZVxuICogdGhlIHNhbWUgb2Zmc2V0LCBmb3IgZXhhbXBsZSBtdWx0aXBsZSBpbnNlcnRzLCBvciBhbiBpbnNlcnQgZm9sbG93ZWQgYnkgYSByZW1vdmUgb3IgcmVwbGFjZS4gVGhlIG9yZGVyIGluIHRoZSBhcnJheSBkZWZpbmVzIHdoaWNoIGVkaXQgaXMgYXBwbGllZCBmaXJzdC5cbiAqIFRvIGFwcGx5IGVkaXRzIHRvIGFuIGlucHV0LCB5b3UgY2FuIHVzZSBgYXBwbHlFZGl0c2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZGlmeSh0ZXh0LCBwYXRoLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBlZGl0LnNldFByb3BlcnR5KHRleHQsIHBhdGgsIHZhbHVlLCBvcHRpb25zLmZvcm1hdHRpbmdPcHRpb25zLCBvcHRpb25zLmdldEluc2VydGlvbkluZGV4KTtcbn1cbi8qKlxuICogQXBwbGllcyBlZGl0cyB0byBhIGlucHV0IHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RWRpdHModGV4dCwgZWRpdHMpIHtcbiAgICBmb3IgKHZhciBpID0gZWRpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdGV4dCA9IGVkaXQuYXBwbHlFZGl0KHRleHQsIGVkaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL21haW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBUaGUgUG9zaXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbUG9zaXRpb25dKCNQb3NpdGlvbikgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUG9zaXRpb247XG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBQb3NpdGlvbiBsaXRlcmFsIGZyb20gdGhlIGdpdmVuIGxpbmUgYW5kIGNoYXJhY3Rlci5cbiAgICAgKiBAcGFyYW0gbGluZSBUaGUgcG9zaXRpb24ncyBsaW5lLlxuICAgICAqIEBwYXJhbSBjaGFyYWN0ZXIgVGhlIHBvc2l0aW9uJ3MgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsaW5lLCBjaGFyYWN0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgbGluZTogbGluZSwgY2hhcmFjdGVyOiBjaGFyYWN0ZXIgfTtcbiAgICB9XG4gICAgUG9zaXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcm5hbCBjb25mb3JtcyB0byB0aGUgW1Bvc2l0aW9uXSgjUG9zaXRpb24pIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5saW5lKSAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLmNoYXJhY3Rlcik7XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzID0gaXM7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgUmFuZ2UgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbUmFuZ2VdKCNSYW5nZSkgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG9uZSwgdHdvLCB0aHJlZSwgZm91cikge1xuICAgICAgICBpZiAoSXMubnVtYmVyKG9uZSkgJiYgSXMubnVtYmVyKHR3bykgJiYgSXMubnVtYmVyKHRocmVlKSAmJiBJcy5udW1iZXIoZm91cikpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0OiBQb3NpdGlvbi5jcmVhdGUob25lLCB0d28pLCBlbmQ6IFBvc2l0aW9uLmNyZWF0ZSh0aHJlZSwgZm91cikgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChQb3NpdGlvbi5pcyhvbmUpICYmIFBvc2l0aW9uLmlzKHR3bykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0OiBvbmUsIGVuZDogdHdvIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSYW5nZSNjcmVhdGUgY2FsbGVkIHdpdGggaW52YWxpZCBhcmd1bWVudHNbXCIgKyBvbmUgKyBcIiwgXCIgKyB0d28gKyBcIiwgXCIgKyB0aHJlZSArIFwiLCBcIiArIGZvdXIgKyBcIl1cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbUmFuZ2VdKCNSYW5nZSkgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBQb3NpdGlvbi5pcyhjYW5kaWRhdGUuc3RhcnQpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5lbmQpO1xuICAgIH1cbiAgICBSYW5nZS5pcyA9IGlzO1xufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcbi8qKlxuICogVGhlIExvY2F0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0xvY2F0aW9uXSgjTG9jYXRpb24pIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIExvY2F0aW9uO1xuKGZ1bmN0aW9uIChMb2NhdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMb2NhdGlvbiBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGxvY2F0aW9uJ3MgdXJpLlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgbG9jYXRpb24ncyByYW5nZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCByYW5nZSkge1xuICAgICAgICByZXR1cm4geyB1cmk6IHVyaSwgcmFuZ2U6IHJhbmdlIH07XG4gICAgfVxuICAgIExvY2F0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0xvY2F0aW9uXSgjTG9jYXRpb24pIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUudXJpKSk7XG4gICAgfVxuICAgIExvY2F0aW9uLmlzID0gaXM7XG59KShMb2NhdGlvbiB8fCAoTG9jYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlhZ25vc3RpYydzIHNlcnZlcml0eS5cbiAqL1xuZXhwb3J0IHZhciBEaWFnbm9zdGljU2V2ZXJpdHk7XG4oZnVuY3Rpb24gKERpYWdub3N0aWNTZXZlcml0eSkge1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yID0gMTtcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGEgd2FybmluZy5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZyA9IDI7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhbiBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuSW5mb3JtYXRpb24gPSAzO1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYSBoaW50LlxuICAgICAqL1xuICAgIERpYWdub3N0aWNTZXZlcml0eS5IaW50ID0gNDtcbn0pKERpYWdub3N0aWNTZXZlcml0eSB8fCAoRGlhZ25vc3RpY1NldmVyaXR5ID0ge30pKTtcbi8qKlxuICogVGhlIERpYWdub3N0aWMgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbRGlhZ25vc3RpY10oI0RpYWdub3N0aWMpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWM7XG4oZnVuY3Rpb24gKERpYWdub3N0aWMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERpYWdub3N0aWMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgcmFuZ2U6IHJhbmdlLCBtZXNzYWdlOiBtZXNzYWdlIH07XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHNldmVyaXR5KSkge1xuICAgICAgICAgICAgcmVzdWx0LnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQoY29kZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb2RlID0gY29kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXN1bHQuc291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIERpYWdub3N0aWMuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbRGlhZ25vc3RpY10oI0RpYWdub3N0aWMpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSlcbiAgICAgICAgICAgICYmIElzLnN0cmluZyhjYW5kaWRhdGUubWVzc2FnZSlcbiAgICAgICAgICAgICYmIChJcy5udW1iZXIoY2FuZGlkYXRlLnNldmVyaXR5KSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnNldmVyaXR5KSlcbiAgICAgICAgICAgICYmIChJcy5udW1iZXIoY2FuZGlkYXRlLmNvZGUpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuY29kZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5jb2RlKSlcbiAgICAgICAgICAgICYmIChJcy5zdHJpbmcoY2FuZGlkYXRlLnNvdXJjZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zb3VyY2UpKTtcbiAgICB9XG4gICAgRGlhZ25vc3RpYy5pcyA9IGlzO1xufSkoRGlhZ25vc3RpYyB8fCAoRGlhZ25vc3RpYyA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb21tYW5kIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvbW1hbmRdKCNDb21tYW5kKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb21tYW5kO1xuKGZ1bmN0aW9uIChDb21tYW5kKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb21tYW5kIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHRpdGxlOiB0aXRsZSwgY29tbWFuZDogY29tbWFuZCB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChhcmdzKSAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5hcmd1bWVudHMgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvbW1hbmQuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbQ29tbWFuZF0oI0NvbW1hbmQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSk7XG4gICAgfVxuICAgIENvbW1hbmQuaXMgPSBpcztcbn0pKENvbW1hbmQgfHwgKENvbW1hbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgcmVwbGFjZSxcbiAqIGluc2VydCBhbmQgZGVsZXRlIGVkaXRzIG1vcmUgZWFzaWx5LlxuICovXG5leHBvcnQgdmFyIFRleHRFZGl0O1xuKGZ1bmN0aW9uIChUZXh0RWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXBsYWNlIHRleHQgZWRpdC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRleHQgdG8gYmUgcmVwbGFjZWQuXG4gICAgICogQHBhcmFtIG5ld1RleHQgVGhlIG5ldyB0ZXh0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlcGxhY2UocmFuZ2UsIG5ld1RleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCBuZXdUZXh0OiBuZXdUZXh0IH07XG4gICAgfVxuICAgIFRleHRFZGl0LnJlcGxhY2UgPSByZXBsYWNlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBpbnNlcnQgdGV4dCBlZGl0LlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gdG8gaW5zZXJ0IHRoZSB0ZXh0IGF0LlxuICAgICAqIEBwYXJhbSBuZXdUZXh0IFRoZSB0ZXh0IHRvIGJlIGluc2VydGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluc2VydChwb3NpdGlvbiwgbmV3VGV4dCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogeyBzdGFydDogcG9zaXRpb24sIGVuZDogcG9zaXRpb24gfSwgbmV3VGV4dDogbmV3VGV4dCB9O1xuICAgIH1cbiAgICBUZXh0RWRpdC5pbnNlcnQgPSBpbnNlcnQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRlbGV0ZSB0ZXh0IGVkaXQuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0ZXh0IHRvIGJlIGRlbGV0ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVsKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiByYW5nZSwgbmV3VGV4dDogJycgfTtcbiAgICB9XG4gICAgVGV4dEVkaXQuZGVsID0gZGVsO1xufSkoVGV4dEVkaXQgfHwgKFRleHRFZGl0ID0ge30pKTtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGVcbiAqIGFuIGVkaXQgdGhhdCBtYW5pcHVsYXRlcyBhIHRleHQgZG9jdW1lbnQuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50RWRpdDtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50RWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgYFRleHREb2N1bWVudEVkaXRgXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRleHREb2N1bWVudCwgZWRpdHMpIHtcbiAgICAgICAgcmV0dXJuIHsgdGV4dERvY3VtZW50OiB0ZXh0RG9jdW1lbnQsIGVkaXRzOiBlZGl0cyB9O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRFZGl0LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICYmIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoY2FuZGlkYXRlLnRleHREb2N1bWVudClcbiAgICAgICAgICAgICYmIEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLmVkaXRzKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RWRpdC5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50RWRpdCB8fCAoVGV4dERvY3VtZW50RWRpdCA9IHt9KSk7XG52YXIgVGV4dEVkaXRDaGFuZ2VJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cykge1xuICAgICAgICB0aGlzLmVkaXRzID0gZWRpdHM7XG4gICAgfVxuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBuZXdUZXh0KSB7XG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQpKTtcbiAgICB9O1xuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChyYW5nZSwgbmV3VGV4dCkge1xuICAgICAgICB0aGlzLmVkaXRzLnB1c2goVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgbmV3VGV4dCkpO1xuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKFRleHRFZGl0LmRlbChyYW5nZSkpO1xuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWRpdCkge1xuICAgICAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgfTtcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdHM7XG4gICAgfTtcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVkaXRzLnNwbGljZSgwLCB0aGlzLmVkaXRzLmxlbmd0aCk7XG4gICAgfTtcbiAgICByZXR1cm4gVGV4dEVkaXRDaGFuZ2VJbXBsO1xufSgpKTtcbi8qKlxuICogQSB3b3Jrc3BhY2UgY2hhbmdlIGhlbHBzIGNvbnN0cnVjdGluZyBjaGFuZ2VzIHRvIGEgd29ya3NwYWNlLlxuICovXG52YXIgV29ya3NwYWNlQ2hhbmdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdvcmtzcGFjZUNoYW5nZSh3b3Jrc3BhY2VFZGl0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0KSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0gd29ya3NwYWNlRWRpdDtcbiAgICAgICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKHRleHREb2N1bWVudEVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRFZGl0Q2hhbmdlID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbCh0ZXh0RG9jdW1lbnRFZGl0LmVkaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RleHRFZGl0Q2hhbmdlc1t0ZXh0RG9jdW1lbnRFZGl0LnRleHREb2N1bWVudC51cmldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dEVkaXRDaGFuZ2UgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKHdvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUsIFwiZWRpdFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIFtXb3Jrc3BhY2VFZGl0XSgjV29ya3NwYWNlRWRpdCkgbGl0ZXJhbFxuICAgICAgICAgKiB1c2UgdG8gYmUgcmV0dXJuZWQgZnJvbSBhIHdvcmtzcGFjZSBlZGl0IG9wZXJhdGlvbiBsaWtlIHJlbmFtZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtzcGFjZUVkaXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUuZ2V0VGV4dEVkaXRDaGFuZ2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzKGtleSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd29ya3NwYWNlRWRpdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Q2hhbmdlczogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIHZlcnNpb25lZCBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRleHREb2N1bWVudCA9IGtleTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl90ZXh0RWRpdENoYW5nZXNbdGV4dERvY3VtZW50LnVyaV07XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciBlZGl0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0RG9jdW1lbnRFZGl0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0RG9jdW1lbnQ6IHRleHREb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgZWRpdHM6IGVkaXRzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5wdXNoKHRleHREb2N1bWVudEVkaXQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoZWRpdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlc1t0ZXh0RG9jdW1lbnQudXJpXSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dvcmtzcGFjZUVkaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0ge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzOiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3Jrc3BhY2UgZWRpdCBpcyBub3QgY29uZmlndXJlZCBmb3Igbm9ybWFsIHRleHQgZWRpdCBjaGFuZ2VzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdHMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXNba2V5XSA9IGVkaXRzO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoZWRpdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFdvcmtzcGFjZUNoYW5nZTtcbn0oKSk7XG5leHBvcnQgeyBXb3Jrc3BhY2VDaGFuZ2UgfTtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbVGV4dERvY3VtZW50SWRlbnRpZmllcl0oI1RleHREb2N1bWVudElkZW50aWZpZXIpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFRleHREb2N1bWVudElkZW50aWZpZXI7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudElkZW50aWZpZXIpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFRleHREb2N1bWVudElkZW50aWZpZXIgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpKSB7XG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpIH07XG4gICAgfVxuICAgIFRleHREb2N1bWVudElkZW50aWZpZXIuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbVGV4dERvY3VtZW50SWRlbnRpZmllcl0oI1RleHREb2N1bWVudElkZW50aWZpZXIpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcbi8qKlxuICogVGhlIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcl0oI1ZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXI7XG4oZnVuY3Rpb24gKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgdmVyc2lvbikge1xuICAgICAgICByZXR1cm4geyB1cmk6IHVyaSwgdmVyc2lvbjogdmVyc2lvbiB9O1xuICAgIH1cbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW1ZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJdKCNWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLnZlcnNpb24pO1xuICAgIH1cbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzID0gaXM7XG59KShWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudEl0ZW0gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbVGV4dERvY3VtZW50SXRlbV0oI1RleHREb2N1bWVudEl0ZW0pIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFRleHREb2N1bWVudEl0ZW07XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudEl0ZW0pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFRleHREb2N1bWVudEl0ZW0gbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VJZCBUaGUgZG9jdW1lbnQncyBsYW5ndWFnZSBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB2ZXJzaW9uIFRoZSBkb2N1bWVudCdzIHZlcnNpb24gbnVtYmVyLlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSBkb2N1bWVudCdzIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgdGV4dCkge1xuICAgICAgICByZXR1cm4geyB1cmk6IHVyaSwgbGFuZ3VhZ2VJZDogbGFuZ3VhZ2VJZCwgdmVyc2lvbjogdmVyc2lvbiwgdGV4dDogdGV4dCB9O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRJdGVtLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW1RleHREb2N1bWVudEl0ZW1dKCNUZXh0RG9jdW1lbnRJdGVtKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlSWQpICYmIElzLm51bWJlcihjYW5kaWRhdGUudmVyc2lvbikgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50ZXh0KTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SXRlbS5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50SXRlbSB8fCAoVGV4dERvY3VtZW50SXRlbSA9IHt9KSk7XG4vKipcbiAqIERlc2NyaWJlcyB0aGUgY29udGVudCB0eXBlIHRoYXQgYSBjbGllbnQgc3VwcG9ydHMgaW4gdmFyaW91c1xuICogcmVzdWx0IGxpdGVyYWxzIGxpa2UgYEhvdmVyYCwgYFBhcmFtZXRlckluZm9gIG9yIGBDb21wbGV0aW9uSXRlbWAuXG4gKlxuICogUGxlYXNlIG5vdGUgdGhhdCBgTWFya3VwS2luZHNgIG11c3Qgbm90IHN0YXJ0IHdpdGggYSBgJGAuIFRoaXMga2luZHNcbiAqIGFyZSByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNhZ2UuXG4gKi9cbmV4cG9ydCB2YXIgTWFya3VwS2luZDtcbihmdW5jdGlvbiAoTWFya3VwS2luZCkge1xuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHQgaXMgc3VwcG9ydGVkIGFzIGEgY29udGVudCBmb3JtYXRcbiAgICAgKi9cbiAgICBNYXJrdXBLaW5kLlBsYWluVGV4dCA9ICdwbGFpbnRleHQnO1xuICAgIC8qKlxuICAgICAqIE1hcmtkb3duIGlzIHN1cHBvcnRlZCBhcyBhIGNvbnRlbnQgZm9ybWF0XG4gICAgICovXG4gICAgTWFya3VwS2luZC5NYXJrZG93biA9ICdtYXJrZG93bic7XG59KShNYXJrdXBLaW5kIHx8IChNYXJrdXBLaW5kID0ge30pKTtcbi8qKlxuICogVGhlIGtpbmQgb2YgYSBjb21wbGV0aW9uIGVudHJ5LlxuICovXG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtS2luZDtcbihmdW5jdGlvbiAoQ29tcGxldGlvbkl0ZW1LaW5kKSB7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlRleHQgPSAxO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5NZXRob2QgPSAyO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbiA9IDM7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0cnVjdG9yID0gNDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRmllbGQgPSA1O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5WYXJpYWJsZSA9IDY7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkNsYXNzID0gNztcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlID0gODtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuTW9kdWxlID0gOTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHkgPSAxMDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVW5pdCA9IDExO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5WYWx1ZSA9IDEyO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5FbnVtID0gMTM7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQgPSAxNDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuU25pcHBldCA9IDE1O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Db2xvciA9IDE2O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5GaWxlID0gMTc7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlJlZmVyZW5jZSA9IDE4O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Gb2xkZXIgPSAxOTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRW51bU1lbWJlciA9IDIwO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Db25zdGFudCA9IDIxO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5TdHJ1Y3QgPSAyMjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRXZlbnQgPSAyMztcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuT3BlcmF0b3IgPSAyNDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVHlwZVBhcmFtZXRlciA9IDI1O1xufSkoQ29tcGxldGlvbkl0ZW1LaW5kIHx8IChDb21wbGV0aW9uSXRlbUtpbmQgPSB7fSkpO1xuLyoqXG4gKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGluc2VydCB0ZXh0IGluIGEgY29tcGxldGlvbiBpdGVtIHNob3VsZCBiZSBpbnRlcnByZXRlZCBhc1xuICogcGxhaW4gdGV4dCBvciBhIHNuaXBwZXQuXG4gKi9cbmV4cG9ydCB2YXIgSW5zZXJ0VGV4dEZvcm1hdDtcbihmdW5jdGlvbiAoSW5zZXJ0VGV4dEZvcm1hdCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBwcmltYXJ5IHRleHQgdG8gYmUgaW5zZXJ0ZWQgaXMgdHJlYXRlZCBhcyBhIHBsYWluIHN0cmluZy5cbiAgICAgKi9cbiAgICBJbnNlcnRUZXh0Rm9ybWF0LlBsYWluVGV4dCA9IDE7XG4gICAgLyoqXG4gICAgICogVGhlIHByaW1hcnkgdGV4dCB0byBiZSBpbnNlcnRlZCBpcyB0cmVhdGVkIGFzIGEgc25pcHBldC5cbiAgICAgKlxuICAgICAqIEEgc25pcHBldCBjYW4gZGVmaW5lIHRhYiBzdG9wcyBhbmQgcGxhY2Vob2xkZXJzIHdpdGggYCQxYCwgYCQyYFxuICAgICAqIGFuZCBgJHszOmZvb31gLiBgJDBgIGRlZmluZXMgdGhlIGZpbmFsIHRhYiBzdG9wLCBpdCBkZWZhdWx0cyB0b1xuICAgICAqIHRoZSBlbmQgb2YgdGhlIHNuaXBwZXQuIFBsYWNlaG9sZGVycyB3aXRoIGVxdWFsIGlkZW50aWZpZXJzIGFyZSBsaW5rZWQsXG4gICAgICogdGhhdCBpcyB0eXBpbmcgaW4gb25lIHdpbGwgdXBkYXRlIG90aGVycyB0b28uXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbzogaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC92c2NvZGUvYmxvYi9tYXN0ZXIvc3JjL3ZzL2VkaXRvci9jb250cmliL3NuaXBwZXQvY29tbW9uL3NuaXBwZXQubWRcbiAgICAgKi9cbiAgICBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQgPSAyO1xufSkoSW5zZXJ0VGV4dEZvcm1hdCB8fCAoSW5zZXJ0VGV4dEZvcm1hdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb21wbGV0aW9uSXRlbSBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aFxuICogY29tcGxldGlvbiBpdGVtcy5cbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbTtcbihmdW5jdGlvbiAoQ29tcGxldGlvbkl0ZW0pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21wbGV0aW9uIGl0ZW0gYW5kIHNlZWQgaXQgd2l0aCBhIGxhYmVsLlxuICAgICAqIEBwYXJhbSBsYWJlbCBUaGUgY29tcGxldGlvbiBpdGVtJ3MgbGFiZWxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwpIHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGxhYmVsIH07XG4gICAgfVxuICAgIENvbXBsZXRpb25JdGVtLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKENvbXBsZXRpb25JdGVtIHx8IChDb21wbGV0aW9uSXRlbSA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb21wbGV0aW9uTGlzdCBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aFxuICogY29tcGxldGlvbiBsaXN0cy5cbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uTGlzdDtcbihmdW5jdGlvbiAoQ29tcGxldGlvbkxpc3QpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGNvbXBsZXRpb24gbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtcyBUaGUgY29tcGxldGlvbiBpdGVtcy5cbiAgICAgKiBAcGFyYW0gaXNJbmNvbXBsZXRlIFRoZSBsaXN0IGlzIG5vdCBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoaXRlbXMsIGlzSW5jb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4geyBpdGVtczogaXRlbXMgPyBpdGVtcyA6IFtdLCBpc0luY29tcGxldGU6ICEhaXNJbmNvbXBsZXRlIH07XG4gICAgfVxuICAgIENvbXBsZXRpb25MaXN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKENvbXBsZXRpb25MaXN0IHx8IChDb21wbGV0aW9uTGlzdCA9IHt9KSk7XG5leHBvcnQgdmFyIE1hcmtlZFN0cmluZztcbihmdW5jdGlvbiAoTWFya2VkU3RyaW5nKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hcmtlZCBzdHJpbmcgZnJvbSBwbGFpbiB0ZXh0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsYWluVGV4dCBUaGUgcGxhaW4gdGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmcm9tUGxhaW5UZXh0KHBsYWluVGV4dCkge1xuICAgICAgICByZXR1cm4gcGxhaW5UZXh0LnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCBcIlxcXFwkJlwiKTsgLy8gZXNjYXBlIG1hcmtkb3duIHN5bnRheCB0b2tlbnM6IGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvcHJvamVjdHMvbWFya2Rvd24vc3ludGF4I2JhY2tzbGFzaFxuICAgIH1cbiAgICBNYXJrZWRTdHJpbmcuZnJvbVBsYWluVGV4dCA9IGZyb21QbGFpblRleHQ7XG59KShNYXJrZWRTdHJpbmcgfHwgKE1hcmtlZFN0cmluZyA9IHt9KSk7XG4vKipcbiAqIFRoZSBQYXJhbWV0ZXJJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtQYXJhbWV0ZXJJbmZvcm1hdGlvbl0oI1BhcmFtZXRlckluZm9ybWF0aW9uKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBQYXJhbWV0ZXJJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoUGFyYW1ldGVySW5mb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHBhcmFtZXRlciBpbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhYmVsIEEgbGFiZWwgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBkb2N1bWVudGF0aW9uIEEgZG9jIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50YXRpb24gPyB7IGxhYmVsOiBsYWJlbCwgZG9jdW1lbnRhdGlvbjogZG9jdW1lbnRhdGlvbiB9IDogeyBsYWJlbDogbGFiZWwgfTtcbiAgICB9XG4gICAgUGFyYW1ldGVySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIDtcbn0pKFBhcmFtZXRlckluZm9ybWF0aW9uIHx8IChQYXJhbWV0ZXJJbmZvcm1hdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBTaWduYXR1cmVJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtTaWduYXR1cmVJbmZvcm1hdGlvbl0oI1NpZ25hdHVyZUluZm9ybWF0aW9uKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBTaWduYXR1cmVJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoU2lnbmF0dXJlSW5mb3JtYXRpb24pIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnNbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgbGFiZWw6IGxhYmVsIH07XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGRvY3VtZW50YXRpb24pKSB7XG4gICAgICAgICAgICByZXN1bHQuZG9jdW1lbnRhdGlvbiA9IGRvY3VtZW50YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQocGFyYW1ldGVycykpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wYXJhbWV0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgU2lnbmF0dXJlSW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xufSkoU2lnbmF0dXJlSW5mb3JtYXRpb24gfHwgKFNpZ25hdHVyZUluZm9ybWF0aW9uID0ge30pKTtcbi8qKlxuICogQSBkb2N1bWVudCBoaWdobGlnaHQga2luZC5cbiAqL1xuZXhwb3J0IHZhciBEb2N1bWVudEhpZ2hsaWdodEtpbmQ7XG4oZnVuY3Rpb24gKERvY3VtZW50SGlnaGxpZ2h0S2luZCkge1xuICAgIC8qKlxuICAgICAqIEEgdGV4dHVhbCBvY2N1cnJhbmNlLlxuICAgICAqL1xuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZC5UZXh0ID0gMTtcbiAgICAvKipcbiAgICAgKiBSZWFkLWFjY2VzcyBvZiBhIHN5bWJvbCwgbGlrZSByZWFkaW5nIGEgdmFyaWFibGUuXG4gICAgICovXG4gICAgRG9jdW1lbnRIaWdobGlnaHRLaW5kLlJlYWQgPSAyO1xuICAgIC8qKlxuICAgICAqIFdyaXRlLWFjY2VzcyBvZiBhIHN5bWJvbCwgbGlrZSB3cml0aW5nIHRvIGEgdmFyaWFibGUuXG4gICAgICovXG4gICAgRG9jdW1lbnRIaWdobGlnaHRLaW5kLldyaXRlID0gMztcbn0pKERvY3VtZW50SGlnaGxpZ2h0S2luZCB8fCAoRG9jdW1lbnRIaWdobGlnaHRLaW5kID0ge30pKTtcbi8qKlxuICogRG9jdW1lbnRIaWdobGlnaHQgbmFtZXNwYWNlIHRvIHByb3ZpZGUgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtEb2N1bWVudEhpZ2hsaWdodF0oI0RvY3VtZW50SGlnaGxpZ2h0KSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBEb2N1bWVudEhpZ2hsaWdodDtcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBEb2N1bWVudEhpZ2hsaWdodCBvYmplY3QuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0aGUgaGlnaGxpZ2h0IGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBraW5kKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSB9O1xuICAgICAgICBpZiAoSXMubnVtYmVyKGtpbmQpKSB7XG4gICAgICAgICAgICByZXN1bHQua2luZCA9IGtpbmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgRG9jdW1lbnRIaWdobGlnaHQuY3JlYXRlID0gY3JlYXRlO1xufSkoRG9jdW1lbnRIaWdobGlnaHQgfHwgKERvY3VtZW50SGlnaGxpZ2h0ID0ge30pKTtcbi8qKlxuICogQSBzeW1ib2wga2luZC5cbiAqL1xuZXhwb3J0IHZhciBTeW1ib2xLaW5kO1xuKGZ1bmN0aW9uIChTeW1ib2xLaW5kKSB7XG4gICAgU3ltYm9sS2luZC5GaWxlID0gMTtcbiAgICBTeW1ib2xLaW5kLk1vZHVsZSA9IDI7XG4gICAgU3ltYm9sS2luZC5OYW1lc3BhY2UgPSAzO1xuICAgIFN5bWJvbEtpbmQuUGFja2FnZSA9IDQ7XG4gICAgU3ltYm9sS2luZC5DbGFzcyA9IDU7XG4gICAgU3ltYm9sS2luZC5NZXRob2QgPSA2O1xuICAgIFN5bWJvbEtpbmQuUHJvcGVydHkgPSA3O1xuICAgIFN5bWJvbEtpbmQuRmllbGQgPSA4O1xuICAgIFN5bWJvbEtpbmQuQ29uc3RydWN0b3IgPSA5O1xuICAgIFN5bWJvbEtpbmQuRW51bSA9IDEwO1xuICAgIFN5bWJvbEtpbmQuSW50ZXJmYWNlID0gMTE7XG4gICAgU3ltYm9sS2luZC5GdW5jdGlvbiA9IDEyO1xuICAgIFN5bWJvbEtpbmQuVmFyaWFibGUgPSAxMztcbiAgICBTeW1ib2xLaW5kLkNvbnN0YW50ID0gMTQ7XG4gICAgU3ltYm9sS2luZC5TdHJpbmcgPSAxNTtcbiAgICBTeW1ib2xLaW5kLk51bWJlciA9IDE2O1xuICAgIFN5bWJvbEtpbmQuQm9vbGVhbiA9IDE3O1xuICAgIFN5bWJvbEtpbmQuQXJyYXkgPSAxODtcbiAgICBTeW1ib2xLaW5kLk9iamVjdCA9IDE5O1xuICAgIFN5bWJvbEtpbmQuS2V5ID0gMjA7XG4gICAgU3ltYm9sS2luZC5OdWxsID0gMjE7XG4gICAgU3ltYm9sS2luZC5FbnVtTWVtYmVyID0gMjI7XG4gICAgU3ltYm9sS2luZC5TdHJ1Y3QgPSAyMztcbiAgICBTeW1ib2xLaW5kLkV2ZW50ID0gMjQ7XG4gICAgU3ltYm9sS2luZC5PcGVyYXRvciA9IDI1O1xuICAgIFN5bWJvbEtpbmQuVHlwZVBhcmFtZXRlciA9IDI2O1xufSkoU3ltYm9sS2luZCB8fCAoU3ltYm9sS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIFN5bWJvbEluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChTeW1ib2xJbmZvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc3ltYm9sIGluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSByZXNvdXJjZSBvZiB0aGUgbG9jYXRpb24gb2Ygc3ltYm9sLCBkZWZhdWx0cyB0byB0aGUgY3VycmVudCBkb2N1bWVudC5cbiAgICAgKiBAcGFyYW0gY29udGFpbmVyTmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sIGNvbnRhaW5nIHRoZSBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIGtpbmQsIHJhbmdlLCB1cmksIGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICAgICAgbG9jYXRpb246IHsgdXJpOiB1cmksIHJhbmdlOiByYW5nZSB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb250YWluZXJOYW1lKSB7XG4gICAgICAgICAgICByZXN1bHQuY29udGFpbmVyTmFtZSA9IGNvbnRhaW5lck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgU3ltYm9sSW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xufSkoU3ltYm9sSW5mb3JtYXRpb24gfHwgKFN5bWJvbEluZm9ybWF0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVBY3Rpb25Db250ZXh0IG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvZGVBY3Rpb25Db250ZXh0XSgjQ29kZUFjdGlvbkNvbnRleHQpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVBY3Rpb25Db250ZXh0O1xuKGZ1bmN0aW9uIChDb2RlQWN0aW9uQ29udGV4dCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUFjdGlvbkNvbnRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgcmV0dXJuIHsgZGlhZ25vc3RpY3M6IGRpYWdub3N0aWNzIH07XG4gICAgfVxuICAgIENvZGVBY3Rpb25Db250ZXh0LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvZGVBY3Rpb25Db250ZXh0XSgjQ29kZUFjdGlvbkNvbnRleHQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuZGlhZ25vc3RpY3MsIERpYWdub3N0aWMuaXMpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5pcyA9IGlzO1xufSkoQ29kZUFjdGlvbkNvbnRleHQgfHwgKENvZGVBY3Rpb25Db250ZXh0ID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVMZW5zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvZGVMZW5zXSgjQ29kZUxlbnMpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVMZW5zO1xuKGZ1bmN0aW9uIChDb2RlTGVucykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUxlbnMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgcmFuZ2U6IHJhbmdlIH07XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGRhdGEpKVxuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSBkYXRhO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDb2RlTGVucy5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtDb2RlTGVuc10oI0NvZGVMZW5zKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29tbWFuZCkgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpO1xuICAgIH1cbiAgICBDb2RlTGVucy5pcyA9IGlzO1xufSkoQ29kZUxlbnMgfHwgKENvZGVMZW5zID0ge30pKTtcbi8qKlxuICogVGhlIEZvcm1hdHRpbmdPcHRpb25zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0Zvcm1hdHRpbmdPcHRpb25zXSgjRm9ybWF0dGluZ09wdGlvbnMpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIEZvcm1hdHRpbmdPcHRpb25zO1xuKGZ1bmN0aW9uIChGb3JtYXR0aW5nT3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRm9ybWF0dGluZ09wdGlvbnMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodGFiU2l6ZSwgaW5zZXJ0U3BhY2VzKSB7XG4gICAgICAgIHJldHVybiB7IHRhYlNpemU6IHRhYlNpemUsIGluc2VydFNwYWNlczogaW5zZXJ0U3BhY2VzIH07XG4gICAgfVxuICAgIEZvcm1hdHRpbmdPcHRpb25zLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0Zvcm1hdHRpbmdPcHRpb25zXSgjRm9ybWF0dGluZ09wdGlvbnMpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS50YWJTaXplKSAmJiBJcy5ib29sZWFuKGNhbmRpZGF0ZS5pbnNlcnRTcGFjZXMpO1xuICAgIH1cbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5pcyA9IGlzO1xufSkoRm9ybWF0dGluZ09wdGlvbnMgfHwgKEZvcm1hdHRpbmdPcHRpb25zID0ge30pKTtcbi8qKlxuICogQSBkb2N1bWVudCBsaW5rIGlzIGEgcmFuZ2UgaW4gYSB0ZXh0IGRvY3VtZW50IHRoYXQgbGlua3MgdG8gYW4gaW50ZXJuYWwgb3IgZXh0ZXJuYWwgcmVzb3VyY2UsIGxpa2UgYW5vdGhlclxuICogdGV4dCBkb2N1bWVudCBvciBhIHdlYiBzaXRlLlxuICovXG52YXIgRG9jdW1lbnRMaW5rID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvY3VtZW50TGluaygpIHtcbiAgICB9XG4gICAgcmV0dXJuIERvY3VtZW50TGluaztcbn0oKSk7XG5leHBvcnQgeyBEb2N1bWVudExpbmsgfTtcbi8qKlxuICogVGhlIERvY3VtZW50TGluayBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtEb2N1bWVudExpbmtdKCNEb2N1bWVudExpbmspIGxpdGVyYWxzLlxuICovXG4oZnVuY3Rpb24gKERvY3VtZW50TGluaykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRG9jdW1lbnRMaW5rIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCB0YXJnZXQ6IHRhcmdldCB9O1xuICAgIH1cbiAgICBEb2N1bWVudExpbmsuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbRG9jdW1lbnRMaW5rXSgjRG9jdW1lbnRMaW5rKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGFyZ2V0KSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldCkpO1xuICAgIH1cbiAgICBEb2N1bWVudExpbmsuaXMgPSBpcztcbn0pKERvY3VtZW50TGluayB8fCAoRG9jdW1lbnRMaW5rID0ge30pKTtcbmV4cG9ydCB2YXIgRU9MID0gWydcXG4nLCAnXFxyXFxuJywgJ1xcciddO1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnQ7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSVRleHREb2N1bWVudCBsaXRlcmFsIGZyb20gdGhlIGdpdmVuIHVyaSBhbmQgY29udGVudC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VJZCAgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgSWQuXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRvY3VtZW50J3MgY29udGVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCBjb250ZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVsbFRleHREb2N1bWVudCh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnQuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbSVRleHREb2N1bWVudF0oI0lUZXh0RG9jdW1lbnQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmxhbmd1YWdlSWQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2VJZCkpICYmIElzLm51bWJlcihjYW5kaWRhdGUubGluZUNvdW50KVxuICAgICAgICAgICAgJiYgSXMuZnVuYyhjYW5kaWRhdGUuZ2V0VGV4dCkgJiYgSXMuZnVuYyhjYW5kaWRhdGUucG9zaXRpb25BdCkgJiYgSXMuZnVuYyhjYW5kaWRhdGUub2Zmc2V0QXQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnQuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBhcHBseUVkaXRzKGRvY3VtZW50LCBlZGl0cykge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmdldFRleHQoKTtcbiAgICAgICAgdmFyIHNvcnRlZEVkaXRzID0gbWVyZ2VTb3J0KGVkaXRzLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgdmFyIGRpZmYgPSBhLnJhbmdlLnN0YXJ0LmxpbmUgLSBiLnJhbmdlLnN0YXJ0LmxpbmU7XG4gICAgICAgICAgICBpZiAoZGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciAtIGIucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbGFzdE1vZGlmaWVkT2Zmc2V0ID0gdGV4dC5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSBzb3J0ZWRFZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIGUgPSBzb3J0ZWRFZGl0c1tpXTtcbiAgICAgICAgICAgIHZhciBzdGFydE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgdmFyIGVuZE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2UuZW5kKTtcbiAgICAgICAgICAgIGlmIChlbmRPZmZzZXQgPD0gbGFzdE1vZGlmaWVkT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0T2Zmc2V0KSArIGUubmV3VGV4dCArIHRleHQuc3Vic3RyaW5nKGVuZE9mZnNldCwgdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVsYXBwaW5nIGVkaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RNb2RpZmllZE9mZnNldCA9IHN0YXJ0T2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnQuYXBwbHlFZGl0cyA9IGFwcGx5RWRpdHM7XG4gICAgZnVuY3Rpb24gbWVyZ2VTb3J0KGRhdGEsIGNvbXBhcmUpIHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIC8vIHNvcnRlZFxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSAoZGF0YS5sZW5ndGggLyAyKSB8IDA7XG4gICAgICAgIHZhciBsZWZ0ID0gZGF0YS5zbGljZSgwLCBwKTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gZGF0YS5zbGljZShwKTtcbiAgICAgICAgbWVyZ2VTb3J0KGxlZnQsIGNvbXBhcmUpO1xuICAgICAgICBtZXJnZVNvcnQocmlnaHQsIGNvbXBhcmUpO1xuICAgICAgICB2YXIgbGVmdElkeCA9IDA7XG4gICAgICAgIHZhciByaWdodElkeCA9IDA7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCAmJiByaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IGNvbXBhcmUobGVmdFtsZWZ0SWR4XSwgcmlnaHRbcmlnaHRJZHhdKTtcbiAgICAgICAgICAgIGlmIChyZXQgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHNtYWxsZXJfZXF1YWwgLT4gdGFrZSBsZWZ0IHRvIHByZXNlcnZlIG9yZGVyXG4gICAgICAgICAgICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciAtPiB0YWtlIHJpZ2h0XG4gICAgICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChyaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufSkoVGV4dERvY3VtZW50IHx8IChUZXh0RG9jdW1lbnQgPSB7fSkpO1xuLyoqXG4gKiBSZXByZXNlbnRzIHJlYXNvbnMgd2h5IGEgdGV4dCBkb2N1bWVudCBpcyBzYXZlZC5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnRTYXZlUmVhc29uO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRTYXZlUmVhc29uKSB7XG4gICAgLyoqXG4gICAgICogTWFudWFsbHkgdHJpZ2dlcmVkLCBlLmcuIGJ5IHRoZSB1c2VyIHByZXNzaW5nIHNhdmUsIGJ5IHN0YXJ0aW5nIGRlYnVnZ2luZyxcbiAgICAgKiBvciBieSBhbiBBUEkgY2FsbC5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTYXZlUmVhc29uLk1hbnVhbCA9IDE7XG4gICAgLyoqXG4gICAgICogQXV0b21hdGljIGFmdGVyIGEgZGVsYXkuXG4gICAgICovXG4gICAgVGV4dERvY3VtZW50U2F2ZVJlYXNvbi5BZnRlckRlbGF5ID0gMjtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBlZGl0b3IgbG9zdCBmb2N1cy5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTYXZlUmVhc29uLkZvY3VzT3V0ID0gMztcbn0pKFRleHREb2N1bWVudFNhdmVSZWFzb24gfHwgKFRleHREb2N1bWVudFNhdmVSZWFzb24gPSB7fSkpO1xudmFyIEZ1bGxUZXh0RG9jdW1lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRnVsbFRleHREb2N1bWVudCh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fdXJpID0gdXJpO1xuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gbGFuZ3VhZ2VJZDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJ1cmlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJsYW5ndWFnZUlkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VJZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcInZlcnNpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXRBdChyYW5nZS5zdGFydCk7XG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5vZmZzZXRBdChyYW5nZS5lbmQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH07XG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGV2ZW50LCB2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBldmVudC50ZXh0O1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5fbGluZU9mZnNldHMgPSBudWxsO1xuICAgIH07XG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUuZ2V0TGluZU9mZnNldHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGxpbmVPZmZzZXRzID0gW107XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB2YXIgaXNMaW5lU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGluZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gKGNoID09PSAnXFxyJyB8fCBjaCA9PT0gJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNMaW5lU3RhcnQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGluZU9mZnNldHMucHVzaCh0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IGxpbmVPZmZzZXRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLnBvc2l0aW9uQXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCwgdGhpcy5fY29udGVudC5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgICAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGxpbmVPZmZzZXRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGhpZ2ggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5jcmVhdGUoMCwgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgICAgICAgICBpZiAobGluZU9mZnNldHNbbWlkXSA+IG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGxvdyBpcyB0aGUgbGVhc3QgeCBmb3Igd2hpY2ggdGhlIGxpbmUgb2Zmc2V0IGlzIGxhcmdlciB0aGFuIHRoZSBjdXJyZW50IG9mZnNldFxuICAgICAgICAvLyBvciBhcnJheS5sZW5ndGggaWYgbm8gbGluZSBvZmZzZXQgaXMgbGFyZ2VyIHRoYW4gdGhlIGN1cnJlbnQgb2Zmc2V0XG4gICAgICAgIHZhciBsaW5lID0gbG93IC0gMTtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZShsaW5lLCBvZmZzZXQgLSBsaW5lT2Zmc2V0c1tsaW5lXSk7XG4gICAgfTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS5vZmZzZXRBdCA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICB2YXIgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XG4gICAgICAgIGlmIChwb3NpdGlvbi5saW5lID49IGxpbmVPZmZzZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc2l0aW9uLmxpbmUgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZU9mZnNldCA9IGxpbmVPZmZzZXRzW3Bvc2l0aW9uLmxpbmVdO1xuICAgICAgICB2YXIgbmV4dExpbmVPZmZzZXQgPSAocG9zaXRpb24ubGluZSArIDEgPCBsaW5lT2Zmc2V0cy5sZW5ndGgpID8gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZSArIDFdIDogdGhpcy5fY29udGVudC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihsaW5lT2Zmc2V0ICsgcG9zaXRpb24uY2hhcmFjdGVyLCBuZXh0TGluZU9mZnNldCksIGxpbmVPZmZzZXQpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcImxpbmVDb3VudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZU9mZnNldHMoKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBGdWxsVGV4dERvY3VtZW50O1xufSgpKTtcbnZhciBJcztcbihmdW5jdGlvbiAoSXMpIHtcbiAgICB2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIGZ1bmN0aW9uIGRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIElzLmRlZmluZWQgPSBkZWZpbmVkO1xuICAgIGZ1bmN0aW9uIHVuZGVmaW5lZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgSXMudW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZ1bmN0aW9uIGJvb2xlYW4odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbiAgICB9XG4gICAgSXMuYm9vbGVhbiA9IGJvb2xlYW47XG4gICAgZnVuY3Rpb24gc3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgfVxuICAgIElzLnN0cmluZyA9IHN0cmluZztcbiAgICBmdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJztcbiAgICB9XG4gICAgSXMubnVtYmVyID0gbnVtYmVyO1xuICAgIGZ1bmN0aW9uIGZ1bmModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgICBJcy5mdW5jID0gZnVuYztcbiAgICBmdW5jdGlvbiB0eXBlZEFycmF5KHZhbHVlLCBjaGVjaykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoY2hlY2spO1xuICAgIH1cbiAgICBJcy50eXBlZEFycmF5ID0gdHlwZWRBcnJheTtcbn0pKElzIHx8IChJcyA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9tYWluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHsgV29ya2VyTWFuYWdlciB9IGZyb20gJy4vd29ya2VyTWFuYWdlci5qcyc7XG5pbXBvcnQgKiBhcyBsYW5ndWFnZUZlYXR1cmVzIGZyb20gJy4vbGFuZ3VhZ2VGZWF0dXJlcy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVUb2tlbml6YXRpb25TdXBwb3J0IH0gZnJvbSAnLi90b2tlbml6YXRpb24uanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwTW9kZShkZWZhdWx0cykge1xuICAgIHZhciBkaXNwb3NhYmxlcyA9IFtdO1xuICAgIHZhciBjbGllbnQgPSBuZXcgV29ya2VyTWFuYWdlcihkZWZhdWx0cyk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChjbGllbnQpO1xuICAgIHZhciB3b3JrZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB1cmlzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB1cmlzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsaWVudC5nZXRMYW5ndWFnZVNlcnZpY2VXb3JrZXIuYXBwbHkoY2xpZW50LCB1cmlzKTtcbiAgICB9O1xuICAgIHZhciBsYW5ndWFnZUlkID0gZGVmYXVsdHMubGFuZ3VhZ2VJZDtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkNvbXBsZXRpb25BZGFwdGVyKHdvcmtlcikpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJIb3ZlclByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkhvdmVyQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyRG9jdW1lbnRTeW1ib2xQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Eb2N1bWVudFN5bWJvbEFkYXB0ZXIod29ya2VyKSkpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckRvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Eb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIod29ya2VyKSkpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKHdvcmtlcikpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG5ldyBsYW5ndWFnZUZlYXR1cmVzLkRpYWdub3N0aWNzQWRhcHRlcihsYW5ndWFnZUlkLCB3b3JrZXIsIGRlZmF1bHRzKSk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChtb25hY28ubGFuZ3VhZ2VzLnNldFRva2Vuc1Byb3ZpZGVyKGxhbmd1YWdlSWQsIGNyZWF0ZVRva2VuaXphdGlvblN1cHBvcnQodHJ1ZSkpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKGxhbmd1YWdlSWQsIHJpY2hFZGl0Q29uZmlndXJhdGlvbikpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckNvbG9yUHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IGxhbmd1YWdlRmVhdHVyZXMuRG9jdW1lbnRDb2xvckFkYXB0ZXIod29ya2VyKSkpO1xufVxudmFyIHJpY2hFZGl0Q29uZmlndXJhdGlvbiA9IHtcbiAgICB3b3JkUGF0dGVybjogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXFtcXHtcXF1cXH1cXDpcXFwiXFwsXFxzXSspL2csXG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcvLycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nJ10gfVxuICAgIF1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL2pzb25Nb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL2pzb25Nb2RlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICogYXMgbHMgZnJvbSAnLi9fZGVwcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdHlwZXMvbWFpbi5qcyc7XG52YXIgVXJpID0gbW9uYWNvLlVyaTtcbnZhciBSYW5nZSA9IG1vbmFjby5SYW5nZTtcbi8vIC0tLSBkaWFnbm9zdGljcyAtLS0gLS0tXG52YXIgRGlhZ25vc3RpY3NBZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWdub3N0aWNzQWRhcHRlcihfbGFuZ3VhZ2VJZCwgX3dvcmtlciwgZGVmYXVsdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VJZCA9IF9sYW5ndWFnZUlkO1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IFtdO1xuICAgICAgICB0aGlzLl9saXN0ZW5lciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBvbk1vZGVsQWRkID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICB2YXIgbW9kZUlkID0gbW9kZWwuZ2V0TW9kZUlkKCk7XG4gICAgICAgICAgICBpZiAobW9kZUlkICE9PSBfdGhpcy5fbGFuZ3VhZ2VJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoYW5kbGU7XG4gICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJbbW9kZWwudXJpLnRvU3RyaW5nKCldID0gbW9kZWwub25EaWRDaGFuZ2VDb250ZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9kb1ZhbGlkYXRlKG1vZGVsLnVyaSwgbW9kZUlkKTsgfSwgNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuX2RvVmFsaWRhdGUobW9kZWwudXJpLCBtb2RlSWQpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb25Nb2RlbFJlbW92ZWQgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIG1vbmFjby5lZGl0b3Iuc2V0TW9kZWxNYXJrZXJzKG1vZGVsLCBfdGhpcy5fbGFuZ3VhZ2VJZCwgW10pO1xuICAgICAgICAgICAgdmFyIHVyaVN0ciA9IG1vZGVsLnVyaS50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gX3RoaXMuX2xpc3RlbmVyW3VyaVN0cl07XG4gICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLl9saXN0ZW5lclt1cmlTdHJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5lZGl0b3Iub25EaWRDcmVhdGVNb2RlbChvbk1vZGVsQWRkKSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmVkaXRvci5vbldpbGxEaXNwb3NlTW9kZWwoZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbCk7XG4gICAgICAgICAgICBfdGhpcy5fcmVzZXRTY2hlbWEobW9kZWwudXJpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5lZGl0b3Iub25EaWRDaGFuZ2VNb2RlbExhbmd1YWdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgb25Nb2RlbFJlbW92ZWQoZXZlbnQubW9kZWwpO1xuICAgICAgICAgICAgb25Nb2RlbEFkZChldmVudC5tb2RlbCk7XG4gICAgICAgICAgICBfdGhpcy5fcmVzZXRTY2hlbWEoZXZlbnQubW9kZWwudXJpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKGRlZmF1bHRzLm9uRGlkQ2hhbmdlKGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgICBtb25hY28uZWRpdG9yLmdldE1vZGVscygpLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmdldE1vZGVJZCgpID09PSBfdGhpcy5fbGFuZ3VhZ2VJZCkge1xuICAgICAgICAgICAgICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIG9uTW9kZWxBZGQobW9kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2goe1xuICAgICAgICAgICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vbmFjby5lZGl0b3IuZ2V0TW9kZWxzKCkuZm9yRWFjaChvbk1vZGVsUmVtb3ZlZCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIF90aGlzLl9saXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJba2V5XS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbW9uYWNvLmVkaXRvci5nZXRNb2RlbHMoKS5mb3JFYWNoKG9uTW9kZWxBZGQpO1xuICAgIH1cbiAgICBEaWFnbm9zdGljc0FkYXB0ZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQgJiYgZC5kaXNwb3NlKCk7IH0pO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IFtdO1xuICAgIH07XG4gICAgRGlhZ25vc3RpY3NBZGFwdGVyLnByb3RvdHlwZS5fcmVzZXRTY2hlbWEgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyKCkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgICAgICAgICB3b3JrZXIucmVzZXRTY2hlbWEocmVzb3VyY2UudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGlhZ25vc3RpY3NBZGFwdGVyLnByb3RvdHlwZS5fZG9WYWxpZGF0ZSA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgbGFuZ3VhZ2VJZCkge1xuICAgICAgICB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oZnVuY3Rpb24gKHdvcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5kb1ZhbGlkYXRpb24ocmVzb3VyY2UudG9TdHJpbmcoKSkudGhlbihmdW5jdGlvbiAoZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFya2VycyA9IGRpYWdub3N0aWNzLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gdG9EaWFnbm9zdGljcyhyZXNvdXJjZSwgZCk7IH0pO1xuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IG1vbmFjby5lZGl0b3IuZ2V0TW9kZWwocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5nZXRNb2RlSWQoKSA9PT0gbGFuZ3VhZ2VJZCkge1xuICAgICAgICAgICAgICAgICAgICBtb25hY28uZWRpdG9yLnNldE1vZGVsTWFya2Vycyhtb2RlbCwgbGFuZ3VhZ2VJZCwgbWFya2Vycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERpYWdub3N0aWNzQWRhcHRlcjtcbn0oKSk7XG5leHBvcnQgeyBEaWFnbm9zdGljc0FkYXB0ZXIgfTtcbmZ1bmN0aW9uIHRvU2V2ZXJpdHkobHNTZXZlcml0eSkge1xuICAgIHN3aXRjaCAobHNTZXZlcml0eSkge1xuICAgICAgICBjYXNlIGxzLkRpYWdub3N0aWNTZXZlcml0eS5FcnJvcjogcmV0dXJuIG1vbmFjby5NYXJrZXJTZXZlcml0eS5FcnJvcjtcbiAgICAgICAgY2FzZSBscy5EaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZzogcmV0dXJuIG1vbmFjby5NYXJrZXJTZXZlcml0eS5XYXJuaW5nO1xuICAgICAgICBjYXNlIGxzLkRpYWdub3N0aWNTZXZlcml0eS5JbmZvcm1hdGlvbjogcmV0dXJuIG1vbmFjby5NYXJrZXJTZXZlcml0eS5JbmZvO1xuICAgICAgICBjYXNlIGxzLkRpYWdub3N0aWNTZXZlcml0eS5IaW50OiByZXR1cm4gbW9uYWNvLk1hcmtlclNldmVyaXR5LkhpbnQ7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbW9uYWNvLk1hcmtlclNldmVyaXR5LkluZm87XG4gICAgfVxufVxuZnVuY3Rpb24gdG9EaWFnbm9zdGljcyhyZXNvdXJjZSwgZGlhZykge1xuICAgIHZhciBjb2RlID0gdHlwZW9mIGRpYWcuY29kZSA9PT0gJ251bWJlcicgPyBTdHJpbmcoZGlhZy5jb2RlKSA6IGRpYWcuY29kZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXZlcml0eTogdG9TZXZlcml0eShkaWFnLnNldmVyaXR5KSxcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBkaWFnLnJhbmdlLnN0YXJ0LmxpbmUgKyAxLFxuICAgICAgICBzdGFydENvbHVtbjogZGlhZy5yYW5nZS5zdGFydC5jaGFyYWN0ZXIgKyAxLFxuICAgICAgICBlbmRMaW5lTnVtYmVyOiBkaWFnLnJhbmdlLmVuZC5saW5lICsgMSxcbiAgICAgICAgZW5kQ29sdW1uOiBkaWFnLnJhbmdlLmVuZC5jaGFyYWN0ZXIgKyAxLFxuICAgICAgICBtZXNzYWdlOiBkaWFnLm1lc3NhZ2UsXG4gICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgIHNvdXJjZTogZGlhZy5zb3VyY2VcbiAgICB9O1xufVxuLy8gLS0tIGNvbXBsZXRpb24gLS0tLS0tXG5mdW5jdGlvbiBmcm9tUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICBpZiAoIXBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiB7IGNoYXJhY3RlcjogcG9zaXRpb24uY29sdW1uIC0gMSwgbGluZTogcG9zaXRpb24ubGluZU51bWJlciAtIDEgfTtcbn1cbmZ1bmN0aW9uIGZyb21SYW5nZShyYW5nZSkge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHsgbGluZTogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMSwgY2hhcmFjdGVyOiByYW5nZS5zdGFydENvbHVtbiAtIDEgfSwgZW5kOiB7IGxpbmU6IHJhbmdlLmVuZExpbmVOdW1iZXIgLSAxLCBjaGFyYWN0ZXI6IHJhbmdlLmVuZENvbHVtbiAtIDEgfSB9O1xufVxuZnVuY3Rpb24gdG9SYW5nZShyYW5nZSkge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5zdGFydC5saW5lICsgMSwgcmFuZ2Uuc3RhcnQuY2hhcmFjdGVyICsgMSwgcmFuZ2UuZW5kLmxpbmUgKyAxLCByYW5nZS5lbmQuY2hhcmFjdGVyICsgMSk7XG59XG5mdW5jdGlvbiB0b0NvbXBsZXRpb25JdGVtS2luZChraW5kKSB7XG4gICAgdmFyIG1JdGVtS2luZCA9IG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5UZXh0OiByZXR1cm4gbUl0ZW1LaW5kLlRleHQ7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLk1ldGhvZDogcmV0dXJuIG1JdGVtS2luZC5NZXRob2Q7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uOiByZXR1cm4gbUl0ZW1LaW5kLkZ1bmN0aW9uO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Db25zdHJ1Y3RvcjogcmV0dXJuIG1JdGVtS2luZC5Db25zdHJ1Y3RvcjtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuRmllbGQ6IHJldHVybiBtSXRlbUtpbmQuRmllbGQ7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlZhcmlhYmxlOiByZXR1cm4gbUl0ZW1LaW5kLlZhcmlhYmxlO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5DbGFzczogcmV0dXJuIG1JdGVtS2luZC5DbGFzcztcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlOiByZXR1cm4gbUl0ZW1LaW5kLkludGVyZmFjZTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuTW9kdWxlOiByZXR1cm4gbUl0ZW1LaW5kLk1vZHVsZTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHk6IHJldHVybiBtSXRlbUtpbmQuUHJvcGVydHk7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlVuaXQ6IHJldHVybiBtSXRlbUtpbmQuVW5pdDtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuVmFsdWU6IHJldHVybiBtSXRlbUtpbmQuVmFsdWU7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkVudW06IHJldHVybiBtSXRlbUtpbmQuRW51bTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZDogcmV0dXJuIG1JdGVtS2luZC5LZXl3b3JkO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0OiByZXR1cm4gbUl0ZW1LaW5kLlNuaXBwZXQ7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkNvbG9yOiByZXR1cm4gbUl0ZW1LaW5kLkNvbG9yO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5GaWxlOiByZXR1cm4gbUl0ZW1LaW5kLkZpbGU7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlJlZmVyZW5jZTogcmV0dXJuIG1JdGVtS2luZC5SZWZlcmVuY2U7XG4gICAgfVxuICAgIHJldHVybiBtSXRlbUtpbmQuUHJvcGVydHk7XG59XG5mdW5jdGlvbiBmcm9tQ29tcGxldGlvbkl0ZW1LaW5kKGtpbmQpIHtcbiAgICB2YXIgbUl0ZW1LaW5kID0gbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQ7XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLlRleHQ6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuVGV4dDtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuTWV0aG9kOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLk1ldGhvZDtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuRnVuY3Rpb246IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb247XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkNvbnN0cnVjdG9yOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0cnVjdG9yO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5GaWVsZDogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5GaWVsZDtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuVmFyaWFibGU6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGU7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkNsYXNzOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkNsYXNzO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5JbnRlcmZhY2U6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5Nb2R1bGU6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuTW9kdWxlO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5Qcm9wZXJ0eTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuVW5pdDogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Vbml0O1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5WYWx1ZTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5WYWx1ZTtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuRW51bTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5FbnVtO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5LZXl3b3JkOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQ7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLlNuaXBwZXQ6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuU25pcHBldDtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuQ29sb3I6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuQ29sb3I7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkZpbGU6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuRmlsZTtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuUmVmZXJlbmNlOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlJlZmVyZW5jZTtcbiAgICB9XG4gICAgcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTtcbn1cbmZ1bmN0aW9uIHRvVGV4dEVkaXQodGV4dEVkaXQpIHtcbiAgICBpZiAoIXRleHRFZGl0KSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlOiB0b1JhbmdlKHRleHRFZGl0LnJhbmdlKSxcbiAgICAgICAgdGV4dDogdGV4dEVkaXQubmV3VGV4dFxuICAgIH07XG59XG5mdW5jdGlvbiB0b0NvbXBsZXRpb25JdGVtKGVudHJ5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IGVudHJ5LmxhYmVsLFxuICAgICAgICBpbnNlcnRUZXh0OiBlbnRyeS5pbnNlcnRUZXh0LFxuICAgICAgICBzb3J0VGV4dDogZW50cnkuc29ydFRleHQsXG4gICAgICAgIGZpbHRlclRleHQ6IGVudHJ5LmZpbHRlclRleHQsXG4gICAgICAgIGRvY3VtZW50YXRpb246IGVudHJ5LmRvY3VtZW50YXRpb24sXG4gICAgICAgIGRldGFpbDogZW50cnkuZGV0YWlsLFxuICAgICAgICBraW5kOiB0b0NvbXBsZXRpb25JdGVtS2luZChlbnRyeS5raW5kKSxcbiAgICAgICAgdGV4dEVkaXQ6IHRvVGV4dEVkaXQoZW50cnkudGV4dEVkaXQpLFxuICAgICAgICBkYXRhOiBlbnRyeS5kYXRhXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGZyb21NYXJrZG93blN0cmluZyhlbnRyeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6ICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gbHMuTWFya3VwS2luZC5QbGFpblRleHQgOiBscy5NYXJrdXBLaW5kLk1hcmtkb3duKSxcbiAgICAgICAgdmFsdWU6ICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gZW50cnkgOiBlbnRyeS52YWx1ZSlcbiAgICB9O1xufVxuZnVuY3Rpb24gZnJvbUNvbXBsZXRpb25JdGVtKGVudHJ5KSB7XG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIGxhYmVsOiBlbnRyeS5sYWJlbCxcbiAgICAgICAgc29ydFRleHQ6IGVudHJ5LnNvcnRUZXh0LFxuICAgICAgICBmaWx0ZXJUZXh0OiBlbnRyeS5maWx0ZXJUZXh0LFxuICAgICAgICBkb2N1bWVudGF0aW9uOiBmcm9tTWFya2Rvd25TdHJpbmcoZW50cnkuZG9jdW1lbnRhdGlvbiksXG4gICAgICAgIGRldGFpbDogZW50cnkuZGV0YWlsLFxuICAgICAgICBraW5kOiBmcm9tQ29tcGxldGlvbkl0ZW1LaW5kKGVudHJ5LmtpbmQpLFxuICAgICAgICBkYXRhOiBlbnRyeS5kYXRhXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGVudHJ5Lmluc2VydFRleHQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBlbnRyeS5pbnNlcnRUZXh0LnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpdGVtLmluc2VydFRleHQgPSBlbnRyeS5pbnNlcnRUZXh0LnZhbHVlO1xuICAgICAgICBpdGVtLmluc2VydFRleHRGb3JtYXQgPSBscy5JbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpdGVtLmluc2VydFRleHQgPSBlbnRyeS5pbnNlcnRUZXh0O1xuICAgIH1cbiAgICBpZiAoZW50cnkucmFuZ2UpIHtcbiAgICAgICAgaXRlbS50ZXh0RWRpdCA9IGxzLlRleHRFZGl0LnJlcGxhY2UoZnJvbVJhbmdlKGVudHJ5LnJhbmdlKSwgaXRlbS5pbnNlcnRUZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG59XG52YXIgQ29tcGxldGlvbkFkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcGxldGlvbkFkYXB0ZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcGxldGlvbkFkYXB0ZXIucHJvdG90eXBlLCBcInRyaWdnZXJDaGFyYWN0ZXJzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gWycgJywgJzonXTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ29tcGxldGlvbkFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVDb21wbGV0aW9uSXRlbXMgPSBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgICAgICB2YXIgd29yZEluZm8gPSBtb2RlbC5nZXRXb3JkVW50aWxQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZG9Db21wbGV0ZShyZXNvdXJjZS50b1N0cmluZygpLCBmcm9tUG9zaXRpb24ocG9zaXRpb24pKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gaW5mby5pdGVtcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBlbnRyeS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0VGV4dDogZW50cnkuaW5zZXJ0VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgc29ydFRleHQ6IGVudHJ5LnNvcnRUZXh0LFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0OiBlbnRyeS5maWx0ZXJUZXh0LFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uOiBlbnRyeS5kb2N1bWVudGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGVudHJ5LmRldGFpbCxcbiAgICAgICAgICAgICAgICAgICAga2luZDogdG9Db21wbGV0aW9uSXRlbUtpbmQoZW50cnkua2luZCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkudGV4dEVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yYW5nZSA9IHRvUmFuZ2UoZW50cnkudGV4dEVkaXQucmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmluc2VydFRleHQgPSBlbnRyeS50ZXh0RWRpdC5uZXdUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaW5zZXJ0VGV4dEZvcm1hdCA9PT0gbHMuSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zZXJ0VGV4dCA9IHsgdmFsdWU6IGl0ZW0uaW5zZXJ0VGV4dCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpc0luY29tcGxldGU6IGluZm8uaXNJbmNvbXBsZXRlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXBsZXRpb25BZGFwdGVyO1xufSgpKTtcbmV4cG9ydCB7IENvbXBsZXRpb25BZGFwdGVyIH07XG5mdW5jdGlvbiBpc01hcmt1cENvbnRlbnQodGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGhpbmcua2luZCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiB0b01hcmtkb3duU3RyaW5nKGVudHJ5KSB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoaXNNYXJrdXBDb250ZW50KGVudHJ5KSkge1xuICAgICAgICBpZiAoZW50cnkua2luZCA9PT0gJ3BsYWludGV4dCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeS52YWx1ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogJ2BgYCcgKyBlbnRyeS5sYW5ndWFnZSArICdcXG4nICsgZW50cnkudmFsdWUgKyAnXFxuYGBgXFxuJyB9O1xufVxuZnVuY3Rpb24gdG9NYXJrZWRTdHJpbmdBcnJheShjb250ZW50cykge1xuICAgIGlmICghY29udGVudHMpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudHMpKSB7XG4gICAgICAgIHJldHVybiBjb250ZW50cy5tYXAodG9NYXJrZG93blN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBbdG9NYXJrZG93blN0cmluZyhjb250ZW50cyldO1xufVxuLy8gLS0tIGhvdmVyIC0tLS0tLVxudmFyIEhvdmVyQWRhcHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIb3ZlckFkYXB0ZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBIb3ZlckFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVIb3ZlciA9IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24sIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZG9Ib3ZlcihyZXNvdXJjZS50b1N0cmluZygpLCBmcm9tUG9zaXRpb24ocG9zaXRpb24pKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogdG9SYW5nZShpbmZvLnJhbmdlKSxcbiAgICAgICAgICAgICAgICBjb250ZW50czogdG9NYXJrZWRTdHJpbmdBcnJheShpbmZvLmNvbnRlbnRzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEhvdmVyQWRhcHRlcjtcbn0oKSk7XG5leHBvcnQgeyBIb3ZlckFkYXB0ZXIgfTtcbi8vIC0tLSBkZWZpbml0aW9uIC0tLS0tLVxuZnVuY3Rpb24gdG9Mb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVyaTogVXJpLnBhcnNlKGxvY2F0aW9uLnVyaSksXG4gICAgICAgIHJhbmdlOiB0b1JhbmdlKGxvY2F0aW9uLnJhbmdlKVxuICAgIH07XG59XG4vLyAtLS0gZG9jdW1lbnQgc3ltYm9scyAtLS0tLS1cbmZ1bmN0aW9uIHRvU3ltYm9sS2luZChraW5kKSB7XG4gICAgdmFyIG1LaW5kID0gbW9uYWNvLmxhbmd1YWdlcy5TeW1ib2xLaW5kO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuRmlsZTogcmV0dXJuIG1LaW5kLkFycmF5O1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTW9kdWxlOiByZXR1cm4gbUtpbmQuTW9kdWxlO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTmFtZXNwYWNlOiByZXR1cm4gbUtpbmQuTmFtZXNwYWNlO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuUGFja2FnZTogcmV0dXJuIG1LaW5kLlBhY2thZ2U7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5DbGFzczogcmV0dXJuIG1LaW5kLkNsYXNzO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTWV0aG9kOiByZXR1cm4gbUtpbmQuTWV0aG9kO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuUHJvcGVydHk6IHJldHVybiBtS2luZC5Qcm9wZXJ0eTtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkZpZWxkOiByZXR1cm4gbUtpbmQuRmllbGQ7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5Db25zdHJ1Y3RvcjogcmV0dXJuIG1LaW5kLkNvbnN0cnVjdG9yO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuRW51bTogcmV0dXJuIG1LaW5kLkVudW07XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5JbnRlcmZhY2U6IHJldHVybiBtS2luZC5JbnRlcmZhY2U7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5GdW5jdGlvbjogcmV0dXJuIG1LaW5kLkZ1bmN0aW9uO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuVmFyaWFibGU6IHJldHVybiBtS2luZC5WYXJpYWJsZTtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkNvbnN0YW50OiByZXR1cm4gbUtpbmQuQ29uc3RhbnQ7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5TdHJpbmc6IHJldHVybiBtS2luZC5TdHJpbmc7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5OdW1iZXI6IHJldHVybiBtS2luZC5OdW1iZXI7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5Cb29sZWFuOiByZXR1cm4gbUtpbmQuQm9vbGVhbjtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkFycmF5OiByZXR1cm4gbUtpbmQuQXJyYXk7XG4gICAgfVxuICAgIHJldHVybiBtS2luZC5GdW5jdGlvbjtcbn1cbnZhciBEb2N1bWVudFN5bWJvbEFkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRTeW1ib2xBZGFwdGVyKF93b3JrZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgICB9XG4gICAgRG9jdW1lbnRTeW1ib2xBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRTeW1ib2xzID0gZnVuY3Rpb24gKG1vZGVsLCB0b2tlbikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgICAgIHJldHVybiB3aXJlQ2FuY2VsbGF0aW9uVG9rZW4odG9rZW4sIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7IHJldHVybiB3b3JrZXIuZmluZERvY3VtZW50U3ltYm9scyhyZXNvdXJjZS50b1N0cmluZygpKTsgfSkudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICBjb250YWluZXJOYW1lOiBpdGVtLmNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICAgICAga2luZDogdG9TeW1ib2xLaW5kKGl0ZW0ua2luZCksXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHRvTG9jYXRpb24oaXRlbS5sb2NhdGlvbilcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIERvY3VtZW50U3ltYm9sQWRhcHRlcjtcbn0oKSk7XG5leHBvcnQgeyBEb2N1bWVudFN5bWJvbEFkYXB0ZXIgfTtcbmZ1bmN0aW9uIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGFiU2l6ZTogb3B0aW9ucy50YWJTaXplLFxuICAgICAgICBpbnNlcnRTcGFjZXM6IG9wdGlvbnMuaW5zZXJ0U3BhY2VzXG4gICAgfTtcbn1cbnZhciBEb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKF93b3JrZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgICB9XG4gICAgRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRGb3JtYXR0aW5nRWRpdHMgPSBmdW5jdGlvbiAobW9kZWwsIG9wdGlvbnMsIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZm9ybWF0KHJlc291cmNlLnRvU3RyaW5nKCksIG51bGwsIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSkudGhlbihmdW5jdGlvbiAoZWRpdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cy5tYXAodG9UZXh0RWRpdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcjtcbn0oKSk7XG5leHBvcnQgeyBEb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIgfTtcbnZhciBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcihfd29ya2VyKSB7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gICAgfVxuICAgIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0cyA9IGZ1bmN0aW9uIChtb2RlbCwgcmFuZ2UsIG9wdGlvbnMsIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZm9ybWF0KHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21SYW5nZShyYW5nZSksIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSkudGhlbihmdW5jdGlvbiAoZWRpdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cy5tYXAodG9UZXh0RWRpdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyO1xufSgpKTtcbmV4cG9ydCB7IERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyIH07XG52YXIgRG9jdW1lbnRDb2xvckFkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRDb2xvckFkYXB0ZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBEb2N1bWVudENvbG9yQWRhcHRlci5wcm90b3R5cGUucHJvdmlkZURvY3VtZW50Q29sb3JzID0gZnVuY3Rpb24gKG1vZGVsLCB0b2tlbikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgICAgIHJldHVybiB3aXJlQ2FuY2VsbGF0aW9uVG9rZW4odG9rZW4sIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7IHJldHVybiB3b3JrZXIuZmluZERvY3VtZW50Q29sb3JzKHJlc291cmNlLnRvU3RyaW5nKCkpOyB9KS50aGVuKGZ1bmN0aW9uIChpbmZvcykge1xuICAgICAgICAgICAgaWYgKCFpbmZvcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmZvcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgY29sb3I6IGl0ZW0uY29sb3IsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaXRlbS5yYW5nZSlcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgRG9jdW1lbnRDb2xvckFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVDb2xvclByZXNlbnRhdGlvbnMgPSBmdW5jdGlvbiAobW9kZWwsIGluZm8sIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHsgcmV0dXJuIHdvcmtlci5nZXRDb2xvclByZXNlbnRhdGlvbnMocmVzb3VyY2UudG9TdHJpbmcoKSwgaW5mby5jb2xvciwgZnJvbVJhbmdlKGluZm8ucmFuZ2UpKTsgfSkudGhlbihmdW5jdGlvbiAocHJlc2VudGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFwcmVzZW50YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXNlbnRhdGlvbnMubWFwKGZ1bmN0aW9uIChwcmVzZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXNlbnRhdGlvbi5sYWJlbCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChwcmVzZW50YXRpb24udGV4dEVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50ZXh0RWRpdCA9IHRvVGV4dEVkaXQocHJlc2VudGF0aW9uLnRleHRFZGl0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXNlbnRhdGlvbi5hZGRpdGlvbmFsVGV4dEVkaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkaXRpb25hbFRleHRFZGl0cyA9IHByZXNlbnRhdGlvbi5hZGRpdGlvbmFsVGV4dEVkaXRzLm1hcCh0b1RleHRFZGl0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIERvY3VtZW50Q29sb3JBZGFwdGVyO1xufSgpKTtcbmV4cG9ydCB7IERvY3VtZW50Q29sb3JBZGFwdGVyIH07XG4vKipcbiAqIEhvb2sgYSBjYW5jZWxsYXRpb24gdG9rZW4gdG8gYSBXaW5KUyBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIHdpcmVDYW5jZWxsYXRpb25Ub2tlbih0b2tlbiwgcHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlLmNhbmNlbCkge1xuICAgICAgICB0b2tlbi5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZChmdW5jdGlvbiAoKSB7IHJldHVybiBwcm9taXNlLmNhbmNlbCgpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL2xhbmd1YWdlRmVhdHVyZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vbGFuZ3VhZ2VGZWF0dXJlcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCAqIGFzIGpzb24gZnJvbSAnLi9fZGVwcy9qc29uYy1wYXJzZXIvbWFpbi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydChzdXBwb3J0Q29tbWVudHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBKU09OU3RhdGUobnVsbCwgbnVsbCwgZmFsc2UpOyB9LFxuICAgICAgICB0b2tlbml6ZTogZnVuY3Rpb24gKGxpbmUsIHN0YXRlLCBvZmZzZXREZWx0YSwgc3RvcEF0T2Zmc2V0KSB7IHJldHVybiB0b2tlbml6ZShzdXBwb3J0Q29tbWVudHMsIGxpbmUsIHN0YXRlLCBvZmZzZXREZWx0YSwgc3RvcEF0T2Zmc2V0KTsgfVxuICAgIH07XG59XG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX09CSkVDVCA9ICdkZWxpbWl0ZXIuYnJhY2tldC5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fREVMSU1fQVJSQVkgPSAnZGVsaW1pdGVyLmFycmF5Lmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9ERUxJTV9DT0xPTiA9ICdkZWxpbWl0ZXIuY29sb24uanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX0NPTU1BID0gJ2RlbGltaXRlci5jb21tYS5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fVkFMVUVfQk9PTEVBTiA9ICdrZXl3b3JkLmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9WQUxVRV9OVUxMID0gJ2tleXdvcmQuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1ZBTFVFX1NUUklORyA9ICdzdHJpbmcudmFsdWUuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1ZBTFVFX05VTUJFUiA9ICdudW1iZXIuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1BST1BFUlRZX05BTUUgPSAnc3RyaW5nLmtleS5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fQ09NTUVOVF9CTE9DSyA9ICdjb21tZW50LmJsb2NrLmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9DT01NRU5UX0xJTkUgPSAnY29tbWVudC5saW5lLmpzb24nO1xudmFyIEpTT05TdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBKU09OU3RhdGUoc3RhdGUsIHNjYW5FcnJvciwgbGFzdFdhc0NvbG9uKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2NhbkVycm9yID0gc2NhbkVycm9yO1xuICAgICAgICB0aGlzLmxhc3RXYXNDb2xvbiA9IGxhc3RXYXNDb2xvbjtcbiAgICB9XG4gICAgSlNPTlN0YXRlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKU09OU3RhdGUodGhpcy5fc3RhdGUsIHRoaXMuc2NhbkVycm9yLCB0aGlzLmxhc3RXYXNDb2xvbik7XG4gICAgfTtcbiAgICBKU09OU3RhdGUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBpZiAob3RoZXIgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3RoZXIgfHwgIShvdGhlciBpbnN0YW5jZW9mIEpTT05TdGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuRXJyb3IgPT09IG90aGVyLnNjYW5FcnJvciAmJlxuICAgICAgICAgICAgdGhpcy5sYXN0V2FzQ29sb24gPT09IG90aGVyLmxhc3RXYXNDb2xvbjtcbiAgICB9O1xuICAgIEpTT05TdGF0ZS5wcm90b3R5cGUuZ2V0U3RhdGVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfTtcbiAgICBKU09OU3RhdGUucHJvdG90eXBlLnNldFN0YXRlRGF0YSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgIH07XG4gICAgcmV0dXJuIEpTT05TdGF0ZTtcbn0oKSk7XG5mdW5jdGlvbiB0b2tlbml6ZShjb21tZW50cywgbGluZSwgc3RhdGUsIG9mZnNldERlbHRhLCBzdG9wQXRPZmZzZXQpIHtcbiAgICBpZiAob2Zmc2V0RGVsdGEgPT09IHZvaWQgMCkgeyBvZmZzZXREZWx0YSA9IDA7IH1cbiAgICAvLyBoYW5kbGUgbXVsdGlsaW5lIHN0cmluZ3MgYW5kIGJsb2NrIGNvbW1lbnRzXG4gICAgdmFyIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMCwgYWRqdXN0T2Zmc2V0ID0gZmFsc2U7XG4gICAgc3dpdGNoIChzdGF0ZS5zY2FuRXJyb3IpIHtcbiAgICAgICAgY2FzZSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLzpcbiAgICAgICAgICAgIGxpbmUgPSAnXCInICsgbGluZTtcbiAgICAgICAgICAgIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLzpcbiAgICAgICAgICAgIGxpbmUgPSAnLyonICsgbGluZTtcbiAgICAgICAgICAgIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgc2Nhbm5lciA9IGpzb24uY3JlYXRlU2Nhbm5lcihsaW5lKSwga2luZCwgcmV0LCBsYXN0V2FzQ29sb24gPSBzdGF0ZS5sYXN0V2FzQ29sb247XG4gICAgcmV0ID0ge1xuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICBlbmRTdGF0ZTogc3RhdGUuY2xvbmUoKVxuICAgIH07XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpLCB0eXBlID0gJyc7XG4gICAgICAgIGtpbmQgPSBzY2FubmVyLnNjYW4oKTtcbiAgICAgICAgaWYgKGtpbmQgPT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgc2Nhbm5lciBoYXMgYWR2YW5jZWRcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gb2Zmc2V0RGVsdGEgKyBzY2FubmVyLmdldFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkaWQgbm90IGFkdmFuY2UsIG5leHQgMyBjaGFyYWN0ZXJzIGFyZTogJyArIGxpbmUuc3Vic3RyKHNjYW5uZXIuZ2V0UG9zaXRpb24oKSwgMykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIGNhc2Ugd2UgaW5zZXJ0ZWQgLyogb3IgXCIgY2hhcmFjdGVyLCB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIGFkanVzdCB0aGUgb2Zmc2V0IG9mIGFsbCB0b2tlbnMgKGV4Y2VwdCB0aGUgZmlyc3QpXG4gICAgICAgIGlmIChhZGp1c3RPZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCAtPSBudW1iZXJPZkluc2VydGVkQ2hhcmFjdGVycztcbiAgICAgICAgfVxuICAgICAgICBhZGp1c3RPZmZzZXQgPSBudW1iZXJPZkluc2VydGVkQ2hhcmFjdGVycyA+IDA7XG4gICAgICAgIC8vIGJyYWNrZXRzIGFuZCB0eXBlXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgY2FzZSAxIC8qIE9wZW5CcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIgLyogQ2xvc2VCcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDMgLyogT3BlbkJyYWNrZXRUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQVJSQVk7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi86XG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0FSUkFZO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2IC8qIENvbG9uVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0NPTE9OO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogQ29tbWFUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQ09NTUE7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDggLyogVHJ1ZUtleXdvcmQgKi86XG4gICAgICAgICAgICBjYXNlIDkgLyogRmFsc2VLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9CT09MRUFOO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3IC8qIE51bGxLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9OVUxMO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMCAvKiBTdHJpbmdMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBsYXN0V2FzQ29sb24gPyBUT0tFTl9WQUxVRV9TVFJJTkcgOiBUT0tFTl9QUk9QRVJUWV9OQU1FO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fVkFMVUVfTlVNQkVSO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbW1lbnRzLCBpZmYgZW5hYmxlZFxuICAgICAgICBpZiAoY29tbWVudHMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9DT01NRU5UX0xJTkU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fQ09NTUVOVF9CTE9DSztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0LmVuZFN0YXRlID0gbmV3IEpTT05TdGF0ZShzdGF0ZS5nZXRTdGF0ZURhdGEoKSwgc2Nhbm5lci5nZXRUb2tlbkVycm9yKCksIGxhc3RXYXNDb2xvbik7XG4gICAgICAgIHJldC50b2tlbnMucHVzaCh7XG4gICAgICAgICAgICBzdGFydEluZGV4OiBvZmZzZXQsXG4gICAgICAgICAgICBzY29wZXM6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL3Rva2VuaXphdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi90b2tlbml6YXRpb24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG52YXIgUHJvbWlzZSA9IG1vbmFjby5Qcm9taXNlO1xudmFyIFNUT1BfV0hFTl9JRExFX0ZPUiA9IDIgKiA2MCAqIDEwMDA7IC8vIDJtaW5cbnZhciBXb3JrZXJNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdvcmtlck1hbmFnZXIoZGVmYXVsdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICAgICAgdGhpcy5fd29ya2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5faWRsZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fY2hlY2tJZklkbGUoKTsgfSwgMzAgKiAxMDAwKTtcbiAgICAgICAgdGhpcy5fbGFzdFVzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY29uZmlnQ2hhbmdlTGlzdGVuZXIgPSB0aGlzLl9kZWZhdWx0cy5vbkRpZENoYW5nZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fc3RvcFdvcmtlcigpOyB9KTtcbiAgICB9XG4gICAgV29ya2VyTWFuYWdlci5wcm90b3R5cGUuX3N0b3BXb3JrZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl93b3JrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl93b3JrZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gICAgfTtcbiAgICBXb3JrZXJNYW5hZ2VyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2lkbGVDaGVja0ludGVydmFsKTtcbiAgICAgICAgdGhpcy5fY29uZmlnQ2hhbmdlTGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9zdG9wV29ya2VyKCk7XG4gICAgfTtcbiAgICBXb3JrZXJNYW5hZ2VyLnByb3RvdHlwZS5fY2hlY2tJZklkbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fd29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRpbWVQYXNzZWRTaW5jZUxhc3RVc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuX2xhc3RVc2VkVGltZTtcbiAgICAgICAgaWYgKHRpbWVQYXNzZWRTaW5jZUxhc3RVc2VkID4gU1RPUF9XSEVOX0lETEVfRk9SKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wV29ya2VyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdvcmtlck1hbmFnZXIucHJvdG90eXBlLl9nZXRDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xhc3RVc2VkVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICghdGhpcy5fY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLl93b3JrZXIgPSBtb25hY28uZWRpdG9yLmNyZWF0ZVdlYldvcmtlcih7XG4gICAgICAgICAgICAgICAgLy8gbW9kdWxlIHRoYXQgZXhwb3J0cyB0aGUgY3JlYXRlKCkgbWV0aG9kIGFuZCByZXR1cm5zIGEgYEpTT05Xb3JrZXJgIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICd2cy9sYW5ndWFnZS9qc29uL2pzb25Xb3JrZXInLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLl9kZWZhdWx0cy5sYW5ndWFnZUlkLFxuICAgICAgICAgICAgICAgIC8vIHBhc3NlZCBpbiB0byB0aGUgY3JlYXRlKCkgbWV0aG9kXG4gICAgICAgICAgICAgICAgY3JlYXRlRGF0YToge1xuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZVNldHRpbmdzOiB0aGlzLl9kZWZhdWx0cy5kaWFnbm9zdGljc09wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlSWQ6IHRoaXMuX2RlZmF1bHRzLmxhbmd1YWdlSWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudCA9IHRoaXMuX3dvcmtlci5nZXRQcm94eSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnQ7XG4gICAgfTtcbiAgICBXb3JrZXJNYW5hZ2VyLnByb3RvdHlwZS5nZXRMYW5ndWFnZVNlcnZpY2VXb3JrZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHJlc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfY2xpZW50O1xuICAgICAgICByZXR1cm4gdG9TaGFsbG93Q2FuY2VsUHJvbWlzZSh0aGlzLl9nZXRDbGllbnQoKS50aGVuKGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICAgICAgICAgIF9jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fd29ya2VyLndpdGhTeW5jZWRSZXNvdXJjZXMocmVzb3VyY2VzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoXykgeyByZXR1cm4gX2NsaWVudDsgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIFdvcmtlck1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgV29ya2VyTWFuYWdlciB9O1xuZnVuY3Rpb24gdG9TaGFsbG93Q2FuY2VsUHJvbWlzZShwKSB7XG4gICAgdmFyIGNvbXBsZXRlQ2FsbGJhY2s7XG4gICAgdmFyIGVycm9yQ2FsbGJhY2s7XG4gICAgdmFyIHIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYywgZSkge1xuICAgICAgICBjb21wbGV0ZUNhbGxiYWNrID0gYztcbiAgICAgICAgZXJyb3JDYWxsYmFjayA9IGU7XG4gICAgfSwgZnVuY3Rpb24gKCkgeyB9KTtcbiAgICBwLnRoZW4oY29tcGxldGVDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgcmV0dXJuIHI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL3dvcmtlck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vd29ya2VyTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9