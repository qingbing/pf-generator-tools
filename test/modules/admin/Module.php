<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-21
 * Version      :   1.0
 */

namespace Admin;


class Module extends \Render\Abstracts\Module
{
    protected function afterConstruct()
    {
    }

    public function beforeControllerAction($controller, $action)
    {
        return parent::beforeControllerAction($controller, $action); // TODO: Change the autogenerated stub
    }
}