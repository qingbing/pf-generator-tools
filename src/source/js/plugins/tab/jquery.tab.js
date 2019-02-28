(function ($) {
    var PM = new ParamsManager('tab_li');
    var L = {
        config: {
            ops: {
                event: 'click',
                postData: {},
                callback: ''
            },
            tabLiOps: {
                callback: '',
                postData: '',
                ajaxUrl: ''
            }
        },
        initOp: function ($tab, op) {
            if (!H.isObject(op.postData)) {
                op.postData = H.toJson(op.postData);
            }
            op.callback = H.toJson(op.callback);
            if (!H.isFunction(op.callback)) {
                delete op.callback;
            }
            return op;
        },
        run: function ($tab, op) {
            if (false === op) {
                return false;
            }
            var $contentLis = $tab.find('.w-tab-content>li');
            var $headLis = $tab.find('.w-tab-heading>li');
            var index = -1; // 默认打开的tab
            $headLis.each(function (pi) {
                var $this = $(this);
                // 禁用的tab跳过
                if ($this.hasClass('disabled')) {
                    return;
                }
                // 计算默认打开的tab
                if ($this.hasClass('active')) {
                    index = pi;
                } else if (-1 === index) {
                    index = pi;
                }
                // 参数确认
                var data = $this.data();
                if (!H.isObject(data.postData)) {
                    data.postData = H.toJson(data.postData);
                }
                var ps = $.extend(true, {}, L.config.tabLiOps, data);
                ps.postData = $.extend(true, {}, op.postData, ps.postData);
                ps.callback = H.toJson(ps.callback);
                if (!H.isFunction(ps.callback)) {
                    if (H.isFunction(op.callback)) {
                        ps.callback = op.callback;
                    } else {
                        delete ps.callback;
                    }
                }
                ps.pi = pi;
                ps.$headLis = $headLis;
                ps.$contentLis = $contentLis;
                ps.initial = false;
                // 保存参数
                PM.setOption($this, ps);
            }).on(op.event, L.events.tabLiActive);
            // 默认初始化
            L.func.activeLi($headLis.eq(index));
        },
        func: {
            fillData: function ($li, op) {
                if (op.ajaxUrl) {
                    PF.ajax(op.ajaxUrl, op.postData, function (data) {
                        op.$contentLis.eq(op.pi).html(data);
                        if (H.isFunction(op.callback)) {
                            op.callback(op.$contentLis.eq(op.pi), op);
                        }
                    });
                } else if (H.isFunction(op.callback)) {
                    op.callback(op.$contentLis.eq(op.pi), op);
                }
            },
            activeLi: function ($li) {
                var op = PM.getOption($li);
                op.$headLis.removeClass('active').eq(op.pi).addClass('active');
                op.$contentLis.hide().eq(op.pi).show();
                // 数据装填
                if (false === op.initial) {
                    op.initial = true;
                    L.func.fillData($li, op);
                    PM.setOption($li, op);
                }
            }
        },
        events: {
            tabLiActive: function (e) {
                var $li = $(this);
                if ($li.hasClass('disabled') || $li.hasClass('active')) {
                    H.preventDefault(e);
                    H.stopPropagation(e);
                    return;
                }
                L.func.activeLi($li);
            }
        }
    };

    /**
     */
    $.fn.extend({
        tab: function (ops) {
            ops = $.extend(true, {}, L.config.ops, ops);
            $(this).each(function () {
                var $this = $(this);
                // 扩展参数设置
                var data = $this.data();
                if (data.postData) {
                    data.postData = H.toJson(data.postData);
                }
                L.run($this, L.initOp($this, $.extend(true, {}, ops, data)));
            });
            return this;
        }
    });
})(jQuery);
