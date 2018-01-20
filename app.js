/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _frameEditor = __webpack_require__(1);

var _frameEditor2 = _interopRequireDefault(_frameEditor);

var _editorControls = __webpack_require__(2);

var _editorControls2 = _interopRequireDefault(_editorControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frameEditor = new _frameEditor2.default('#editorFrame');
var editorControls = new _editorControls2.default(frameEditor);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrameEditor = function () {

    //Constructor del frame del editor
    //Al preparar, inicializa el frame y lo adapta al objeto.
    function FrameEditor(id) {
        _classCallCheck(this, FrameEditor);

        this.$iframe = $(id);
        this.prepareBody();
    }

    //Método para obtener el body del frame.


    _createClass(FrameEditor, [{
        key: 'getBody',
        value: function getBody() {
            var _this = this;

            return new Promise(function (resolve) {
                _this.$iframe.ready(function () {
                    resolve(_this.$iframe.contents().find('body'));
                });
            });
        }

        //Preparacion del body

    }, {
        key: 'prepareBody',
        value: async function prepareBody() {
            var body = await this.getBody();
        }

        //Metodo para agregar HTML al frame.

    }, {
        key: 'appendHtml',
        value: async function appendHtml(html) {
            var body = await this.getBody();

            body.append(html);
        }
    }]);

    return FrameEditor;
}();

exports.default = FrameEditor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditorControls = function () {
    function EditorControls(editorFrame) {
        _classCallCheck(this, EditorControls);

        this.editorFrame = editorFrame;
        this.fetchElementsEvents();
    }

    _createClass(EditorControls, [{
        key: 'fetchElementsEvents',
        value: function fetchElementsEvents() {
            $('[data-control-add-element]').click(function (event) {
                var _this = this;

                var element = $(this).data('control-add-element');

                console.log($(this));

                $.get({
                    url: 'templates/elements/' + element + '.html',
                    dataType: "html",
                    success: function success(res) {
                        console.log(res);
                        _this.editorFrame.append(res.body);
                    }
                });
            });
        }
    }]);

    return EditorControls;
}();

exports.default = EditorControls;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map