"function" != typeof Array.prototype.indexOf && (Array.prototype.indexOf = function(a) {
    for (var b = 0; b < this.length; b++)
        if (this[b] === a) return b;
    return -1
}), window.jas = function() {
    function a(a) {
        for (var b = 0; b < a.length; b++) this[b] = a[b];
        this.length = a.length
    }
    a.prototype.forEach = function(a) {
        return this.map(a), this
    }, a.prototype.map = function(a) {
        for (var b = [], c = 0; c < this.length; c++) b.push(a.call(this, this[c], c));
        return b
    }, a.prototype.mapOne = function(a) {
        var b = this.map(a);
        return b.length > 1 ? b : b[0]
    }, a.prototype.text = function(a) {
        return "undefined" != typeof a ? this.forEach(function(b) {
            b.innerText = a
        }) : this.mapOne(function(a) {
            return a.innerText
        })
    }, a.prototype.html = function(a) {
        return "undefined" != typeof a ? this.forEach(function(b) {
            b.innerHTML = a
        }) : this.mapOne(function(a) {
            return a.innerHTML
        })
    }, a.prototype.addClass = function(a) {
        var b = "";
        if ("string" != typeof a)
            for (var c = 0; c < a.length; c++) b += " " + a[c];
        else b = " " + a;
        return this.forEach(function(a) {
            a.className += b
        })
    }, a.prototype.removeClass = function(a) {
        return this.forEach(function(b) {
            for (var d, c = b.className.split(" ");
                (d = c.indexOf(a)) > -1;) c = c.slice(0, d).concat(c.slice(++d));
            b.className = c.join(" ")
        })
    }, a.prototype.attr = function(a, b) {
        return "undefined" != typeof b ? this.forEach(function(c) {
            c.setAttribute(a, b)
        }) : this.mapOne(function(b) {
            return b.getAttribute(a)
        })
    }, a.prototype.append = function(a) {
        return this.forEach(function(b, c) {
            a.forEach(function(a) {
                b.appendChild(c > 0 ? a.cloneNode(!0) : a)
            })
        })
    }, a.prototype.prepend = function(a) {
        return this.forEach(function(b, c) {
            for (var d = a.length - 1; d > -1; d--) b.insertBefore(c > 0 ? a[d].cloneNode(!0) : a[d], b.firstChild)
        })
    }, a.prototype.remove = function() {
        return this.forEach(function(a) {
            return a.parentNode.removeChild(a)
        })
    }, a.prototype.on = function() {
        return document.addEventListener ? function(a, b) {
            return this.forEach(function(c) {
                c.addEventListener(a, b, !1)
            })
        } : document.attachEvent ? function(a, b) {
            return this.forEach(function(c) {
                c.attachEvent("on" + a, b)
            })
        } : function(a, b) {
            return this.forEach(function(c) {
                c["on" + a] = b
            })
        }
    }(), a.prototype.off = function() {
        return document.removeEventListener ? function(a, b) {
            return this.forEach(function(c) {
                c.removeEventListener(a, b, !1)
            })
        } : document.detachEvent ? function(a, b) {
            return this.forEach(function(c) {
                c.detachEvent("on" + a, b)
            })
        } : function(a, b) {
            return this.forEach(function(b) {
                b["on" + a] = null
            })
        }
    }();
    var b = {
        get: function(b) {
            var c;
            return c = "string" == typeof b ? document.querySelectorAll(b) : b.length ? b : [b], new a(c)
        },
        create: function(b, c) {
            var d = new a([document.createElement(b)]);
            if (c) {
                c.className && (d.addClass(c.className), delete c.className), c.text && (d.text(c.text), delete c.text);
                for (var e in c) c.hasOwnProperty(e) && d.attr(e, c[e])
            }
            return d
        }
    };
    return b
}();