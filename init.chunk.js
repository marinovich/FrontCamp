(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["init"],{

/***/ "./src/NewsData.ts":
/*!*************************!*\
  !*** ./src/NewsData.ts ***!
  \*************************/
/*! exports provided: NewsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NewsData\", function() { return NewsData; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nvar NewsData = /** @class */ (function () {\r\n    function NewsData(toggleElement, getItemElement, getTopArticlesListAsync) {\r\n        var _this = this;\r\n        this.setSources = function (sources) {\r\n            sources.forEach(function (sourceItem) { return _this.sourcesMap.set(sourceItem.id, sourceItem); });\r\n        };\r\n        this.getSources = function () { return lodash__WEBPACK_IMPORTED_MODULE_1__[\"cloneDeep\"](_this.sourcesMap); };\r\n        this.getTopRatedNewsById = function (id) { return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n            var topArticles;\r\n            return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        if (this.topArticles.has(id)) {\r\n                            return [2 /*return*/, this.topArticles.get(id)];\r\n                        }\r\n                        return [4 /*yield*/, this.getTopArticlesListAsync(id)];\r\n                    case 1:\r\n                        topArticles = _a.sent();\r\n                        return [2 /*return*/, this.setTopArticles(topArticles).get(id)];\r\n                }\r\n            });\r\n        }); };\r\n        this.setTopArticles = function (news) { return _this.topArticles.set(news[0].source.id, news); };\r\n        this.sourcesMap = new Map();\r\n        this.topArticles = new Map();\r\n        this.currentSelectedSource = null;\r\n        // toggle element selection\r\n        this.toggleItemSelection = toggleElement;\r\n        // checks whether selected source item is 'li' element, otherwise finds it\r\n        this.getItemElement = getItemElement;\r\n        // TODO: add comment\r\n        this.getTopArticlesListAsync = getTopArticlesListAsync;\r\n    }\r\n    NewsData.prototype.toggleSourceItem = function (eventTarget) {\r\n        var targetElement = this.getItemElement(eventTarget);\r\n        targetElement && this.toggleItemSelection(targetElement);\r\n        this.currentSelectedSource && this.toggleItemSelection(this.currentSelectedSource);\r\n        this.currentSelectedSource = targetElement;\r\n    };\r\n    return NewsData;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/NewsData.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: API_KEY, API_VERSION, BASE_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API_KEY\", function() { return API_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API_VERSION\", function() { return API_VERSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BASE_URL\", function() { return BASE_URL; });\nvar API_KEY = '7719cc235c3c4a4381f84089ece47f5f';\r\nvar API_VERSION = 'v2';\r\nvar BASE_URL = 'https://newsapi.org';\r\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/images/default-news.png":
/*!*************************************!*\
  !*** ./src/images/default-news.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/b83b2dbc45db82faa926774a67848ab5-default-news.png\";\n\n//# sourceURL=webpack:///./src/images/default-news.png?");

/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var NewsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! NewsData */ \"./src/NewsData.ts\");\n/* harmony import */ var services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services */ \"./src/services/index.ts\");\n/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ \"./src/utils/index.ts\");\nvar _this = undefined;\r\n\r\n\r\n\r\n\r\nvar init = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n    var sourceList, sourceItem, topRatedSection, topRatedList, topRatedItem, showTopRatedArticlesBlock, toggleItem, newsData, sources;\r\n    var _this = this;\r\n    return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                sourceList = document.getElementById('sources-list');\r\n                sourceItem = document.getElementById('sources-item');\r\n                topRatedSection = document.getElementById('top-rated');\r\n                topRatedList = document.getElementById('top-rated-list');\r\n                topRatedItem = document.getElementById('top-rated-item');\r\n                showTopRatedArticlesBlock = function () { return topRatedSection.classList.remove('hidden'); };\r\n                toggleItem = function (element) { return element.classList.toggle('selected'); };\r\n                newsData = new NewsData__WEBPACK_IMPORTED_MODULE_1__[\"NewsData\"](toggleItem, utils__WEBPACK_IMPORTED_MODULE_3__[\"getItemElement\"], services__WEBPACK_IMPORTED_MODULE_2__[\"getArticlesAsync\"]);\r\n                return [4 /*yield*/, Object(services__WEBPACK_IMPORTED_MODULE_2__[\"getSourcesAsync\"])()];\r\n            case 1:\r\n                sources = _a.sent();\r\n                newsData.setSources(sources);\r\n                Object(services__WEBPACK_IMPORTED_MODULE_2__[\"renderList\"])(sourceList, sourceItem, newsData.getSources());\r\n                sourceList.addEventListener('click', showTopRatedArticlesBlock, { once: true });\r\n                sourceList.addEventListener('click', function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n                    var item, articles;\r\n                    return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_a) {\r\n                        switch (_a.label) {\r\n                            case 0:\r\n                                item = event.target;\r\n                                newsData.toggleSourceItem(item);\r\n                                return [4 /*yield*/, newsData.getTopRatedNewsById(Object(utils__WEBPACK_IMPORTED_MODULE_3__[\"getElementId\"])(item.id))];\r\n                            case 1:\r\n                                articles = _a.sent();\r\n                                Object(services__WEBPACK_IMPORTED_MODULE_2__[\"renderList\"])(topRatedList, topRatedItem, articles);\r\n                                return [2 /*return*/];\r\n                        }\r\n                    });\r\n                }); });\r\n                // render JSON diff section for webpack task\r\n                Object(services__WEBPACK_IMPORTED_MODULE_2__[\"renderDiffSection\"])();\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\n\n\n//# sourceURL=webpack:///./src/init.ts?");

/***/ }),

/***/ "./src/request.ts":
/*!************************!*\
  !*** ./src/request.ts ***!
  \************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return request; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nvar _this = undefined;\r\n\r\n\r\n/**\r\n * Returns NewsAPI response\r\n * @param endpoint -\r\n * @param parameters -\r\n */\r\nvar request = function (endpoint, parameters) {\r\n    if (parameters === void 0) { parameters = ''; }\r\n    return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n        var response, _a, status, message, result;\r\n        return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0: return [4 /*yield*/, fetch(_constants__WEBPACK_IMPORTED_MODULE_1__[\"BASE_URL\"] + \"/\" + _constants__WEBPACK_IMPORTED_MODULE_1__[\"API_VERSION\"] + \"/\" + endpoint + \"?\" + (parameters && parameters + \"&\") + \"apiKey=\" + _constants__WEBPACK_IMPORTED_MODULE_1__[\"API_KEY\"])];\r\n                case 1:\r\n                    response = _b.sent();\r\n                    return [4 /*yield*/, response.json()];\r\n                case 2:\r\n                    _a = _b.sent(), status = _a.status, message = _a.message, result = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__rest\"](_a, [\"status\", \"message\"]);\r\n                    // replace with constant\r\n                    if (status === 'error') {\r\n                        // tslint:disable-next-line:no-console\r\n                        console.error(message);\r\n                        throw new Error(message);\r\n                    }\r\n                    return [2 /*return*/, result];\r\n            }\r\n        });\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/request.ts?");

/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! exports provided: getSourcesAsync, getArticlesAsync, renderDiffSection, renderList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _newsApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newsApi */ \"./src/services/newsApi.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getSourcesAsync\", function() { return _newsApi__WEBPACK_IMPORTED_MODULE_0__[\"getSourcesAsync\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getArticlesAsync\", function() { return _newsApi__WEBPACK_IMPORTED_MODULE_0__[\"getArticlesAsync\"]; });\n\n/* harmony import */ var _renderDiffSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderDiffSection */ \"./src/services/renderDiffSection.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"renderDiffSection\", function() { return _renderDiffSection__WEBPACK_IMPORTED_MODULE_1__[\"renderDiffSection\"]; });\n\n/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderList */ \"./src/services/renderList.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"renderList\", function() { return _renderList__WEBPACK_IMPORTED_MODULE_2__[\"renderList\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/services/index.ts?");

/***/ }),

/***/ "./src/services/newsApi.ts":
/*!*********************************!*\
  !*** ./src/services/newsApi.ts ***!
  \*********************************/
/*! exports provided: getSourcesAsync, getArticlesAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSourcesAsync\", function() { return getSourcesAsync; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getArticlesAsync\", function() { return getArticlesAsync; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! request */ \"./src/request.ts\");\nvar _this = undefined;\r\n\r\n\r\nvar getSourcesAsync = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n    var sources;\r\n    return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, Object(request__WEBPACK_IMPORTED_MODULE_1__[\"request\"])('sources')];\r\n            case 1:\r\n                sources = (_a.sent()).sources;\r\n                return [2 /*return*/, sources];\r\n        }\r\n    });\r\n}); };\r\n/**\r\n *\r\n * @param {string} sources\r\n */\r\nvar getArticlesAsync = function (sourceId) { return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](_this, void 0, void 0, function () {\r\n    var articles;\r\n    return tslib__WEBPACK_IMPORTED_MODULE_0__[\"__generator\"](this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, Object(request__WEBPACK_IMPORTED_MODULE_1__[\"request\"])('top-headlines', \"sources=\" + sourceId)];\r\n            case 1:\r\n                articles = (_a.sent()).articles;\r\n                return [2 /*return*/, articles];\r\n        }\r\n    });\r\n}); };\r\n\n\n//# sourceURL=webpack:///./src/services/newsApi.ts?");

/***/ }),

/***/ "./src/services/renderDiffSection.ts":
/*!*******************************************!*\
  !*** ./src/services/renderDiffSection.ts ***!
  \*******************************************/
/*! exports provided: renderDiffSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderDiffSection\", function() { return renderDiffSection; });\n/* harmony import */ var test_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! test.json */ \"./src/test.json\");\nvar test_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! test.json */ \"./src/test.json\", 1);\n\r\nvar renderDiffSection = function () {\r\n    var _a = test_json__WEBPACK_IMPORTED_MODULE_0__, sourceData = _a.old, filteredData = _a.new;\r\n    var diffSection = document.getElementById('json-section');\r\n    var sourceDataSection = document.getElementById('old-json');\r\n    var filteredDataSection = document.getElementById('new-json');\r\n    diffSection.classList.remove('hidden');\r\n    sourceDataSection.innerHTML = JSON.stringify(sourceData, undefined, 2);\r\n    filteredDataSection.innerHTML = JSON.stringify(filteredData, undefined, 2);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/renderDiffSection.ts?");

