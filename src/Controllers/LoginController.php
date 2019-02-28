<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt\Controllers;


use Gt\Components\Controller;
use Gt\Components\Pub;
use Gt\Models\LoginForm;

class LoginController extends Controller
{
    /* @var mixed 控制器的layout */
    public $layout = '/layouts/html';

    /**
     * 定义外部action列表
     * @return array
     */
    public function actions()
    {
        return [
            'captcha' => [
                'class' => '\Captcha',
            ]
        ];
    }

    /**
     * 重定向到登录页面
     * @throws \Exception
     */
    public function actionIndex()
    {
        $this->redirect(['login']);
    }

    /**
     * 登录页面
     * @throws \Exception
     */
    public function actionLogin()
    {
        // 数据准备
        $model = new LoginForm();
        // 表单提交处理
        if (isset($_POST['LoginForm'])) {
            $model->setAttributes($_POST['LoginForm']);
            if (!$model->login()) {
                $this->failure('', $model->getErrors());
            }
            $this->app->end();
        }
        // 页面渲染
        $this->render('login', [
            'model' => $model,
        ]);
    }


    /**
     * 退出登录
     * @throws \Exception
     */
    public function actionLogout()
    {
        Pub::getUser()->logout();
    }
}