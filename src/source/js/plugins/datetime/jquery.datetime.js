(function ($) {
    var L = {
        config: {
            week: [
                ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            ],
            types: {
                'show': {'format': 'Y-m-d H:i:s D'},
                'go': {'format': 'Y-m-d H:i:s D'},
                'back': {
                    'showTime': true,
                    'dayMsg': '天',
                    'hourMsg': '时',
                    'minuteMsg': '分',
                    'secondMsg': '秒',
                    'overMsg': 'OVER.^_^'
                }
            },
            ops: {'type': 'show'}
        },
        initOp: function ($trigger, op) {
            if (!H.isDefined(op.type) || !H.isDefined(L.config.types[op.type])) {
                $.alert("未指定datetime控件类型");
                return false;
            }
            op = $.extend({}, L.config.types[op.type], op);
            if ('show' === op.type) {
                op.date = L.func.getDate(op.time);
            }
            if ('back' === op.type) {
                if (H.isEmpty(op.time)) {
                    $.alert("未指定倒计时目标时间");
                    return false;
                }
                op.date = L.func.getDate(op.time);
                if (op.date <= new Date()) {
                    $trigger.html(op.overMsg);
                    return false;
                }
                op.isRunning = false;
            }
            op.$target = $trigger;
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            switch (op.type) {
                case 'go' :
                    L.func[op.type](op);
                    break;
                case 'back' :
                    L.func[op.type](op);
                    break;
                default :
                    L.func[op.type](op);
                    break;
            }
        },
        func: {
            getDate: function (time) {
                if (!H.isDefined(time)) {
                    return new Date();
                }
                if (H.isEmpty(time)) {
                    return false;
                }
                var m;
                if (m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(time)) {
                    return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
                }
                if (m = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})?$/.exec(time)) {
                    return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]), parseInt(m[4]), parseInt(m[5]), parseInt(m[6]));
                }
                if (H.isInteger(time)) {
                    var d = new Date();
                    d.setTime(time * 1000);
                    return d;
                }
                return false;
            },
            dateFormat: function (date, format) {
                if (!H.isDefined(format)) {
                    format = 'Y-m-d H:i:s';
                }
                var _fa = format.split(''), RString = '', _t;
                while (true) {
                    var _f = _fa.shift();
                    if (!H.isDefined(_f)) {
                        break;
                    }
                    switch (_f) {
                        case 'Y':
                            RString += date.getFullYear(); // 年：四位数
                            break;
                        case 'm':
                            _t = date.getMonth() + 1; // 月：0 ~ 11
                            if (_t < 10) {
                                _t = '0' + _t;
                            }
                            RString += _t;
                            break;
                        case 'd':
                            _t = date.getDate(); // 天：1 ~ 31
                            if (_t < 10) {
                                _t = '0' + _t;
                            }
                            RString += _t;
                            break;
                        case 'H':
                            _t = date.getHours(); // 时：0 ~ 23
                            if (_t < 10) {
                                _t = '0' + _t;
                            }
                            RString += _t;
                            break;
                        case 'i':
                            _t = date.getMinutes(); // 分：0 ~ 59
                            if (_t < 10) {
                                _t = '0' + _t;
                            }
                            RString += _t;
                            break;
                        case 's':
                            _t = date.getSeconds(); // 秒：0 ~ 59
                            if (_t < 10) {
                                _t = '0' + _t;
                            }
                            RString += _t;
                            break;
                        case 'D': // 一周的第几天：0~6,中文显示
                            _t = date.getDay();
                            RString += L.config.week[0][_t];
                            break;
                        case 'w': // 一周的第几天：0~6，英文简称
                            _t = date.getDay();
                            RString += L.config.week[1][_t];
                            break;
                        case 'W': // 一周的第几天：0~6，英文全称
                            _t = date.getDay();
                            RString += L.config.week[2][_t];
                            break;
                        default :
                            RString += _f;
                            break;
                    }
                }
                return RString;
            },
            go: function (op) {
                var html = this.dateFormat(this.getDate(), op.format);
                op.$target.html(html);
                setTimeout(function () {
                    L.func.go(op);
                }, 1000);
            },
            show: function (op) {
                var html = this.dateFormat(op.date, op.format);
                op.$target.html(html);
            },
            back: function (op) {
                if (!op.isRunning) {
                    var rest = op.restSec = Math.floor((op.date - this.getDate()) / 1000);
                    op.sec_n = rest % 60;
                    rest = Math.floor(rest / 60);
                    op.min_n = rest % 60;
                    rest = Math.floor(rest / 60);
                    op.hour_n = rest % 24;
                    op.day_n = Math.floor(rest / 24);
                    op.isRunning = true;
                } else {
                    op.sec_n--;
                    if (op.sec_n === -1) {
                        op.sec_n = 59;
                        op.min_n--;
                        if (op.min_n === -1) {
                            op.isRunning = false;
                            return this.back(op);
                        }
                    }
                }
                if (op.restSec > 0) {
                    var html = '';
                    if (op.showTime) {
                        html += op.day_n + op.dayMsg + (op.hour_n < 10 ? '0' : '') + op.hour_n + op.hourMsg + (op.min_n < 10 ? '0' : '') + op.min_n + op.minuteMsg + (op.sec_n < 10 ? '0' : '') + op.sec_n + op.secondMsg;
                    } else {
                        html += op.day_n + op.dayMsg;
                    }
                    op.$target.html(html);
                    op.timer = setTimeout(function () {
                        L.func.back(op);
                    }, 1000);
                } else {
                    op.$target.html(op.overMsg);
                    if (op.timer) {
                        clearTimeout(op.timer);
                    }
                }
            }
        }
    };

    $.fn.extend({
        datetime: function (ops) {
            ops = $.extend(true, {}, L.config.ops, ops);
            $(this).each(function () {
                var $this = $(this);
                // 扩展参数设置
                var data = $this.data();
                L.run($this, L.initOp($this, $.extend(true, {}, ops, data)));
            });
            return this;
        }
    });
})(jQuery);