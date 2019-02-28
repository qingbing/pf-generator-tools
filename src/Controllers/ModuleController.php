<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Controllers;


use Gt\Components\Controller;
use Gt\Models\FormModule;

class ModuleController extends Controller
{
    /**
     * 创建 module 表单
     * @throws \Exception
     */
    public function actionIndex()
    {
        // 数据准备
        $model = new FormModule();
        // 表单提交处理
        if (isset($_POST['FormModule'])) {
            $model->setAttributes($_POST['FormModule']);
            if ($model->generate()) {
                $this->success('创建模块成功', -1);
            } else {
                $this->failure('创建模块失败', $model->getErrors());
            }
        }
        // 页面渲染
        $this->render('index', [
            'model' => $model,
        ]);
    }

    /**
     * ajax 模块创建验证
     * @throws \Exception
     */
    public function actionValid()
    {
        $model = new FormModule();
        $model->setAttributes($_POST['FormModule']);
        if ($model->validate()) {
            $this->success('success');
        } else {
            $errors = $model->getErrors();
            $this->failure(array_shift($errors));
        }
    }
}