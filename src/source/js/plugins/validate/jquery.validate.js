(function ($) {
    let PM = new ParamsManager('validate');
    let L = {
        validTypes: {
            required: {
                param: {
                    postData: '',
                    tipMsg: '请输入有效信息',
                    emptyMsg: '信息不能为空',
                    helpBlock: ''
                },
                fixed: {
                    allowEmpty: false
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            email: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的邮箱地址',
                    emptyMsg: '邮箱地址不能为空',
                    errorMsg: '邮箱地址输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            url: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的URL地址',
                    emptyMsg: 'URL地址不能为空',
                    errorMsg: 'URL地址输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^https?:\/\/[\w-]+(\.[\w-]+)+/i
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            ip: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的IP地址',
                    emptyMsg: 'IP地址不能为空',
                    errorMsg: 'IP地址输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(1\d{2}|2[0-4]\d|25[0-4]|[1-9]\d?)(\.(1\d{2}|2[0-4]\d|25[0-4]|[1-9]?\d)){3}$/ // (1~255).(0~255).(0~255).(0~255)
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            phone: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的电话号码(eg.010-6666666[-666])',
                    emptyMsg: '电话号码不能为空',
                    errorMsg: '电话号码输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            mobile: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的手机号码',
                    emptyMsg: '手机号码不能为空',
                    errorMsg: '手机号码输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^0?1\d{10}$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            contact: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的手机或电话号码',
                    emptyMsg: '联系方式不能为空',
                    errorMsg: '联系方式输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?)|(0?1\d{10})$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            fax: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的传真号(010-6666666[-666])',
                    emptyMsg: '传真号不能为空',
                    errorMsg: '传真号输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            zipcode: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的邮政编码',
                    emptyMsg: '邮政编码不能为空',
                    errorMsg: '邮政编码输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^\d{6}$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            datetime: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的时间(eg:2000-01-01 01:01:01)',
                    emptyMsg: '时间不能为空',
                    errorMsg: '时间输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(\d{2})?\d{2}-[0|1]?\d-[0-3]?\d [0-2]?\d:[0-5]?\d:[0-5]?\d$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            date: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的日期(eg:2000-01-01)',
                    emptyMsg: '日期不能为空',
                    errorMsg: '日期输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(\d{2})?\d{2}-[0|1]?\d-[0-3]?\d$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            username: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的用户名（2-18个字符）',
                    emptyMsg: '用户名不能为空',
                    errorMsg: '用户名输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\.]{2,18}$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            password: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的密码（6-18个字符）',
                    emptyMsg: '密码不能为空',
                    errorMsg: '密码输入无效',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^.{6,18}$/
                },
                rules: {
                    ajaxUrl: '',
                    callback: ''
                }
            },
            compare: {
                param: {
                    tipMsg: '请输入确认信息',
                    errorMsg: '确认信息不一致',
                    helpBlock: ''
                },
                rules: {
                    compare: '',
                },
                initParam: function (param) {
                    let $compare = $(param.compare);
                    if ($compare.length !== 1) {
                        $.alert("信息确认规则须设置有且仅有一个对比元素", 'warning');
                        return false;
                    }
                    param.$compare = $compare;
                }
            },
            preg: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的信息',
                    emptyMsg: '信息不能为空',
                    errorMsg: '信息输入无效',
                    helpBlock: ''
                },
                rules: {
                    pattern: '',
                    ajaxUrl: '',
                    callback: ''
                },
                initParam: function (param) {
                    if (H.isString(param.pattern)) {
                        param.pattern = H.toJson(param.pattern);
                        if (!H.isObject(param.pattern)) {
                            $.alert("正则规则无效", 'warning');
                            return false;
                        }
                    }
                }
            },
            string: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的信息',
                    emptyMsg: '信息不能为空',
                    errorMsg: '信息输入无效',
                    equalMsg: '请输入 %s 个字符',
                    minErrorMsg: '信息不能小于 %s 个字符',
                    maxErrorMsg: '信息不能大于 %s 个字符',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(.|\s)+$/
                },
                rules: {
                    equal: '',
                    minLength: '',
                    maxLength: '',
                    ajaxUrl: '',
                    callback: ''
                },
                initParam: function (param) {
                    param.equalMsg = H.replace(param.equalMsg, param.equal);
                    param.minErrorMsg = H.replace(param.minErrorMsg, param.minLength);
                    param.maxErrorMsg = H.replace(param.maxErrorMsg, param.maxLength);
                }
            },
            numeric: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的数字',
                    emptyMsg: '数字不能为空',
                    errorMsg: '数字输入无效',
                    minErrorMsg: '输入数字不能小于 %s',
                    maxErrorMsg: '输入数字不能大于 %s',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^-?(0|([1-9]\d*))(\.\d{1,})?$/
                },
                rules: {
                    min: '',
                    max: '',
                    ajaxUrl: '',
                    callback: ''
                },
                initParam: function (param) {
                    param.minErrorMsg = H.replace(param.minErrorMsg, param.min);
                    param.maxErrorMsg = H.replace(param.maxErrorMsg, param.max);
                }
            },
            integer: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的整数',
                    emptyMsg: '整数不能为空',
                    errorMsg: '整数输入无效',
                    minErrorMsg: '输入整数不能小于 %s',
                    maxErrorMsg: '输入整数不能大于 %s',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^-?(0|([1-9]\d*))$/
                },
                rules: {
                    min: '',
                    max: '',
                    ajaxUrl: '',
                    callback: ''
                },
                initParam: function (param) {
                    param.minErrorMsg = H.replace(param.minErrorMsg, param.min);
                    param.maxErrorMsg = H.replace(param.maxErrorMsg, param.max);
                }
            },
            money: {
                param: {
                    allowEmpty: true,
                    postData: '',
                    tipMsg: '请输入有效的金额',
                    emptyMsg: '金额不能为空',
                    errorMsg: '金额输入无效',
                    minErrorMsg: '输入金额不能小于 %s',
                    maxErrorMsg: '输入金额不能大于 %s',
                    helpBlock: ''
                },
                fixed: {
                    pattern: /^(0|([1-9]\d*))(\.\d{1,2})?$/
                },
                rules: {
                    min: '',
                    max: '',
                    ajaxUrl: '',
                    callback: ''
                },
                initParam: function (param) {
                    param.minErrorMsg = H.replace(param.minErrorMsg, param.min);
                    param.maxErrorMsg = H.replace(param.maxErrorMsg, param.max);
                }
            },
            file: {
                param: {
                    allowEmpty: true,
                    tipMsg: '请选择有效的文件',
                    emptyMsg: '请选择有效的文件',
                    errorMsg: '',
                    suffix: '', // 文件后缀列表，数组
                    helpBlock: ''
                },
                initParam: function (param) {
                    param.suffix = H.toJson(param.suffix);
                    H.isString(param.suffix) && (param.suffix = [param.suffix]);
                    if (!H.isEmpty(param.suffix) && H.isEmpty(param.errorMsg)) {
                        param.errorMsg = H.replace('仅支持 %s 类型的文件', param.suffix.join(','));
                    }
                }
            },
            select: {
                param: {
                    allowEmpty: true,
                    tipMsg: '请选择选项',
                    emptyMsg: '请选择选项',
                    helpBlock: ''
                }
            },
            choice: {
                param: {
                    allowEmpty: true,
                    tipMsg: '请选择',
                    emptyMsg: '请选择选项',
                    equalMsg: '请选中 %s 个选项',
                    minErrorMsg: '请至少选中 %s 个选项',
                    maxErrorMsg: '最多只能选中 %s 个选项',
                    helpBlock: ''
                },
                rules: {
                    equal: '',
                    min: '',
                    max: ''
                },
                initParam: function (param) {
                    param.equalMsg = H.replace(param.equalMsg, param.equal);
                    param.minErrorMsg = H.replace(param.minErrorMsg, param.min);
                    param.maxErrorMsg = H.replace(param.maxErrorMsg, param.max);
                },
                getVal: function ($field) {
                    let len;
                    if ('SELECT' === $field.get(0).tagName) {
                        len = $field.find('option:selected').length;
                    } else {
                        len = $field.filter(':checked').length;
                    }
                    return 0 === len ? '' : len;
                }
            },
            checked: {
                param: {
                    allowEmpty: false,
                    tipMsg: '请勾选',
                    emptyMsg: '请勾选',
                    helpBlock: ''
                },
                getVal: function ($field) {
                    let len = $field.filter(':checked').length;
                    return 0 === len ? '' : len;
                }
            }
        },
        config: {
            ops: {
                validateBtn: '#validateBtn',
                submitBtn: '#submitBtn',
                resetBtn: '#resetBtn',
                subMsg: '该表单您已经提交过啦',
                successMsg: '验证成功',
                failMsg: '没有全部通过验证',
                callback: undefined,
            }
        },
        initOp: function ($form, op) {
            let tp = PM.getOption($form);
            if (H.isDefined(tp)) {
                return tp;
            }
            // 验证字段检验并绑定
            let $validFields = $form.find('[data-valid-type]');
            for (let i = 0; i < $validFields.length; i++) {
                let $field = $validFields.eq(i);
                if ($field.data('isInit')) { // 已经初始化，主要使用在单选和多选组里面，避免重复绑定事件
                    continue;
                }
                let validType = $field.data('valid-type');
                if (!H.isDefined(L.validTypes[validType])) {
                    continue;
                }

                let param = H.merge(H.merge(false, H.merge(L.validTypes[validType].param, L.validTypes[validType].rules), $field.data()), L.validTypes[validType].fixed);
                let fieldOps = {
                    type: validType,
                    $group: $field.closest('.form-group').addClass('has-feedback'),
                    param: {}
                };
                H.each(param, function (k, v) {
                    if ('' !== v) {
                        fieldOps.param[k] = v;
                    }
                });

                if (H.isFunction(L.validTypes[validType].initParam)) {
                    if (false === L.validTypes[validType].initParam(fieldOps.param)) {
                        continue;
                    }
                }

                // 处理默认显示
                let tagName = $field.get(0).tagName;
                let _triggerEvent = 'blur';
                let $help, $feedback, inputType, helpCheck = false;

                if (!H.isEmpty(param.helpBlock)) {
                    let $_help = $(param.helpBlock);
                    if ($_help.length > 0) {
                        $help = $_help;
                        $help.addClass("help-block");
                    }
                }

                if ("INPUT" === tagName) {
                    inputType = $field.attr('type');
                    if ('checkbox' === inputType || 'radio' === inputType) {
                        let $box;
                        helpCheck = true;
                        if ('checkbox' === inputType) {
                            $box = $field.closest('.checkbox').parent();
                        } else {
                            $box = $field.closest('.radio').parent();
                        }

                        $feedback = $box.children('.form-control-feedback');
                        if ($feedback.length < 1) {
                            $feedback = $('<i class="form-control-feedback fa"></i>').appendTo($box);
                        }
                        if (!$help) {
                            $help = $field.children('.help-block');
                            if ($help.length < 1) {
                                $help = $('<div class="help-block">' + fieldOps.placeholder + '</div>').appendTo($box);
                            }
                        }
                        $field = $box.find('[name="' + $field.attr('name') + '"]') // 因为 input-radio 和 input-checkbox 是组的概念，将同组都设置为触发器
                            .data('isInit', true); // 防止复选组或单选组多个表单域都设置valid-type的情况被重复初始化
                    }
                }

                if (!helpCheck) {
                    $feedback = $field.siblings('.form-control-feedback');
                    if ($feedback.length < 1) {
                        $feedback = $('<i class="form-control-feedback fa"></i>').insertAfter($field);
                    }
                    if (!$help) {
                        $help = $field.siblings('.help-block');
                        if ($help.length < 1) {
                            $help = $('<div class="help-block">' + fieldOps.placeholder + '</div>').insertAfter($feedback);
                        }
                    }
                    $field.attr('placeholder', fieldOps.placeholder);
                }

                if ('checkbox' === inputType || 'radio' === inputType) {
                    _triggerEvent = 'click';
                } else if ('file' === inputType) {
                    _triggerEvent = 'change';
                } else if ('SELECT' === tagName) {
                    _triggerEvent = 'change';
                }

                // 将参数绑定到元素上
                fieldOps.$feedback = $feedback;
                fieldOps.$help = $help.hide();
                fieldOps.$field = $field;
                L.func.setOption($field, fieldOps);
                // 为元素绑定触发事件
                if ('blur' === _triggerEvent) { // input:text, textarea
                    $field.on('focus', L.events.fieldFocus);
                }
                $field.on(_triggerEvent, L.events.fieldValid);
            }
            op.$validFields = $validFields;
            //  组件事件绑定
            op.isSubmit = false;
            op.callback = H.toJson(op.callback);
            PM.setOption($form, op);
            PM.addTrigger($form);
            return op;
        },
        run: function ($form, op) {
            if (false === op) {
                return false;
            }
            // reset form
            let $resetBtn = $(op.resetBtn);
            if ($resetBtn.length > 0) {
                $resetBtn.on('click', {$form: $form}, L.events.formReset);
            }
            // Validate the form box.
            let $validateBtn = $(op.validateBtn);
            if (0 !== $validateBtn.length) {
                $validateBtn.on('click', {$form: $form}, L.events.formValidate);
            }
            // Validate and submit the form box.
            let $submitBtn = $(op.submitBtn);
            if ($submitBtn.length > 0) {
                $submitBtn.on('click', {$form: $form}, L.events.formSubmit);
            }
            return true;
        },
        validLib: {
            pattern: function (val, param) {
                if (param.pattern.test(val)) {
                    return true;
                }
                return param.errorMsg;
            },
            ajaxUrl: function (val, param) {
                if (!H.isObject(param.postData)) {
                    param.postData = H.toJson(param.postData);
                }
                let postData = H.merge(param.postData, {param: val});
                let R;
                $.ajax({
                    url: param.ajaxUrl,
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: postData,
                    success: function (rs) {
                        if (0 !== parseInt(rs.code)) {
                            R = rs.message
                        } else {
                            R = true;
                        }
                    }
                });
                return R;
            },
            callback: function (val, param) {
                if (H.isFunction(param.callback)) {
                    return param.callback(val, param);
                }
                param.callback = H.toJson(param.callback);
                if (H.isFunction(param.callback)) {
                    return param.callback(val, param);
                } else {
                    delete param.callback;
                    return true;
                }
            },
            compare: function (val, param) {
                if (val !== param.$compare.val()) {
                    return param.errorMsg;
                }
                return true;
            },
            equal: function (val, param) {
                if (val === param.equal) {
                    return true;
                }
                return param.equalMsg;
            },
            min: function (val, param) {
                if (val >= param.min) {
                    return true;
                }
                return param.minErrorMsg;
            },
            max: function (val, param) {
                if (val <= param.max) {
                    return true;
                }
                return param.maxErrorMsg;
            },
            minLength: function (val, param) {
                if (val.length >= param.minLength) {
                    return true;
                }
                return param.minErrorMsg;
            },
            maxLength: function (val, param) {
                if (val.length <= param.maxLength) {
                    return true;
                }
                return param.maxErrorMsg;
            },
            suffix: function (val, param) {
                if (!H.isEmpty(param.suffix) && -1 === $.inArray(val.substring(val.lastIndexOf('.') + 1), param.suffix)) {
                    return param.errorMsg;
                }
                return true;
            }
        },
        func: {
            setOption: function ($field, op) {
                $field.data("__valid_data", op);
            },
            getOption: function ($field) {
                return $field.data("__valid_data");
            },
            showTip: function ($field, reset) {
                let fop = L.func.getOption($field);
                fop.$group.removeClass('has-success has-error');
                fop.$feedback.removeClass('fa-check fa-close');
                if (true === reset) {
                    fop.$help.hide();
                } else {
                    fop.$help.html(fop.param.tipMsg).show();
                }
            },
            showError: function ($field, msg) {
                let fop = L.func.getOption($field);
                fop.$group.removeClass('has-success').addClass('has-error');
                fop.$feedback.removeClass('fa-check').addClass('fa-close');
                fop.$help.html(msg).show();
            },
            showSuccess: function ($field) {
                let fop = L.func.getOption($field);
                fop.$group.removeClass('has-error').addClass('has-success');
                fop.$feedback.removeClass('fa-close').addClass('fa-check');
                fop.$help.hide();
            },
            checkField: function ($field) {
                let fop = L.func.getOption($field);
                let rule = L.validTypes[fop.type];
                let val;
                if (H.isFunction(rule.getVal)) {
                    val = rule.getVal(fop.$field);
                } else {
                    val = $field.val();
                }

                if (fop.type !== 'compare') { // compare 规则不验证空
                    if (fop.param.allowEmpty && H.isEmpty(val)) {
                        L.func.showTip($field, true);
                        return true;
                    }
                    if (H.isEmpty(val)) {
                        L.func.showError($field, fop.param.emptyMsg);
                        return false;
                    }
                }
                // 正则验证放在首位
                if (H.isObject(fop.param.pattern)) {
                    let res = L.validLib.pattern(val, fop.param);
                    if (true !== res) {
                        L.func.showError($field, res);
                        return false;
                    }
                }

                let isSuccess = true;
                H.each(fop.param, function (fname) {
                    if ('pattern' === fname) {
                        return true;
                    }
                    if (H.isFunction(L.validLib[fname])) {
                        let res = L.validLib[fname](val, fop.param);
                        if (true !== res) {
                            isSuccess = false;
                            L.func.showError($field, res);
                            return false;
                        }
                    }
                });

                if (isSuccess) {
                    L.func.showSuccess($field);
                }
                return isSuccess;
            },
            validForm: function ($form) {
                let ops = PM.getOption($form);
                let isSuccess = true;
                ops.$validFields.each(function () {
                    if (true !== L.func.checkField($(this))) {
                        isSuccess = false;
                    }
                });
                if (true === isSuccess && H.isFunction(ops.callback)) {
                    isSuccess = ops.callback($form, ops);
                }
                return isSuccess;
            }
        },
        events: {
            fieldFocus: function (e) {
                L.func.showTip($(this));
            },
            fieldValid: function (e) {
                L.func.checkField($(this));
            },
            formReset: function (e) {
                let ops = PM.getOption(e.data.$form);
                ops.$validFields.each(function () {
                    L.func.showTip($(this), true);
                });

                let $btn = $(this);
                if ($btn.is(':reset')) {
                    return true;
                } else {
                    e.data.$form.get(0).reset();
                    return false;
                }
            },
            formValidate: function (e) {
                let isSuccess = L.func.validForm(e.data.$form);
                let ops = PM.getOption(e.data.$form);
                if (true === isSuccess) {
                    $.alert(ops.successMsg, 'success');
                } else {
                    $.alert(ops.failMsg, 'danger');
                }
            },
            formSubmit: function (e) {
                let ops = PM.getOption(e.data.$form);
                if (true === ops.isSubmit) {
                    $.alert(ops.subMsg, 'warning');
                } else {
                    let $btn = $(this);
                    let isSuccess = L.func.validForm(e.data.$form);
                    if (true === isSuccess) {
                        ops.isSubmit = true;
                        if ($btn.is(':submit')) {
                            return true;
                        } else {
                            e.data.$form.get(0).submit();
                            return false;
                        }
                    } else {
                        ops.isSubmit = false;
                    }
                }
                return false;
            }
        }
    };

    /**
     */
    $.fn.extend({
        validate: function () {
            $(this).each(function () {
                let $this = $(this);
                // 扩展参数设置
                let data = $this.data();
                L.run($this, L.initOp($this, $.extend(true, {}, L.config.ops, data)));
            });
            return this;
        }
    });
})(jQuery);