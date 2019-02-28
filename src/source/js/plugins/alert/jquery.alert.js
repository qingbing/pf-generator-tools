(function ($) {
    var L = {
        __$box: undefined,
        getBox: function () {
            if (!L.__$box) {
                var $body = $('body');
                L.__$box = $body.find('.alert-box').eq(0);
                if (0 === L.__$box.length) {
                    L.__$box = $('<div class="alert-box"></div>').appendTo($body.eq(0));
                }
            }
            return L.__$box;
        },
        func: {
            removeAlert: function ($alert) {
                $alert.slideUp(1000, function () {
                    $(this).remove();
                });
            }
        },
        events: {
            closeEvent: function (e) {
                L.func.removeAlert($(this).closest('.alert'));
            }
        }
    };
    $.extend({
        alert: function (msg, type) {
            var $box = L.getBox();
            // 参数规范化
            if (H.isString(type)) {
                type = type.toLowerCase();
            } else {
                type = 'info';
            }
            if (-1 === $.inArray(type, ['success', 'info', 'warning', 'danger'])) {
                type = 'info';
            }
            // 添加元素
            var $alert = $('<div class="alert alert-' + type + '"><span class="close">&times;</span>' + msg + '</div>');
            $box.append($alert);
            // 关闭事件
            $alert.find('.close').on('click', L.events.closeEvent);
            setTimeout(function () {
                L.func.removeAlert($alert);
            }, 5000);
        }
    });
})(jQuery);