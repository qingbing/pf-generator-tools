(function ($) {
    var PM = new ParamsManager('menu');
    var L = {
        config: {
            ops: {
                'name': '',
                'share': false
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            op.cache = !H.isEmpty(op.name);
            if (op.cache) {
                op.openDlIndex = H.getCookie(op.name);
                !op.openDlIndex && !op.share && (op.openDlIndex = []);
                op.cookieName = op.name + '_cache';
                op.selectDdIndex = H.getCookie(op.cookieName);
            } else {
                op.openDlIndex = undefined;
                op.selectDdIndex = undefined;
            }
            // 菜单初始化
            var $dls = $trigger.children('dl');
            var $dts = $dls.children('dt');
            var $dds = $dls.children('dd');
            $dts.prepend('<i class="fa fa-folder"></i>');
            // Init menu piece.
            $dds.removeClass('active').hide();

            if ('' !== op.openDlIndex) {
                var $openDl;
                if (op.share) {// share{}
                    $openDl = $dls.eq(op.openDlIndex);
                    $openDl.find('dt').addClass('active').find('.fa')
                        .removeClass('fa-folder').addClass('fa-folder-open');
                    $openDl.children('dd').show();
                } else {
                    if (H.isArray(op.openDlIndex)) {
                        for (var i in op.openDlIndex) {
                            $openDl = $dls.eq(op.openDlIndex[i]);
                            $openDl.find('dt').addClass('active').find('.fa')
                                .removeClass('fa-folder').addClass('fa-folder-open');
                            $openDl.children('dd').show();
                        }
                    }
                }
            }
            if (H.isInteger(op.selectDdIndex)) {
                $dds.eq(op.selectDdIndex).addClass('active');
            }

            $dts.on('click', L.events.dtClick);
            $dds.on('click', L.events.ddClick)
                .on('mouseenter', L.events.ddMouseEnter)
                .on('mouseleave', L.events.ddMouseLeave);
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
        },
        func: {},
        events: {
            dtClick: function (e) {
                var $dt = $(this);
                var $trigger = $dt.closest('dl').parent();
                var $dls = $trigger.children('dl');
                var op = PM.getOption($trigger);
                var index;
                var $arrow = $dt.children('.fa'), isOpened = $arrow.hasClass('fa-folder-open');
                if (op.share) {
                    if (isOpened) {
                        $dt.removeClass('active').children('.fa')
                            .removeClass('fa-folder-open').addClass('fa-folder');
                        $dt.siblings('dd').slideUp();
                        if (op.cache) {
                            H.setCookie(op.name, "");
                        }
                    } else {
                        // Close all.
                        $dls.removeClass('active').find('dt .fa')
                            .removeClass('fa-folder-open').addClass('fa-folder');
                        $dls.children('dd').slideUp();
                        // Open active
                        $dt.addClass('active').children('.fa')
                            .removeClass('fa-folder').addClass('fa-folder-open');
                        $dt.siblings('dd').slideDown();
                        if (op.cache) {
                            H.setCookie(op.name, $dls.index($dt.parent()));
                        }
                    }
                } else {
                    if (isOpened) {
                        $dt.removeClass('active').children('.fa')
                            .removeClass('fa-folder-open').addClass('fa-folder');
                        $dt.siblings('dd').slideUp();
                        if (op.cache) {
                            index = $dls.index($dt.parent());
                            var r = [];
                            for (var i in op.openDlIndex) {
                                (index !== op.openDlIndex[i]) && (r.push(op.openDlIndex[i]));
                            }
                            op.openDlIndex = r;
                            H.setCookie(op.name, op.openDlIndex);
                        }
                    } else {
                        $dt.addClass('active').children('.fa')
                            .removeClass('fa-folder').addClass('fa-folder-open');
                        $dt.siblings('dd').slideDown();
                        if (op.cache) {
                            index = $dls.index($dt.parent());
                            op.openDlIndex.push(index);
                            H.setCookie(op.name, op.openDlIndex);
                        }
                    }
                }
            },
            ddClick: function (e) {
                var $dd = $(this);
                var $trigger = $dd.closest('dl').parent();
                var op = PM.getOption($trigger);
                var $dls = $trigger.children('dl');
                var $dds = $dls.children('dd');
                $dds.removeClass('active');
                $dd.addClass('active');
                op.cache && (H.setCookie(op.cookieName, $dds.index($dd)));
            },
            ddMouseEnter: function (e) {
                $(this).addClass('hover');
            },
            ddMouseLeave: function (e) {
                $(this).removeClass('hover');
            }
        }
    };

    $.fn.extend({
        menu: function (ops) {
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