(function ($) {
    let PM = new ParamsManager('template');
    let L = {
        config: {
            ops: {
                targetClose: true
            }
        },
        initOp: function ($trigger, op) {
            let tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }


            console.log('template params initial');

            // todo
            // todo coding to initial the config


            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }

            // todo
            // todo coding to initial the config
            console.log('template running');
        },
        func: {},
        events: {}
    };
    /**
     * 文档点击事件
     */
    $(document).on('click', function (e) {
        let op = PM.getOption();
        // todo coding
        console.log('template document click');
    });

    /**
     */
    $.fn.extend({
        template: function (ops) {
            ops = $.extend(true, {}, L.config.ops, ops);
            $(this).each(function () {
                let $this = $(this);
                // 扩展参数设置
                let data = $this.data();
                L.run($this, L.initOp($this, $.extend(true, {}, ops, data)));
            });
            return this;
        }
    });
})(jQuery);