/*!
 * sycamore.js 0.3.0 - A decision tree based chat library.
 *
 * @author       Todd Armstrong <todd@toddarmstrong.com.au>
 * @homepage     https://github.com/toddarmstrong/sycamore.js#readme
 * @copyright    Copyright (c) 2018 Todd Armstrong <todd@toddarmstrong.com.au>
 * @license      MIT
 * @version      0.3.0
 */
! function (e, t) {   
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sycamore = t()
}(this, function () {
  "use strict";
  var e = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
    },
    t = function () {
      function t(e, t) {
        return r[e] = r[e] || [], r[e].push(t), this
      }

      function n(e, n) {
        return n._once = !0, t(e, n), this
      }

      function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return t ? r[e].splice(r[e].indexOf(t), 1) : delete r[e], this
      }

      function a(e) {
        for (var t = this, n = arguments.length, a = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) a[s - 1] = arguments[s];
        var o = r[e] && r[e].slice();
        return o && o.forEach(function (n) {
          n._once && i(e, n), n.apply(t, a)
        }), this
      }
      var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        r = Object.create(null);
      return e({}, s, {
        on: t,
        once: n,
        off: i,
        emit: a
      })
    },
    n = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    },
    i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    a = function (e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    },
    s = function () {
      function e(i) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        n(this, e), this.emitter = t();
        var s = void 0;
        s = a.speed && "number" == typeof a.speed && a.speed >= 1 ? a.speed : 5;
        var r = void 0;
        r = a.delay && "number" == typeof a.delay && a.delay >= 0 ? a.delay : 0;
        var o = void 0;
        o = !!(a.delayMinMax && Array.isArray(a.delayMinMax) && 2 === a.delayMinMax.length && a.delayMinMax[0] > 0 && a.delayMinMax[1] > 0 && a.delayMinMax[0] < a.delayMinMax[1]) && a.delayMinMax;
        var u = void 0;
        u = !(!a.firstMessage || "string" != typeof a.firstMessage) && a.firstMessage;
        var c = void 0;
        c = null === a.autoNext || "boolean" != typeof a.autoNext || a.autoNext, this.options = {
          speed: s,
          delay: r,
          delayMinMax: o,
          firstMessage: u,
          autoNext: c
        };
        var f = 6;
        if (this.charactersPerSecond = 2 * f * (this.options.speed / 10), this.currentQuestion = !1, this.nextMessage = !1, this.conversationFinished = !1, this.answeredData = [], this.variables = {}, i instanceof Array) this.data = i;
        else if (i) throw new Error("Data is not an array.");
        return this
      }
      return i(e, [{
        key: "init",
        value: function (e) {
          e ? this._findAndProcessDataObj(e) : this.options.firstMessage ? this._findAndProcessDataObj(this.options.firstMessage) : this._processDataObj(this.data[0])
        }
      }, {
        key: "answer",
        value: function (e) {
          this._answerQuestion(e)
        }
      }, {
        key: "next",
        value: function (e) {
          if (this.conversationFinished) throw new Error("Conversation has finished.");
          if (options.autoNext) throw new Error("autoNext option is set to true.");
          if (!this.nextMessage) throw new Error("There is no next message object.");
          e && "string" == typeof e ? this._findAndProcessDataObj(e) : this._findAndProcessDataObj(this.nextMessage)
        }
      }, {
        key: "on",
        value: function () {
          var e;
          return (e = this.emitter).on.apply(e, arguments)
        }
      }, {
        key: "off",
        value: function () {
          var e;
          return (e = this.emitter).off.apply(e, arguments)
        }
      }, {
        key: "_calculateWait",
        value: function (e) {
          return 0;
//          var t = e.length,
//            n = t / this.charactersPerSecond;
//          return n *= 1e3, n = Math.round(n)
        }
      }, {
        key: "_calculateDelay",
        value: function () {
          return 2000;
//          return this.options.delayMinMax ? Math.floor(Math.random() * (this.options.delayMinMax[1] - this.options.delayMinMax[0] + 1) + this.options.delayMinMax[0]) : this.options.delay
        }
      }, {
        key: "_findDataObjByID",
        value: function (e) {
          var t = this;
          return new Promise(function (n, i) {
            t.data.forEach(function (t) {
              t.id === e && n(t)
            }), i("No message object found")
          })
        }
      }, {
        key: "_processDataObj",
        value: function (e) {
          if (e.text && e.question) throw new Error("Message object can't have both text and question key.");
          if (e.text && "string" == typeof e.text) this._sendMessage(e);
          else {
            if (!e.question || "string" != typeof e.question) throw new Error("Data object doesn't contain text or question key.");
            this._askQuestion(e)
          }
        }
      }, {
        key: "_findAndProcessDataObj",
        value: function (e) {
          var t = this;
          this._findDataObjByID(e).then(function (e) {
            t._processDataObj(e)
          }).catch(function (e) {
            throw new Error(e)
          })
        }
      }, {
        key: "_sendMessage",
        value: function (e) {
          var t = this,
            n = this._calculateWait(e.text);
          this.emitter.emit("typing", n), setTimeout(function () {
            if (t.emitter.emit("message", t._parseDataObj(e)), e.next && "string" == typeof e.next)
              if (t.options.autoNext) {
                var n = t._calculateDelay();
                t.emitter.emit("delay", n), setTimeout(function () {
                  t._findAndProcessDataObj(e.next)
                }, n)
              } else t.nextMessage = e.next;
            else t._finalData(), t.conversationFinished = !0
          }, n)
        }
      }, {
        key: "_askQuestion",
        value: function (e) {
          var t = this;
          this.currentQuestion = e;
          var n = this._calculateWait(e.question);
          this.emitter.emit("typing", n), setTimeout(function () {
            t.emitter.emit("question", t._parseDataObj(e))
          }, n)
        }
      }, {
        key: "_answerQuestion",
        value: function (e) {
          var t = this,
            n = {
              question: this.currentQuestion.question,
              answer: e
            };
          if (this.emitter.emit("answered", n), this.answeredData.push(n), this.emitter.emit("update", this.answeredData), this.currentQuestion.input) {
            var i = a({}, this.currentQuestion.input.variable, e),
              s = Object.assign(this.variables, i);
            if (this.variables = s, this.currentQuestion.next && "string" == typeof this.currentQuestion.next)
              if (this.options.autoNext) {
                var r = this._calculateDelay();
                this.emitter.emit("delay", r), setTimeout(function () {
                  t._findAndProcessDataObj(t.currentQuestion.next)
                }, r)
              } else this.nextMessage = this.currentQuestion.next;
            else this._finalData(), this.conversationFinished = !0
          } else this.currentQuestion.answers && this.currentQuestion.answers.forEach(function (n) {
            if (n.text === e)
              if (n.next && "string" == typeof n.next)
                if (t.options.autoNext) {
                  var i = t._calculateDelay();
                  t.emitter.emit("delay", i), setTimeout(function () {
                    t._findAndProcessDataObj(n.next)
                  }, i)
                } else t.nextMessage = n.next;
            else t._finalData(), t.conversationFinished = !0
          })
        }
      }, {
        key: "_finalData",
        value: function () {
          var e = {
            data: this.answeredData,
            variables: this.variables
          };
          this.emitter.emit("finished", e)
        }
      }, {
        key: "_parseDataObj",
        value: function (e) {
          for (var t in this.variables) e.text ? e.text = e.text.replace("${" + t + "}", this.variables[t]) : e.question && (e.question = e.question.replace("${" + t + "}", this.variables[t]));
          return e
        }
      }]), e
    }();
  return s
});
//# sourceMappingURL=sycamore.js.map
