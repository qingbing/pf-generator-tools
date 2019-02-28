(function ($) {
    var PM = new ParamsManager('select');
    var L = {
        config: {
            ops: {
                placeholder: '', // 默认提示信息
                width: '100%', // 宽度
                allowClear: true, // 若为单选，是否拥有清除单选内容的按钮
                data: undefined, // 静态显示数据[{id:1, text:'xx'}]
                minimumInputLength: undefined, // 输入查询最小字符串长度
                selected: undefined, // 默认选择项目，必须为数组
                multiple: false, // 是否多选
                query: undefined,
                ajaxUrl: undefined,
                callback: undefined
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            H.isEmpty(op.placeholder) && (delete op.placeholder);
            H.isEmpty(op.width) && (delete op.width);
            if (true === op.allowClear) {
                op.placeholderOption = "first";
            } else {
                delete op.allowClear;
            }
            op.data = H.toJson(op.data);
            H.isArray(op.data) || (delete op.data);

            H.isInteger(op.minimumInputLength) || (delete op.minimumInputLength);

            op.selected = H.toJson(op.selected);
            H.isArray(op.selected) || (delete op.selected);

            op.initSelection = H.toJson(op.initSelection);
            H.isFunction(op.initSelection) || (delete op.initSelection);

            op.query = H.toJson(op.query);
            if (!H.isFunction(op.query)) {
                if (H.isEmpty(op.ajaxUrl)) {
                    delete op.query;
                    delete op.ajaxUrl;
                } else {
                    if (!op.initSelection && !H.isEmpty($trigger.val())) {
                        op.initSelection = function (ele, callback) {
                            PF.ajax('query.php', {id: ele.val()}, function (data) {
                                callback(data[0]);
                            });
                        }
                    }
                    op.query = function (query) {
                        PF.ajax(op.ajaxUrl, {keyword: query.term}, function (data) {
                            query.callback({
                                results: data
                            });
                        });
                    }
                }
            } else {
                delete op.ajaxUrl;
            }
            op.callback = H.toJson(op.callback);
            H.isFunction(op.callback) || (delete op.callback);

            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            $trigger.select2(op);
            if (op.selected) {
                $trigger.select2('val', op.selected);
            }
            if (H.isFunction(op.callback)) {
                op.callback($trigger, op);
            }
        }
    };

    /**
     */
    $.fn.extend({
        select: function (ops) {
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