(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["init"],{

/***/ "./src/NewsData.ts":
/*!*************************!*\
  !*** ./src/NewsData.ts ***!
  \*************************/
/*! exports provided: NewsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsData", function() { return NewsData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


var NewsData = /** @class */ (function () {
    function NewsData(toggleElement, getItemElement, getTopArticlesListAsync) {
        var _this = this;
        this.setSources = function (sources) {
            sources.forEach(function (sourceItem) { return _this.sourcesMap.set(sourceItem.id, sourceItem); });
        };
        this.getSources = function () { return lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](_this.sourcesMap); };
        this.getTopRatedNewsById = function (id) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var topArticles;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.topArticles.has(id)) {
                            return [2 /*return*/, this.topArticles.get(id)];
                        }
                        return [4 /*yield*/, this.getTopArticlesListAsync(id)];
                    case 1:
                        topArticles = _a.sent();
                        return [2 /*return*/, this.setTopArticles(topArticles).get(id)];
                }
            });
        }); };
        this.setTopArticles = function (news) { return _this.topArticles.set(news[0].source.id, news); };
        this.sourcesMap = new Map();
        this.topArticles = new Map();
        this.currentSelectedSource = null;
        // toggle element selection
        this.toggleItemSelection = toggleElement;
        // checks whether selected source item is 'li' element, otherwise finds it
        this.getItemElement = getItemElement;
        // TODO: add comment
        this.getTopArticlesListAsync = getTopArticlesListAsync;
    }
    NewsData.prototype.toggleSourceItem = function (eventTarget) {
        var targetElement = this.getItemElement(eventTarget);
        targetElement && this.toggleItemSelection(targetElement);
        this.currentSelectedSource && this.toggleItemSelection(this.currentSelectedSource);
        this.currentSelectedSource = targetElement;
    };
    return NewsData;
}());



/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: API_KEY, API_VERSION, BASE_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_KEY", function() { return API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_VERSION", function() { return API_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_URL", function() { return BASE_URL; });
var API_KEY = '7719cc235c3c4a4381f84089ece47f5f';
var API_VERSION = 'v2';
var BASE_URL = 'https://newsapi.org';


/***/ }),

/***/ "./src/images/default-news.png":
/*!*************************************!*\
  !*** ./src/images/default-news.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/b83b2dbc45db82faa926774a67848ab5-default-news.png";

/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var NewsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! NewsData */ "./src/NewsData.ts");
/* harmony import */ var services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services */ "./src/services/index.ts");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/utils/index.ts");
var _this = undefined;




var init = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var sourceList, sourceItem, topRatedSection, topRatedList, topRatedItem, showTopRatedArticlesBlock, toggleItem, newsData, sources;
    var _this = this;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceList = document.getElementById('sources-list');
                sourceItem = document.getElementById('sources-item');
                topRatedSection = document.getElementById('top-rated');
                topRatedList = document.getElementById('top-rated-list');
                topRatedItem = document.getElementById('top-rated-item');
                showTopRatedArticlesBlock = function () { return topRatedSection.classList.remove('hidden'); };
                toggleItem = function (element) { return element.classList.toggle('selected'); };
                newsData = new NewsData__WEBPACK_IMPORTED_MODULE_1__["NewsData"](toggleItem, utils__WEBPACK_IMPORTED_MODULE_3__["getItemElement"], services__WEBPACK_IMPORTED_MODULE_2__["getArticlesAsync"]);
                return [4 /*yield*/, Object(services__WEBPACK_IMPORTED_MODULE_2__["getSourcesAsync"])()];
            case 1:
                sources = _a.sent();
                newsData.setSources(sources);
                Object(services__WEBPACK_IMPORTED_MODULE_2__["renderList"])(sourceList, sourceItem, newsData.getSources());
                sourceList.addEventListener('click', showTopRatedArticlesBlock, { once: true });
                sourceList.addEventListener('click', function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var item, articles;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                item = event.target;
                                newsData.toggleSourceItem(item);
                                return [4 /*yield*/, newsData.getTopRatedNewsById(Object(utils__WEBPACK_IMPORTED_MODULE_3__["getElementId"])(item.id))];
                            case 1:
                                articles = _a.sent();
                                Object(services__WEBPACK_IMPORTED_MODULE_2__["renderList"])(topRatedList, topRatedItem, articles);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // render JSON diff section for webpack task
                Object(services__WEBPACK_IMPORTED_MODULE_2__["renderDiffSection"])();
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/request.ts":
/*!************************!*\
  !*** ./src/request.ts ***!
  \************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var _this = undefined;


/**
 * Returns NewsAPI response
 * @param endpoint -
 * @param parameters -
 */
var request = function (endpoint, parameters) {
    if (parameters === void 0) { parameters = ''; }
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var response, _a, status, message, result;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch(_constants__WEBPACK_IMPORTED_MODULE_1__["BASE_URL"] + "/" + _constants__WEBPACK_IMPORTED_MODULE_1__["API_VERSION"] + "/" + endpoint + "?" + (parameters && parameters + "&") + "apiKey=" + _constants__WEBPACK_IMPORTED_MODULE_1__["API_KEY"])];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    _a = _b.sent(), status = _a.status, message = _a.message, result = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["status", "message"]);
                    // replace with constant
                    if (status === 'error') {
                        // tslint:disable-next-line:no-console
                        console.error(message);
                        throw new Error(message);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
};


