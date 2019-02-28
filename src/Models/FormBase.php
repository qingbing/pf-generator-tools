<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Models;


use Abstracts\FormModel;
use Gt\Components\Pub;
use Helper\Exception;
use Helper\Format;
use Web\Application;

// application 的基本目录
defined("APP_BASE_PATH") or define("APP_BASE_PATH", dirname(realpath(".")));


abstract class FormBase extends FormModel
{
    /* @var string 模块ID */
    public $moduleId; // module id

    private $_targetModule;

    /**
     * 获取所有的moduleId组合
     * @return array
     */
    public static function getModuleIds()
    {
        static $rs;
        if (null === $rs) {
            $rs = array_merge([
                'app' => 'app',
            ], self::_parseModuleIds(Pub::getApp()->getModules()));
        }
        return $rs;
    }

    /**
     * 根据配置的module获取所有的moduleId组合
     * @param array $ms
     * @param string $parentId
     * @return array
     */
    private static function _parseModuleIds($ms, $parentId = '')
    {
        $rs = [];
        foreach ($ms as $id => $m) {
            if (is_string($m)) {
                $id = $m;
            }
            $newId = $parentId ? $parentId . '.' . $id : $id;
            if ('pf' == strtolower($newId) || 'gt' == strtolower($newId) || 'dict' == strtolower($newId)) {
                continue;
            }
            $rs[$newId] = $newId;
            if (is_array($m) && isset($m['modules']) && !empty($m['modules'])) {
                $rs = array_merge($rs, self::_parseModuleIds($m['modules'], $newId));
            }
        }
        return $rs;
    }

    /**
     * 创建驼峰式字符串
     * @param $string
     * @return string
     */
    protected function getHumpString($string)
    {
        return implode('', array_map('ucfirst', explode('_', $string)));
    }

    /**
     * 将内容写入文件中
     * @param string $file
     * @param string $content
     * @return int
     */
    protected function filePutContent($file, $content)
    {
        if (!is_dir($dir = dirname($file))) {
            mkdir($dir);
        }
        return file_put_contents($file, $content);
    }

    /**
     * 定义并返回模型属性的验证规则
     * @return array
     */
    public function rules()
    {
        return [
            ['moduleId', 'string'],
        ];
    }

    /**
     * 返回构建的目标module
     * @return \Web\Abstracts\Module
     */
    public function getTargetModule()
    {
        return $this->_targetModule;
    }

    /**
     * 返回目标模块是否为 application
     * @return bool
     */
    protected function isApplication()
    {
        return $this->getTargetModule() instanceof Application;
    }

    /**
     * 获取创建模型所在模块的 namespace
     * @return string|null
     */
    protected function getModuleNamespace()
    {
        if ($this->isApplication()) {
            return "App";
        } else {
            return $this->getTargetModule()->getId();
        }
    }

    /**
     * 获取 application 的基本目录
     * @return string
     */
    protected function getAppBasePath()
    {
        return APP_BASE_PATH;
    }

    /**
     * 获取 targetModule 的基本目录
     * @return string
     * @throws \ReflectionException
     */
    protected function getTargetModuleBasePath()
    {
        return $this->getTargetModule()->getBasePath();
    }

    /**
     * 返回模板文件存放路径
     * @return string
     * @throws \ReflectionException
     */
    protected function getTemplatePath()
    {
        return Pub::getModule()->getBasePath() . '/templates';
    }

    /**
     * 返回框架官方网址
     * @return string
     */
    protected function getLink()
    {
        return \PF::home();
    }

    /**
     * 返回登陆的用户名
     * @return string
     * @throws \Helper\Exception
     */
    protected function getUsername()
    {
        return Pub::getUser()->getUsername();
    }

    /**
     * 返回当前日期
     * @return string
     */
    protected function getDate()
    {
        return Format::date();
    }

    /**
     * 在验证前执行，如果返回为 "false"，则不执行一下验证，基类中目前只判断 module 是否存在
     * @throws \Exception
     */
    protected function beforeValidate()
    {
        if (empty($this->moduleId) || 'app' == $this->moduleId) {
            $targetModule = Pub::getApp();
        } else {
            $targetModule = Pub::getApp();
            $ids = explode('.', $this->moduleId);
            $log_ids = '';
            while (!empty($ids)) {
                $mid = array_shift($ids);
                $log_ids .= $log_ids ? '.' . $mid : $mid;
                $targetModule = $targetModule->getModule($mid);
                if (null === $targetModule) {
                    throw new Exception(str_cover('找不到模块"{module}".', [
                        '{module}' => $log_ids,
                    ]));
                }
            }
        }
        $this->_targetModule = $targetModule;
        return true;
    }

    /**
     * 构建文件和文件夹
     * @return bool
     */
    abstract public function generate();
}