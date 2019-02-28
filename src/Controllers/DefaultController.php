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

class DefaultController extends Controller
{
    /**
     * @throws \Helper\Exception
     */
    public function actionIndex()
    {
        $this->render('index', []);
    }

    /**
     * @throws \Exception
     */
    public function actionError()
    {
        $this->layout = '/layouts/html';
        if ($error = Pub::getApp()->getErrorHandler()->getError()) {
            if (Pub::getApp()->getRequest()->getIsAjaxRequest()) {
                echo $error['message'];
            } else {
                $this->render('error', [
                    'error' => $error,
                ]);
            }
        }
    }
}