/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! exports provided: getSourcesAsync, getArticlesAsync, renderDiffSection, renderList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _newsApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newsApi */ "./src/services/newsApi.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSourcesAsync", function() { return _newsApi__WEBPACK_IMPORTED_MODULE_0__["getSourcesAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getArticlesAsync", function() { return _newsApi__WEBPACK_IMPORTED_MODULE_0__["getArticlesAsync"]; });

/* harmony import */ var _renderDiffSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderDiffSection */ "./src/services/renderDiffSection.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderDiffSection", function() { return _renderDiffSection__WEBPACK_IMPORTED_MODULE_1__["renderDiffSection"]; });

/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderList */ "./src/services/renderList.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderList", function() { return _renderList__WEBPACK_IMPORTED_MODULE_2__["renderList"]; });






/***/ }),

/***/ "./src/services/newsApi.ts":
/*!*********************************!*\
  !*** ./src/services/newsApi.ts ***!
  \*********************************/
/*! exports provided: getSourcesAsync, getArticlesAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSourcesAsync", function() { return getSourcesAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArticlesAsync", function() { return getArticlesAsync; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! request */ "./src/request.ts");
var _this = undefined;


var getSourcesAsync = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var sources;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Object(request__WEBPACK_IMPORTED_MODULE_1__["request"])('sources')];
            case 1:
                sources = (_a.sent()).sources;
                return [2 /*return*/, sources];
        }
    });
}); };
/**
 *
 * @param {string} sources
 */
var getArticlesAsync = function (sourceId) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var articles;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Object(request__WEBPACK_IMPORTED_MODULE_1__["request"])('top-headlines', "sources=" + sourceId)];
            case 1:
                articles = (_a.sent()).articles;
                return [2 /*return*/, articles];
        }
    });
}); };


/***/ }),

/***/ "./src/services/renderDiffSection.ts":
/*!*******************************************!*\
  !*** ./src/services/renderDiffSection.ts ***!
  \*******************************************/
/*! exports provided: renderDiffSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDiffSection", function() { return renderDiffSection; });
/* harmony import */ var test_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! test.json */ "./src/test.json");
var test_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! test.json */ "./src/test.json", 1);

var renderDiffSection = function () {
    var _a = test_json__WEBPACK_IMPORTED_MODULE_0__, sourceData = _a.old, filteredData = _a.new;
    var diffSection = document.getElementById('json-section');
    var sourceDataSection = document.getElementById('old-json');
    var filteredDataSection = document.getElementById('new-json');
    diffSection.classList.remove('hidden');
    sourceDataSection.innerHTML = JSON.stringify(sourceData, undefined, 2);
    filteredDataSection.innerHTML = JSON.stringify(filteredData, undefined, 2);
};


/***/ }),

/***/ "./src/services/renderList.ts":
/*!************************************!*\
  !*** ./src/services/renderList.ts ***!
  \************************************/
/*! exports provided: renderList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderList", function() { return renderList; });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/utils/index.ts");
/* harmony import */ var images_default_news_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! images/default-news.png */ "./src/images/default-news.png");
/* harmony import */ var images_default_news_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(images_default_news_png__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Renders item's list and replaces the gotten by id list with it
 * @param {HTMLElement} list
 * @param {HTMLElement} item
 * @param {Map<string, Object>} data
 */
var renderList = function (list, item, data) {
    var documentFragmentList = document.createDocumentFragment();
    data.forEach(function (element) {
        var newItem = item.cloneNode(true);
        var children = Object(utils__WEBPACK_IMPORTED_MODULE_0__["flattenChildNodes"])(newItem);
        // TODO: need to create a separate service(s)
        children.forEach(function (item) {
            switch (item.id) {
                // for source items
                case 'source-image':
                    item.src = Object(utils__WEBPACK_IMPORTED_MODULE_0__["generateLogoUrl"])(element.url);
                    break;
                case 'source-caption':
                    item.textContent = element.name;
                    break;
                // for article items
                case 'top-rated-image':
                    item.src = element.urlToImage ? element.urlToImage : images_default_news_png__WEBPACK_IMPORTED_MODULE_1__;
                    break;
                case 'article-caption':
                    item.textContent = element.title;
                    break;
                case 'article-description':
                    item.textContent = element.description;
                    break;
                case 'article-link':
                    item.href = element.url;
                    break;
                default: return;
            }
            // add id postfix only for items with id
            item.id = item.id && item.id + "_" + (element.id || Object(utils__WEBPACK_IMPORTED_MODULE_0__["generateUniqueId"])());
        });
        newItem.id = item.id + "_" + (element.id || Object(utils__WEBPACK_IMPORTED_MODULE_0__["generateUniqueId"])());
        documentFragmentList.appendChild(newItem);
    });
    // remove previous added items
    while (item !== list.lastChild) {
        list.removeChild(list.lastChild);
    }
    // append document fragment to list
    list.appendChild(documentFragmentList);
};


/***/ }),

