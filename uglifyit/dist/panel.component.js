(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.panelComponent = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

  function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var PanelComponent = /*#__PURE__*/function (_HTMLElement) {
    _inherits(PanelComponent, _HTMLElement);

    function PanelComponent() {
      _classCallCheck(this, PanelComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(PanelComponent).apply(this, arguments));
    }

    _createClass(PanelComponent, [{
      key: "getTemplate",
      value: function getTemplate() {
        var template = "\n    <ext-panel title='Sencha Help Chat' fitToParent layout='vbox' id='panel-component-root' extname='root'>\n      <ext-dataview extname=\"dataview\" height=\"300\"/></ext-dataview>\n      <ext-formpanel>\n        <ext-fieldset>\n          <ext-textfield\n              extname=\"first\"\n              required=\"true\"\n              placeholder=\"first name\">\n          </ext-textfield>\n          <ext-textfield\n              extname=\"message\"\n              required=\"true\"\n              placeholder=\"message\">\n          </ext-textfield>\n          <ext-button\n              extname=\"button\"\n              id=\"myget_button\"\n              text=\"Send Message\"\n              ui=\"\"\n              shadow=\"true\"\n              iconCls=\"\"\n              arrowAlign=\"bottom\">\n          </ext-button>\n        </ext-fieldset>\n      </ext-formpanel>\n    </ext-panel>\n";
        return template;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.innerHTML = this.getTemplate();

        this._addListeners();
      }
    }, {
      key: "_addListeners",
      value: function _addListeners() {
        var _this = this;

        this.querySelector('#panel-component-root').addEventListener('ready', function (event) {
          _this.onPageReady(event);
        });
        this.querySelector('#myget_button').addEventListener('tap', function (event) {
          _this.onButtonTap(event);
        });
      }
    }, {
      key: "onPageReady",
      value: function onPageReady(event) {
        for (var prop in event.detail.cmpObj) {
          this[prop] = event.detail.cmpObj[prop];
        }

        var h = this.root.getHeader();
        dragElement(h.el.dom);
        var itemTpl = '<div class="{who}"><div>{name}</div><div>{text}</div></div>';
        var store = [{
          who: 'mebubble',
          name: 'Marc',
          text: 'Hi, this is Marc, the architect for ExtReact'
        }, {
          who: 'mebubble',
          name: 'Marc',
          text: 'I am happy to answer any questions about our trial'
        } //{ who: 'mebubble', name: 'Marc', text: 'Who am I chatting with?' },
        // { who: 'thembubble', name: 'Egon', text: 'yes I did, just logging in' },
        // { who: 'mebubble', name: 'Marc', text: 'great, let me know how it goes' }
        ];
        this.dataview.setItemTpl(itemTpl);
        this.dataview.setStore(store);
      }
    }, {
      key: "onButtonTap",
      value: function onButtonTap(event) {
        this.dataview.getStore().add({
          who: 'thembubble',
          name: this.first.getValue(),
          text: this.message.getValue()
        });
        var scroller = this.dataview.getScrollable();
        scroller.scrollTo(Infinity, Infinity);
      }
    }]);

    return PanelComponent;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  window.customElements.define('panel-component', PanelComponent);

  function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      var elmntP = elmnt.parentNode.parentNode.parentNode;
      elmntP.style.top = elmntP.offsetTop - pos2 + "px";
      elmntP.style.left = elmntP.offsetLeft - pos1 + "px"; // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});