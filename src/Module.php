<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt;


use Gt\Components\Pub;

class Module extends \Render\Abstracts\Module
{
    /* @var mixed 控制器的layout */
    public $layout = '/layouts/main';
    /* @var string 查看权限用户名 */
    public $username;
    /* @var string 查看权限用户名密码 */
    public $password;

    /**
     * 属性配置完毕后的内容
     * @throws \Helper\Exception
     */
    protected function afterConstruct()
    {
        // 注册或修改组件
        \PF::app()->setComponents([
            'errorHandler' => [
                'errorAction' => '//gt/default/error',
            ],
        ]);
        // 资源复制
        Pub::publishAssets();
    }

    /**
     * 在调用action前执行
     * <pre>
     * if(parent::beforeControllerAction($controller,$action))
     * {
     *     // your code
     *     return true;
     * }
     * else
     *     return false;
     * </pre>
     * @param \Abstracts\BaseController $controller
     * @param \Abstracts\Action $action
     * @return bool
     * @throws \Exception
     */
    public function beforeControllerAction($controller, $action)
    {
        if (parent::beforeControllerAction($controller, $action)) {
            if ('login' !== strtolower($controller->getId())) {
                // 除了 login 控制器，其他控制器必须登录
                Pub::getUser()->loginRequired();
            }
            return true;
        } else {
            return false;
        }
    }
}