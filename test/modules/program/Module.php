<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-26
 * Version      :   1.0
 */

namespace Program;


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