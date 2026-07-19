(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/mark.js/dist/mark.js
  var require_mark = __commonJS({
    "node_modules/mark.js/dist/mark.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.Mark = factory();
      })(exports, (function() {
        "use strict";
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        var createClass = /* @__PURE__ */ (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();
        var _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        var DOMIterator = (function() {
          function DOMIterator2(ctx) {
            var iframes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var exclude = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
            var iframesTimeout = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 5e3;
            classCallCheck(this, DOMIterator2);
            this.ctx = ctx;
            this.iframes = iframes;
            this.exclude = exclude;
            this.iframesTimeout = iframesTimeout;
          }
          createClass(DOMIterator2, [{
            key: "getContexts",
            value: function getContexts() {
              var ctx = void 0, filteredCtx = [];
              if (typeof this.ctx === "undefined" || !this.ctx) {
                ctx = [];
              } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
                ctx = Array.prototype.slice.call(this.ctx);
              } else if (Array.isArray(this.ctx)) {
                ctx = this.ctx;
              } else if (typeof this.ctx === "string") {
                ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
              } else {
                ctx = [this.ctx];
              }
              ctx.forEach(function(ctx2) {
                var isDescendant = filteredCtx.filter(function(contexts) {
                  return contexts.contains(ctx2);
                }).length > 0;
                if (filteredCtx.indexOf(ctx2) === -1 && !isDescendant) {
                  filteredCtx.push(ctx2);
                }
              });
              return filteredCtx;
            }
          }, {
            key: "getIframeContents",
            value: function getIframeContents(ifr, successFn) {
              var errorFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
              };
              var doc = void 0;
              try {
                var ifrWin = ifr.contentWindow;
                doc = ifrWin.document;
                if (!ifrWin || !doc) {
                  throw new Error("iframe inaccessible");
                }
              } catch (e) {
                errorFn();
              }
              if (doc) {
                successFn(doc);
              }
            }
          }, {
            key: "isIframeBlank",
            value: function isIframeBlank(ifr) {
              var bl = "about:blank", src = ifr.getAttribute("src").trim(), href = ifr.contentWindow.location.href;
              return href === bl && src !== bl && src;
            }
          }, {
            key: "observeIframeLoad",
            value: function observeIframeLoad(ifr, successFn, errorFn) {
              var _this = this;
              var called = false, tout = null;
              var listener = function listener2() {
                if (called) {
                  return;
                }
                called = true;
                clearTimeout(tout);
                try {
                  if (!_this.isIframeBlank(ifr)) {
                    ifr.removeEventListener("load", listener2);
                    _this.getIframeContents(ifr, successFn, errorFn);
                  }
                } catch (e) {
                  errorFn();
                }
              };
              ifr.addEventListener("load", listener);
              tout = setTimeout(listener, this.iframesTimeout);
            }
          }, {
            key: "onIframeReady",
            value: function onIframeReady(ifr, successFn, errorFn) {
              try {
                if (ifr.contentWindow.document.readyState === "complete") {
                  if (this.isIframeBlank(ifr)) {
                    this.observeIframeLoad(ifr, successFn, errorFn);
                  } else {
                    this.getIframeContents(ifr, successFn, errorFn);
                  }
                } else {
                  this.observeIframeLoad(ifr, successFn, errorFn);
                }
              } catch (e) {
                errorFn();
              }
            }
          }, {
            key: "waitForIframes",
            value: function waitForIframes(ctx, done) {
              var _this2 = this;
              var eachCalled = 0;
              this.forEachIframe(ctx, function() {
                return true;
              }, function(ifr) {
                eachCalled++;
                _this2.waitForIframes(ifr.querySelector("html"), function() {
                  if (!--eachCalled) {
                    done();
                  }
                });
              }, function(handled) {
                if (!handled) {
                  done();
                }
              });
            }
          }, {
            key: "forEachIframe",
            value: function forEachIframe(ctx, filter, each) {
              var _this3 = this;
              var end = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
              };
              var ifr = ctx.querySelectorAll("iframe"), open = ifr.length, handled = 0;
              ifr = Array.prototype.slice.call(ifr);
              var checkEnd = function checkEnd2() {
                if (--open <= 0) {
                  end(handled);
                }
              };
              if (!open) {
                checkEnd();
              }
              ifr.forEach(function(ifr2) {
                if (DOMIterator2.matches(ifr2, _this3.exclude)) {
                  checkEnd();
                } else {
                  _this3.onIframeReady(ifr2, function(con) {
                    if (filter(ifr2)) {
                      handled++;
                      each(con);
                    }
                    checkEnd();
                  }, checkEnd);
                }
              });
            }
          }, {
            key: "createIterator",
            value: function createIterator(ctx, whatToShow, filter) {
              return document.createNodeIterator(ctx, whatToShow, filter, false);
            }
          }, {
            key: "createInstanceOnIframe",
            value: function createInstanceOnIframe(contents) {
              return new DOMIterator2(contents.querySelector("html"), this.iframes);
            }
          }, {
            key: "compareNodeIframe",
            value: function compareNodeIframe(node, prevNode, ifr) {
              var compCurr = node.compareDocumentPosition(ifr), prev = Node.DOCUMENT_POSITION_PRECEDING;
              if (compCurr & prev) {
                if (prevNode !== null) {
                  var compPrev = prevNode.compareDocumentPosition(ifr), after = Node.DOCUMENT_POSITION_FOLLOWING;
                  if (compPrev & after) {
                    return true;
                  }
                } else {
                  return true;
                }
              }
              return false;
            }
          }, {
            key: "getIteratorNode",
            value: function getIteratorNode(itr) {
              var prevNode = itr.previousNode();
              var node = void 0;
              if (prevNode === null) {
                node = itr.nextNode();
              } else {
                node = itr.nextNode() && itr.nextNode();
              }
              return {
                prevNode,
                node
              };
            }
          }, {
            key: "checkIframeFilter",
            value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
              var key = false, handled = false;
              ifr.forEach(function(ifrDict, i) {
                if (ifrDict.val === currIfr) {
                  key = i;
                  handled = ifrDict.handled;
                }
              });
              if (this.compareNodeIframe(node, prevNode, currIfr)) {
                if (key === false && !handled) {
                  ifr.push({
                    val: currIfr,
                    handled: true
                  });
                } else if (key !== false && !handled) {
                  ifr[key].handled = true;
                }
                return true;
              }
              if (key === false) {
                ifr.push({
                  val: currIfr,
                  handled: false
                });
              }
              return false;
            }
          }, {
            key: "handleOpenIframes",
            value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
              var _this4 = this;
              ifr.forEach(function(ifrDict) {
                if (!ifrDict.handled) {
                  _this4.getIframeContents(ifrDict.val, function(con) {
                    _this4.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
                  });
                }
              });
            }
          }, {
            key: "iterateThroughNodes",
            value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
              var _this5 = this;
              var itr = this.createIterator(ctx, whatToShow, filterCb);
              var ifr = [], elements = [], node = void 0, prevNode = void 0, retrieveNodes = function retrieveNodes2() {
                var _getIteratorNode = _this5.getIteratorNode(itr);
                prevNode = _getIteratorNode.prevNode;
                node = _getIteratorNode.node;
                return node;
              };
              while (retrieveNodes()) {
                if (this.iframes) {
                  this.forEachIframe(ctx, function(currIfr) {
                    return _this5.checkIframeFilter(node, prevNode, currIfr, ifr);
                  }, function(con) {
                    _this5.createInstanceOnIframe(con).forEachNode(whatToShow, function(ifrNode) {
                      return elements.push(ifrNode);
                    }, filterCb);
                  });
                }
                elements.push(node);
              }
              elements.forEach(function(node2) {
                eachCb(node2);
              });
              if (this.iframes) {
                this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
              }
              doneCb();
            }
          }, {
            key: "forEachNode",
            value: function forEachNode(whatToShow, each, filter) {
              var _this6 = this;
              var done = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
              };
              var contexts = this.getContexts();
              var open = contexts.length;
              if (!open) {
                done();
              }
              contexts.forEach(function(ctx) {
                var ready = function ready2() {
                  _this6.iterateThroughNodes(whatToShow, ctx, each, filter, function() {
                    if (--open <= 0) {
                      done();
                    }
                  });
                };
                if (_this6.iframes) {
                  _this6.waitForIframes(ctx, ready);
                } else {
                  ready();
                }
              });
            }
          }], [{
            key: "matches",
            value: function matches(element, selector) {
              var selectors = typeof selector === "string" ? [selector] : selector, fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
              if (fn) {
                var match = false;
                selectors.every(function(sel) {
                  if (fn.call(element, sel)) {
                    match = true;
                    return false;
                  }
                  return true;
                });
                return match;
              } else {
                return false;
              }
            }
          }]);
          return DOMIterator2;
        })();
        var Mark$1 = (function() {
          function Mark3(ctx) {
            classCallCheck(this, Mark3);
            this.ctx = ctx;
            this.ie = false;
            var ua = window.navigator.userAgent;
            if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1) {
              this.ie = true;
            }
          }
          createClass(Mark3, [{
            key: "log",
            value: function log(msg) {
              var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "debug";
              var log2 = this.opt.log;
              if (!this.opt.debug) {
                return;
              }
              if ((typeof log2 === "undefined" ? "undefined" : _typeof(log2)) === "object" && typeof log2[level] === "function") {
                log2[level]("mark.js: " + msg);
              }
            }
          }, {
            key: "escapeStr",
            value: function escapeStr(str) {
              return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
          }, {
            key: "createRegExp",
            value: function createRegExp(str) {
              if (this.opt.wildcards !== "disabled") {
                str = this.setupWildcardsRegExp(str);
              }
              str = this.escapeStr(str);
              if (Object.keys(this.opt.synonyms).length) {
                str = this.createSynonymsRegExp(str);
              }
              if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
                str = this.setupIgnoreJoinersRegExp(str);
              }
              if (this.opt.diacritics) {
                str = this.createDiacriticsRegExp(str);
              }
              str = this.createMergedBlanksRegExp(str);
              if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
                str = this.createJoinersRegExp(str);
              }
              if (this.opt.wildcards !== "disabled") {
                str = this.createWildcardsRegExp(str);
              }
              str = this.createAccuracyRegExp(str);
              return str;
            }
          }, {
            key: "createSynonymsRegExp",
            value: function createSynonymsRegExp(str) {
              var syn = this.opt.synonyms, sens = this.opt.caseSensitive ? "" : "i", joinerPlaceholder = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
              for (var index in syn) {
                if (syn.hasOwnProperty(index)) {
                  var value = syn[index], k1 = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(index) : this.escapeStr(index), k2 = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(value) : this.escapeStr(value);
                  if (k1 !== "" && k2 !== "") {
                    str = str.replace(new RegExp("(" + this.escapeStr(k1) + "|" + this.escapeStr(k2) + ")", "gm" + sens), joinerPlaceholder + ("(" + this.processSynomyms(k1) + "|") + (this.processSynomyms(k2) + ")") + joinerPlaceholder);
                  }
                }
              }
              return str;
            }
          }, {
            key: "processSynomyms",
            value: function processSynomyms(str) {
              if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
                str = this.setupIgnoreJoinersRegExp(str);
              }
              return str;
            }
          }, {
            key: "setupWildcardsRegExp",
            value: function setupWildcardsRegExp(str) {
              str = str.replace(/(?:\\)*\?/g, function(val) {
                return val.charAt(0) === "\\" ? "?" : "";
              });
              return str.replace(/(?:\\)*\*/g, function(val) {
                return val.charAt(0) === "\\" ? "*" : "";
              });
            }
          }, {
            key: "createWildcardsRegExp",
            value: function createWildcardsRegExp(str) {
              var spaces = this.opt.wildcards === "withSpaces";
              return str.replace(/\u0001/g, spaces ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, spaces ? "[\\S\\s]*?" : "\\S*");
            }
          }, {
            key: "setupIgnoreJoinersRegExp",
            value: function setupIgnoreJoinersRegExp(str) {
              return str.replace(/[^(|)\\]/g, function(val, indx, original) {
                var nextChar = original.charAt(indx + 1);
                if (/[(|)\\]/.test(nextChar) || nextChar === "") {
                  return val;
                } else {
                  return val + "\0";
                }
              });
            }
          }, {
            key: "createJoinersRegExp",
            value: function createJoinersRegExp(str) {
              var joiner = [];
              var ignorePunctuation = this.opt.ignorePunctuation;
              if (Array.isArray(ignorePunctuation) && ignorePunctuation.length) {
                joiner.push(this.escapeStr(ignorePunctuation.join("")));
              }
              if (this.opt.ignoreJoiners) {
                joiner.push("\\u00ad\\u200b\\u200c\\u200d");
              }
              return joiner.length ? str.split(/\u0000+/).join("[" + joiner.join("") + "]*") : str;
            }
          }, {
            key: "createDiacriticsRegExp",
            value: function createDiacriticsRegExp(str) {
              var sens = this.opt.caseSensitive ? "" : "i", dct = this.opt.caseSensitive ? ["a\xE0\xE1\u1EA3\xE3\u1EA1\u0103\u1EB1\u1EAF\u1EB3\u1EB5\u1EB7\xE2\u1EA7\u1EA5\u1EA9\u1EAB\u1EAD\xE4\xE5\u0101\u0105", "A\xC0\xC1\u1EA2\xC3\u1EA0\u0102\u1EB0\u1EAE\u1EB2\u1EB4\u1EB6\xC2\u1EA6\u1EA4\u1EA8\u1EAA\u1EAC\xC4\xC5\u0100\u0104", "c\xE7\u0107\u010D", "C\xC7\u0106\u010C", "d\u0111\u010F", "D\u0110\u010E", "e\xE8\xE9\u1EBB\u1EBD\u1EB9\xEA\u1EC1\u1EBF\u1EC3\u1EC5\u1EC7\xEB\u011B\u0113\u0119", "E\xC8\xC9\u1EBA\u1EBC\u1EB8\xCA\u1EC0\u1EBE\u1EC2\u1EC4\u1EC6\xCB\u011A\u0112\u0118", "i\xEC\xED\u1EC9\u0129\u1ECB\xEE\xEF\u012B", "I\xCC\xCD\u1EC8\u0128\u1ECA\xCE\xCF\u012A", "l\u0142", "L\u0141", "n\xF1\u0148\u0144", "N\xD1\u0147\u0143", "o\xF2\xF3\u1ECF\xF5\u1ECD\xF4\u1ED3\u1ED1\u1ED5\u1ED7\u1ED9\u01A1\u1EDF\u1EE1\u1EDB\u1EDD\u1EE3\xF6\xF8\u014D", "O\xD2\xD3\u1ECE\xD5\u1ECC\xD4\u1ED2\u1ED0\u1ED4\u1ED6\u1ED8\u01A0\u1EDE\u1EE0\u1EDA\u1EDC\u1EE2\xD6\xD8\u014C", "r\u0159", "R\u0158", "s\u0161\u015B\u0219\u015F", "S\u0160\u015A\u0218\u015E", "t\u0165\u021B\u0163", "T\u0164\u021A\u0162", "u\xF9\xFA\u1EE7\u0169\u1EE5\u01B0\u1EEB\u1EE9\u1EED\u1EEF\u1EF1\xFB\xFC\u016F\u016B", "U\xD9\xDA\u1EE6\u0168\u1EE4\u01AF\u1EEA\u1EE8\u1EEC\u1EEE\u1EF0\xDB\xDC\u016E\u016A", "y\xFD\u1EF3\u1EF7\u1EF9\u1EF5\xFF", "Y\xDD\u1EF2\u1EF6\u1EF8\u1EF4\u0178", "z\u017E\u017C\u017A", "Z\u017D\u017B\u0179"] : ["a\xE0\xE1\u1EA3\xE3\u1EA1\u0103\u1EB1\u1EAF\u1EB3\u1EB5\u1EB7\xE2\u1EA7\u1EA5\u1EA9\u1EAB\u1EAD\xE4\xE5\u0101\u0105A\xC0\xC1\u1EA2\xC3\u1EA0\u0102\u1EB0\u1EAE\u1EB2\u1EB4\u1EB6\xC2\u1EA6\u1EA4\u1EA8\u1EAA\u1EAC\xC4\xC5\u0100\u0104", "c\xE7\u0107\u010DC\xC7\u0106\u010C", "d\u0111\u010FD\u0110\u010E", "e\xE8\xE9\u1EBB\u1EBD\u1EB9\xEA\u1EC1\u1EBF\u1EC3\u1EC5\u1EC7\xEB\u011B\u0113\u0119E\xC8\xC9\u1EBA\u1EBC\u1EB8\xCA\u1EC0\u1EBE\u1EC2\u1EC4\u1EC6\xCB\u011A\u0112\u0118", "i\xEC\xED\u1EC9\u0129\u1ECB\xEE\xEF\u012BI\xCC\xCD\u1EC8\u0128\u1ECA\xCE\xCF\u012A", "l\u0142L\u0141", "n\xF1\u0148\u0144N\xD1\u0147\u0143", "o\xF2\xF3\u1ECF\xF5\u1ECD\xF4\u1ED3\u1ED1\u1ED5\u1ED7\u1ED9\u01A1\u1EDF\u1EE1\u1EDB\u1EDD\u1EE3\xF6\xF8\u014DO\xD2\xD3\u1ECE\xD5\u1ECC\xD4\u1ED2\u1ED0\u1ED4\u1ED6\u1ED8\u01A0\u1EDE\u1EE0\u1EDA\u1EDC\u1EE2\xD6\xD8\u014C", "r\u0159R\u0158", "s\u0161\u015B\u0219\u015FS\u0160\u015A\u0218\u015E", "t\u0165\u021B\u0163T\u0164\u021A\u0162", "u\xF9\xFA\u1EE7\u0169\u1EE5\u01B0\u1EEB\u1EE9\u1EED\u1EEF\u1EF1\xFB\xFC\u016F\u016BU\xD9\xDA\u1EE6\u0168\u1EE4\u01AF\u1EEA\u1EE8\u1EEC\u1EEE\u1EF0\xDB\xDC\u016E\u016A", "y\xFD\u1EF3\u1EF7\u1EF9\u1EF5\xFFY\xDD\u1EF2\u1EF6\u1EF8\u1EF4\u0178", "z\u017E\u017C\u017AZ\u017D\u017B\u0179"];
              var handled = [];
              str.split("").forEach(function(ch) {
                dct.every(function(dct2) {
                  if (dct2.indexOf(ch) !== -1) {
                    if (handled.indexOf(dct2) > -1) {
                      return false;
                    }
                    str = str.replace(new RegExp("[" + dct2 + "]", "gm" + sens), "[" + dct2 + "]");
                    handled.push(dct2);
                  }
                  return true;
                });
              });
              return str;
            }
          }, {
            key: "createMergedBlanksRegExp",
            value: function createMergedBlanksRegExp(str) {
              return str.replace(/[\s]+/gmi, "[\\s]+");
            }
          }, {
            key: "createAccuracyRegExp",
            value: function createAccuracyRegExp(str) {
              var _this = this;
              var chars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\xA1\xBF";
              var acc = this.opt.accuracy, val = typeof acc === "string" ? acc : acc.value, ls = typeof acc === "string" ? [] : acc.limiters, lsJoin = "";
              ls.forEach(function(limiter) {
                lsJoin += "|" + _this.escapeStr(limiter);
              });
              switch (val) {
                case "partially":
                default:
                  return "()(" + str + ")";
                case "complementary":
                  lsJoin = "\\s" + (lsJoin ? lsJoin : this.escapeStr(chars));
                  return "()([^" + lsJoin + "]*" + str + "[^" + lsJoin + "]*)";
                case "exactly":
                  return "(^|\\s" + lsJoin + ")(" + str + ")(?=$|\\s" + lsJoin + ")";
              }
            }
          }, {
            key: "getSeparatedKeywords",
            value: function getSeparatedKeywords(sv) {
              var _this2 = this;
              var stack = [];
              sv.forEach(function(kw) {
                if (!_this2.opt.separateWordSearch) {
                  if (kw.trim() && stack.indexOf(kw) === -1) {
                    stack.push(kw);
                  }
                } else {
                  kw.split(" ").forEach(function(kwSplitted) {
                    if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
                      stack.push(kwSplitted);
                    }
                  });
                }
              });
              return {
                "keywords": stack.sort(function(a, b) {
                  return b.length - a.length;
                }),
                "length": stack.length
              };
            }
          }, {
            key: "isNumeric",
            value: function isNumeric(value) {
              return Number(parseFloat(value)) == value;
            }
          }, {
            key: "checkRanges",
            value: function checkRanges(array) {
              var _this3 = this;
              if (!Array.isArray(array) || Object.prototype.toString.call(array[0]) !== "[object Object]") {
                this.log("markRanges() will only accept an array of objects");
                this.opt.noMatch(array);
                return [];
              }
              var stack = [];
              var last = 0;
              array.sort(function(a, b) {
                return a.start - b.start;
              }).forEach(function(item) {
                var _callNoMatchOnInvalid = _this3.callNoMatchOnInvalidRanges(item, last), start = _callNoMatchOnInvalid.start, end = _callNoMatchOnInvalid.end, valid = _callNoMatchOnInvalid.valid;
                if (valid) {
                  item.start = start;
                  item.length = end - start;
                  stack.push(item);
                  last = end;
                }
              });
              return stack;
            }
          }, {
            key: "callNoMatchOnInvalidRanges",
            value: function callNoMatchOnInvalidRanges(range, last) {
              var start = void 0, end = void 0, valid = false;
              if (range && typeof range.start !== "undefined") {
                start = parseInt(range.start, 10);
                end = start + parseInt(range.length, 10);
                if (this.isNumeric(range.start) && this.isNumeric(range.length) && end - last > 0 && end - start > 0) {
                  valid = true;
                } else {
                  this.log("Ignoring invalid or overlapping range: " + ("" + JSON.stringify(range)));
                  this.opt.noMatch(range);
                }
              } else {
                this.log("Ignoring invalid range: " + JSON.stringify(range));
                this.opt.noMatch(range);
              }
              return {
                start,
                end,
                valid
              };
            }
          }, {
            key: "checkWhitespaceRanges",
            value: function checkWhitespaceRanges(range, originalLength, string) {
              var end = void 0, valid = true, max = string.length, offset = originalLength - max, start = parseInt(range.start, 10) - offset;
              start = start > max ? max : start;
              end = start + parseInt(range.length, 10);
              if (end > max) {
                end = max;
                this.log("End range automatically set to the max value of " + max);
              }
              if (start < 0 || end - start < 0 || start > max || end > max) {
                valid = false;
                this.log("Invalid range: " + JSON.stringify(range));
                this.opt.noMatch(range);
              } else if (string.substring(start, end).replace(/\s+/g, "") === "") {
                valid = false;
                this.log("Skipping whitespace only range: " + JSON.stringify(range));
                this.opt.noMatch(range);
              }
              return {
                start,
                end,
                valid
              };
            }
          }, {
            key: "getTextNodes",
            value: function getTextNodes(cb) {
              var _this4 = this;
              var val = "", nodes = [];
              this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function(node) {
                nodes.push({
                  start: val.length,
                  end: (val += node.textContent).length,
                  node
                });
              }, function(node) {
                if (_this4.matchesExclude(node.parentNode)) {
                  return NodeFilter.FILTER_REJECT;
                } else {
                  return NodeFilter.FILTER_ACCEPT;
                }
              }, function() {
                cb({
                  value: val,
                  nodes
                });
              });
            }
          }, {
            key: "matchesExclude",
            value: function matchesExclude(el) {
              return DOMIterator.matches(el, this.opt.exclude.concat(["script", "style", "title", "head", "html"]));
            }
          }, {
            key: "wrapRangeInTextNode",
            value: function wrapRangeInTextNode(node, start, end) {
              var hEl = !this.opt.element ? "mark" : this.opt.element, startNode = node.splitText(start), ret = startNode.splitText(end - start);
              var repl = document.createElement(hEl);
              repl.setAttribute("data-markjs", "true");
              if (this.opt.className) {
                repl.setAttribute("class", this.opt.className);
              }
              repl.textContent = startNode.textContent;
              startNode.parentNode.replaceChild(repl, startNode);
              return ret;
            }
          }, {
            key: "wrapRangeInMappedTextNode",
            value: function wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
              var _this5 = this;
              dict.nodes.every(function(n, i) {
                var sibl = dict.nodes[i + 1];
                if (typeof sibl === "undefined" || sibl.start > start) {
                  if (!filterCb(n.node)) {
                    return false;
                  }
                  var s = start - n.start, e = (end > n.end ? n.end : end) - n.start, startStr = dict.value.substr(0, n.start), endStr = dict.value.substr(e + n.start);
                  n.node = _this5.wrapRangeInTextNode(n.node, s, e);
                  dict.value = startStr + endStr;
                  dict.nodes.forEach(function(k, j) {
                    if (j >= i) {
                      if (dict.nodes[j].start > 0 && j !== i) {
                        dict.nodes[j].start -= e;
                      }
                      dict.nodes[j].end -= e;
                    }
                  });
                  end -= e;
                  eachCb(n.node.previousSibling, n.start);
                  if (end > n.end) {
                    start = n.end;
                  } else {
                    return false;
                  }
                }
                return true;
              });
            }
          }, {
            key: "wrapMatches",
            value: function wrapMatches(regex, ignoreGroups, filterCb, eachCb, endCb) {
              var _this6 = this;
              var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
              this.getTextNodes(function(dict) {
                dict.nodes.forEach(function(node) {
                  node = node.node;
                  var match = void 0;
                  while ((match = regex.exec(node.textContent)) !== null && match[matchIdx] !== "") {
                    if (!filterCb(match[matchIdx], node)) {
                      continue;
                    }
                    var pos = match.index;
                    if (matchIdx !== 0) {
                      for (var i = 1; i < matchIdx; i++) {
                        pos += match[i].length;
                      }
                    }
                    node = _this6.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
                    eachCb(node.previousSibling);
                    regex.lastIndex = 0;
                  }
                });
                endCb();
              });
            }
          }, {
            key: "wrapMatchesAcrossElements",
            value: function wrapMatchesAcrossElements(regex, ignoreGroups, filterCb, eachCb, endCb) {
              var _this7 = this;
              var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
              this.getTextNodes(function(dict) {
                var match = void 0;
                while ((match = regex.exec(dict.value)) !== null && match[matchIdx] !== "") {
                  var start = match.index;
                  if (matchIdx !== 0) {
                    for (var i = 1; i < matchIdx; i++) {
                      start += match[i].length;
                    }
                  }
                  var end = start + match[matchIdx].length;
                  _this7.wrapRangeInMappedTextNode(dict, start, end, function(node) {
                    return filterCb(match[matchIdx], node);
                  }, function(node, lastIndex) {
                    regex.lastIndex = lastIndex;
                    eachCb(node);
                  });
                }
                endCb();
              });
            }
          }, {
            key: "wrapRangeFromIndex",
            value: function wrapRangeFromIndex(ranges, filterCb, eachCb, endCb) {
              var _this8 = this;
              this.getTextNodes(function(dict) {
                var originalLength = dict.value.length;
                ranges.forEach(function(range, counter) {
                  var _checkWhitespaceRange = _this8.checkWhitespaceRanges(range, originalLength, dict.value), start = _checkWhitespaceRange.start, end = _checkWhitespaceRange.end, valid = _checkWhitespaceRange.valid;
                  if (valid) {
                    _this8.wrapRangeInMappedTextNode(dict, start, end, function(node) {
                      return filterCb(node, range, dict.value.substring(start, end), counter);
                    }, function(node) {
                      eachCb(node, range);
                    });
                  }
                });
                endCb();
              });
            }
          }, {
            key: "unwrapMatches",
            value: function unwrapMatches(node) {
              var parent = node.parentNode;
              var docFrag = document.createDocumentFragment();
              while (node.firstChild) {
                docFrag.appendChild(node.removeChild(node.firstChild));
              }
              parent.replaceChild(docFrag, node);
              if (!this.ie) {
                parent.normalize();
              } else {
                this.normalizeTextNode(parent);
              }
            }
          }, {
            key: "normalizeTextNode",
            value: function normalizeTextNode(node) {
              if (!node) {
                return;
              }
              if (node.nodeType === 3) {
                while (node.nextSibling && node.nextSibling.nodeType === 3) {
                  node.nodeValue += node.nextSibling.nodeValue;
                  node.parentNode.removeChild(node.nextSibling);
                }
              } else {
                this.normalizeTextNode(node.firstChild);
              }
              this.normalizeTextNode(node.nextSibling);
            }
          }, {
            key: "markRegExp",
            value: function markRegExp(regexp, opt) {
              var _this9 = this;
              this.opt = opt;
              this.log('Searching with expression "' + regexp + '"');
              var totalMatches = 0, fn = "wrapMatches";
              var eachCb = function eachCb2(element) {
                totalMatches++;
                _this9.opt.each(element);
              };
              if (this.opt.acrossElements) {
                fn = "wrapMatchesAcrossElements";
              }
              this[fn](regexp, this.opt.ignoreGroups, function(match, node) {
                return _this9.opt.filter(node, match, totalMatches);
              }, eachCb, function() {
                if (totalMatches === 0) {
                  _this9.opt.noMatch(regexp);
                }
                _this9.opt.done(totalMatches);
              });
            }
          }, {
            key: "mark",
            value: function mark(sv, opt) {
              var _this10 = this;
              this.opt = opt;
              var totalMatches = 0, fn = "wrapMatches";
              var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === "string" ? [sv] : sv), kwArr = _getSeparatedKeywords.keywords, kwArrLen = _getSeparatedKeywords.length, sens = this.opt.caseSensitive ? "" : "i", handler = function handler2(kw) {
                var regex = new RegExp(_this10.createRegExp(kw), "gm" + sens), matches = 0;
                _this10.log('Searching with expression "' + regex + '"');
                _this10[fn](regex, 1, function(term, node) {
                  return _this10.opt.filter(node, kw, totalMatches, matches);
                }, function(element) {
                  matches++;
                  totalMatches++;
                  _this10.opt.each(element);
                }, function() {
                  if (matches === 0) {
                    _this10.opt.noMatch(kw);
                  }
                  if (kwArr[kwArrLen - 1] === kw) {
                    _this10.opt.done(totalMatches);
                  } else {
                    handler2(kwArr[kwArr.indexOf(kw) + 1]);
                  }
                });
              };
              if (this.opt.acrossElements) {
                fn = "wrapMatchesAcrossElements";
              }
              if (kwArrLen === 0) {
                this.opt.done(totalMatches);
              } else {
                handler(kwArr[0]);
              }
            }
          }, {
            key: "markRanges",
            value: function markRanges(rawRanges, opt) {
              var _this11 = this;
              this.opt = opt;
              var totalMatches = 0, ranges = this.checkRanges(rawRanges);
              if (ranges && ranges.length) {
                this.log("Starting to mark with the following ranges: " + JSON.stringify(ranges));
                this.wrapRangeFromIndex(ranges, function(node, range, match, counter) {
                  return _this11.opt.filter(node, range, match, counter);
                }, function(element, range) {
                  totalMatches++;
                  _this11.opt.each(element, range);
                }, function() {
                  _this11.opt.done(totalMatches);
                });
              } else {
                this.opt.done(totalMatches);
              }
            }
          }, {
            key: "unmark",
            value: function unmark(opt) {
              var _this12 = this;
              this.opt = opt;
              var sel = this.opt.element ? this.opt.element : "*";
              sel += "[data-markjs]";
              if (this.opt.className) {
                sel += "." + this.opt.className;
              }
              this.log('Removal selector "' + sel + '"');
              this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function(node) {
                _this12.unwrapMatches(node);
              }, function(node) {
                var matchesSel = DOMIterator.matches(node, sel), matchesExclude = _this12.matchesExclude(node);
                if (!matchesSel || matchesExclude) {
                  return NodeFilter.FILTER_REJECT;
                } else {
                  return NodeFilter.FILTER_ACCEPT;
                }
              }, this.opt.done);
            }
          }, {
            key: "opt",
            set: function set$$1(val) {
              this._opt = _extends({}, {
                "element": "",
                "className": "",
                "exclude": [],
                "iframes": false,
                "iframesTimeout": 5e3,
                "separateWordSearch": true,
                "diacritics": true,
                "synonyms": {},
                "accuracy": "partially",
                "acrossElements": false,
                "caseSensitive": false,
                "ignoreJoiners": false,
                "ignoreGroups": 0,
                "ignorePunctuation": [],
                "wildcards": "disabled",
                "each": function each() {
                },
                "noMatch": function noMatch() {
                },
                "filter": function filter() {
                  return true;
                },
                "done": function done() {
                },
                "debug": false,
                "log": window.console
              }, val);
            },
            get: function get$$1() {
              return this._opt;
            }
          }, {
            key: "iterator",
            get: function get$$1() {
              return new DOMIterator(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
            }
          }]);
          return Mark3;
        })();
        function Mark2(ctx) {
          var _this = this;
          var instance = new Mark$1(ctx);
          this.mark = function(sv, opt) {
            instance.mark(sv, opt);
            return _this;
          };
          this.markRegExp = function(sv, opt) {
            instance.markRegExp(sv, opt);
            return _this;
          };
          this.markRanges = function(sv, opt) {
            instance.markRanges(sv, opt);
            return _this;
          };
          this.unmark = function(opt) {
            instance.unmark(opt);
            return _this;
          };
          return this;
        }
        return Mark2;
      }));
    }
  });

  // ns-hugo-imp:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\search.ts
  var import_mark = __toESM(require_mark());

  // node_modules/mustache/mustache.mjs
  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === "[object Array]";
  };
  function isFunction(object) {
    return typeof object === "function";
  }
  function typeStr(obj) {
    return isArray(obj) ? "array" : typeof obj;
  }
  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function hasProperty(obj, propName) {
    return obj != null && typeof obj === "object" && propName in obj;
  }
  function primitiveHasOwnProperty(primitive, propName) {
    return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
  }
  var regExpTest = RegExp.prototype.test;
  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }
  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;"
  };
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }
  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;
  function parseTemplate(template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];
    var tokens = [];
    var spaces = [];
    var hasTag = false;
    var nonSpace = false;
    var indentation = "";
    var tagIndex = 0;
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }
      hasTag = false;
      nonSpace = false;
    }
    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === "string")
        tagsToCompile = tagsToCompile.split(spaceRe, 2);
      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error("Invalid tags: " + tagsToCompile);
      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
      closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
    }
    compileTags(tags || mustache.tags);
    var scanner = new Scanner(template);
    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(openingTagRe);
      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);
          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += " ";
          }
          tokens.push(["text", chr, start, start + 1]);
          start += 1;
          if (chr === "\n") {
            stripSpace();
            indentation = "";
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }
      if (!scanner.scan(openingTagRe))
        break;
      hasTag = true;
      type = scanner.scan(tagRe) || "name";
      scanner.scan(whiteRe);
      if (type === "=") {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === "{") {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = "&";
      } else {
        value = scanner.scanUntil(closingTagRe);
      }
      if (!scanner.scan(closingTagRe))
        throw new Error("Unclosed tag at " + scanner.pos);
      if (type == ">") {
        token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
      } else {
        token = [type, value, start, scanner.pos];
      }
      tagIndex++;
      tokens.push(token);
      if (type === "#" || type === "^") {
        sections.push(token);
      } else if (type === "/") {
        openSection = sections.pop();
        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);
        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      } else if (type === "=") {
        compileTags(value);
      }
    }
    stripSpace();
    openSection = sections.pop();
    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    return nestTokens(squashTokens(tokens));
  }
  function squashTokens(tokens) {
    var squashedTokens = [];
    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === "text" && lastToken && lastToken[0] === "text") {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }
    return squashedTokens;
  }
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];
    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      switch (token[0]) {
        case "#":
        case "^":
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case "/":
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }
    return nestedTokens;
  }
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }
  Scanner.prototype.eos = function eos() {
    return this.tail === "";
  };
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);
    if (!match || match.index !== 0)
      return "";
    var string = match[0];
    this.tail = this.tail.substring(string.length);
    this.pos += string.length;
    return string;
  };
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re), match;
    switch (index) {
      case -1:
        match = this.tail;
        this.tail = "";
        break;
      case 0:
        match = "";
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }
    this.pos += match.length;
    return match;
  };
  function Context(view, parentContext) {
    this.view = view;
    this.cache = { ".": this.view };
    this.parent = parentContext;
  }
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;
    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;
      while (context) {
        if (name.indexOf(".") > 0) {
          intermediateValue = context.view;
          names = name.split(".");
          index = 0;
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }
        if (lookupHit) {
          value = intermediateValue;
          break;
        }
        context = context.parent;
      }
      cache[name] = value;
    }
    if (isFunction(value))
      value = value.call(this.view);
    return value;
  };
  function Writer() {
    this.templateCache = {
      _cache: {},
      set: function set(key, value) {
        this._cache[key] = value;
      },
      get: function get2(key) {
        return this._cache[key];
      },
      clear: function clear() {
        this._cache = {};
      }
    };
  }
  Writer.prototype.clearCache = function clearCache() {
    if (typeof this.templateCache !== "undefined") {
      this.templateCache.clear();
    }
  };
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ":" + (tags || mustache.tags).join(":");
    var isCacheEnabled = typeof cache !== "undefined";
    var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
    if (tokens == void 0) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };
  Writer.prototype.render = function render(template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = view instanceof Context ? view : new Context(view, void 0);
    return this.renderTokens(tokens, context, partials, template, config);
  };
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
    var buffer = "";
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = void 0;
      token = tokens[i];
      symbol = token[0];
      if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === ">") value = this.renderPartial(token, context, partials, config);
      else if (symbol === "&") value = this.unescapedValue(token, context);
      else if (symbol === "name") value = this.escapedValue(token, context, config);
      else if (symbol === "text") value = this.rawValue(token);
      if (value !== void 0)
        buffer += value;
    }
    return buffer;
  };
  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = "";
    var value = context.lookup(token[1]);
    function subRender(template) {
      return self.render(template, context, partials, config);
    }
    if (!value) return;
    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== "string")
        throw new Error("Cannot use higher-order sections without the original template");
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };
  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);
    if (!value || isArray(value) && value.length === 0)
      return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };
  Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, "");
    var partialByNl = partial.split("\n");
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join("\n");
  };
  Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);
    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };
  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };
  Writer.prototype.escapedValue = function escapedValue(token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
  };
  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };
  Writer.prototype.getConfigTags = function getConfigTags(config) {
    if (isArray(config)) {
      return config;
    } else if (config && typeof config === "object") {
      return config.tags;
    } else {
      return void 0;
    }
  };
  Writer.prototype.getConfigEscape = function getConfigEscape(config) {
    if (config && typeof config === "object" && !isArray(config)) {
      return config.escape;
    } else {
      return void 0;
    }
  };
  var mustache = {
    name: "mustache.js",
    version: "4.2.0",
    tags: ["{{", "}}"],
    clearCache: void 0,
    escape: void 0,
    parse: void 0,
    render: void 0,
    Scanner: void 0,
    Context: void 0,
    Writer: void 0,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache(cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache() {
      return defaultWriter.templateCache;
    }
  };
  var defaultWriter = new Writer();
  mustache.clearCache = function clearCache2() {
    return defaultWriter.clearCache();
  };
  mustache.parse = function parse2(template, tags) {
    return defaultWriter.parse(template, tags);
  };
  mustache.render = function render2(template, view, partials, config) {
    if (typeof template !== "string") {
      throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
    }
    return defaultWriter.render(template, view, partials, config);
  };
  mustache.escape = escapeHtml;
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
  var mustache_default = mustache;

  // node_modules/fuse.js/dist/fuse.mjs
  function isArray2(value) {
    return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
  }
  function baseToString(value) {
    if (typeof value == "string") return value;
    if (typeof value === "bigint") return value.toString();
    const result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
  }
  function isObject(value) {
    return typeof value === "object";
  }
  function isObjectLike(value) {
    return isObject(value) && value !== null;
  }
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  }
  function getTag(value) {
    return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
  }
  var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  var INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
  var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
  var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
  var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
  var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
  var FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";
  var hasOwn = Object.prototype.hasOwnProperty;
  var KeyStore = class {
    constructor(keys) {
      this._keys = [];
      this._keyMap = {};
      let totalWeight = 0;
      keys.forEach((key) => {
        const obj = createKey(key);
        this._keys.push(obj);
        this._keyMap[obj.id] = obj;
        totalWeight += obj.weight;
      });
      this._keys.forEach((key) => {
        key.weight /= totalWeight;
      });
    }
    get(keyId) {
      return this._keyMap[keyId];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  };
  function createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if (isString(key) || isArray2(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
      const name = key.name;
      src = name;
      if (hasOwn.call(key, "weight") && key.weight !== void 0) {
        weight = key.weight;
        if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
      }
      path = createKeyPath(name);
      id = createKeyId(name);
      getFn = key.getFn ?? null;
    }
    return {
      path,
      id,
      weight,
      src,
      getFn
    };
  }
  function createKeyPath(key) {
    return isArray2(key) ? key : key.split(".");
  }
  function createKeyId(key) {
    return isArray2(key) ? key.join(".") : key;
  }
  function get(obj, path) {
    const list = [];
    let arr = false;
    const deepGet = (obj2, path2, index, arrayIndex) => {
      if (!isDefined(obj2)) return;
      if (!path2[index]) list.push(arrayIndex !== void 0 ? {
        v: obj2,
        i: arrayIndex
      } : obj2);
      else {
        const value = obj2[path2[index]];
        if (!isDefined(value)) return;
        if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
          v: toString(value),
          i: arrayIndex
        } : toString(value));
        else if (isArray2(value)) {
          arr = true;
          for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path2, index + 1, i);
        } else if (path2.length) deepGet(value, path2, index + 1, arrayIndex);
      }
    };
    deepGet(obj, isString(path) ? path.split(".") : path, 0);
    return arr ? list : list[0];
  }
  var MatchOptions = {
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1
  };
  var BasicOptions = {
    isCaseSensitive: false,
    ignoreDiacritics: false,
    includeScore: false,
    keys: [],
    shouldSort: true,
    sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
  };
  var FuzzyOptions = {
    location: 0,
    threshold: 0.6,
    distance: 100
  };
  var AdvancedOptions = {
    useExtendedSearch: false,
    useTokenSearch: false,
    tokenize: void 0,
    tokenMatch: "any",
    getFn: get,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1
  };
  var Config = Object.freeze({
    ...BasicOptions,
    ...MatchOptions,
    ...FuzzyOptions,
    ...AdvancedOptions
  });
  function isWordSeparator(code) {
    return code >= 9 && code <= 13 || code === 32 || code === 160;
  }
  function norm(weight = 1, mantissa = 3) {
    const cache = /* @__PURE__ */ new Map();
    const m = Math.pow(10, mantissa);
    return {
      get(value) {
        let numTokens = 0;
        let inWord = false;
        for (let i = 0; i < value.length; i++) if (!isWordSeparator(value.charCodeAt(i))) {
          if (!inWord) {
            numTokens++;
            inWord = true;
          }
        } else inWord = false;
        if (numTokens === 0) numTokens = 1;
        if (cache.has(numTokens)) return cache.get(numTokens);
        const n = Math.round(m / Math.pow(numTokens, 0.5 * weight)) / m;
        cache.set(numTokens, n);
        return n;
      },
      clear() {
        cache.clear();
      }
    };
  }
  var FuseIndex = class {
    constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
      this.docs = [];
      this.keys = [];
      this._keysMap = {};
      this.setIndexRecords();
    }
    setSources(docs = []) {
      this.docs = docs;
    }
    setIndexRecords(records = []) {
      this.records = records;
    }
    setKeys(keys = []) {
      this.keys = keys;
      this._keysMap = {};
      keys.forEach((key, idx) => {
        this._keysMap[key.id] = idx;
      });
    }
    create() {
      if (this.isCreated || !this.docs.length) return;
      this.isCreated = true;
      const len = this.docs.length;
      this.records = new Array(len);
      let recordCount = 0;
      if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
        const record = this._createStringRecord(this.docs[i], i);
        if (record) this.records[recordCount++] = record;
      }
      else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
      this.records.length = recordCount;
      this.norm.clear();
    }
    add(doc, docIndex) {
      if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
      if (isString(doc)) {
        const record2 = this._createStringRecord(doc, docIndex);
        if (record2) this.records.push(record2);
        return record2;
      }
      const record = this._createObjectRecord(doc, docIndex);
      this.records.push(record);
      return record;
    }
    removeAt(idx) {
      if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
      for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
        this.records.splice(i, 1);
        break;
      }
      for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
    }
    removeAll(indices) {
      const toRemove = /* @__PURE__ */ new Set();
      for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
      if (toRemove.size === 0) return;
      this.records = this.records.filter((r) => !toRemove.has(r.i));
      const sorted = Array.from(toRemove).sort((a, b) => a - b);
      for (const record of this.records) {
        let lo = 0;
        let hi = sorted.length;
        while (lo < hi) {
          const mid = lo + hi >>> 1;
          if (sorted[mid] < record.i) lo = mid + 1;
          else hi = mid;
        }
        record.i -= lo;
      }
    }
    getValueForItemAtKeyId(item, keyId) {
      return item[this._keysMap[keyId]];
    }
    size() {
      return this.records.length;
    }
    _createStringRecord(doc, docIndex) {
      if (!isDefined(doc) || isBlank(doc)) return null;
      return {
        v: doc,
        i: docIndex,
        n: this.norm.get(doc)
      };
    }
    _createObjectRecord(doc, docIndex) {
      const record = {
        i: docIndex,
        $: {}
      };
      for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
        const key = this.keys[keyIndex];
        const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
        if (!isDefined(value)) continue;
        if (isArray2(value)) {
          const subRecords = [];
          for (let i = 0, len = value.length; i < len; i += 1) {
            const item = value[i];
            if (!isDefined(item)) continue;
            if (isString(item)) {
              if (!isBlank(item)) {
                const subRecord = {
                  v: item,
                  i,
                  n: this.norm.get(item)
                };
                subRecords.push(subRecord);
              }
            } else if (isDefined(item.v)) {
              const text = isString(item.v) ? item.v : toString(item.v);
              if (!isBlank(text)) {
                const subRecord = {
                  v: text,
                  i: item.i,
                  n: this.norm.get(text)
                };
                subRecords.push(subRecord);
              }
            }
          }
          record.$[keyIndex] = subRecords;
        } else if (isString(value) && !isBlank(value)) {
          const subRecord = {
            v: value,
            n: this.norm.get(value)
          };
          record.$[keyIndex] = subRecord;
        }
      }
      return record;
    }
    toJSON() {
      return {
        keys: this.keys.map(({ getFn, ...key }) => key),
        records: this.records
      };
    }
  };
  function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const { keys, records } = data;
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }
  function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
    const indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
    for (let len = matchmask.length; i < len; i += 1) {
      const match = matchmask[i];
      if (match && start === -1) start = i;
      else if (!match && start !== -1) {
        end = i - 1;
        if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
        start = -1;
      }
    }
    if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
    return indices;
  }
  function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
    if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
    const patternLen = pattern.length;
    const textLen = text.length;
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    let currentThreshold = threshold;
    let bestLocation = expectedLocation;
    const calcScore = (errors, currentLocation) => {
      const accuracy = errors / patternLen;
      if (ignoreLocation) return accuracy;
      const proximity = Math.abs(expectedLocation - currentLocation);
      if (!distance) return proximity ? 1 : accuracy;
      return accuracy + proximity / distance;
    };
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    const matchMask = computeMatches ? Array(textLen) : [];
    let index;
    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      const score = calcScore(0, index);
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;
      if (computeMatches) {
        let i = 0;
        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    }
    bestLocation = -1;
    let lastBitArr = [];
    let finalScore = 1;
    let bestErrors = 0;
    let binMax = patternLen + textLen;
    const mask = 1 << patternLen - 1;
    for (let i = 0; i < patternLen; i += 1) {
      let binMin = 0;
      let binMid = binMax;
      while (binMin < binMid) {
        if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
        else binMax = binMid;
        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      }
      binMax = binMid;
      let start = Math.max(1, expectedLocation - binMid + 1);
      const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
      const bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << i) - 1;
      for (let j = finish; j >= start; j -= 1) {
        const currentLocation = j - 1;
        const charMatch = patternAlphabet[text[currentLocation]];
        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
        if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        if (bitArr[j] & mask) {
          finalScore = calcScore(i, currentLocation);
          if (finalScore <= currentThreshold) {
            currentThreshold = finalScore;
            bestLocation = currentLocation;
            bestErrors = i;
            if (bestLocation <= expectedLocation) break;
            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      }
      if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
      lastBitArr = bitArr;
    }
    if (computeMatches && bestLocation >= 0) {
      const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
      for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
    }
    const result = {
      isMatch: bestLocation >= 0,
      score: Math.max(1e-3, finalScore)
    };
    if (computeMatches) {
      const indices = convertMaskToIndices(matchMask, minMatchCharLength);
      if (!indices.length) result.isMatch = false;
      else if (includeMatches) result.indices = indices;
    }
    return result;
  }
  function createPatternAlphabet(pattern) {
    const mask = {};
    for (let i = 0, len = pattern.length; i < len; i += 1) {
      const char = pattern.charAt(i);
      mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
  }
  function mergeIndices(indices) {
    if (indices.length <= 1) return indices;
    indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const merged = [indices[0]];
    for (let i = 1, len = indices.length; i < len; i += 1) {
      const last = merged[merged.length - 1];
      const curr = indices[i];
      if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
      else merged.push(curr);
    }
    return merged;
  }
  var NON_DECOMPOSABLE_MAP = {
    "\u0142": "l",
    "\u0141": "L",
    "\u0111": "d",
    "\u0110": "D",
    "\xF8": "o",
    "\xD8": "O",
    "\u0127": "h",
    "\u0126": "H",
    "\u0167": "t",
    "\u0166": "T",
    "\u0131": "i",
    "\xDF": "ss"
  };
  var NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
  var stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;
  var BitapSearch = class {
    constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
      this.options = {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreDiacritics,
        ignoreLocation
      };
      pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
      this.pattern = pattern;
      this.chunks = [];
      if (!this.pattern.length) return;
      const addChunk = (pattern2, startIndex) => {
        this.chunks.push({
          pattern: pattern2,
          alphabet: createPatternAlphabet(pattern2),
          startIndex
        });
      };
      const len = this.pattern.length;
      if (len > 32) {
        let i = 0;
        const remainder = len % 32;
        const end = len - remainder;
        while (i < end) {
          addChunk(this.pattern.substr(i, 32), i);
          i += 32;
        }
        if (remainder) {
          const startIndex = len - 32;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else addChunk(this.pattern, 0);
    }
    searchIn(text) {
      const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
      text = isCaseSensitive ? text : text.toLowerCase();
      text = ignoreDiacritics ? stripDiacritics(text) : text;
      if (this.pattern === text) {
        if (text.length < this.options.minMatchCharLength) return {
          isMatch: false,
          score: 1
        };
        const result2 = {
          isMatch: true,
          score: 0
        };
        if (includeMatches) result2.indices = [[0, text.length - 1]];
        return result2;
      }
      const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
      const allIndices = [];
      let totalScore = 0;
      let hasMatches = false;
      this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
        const { isMatch, score, indices } = search(text, pattern, alphabet, {
          location: location + startIndex,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength,
          includeMatches,
          ignoreLocation
        });
        if (isMatch) hasMatches = true;
        totalScore += score;
        if (isMatch && indices) allIndices.push(...indices);
      });
      const result = {
        isMatch: hasMatches,
        score: hasMatches ? totalScore / this.chunks.length : 1
      };
      if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
      return result;
    }
  };
  var MULTI_MATCH_TYPES = /* @__PURE__ */ new Set(["fuzzy", "include"]);
  function isInverse(type) {
    return type.startsWith("inverse");
  }
  var matchers = [
    {
      type: "exact",
      multiRegex: /^="(.*)"$/,
      singleRegex: /^=(.*)$/,
      create: (pattern) => ({
        type: "exact",
        search(text) {
          const isMatch = text === pattern;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, pattern.length - 1]
          };
        }
      })
    },
    {
      type: "include",
      multiRegex: /^'"(.*)"$/,
      singleRegex: /^'(.*)$/,
      create: (pattern) => ({
        type: "include",
        search(text) {
          let location = 0;
          let index;
          const indices = [];
          const patternLen = pattern.length;
          while ((index = text.indexOf(pattern, location)) > -1) {
            location = index + patternLen;
            indices.push([index, location - 1]);
          }
          const isMatch = !!indices.length;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices
          };
        }
      })
    },
    {
      type: "prefix-exact",
      multiRegex: /^\^"(.*)"$/,
      singleRegex: /^\^(.*)$/,
      create: (pattern) => ({
        type: "prefix-exact",
        search(text) {
          const isMatch = text.startsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, pattern.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-prefix-exact",
      multiRegex: /^!\^"(.*)"$/,
      singleRegex: /^!\^(.*)$/,
      create: (pattern) => ({
        type: "inverse-prefix-exact",
        search(text) {
          const isMatch = !text.startsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-suffix-exact",
      multiRegex: /^!"(.*)"\$$/,
      singleRegex: /^!(.*)\$$/,
      create: (pattern) => ({
        type: "inverse-suffix-exact",
        search(text) {
          const isMatch = !text.endsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "suffix-exact",
      multiRegex: /^"(.*)"\$$/,
      singleRegex: /^(.*)\$$/,
      create: (pattern) => ({
        type: "suffix-exact",
        search(text) {
          const isMatch = text.endsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [text.length - pattern.length, text.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-exact",
      multiRegex: /^!"(.*)"$/,
      singleRegex: /^!(.*)$/,
      create: (pattern) => ({
        type: "inverse-exact",
        search(text) {
          const isMatch = text.indexOf(pattern) === -1;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "fuzzy",
      multiRegex: /^"(.*)"$/,
      singleRegex: /^(.*)$/,
      create: (pattern, options = {}) => {
        const bitap = new BitapSearch(pattern, {
          location: options.location ?? Config.location,
          threshold: options.threshold ?? Config.threshold,
          distance: options.distance ?? Config.distance,
          includeMatches: options.includeMatches ?? Config.includeMatches,
          findAllMatches: options.findAllMatches ?? Config.findAllMatches,
          minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
          isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
          ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
          ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
        });
        return {
          type: "fuzzy",
          search(text) {
            return bitap.searchIn(text);
          }
        };
      }
    }
  ];
  var matchersLen = matchers.length;
  var ESCAPED_PIPE = "\0";
  var OR_TOKEN = "|";
  function tokenize(pattern) {
    const tokens = [];
    const len = pattern.length;
    let i = 0;
    while (i < len) {
      while (i < len && pattern[i] === " ") i++;
      if (i >= len) break;
      let j = i;
      while (j < len && pattern[j] !== " " && pattern[j] !== '"') j++;
      if (j < len && pattern[j] === '"') {
        j++;
        while (j < len) {
          if (pattern[j] === '"') {
            const next = j + 1;
            if (next >= len || pattern[next] === " ") {
              j++;
              break;
            }
            if (pattern[next] === "$" && (next + 1 >= len || pattern[next + 1] === " ")) {
              j += 2;
              break;
            }
          }
          j++;
        }
        tokens.push(pattern.substring(i, j));
        i = j;
      } else {
        while (j < len && pattern[j] !== " ") j++;
        tokens.push(pattern.substring(i, j));
        i = j;
      }
    }
    return tokens;
  }
  function getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }
  function parseQuery(pattern, options = {}) {
    return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
      const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item2) => item2 && !!item2.trim());
      const results = [];
      for (let i = 0, len = query.length; i < len; i += 1) {
        const queryItem = query[i];
        let found = false;
        let idx = -1;
        while (!found && ++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.multiRegex);
          if (token) {
            results.push(def.create(token, options));
            found = true;
          }
        }
        if (found) continue;
        idx = -1;
        while (++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.singleRegex);
          if (token) {
            results.push(def.create(token, options));
            break;
          }
        }
      }
      return results;
    });
  }
  var ExtendedSearch = class {
    constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
      this.query = null;
      this.options = {
        isCaseSensitive,
        ignoreDiacritics,
        includeMatches,
        minMatchCharLength,
        findAllMatches,
        ignoreLocation,
        location,
        threshold,
        distance
      };
      pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
      this.pattern = pattern;
      this.query = parseQuery(this.pattern, this.options);
    }
    static condition(_, options) {
      return options.useExtendedSearch;
    }
    searchIn(text) {
      const query = this.query;
      if (!query) return {
        isMatch: false,
        score: 1
      };
      const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
      text = isCaseSensitive ? text : text.toLowerCase();
      text = ignoreDiacritics ? stripDiacritics(text) : text;
      let numMatches = 0;
      const allIndices = [];
      let totalScore = 0;
      let hasInverse = false;
      for (let i = 0, qLen = query.length; i < qLen; i += 1) {
        const searchers = query[i];
        allIndices.length = 0;
        numMatches = 0;
        hasInverse = false;
        for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
          const matcher = searchers[j];
          const { isMatch, indices, score } = matcher.search(text);
          if (isMatch) {
            numMatches += 1;
            totalScore += score;
            if (isInverse(matcher.type)) hasInverse = true;
            if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
            else allIndices.push(indices);
          } else {
            totalScore = 0;
            numMatches = 0;
            allIndices.length = 0;
            hasInverse = false;
            break;
          }
        }
        if (numMatches) {
          const result = {
            isMatch: true,
            score: totalScore / numMatches
          };
          if (hasInverse) result.hasInverse = true;
          if (includeMatches) result.indices = mergeIndices(allIndices);
          return result;
        }
      }
      return {
        isMatch: false,
        score: 1
      };
    }
  };
  var registeredSearchers = [];
  function register(...args) {
    registeredSearchers.push(...args);
  }
  function createSearcher(pattern, options) {
    for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
      const searcherClass = registeredSearchers[i];
      if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new BitapSearch(pattern, options);
  }
  var LogicalOperator = {
    AND: "$and",
    OR: "$or"
  };
  var KeyType = {
    PATH: "$path",
    PATTERN: "$val"
  };
  var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  var isPath = (query) => !!query[KeyType.PATH];
  var isLeaf = (query) => !isArray2(query) && isObject(query) && !isExpression(query);
  var convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
  function parse3(query, options, { auto = true } = {}) {
    const next = (query2) => {
      if (isString(query2)) {
        const obj = {
          keyId: null,
          pattern: query2
        };
        if (auto) obj.searcher = createSearcher(query2, options);
        return obj;
      }
      const keys = Object.keys(query2);
      const isQueryPath = isPath(query2);
      if (!isQueryPath && keys.length > 1 && !isExpression(query2)) return next(convertToExplicit(query2));
      if (isLeaf(query2)) {
        const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
        const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
        if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        const obj = {
          keyId: createKeyId(key),
          pattern
        };
        if (auto) obj.searcher = createSearcher(pattern, options);
        return obj;
      }
      const node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach((key) => {
        const value = query2[key];
        if (isArray2(value)) value.forEach((item) => {
          node.children.push(next(item));
        });
      });
      return node;
    };
    if (!isExpression(query)) query = convertToExplicit(query);
    return next(query);
  }
  function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    let totalScore = 1;
    matches.forEach(({ key, norm: norm2, score }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
    });
    return totalScore;
  }
  function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    results.forEach((result) => {
      result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
    });
  }
  var MaxHeap = class {
    constructor(limit, comparator) {
      this.limit = limit;
      this.heap = [];
      this.comparator = comparator;
    }
    get size() {
      return this.heap.length;
    }
    insert(item) {
      if (this.size < this.limit) {
        this.heap.push(item);
        this._bubbleUp(this.size - 1);
      } else if (this.comparator(item, this.heap[0]) < 0) {
        this.heap[0] = item;
        this._sinkDown(0);
      }
    }
    extractSorted() {
      return this.heap.sort(this.comparator);
    }
    _bubbleUp(i) {
      const heap = this.heap;
      while (i > 0) {
        const parent = i - 1 >> 1;
        if (this.comparator(heap[i], heap[parent]) <= 0) break;
        const tmp = heap[i];
        heap[i] = heap[parent];
        heap[parent] = tmp;
        i = parent;
      }
    }
    _sinkDown(i) {
      const heap = this.heap;
      const len = heap.length;
      let largest = i;
      do {
        i = largest;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < len && this.comparator(heap[left], heap[largest]) > 0) largest = left;
        if (right < len && this.comparator(heap[right], heap[largest]) > 0) largest = right;
        if (largest !== i) {
          const tmp = heap[i];
          heap[i] = heap[largest];
          heap[largest] = tmp;
        }
      } while (largest !== i);
    }
  };
  function formatMatches(result) {
    const matches = [];
    result.matches.forEach((match) => {
      if (!isDefined(match.indices) || !match.indices.length) return;
      const obj = {
        indices: match.indices,
        value: match.value
      };
      if (match.key) obj.key = match.key.id;
      if (match.idx > -1) obj.refIndex = match.idx;
      matches.push(obj);
    });
    return matches;
  }
  function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
    return results.map((result) => {
      const { idx } = result;
      const data = {
        item: docs[idx],
        refIndex: idx
      };
      if (includeMatches) data.matches = formatMatches(result);
      if (includeScore) data.score = result.score;
      return data;
    });
  }
  var DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
  var warned = /* @__PURE__ */ new WeakSet();
  function warnNonGlobal(regex) {
    if (!warned.has(regex)) {
      warned.add(regex);
      console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
    }
  }
  function resolveTokenize(tokenize2) {
    if (typeof tokenize2 === "function") {
      let validated = false;
      return (text) => {
        const result = tokenize2(text);
        if (!validated) {
          validated = true;
          if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
        }
        return result;
      };
    }
    if (tokenize2 instanceof RegExp) {
      if (!tokenize2.global) warnNonGlobal(tokenize2);
      return (text) => text.match(tokenize2) || [];
    }
    return (text) => text.match(DEFAULT_TOKEN) || [];
  }
  function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize: tokenize2 } = {}) {
    const tokenizeFn = resolveTokenize(tokenize2);
    return { tokenize(text) {
      if (!isCaseSensitive) text = text.toLowerCase();
      if (ignoreDiacritics) text = stripDiacritics(text);
      return tokenizeFn(text);
    } };
  }
  var TokenSearch = class {
    static condition(_, options) {
      return options.useTokenSearch;
    }
    constructor(pattern, options) {
      this.options = options;
      this.analyzer = createAnalyzer({
        isCaseSensitive: options.isCaseSensitive,
        ignoreDiacritics: options.ignoreDiacritics,
        tokenize: options.tokenize
      });
      const queryTerms = this.analyzer.tokenize(pattern);
      const { df, fieldCount } = options._invertedIndex;
      this.termSearchers = [];
      this.idfWeights = [];
      for (const term of queryTerms) {
        this.termSearchers.push(new BitapSearch(term, {
          location: options.location,
          threshold: options.threshold,
          distance: options.distance,
          includeMatches: options.includeMatches,
          findAllMatches: options.findAllMatches,
          minMatchCharLength: options.minMatchCharLength,
          isCaseSensitive: options.isCaseSensitive,
          ignoreDiacritics: options.ignoreDiacritics,
          ignoreLocation: true
        }));
        const docFreq = df.get(term) || 0;
        const idf = Math.log(1 + (fieldCount - docFreq + 0.5) / (docFreq + 0.5));
        this.idfWeights.push(idf);
      }
      this.combineAll = options.tokenMatch === "all";
      this.numTerms = this.termSearchers.length;
      this.useMask = this.numTerms <= 31;
    }
    searchIn(text) {
      if (!this.termSearchers.length) return {
        isMatch: false,
        score: 1
      };
      const allIndices = [];
      let weightedScore = 0;
      let maxPossibleScore = 0;
      let matchedCount = 0;
      let matchedMask = 0;
      const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
      for (let i = 0; i < this.termSearchers.length; i++) {
        const result = this.termSearchers[i].searchIn(text);
        const idf = this.idfWeights[i];
        maxPossibleScore += idf;
        if (result.isMatch) {
          matchedCount++;
          weightedScore += idf * (1 - result.score);
          if (result.indices) allIndices.push(...result.indices);
          if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
          else matchedTerms.add(i);
        }
      }
      if (matchedCount === 0) return {
        isMatch: false,
        score: 1
      };
      const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
      const searchResult = {
        isMatch: true,
        score: Math.max(1e-3, normalized)
      };
      if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
      if (this.combineAll) {
        if (this.useMask) searchResult.matchedMask = matchedMask;
        else searchResult.matchedTerms = matchedTerms;
        searchResult.termCount = this.numTerms;
      }
      return searchResult;
    }
  };
  function addField(index, text, docIdx, analyzer) {
    const tokens = analyzer.tokenize(text);
    if (!tokens.length) return;
    index.fieldCount++;
    index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
    const distinctTerms = new Set(tokens);
    let perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) {
      perDocTerms = /* @__PURE__ */ new Map();
      index.docTermFieldHits.set(docIdx, perDocTerms);
    }
    for (const term of distinctTerms) {
      perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
      index.df.set(term, (index.df.get(term) || 0) + 1);
    }
  }
  function ingestRecord(index, record, keyCount, analyzer) {
    const { i: docIdx, v, $: fields } = record;
    if (v !== void 0) {
      addField(index, v, docIdx, analyzer);
      return;
    }
    if (!fields) return;
    for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
      const value = fields[keyIdx];
      if (!value) continue;
      if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
      else addField(index, value.v, docIdx, analyzer);
    }
  }
  function buildInvertedIndex(records, keyCount, analyzer) {
    const index = {
      fieldCount: 0,
      df: /* @__PURE__ */ new Map(),
      docFieldCount: /* @__PURE__ */ new Map(),
      docTermFieldHits: /* @__PURE__ */ new Map()
    };
    for (const record of records) ingestRecord(index, record, keyCount, analyzer);
    return index;
  }
  function addToInvertedIndex(index, record, keyCount, analyzer) {
    ingestRecord(index, record, keyCount, analyzer);
  }
  function removeFromInvertedIndex(index, docIdx) {
    const fieldCount = index.docFieldCount.get(docIdx);
    if (fieldCount === void 0) return;
    index.fieldCount -= fieldCount;
    index.docFieldCount.delete(docIdx);
    const perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) return;
    for (const [term, hits] of perDocTerms) {
      const next = (index.df.get(term) || 0) - hits;
      if (next <= 0) index.df.delete(term);
      else index.df.set(term, next);
    }
    index.docTermFieldHits.delete(docIdx);
  }
  function removeAndShiftInvertedIndex(index, removedIndices) {
    if (removedIndices.length === 0) return;
    const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
    for (const idx of sorted) removeFromInvertedIndex(index, idx);
    const shift = (oldIdx) => {
      let lo = 0;
      let hi = sorted.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (sorted[mid] < oldIdx) lo = mid + 1;
        else hi = mid;
      }
      return oldIdx - lo;
    };
    const firstRemoved = sorted[0];
    const shiftedDocFieldCount = /* @__PURE__ */ new Map();
    for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
    index.docFieldCount = shiftedDocFieldCount;
    const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
    for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
    index.docTermFieldHits = shiftedDocTermFieldHits;
  }
  var Fuse = class {
    constructor(docs, options, index) {
      this.options = {
        ...Config,
        ...options
      };
      if (this.options.useExtendedSearch && false) ;
      if (this.options.useTokenSearch && false) ;
      this._keyStore = new KeyStore(this.options.keys);
      this._docs = docs;
      this._myIndex = null;
      this._invertedIndex = null;
      this.setCollection(docs, index);
      this._lastQuery = null;
      this._lastSearcher = null;
    }
    _getSearcher(query) {
      if (this._lastQuery === query) return this._lastSearcher;
      const searcher = createSearcher(query, this._invertedIndex ? {
        ...this.options,
        _invertedIndex: this._invertedIndex
      } : this.options);
      this._lastQuery = query;
      this._lastSearcher = searcher;
      return searcher;
    }
    setCollection(docs, index) {
      this._docs = docs;
      if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
      this._myIndex = index || createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
      if (this.options.useTokenSearch) {
        const analyzer = createAnalyzer({
          isCaseSensitive: this.options.isCaseSensitive,
          ignoreDiacritics: this.options.ignoreDiacritics,
          tokenize: this.options.tokenize
        });
        this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
      }
      this._invalidateSearcherCache();
    }
    add(doc) {
      if (!isDefined(doc)) return;
      this._docs.push(doc);
      const record = this._myIndex.add(doc, this._docs.length - 1);
      if (this._invertedIndex && record) {
        const analyzer = createAnalyzer({
          isCaseSensitive: this.options.isCaseSensitive,
          ignoreDiacritics: this.options.ignoreDiacritics,
          tokenize: this.options.tokenize
        });
        addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
      }
      this._invalidateSearcherCache();
    }
    remove(predicate = () => false) {
      const results = [];
      const indicesToRemove = [];
      for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
        results.push(this._docs[i]);
        indicesToRemove.push(i);
      }
      if (indicesToRemove.length) {
        if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
        const toRemove = new Set(indicesToRemove);
        this._docs = this._docs.filter((_, i) => !toRemove.has(i));
        this._myIndex.removeAll(indicesToRemove);
        this._invalidateSearcherCache();
      }
      return results;
    }
    removeAt(idx) {
      if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
      if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
      const doc = this._docs.splice(idx, 1)[0];
      this._myIndex.removeAt(idx);
      this._invalidateSearcherCache();
      return doc;
    }
    _invalidateSearcherCache() {
      this._lastQuery = null;
      this._lastSearcher = null;
    }
    getIndex() {
      return this._myIndex;
    }
    _normalizedKeys() {
      return this._myIndex.keys.map((key) => this._keyStore.get(key.id) || key);
    }
    search(query, options) {
      const { limit = -1 } = options || {};
      const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
      if (isString(query) && !query.trim()) {
        let docs = this._docs.map((item, idx) => ({
          item,
          refIndex: idx
        }));
        if (isNumber(limit) && limit > -1) docs = docs.slice(0, limit);
        return docs;
      }
      const useHeap = shouldSort && isNumber(limit) && limit > 0 && isString(query);
      const comparator = sortFn;
      const stable = (a, b) => comparator(a, b) || a.idx - b.idx;
      let results;
      if (useHeap) {
        const heap = new MaxHeap(limit, stable);
        if (isString(this._docs[0])) this._searchStringList(query, {
          heap,
          ignoreFieldNorm
        });
        else this._searchObjectList(query, {
          heap,
          ignoreFieldNorm
        });
        results = heap.extractSorted();
      } else {
        results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        computeScore(results, { ignoreFieldNorm });
        if (shouldSort) results.sort(isString(query) ? stable : comparator);
        if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
      }
      return format(results, this._docs, {
        includeMatches,
        includeScore
      });
    }
    _searchStringList(query, { heap, ignoreFieldNorm } = {}) {
      const searcher = this._getSearcher(query);
      const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
      const { records } = this._myIndex;
      const results = heap ? null : [];
      records.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) return;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            value: text,
            norm: norm2,
            indices: searchResult.indices
          };
          if (requireAllTokens) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          const matches = [match];
          if (!requireAllTokens || this._coversAllTokens(matches)) {
            const result = {
              item: text,
              idx,
              matches
            };
            if (heap) {
              result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
              heap.insert(result);
            } else results.push(result);
          }
        }
      });
      return results;
    }
    _searchLogical(query) {
      const expression = parse3(query, this.options);
      const keys = this._normalizedKeys();
      const evaluate = (node, item, idx) => {
        if (!("children" in node)) {
          const { keyId, searcher } = node;
          let matches;
          if (keyId === null) {
            matches = [];
            keys.forEach((key, keyIndex) => {
              matches.push(...this._findMatches({
                key,
                value: item[keyIndex],
                searcher
              }));
            });
          } else matches = this._findMatches({
            key: this._keyStore.get(keyId),
            value: this._myIndex.getValueForItemAtKeyId(item, keyId),
            searcher
          });
          if (matches && matches.length) return [{
            idx,
            item,
            matches
          }];
          return [];
        }
        const { children, operator } = node;
        const res = [];
        for (let i = 0, len = children.length; i < len; i += 1) {
          const child = children[i];
          const result = evaluate(child, item, idx);
          if (result.length) res.push(...result);
          else if (operator === LogicalOperator.AND) return [];
        }
        return res;
      };
      const records = this._myIndex.records;
      const resultMap = /* @__PURE__ */ new Map();
      const results = [];
      records.forEach(({ $: item, i: idx }) => {
        if (isDefined(item)) {
          const expResults = evaluate(expression, item, idx);
          if (expResults.length) {
            if (!resultMap.has(idx)) {
              resultMap.set(idx, {
                idx,
                item,
                matches: []
              });
              results.push(resultMap.get(idx));
            }
            expResults.forEach(({ matches }) => {
              resultMap.get(idx).matches.push(...matches);
            });
          }
        }
      });
      return results;
    }
    _searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
      const searcher = this._getSearcher(query);
      const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
      const { records } = this._myIndex;
      const keys = this._normalizedKeys();
      const results = heap ? null : [];
      records.forEach(({ $: item, i: idx }) => {
        if (!isDefined(item)) return;
        const matches = [];
        let anyKeyFailed = false;
        let hasInverse = false;
        keys.forEach((key, keyIndex) => {
          const keyMatches = this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          });
          if (keyMatches.length) {
            matches.push(...keyMatches);
            if (keyMatches[0].hasInverse) hasInverse = true;
          } else anyKeyFailed = true;
        });
        if (hasInverse && anyKeyFailed) return;
        if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
          const result = {
            idx,
            item,
            matches
          };
          if (heap) {
            result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
            heap.insert(result);
          } else results.push(result);
        }
      });
      return results;
    }
    _findMatches({ key, value, searcher }) {
      if (!isDefined(value)) return [];
      const matches = [];
      if (isArray2(value)) value.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) return;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            key,
            value: text,
            idx,
            norm: norm2,
            indices: searchResult.indices,
            hasInverse: searchResult.hasInverse
          };
          if (searchResult.termCount !== void 0) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          matches.push(match);
        }
      });
      else {
        const { v: text, n: norm2 } = value;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            key,
            value: text,
            norm: norm2,
            indices: searchResult.indices,
            hasInverse: searchResult.hasInverse
          };
          if (searchResult.termCount !== void 0) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          matches.push(match);
        }
      }
      return matches;
    }
    _coversAllTokens(matches) {
      const termCount = matches.length ? matches[0].termCount : void 0;
      if (termCount === void 0) return true;
      if (termCount <= 31) {
        let coverage2 = 0;
        for (let i = 0; i < matches.length; i++) coverage2 |= matches[i].matchedMask || 0;
        return coverage2 === 2 ** termCount - 1;
      }
      const coverage = /* @__PURE__ */ new Set();
      for (let i = 0; i < matches.length; i++) {
        const terms = matches[i].matchedTerms;
        if (terms) for (const t of terms) coverage.add(t);
      }
      return coverage.size === termCount;
    }
  };
  Fuse.version = "7.5.0";
  Fuse.createIndex = createIndex;
  Fuse.parseIndex = parseIndex;
  Fuse.config = Config;
  Fuse.match = function(pattern, text, options) {
    if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
    return createSearcher(pattern, {
      ...Config,
      ...options
    }).searchIn(text);
  };
  Fuse.parseQuery = parse3;
  register(ExtendedSearch);
  register(TokenSearch);
  Fuse.use = function(...plugins) {
    plugins.forEach((plugin) => register(plugin));
  };
  var entry_default = Fuse;

  // ns-hugo-params:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\engine.ts
  var engine_default = { fuse: { ignoreLocation: true }, maxResults: 100, paginate: 10, resultContentWordCount: 240 };

  // ns-hugo-imp:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\engine.ts
  var Engine = class {
    fuse;
    pages = [];
    indices = [];
    constructor(form, callback) {
      document.querySelectorAll('meta[name="search-index"]').forEach((el) => {
        this.indices.push(el.getAttribute("content"));
      });
      const options = Object.assign(engine_default.fuse, {
        useExtendedSearch: true,
        includeMatches: true,
        includeScore: true,
        keys: [
          "title",
          "content",
          "lang",
          "authors_titles",
          "categories_titles",
          "series_titles",
          "tags_titles"
        ]
      });
      console.debug("fuse.js options", options);
      const promises = [];
      for (const i in this.indices) {
        promises.push(
          fetch(this.indices[i], {
            method: "GET"
          }).then((response) => {
            return response.json();
          })
        );
      }
      Promise.all(promises).then((values) => {
        this.fuse = new entry_default([], options);
        const taxonomies = ["authors", "categories", "series", "tags"];
        for (const i in values) {
          for (const j in values[i]) {
            const value = values[i][j];
            for (const k in taxonomies) {
              const name = taxonomies[k];
              if (name in value) {
                value[name + "_titles"] = value[name].map((item) => item.title).join(" ");
              } else {
                value[name + "_titles"] = "";
              }
            }
            this.fuse.add(value);
            this.pages.push({
              timestamp: value["timestamp"]
            });
          }
        }
        callback(form.data());
      }).catch((err) => {
        console.error("unable to load search index", err);
      });
    }
    sortByDate(a, b, asc = true) {
      if (!(a.idx in this.pages)) {
        return 1;
      }
      if (!(b.idx in this.pages)) {
        return -1;
      }
      return this.pages[a.idx].timestamp < this.pages[b.idx].timestamp ? asc ? -1 : 1 : asc ? 1 : -1;
    }
    sortByScore(a, b) {
      return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
    }
    search(data) {
      switch (data.get("sort")) {
        case "date asc":
          this.fuse.options.sortFn = (a, b) => this.sortByDate(a, b);
          break;
        case "date desc":
          this.fuse.options.sortFn = (a, b) => {
            return this.sortByDate(a, b, false);
          };
          break;
        default:
          this.fuse.options.sortFn = this.sortByScore;
          break;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          const q = {
            $and: [
              {
                $or: [{ title: data.get("q") }, { content: data.get("q") }]
              }
            ]
          };
          const author = data.get("author");
          if (author) {
            q.$and.push({ authors_titles: author });
          }
          const category = data.get("category");
          if (category) {
            q.$and.push({ categories_titles: category });
          }
          const series = data.get("series");
          if (series) {
            q.$and.push({ series_titles: series });
          }
          const tag = data.get("tag");
          if (tag) {
            q.$and.push({ tags_titles: tag });
          }
          const lang = data.get("lang");
          if (lang) {
            q.$and.push({ lang: "=" + lang });
          }
          resolve(
            this.fuse.search(q, {
              limit: parseInt(engine_default.maxResults)
            })
          );
        }, 1);
      });
    }
  };
  var engine_default2 = Engine;

  // ns-hugo-imp:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\form.ts
  var Form = class {
    constructor(form, callback) {
      this.form = form;
      this.callback = callback;
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submit();
      });
      this.input = form.querySelector('input[name="q"]');
      if (this.input.value === "") {
        this.input.value = new URLSearchParams(window.location.search).get("q");
      }
      this.lang = form.querySelector('select[name="lang"]');
      this.lang.addEventListener("change", () => {
        this.submit();
      });
      form.querySelector("#sorting-select").addEventListener("change", () => {
        this.submit();
      });
    }
    callback;
    input;
    lang;
    submit() {
      this.callback(this.data());
    }
    data() {
      return new FormData(this.form);
    }
  };
  var form_default = Form;

  // ns-hugo-params:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\search.ts
  var search_default = { fuse: { ignoreLocation: true }, maxResults: 100, paginate: 10, resultContentWordCount: 240 };

  // ns-hugo-imp:C:\Users\xiaochai_123\Desktop\myblog\themes\hugo-theme-bootstrap\assets\search\search.ts
  var Search = class _Search {
    resultsElement;
    stat;
    highlightOptions = {
      element: "span",
      className: "text-primary"
    };
    tmplMissingKeywords;
    tmplNoResults;
    tmplStat;
    tmplResult;
    page = 1;
    results;
    loading = false;
    loadingSpinner;
    loadMore;
    title = "";
    form;
    engine;
    meta = "";
    constructor(form) {
      this.meta = document.querySelector('meta[name="search-meta"]').getAttribute("content");
      this.form = new form_default(form, (data) => {
        this.search(data);
      });
      this.engine = new engine_default2(this.form, (data) => {
        this.search(data);
      });
      this.title = document.title;
    }
    run() {
      this.resultsElement = document.getElementById("searchResults");
      this.stat = document.getElementById("searchStat");
      this.loadingSpinner = document.getElementById("loadingSpinner");
      this.tmplMissingKeywords = document.getElementById(
        "templateMissingKeywords"
      ).innerHTML;
      this.tmplNoResults = document.getElementById("templateNoResults").innerHTML;
      this.tmplStat = document.getElementById("templateStat").innerHTML;
      this.tmplResult = document.getElementById("templateResult").innerHTML;
      this.loadMore = document.getElementById("btnLoadMore");
      this.loadMore.addEventListener("click", () => {
        this.showLoadingSpinner();
        this.poplateResults().finally(() => {
          this.hideLoadingSpinner();
        });
      });
      fetch(this.meta).then((response) => {
        return response.json();
      }).then((data) => {
        for (const i in data) {
          const datalist = document.querySelector(`#${i}-list`);
          const terms = data[i];
          for (const j in terms) {
            const option = document.createElement("option");
            option.value = terms[j];
            datalist.appendChild(option);
          }
        }
      }).catch((err) => {
        console.error("unable to load search meta index", err);
      });
    }
    hideLoadMoreBtn() {
      this.loadMore.classList.add("d-none");
    }
    showLoadMoreBtn() {
      this.loadMore.classList.remove("d-none");
    }
    hideLoadingSpinner() {
      if (!this.loadingSpinner.classList.contains("d-none")) {
        this.loadingSpinner.classList.add("d-none");
      }
    }
    showLoadingSpinner() {
      this.loadingSpinner.classList.remove("d-none");
    }
    search(data) {
      this.resultsElement.innerHTML = "";
      this.showLoadingSpinner();
      if (!data.has("q")) {
        this.stat.innerHTML = this.tmplMissingKeywords;
        this.hideLoadMoreBtn();
        this.hideLoadingSpinner();
        return;
      }
      this.setPage(data.get("q"));
      this.engine.search(data).then((results) => {
        this.page = 1;
        this.results = results;
        if (this.results.length > search_default.paginate) {
          this.showLoadMoreBtn();
        } else {
          this.hideLoadMoreBtn();
        }
      }).then(() => {
        if (this.results.length > 0) {
          this.poplateResultsInternal();
        } else {
          this.stat.innerHTML = this.tmplNoResults;
        }
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        this.hideLoadingSpinner();
      });
    }
    setPage(query) {
      const title = (query ? `${query} - ` : "") + this.title;
      const url = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
      window.history.pushState(null, title, url);
      document.title = title;
    }
    static normalizeTaxonomy(text, render3) {
      return render3(text).toLowerCase().replaceAll(" ", "-");
    }
    poplateResults() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.poplateResultsInternal());
        }, 1);
      });
    }
    poplateResultsInternal() {
      if (!this.results) {
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.loadMore.setAttribute("disabled", "");
      this.stat.innerHTML = mustache_default.render(this.tmplStat, {
        total: this.results.length
      });
      let i = (this.page - 1) * search_default.paginate;
      let count = 0;
      for (; i < this.results.length && count < search_default.paginate; i += 1, count += 1) {
        const result = this.results[i];
        const idx = (this.page - 1) * search_default.paginate + i;
        const titleKeywords = [];
        const contentKeywords = [];
        result.matches.forEach((match) => {
          match.indices.forEach((index) => {
            const keyword = match.value.substring(index[0], index[1] + 1);
            switch (match.key) {
              case "title":
                titleKeywords.push(keyword);
                break;
              case "content":
                contentKeywords.push(keyword);
                break;
              default:
            }
          });
        });
        let { content } = result.item;
        if (content.length > search_default.resultContentWordCount) {
          let contentStart = 0;
          if (contentKeywords.length > 0) {
            const pos = content.indexOf(contentKeywords[0]);
            if (pos + contentKeywords[0].length > search_default.resultContentWordCount - 1) {
              contentStart = pos;
            }
          }
          content = `${(contentStart === 0 ? "" : "...") + content.substring(
            contentStart,
            contentStart + search_default.resultContentWordCount
          )}...`;
        }
        const id = `searchResult${idx}`;
        this.resultsElement.insertAdjacentHTML(
          "beforeend",
          mustache_default.render(this.tmplResult, {
            title: result.item.title,
            content,
            id,
            img: result.item.img,
            smallImg: result.item.smallImg,
            largeImg: result.item.largeImg,
            permalink: result.item.permalink,
            categories: result.item.categories,
            authors: result.item.authors,
            tags: result.item.tags,
            series: result.item.series,
            score: _Search.formatScore(result.score),
            date: result.item.date,
            langName: result.item.langName,
            url() {
              return _Search.normalizeTaxonomy;
            }
          })
        );
        this.highlight(id, titleKeywords, contentKeywords);
      }
      this.loading = false;
      this.loadMore.removeAttribute("disabled");
      if (this.results.length <= search_default.paginate * this.page) {
        this.hideLoadMoreBtn();
      } else {
        this.showLoadMoreBtn();
      }
      this.page += 1;
      const event = document.createEvent("HTMLEvents");
      event.initEvent("hbs:viewer:update");
      document.dispatchEvent(event);
    }
    static formatScore(value) {
      return ((1 - value) * 5).toFixed(1);
    }
    highlight(id, titleKeywords, contentKeywords) {
      const titleHighlighter = new import_mark.default(
        document.querySelectorAll(`#${id} .search-result-title`)
      );
      titleHighlighter.mark(titleKeywords, this.highlightOptions);
      const contentHighlighter = new import_mark.default(
        document.querySelectorAll(`#${id} .search-result-content`)
      );
      contentHighlighter.mark(contentKeywords, this.highlightOptions);
    }
  };

  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    new Search(document.querySelector("#searchForm")).run();
  });
})();
/*! Bundled license information:

mark.js/dist/mark.js:
  (*!***************************************************
  * mark.js v8.11.1
  * https://markjs.io/
  * Copyright (c) 2014–2018, Julian Kühnel
  * Released under the MIT license https://git.io/vwTVl
  *****************************************************)

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
