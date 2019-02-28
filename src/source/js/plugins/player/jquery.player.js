(function ($) {
    var PM = new ParamsManager('player');
    var L = {
        config: {
            ops: {
                'width': undefined,
                'height': undefined,
                'timeout': 3 // second
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }

            var $children = op.$children = $trigger.children();
            var many = op.many = $children.length;
            if (0 === many) {
                return false;
            }
            if (op.width) {
                $trigger.width(op.width);
            }
            delete op.width;
            if (op.height) {
                $trigger.height(op.height);
            }
            delete op.height;
            op.timeout *= 1000;
            $children.each(function (i) {
                var $_children = $(this).children();
                $_children.each(function (j) {
                    if (0 === j) {
                        $(this).addClass('w-player-content');
                    } else if (1 === j) {
                        $(this).addClass('w-player-summary');
                    } else {
                        $(this).hide();
                    }
                });
            });

            if (many <= 1) {
                return false;
            }
            // 添加tips
            var tip = '<ul class="w-player-tips">';
            for (var _j = 1; _j <= many; _j++) {
                tip += '<li><a href="javascript:void(0)">' + _j + '</a></li>';
            }
            tip += "</ul>";
            $trigger.append(tip);
            op.$tips = $trigger.find('ul.w-player-tips li');
            op.timer = undefined;
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            // 事件绑定
            op.$tips.on('click', {trigger: $trigger}, L.events.tipClick);
            // op.$tips.on('click', function (e) {
            //     e.stopPropagation();
            //     if (op.timer) window.clearTimeout(op.timer);
            //     runPiece(op.$tips.index($(this)));
            // });
            // $children.on('mouseover', function (e) {
            //     if (op.timer) window.clearTimeout(op.timer);
            // }).on('mouseout', function (e) {
            //     runPiece(op.$children.index($(this)), true);
            // });
            L.func.runPiece($trigger, 0, true);
        },
        func: {
            runPiece: function ($trigger, piece, justShow) {
                var op = PM.getOption($trigger);
                var _showTime = justShow ? 0 : 1000;
                if (piece === op.many) {
                    // 当循环到最后一个piece时返回第一个
                    piece = 0;
                }
                op.$tips.removeClass('active').eq(piece).addClass('active');
                op.$children.hide().eq(piece).show(_showTime);
                op.timer = setTimeout(function () {
                    L.func.runPiece($trigger, piece + 1);
                }, op.timeout);
            }
        },
        events: {
            tipClick: function (e) {
                var op = PM.getOption(e.data.trigger);
                H.stopPropagation(e);
                if (op.timer) {
                    window.clearTimeout(op.timer);
                }
                L.func.runPiece(e.data.trigger, op.$tips.index($(this)));
            }
        }
    };

    /**
     */
    $.fn.extend({
        player: function (ops) {
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