/***/ "./src/test.json":
/*!***********************!*\
  !*** ./src/test.json ***!
  \***********************/
/*! exports provided: old, new, default */
/***/ (function(module) {

module.exports = {"old":{"Comment":"My comment","Count":10,"DiskParam":{"DB":10,"DBAngle":1.234},"Range":true,"Blades":[{"Caption":"A","Value":65},{"Caption":"B","Value":66},{"Caption":"C","Value":67}],"Slots":[0,1,2]},"new":{"Comment":"My comment","DiskParam":{},"Range":true,"Blades":[{"Caption":"A"},{"Caption":"B"},{"Caption":"C"}],"Slots":[]}};

/***/ }),

/***/ "./src/utils/flattenChildNodes.ts":
/*!****************************************!*\
  !*** ./src/utils/flattenChildNodes.ts ***!
  \****************************************/
/*! exports provided: flattenChildNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenChildNodes", function() { return flattenChildNodes; });
/**
 *
 * @param {HTMLElement} element
 */
var flattenChildNodes = function (element) {
    var children = Array.from(element.children);
    var result = children.slice();
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        result = result.concat(flattenChildNodes(child));
    }
    return result;
};


/***/ }),

/***/ "./src/utils/generateLogoUrl.ts":
/*!**************************************!*\
  !*** ./src/utils/generateLogoUrl.ts ***!
  \**************************************/
/*! exports provided: generateLogoUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateLogoUrl", function() { return generateLogoUrl; });
/**
 * Returns URL for logo icon
 * @param {string} url
 * @param {number} size
 */
var generateLogoUrl = function (url, size) {
    if (size === void 0) { size = 70; }
    return "https://icon-locator.herokuapp.com/icon?url=" + url + "&size=" + size;
};


/***/ }),

/***/ "./src/utils/generateUniqueId.ts":
/*!***************************************!*\
  !*** ./src/utils/generateUniqueId.ts ***!
  \***************************************/
/*! exports provided: generateUniqueId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUniqueId", function() { return generateUniqueId; });
var generateUniqueId = function () { return Math.random().toString(36).substr(2, 16); };


/***/ }),

/***/ "./src/utils/getElementId.ts":
/*!***********************************!*\
  !*** ./src/utils/getElementId.ts ***!
  \***********************************/
/*! exports provided: getElementId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementId", function() { return getElementId; });
/**
 * Returns id
 * @param id
 */
var getElementId = function (id) { return id.split('_')[1]; };


/***/ }),

/***/ "./src/utils/getSourceItemElement.ts":
/*!*******************************************!*\
  !*** ./src/utils/getSourceItemElement.ts ***!
  \*******************************************/
/*! exports provided: getItemElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemElement", function() { return getItemElement; });
var getItemElement = function (element) {
    if (element.tagName.match(/li/i)) {
        return element;
    }
    if (element.tagName.match(/body/i)) {
        return null;
    }
    return getItemElement(element.parentElement);
};


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: flattenChildNodes, generateLogoUrl, generateUniqueId, getElementId, getItemElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flattenChildNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flattenChildNodes */ "./src/utils/flattenChildNodes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flattenChildNodes", function() { return _flattenChildNodes__WEBPACK_IMPORTED_MODULE_0__["flattenChildNodes"]; });

/* harmony import */ var _generateLogoUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateLogoUrl */ "./src/utils/generateLogoUrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateLogoUrl", function() { return _generateLogoUrl__WEBPACK_IMPORTED_MODULE_1__["generateLogoUrl"]; });

/* harmony import */ var _generateUniqueId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateUniqueId */ "./src/utils/generateUniqueId.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateUniqueId", function() { return _generateUniqueId__WEBPACK_IMPORTED_MODULE_2__["generateUniqueId"]; });

/* harmony import */ var _getElementId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getElementId */ "./src/utils/getElementId.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementId", function() { return _getElementId__WEBPACK_IMPORTED_MODULE_3__["getElementId"]; });

/* harmony import */ var _getSourceItemElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getSourceItemElement */ "./src/utils/getSourceItemElement.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getItemElement", function() { return _getSourceItemElement__WEBPACK_IMPORTED_MODULE_4__["getItemElement"]; });








/***/ })

}]);
//# sourceMappingURL=init.chunk.js.map