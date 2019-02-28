<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */
return [
    'class' => '\Gt\Module',
    'username' => 'qingbing',
    'password' => '111111',
    'components' => [
        'user' => [
            'class' => '\Gt\Components\WebUser',
            'cookieKey' => 'gt.user.username',
            'rememberTime' => 864000,
            'namespace' => 'gt.user',
            'expire' => 1800,
            'prefix' => 'gt.user_',
            'loginUrl' => ['gt/login/index'],
            'returnUrl' => ['gt/default/index'],
        ],
    ],
];