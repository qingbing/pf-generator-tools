(function ($) {
    let PM = new ParamsManager('modal');
    let L = {
        config: {
            clientH: undefined,
            opened: [],
            ops: {
                'showCloseBtn': true,
                'layerClose': false,
                'href': undefined,
                'title': undefined,
                'htmlCallback': undefined,
                'htmlContent': undefined,
                'beforeCallback': undefined,
                'closeCallback': undefined
            }
        },
        initOp: function ($trigger, op) {
            if (H.isDefined($trigger)) {
                let tp = PM.getOption($trigger);
                if (H.isDefined(tp)) {
                    return tp;
                }
                if (H.isEmpty(op.href)) {
                    let _h = $trigger.attr('href');
                    _h && (op.href = _h);
                }
            } else if (!H.isDefined(op.href)) {
                return false;
            }
            // 如果没有标题，不显示关闭按钮
            if (!op.title) {
                op.showCloseBtn = false;
                op.layerClose = true;
            }
            if (op.href) {
                op.type = 'iframe';
                op.src = op.href;
            } else {
                op.type = 'content';
                // htmlFn, callback
                op.htmlContent = H.toJson(op.htmlContent);
                if (!H.isFunction(op.htmlContent)) {
                    return true;
                }
                op.htmlCallback = H.toJson(op.htmlCallback);
            }
            op.beforeCallback = H.toJson(op.beforeCallback);
            op.closeCallback = H.toJson(op.closeCallback);
            if (H.isDefined($trigger)) {
                op.$trigger = $trigger;
                PM.setOption($trigger, op);
                PM.addTrigger($trigger);
            }
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            // 点击触发显示模态框
            $trigger.on('click', L.events.clickTrigger);
        },
        func: {
            appendBox: function () {
                if (!H.isDefined(L.config.$objects)) {
                    let $objects = {};
                    let $box = $('#w-modal-id');
                    if (0 === $box.length) {
                        $box = $('<div class="w-modal-box" id="w-modal-id"><div class="w-modal-layer"></div><div class="container"><div class="w-modal-body col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">' +
                            '<div class="w-modal-header"><div class="w-modal-title"></div><a class="w-modal-close" href="javascript:void(0)"><span class="fa fa-close"></span></a></div>' +
                            '<div class="w-modal-content"></div>' +
                            '</div></div></div>').appendTo('body');
                        // 关闭按钮
                        $box.find('.w-modal-close').on('click', L.events.clickCloseBtn);
                    }
                    $objects.$box = $box.hide();
                    $objects.$layer = $box.find('.w-modal-layer');
                    $objects.$body = $box.find('.w-modal-body');
                    $objects.$header = $box.find('.w-modal-header');
                    $objects.$title = $box.find('.w-modal-title');
                    $objects.$closeBtn = $box.find('.w-modal-close');
                    $objects.$content = $box.find('.w-modal-content');
                    L.config.$objects = $objects;

                    L.func.computeWH();
                    $(window).on('resize', L.events.windowResize);
                }
            },
            computeWH: function () {
                if (
                    document.documentElement &&
                    document.documentElement.clientHeight
                ) {
                    L.config.clientH = document.documentElement.clientHeight;
                } else {
                    L.config.clientH = window.innerHeight;
                }
            },
            getParams: function ($trigger) {
                return $.extend({}, PM.getOption($trigger));
            },
            show: function (subOps, $trigger) {
                if (H.isDefined($trigger)) {
                    subOps = L.func.getParams($trigger);
                } else {
                    subOps = L.initOp(undefined, subOps);
                    if (!subOps) {
                        return false;
                    }
                }
                if (H.isFunction(subOps.beforeCallback) && true !== subOps.beforeCallback(subOps)) {
                    return false;
                }
                if (!H.isDefined(subOps.height)) {
                    subOps.height = L.config.clientH - 100;
                }
                L.config.$objects.$body.css({
                    top: ((L.config.clientH - subOps.height) / 2 + 'px'),
                    height: subOps.height
                });
                if (subOps.title) {
                    L.config.$objects.$title.html(subOps.title);
                    L.config.$objects.$header.show();
                    L.config.$objects.$content.height(subOps.height - 3 - L.config.$objects.$header.outerHeight());
                    subOps.showCloseBtn ? L.config.$objects.$closeBtn.show() : L.config.$objects.$closeBtn.hide();
                } else {
                    L.config.$objects.$header.hide();
                    L.config.$objects.$content.height(subOps.height - 3);
                }
                // Bind event to close modal for layer.
                if (subOps.layerClose) {
                    L.config.$objects.$layer.on('click', L.events.layerClose);
                }

                if (subOps.type === 'iframe') {
                    L.config.$objects.$content.addClass('w-modal-frame-box');
                    L.config.$objects.$content.empty().html('<iframe class="w-modal-frame" src="' + subOps.src + '" frameborder="0" scrolling="auto" allowtransparency="1"></iframe>');
                } else {
                    L.config.$objects.$content.removeClass('w-modal-frame-box');
                    L.config.$objects.$content.empty();
                    L.config.$objects.$content.html(subOps.htmlContent());
                    if (H.isFunction(subOps.htmlCallback)) {
                        subOps.htmlCallback(L.config.$objects.$content);
                    }
                }
                L.config.opened.push(subOps);
                L.config.$objects.$box.show();
            }
        },
        events: {
            windowResize: function (e) {
                L.func.computeWH();
            },
            clickCloseBtn: function (e) {
                hideModal(true);
                H.stopPropagation(e);
            },
            clickTrigger: function (e) {
                L.func.show(undefined, $(this));
                H.stopPropagation(e);
                H.preventDefault(e);
            },
            layerClose: function (e) {
                hideModal(true);
                H.stopPropagation(e);
            }
        }
    };

    // 关闭模态框
    if (!H.isDefined(window.modal)) {
        window.modal = {};
    }
    let hideModal = window.modal.hide = function (doNothing, reload, args) {
        let subOps = L.config.opened.pop();
        L.config.$objects.$box.hide();
        if (subOps.layerClose) {
            L.config.$objects.$layer.off('click', L.events.layerClose);
        }
        if (!subOps) return;
        if (doNothing) return;
        if (reload) {
            window.location.reload();
        } else if (H.isFunction(subOps.closeCallback)) {
            subOps.closeCallback(args);
        }
    };
    // 获取最新模态框的参数
    window.modal.getArguments = function () {
        return L.config.opened[L.config.opened.length - 1];
    };
    // js 新开modal
    window.modal.open = function (ops) {
        L.func.show(ops);
    };

    /**
     */
    $.fn.extend({
        modal: function (ops) {
            // 加载modal的框架
            L.func.appendBox();

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