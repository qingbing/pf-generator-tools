<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Controllers;


use Gt\Components\Controller;
use Gt\Models\FormModel;

class ModelController extends Controller
{
    /**
     * 创建 db-model 表单
     * @throws \Exception
     */
    public function actionIndex()
    {
        // 数据准备
        $model = new FormModel();
        // 表单提交处理
        if (isset($_POST['FormModel'])) {
            $model->setAttributes($_POST['FormModel']);
            if ($model->generate()) {
                $this->success('创建db模型成功', -1);
            } else {
                $this->failure('创建db模型失败', $model->getErrors());
            }
        }
        // 页面渲染
        $this->render('index', [
            'model' => $model,
        ]);
    }

    /**
     * 验证数据库组件是否存在
     * @throws \Exception
     */
    public function actionValidDbComponent()
    {
        $model = new FormModel();
        $model->setAttributes($_POST['FormModel']);
        if ($connection = $model->getDbConnection()) {
            $this->success('success', '', [
                'tablePrefix' => $connection->tablePrefix,
            ]);
        }
    }

    /**
     * Create model name.
     * @throws \Exception
     */
    public function actionCreateModelName()
    {
        $model = new FormModel();
        $model->setAttributes($_POST['FormModel']);
        $name = $model->createModelName();
        $this->success('success', '', [
            'name' => $name,
        ]);
    }

    /**
     * ajax 数据库模型创建验证
     * @throws \Exception
     */
    public function actionValid()
    {
        $model = new FormModel();
        $model->setAttributes($_POST['FormModel']);
        if ($model->validate()) {
            $this->success('success');
        } else {
            $errors = $model->getErrors();
            $this->failure(array_shift($errors));
        }
    }
}