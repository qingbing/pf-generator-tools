<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt\Models;


use Abstracts\FormModel;
use Gt\Components\Pub;
use Gt\Components\UserIdentity;

class LoginForm extends FormModel
{
    /* @var string 用户名 */
    public $username;
    /* @var string 密码 */
    public $password;
    /* @var string 验证码 */
    public $verifyCode;
    /* @var \Gt\Components\WebUser 认证组件 */
    private $_identity;

    /**
     * 验证规则
     * @return array
     */
    public function rules()
    {
        return [
            ['username', 'username', 'allowEmpty' => false],
            ['password', 'password', 'allowEmpty' => false],
            ['password', 'authenticate'],
            ['verifyCode', 'string', 'allowEmpty' => false],
            ['verifyCode', \Captcha::VALIDATOR, 'captchaAction' => '//gt/login/captcha', 'allowEmpty' => false],
        ];
    }

    /**
     * 获取属性标签，该属性在必要时需要被实例类重写
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'username' => '用户名',
            'password' => '密　码',
            'verifyCode' => '验证码',
        ];
    }

    /**
     * 验证用户登录密码
     * @param string $attribute
     */
    public function authenticate($attribute)
    {
        if (!$this->hasErrors()) {
            $this->_identity = new UserIdentity($this->username, $this->password);
            if (0 != $this->_identity->authenticate()) {
                $this->addError($attribute, $this->_identity->getErrorMsg());
            }
        }
    }

    /**
     * 用户登录
     * @return bool
     * @throws \Exception
     */
    public function login()
    {
        if ($this->validate()) {
            if (!Pub::getUser()->login($this->_identity)) {
                $this->addError('username', "登录失败");
            } else {
                return true;
            }
        }
        return false;
    }
}