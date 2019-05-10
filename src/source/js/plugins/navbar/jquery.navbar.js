(function ($) {
    var PM = new ParamsManager('navbar');
    var L = {
        config: {
            ops: {}
        },
        initOp: function ($navbar, op) {
            var $trigger = $navbar.find('.w-navbar-ctrl');
            if (0 === $trigger.length) {
                return false;
            }
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }

            var $target = $navbar.find('.w-navbar-main');
            if (0 === $target.length) {
                return false;
            }
            op.$target = $target;
            $trigger.on('click', L.events.ctrlClick);
            $navbar.find('.w-nav>.w-dropdown>.w-dropdown-menu>li').on('click', L.events.menuLiClick);
            $navbar.find('.w-navbar-form').on('click', L.events.formClick);

            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
        },
        func: {
            show: function ($trigger) {
                var op = PM.getOption($trigger);
                op.$target.show();
            },
            hide: function ($trigger) {
                var op = PM.getOption($trigger);
                if (op && op.$target) {
                    op.$target.hide();
                }
            }
        },
        events: {
            ctrlClick: function (e) {
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
                        H.stopPropagation(e);
                    } else {
                        L.func.hide($trigger);
                    }
                });
            },
            menuLiClick: function (e) {
                L.func.hide(PM.getCurrentTrigger());
            },
            formClick: function (e) {
                H.stopPropagation(e);
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
        L.func.hide($curTrigger);
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    });

    /**
     */
    $.fn.extend({
        navbar: function (ops) {
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