/***/ }),

/***/ "./src/services/renderList.ts":
/*!************************************!*\
  !*** ./src/services/renderList.ts ***!
  \************************************/
/*! exports provided: renderList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderList\", function() { return renderList; });\n/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ \"./src/utils/index.ts\");\n/* harmony import */ var images_default_news_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! images/default-news.png */ \"./src/images/default-news.png\");\n/* harmony import */ var images_default_news_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(images_default_news_png__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n/**\r\n * Renders item's list and replaces the gotten by id list with it\r\n * @param {HTMLElement} list\r\n * @param {HTMLElement} item\r\n * @param {Map<string, Object>} data\r\n */\r\nvar renderList = function (list, item, data) {\r\n    var documentFragmentList = document.createDocumentFragment();\r\n    data.forEach(function (element) {\r\n        var newItem = item.cloneNode(true);\r\n        var children = Object(utils__WEBPACK_IMPORTED_MODULE_0__[\"flattenChildNodes\"])(newItem);\r\n        // TODO: need to create a separate service(s)\r\n        children.forEach(function (item) {\r\n            switch (item.id) {\r\n                // for source items\r\n                case 'source-image':\r\n                    item.src = Object(utils__WEBPACK_IMPORTED_MODULE_0__[\"generateLogoUrl\"])(element.url);\r\n                    break;\r\n                case 'source-caption':\r\n                    item.textContent = element.name;\r\n                    break;\r\n                // for article items\r\n                case 'top-rated-image':\r\n                    item.src = element.urlToImage ? element.urlToImage : images_default_news_png__WEBPACK_IMPORTED_MODULE_1__;\r\n                    break;\r\n                case 'article-caption':\r\n                    item.textContent = element.title;\r\n                    break;\r\n                case 'article-description':\r\n                    item.textContent = element.description;\r\n                    break;\r\n                case 'article-link':\r\n                    item.href = element.url;\r\n                    break;\r\n                default: return;\r\n            }\r\n            // add id postfix only for items with id\r\n            item.id = item.id && item.id + \"_\" + (element.id || Object(utils__WEBPACK_IMPORTED_MODULE_0__[\"generateUniqueId\"])());\r\n        });\r\n        newItem.id = item.id + \"_\" + (element.id || Object(utils__WEBPACK_IMPORTED_MODULE_0__[\"generateUniqueId\"])());\r\n        documentFragmentList.appendChild(newItem);\r\n    });\r\n    // remove previous added items\r\n    while (item !== list.lastChild) {\r\n        list.removeChild(list.lastChild);\r\n    }\r\n    // append document fragment to list\r\n    list.appendChild(documentFragmentList);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/renderList.ts?");

