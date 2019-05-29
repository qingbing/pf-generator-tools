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
    $('.MODAL-CLOSE').click(function (e) {
        parent.modal.hide(true);
        H.preventDefault(e);
    });
    // 关闭父页面 modal, 并刷新父页面
    $('.MODAL-CLOSE-RELOAD').click(function (e) {
        parent.modal.hide(false, true);
        H.preventDefault(e);
    });
    // 关闭父页面 modal, 并执行父页面 modal 的回调函数
    $('.MODAL-CLOSE-CALLBACK').click(function (e) {
        let _data = $(this).data();
        if (H.isDefined(_data.callback)) {
            _data.callback = H.toJson(_data.callback);
            parent.modal.hide(false, false, _data.callback());
        } else {
            parent.modal.hide(true);
        }
        H.preventDefault(e);
    });
    /**
     * confirm 定制的js
     *      message     ：string
     */
    $('.CONFIRM').click(function (e) {
        let msg = $(this).data('message');
        if (H.isEmpty(msg)) {
            msg = '确认操作么？';
        }
        return window.confirm(msg);
    });
    /**
     * confirm-ajax 定制js
     *      message     ：string
     *      url         ：string
     *      args        ：json-string
     *      reload      ：bool
     */
    $('.CONFIRM_AJAX').click(function (e) {
        let $this = $(this);
        let msg = $this.data('message');
        if (H.isEmpty(msg)) {
            msg = '<i class="fa fa-smile-o"> 确认操作么？</i>';
        }
        if (!window.confirm(msg)) {
            return false;
        }
        let url = $this.attr('href');
        if (H.isEmpty(url)) {
            url = $this.data('url');
        }
        if (H.isEmpty(url)) {
            $.alert("没有设置ajax-URL");
            return false;
        }
        PF.ajax(url, H.toJson($this.data('args')), function (data) {
            let callback = H.toJson($this.data('callback'));
            if (H.isFunction(callback)) {
                callback(data);
            } else {
                if (true === $this.data('reload')) {
                    H.reload();
                }
            }
        }, 'post');
        return false;
    });
    /**
     * ajax 定制js
     *      message     ：string
     *      url         ：string
     *      args        ：json-string
     *      reload      ：bool
     */
    $('.AJAX').on('click', function (e) {
        let $this = $(this);
        let url = $this.attr('href');
        if (H.isEmpty(url)) {
            url = $this.data('url');
        }
        if (H.isEmpty(url)) {
            $.alert("没有设置ajax-URL");
            return false;
        }
        PF.ajax(url, H.toJson($this.data('args')), function (data) {
            let callback = H.toJson($this.data('callback'));
            if (H.isFunction(callback)) {
                callback(data);
            } else {
                if (true === $this.data('reload')) {
                    H.reload();
                }
            }
        }, 'post');
        return false;
    });
});