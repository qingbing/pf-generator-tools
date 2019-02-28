<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2018-12-05
 * Version      :   1.0
 */
return [
    'params' => [],// 用户自定义配置
    'preLoad' => [],
    'layout' => '//layouts/html',
    'modules' => [
        'pf' => [],
        'admin' => [
            'modules' => [
                'member' => [],
            ]
        ],
        'program' => [
            'modules' => [
                'good' => [],
            ]
        ],
        'gt' => require('module-gt.php'),
    ],
    'components' => \Helper\CMap::mergeArray(
        [
            'database' => [
                'class' => '\Components\Db',
                'c-file' => 'database',
                'c-group' => 'master',
            ],
            'urlManager' => [
                'class' => '\Components\UrlManager',
                'c-file' => 'url-manager',
            ],
            'cache' => [
                'class' => '\Components\FileCache',
                'c-file' => 'file-cache',
            ],
            'session' => [
                'class' => '\Components\Session',
                'ttl' => '86400', // 暂无使用
                'isEncrypt' => false,
                // session 定义
                'namespace' => 'pf',
                'prefix' => 'pf_',
                'autoStart' => true,
            ],
            'user' => [
                'class' => '\TestApp\TestWebUser',
                'cookieKey' => 'test.web.user.username',
                'rememberTime' => 864000,
                'namespace' => 'test.web.user',
                'expire' => 1800,
                'prefix' => 'web.user_',
                'loginUrl' => ['login/index'],
                'returnUrl' => ['site/index'],
                'openToken' => false,
            ],
        ],
        require('component-errorHandler.php')
    ),
];