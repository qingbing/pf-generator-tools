(function ($) {
    var PM = new ParamsManager('dateRange');
    var L = {
        config: {
            ops: {
                minDate: '', // 可选最小日期
                maxDate: '', // 可选最大日期
                format: "YYYY-MM-DD", // 格式
                clean: true, // 清空按钮
                opens: "right", // 面板横向：right(default) | center | left
                drops: "down", // 面板纵向：down(default) | up
                single: true, // 单日历
                time: false, // 显示时间
                ranges: true, // 显示默认时间范围
                timeIncrement: false, // 显示时间时分钟的间隔
                // 双日历
                linked: true, // 双日历之间是否一起连动
                autoApply: true,
                dateLimit: false // 双日历最大日期间隔
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            var cop = {
                "showDropdowns": true, // 年月是否用下拉方式展示 true | false(default)
                "showWeekNumbers": true, // 是否显示年中周的表示
                "opens": op.opens, // 面板横向：right(default) | center | left
                "drops": op.drops,  // 面板纵向：down(default) | up
                "cancelClass": "btn-warning", // cancel 按钮class
                "applyClass": "btn-warning", // apply 按钮class
                "locale": {
                    // "direction": "ltr", // ranges显示方向，ltr(default) | rtl
                    "format": op.format, // 时间显示格式化
                    "separator": " - ", // 时间显示分割
                    "applyLabel": "确定", // apply标签
                    "cancelLabel": "取消", // cancel表现
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "自定义", // 自定义时间标签
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"], // 显示星期标签
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], // 显示月份标签
                    "firstDay": 0 // 显示在第一列的星期索引
                }
            };
            if (moment(op.minDate).isValid()) {
                cop.minDate = op.minDate;
            }
            if (moment(op.maxDate).isValid()) {
                cop.maxDate = op.maxDate;
            }
            if (op.single) {
                cop.singleDatePicker = true;
            } else {
                cop.singleDatePicker = false;
                if (!op.linked) {
                    cop.linkedCalendars = false; // 双日历时，两个日历是否同时前进或后退 true(default) | false
                }
                if (!op.autoApply) {
                    cop.autoApply = false;
                }
                if (op.dateLimit && H.isInteger(op.dateLimit) && op.dateLimit > 0) {
                    cop.dateLimit = {"days": op.dateLimit};
                }
                if (op.ranges) {
                    cop.ranges = {
                        "今天": [moment().startOf('day'), moment().endOf('day')],
                        "昨天": [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                        "最近7天": [moment().subtract(6, 'days').startOf('day'), moment()],
                        "最近30天": [moment().subtract(29, 'days').startOf('day'), moment()],
                        "本月": [moment().startOf('month'), moment().endOf('month')],
                        "上月": [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]
                    };
                    cop.alwaysShowCalendars = true; // 当开启ranges，选择非自定义时，日历是否一直显示 false(default) | true
                }
            }
            if (op.time) {
                cop.timePicker = true; // 是否显示时间 true | false(default)
                cop.timePicker24Hour = true; // 是否24小时显示 true | false(default)
                cop.timePickerSeconds = true; // 是否显示秒 true | false(default)
                if (op.timeIncrement && H.isInteger(op.timeIncrement) && op.timeIncrement > 1) {
                    cop.timePickerIncrement = op.timeIncrement; // minute 分的显示间隔，默认为1
                }
            }
            var $input = $trigger.children('input[type="text"]');
            if (1 === $input.length) {
                var val = $input.val(),
                    split = val.split(cop.locale.separator), start = null, end = null;
                if (2 === split.length) {
                    start = moment(split[0], cop.locale.format);
                    end = moment(split[1], cop.locale.format);
                } else if (cop.singleDatePicker && val !== "") {
                    start = moment(val, cop.locale.format);
                    end = moment(val, cop.locale.format);
                }
                if (null !== start && null !== end) {
                    cop.startDate = start;
                    cop.endDate = end;
                }
                $trigger.daterangepicker(cop, function (start, end, label) {
                    if (cop.singleDatePicker) {
                        $input.val(start.format(cop.locale.format));
                    } else {
                        $input.val(start.format(cop.locale.format) + ' - ' + end.format(cop.locale.format));
                    }
                });
                if (op.clean) {
                    var $clean = $('<span class="input-group-addon fa fa-close w-dateRange-clean"></span>').insertAfter($input);
                    $clean.on('click', L.events.clickCleanBtn);
                }
            } else {
                $trigger.daterangepicker(cop);
            }
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
        },
        events: {
            clickCleanBtn: function (e) {
                $(this).prev().val("");
                H.stopPropagation(e);
            }
        }
    };

    $.fn.extend({
        dateRange: function (ops) {
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