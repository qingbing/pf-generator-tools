<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt\Components;


class UserIdentity extends \Abstracts\UserIdentity
{
    /**
     * 验证用户登陆
     * @return bool
     */
    public function authenticate()
    {
        $module = Pub::getModule();
        if ($this->username != $module->username) {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        } else if ($this->password != $module->password) {
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        } else {
            $this->errorCode = self::ERROR_NONE;
        }
        return $this->errorCode;
    }
}