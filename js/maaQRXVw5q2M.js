(function () {
  if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
    Promise.prototype.finally = function (callback) {
      var P = this.constructor || Promise;
      return this.then(
        function (value) {
          return P.resolve(callback && callback()).then(function () {
            return value;
          });
        },
        function (reason) {
          return P.resolve(callback && callback()).then(function () {
            throw reason;
          });
        }
      );
    };
  }

  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj);
      var i = ownProps.length;
      var resArray = new Array(i);
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }

  if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement, fromIndex) {
      var len = this == null ? 0 : this.length >>> 0;
      if (len === 0) return false;
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        var currentElement = this[k];
        if (currentElement === searchElement || (currentElement !== currentElement && searchElement !== searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    };
  }

  if (typeof window !== "undefined" && typeof window.CustomEvent !== "function") {
    var CustomEventPolyfill = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return customEvent;
    };
    CustomEventPolyfill.prototype = window.Event && window.Event.prototype;
    window.CustomEvent = CustomEventPolyfill;
  }
})();
