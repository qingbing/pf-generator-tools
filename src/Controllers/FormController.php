<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Controllers;


use Gt\Components\Controller;
use Gt\Models\FormForm;

class FormController extends Controller
{
    /**
     * 创建 form 表单
     * @throws \Exception
     */
    public function actionIndex()
    {
        // 数据准备
        $model = new FormForm();
        // 表单提交处理
        if (isset($_POST['FormForm'])) {
            $model->setAttributes($_POST['FormForm'], false);
            if ($model->generate()) {
                $this->success('创建表单模型成功', -1);
            } else {
                $this->failure('创建表单模型失败', $model->getErrors());
            }
        }
        // 页面渲染
        $this->render('index', [
            'model' => $model,
        ]);
    }

    /**
     * ajax 模型创建验证
     * @throws \Exception
     */
    public function actionValid()
    {
        $model = new FormForm();
        $model->setAttributes($_POST['FormForm'], false);
        if ($model->validate()) {
            $this->success('success');
        } else {
            $errors = $model->getErrors();
            $this->failure(array_shift($errors));
        }
    }
}