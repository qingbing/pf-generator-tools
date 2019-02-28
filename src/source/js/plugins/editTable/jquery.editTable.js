(function ($) {
    var PM = new ParamsManager('editTable');
    var L = {
        config: {
            ops: {
                'type': undefined, // text(default),textarea,checkbox,select,up-down

                'ajaxUrl': undefined,
                'postData': {},

                'reload': false,
                'callback': undefined,
                'alert': undefined,
                'tipTarget': ".w-tip"
            },
            setConfig: function ($td, data) {
                $td.data("__EDIT_TABLE__", data);
            },
            getConfig: function ($td) {
                return $td.data("__EDIT_TABLE__");
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            op.postData = H.toJson(op.postData);

            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            L.func.runTable($trigger);
        },
        func: {
            adjustUpDownBtn: function ($table) {
                var $trs = $table.find('tr');
                var $downs = $trs.children('td[data-name][data-type=upDown]').find('.w-edit-table-down');
                var $ups = $trs.children('td[data-name][data-type=upDown]').find('.w-edit-table-up');
                $ups.removeClass('disabled').eq(0).addClass('disabled');
                $downs.removeClass('disabled').eq($ups.length - 1).addClass('disabled');
            },
            tip: function (tdData, isSuccess, message) {
                if (isSuccess && tdData.reload) {
                    H.reload();
                    return;
                }
                if (H.isFunction(tdData.callback)) {
                    tdData.callback(tdData, isSuccess, message);
                    return;
                }
                if (tdData.$tipTarget) {
                    if (isSuccess) {
                        tdData.$tipTarget.removeClass('text-danger').addClass('text-success').text(message);
                    } else {
                        tdData.$tipTarget.removeClass('text-success').addClass('text-danger').text(message);
                    }
                } else if (tdData.alert || !isSuccess) {
                    $.alert(message);
                }
            },
            save: function (tdData) {
                var postData = $.extend({}, tdData.postData);
                switch (tdData.type) {
                    case 'checkbox':
                        postData[tdData.name] = tdData.$checkbox.is(':checked') ? 1 : 0;
                        break;
                    default : // select, textarea, text
                        postData[tdData.name] = tdData.$field.val();
                        break;
                }
                $.post(tdData.ajaxUrl, postData, function (rs) {
                    var message, isSuccess;
                    if (H.isObject(rs) && 0 === parseInt(rs.code)) {
                        // success
                        if ('select' === tdData.type) {
                            tdData.$span.text(tdData.options[tdData.$field.val()]);
                        } else if ('checkbox' !== tdData.type) {//text, input-text
                            tdData.$span.text(tdData.$field.val());
                        }
                        message = rs.message ? rs.message : 'Success!';
                        isSuccess = true;
                    } else {
                        switch (tdData.type) {
                            case 'checkbox':
                                var _checked = tdData.$checkbox.get(0).checked;
                                tdData.$checkbox.get(0).checked = !_checked;
                                break;
                            case 'select':
                                var _value = tdData.$span.text();
                                for (var i in tdData.options) {
                                    if (tdData.options[i] === _value) {
                                        tdData.$field.val(i);
                                        break;
                                    }
                                }
                                break;
                            default://text, input-text
                                tdData.$field.val(tdData.$span.text());
                                break;
                        }
                        message = (H.isObject(rs) && rs.message) ? rs.message : 'Error Return!';
                        isSuccess = false;
                    }
                    if ('checkbox' !== tdData.type) {
                        tdData.$field.hide();
                        tdData.$span.show();
                    }
                    L.func.tip(tdData, isSuccess, message);
                }, 'json');
            },
            runTable: function ($table) {
                var op = PM.getOption($table);
                var $trs = $table.find('tr');
                $trs.each(function () {
                    var $tr = $(this);
                    var $tds = $tr.children('td[data-name]');
                    if ($tds.length === 0) {
                        return true;
                    }
                    var trData = $tr.data();
                    if (trData.postData) {
                        trData.postData = H.toJson(trData.postData);
                    }
                    trData = $.extend(true, {}, op, trData);
                    var $tipTarget = $tr.find(trData.tipTarget);
                    if ($tipTarget.length > 0) {
                        trData.$tipTarget = $tipTarget;
                    }
                    $tds.each(function () {
                        var $td = $(this);
                        var tdData = $td.data();
                        if (tdData.postData) {
                            tdData.postData = H.toJson(tdData.postData);
                        }
                        tdData = $.extend(true, {}, trData, tdData);
                        if (H.isEmpty(tdData.ajaxUrl) || H.isEmpty(tdData.name)) {
                            return true;
                        }
                        tdData.$td = $td;
                        tdData.callback = H.toJson(tdData.callback);
                        // type = checkbox
                        var $checkbox = $td.children('input[type=checkbox]');
                        if (1 === $checkbox.length) {
                            tdData.type = 'checkbox';
                            tdData.$checkbox = $checkbox;
                            L.config.setConfig($td, tdData);
                            $checkbox.on('click', L.events.checkboxClick);
                            return true;
                        }
                        if ('upDown' === tdData.type) {
                            $tr.addClass('w-edit-table-movable');
                            if (0 === $td.children('.w-edit-table-down').length) {
                                $td.prepend('<i class="fa fa-long-arrow-down btn btn-warning w-edit-table-down"></i> ');
                            }
                            if (0 === $td.children('.w-edit-table-up').length) {
                                $td.prepend('<i class="fa fa-long-arrow-up btn btn-info w-edit-table-up"></i> ');
                            }
                            L.config.setConfig($td, tdData);
                            $td.children('.w-edit-table-down').on('click', {type: "down"}, L.events.upDownClick);
                            $td.children('.w-edit-table-up').on('click', {type: "up"}, L.events.upDownClick);
                            return true;
                        }
                        // type = select
                        if ('select' === tdData.type) {
                            tdData.options = H.toJson(tdData.options);
                            // select options
                            if (H.isEmpty(tdData.options) || !H.isObject(tdData.options)) {
                                return true;
                            }
                        }
                        // type = text(default),textarea,select
                        L.config.setConfig($td, tdData);
                        $td.on('click', L.events.tdClick);
                        return true;
                    });
                });
                L.func.adjustUpDownBtn($table);
            }
        },
        events: {
            checkboxClick: function (e) {
                var tdData = L.config.getConfig($(this).closest('td'));
                L.func.save(tdData);
            },
            upDownClick: function (e) {
                var tdData = L.config.getConfig($(this).closest('td'));
                var $tr = $(this).closest('tr');
                var type = e.data.type;

                // success
                var $relative_tr;
                if ('up' === type) {
                    $relative_tr = $tr.prevAll('tr.w-edit-table-movable').eq(0);
                } else {
                    $relative_tr = $tr.nextAll('tr.w-edit-table-movable').eq(0);
                }
                if (0 === $relative_tr.length) {
                    return false;
                }
                tdData.postData[tdData.name] = type;
                $.post(tdData.ajaxUrl, tdData.postData, function (rs) {
                    var message, isSuccess;
                    if (H.isObject(rs) && 0 === rs.code) {
                        var $tr = tdData.$td.parent();
                        // success
                        if ('up' === type) {
                            $relative_tr.before($tr);
                        } else {
                            $relative_tr.after($tr);
                        }
                        L.func.adjustUpDownBtn($tr.closest('table'));
                        message = rs.message ? rs.message : 'Success!';
                        isSuccess = true;
                    } else {
                        message = (H.isObject(rs) && rs.message) ? rs.message : 'Error Return!';
                        isSuccess = false;
                    }
                    L.func.tip(tdData, isSuccess, message);
                }, 'json');
            },
            tdClick: function (e) {
                var tdData = L.config.getConfig($(this).closest('td'));
                var $td = tdData.$td;
                if (!tdData.$field) {
                    // generate and bind event.
                    tdData.value = $td.html();
                    $td.wrapInner('<span></span>');
                    tdData.$span = $td.children('span');
                    // Create the element view HTML.
                    var _classStr = tdData.class ? (' ' + tdData.class) : '', _htmlStr;
                    switch (tdData.type) {
                        case 'select':
                            if (!H.isObject(tdData.options)) {
                                return;
                            }
                            _htmlStr = '<select name="' + tdData.name + '" class="form-control' + _classStr + '"';
                            _htmlStr += '>';
                            for (var i in tdData.options) {
                                _htmlStr += '<option value="' + i + '"';
                                if (tdData.value === tdData.options[i]) {
                                    _htmlStr += ' selected="selected"';
                                }
                                _htmlStr += '>' + tdData.options[i] + '</option>';
                            }
                            _htmlStr += '</select>';
                            break;
                        case 'textarea':
                            _htmlStr = '<textarea name="' + tdData.name + '" class="form-control' + _classStr + '"';
                            _htmlStr += '>';
                            _htmlStr += tdData.value;
                            _htmlStr += '</textarea>';
                            break;
                        default :
                            _htmlStr = '<input type="text" name="' + tdData.name + '" class="form-control' + _classStr + '"';
                            _htmlStr += 'value="' + tdData.value + '"';
                            _htmlStr += ' />';
                            break;
                    }
                    tdData.$field = $(_htmlStr).appendTo($td).bind('blur', function () {
                        L.func.save(tdData);
                    });
                }
                tdData.$field.show().focus();
                tdData.$span.hide();
            }
        }
    };

    $.fn.extend({
        editTable: function (ops) {
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