/***/ }),

/***/ "./src/test.json":
/*!***********************!*\
  !*** ./src/test.json ***!
  \***********************/
/*! exports provided: old, new, default */
/***/ (function(module) {

eval("module.exports = {\"old\":{\"Comment\":\"My comment\",\"Count\":10,\"DiskParam\":{\"DB\":10,\"DBAngle\":1.234},\"Range\":true,\"Blades\":[{\"Caption\":\"A\",\"Value\":65},{\"Caption\":\"B\",\"Value\":66},{\"Caption\":\"C\",\"Value\":67}],\"Slots\":[0,1,2]},\"new\":{\"Comment\":\"My comment\",\"DiskParam\":{},\"Range\":true,\"Blades\":[{\"Caption\":\"A\"},{\"Caption\":\"B\"},{\"Caption\":\"C\"}],\"Slots\":[0,1,2]}};\n\n//# sourceURL=webpack:///./src/test.json?");

/***/ }),

/***/ "./src/utils/flattenChildNodes.ts":
/*!****************************************!*\
  !*** ./src/utils/flattenChildNodes.ts ***!
  \****************************************/
/*! exports provided: flattenChildNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flattenChildNodes\", function() { return flattenChildNodes; });\n/**\r\n *\r\n * @param {HTMLElement} element\r\n */\r\nvar flattenChildNodes = function (element) {\r\n    var children = Array.from(element.children);\r\n    var result = children.slice();\r\n    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {\r\n        var child = children_1[_i];\r\n        result = result.concat(flattenChildNodes(child));\r\n    }\r\n    return result;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/utils/flattenChildNodes.ts?");

/***/ }),

