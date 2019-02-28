/**
 * 参数管理类
 */
var ParamsManager = function (wn) {
    /**
     * 触发元素保存参数的名称
     * @type {string}
     * @private
     */
    this.__dataName = "__data__" + wn + "__";
    /**
     * 当前触发器
     * @type {jquery} element
     * @private
     */
    this.__currentTrigger = undefined;
    /**
     * 所有触发器
     * @type {Array}
     * @private
     */
    this.__triggers = [];
    /**
     * 添加触发器
     * @param $trigger
     */
    this.addTrigger = function ($trigger) {
        this.__triggers.push($trigger);
    };
    /**
     * 获取当前触发器
     * @returns {jquery}
     */
    this.getCurrentTrigger = function () {
        return this.__currentTrigger;
    };
    /**
     * 设置当前触发器
     * @returns {jquery}
     */
    this.setCurrentTrigger = function ($trigger) {
        this.__currentTrigger = $trigger;
    };
    /**
     * 获取触发器参数
     * @param $trigger
     * @returns {boolean}
     */
    this.getOption = function ($trigger) {
        if (!H.isDefined($trigger)) {
            $trigger = this.getCurrentTrigger();
        }
        if (!H.isDefined($trigger)) {
            return false;
        }
        return $trigger.data(this.__dataName);
    };
    /**
     * 设置触发器参数
     * @param $trigger
     * @param op
     */
    this.setOption = function ($trigger, op) {
        if (!H.isDefined($trigger)) {
            $trigger = this.getCurrentTrigger();
        }
        $trigger.data(this.__dataName, op);
    };
    /**
     * 遍历触发器并让触发器执行函数
     * @param callback
     */
    this.each = function (callback) {
        for (var i in this.__triggers) {
            callback(this.__triggers[i]);
        }
    }
};
/**
 * ProjectFunction
 */
var PF = {
    ajax: function (ajaxUrl, postData, callback, failure, method) {
        if (!H.isDefined(method)) {
            method = 'POST';
        }
        var async = false, R = false; // 非异步（等待执行）
        if (H.isFunction(callback)) {
            // 当拥有回调函数是，表示异步
            async = true;
        }
        $.ajax({
            url: ajaxUrl,
            type: method,
            async: async,
            dataType: 'json',
            data: postData,
            success: function (rs) {
                if (0 !== parseInt(rs.code)) {
                    if (H.isFunction(failure)) {
                        failure(rs);
                    } else {
                        $.alert("" + rs.code + " : " + rs.message, 'danger');
                    }
                } else if (async) {
                    callback(rs.data);
                } else {
                    R = rs.data;
                }
            }
        });
        if (false === async) {
            return R;
        }
    },
    /**
     * 获取表单元素值
     * @param $form
     * @returns {{}}
     */
    getFormData: function ($form) {
        var nv = $form.serializeArray();
        var R = {};
        H.each(nv, function (i, v) {
            R[v.name] = v.value;
        });
        return R;
    }
};
/**
 * 定义一些常用的或自动导入的类
 */
