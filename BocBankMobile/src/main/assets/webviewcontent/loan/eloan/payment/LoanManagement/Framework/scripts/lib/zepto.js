var Zepto = function () {
    function type(obj) {
        return null == obj ? String(obj) : class2type[toString.call(obj)] || "object"
    }

    function isFunction(value) {
        return"function" == type(value)
    }

    function isWindow(obj) {
        return null != obj && obj == obj.window
    }

    function isDocument(obj) {
        return null != obj && obj.nodeType == obj.DOCUMENT_NODE
    }

    function isObject(obj) {
        return"object" == type(obj)
    }

    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    function likeArray(obj) {
        return"number" == typeof obj.length
    }

    function compact(array) {
        return filter.call(array, function (item) {
            return null != item
        })
    }

    function flatten(array) {
        return array.length > 0 ? $.fn.concat.apply([], array) : array
    }

    function dasherize(str) {
        return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function classRE(name) {
        return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)")
    }

    function maybeAddPx(name, value) {
        return"number" != typeof value || cssNumber[dasherize(name)] ? value : value + "px"
    }

    function defaultDisplay(nodeName) {
        var element, display;
        return elementDisplay[nodeName] || (element = document.createElement(nodeName), document.body.appendChild(element), display = getComputedStyle(element, "").getPropertyValue("display"), element.parentNode.removeChild(element), "none" == display && (display = "block"), elementDisplay[nodeName] = display), elementDisplay[nodeName]
    }

    function children(element) {
        return"children"in element ? slice.call(element.children) : $.map(element.childNodes, function (node) {
            return 1 == node.nodeType ? node : void 0
        })
    }

    function extend(target, source, deep) {
        for (key in source)deep && (isPlainObject(source[key]) || isArray(source[key])) ? (isPlainObject(source[key]) && !isPlainObject(target[key]) && (target[key] = {}), isArray(source[key]) && !isArray(target[key]) && (target[key] = []), extend(target[key], source[key], deep)) : source[key] !== undefined && (target[key] = source[key])
    }

    function filtered(nodes, selector) {
        return null == selector ? $(nodes) : $(nodes).filter(selector)
    }

    function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg
    }

    function setAttribute(node, name, value) {
        null == value ? node.removeAttribute(name) : node.setAttribute(name, value)
    }

    function className(node, value) {
        var klass = node.className, svg = klass && klass.baseVal !== undefined;
        return value === undefined ? svg ? klass.baseVal : klass : void(svg ? klass.baseVal = value : node.className = value)
    }

    function deserializeValue(value) {
        var num;
        try {
            return value ? "true" == value || ("false" == value ? !1 : "null" == value ? null : /^0/.test(value) || isNaN(num = Number(value)) ? /^[\[\{]/.test(value) ? $.parseJSON(value) : value : num) : value
        } catch (e) {
            return value
        }
    }

    function traverseNode(node, fun) {
        fun(node);
        for (var key in node.childNodes)traverseNode(node.childNodes[key], fun)
    }

    var undefined, key, $, classList, camelize, uniq, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter, document = window.document, elementDisplay = {}, classCache = {}, cssNumber = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1}, fragmentRE = /^\s*<(\w+|!)[^>]*>/, singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rootNodeRE = /^(?:body|html)$/i, capitalRE = /([A-Z])/g, methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"], adjacencyOperators = ["after", "prepend", "before", "append"], table = document.createElement("table"), tableRow = document.createElement("tr"), containers = {tr: document.createElement("tbody"), tbody: table, thead: table, tfoot: table, td: tableRow, th: tableRow, "*": document.createElement("div")}, readyRE = /complete|loaded|interactive/, simpleSelectorRE = /^[\w-]*$/, class2type = {}, toString = class2type.toString, zepto = {}, tempParent = document.createElement("div"), propMap = {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, isArray = Array.isArray || function (object) {
        return object instanceof Array
    };
    return zepto.matches = function (element, selector) {
        if (!selector || !element || 1 !== element.nodeType)return!1;
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
        if (matchesSelector)return matchesSelector.call(element, selector);
        var match, parent = element.parentNode, temp = !parent;
        return temp && (parent = tempParent).appendChild(element), match = ~zepto.qsa(parent, selector).indexOf(element), temp && tempParent.removeChild(element), match
    }, camelize = function (str) {
        return str.replace(/-+(.)?/g, function (match, chr) {
            return chr ? chr.toUpperCase() : ""
        })
    }, uniq = function (array) {
        return filter.call(array, function (item, idx) {
            return array.indexOf(item) == idx
        })
    }, zepto.fragment = function (html, name, properties) {
        var dom, nodes, container;
        return singleTagRE.test(html) && (dom = $(document.createElement(RegExp.$1))), dom || (html.replace && (html = html.replace(tagExpanderRE, "<$1></$2>")), name === undefined && (name = fragmentRE.test(html) && RegExp.$1), name in containers || (name = "*"), container = containers[name], container.innerHTML = "" + html, dom = $.each(slice.call(container.childNodes), function () {
            container.removeChild(this)
        })), isPlainObject(properties) && (nodes = $(dom), $.each(properties, function (key, value) {
            methodAttributes.indexOf(key) > -1 ? nodes[key](value) : nodes.attr(key, value)
        })), dom
    }, zepto.Z = function (dom, selector) {
        return dom = dom || [], dom.__proto__ = $.fn, dom.selector = selector || "", dom
    }, zepto.isZ = function (object) {
        return object instanceof zepto.Z
    }, zepto.init = function (selector, context) {
        var dom;
        if (!selector)return zepto.Z();
        if ("string" == typeof selector)if (selector = selector.trim(), "<" == selector[0] && fragmentRE.test(selector))dom = zepto.fragment(selector, RegExp.$1, context), selector = null; else {
            if (context !== undefined)return $(context).find(selector);
            dom = zepto.qsa(document, selector)
        } else {
            if (isFunction(selector))return $(document).ready(selector);
            if (zepto.isZ(selector))return selector;
            if (isArray(selector))dom = compact(selector); else if (isObject(selector))dom = [selector], selector = null; else if (fragmentRE.test(selector))dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null; else {
                if (context !== undefined)return $(context).find(selector);
                dom = zepto.qsa(document, selector)
            }
        }
        return zepto.Z(dom, selector)
    }, $ = function (selector, context) {
        return zepto.init(selector, context)
    }, $.extend = function (target) {
        var deep, args = slice.call(arguments, 1);
        return"boolean" == typeof target && (deep = target, target = args.shift()), args.forEach(function (arg) {
            extend(target, arg, deep)
        }), target
    }, zepto.qsa = function (element, selector) {
        var found, maybeID = "#" == selector[0], maybeClass = !maybeID && "." == selector[0], nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, isSimple = simpleSelectorRE.test(nameOnly);
        return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : 1 !== element.nodeType && 9 !== element.nodeType ? [] : slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector) : element.querySelectorAll(selector))
    }, $.contains = function (parent, node) {
        return parent !== node && parent.contains(node)
    }, $.type = type, $.isFunction = isFunction, $.isWindow = isWindow, $.isArray = isArray, $.isPlainObject = isPlainObject, $.isEmptyObject = function (obj) {
        var name;
        for (name in obj)return!1;
        return!0
    }, $.inArray = function (elem, array, i) {
        return emptyArray.indexOf.call(array, elem, i)
    }, $.camelCase = camelize, $.trim = function (str) {
        return null == str ? "" : String.prototype.trim.call(str)
    }, $.uuid = 0, $.support = {}, $.expr = {}, $.map = function (elements, callback) {
        var value, i, key, values = [];
        if (likeArray(elements))for (i = 0; i < elements.length; i++)value = callback(elements[i], i), null != value && values.push(value); else for (key in elements)value = callback(elements[key], key), null != value && values.push(value);
        return flatten(values)
    }, $.each = function (elements, callback) {
        var i, key;
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++)if (callback.call(elements[i], i, elements[i]) === !1)return elements
        } else for (key in elements)if (callback.call(elements[key], key, elements[key]) === !1)return elements;
        return elements
    }, $.grep = function (elements, callback) {
        return filter.call(elements, callback)
    }, $.lastInserts = function(){
        return $('.last-insert-nodes');
    }, window.JSON && ($.parseJSON = JSON.parse), $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    }), $.fn = {forEach: emptyArray.forEach, reduce: emptyArray.reduce, push: emptyArray.push, sort: emptyArray.sort, indexOf: emptyArray.indexOf, concat: emptyArray.concat, map: function (fn) {
        return $($.map(this, function (el, i) {
            return fn.call(el, i, el)
        }))
    }, slice: function () {
        return $(slice.apply(this, arguments))
    }, ready: function (callback) {
        return readyRE.test(document.readyState) && document.body ? callback($) : document.addEventListener("DOMContentLoaded", function () {
            callback($)
        }, !1), this
    }, get: function (idx) {
        return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    }, toArray: function () {
        return this.get()
    }, size: function () {
        return this.length
    }, remove: function () {
        return this.each(function () {
        	if(typeof FIREBUG_DEBUG === "undefined")
        		null != this.parentNode && this.parentNode.removeChild(this);
        	else{
        		var _t = $(this);
                null != this.parentNode && 
                		( !FIREBUG_DEBUG ||
                		!(_t.attr("id") && (_t.attr("id") == "FirebugUI" ||
                        _t.attr("id") == "window-resizer-tooltip" ||
                        _t.attr("id")=="cli_dialog"))) && 
                        this.parentNode.removeChild(this)
        	}
        })
    }, each: function (callback) {
        return emptyArray.every.call(this, function (el, idx) {
            return callback.call(el, idx, el) !== !1
        }), this
    }, filter: function (selector) {
        return isFunction(selector) ? this.not(this.not(selector)) : $(filter.call(this, function (element) {
            return zepto.matches(element, selector)
        }))
    }, add: function (selector, context) {
        return $(uniq(this.concat($(selector, context))))
    }, is: function (selector) {
        return this.length > 0 && zepto.matches(this[0], selector)
    }, not: function (selector) {
        var nodes = [];
        if (isFunction(selector) && selector.call !== undefined)this.each(function (idx) {
            selector.call(this, idx) || nodes.push(this)
        }); else {
            var excludes = "string" == typeof selector ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : $(selector);
            this.forEach(function (el) {
                excludes.indexOf(el) < 0 && nodes.push(el)
            })
        }
        return $(nodes)
    }, has: function (selector) {
        return this.filter(function () {
            return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size()
        })
    }, eq: function (idx) {
        return-1 === idx ? this.slice(idx) : this.slice(idx, +idx + 1)
    }, first: function () {
        var el = this[0];
        return el && !isObject(el) ? el : $(el)
    }, last: function () {
        var el = this[this.length - 1];
        return el && !isObject(el) ? el : $(el)
    }, find: function (selector) {
        var result, $this = this;
        return result = "object" == typeof selector ? $(selector).filter(function () {
            var node = this;
            return emptyArray.some.call($this, function (parent) {
                return $.contains(parent, node)
            })
        }) : 1 == this.length ? $(zepto.qsa(this[0], selector)) : this.map(function () {
            return zepto.qsa(this, selector)
        })
    }, closest: function (selector, context) {
        var node = this[0], collection = !1;
        for ("object" == typeof selector && (collection = $(selector)); node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector));)node = node !== context && !isDocument(node) && node.parentNode;
        return $(node)
    }, parents: function (selector) {
        for (var ancestors = [], nodes = this; nodes.length > 0;)nodes = $.map(nodes, function (node) {
            return(node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0 ? (ancestors.push(node), node) : void 0
        });
        return filtered(ancestors, selector)
    }, parent: function (selector) {
        return filtered(uniq(this.pluck("parentNode")), selector)
    }, children: function (selector) {
        return filtered(this.map(function () {
            return children(this)
        }), selector)
    }, contents: function () {
        return this.map(function () {
            return slice.call(this.childNodes)
        })
    }, siblings: function (selector) {
        return filtered(this.map(function (i, el) {
            return filter.call(children(el.parentNode), function (child) {
                return child !== el
            })
        }), selector)
    }, empty: function () {
        return this.each(function () {
            if(typeof FIREBUG_DEBUG !== "undefined" && FIREBUG_DEBUG && $(this).get(0).nodeName==="BODY"){
                $(this).children().each(function(){
                    var _t = $(this);
                    if(!_t.attr("id") || _t.attr("id") != "FirebugUI" ||
                        _t.attr("id") != "window-resizer-tooltip" ||
                        _t.attr("id")!="cli_dialog")
                    {
                        //this.innerHTML = "";
                        _t.remove();
                    }
                });
            }else{
                this.innerHTML = "";
            }
        })
    }, pluck: function (property) {
        return $.map(this, function (el) {
            return el[property]
        })
    }, show: function () {
        return this.each(function () {
            "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = defaultDisplay(this.nodeName))
        })
    }, replaceWith: function (newContent) {
        return this.before(newContent).remove()
    }, wrap: function (structure) {
        var func = isFunction(structure);
        if (this[0] && !func)var dom = $(structure).get(0), clone = dom.parentNode || this.length > 1;
        return this.each(function (index) {
            $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(!0) : dom)
        })
    }, wrapAll: function (structure) {
        if (this[0]) {
            $(this[0]).before(structure = $(structure));
            for (var children; (children = structure.children()).length;)structure = children.first();
            $(structure).append(this)
        }
        return this
    }, wrapInner: function (structure) {
        var func = isFunction(structure);
        return this.each(function (index) {
            var self = $(this), contents = self.contents(), dom = func ? structure.call(this, index) : structure;
            contents.length ? contents.wrapAll(dom) : self.append(dom)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            $(this).replaceWith($(this).children())
        }), this
    }, clone: function () {
        return this.map(function () {
            return this.cloneNode(!0)
        })
    }, hide: function () {
        return this.css("display", "none")
    }, toggle: function (setting) {
        return this.each(function () {
            var el = $(this);
            (setting === undefined ? "none" == el.css("display") : setting) ? el.show() : el.hide()
        })
    }, prev: function (selector) {
        return $(this.pluck("previousElementSibling")).filter(selector || "*")
    }, next: function (selector) {
        return $(this.pluck("nextElementSibling")).filter(selector || "*")
    }, html: function (html) {
        return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (idx) {
            var originHtml = this.innerHTML;
            $(this).empty().append(funcArg(this, html, idx, originHtml))
        })
    }, text: function (text) {
        return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
            this.textContent = text === undefined ? "" : "" + text
        })
    }, attr: function (name, value) {
        var result;
        return"string" == typeof name && value === undefined ? 0 == this.length || 1 !== this[0].nodeType ? undefined : "value" == name && "INPUT" == this[0].nodeName ? this.val() : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
            if (1 === this.nodeType)if (isObject(name))for (key in name)setAttribute(this, key, name[key]); else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    }, removeAttr: function (name) {
        return this.each(function () {
            1 === this.nodeType && setAttribute(this, name)
        })
    }, prop: function (name, value) {
        return name = propMap[name] || name, value === undefined ? this[0] && this[0][name] : this.each(function (idx) {
            this[name] = funcArg(this, value, idx, this[name])
        })
    }, data: function (name, value) {
        var data = this.attr("data-" + name.replace(capitalRE, "-$1").toLowerCase(), value);
        return null !== data ? deserializeValue(data) : undefined
    }, val: function (value) {
        return 0 === arguments.length ? this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function () {
            return this.selected
        }).pluck("value") : this[0].value) : this.each(function (idx) {
            this.value = funcArg(this, value, idx, this.value)
        })
    }, offset: function (coordinates) {
        if (coordinates)return this.each(function (index) {
            var $this = $(this), coords = funcArg(this, coordinates, index, $this.offset()), parentOffset = $this.offsetParent().offset(), props = {top: coords.top - parentOffset.top, left: coords.left - parentOffset.left};
            "static" == $this.css("position") && (props.position = "relative"), $this.css(props)
        });
        if (0 == this.length)return null;
        var obj = this[0].getBoundingClientRect();
        return{left: obj.left + window.pageXOffset, top: obj.top + window.pageYOffset, width: Math.round(obj.width), height: Math.round(obj.height)}
    }, css: function (property, value) {
        if (arguments.length < 2) {
            var element = this[0], computedStyle = getComputedStyle(element, "");
            if (!element)return;
            if ("string" == typeof property)return element.style[camelize(property)] || computedStyle.getPropertyValue(property);
            if (isArray(property)) {
                var props = {};
                return $.each(isArray(property) ? property : [property], function (_, prop) {
                    props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop)
                }), props
            }
        }
        var css = "";
        if ("string" == type(property))value || 0 === value ? css = dasherize(property) + ":" + maybeAddPx(property, value) : this.each(function () {
            this.style.removeProperty(dasherize(property))
        }); else for (key in property)property[key] || 0 === property[key] ? css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";" : this.each(function () {
            this.style.removeProperty(dasherize(key))
        });
        return this.each(function () {
            this.style.cssText += ";" + css
        })
    }, index: function (element) {
        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    }, hasClass: function (name) {
        return name ? emptyArray.some.call(this, function (el) {
            return this.test(className(el))
        }, classRE(name)) : !1
    }, addClass: function (name) {
        return name ? this.each(function (idx) {
            classList = [];
            var cls = className(this), newName = funcArg(this, name, idx, cls);
            newName.split(/\s+/g).forEach(function (klass) {
                $(this).hasClass(klass) || classList.push(klass)
            }, this), classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
        }) : this
    }, removeClass: function (name) {
        return this.each(function (idx) {
            return name === undefined ? className(this, "") : (classList = className(this), funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
                classList = classList.replace(classRE(klass), " ")
            }), void className(this, classList.trim()))
        })
    }, toggleClass: function (name, when) {
        return name ? this.each(function (idx) {
            var $this = $(this), names = funcArg(this, name, idx, className(this));
            names.split(/\s+/g).forEach(function (klass) {
                (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass)
            })
        }) : this
    }, scrollTop: function (value) {
        if (this.length) {
            var hasScrollTop = "scrollTop"in this[0];
            return value === undefined ? hasScrollTop ? this[0].scrollTop : this[0].pageYOffset : this.each(hasScrollTop ? function () {
                this.scrollTop = value
            } : function () {
                this.scrollTo(this.scrollX, value)
            })
        }
    }, scrollLeft: function (value) {
        if (this.length) {
            var hasScrollLeft = "scrollLeft"in this[0];
            return value === undefined ? hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset : this.each(hasScrollLeft ? function () {
                this.scrollLeft = value
            } : function () {
                this.scrollTo(value, this.scrollY)
            })
        }
    }, position: function () {
        if (this.length) {
            var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {top: 0, left: 0} : offsetParent.offset();
            return offset.top -= parseFloat($(elem).css("margin-top")) || 0, offset.left -= parseFloat($(elem).css("margin-left")) || 0, parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0, parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0, {top: offset.top - parentOffset.top, left: offset.left - parentOffset.left}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var parent = this.offsetParent || document.body; parent && !rootNodeRE.test(parent.nodeName) && "static" == $(parent).css("position");)parent = parent.offsetParent;
            return parent
        })
    }}, $.fn.detach = $.fn.remove, ["width", "height"].forEach(function (dimension) {
        var dimensionProperty = dimension.replace(/./, function (m) {
            return m[0].toUpperCase()
        });
        $.fn[dimension] = function (value) {
            var offset, el = this[0];
            return value === undefined ? isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension] : this.each(function (idx) {
                el = $(this), el.css(dimension, funcArg(this, value, idx, el[dimension]()))
            })
        }
    }), adjacencyOperators.forEach(function (operator, operatorIndex) {
        var inside = operatorIndex % 2;
        $.fn[operator] = function () {
            var argType, parent, nodes = $.map(arguments, function (arg) {
                return argType = type(arg), "object" == argType || "array" == argType || null == arg ? arg : zepto.fragment(arg)
            }), copyByClone = this.length > 1;
            $('.last-insert-nodes').removeClass('last-insert-nodes');
            $(nodes).addClass('last-insert-nodes');
            return nodes.length < 1 ? this : this.each(function (_, target) {
                parent = inside ? target : target.parentNode, target = 0 == operatorIndex ? target.nextSibling : 1 == operatorIndex ? target.firstChild : 2 == operatorIndex ? target : null, nodes.forEach(function (node) {
                    if (copyByClone)node = node.cloneNode(!0); else if (!parent)return $(node).remove();
                    traverseNode(parent.insertBefore(node, target), function (el) {
                        null == el.nodeName || "SCRIPT" !== el.nodeName.toUpperCase() || el.type && "text/javascript" !== el.type || el.src || window.eval.call(window, el.innerHTML)
                    })
                })
            })
        }, $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function (html) {
            return $(html)[operator](this), this
        }
    }), zepto.Z.prototype = $.fn, zepto.uniq = uniq, zepto.deserializeValue = deserializeValue, $.zepto = zepto, $
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto);
!function ($) {
    function visible(elem) {
        return elem = $(elem), !(!elem.width() && !elem.height()) && "none" !== elem.css("display")
    }

    function process(sel, fn) {
        sel = sel.replace(/=#\]/g, '="#"]');
        var filter, arg, match = filterRe.exec(sel);
        if (match && match[2]in filters && (filter = filters[match[2]], arg = match[3], sel = match[1], arg)) {
            var num = Number(arg);
            arg = isNaN(num) ? arg.replace(/^["']|["']$/g, "") : num
        }
        return fn(sel, filter, arg)
    }

    var zepto = $.zepto, oldQsa = zepto.qsa, oldMatches = zepto.matches, filters = $.expr[":"] = {visible: function () {
        return visible(this) ? this : void 0
    }, hidden: function () {
        return visible(this) ? void 0 : this
    }, selected: function () {
        return this.selected ? this : void 0
    }, checked: function () {
        return this.checked ? this : void 0
    }, parent: function () {
        return this.parentNode
    }, first: function (idx) {
        return 0 === idx ? this : void 0
    }, last: function (idx, nodes) {
        return idx === nodes.length - 1 ? this : void 0
    }, eq: function (idx, _, value) {
        return idx === value ? this : void 0
    }, contains: function (idx, _, text) {
        return $(this).text().indexOf(text) > -1 ? this : void 0
    }, has: function (idx, _, sel) {
        return zepto.qsa(this, sel).length ? this : void 0
    }}, filterRe = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), childRe = /^\s*>/, classTag = "Zepto" + +new Date;
    zepto.qsa = function (node, selector) {
        return process(selector, function (sel, filter, arg) {
            try {
                var taggedParent;
                !sel && filter ? sel = "*" : childRe.test(sel) && (taggedParent = $(node).addClass(classTag), sel = "." + classTag + " " + sel);
                var nodes = oldQsa(node, sel)
            } catch (e) {
                throw console.error("error performing selector: %o", selector), e
            } finally {
                taggedParent && taggedParent.removeClass(classTag)
            }
            return filter ? zepto.uniq($.map(nodes, function (n, i) {
                return filter.call(n, i, nodes, arg)
            })) : nodes
        })
    }, zepto.matches = function (node, selector) {
        return process(selector, function (sel, filter, arg) {
            return!(sel && !oldMatches(node, sel) || filter && filter.call(node, null, arg) !== node)
        })
    }
}(Zepto);
!function ($, undefined) {
    function dasherize(str) {
        return str.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase()
    }

    var eventPrefix, transform, transitionProperty, transitionDuration, transitionTiming, transitionDelay, animationName, animationDuration, animationTiming, animationDelay, prefix = "", vendors = {Webkit: "webkit", Moz: "", O: "o"}, document = window.document, testEl = document.createElement("div"), supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, cssReset = {};
    $.each(vendors, function (vendor, event) {
        return testEl.style[vendor + "TransitionProperty"] !== undefined ? (prefix = "-" + vendor.toLowerCase() + "-", eventPrefix = event, !1) : void 0
    }), transform = prefix + "transform", cssReset[transitionProperty = prefix + "transition-property"] = cssReset[transitionDuration = prefix + "transition-duration"] = cssReset[transitionDelay = prefix + "transition-delay"] = cssReset[transitionTiming = prefix + "transition-timing-function"] = cssReset[animationName = prefix + "animation-name"] = cssReset[animationDuration = prefix + "animation-duration"] = cssReset[animationDelay = prefix + "animation-delay"] = cssReset[animationTiming = prefix + "animation-timing-function"] = "", $.fx = {off: eventPrefix === undefined && testEl.style.transitionProperty === undefined, speeds: {_default: 400, fast: 200, slow: 600}, cssPrefix: prefix, transitionEnd: normalizeEvent("TransitionEnd"), animationEnd: normalizeEvent("AnimationEnd")}, $.fn.animate = function (properties, duration, ease, callback, delay) {
        return $.isFunction(duration) && (callback = duration, ease = undefined, duration = undefined), $.isFunction(ease) && (callback = ease, ease = undefined), $.isPlainObject(duration) && (ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration), duration && (duration = ("number" == typeof duration ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1e3), delay && (delay = parseFloat(delay) / 1e3), this.anim(properties, duration, ease, callback, delay)
    }, $.fn.anim = function (properties, duration, ease, callback, delay) {
        var key, cssProperties, wrappedCallback, cssValues = {}, transforms = "", that = this, endEvent = $.fx.transitionEnd, fired = !1;
        if (duration === undefined && (duration = $.fx.speeds._default / 1e3), delay === undefined && (delay = 0), $.fx.off && (duration = 0), "string" == typeof properties)cssValues[animationName] = properties, cssValues[animationDuration] = duration + "s", cssValues[animationDelay] = delay + "s", cssValues[animationTiming] = ease || "linear", endEvent = $.fx.animationEnd; else {
            cssProperties = [];
            for (key in properties)supportedTransforms.test(key) ? transforms += key + "(" + properties[key] + ") " : (cssValues[key] = properties[key], cssProperties.push(dasherize(key)));
            transforms && (cssValues[transform] = transforms, cssProperties.push(transform)), duration > 0 && "object" == typeof properties && (cssValues[transitionProperty] = cssProperties.join(", "), cssValues[transitionDuration] = duration + "s", cssValues[transitionDelay] = delay + "s", cssValues[transitionTiming] = ease || "linear")
        }
        return wrappedCallback = function (event) {
            if ("undefined" != typeof event) {
                if (event.target !== event.currentTarget)return;
                $(event.target).unbind(endEvent, wrappedCallback)
            } else $(this).unbind(endEvent, wrappedCallback);
            fired = !0, $(this).css(cssReset), callback && callback.call(this)
        }, duration > 0 && (this.bind(endEvent, wrappedCallback), setTimeout(function () {
            fired || wrappedCallback.call(that)
        }, 1e3 * duration + 25)), this.size() && this.get(0).clientLeft, this.css(cssValues), 0 >= duration && setTimeout(function () {
            that.each(function () {
                wrappedCallback.call(this)
            })
        }, 0), this
    }, testEl = null
}(Zepto);
!function ($) {
    function zid(element) {
        return element._zid || (element._zid = _zid++)
    }

    function findHandlers(element, event, fn, selector) {
        if (event = parse(event), event.ns)var matcher = matcherFor(event.ns);
        return(handlers[zid(element)] || []).filter(function (handler) {
            return!(!handler || event.e && handler.e != event.e || event.ns && !matcher.test(handler.ns) || fn && zid(handler.fn) !== zid(fn) || selector && handler.sel != selector)
        })
    }

    function parse(event) {
        var parts = ("" + event).split(".");
        return{e: parts[0], ns: parts.slice(1).sort().join(" ")}
    }

    function matcherFor(ns) {
        return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)")
    }

    function eventCapture(handler, captureSetting) {
        return handler.del && !focusinSupported && handler.e in focus || !!captureSetting
    }

    function realEvent(type) {
        return hover[type] || focusinSupported && focus[type] || type
    }

    function add(element, events, fn, data, selector, delegator, capture) {
        var id = zid(element), set = handlers[id] || (handlers[id] = []);
        events.split(/\s/).forEach(function (event) {
            if ("ready" == event)return $(document).ready(fn);
            var handler = parse(event);
            handler.fn = fn, handler.sel = selector, handler.e in hover && (fn = function (e) {
                var related = e.relatedTarget;
                return!related || related !== this && !$.contains(this, related) ? handler.fn.apply(this, arguments) : void 0
            }), handler.del = delegator;
            var callback = delegator || fn;
            handler.proxy = function (e) {
                if (e = compatible(e), !e.isImmediatePropagationStopped()) {
                    e.data = data;
                    var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
                    return result === !1 && (e.preventDefault(), e.stopPropagation()), result
                }
            }, handler.i = set.length, set.push(handler), "addEventListener"in element && element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
    }

    function remove(element, events, fn, selector, capture) {
        var id = zid(element);
        (events || "").split(/\s/).forEach(function (event) {
            findHandlers(element, event, fn, selector).forEach(function (handler) {
                delete handlers[id][handler.i], "removeEventListener"in element && element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
            })
        })
    }

    function compatible(event, source) {
        return(source || !event.isDefaultPrevented) && (source || (source = event), $.each(eventMethods, function (name, predicate) {
            var sourceMethod = source[name];
            event[name] = function () {
                return this[predicate] = returnTrue, sourceMethod && sourceMethod.apply(source, arguments)
            }, event[predicate] = returnFalse
        }), (source.defaultPrevented !== undefined ? source.defaultPrevented : "returnValue"in source ? source.returnValue === !1 : source.getPreventDefault && source.getPreventDefault()) && (event.isDefaultPrevented = returnTrue)), event
    }

    function createProxy(event) {
        var key, proxy = {originalEvent: event};
        for (key in event)ignoreProperties.test(key) || event[key] === undefined || (proxy[key] = event[key]);
        return compatible(proxy, event)
    }

    var undefined, _zid = 1, slice = Array.prototype.slice, isFunction = $.isFunction, isString = function (obj) {
        return"string" == typeof obj
    }, handlers = {}, specialEvents = {}, focusinSupported = "onfocusin"in window, focus = {focus: "focusin", blur: "focusout"}, hover = {mouseenter: "mouseover", mouseleave: "mouseout"};
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents", $.event = {add: add, remove: remove}, $.proxy = function (fn, context) {
        if (isFunction(fn)) {
            var proxyFn = function () {
                return fn.apply(context, arguments)
            };
            return proxyFn._zid = zid(fn), proxyFn
        }
        if (isString(context))return $.proxy(fn[context], fn);
        throw new TypeError("expected function")
    }, $.fn.bind = function (event, data, callback) {
        return this.on(event, data, callback)
    }, $.fn.unbind = function (event, callback) {
        return this.off(event, callback)
    }, $.fn.one = function (event, selector, data, callback) {
        return this.on(event, selector, data, callback, 1)
    };
    var returnTrue = function () {
        return!0
    }, returnFalse = function () {
        return!1
    }, ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/, eventMethods = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};
    $.fn.delegate = function (selector, event, callback) {
        return this.on(event, selector, callback)
    }, $.fn.undelegate = function (selector, event, callback) {
        return this.off(event, selector, callback)
    }, $.fn.live = function (event, callback) {
        return $(document.body).delegate(this.selector, event, callback), this
    }, $.fn.die = function (event, callback) {
        return $(document.body).undelegate(this.selector, event, callback), this
    }, $.fn.on = function (event, selector, data, callback, one) {
        var autoRemove, delegator, $this = this;
        return event && !isString(event) ? ($.each(event, function (type, fn) {
            $this.on(type, selector, data, fn, one)
        }), $this) : (isString(selector) || isFunction(callback) || callback === !1 || (callback = data, data = selector, selector = undefined), (isFunction(data) || data === !1) && (callback = data, data = undefined), callback === !1 && (callback = returnFalse), $this.each(function (_, element) {
            one && (autoRemove = function (e) {
                return remove(element, e.type, callback), callback.apply(this, arguments)
            }), selector && (delegator = function (e) {
                var evt, match = $(e.target).closest(selector, element).get(0);
                return match && match !== element ? (evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element}), (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))) : void 0
            }), add(element, event, callback, data, selector, delegator || autoRemove)
        }))
    }, $.fn.off = function (event, selector, callback) {
        var $this = this;
        return event && !isString(event) ? ($.each(event, function (type, fn) {
            $this.off(type, selector, fn)
        }), $this) : (isString(selector) || isFunction(callback) || callback === !1 || (callback = selector, selector = undefined), callback === !1 && (callback = returnFalse), $this.each(function () {
            remove(this, event, callback, selector)
        }))
    }, $.fn.trigger = function (event, args) {
        return event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event), event._args = args, this.each(function () {
            "dispatchEvent"in this ? this.dispatchEvent(event) : $(this).triggerHandler(event, args)
        })
    }, $.fn.triggerHandler = function (event, args) {
        var e, result;
        return this.each(function (i, element) {
            e = createProxy(isString(event) ? $.Event(event) : event), e._args = args, e.target = element, $.each(findHandlers(element, event.type || event), function (i, handler) {
                return result = handler.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), result
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (event) {
        $.fn[event] = function (callback) {
            return callback ? this.bind(event, callback) : this.trigger(event)
        }
    }), ["focus", "blur"].forEach(function (name) {
        $.fn[name] = function (callback) {
            return callback ? this.bind(name, callback) : this.each(function () {
                try {
                    this[name]()
                } catch (e) {
                }
            }), this
        }
    }), $.Event = function (type, props) {
        isString(type) || (props = type, type = props.type);
        var event = document.createEvent(specialEvents[type] || "Events"), bubbles = !0;
        if (props)for (var name in props)"bubbles" == name ? bubbles = !!props[name] : event[name] = props[name];
        return event.initEvent(type, bubbles, !0), compatible(event)
    }
}(Zepto);
!function ($) {
    function Deferred(func) {
        var tuples = [
            ["resolve", "done", $.Callbacks({once: 1, memory: 1}), "resolved"],
            ["reject", "fail", $.Callbacks({once: 1, memory: 1}), "rejected"],
            ["notify", "progress", $.Callbacks({memory: 1})]
        ], state = "pending", promise = {state: function () {
            return state
        }, always: function () {
            return deferred.done(arguments).fail(arguments), this
        }, then: function () {
            var fns = arguments;
            return Deferred(function (defer) {
                $.each(tuples, function (i, tuple) {
                    var fn = $.isFunction(fns[i]) && fns[i];
                    deferred[tuple[1]](function () {
                        var returned = fn && fn.apply(this, arguments);
                        if (returned && $.isFunction(returned.promise))returned.promise().done(defer.resolve).fail(defer.reject).progress(defer.notify); else {
                            var context = this === promise ? defer.promise() : this, values = fn ? [returned] : arguments;
                            defer[tuple[0] + "With"](context, values)
                        }
                    })
                }), fns = null
            }).promise()
        }, promise: function (obj) {
            return null != obj ? $.extend(obj, promise) : promise
        }}, deferred = {};
        return $.each(tuples, function (i, tuple) {
            var list = tuple[2], stateString = tuple[3];
            promise[tuple[1]] = list.add, stateString && list.add(function () {
                state = stateString
            }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function () {
                return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
            }, deferred[tuple[0] + "With"] = list.fireWith
        }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
    }

    var slice = Array.prototype.slice;
    $.when = function (sub) {
        var progressValues, progressContexts, resolveContexts, resolveValues = slice.call(arguments), len = resolveValues.length, i = 0, remain = 1 !== len || sub && $.isFunction(sub.promise) ? len : 0, deferred = 1 === remain ? sub : Deferred(), updateFn = function (i, ctx, val) {
            return function (value) {
                ctx[i] = this, val[i] = arguments.length > 1 ? slice.call(arguments) : value, val === progressValues ? deferred.notifyWith(ctx, val) : --remain || deferred.resolveWith(ctx, val)
            }
        };
        if (len > 1)for (progressValues = new Array(len), progressContexts = new Array(len), resolveContexts = new Array(len); len > i; ++i)resolveValues[i] && $.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues)) : --remain;
        return remain || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
    }, $.Deferred = Deferred
}(Zepto);
!function ($) {
    $.Callbacks = function (options) {
        options = $.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; ++firingIndex)if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list.length = 0 : Callbacks.disable())
        }, Callbacks = {add: function () {
            if (list) {
                var start = list.length, add = function (args) {
                    $.each(args, function (_, arg) {
                        "function" == typeof arg ? options.unique && Callbacks.has(arg) || list.push(arg) : arg && arg.length && "string" != typeof arg && add(arg)
                    })
                };
                add(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
            }
            return this
        }, remove: function () {
            return list && $.each(arguments, function (_, arg) {
                for (var index; (index = $.inArray(arg, list, index)) > -1;)list.splice(index, 1), firing && (firingLength >= index && --firingLength, firingIndex >= index && --firingIndex)
            }), this
        }, has: function (fn) {
            return!(!list || !(fn ? $.inArray(fn, list) > -1 : list.length))
        }, empty: function () {
            return firingLength = list.length = 0, this
        }, disable: function () {
            return list = stack = memory = void 0, this
        }, disabled: function () {
            return!list
        }, lock: function () {
            return stack = void 0, memory || Callbacks.disable(), this
        }, locked: function () {
            return!stack
        }, fireWith: function (context, args) {
            return!list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
        }, fire: function () {
            return Callbacks.fireWith(this, arguments)
        }, fired: function () {
            return!!fired
        }};
        return Callbacks
    }
}(Zepto);
!function ($) {
    function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName);
        return $(context).trigger(event, data), !event.isDefaultPrevented()
    }

    function triggerGlobal(settings, context, eventName, data) {
        return settings.global ? triggerAndReturn(context || document, eventName, data) : void 0
    }

    function ajaxStart(settings) {
        settings.global && 0 === $.active++ && triggerGlobal(settings, null, "ajaxStart")
    }

    function ajaxStop(settings) {
        settings.global && !--$.active && triggerGlobal(settings, null, "ajaxStop")
    }

    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        return settings.beforeSend.call(context, xhr, settings) === !1 || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === !1 ? !1 : void triggerGlobal(settings, context, "ajaxSend", [xhr, settings])
    }

    function ajaxSuccess(data, xhr, settings, deferred) {
        var context = settings.context, status = "success";
        settings.success.call(context, data, status, xhr), deferred && deferred.resolveWith(context, [data, status, xhr]), triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]), ajaxComplete(status, xhr, settings)
    }

    function ajaxError(error, type, xhr, settings, deferred) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error), deferred && deferred.rejectWith(context, [xhr, type, error]), triggerGlobal(settings, context, "ajaxError", [xhr, settings, error || type]), ajaxComplete(type, xhr, settings)
    }

    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status), triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]), ajaxStop(settings)
    }

    function empty() {
    }

    function mimeToDataType(mime) {
        return mime && (mime = mime.split(";", 2)[0]), mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text"
    }

    function appendQuery(url, query) {
        return"" == query ? url : (url + "&" + query).replace(/[&?]{1,2}/, "?")
    }

    function serializeData(options) {
        options.processData && options.data && "string" != $.type(options.data) && (options.data = $.param(options.data, options.traditional)), !options.data || options.type && "GET" != options.type.toUpperCase() || (options.url = appendQuery(options.url, options.data), options.data = void 0)
    }

    function parseArguments(url, data, success, dataType) {
        return $.isFunction(data) && (dataType = success, success = data, data = void 0), $.isFunction(success) || (dataType = success, success = void 0), {url: url, data: data, success: success, dataType: dataType}
    }

    function serialize(params, obj, traditional, scope) {
        var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
        $.each(obj, function (key, value) {
            type = $.type(value), scope && (key = traditional ? scope : scope + "[" + (hash || "object" == type || "array" == type ? key : "") + "]"), !scope && array ? params.add(value.name, value.value) : "array" == type || !traditional && "object" == type ? serialize(params, value, traditional, key) : params.add(key, value)
        })
    }

    var key, name, jsonpID = 0, document = window.document, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
    $.active = 0, $.ajaxJSONP = function (options, deferred) {
        if (!("type"in options))return $.ajax(options);
        var responseData, abortTimeout, _callbackName = options.jsonpCallback, callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "jsonp" + ++jsonpID, script = document.createElement("script"), originalCallback = window[callbackName], abort = function (errorType) {
            $(script).triggerHandler("error", errorType || "abort")
        }, xhr = {abort: abort};
        return deferred && deferred.promise(xhr), $(script).on("load error", function (e, errorType) {
            clearTimeout(abortTimeout), $(script).off().remove(), "error" != e.type && responseData ? ajaxSuccess(responseData[0], xhr, options, deferred) : ajaxError(null, errorType || "error", xhr, options, deferred), window[callbackName] = originalCallback, responseData && $.isFunction(originalCallback) && originalCallback(responseData[0]), originalCallback = responseData = void 0
        }), ajaxBeforeSend(xhr, options) === !1 ? (abort("abort"), xhr) : (window[callbackName] = function () {
            responseData = arguments
        }, script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName), document.head.appendChild(script), options.timeout > 0 && (abortTimeout = setTimeout(function () {
            abort("timeout")
        }, options.timeout)), xhr)
    }, $.ajaxSettings = {type: "GET", beforeSend: empty, success: empty, error: empty, complete: empty, context: null, global: !0, xhr: function () {
        return new window.XMLHttpRequest
    }, accepts: {script: "text/javascript, application/javascript, application/x-javascript", json: jsonType, xml: "application/xml, text/xml", html: htmlType, text: "text/plain"}, crossDomain: !1, timeout: 0, processData: !0, cache: !0}, $.ajax = function (options) {
        var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred();
        for (key in $.ajaxSettings)void 0 === settings[key] && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
        var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
        if ("jsonp" == dataType || hasPlaceholder)return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
        var abortTimeout, mime = settings.accepts[dataType], headers = {}, setHeader = function (name, value) {
            headers[name.toLowerCase()] = [name, value]
        }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader;
        setHeader('bfw-ctrl', 'json');
        if (deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*"), (mime = settings.mimeType || mime) && (mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime)), (settings.contentType || settings.contentType !== !1 && settings.data && "GET" != settings.type.toUpperCase()) && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded"), settings.headers)for (name in settings.headers)setHeader(name, settings.headers[name]);
        if (xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function () {
            if (4 == xhr.readyState) {
                xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || 304 == xhr.status || 0 == xhr.status && "file:" == protocol) {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
                    try {
                        "script" == dataType ? (1, eval)(result) : "xml" == dataType ? result = xhr.responseXML : "json" == dataType && (result = blankRE.test(result) ? null : $.parseJSON(result))
                    } catch (e) {
                        error = e
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
                } else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
            }
        }, ajaxBeforeSend(xhr, settings) === !1)return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
        if (settings.xhrFields)for (name in settings.xhrFields)xhr[name] = settings.xhrFields[name];
        var async = "async"in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async, settings.username, settings.password);
        for (name in headers)nativeSetHeader.apply(xhr, headers[name]);
        return settings.timeout > 0 && (abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
        }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
    }, $.get = function () {
        return $.ajax(parseArguments.apply(null, arguments))
    }, $.post = function () {
        var options = parseArguments.apply(null, arguments);
        return options.type = "POST", $.ajax(options)
    }, $.getJSON = function () {
        var options = parseArguments.apply(null, arguments);
        return options.dataType = "json", $.ajax(options)
    }, $.fn.load = function (url, data, success) {
        if (!this.length)return this;
        var selector, self = this, parts = url.split(/\s/), options = parseArguments(url, data, success), callback = options.success;
        return parts.length > 1 && (options.url = parts[0], selector = parts[1]), options.success = function (response) {
            self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response), callback && callback.apply(self, arguments)
        }, $.ajax(options), this
    };
    var escape = encodeURIComponent;
    $.param = function (obj, traditional) {
        var params = [];
        return params.add = function (k, v) {
            this.push(escape(k) + "=" + escape(v))
        }, serialize(params, obj, traditional), params.join("&").replace(/%20/g, "+")
    }
}(Zepto);