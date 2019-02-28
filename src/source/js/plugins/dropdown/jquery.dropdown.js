(function ($) {
    var PM = new ParamsManager('dropdown');
    var L = {
        config: {
            ops: {
                targetClose: true
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            var $target = $trigger.children('.w-dropdown-menu');
            if ($target) {
                op.$target = $target;
            } else {
                return false;
            }
            if (H.isDefined(op.callback)) {
                op.callback = H.toJson(op.callback);
                if (!H.isFunction(op.callback)) {
                    delete op.callback;
                }
            }
            var $option = $trigger.children('.w-dropdown-option');
            if ($option.length > 0) {
                op.isOption = true;
                op.$option = $option;
            } else {
                op.isOption = false;
            }
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            $trigger.on('click', L.events.triggerClick);
            op.$target.children('li').on('click', L.events.menuLiClick);
            return op;
        },
        run: function ($trigger, op) {
        },
        func: {
            show: function ($trigger) {
                $trigger.addClass('active');
                var op = PM.getOption($trigger);
                op.$target.show();
            },
            hide: function ($trigger) {
                $trigger.removeClass('active');
                var op = PM.getOption($trigger);
                op.$target.hide();
            }
        },
        events: {
            triggerClick: function (e) {
                var $curTrigger = $(this);
                PM.each(function ($trigger) {
                    var op = PM.getOption($trigger);
                    if ($trigger.is($curTrigger)) {
                        // 点击了该触发器
                        if (op.$target.is(':visible')) {
                            L.func.hide($trigger);
                            PM.setCurrentTrigger(undefined);
                        } else {
                            L.func.show($trigger);
                            PM.setCurrentTrigger($curTrigger);
                        }
                    } else if (0 === $curTrigger.closest($trigger).length) {
                        L.func.hide($trigger);
                    }
                });
                H.stopPropagation(e);
            },
            menuLiClick: function (e) {
                var $li = $(this);
                if ($li.hasClass('disabled') || $li.hasClass('divider')) {
                    H.preventDefault(e);
                    H.stopPropagation(e);
                    return;
                }
                var op = PM.getOption();
                if (op.isOption) {
                    op.$option.html($li.text());
                    if (H.isDefined(op.fieldTarget)) {
                        $(op.fieldTarget).val($li.data('value'));
                    }
                }
                if (op.callback) {
                    op.callback(op, $li);
                    H.preventDefault(e);
                } else {
                    return true;
                }
            }
        }
    };
    /**
     * 文档点击事件
     */
    $(document).on('click', function (e) {
        var op = PM.getOption();
        if (!op) {
            return;
        }
        var $curTrigger = PM.getCurrentTrigger();
        PM.setCurrentTrigger(undefined);
        if (!op.$target.is(':visible')) {
            return;
        }
        if (0 === $(e.target).closest(op.$target).length) {
            L.func.hide($curTrigger);
            return;
        } else if (true === op.targetClose) {
            L.func.hide($curTrigger);
        }
        H.preventDefault(e);
        H.stopPropagation(e);
    });

    /**
     * w-field-target : #id, .class（用于选择类型）
     * w-target-close : false : 点击到显示目标是是否关闭，默认关闭
     */
    $.fn.extend({
        dropdown: function (ops) {
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