var Loader = {
    __loadedPlugins: {},
    loadCss: function (path, basePath) {
        if (basePath) {
            H.loadCss(basePath + path);
        } else {
            H.loadCss(H.jsPath() + path);
        }
    },
    loadJs: function (path, callback, id) {
        H.loadJs(H.jsPath() + path, callback, id);
    },
    __loadPlugin: function (cName, js, callback, css) {
        if (!this.__loadedPlugins[cName]) {
            this.__loadedPlugins[cName] = true;
            H.isEmpty(css) || (this.loadCss(css));
            if (!H.isEmpty(js)) {
                this.loadJs(js, function () {
                    if (H.isFunction(callback)) {
                        callback();
                    }
                });
            } else if (H.isFunction(callback)) {
                callback();
            }
        } else if (H.isFunction(callback)) {
            callback();
        }
    },
    loadAlert: function () {
        this.__loadPlugin('alert', '/plugins/alert/jquery.alert.js');
    },
    dropdown: function ($triggers) {
        this.__loadPlugin('dropdown',
            '/plugins/dropdown/jquery.dropdown.js', function () {
                $triggers.dropdown();
            });
    },
    navbar: function ($triggers) {
        this.__loadPlugin('navbar',
            '/plugins/navbar/jquery.navbar.js', function () {
                $triggers.navbar();
            });
    },
    ajaxPage: function ($triggers) {
        this.__loadPlugin('ajaxPage',
            '/plugins/ajaxPage/jquery.ajaxPage.js', function () {
                $triggers.ajaxPage();
            });
    },
    tab: function ($triggers) {
        this.__loadPlugin('tab',
            '/plugins/tab/jquery.tab.js', function () {
                $triggers.tab();
            });
    },
    checkbox: function ($triggers) {
        this.__loadPlugin('checkbox',
            '/plugins/checkbox/jquery.checkbox.js', function () {
                $triggers.checkbox();
            });
    },
    datetime: function ($triggers) {
        this.__loadPlugin('datetime',
            '/plugins/datetime/jquery.datetime.js', function () {
                $triggers.datetime();
            });
    },
    select2: function ($triggers, callback) {
        this.__loadPlugin('select2',
            '/plugins/select2/select2.min.js', callback, '/plugins/select2/select2.css');
    },
    select: function ($triggers) {
        this.select2($triggers, function () {
            Loader.__loadPlugin('select', '/plugins/select/jquery.select.js', function () {
                $triggers.select();
            });
        });
    },
    editTable: function ($triggers) {
        this.__loadPlugin('editTable',
            '/plugins/editTable/jquery.editTable.js', function () {
                $triggers.editTable();
            });
    },
    player: function ($triggers) {
        this.__loadPlugin('player',
            '/plugins/player/jquery.player.js', function () {
                $triggers.player();
            });
    },
    modal: function ($triggers) {
        this.__loadPlugin('modal',
            '/plugins/modal/jquery.modal.js', function () {
                $triggers.modal();
            });
    },
    menu: function ($triggers) {
        this.__loadPlugin('menu',
            '/plugins/menu/jquery.menu.js', function () {
                $triggers.menu();
            });
    },
    loadMoment: function (callback) {
        this.__loadPlugin('moment',
            '/plugins/moment.min.js', callback);
    },
    loadDateRangePicker: function (callback) {
        this.loadMoment(function () {
            Loader.__loadPlugin('daterangepicker',
                '/plugins/daterangepicker/daterangepicker.js', callback, '/plugins/daterangepicker/daterangepicker.css');
        });
    },
    dateRange: function ($triggers) {
        this.loadDateRangePicker(function () {
            Loader.__loadPlugin('dateRange',
                '/plugins/dateRange/jquery.dateRange.js', function () {
                    $triggers.dateRange();
                });
        });
    },
    validate: function ($triggers) {
        this.__loadPlugin('validate',
            '/plugins/validate/jquery.validate.js', function () {
                $triggers.validate();
            });
    },
    configs: {
        'dropdown': '.w-dropdown',
        'navbar': '.w-navbar',
        'ajaxPage': '.w-ajax-page',
        'tab': '.w-tab',
        'checkbox': '.w-checkbox',
        'datetime': '.w-datetime',
        'select': '.w-select',
        'editTable': '.w-edit-table',
        'player': '.w-player',
        'modal': '.w-modal',
        'menu': '.w-menu',
        'dateRange': '.w-dateRange',
        'validate': '.w-validate',
        'template': '.w-template'
    }
};

jQuery(document).ready(function ($) {
    // 加载alert组件
    Loader.loadAlert();
    // 禁用一些class的事件
    $('.divider,.disabled,[disabled]').on('click', function (e) {
        H.preventDefault(e);
        H.stopPropagation(e);
    });
    // 自动加载组件
    H.each(Loader.configs, function (key, target) {
        var $targets = $(target);
        if ($targets.length > 0 && H.isFunction(Loader[key])) {
            Loader[key]($targets);
        }
    });
});