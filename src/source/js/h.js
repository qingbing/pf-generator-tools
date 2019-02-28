// md5 库
if (typeof md5 === 'undefined'){
    (function(a){function b(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<a.length*32;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];c[(a.length>>2)-1]=undefined;for(b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<a.length*8;b+=8)c[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;return c}function l(a){return j(i(k(a),a.length*8))}function m(a,b){var c,d=k(a),e=[],f=[],g;e[15]=f[15]=undefined,d.length>16&&(d=i(d,a.length*8));for(c=0;c<16;c+=1)e[c]=d[c]^909522486,f[c]=d[c]^1549556828;return g=i(e.concat(k(b)),512+b.length*8),j(i(f.concat(g),640))}function n(a){var b="0123456789abcdef",c="",d,e;for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"use strict",typeof define=="function"&&define.amd?define(function(){return t}):a.md5=t})(this);
}
/**
 * 常用库文件
 */
(function () {
    // 变量类型判断
    let VType = {
        type: function (v) {
            return typeof v;
        },
        isDefined: function (v) {
            // 该函数不暴露
            return this.type(v) !== 'undefined';
        },
        isString: function (v) {
            return this.type(v) === 'string';
        },
        isNumber: function (v, strict) {
            if (this.type(v) === 'number') {
                return true;
            }
            if (true === strict) {
                return false;
            }
            return !isNaN(Number(v));
        },
        isInteger: function (v, strict) {
            return this.isNumber(v, strict) ? (v % 1 === 0) : false;
        },
        isBoolean: function (v, strict) {
            if (this.type(v) === 'boolean') {
                return true;
            }
            if (!this.isDefined(strict) || true === strict) {
                return false;
            }
            return this.type(Boolean(v)) === 'boolean';
        },
        isFunction: function (v) {
            return this.type(v) === 'function';
        },
        isObject: function (v) {
            return this.type(v) === 'object';
        },
        isArray: function (v) {
            return v instanceof Array;
        },
        isEmpty: function (v) {
            if (!this.isDefined(v) || null === v) {
                return true;
            }
            if (this.isString(v)) {
                return '' === this.trim(v);
            }
            if (this.isArray(v)) {
                return (0 === v.length);
            }
            if (this.isObject(v)) {
                return (0 === Object.keys(v).length);
            }
            return false;
        }
    };

    let Str = {
        trim: function (v) {
            return v.trim(v);
        },
        replace: function (msg, ps) {
            if (!VType.isArray(ps)) {
                ps = [ps];
            }
            for (let i in ps) {
                msg = msg.replace('%s', ps[i]);
            }
            return msg;
        }
    };

    let Cookie = {
        set: function (name, val, expire) {
            let vs = name + '=' + Url.encode(Unit.toString(val)) + ';';
            if (expire) {
                let d = new Date();
                d.setTime(d.getTime() + expire * 1000);
                vs += 'expires=' + d.toUTCString() + ';';
            }
            document.cookie = vs + 'path=/;';
        }, get: function (name) {
            let sc = document.cookie;
            let ac = sc.split('; ');
            for (let i in ac) {
                let a = ac[i].split('=');
                if (!a[1]) {
                    return '';
                }
                if (name === a[0]) {
                    return Unit.toObject(Url.decode(a[1]));
                }
            }
            return '';
        }, del: function (name) {
            let _c = Cookie.get(name);
            if (_c != null) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
            }
        }, flush: function () {
            let sc = document.cookie;
            let ac = sc.split('; ');
            for (let i in ac) {
                let a = ac[i].split('=');
                Cookie.del(a[0]);
            }
        }
    };

    let Unit = {
        rand: function () {
            return Math.ceil(Math.pow(10, 16) * Math.random());
        },
        random: function (min, max) {
            if (!VType.isDefined(min)) {
                min = 0;
            }
            if (!VType.isDefined(max)) {
                max = Math.pow(10, 16);
            }
            return min + Math.round((max - min) * Math.random());
        },
        ksort: function (v) {
            let keys = Object.keys(v).sort();
            let R = {};
            for (let i = 0; i < keys.length; i++) {
                R[keys[i]] = v[keys[i]];
            }
            return R;
        },
        each: function (arr, fn) {
            if (VType.isObject(arr)) {
                for (let i in arr) {
                    let r = fn(i, arr[i]);
                    if (false === r) {
                        return false;
                    }
                }
                return true;
            }
        },
        hash: function (v) {
            if (VType.isObject(v)) {
                v = Url.buildQuery(Unit.ksort(v));
            }
            return md5(v);
        },
        toObject: function (v) {
            if (VType.isObject(v)) {
                return v;
            }
            try {
                return eval('(' + v + ')');
            } catch (e) {
                return {};
            }
        },
        toString: function (v) {
            if (null === v) return null;
            if (undefined === v) return undefined;
            switch (VType.type(v)) {
                case 'boolean':
                    return v ? 'true' : 'false';
                case 'number':
                    return v;
                case 'string':
                    v = v.replace(/[\'\"\[\]\{\}\\]/gi, function (m) {
                        return "\\" + m;
                    });
                    return '"' + v + '"';
                case 'object':
                    let r, ta = [];
                    if (VType.isArray(v)) {
                        for (let k in v) {
                            ta.push(Unit.toString(v[k]));
                        }
                        r = '[' + ta.join(',') + ']';
                    } else {
                        for (let k in v) {
                            ta.push(Unit.toString(k) + ':' + Unit.toString(v[k]));
                        }
                        r = '{' + ta.join(',') + '}';
                    }
                    return r;
                default:
                    return '*UNKNOWN*';
            }
        }
    };

    let Json = {
        merge : function () {
            if (0 === arguments.length) {
                return {};
            }
            let isExtend = true, i = 0;
            if (VType.isBoolean(arguments[0])) {
                isExtend = arguments[0];
                i = 1;
            }

            if (isExtend) {
                let R = {};
                for (; i < arguments.length; i++) {
                    let t = arguments[i];
                    if (!VType.isObject(t)) {
                        continue;
                    }
                    Unit.each(t, function (k, v) {
                        R[k] = v;
                    });
                }
                return R;
            } else {
                let t = arguments[i];
                if (!VType.isObject(t)) {
                    return {};
                }
                let R = {};
                Unit.each(t, function (k, v) {
                    R[k] = v;
                });

                i++;
                for (; i < arguments.length; i++) {
                    let t = arguments[i];
                    if (!VType.isObject(t)) {
                        continue;
                    }
                    Unit.each(t, function (k, v) {
                        if (!VType.isDefined(R[k])) {
                            return true;
                        }
                        R[k] = v;
                    });
                }
                return R;
            }
        }
    };

    let Url = {
        encode: function (v) {
            return encodeURIComponent(v);
        },
        decode: function (v) {
            return decodeURIComponent(v);
        },
        buildQuery: function () {
            function c(j, s, a) {
                if (!VType.isObject(j)) return a ? (a + '[' + j + ']') : j;
                let o = [];
                for (let k in j) {
                    let tk = s ? Url.encode(k) : k;
                    tk = a ? (a + '[' + tk + ']') : tk;
                    if (!VType.isObject(j[k])) {
                        let tv = s ? Url.encode(j[k]) : j[k];
                        o.push(tk + '=' + tv);
                    } else {
                        o.push(c(j[k], s, tk));
                    }
                }
                return o.join('&');
            }

            // Create query string.
            let len = arguments.length, i = 0, s, o = [];
            if (len < 1) return '';
            if (1 === len) {
                s = false;
            } else {
                s = arguments[len - 1];
                if (VType.isBoolean(s)) {
                    len--;
                } else {
                    s = false;
                }
            }
            for (; i < len; i++) {
                o.push(c(arguments[i], s, ''));
            }
            return o.join('&');
        },
        createUrl: function (url) {
            if (!url) {
                url = Win.cUrl();
            }
            let args = Array.prototype.slice.call(arguments, 0);
            args.shift();
            let query = Url.buildQuery.apply(this, args);
            if (query) {
                if (-1 === url.indexOf('?')) {
                    url += '?';
                } else {
                    url += '&';
                }
                url += query;
            }
            return url;
        }
    };

    let Win = {
        cUrl: function () {
            if (VType.isDefined(Win.__cUrl)) {
                return Win.__cUrl;
            }
            return Win.__cUrl = window.location.href;
        },
        reload: function () {
            window.location.reload();
        },
        redirect: function (url) {
            url = Url.createUrl.apply(this, arguments);
            window.location.href = url;
        },
        jsPath: function () {
            if (!VType.isDefined(this.__jsPath)) {
                let ds = document.getElementsByTagName('script');
                let src, iof;
                for (let i = 0; i < ds.length; i++) {
                    src = ds[i].src;
                    if (!src || -1 === (iof = src.indexOf('/h.js'))) {
                        continue;
                    }
                    this.__jsPath = src.substring(0, iof);
                }
            }
            return this.__jsPath;
        },
        cssPath: function () {
            if (!VType.isDefined(this.__cssPath)) {
                let sp = this.jsPath();
                this.__cssPath = sp.substring(0, sp.lastIndexOf('/')) + "/css";
            }
            return this.__cssPath;
        }
    };

    let Doc = {
        head: function () {
            if (VType.isDefined(Doc.__head)) {
                return Doc.__head;
            }
            return Doc.__head = document.getElementsByTagName('head')[0];
        },
        loadCss: function (href, id) {
            if (VType.isString(id) && document.getElementById(id)) {
                return;
            }

            let hc = document.createElement('link');
            if (VType.isString(id)) {
                hs.setAttribute('id', id);
            }
            hc.setAttribute('rel', 'stylesheet');
            hc.setAttribute('type', 'text/css');
            hc.setAttribute('href', href);
            Doc.head().appendChild(hc);
        },
        loadJs: function (src, callback, id) {
            if (VType.isString(id) && document.getElementById(id)) {
                if (VType.isFunction(callback)) {
                    callback.apply(hs);
                }
                return;
            }

            let hs = document.createElement('script');
            if (VType.isString(id)) {
                hs.setAttribute('id', id);
            }
            if (window.H_DEBUG) {
                src = Url.createUrl(src, {__RANDOM__: Unit.rand()});
            }
            hs.setAttribute('type', 'text/javascript');
            hs.setAttribute('src', src);
            Doc.head().appendChild(hs);
            if (VType.isFunction(callback)) {
                if (window.ActiveXObject) {
                    hs.onreadystatechange = function () {
                        if ('loaded' === hs.readyState) {
                            callback.apply(hs);
                        }
                    };
                } else {
                    hs.onload = function () {
                        callback.apply(hs);
                    }
                }
            }
            return hs;
        },
        remoteJson: function (url, params, callback) {
            if (!VType.isString(url)) {
                return;
            }
            let rs = Unit.rand(), remote_fn = 'H_Json_' + rs;
            window[remote_fn] = function (remoteData) {
                let hs = document.getElementById(remote_fn);
                Doc.head().removeChild(hs);
                window[remote_fn] = undefined;
                if (VType.isFunction(callback)) callback(remoteData);
            };
            let _url = Url.createUrl(url, {H_CALLBACK: remote_fn}, params, {'__': rs});
            Doc.loadJs(_url, '', remote_fn);
        }
    };

    let Event = {
        preventDefault: function (e) {
            e.preventDefault && e.preventDefault();
        },
        stopPropagation: function (e) {
            e.stopPropagation && e.stopPropagation();
        }
    };

    window.H = {
        date: '2018-08-21',
        version: '1.0',
        type: VType.type,
        isDefined: VType.isDefined,
        isString: VType.isString,
        isNumber: VType.isNumber,
        isInteger: VType.isInteger,
        isBoolean: VType.isBoolean,
        isFunction: VType.isFunction,
        isObject: VType.isObject,
        isArray: VType.isArray,
        isEmpty: VType.isEmpty,

        setCookie: Cookie.set,
        getCookie: Cookie.get,
        delCookie: Cookie.del,
        flushCookie: Cookie.flush,

        rand: Unit.rand,
        random: Unit.random,
        ksort: Unit.ksort,
        each: Unit.each,
        hash: Unit.hash,
        toJson: Unit.toObject,
        toString: Unit.toString,

        merge: Json.merge,

        trim: Str.trim,
        replace: Str.replace,

        buildQuery: Url.buildQuery,
        createUrl: Url.createUrl,

        loadCss: Doc.loadCss,
        loadJs: Doc.loadJs,
        remoteJson: Doc.remoteJson,

        preventDefault: Event.preventDefault,
        stopPropagation: Event.stopPropagation,

        reload: Win.reload,
        redirect: Win.redirect,
        jsPath: Win.jsPath,
        cssPath: Win.cssPath
    };
})();