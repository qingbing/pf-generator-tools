(function ($) {
    var PM = new ParamsManager('ajaxPage');
    var L = {
        config: {
            ops: {
                // ajax后台查询参数字段
                postData: {},
                fields: [], // [#id, [name="name"]]
                form: "",
                // 查询按钮
                queryBtn: "#ajaxSearchBtn",
                // 是否含分页
                pagination: false,
                paginationTarget: '',
                maxPagingBtn: 2, // 分页显示的前后最大分页btn个数
                // 页面渲染前执行，主要处理回传数据
                beforeRendCallback: false,
                // 页面渲染后执行，主要绑定渲染视图新增事件
                afterRendCallback: false,
                // 组件类型
                type: "content", // content | table
                // table 特有属性
                headUrl: "",
                headPostData: {},
                headFields: undefined, // 渲染数据依据
                tableTarget: '',
                emptyMsg: '<p class="text-center" style="height:88px;line-height:88px;"><i class="fa fa-frown-o"></i> 报告主人，没有找到任何数据 ^_^!</p>',
                // content 特有属性
                contentTarget: '',
                // 请求URl
                ajaxUrl: "",
                // 在ajax查询前的回调函数，return true才会执行后续操作
                beforeCallback: false,
                // 加载过的page是否缓存下来，为true需要 cachePage
                cache: true
            }
        },
        initOp: function ($trigger, op) {
            var tp = PM.getOption($trigger);
            if (H.isDefined(tp)) {
                return tp;
            }
            // 参数处理
            if (H.isEmpty(op.ajaxUrl)) {
                $.alert("请求URL不能为空", "danger");
                return false;
            }
            if (true === op.cache) {
                op.cachePage = {};
            }
            if (!H.isEmpty(op.form)) {
                op.$form = $(op.form);
                if (op.$form.length === 0) {
                    $.alert("指定的form表单不存在");
                    return false;
                }
            }
            if (!H.isEmpty(op.fields) && H.isObject(op.fields)) {
                var $fields = {};
                H.each(op.fields, function (name, target) {
                    var $field = $(target);
                    if (0 !== $field.length) {
                        $fields[name] = $field;
                    }
                });
                op.$fields = $fields;
            }
            // 参数检查函数
            op.beforeCallback = H.toJson(op.beforeCallback);
            H.isFunction(op.beforeCallback) || (delete op.beforeCallback);
            // 数据回传处理函数
            op.beforeRendCallback = H.toJson(op.beforeRendCallback);
            H.isFunction(op.beforeRendCallback) || (delete op.beforeRendCallback);
            // 数据渲染后处理函数
            op.afterRendCallback = H.toJson(op.afterRendCallback);
            H.isFunction(op.afterRendCallback) || (delete op.afterRendCallback);
            if (!$.inArray(op.type, ['content', 'table'])) {
                op.type = 'content';
            }
            if ('table' === op.type) {
                var $table = H.isEmpty(op.tableTarget) ? $trigger.find('table.w-ajax-page-table') : $(op.tableTarget);
                if (0 === $table.length) {
                    $.alert("显示表格不存在");
                    return false;
                }
                op.$tableHead = $("<tr></tr>").appendTo($("<thead></thead>").appendTo($table));
                op.$tableBody = $("<tbody></tbody>").appendTo($table);
                op.headFields = H.toJson(op.headFields);
                if (H.isEmpty(op.headFields)) {
                    if (H.isEmpty(op.headUrl)) {
                        $.alert("未设置表格表头", "danger");
                        return false;
                    }
                    op.headPostData = H.toJson(op.headPostData);
                    op.headFields = PF.ajax(op.headUrl, op.headPostData);
                }
                L.func.fillHead(op);
            } else {
                op.$content = H.isEmpty(op.contentTarget) ? $trigger.find('.w-ajax-page-content') : $(op.contentTarget);
                if (0 === op.$content.length) {
                    $.alert("显示视图不存在");
                    return false;
                }
            }
            // 是否分页
            if (true === op.pagination) {
                op.$pagination = H.isEmpty(op.paginationTarget) ? $trigger.find('.w-ajax-page-pagination') : $(op.paginationTarget);
                op.maxPagingBtn = parseInt(op.maxPagingBtn);
                if (0 === op.$pagination.length) {
                    $.alert("分页视图不存在");
                    return false;
                }
            }
            // 触发或刷新
            var $queryBtn = $(op.queryBtn);
            if ($queryBtn.length > 0) {
                op.$queryBtn = $queryBtn;
            }
            PM.setOption($trigger, op);
            PM.addTrigger($trigger);
            return op;
        },
        run: function ($trigger, op) {
            if (false === op) {
                return false;
            }
            // 查询按钮事件绑定
            if (op.$queryBtn) {
                L.func.setTrigger(op.$queryBtn, $trigger);
                op.$queryBtn.on('click', L.events.clickQueryBtn);
            }
            // 分页元素事件绑定
            if (op.$pagination) {
                op.$pagination.on('click', 'li>a', $trigger, L.events.paginationClick);
            }
            L.func.catchContent(op);
        },
        func: {
            setTrigger: function ($jObj, $trigger) {
                $jObj.data("__ajaxPageTrigger__", $trigger);
            },
            getTrigger: function ($jObj) {
                return $jObj.data("__ajaxPageTrigger__");
            },
            fetchData: function (op) {
                var postData = $.extend({}, op.postData, op.$form ? PF.getFormData(op.$form) : {});
                if (op.$fields) {
                    H.each(op.$fields, function (name, $field) {
                        postData[name] = $field.val();
                    })
                }
                op.realPostData = postData;
            },
            fillHead: function (op) {
                var keys = {}, num = 0;
                H.each(op.headFields, function (k, v) {
                    if (H.isEmpty(v.key) || H.isEmpty(v.label)) {
                        return true;
                    }
                    if (H.isDefined(keys[v.key])) {
                        return true;
                    }
                    keys[v.key] = v;
                    var $th = $('<th>' + v.label + '</th>').appendTo(op.$tableHead);
                    if (!H.isEmpty(v.width)) {
                        $th.width(v.width);
                    }
                    num++;
                });
                op.keys = keys;
                op.fieldCount = num;
            },
            catchContent: function (op, page) {
                if (!H.isDefined(page)) {
                    // 清理缓存
                    H.isDefined(op.cachePage) && (op.cachePage = {});
                    // 获取新的post数据
                    L.func.fetchData(op);
                }
                // 默认第一页
                if (true === op.pagination) {
                    !H.isDefined(page) && (page = 1);
                    op.realPostData.page = page;
                }
                // 装载页面
                if (true === op.pagination && op.cachePage[page]) {
                    // 分页时从缓存中装载
                    L.func.rend(op, op.cachePage[page]);
                } else {
                    if (op.beforeCallback && H.isFunction(op.beforeCallback)) {
                        if (true !== op.beforeCallback(op)) {
                            return false;
                        }
                    }
                    // 请求数据，并装载
                    PF.ajax(op.ajaxUrl, op.realPostData, function (data) {
                        if (op.beforeRendCallback && H.isFunction(op.beforeRendCallback)) {
                            if (true === op.pagination) {
                                op.beforeRendCallback(op, data.res);
                            } else {
                                op.beforeRendCallback(op, data);
                            }
                        }
                        var cacheObj = {};
                        if (true === op.pagination) {
                            cacheObj.pagination = L.func.generatePagination(data.page, data.totalPage, op.maxPagingBtn);
                            if ('table' === op.type) {
                                cacheObj.tableBody = L.func.generateTableBody(op, data.res);
                            } else {
                                cacheObj.content = data.res;
                            }
                            if (page && op.cache) {
                                op.cachePage[data.page] = cacheObj;
                            }
                        } else {
                            if ('table' === op.type) {
                                cacheObj.tableBody = L.func.generateTableBody(op, data);
                            } else {
                                cacheObj.content = data;
                            }
                        }
                        L.func.rend(op, cacheObj);
                    });
                }
            },
            generateTableBody: function (op, data) {
                if (H.isEmpty(data)) {
                    return '<tr><td colspan="' + op.fieldCount + '">' + op.emptyMsg + '</td></tr>';
                } else {
                    var $R = $("<tbody></tbody>");
                    H.each(data, function (i, re) {
                        var $tr = $("<tr></tr>").appendTo($R);
                        H.each(op.keys, function (k, v) {
                            var $td;
                            if (H.isDefined(re[k])) {
                                $tr.append('<td>' + re[k] + '</td>');
                            } else {
                                $tr.append('<td></td>');
                            }
                        });
                    });
                    return $R.html();
                }
            },
            generatePagination: function (curPage, totalPage, maxBtn) {
                curPage = parseInt(curPage);
                totalPage = parseInt(totalPage);
                if (totalPage <= 1) return ''; // no pagination.
                var rString = '';
                // first page
                if (curPage > 2) {
                    rString += L.func.generateButton('<i class="fa fa-angle-double-left"></i>', 1);
                }
                // pre page
                if (curPage > 1) {
                    rString += L.func.generateButton('<i class="fa fa-angle-left"></i>', curPage - 1);
                }
                // compute the button page range.
                var sp = Math.max(1, curPage - maxBtn);
                var ep = curPage + maxBtn;
                if (ep > totalPage) {
                    ep = totalPage;
                    sp = Math.max(1, curPage - maxBtn);
                }
                for (var i = sp; i <= ep; i++) {
                    rString += L.func.generateButton(i, i, i === curPage);
                }
                // next page
                if (totalPage - curPage > 0) {
                    rString += L.func.generateButton('<i class="fa fa-angle-right"></i>', curPage + 1);
                }
                // next page
                if (totalPage - curPage > 1) {
                    rString += L.func.generateButton('<i class="fa fa-angle-double-right"></i>', totalPage);
                }
                return rString;
            },
            // 创建翻页按钮
            generateButton: function (label, page, active) {
                if (active) {
                    return '<li class="active"><a href="javascript:void(0)" data-page="' + page + '">' + label + '</a></li>';
                } else {
                    return '<li><a href="javascript:void(0)" data-page="' + page + '">' + label + '</a></li>';
                }
            },
            rend: function (op, cacheObj) {
                if (true === op.pagination) {
                    op.$pagination.empty().html(cacheObj.pagination);
                }
                if ('table' === op.type) {
                    op.$tableBody.empty().html(cacheObj.tableBody);
                } else {
                    op.$content.empty().html(cacheObj.content);
                }
                if (op.afterRendCallback && H.isFunction(op.afterRendCallback)) {
                    op.afterRendCallback(op);
                }
            }
        },
        events: {
            clickQueryBtn: function (e) {
                var $trigger = L.func.getTrigger($(this));
                var op = PM.getOption($trigger);
                L.func.catchContent(op);
                H.preventDefault(e);
                H.stopPropagation(e);
            },
            paginationClick: function (e) {
                var $trigger = e.data;
                L.func.catchContent(PM.getOption($trigger), parseInt($(this).data('page')));
                H.preventDefault(e);
                H.stopPropagation(e);
            }
        }
    };

    /**
     */
    $.fn.extend({
        ajaxPage: function (ops) {
            ops = $.extend(true, {}, L.config.ops, ops);
            $(this).each(function () {
                var $this = $(this);
                // 扩展参数设置
                var data = $this.data();
                H.isEmpty(data.postData) || (data.postData = H.toJson(data.postData));
                H.isEmpty(data.fields) || (data.fields = H.toJson(data.fields));
                L.run($this, L.initOp($this, $.extend(true, {}, ops, data)));
            });
            return this;
        }
    });
})(jQuery);