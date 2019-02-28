<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt\Components;


class WebUser extends \Abstracts\WebUser
{
    /**
     * 获取当前登录用户的信息
     * @return array
     */
    protected function getUser()
    {
        return [
            'username' => $this->getUsername(),
        ];
    }
}