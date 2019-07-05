/* Page library */
let PL = {
    /* 获取指定长度的随机字符串 */
    randChar: function (many) {
        let lib = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        let i, len = lib.length;
        if (!H.isInteger(many) || many <= 1) {
            many = 6;
        }
        let R = '';
        for (i = 0; i < many; i++) {
            R += lib.charAt(H.random(0, len - 1));
        }
        return R;
    },
    /* 同步在线编辑器内容 */
    syncEditor: function () {
        if (window.KEditors !== undefined) {
            for (let i in window.KEditors) {
                window.KEditors[i].sync();
            }
        }
    },
    /* modal 框下的form-ajax回调 */
    saveModalCallback: function ($form, validOps) {
        PL.syncEditor();
        PF.ajax($form.attr('action'), $form.serialize(), function (data) {
            let ops = $form.data();
            if (ops.modalReload) {
                parent.modal.hide(false, true);
            } else if (ops.reload) {
                H.reload();
            } else if (ops.modalNothing) {
                parent.modal.hide(true);
            }
        });
        return false;
    },
    /* ajax 支持文件上传，需要加入jquery.form.js */
    saveAjaxFileCallback: function ($form) {
        PL.syncEditor();
        $form.ajaxSubmit({
            type: 'POST',
            url: $form.attr('action'),
            dataType: 'json',
            data: $form.serialize(),
            contentType: false,
            cache: false,
            processData: false,
            success: function (rs) {
                if (0 !== parseInt(rs.code)) {
                    $.alert("" + rs.code + " : " + rs.message, 'danger');
                } else {
                    let ops = $form.data();
                    if (ops.modalReload) {
                        parent.modal.hide(false, true);
                    } else if (ops.reload) {
                        H.reload();
                    } else if (ops.modalNothing) {
                        parent.modal.hide(true);
                    }
                }
            }
        });
        return false;
    }
};

jQuery(function () {
    /**
     * modal 定制的js
     */
    // 关闭父页面 modal
    $('.MODAL-CLOSE').on('click', function (e) {
        parent.modal.hide(true);
        H.preventDefault(e);
    });
    // 关闭父页面 modal, 并刷新父页面
    $('.MODAL-CLOSE-RELOAD').on('click', function (e) {
        parent.modal.hide(false, true);
        H.preventDefault(e);
    });
    // 关闭父页面 modal, 并执行父页面 modal 的回调函数
    $('.MODAL-CLOSE-CALLBACK').on('click', function (e) {
        let callback = $(this).data('callback');
        if (H.isDefined(callback)) {
            callback = H.toJson(callback);
            parent.modal.hide(false, false, callback($(this)));
        } else {
            parent.modal.hide(true);
        }
        H.preventDefault(e);
    });
    /**
     * action、confirm 、ajax 综合定制
     * 支持参数
     *      before : 执行前调用函数，返回非true将终止后续执行
     *      message : 一旦设置message，将使用 window.confirm 函数让用户确认是否继续操作
     *      is-ajax : 一旦设置属性，请求将通过走ajax的方式来执行指定中的连接
     *      post-data : ajax传递的post请求参数
     *      callback : ajax 执行完后的回调函数
     */
    $('.ACTION-HREF').on('click', function (e) {
        let $this = $(this);
        let data = $this.data();
        if (H.isDefined(data.before)) {
            data.before = H.toJson(data.before);
            if (!H.isFunction(data.before)) {
                $.alert('操作功能函数不存在', 'danger');
                H.preventDefault(e);
                return false;
            }
            if (true !== data.before($this, data)) {
                H.preventDefault(e);
                return false;
            }
        }
        if (H.isDefined(data.message)) {
            if (H.isEmpty(data.message)) {
                data.message = '可能操作后数据无法恢复，确认操作么？';
            }
            if (!window.confirm(data.message)) {
                H.preventDefault(e);
                return false;
            }
        }
        if (!H.isDefined(data.isAjax)) {
            return true;
        }
        data.callback = H.toJson(data.callback);
        let url = $this.attr('href');
        if (H.isEmpty(url)) {
            url = data.ajaxUrl;
        }
        if (H.isEmpty(url)) {
            $.alert("没有设置ajax-URL");
            return false;
        }
        $.ajax({
            url: url,
            type: 'POST',
            async: true,
            dataType: 'json',
            data: H.toJson(data.postData),
            success: function (rs) {
                if (0 !== parseInt(rs.code)) {
                    $.alert("" + rs.code + " : " + rs.message, 'danger');
                } else if (H.isFunction(data.callback)) {
                    data.callback(rs, $this);
                } else {
                    $.alert(rs.message, 'info');
                    if (true === data.reload) {
                        setTimeout(H.reload, 1000);
                    }
                }
            }
        });
        H.preventDefault(e);
        return false;
    });
});