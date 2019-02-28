(function ($) {
    var PM = new ParamsManager('checkbox');
    var L = {
        config: {
            ops: {
                'type': 'all',
                'target': '',
                'sync': false, // checkbox动态加载，默认false
                'afterSelect': ''
            },
            optionName: '__reversal_params__'
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            op.$trigger = $trigger;
            if (H.isEmpty(op.target)) {
                return false;
            }
            if (false === op.sync) {
                // 非动态加载
                var $targets = $(op.target);
                if (0 === $targets.length) {
                    return false;
                }
                op.$targets = $targets;
            }
            op.afterSelect = H.toJson(op.afterSelect);
            if (!H.isFunction(op.afterSelect)) {
                delete op.afterSelect;
            }
            if ('reverse' !== op.type) {
                op.type = 'all';
            }
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            // 全选，并且非动态加载checkbox时的反向控制
            if ('all' === op.type && false === op.sync) {
                op.$targets.data(L.config.optionName, op).on('click', L.events.optionReversal);
            }
            // 事件绑定
            $trigger.on('click', L.events.triggerClick);
        },
        events: {
            optionReversal: function (e) {
                var op = $(this).data(L.config.optionName);
                if (false === $(this).get(0).checked) {
                    op.$trigger.get(0).checked = false;
                }
                if (op.afterSelect) {
                    op.afterSelect(op.$trigger, op);
                }
            },
            triggerClick: function (e) {
                var $this = $(this);
                var op = PM.getOption($this);
                var checked = $this.is(':checked');
                var $target;
                if (false === op.sync) {
                    // 非动态加载
                    $target = op.$targets;
                } else {
                    $target = $(op.target);
                }
                if ('all' === op.type) {
                    $target.prop("checked", function () {
                        return checked;
                    });
                } else if ('reverse' === op.type && checked) {
                    $target.prop("checked", function (i, v) {
                        return !v;
                    });
                }
                if (op.afterSelect) {
                    op.afterSelect(op.$trigger, op);
                }
                e.stopPropagation();
            }
        }
    };

    $.fn.extend({
        checkbox: function (ops) {
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