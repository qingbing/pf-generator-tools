<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Controllers;


use Gt\Components\Controller;
use Gt\Models\FormCtrl;

class CtrlController extends Controller
{
    /**
     * 创建 controller 表单
     * @throws \Exception
     */
    public function actionIndex()
    {
        // 数据准备
        $model = new FormCtrl();
        // 表单提交处理
        if (isset($_POST['FormCtrl'])) {
            $model->setAttributes($_POST['FormCtrl']);
            if ($model->generate()) {
                $this->success('创建控制器成功', -1);
            } else {
                $this->failure('创建控制器失败', $model->getErrors());
            }
        }
        // 页面渲染
        $this->render('index', [
            'model' => $model,
        ]);
    }

    /**
     * ajax 控制器创建验证
     * @throws \Exception
     */
    public function actionValid()
    {
        $model = new FormCtrl();
        $model->setAttributes($_POST['FormCtrl']);
        if ($model->validate()) {
            $this->success('success');
        } else {
            $errors = $model->getErrors();
            $this->failure(array_shift($errors));
        }
    }
}