/***/ "./src/utils/generateLogoUrl.ts":
/*!**************************************!*\
  !*** ./src/utils/generateLogoUrl.ts ***!
  \**************************************/
/*! exports provided: generateLogoUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateLogoUrl\", function() { return generateLogoUrl; });\n/**\r\n * Returns URL for logo icon\r\n * @param {string} url\r\n * @param {number} size\r\n */\r\nvar generateLogoUrl = function (url, size) {\r\n    if (size === void 0) { size = 70; }\r\n    return \"https://icon-locator.herokuapp.com/icon?url=\" + url + \"&size=\" + size;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/utils/generateLogoUrl.ts?");

/***/ }),

/***/ "./src/utils/generateUniqueId.ts":
/*!***************************************!*\
  !*** ./src/utils/generateUniqueId.ts ***!
  \***************************************/
/*! exports provided: generateUniqueId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateUniqueId\", function() { return generateUniqueId; });\nvar generateUniqueId = function () { return Math.random().toString(36).substr(2, 16); };\r\n\n\n//# sourceURL=webpack:///./src/utils/generateUniqueId.ts?");

/***/ }),

/***/ "./src/utils/getElementId.ts":
/*!***********************************!*\
  !*** ./src/utils/getElementId.ts ***!
  \***********************************/
/*! exports provided: getElementId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getElementId\", function() { return getElementId; });\n/**\r\n * Returns id\r\n * @param id\r\n */\r\nvar getElementId = function (id) { return id.split('_')[1]; };\r\n\n\n//# sourceURL=webpack:///./src/utils/getElementId.ts?");

/***/ }),

/***/ "./src/utils/getSourceItemElement.ts":
/*!*******************************************!*\
  !*** ./src/utils/getSourceItemElement.ts ***!
  \*******************************************/
/*! exports provided: getItemElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getItemElement\", function() { return getItemElement; });\nvar getItemElement = function (element) {\r\n    if (element.tagName.match(/li/i)) {\r\n        return element;\r\n    }\r\n    if (element.tagName.match(/body/i)) {\r\n        return null;\r\n    }\r\n    return getItemElement(element.parentElement);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/utils/getSourceItemElement.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: flattenChildNodes, generateLogoUrl, generateUniqueId, getElementId, getItemElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _flattenChildNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flattenChildNodes */ \"./src/utils/flattenChildNodes.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"flattenChildNodes\", function() { return _flattenChildNodes__WEBPACK_IMPORTED_MODULE_0__[\"flattenChildNodes\"]; });\n\n/* harmony import */ var _generateLogoUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateLogoUrl */ \"./src/utils/generateLogoUrl.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"generateLogoUrl\", function() { return _generateLogoUrl__WEBPACK_IMPORTED_MODULE_1__[\"generateLogoUrl\"]; });\n\n/* harmony import */ var _generateUniqueId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateUniqueId */ \"./src/utils/generateUniqueId.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"generateUniqueId\", function() { return _generateUniqueId__WEBPACK_IMPORTED_MODULE_2__[\"generateUniqueId\"]; });\n\n/* harmony import */ var _getElementId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getElementId */ \"./src/utils/getElementId.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getElementId\", function() { return _getElementId__WEBPACK_IMPORTED_MODULE_3__[\"getElementId\"]; });\n\n/* harmony import */ var _getSourceItemElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getSourceItemElement */ \"./src/utils/getSourceItemElement.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getItemElement\", function() { return _getSourceItemElement__WEBPACK_IMPORTED_MODULE_4__[\"getItemElement\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/utils/index.ts?");

/***/ })

}]);