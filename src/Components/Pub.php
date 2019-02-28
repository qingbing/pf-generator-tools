<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-24
 * Version      :   1.0
 */

namespace Gt\Components;


use Components\AssetsManager;

class Pub
{
    private static $_assetUrl;

    /**
     * 获取当前 application
     * @return \Abstracts\Application|\Render\Application
     */
    public static function getApp()
    {
        return \PF::app();
    }

    /**
     * 获取当前 module
     * @return \Abstracts\Module | \Gt\Module
     */
    public static function getModule()
    {
        return self::getApp()->getController()->getModule();
    }

    /**
     * 获取当前模块的用户组件
     * @return \Gt\Components\WebUser|\Abstracts\Component|null
     * @throws \Helper\Exception
     */
    public static function getUser()
    {
        return self::getModule()->getComponent('user');
    }

    /**
     * 发布资源
     * @throws \Helper\Exception
     */
    public static function publishAssets()
    {
        self::$_assetUrl = AssetsManager::getInstance('assets-manager')->publish(dirname(__DIR__) . '/source', 'gt');
    }

    /**
     * 获取发布资源的跟目录
     * @return mixed
     */
    public static function getAssetBaseUrl()
    {
        return self::$_assetUrl;
    }
}