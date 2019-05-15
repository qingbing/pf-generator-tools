<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-27
 * Version      :   1.0
 */

namespace Gt\Models;


class FormModule extends FormBase
{
    /* @var string 模块名 */
    public $name;

    /* @var string 模块ID */
    private $_id;
    /* @var string 模块的 module 入口文件 */
    private $_fileName;

    /**
     * 定义并返回模型属性的验证规则
     * @return array
     */
    public function rules()
    {
        return array_merge(parent::rules(), [
            ['name', 'required'],
        ]);
    }

    /**
     * 返回 module 类名
     * @return string
     */
    protected function getClassName()
    {
        return 'Module';
    }

    /**
     * 返回 moduleId
     * @return string
     */
    protected function getId()
    {
        if (null === $this->_id) {
            $name = $this->getHumpString($this->name);
            $name{0} = strtolower($name{0});
            $this->_id = $name;
        }
        return $this->_id;
    }

    /**
     * 返回新 module 的主路径
     * @return string
     * @throws \ReflectionException
     */
    protected function getNewModuleBasePath()
    {
        if ($this->isApplication()) {
            $basePath = $this->getAppBasePath() . '/modules';
        } else {
            $basePath = $this->getTargetModuleBasePath() . '/modules';
        }
        if (!is_dir($basePath)) {
            @mkdir($basePath, 0777);
        }
        return $basePath . '/' . lcfirst($this->getId());
    }

    /**
     * 返回 module 主文件名
     * @return string
     * @throws \ReflectionException
     */
    public function getFileName()
    {
        if (null === $this->_fileName) {
            $this->_fileName = $this->getNewModuleBasePath() . '/' . 'Module.php';
        }
        return $this->_fileName;
    }

    /**
     * Validate whether the file name is exists.
     * @throws \ReflectionException
     */
    protected function afterValidate()
    {
        $file = $this->getFileName();
        if (file_exists($file)) {
            $this->addError('name', str_cover('模块文件"{file}"已经存在', [
                '{file}' => $file,
            ]));
        }
    }

    /**
     * 获取新module的命名空间
     * @return string
     */
    protected function getNewModuleNamespace()
    {
        return ucfirst($this->getId());
    }

    /**
     * 构建文件和文件夹
     * @return bool
     * @throws \Exception
     */
    public function generate()
    {
        // 验证
        if (!$this->validate()) {
            return false;
        }
        // 目录创建
        $newModuleBasePath = $this->getNewModuleBasePath();
        if (!is_dir($newModuleBasePath)) {
            @mkdir($newModuleBasePath);
        }
        if (!is_dir($_path = $newModuleBasePath . '/Components')) {
            @mkdir($_path);
        }
        if (!is_dir($_path = $newModuleBasePath . '/Controllers')) {
            @mkdir($_path);
        }
        if (!is_dir($_path = $newModuleBasePath . '/Models')) {
            @mkdir($_path);
        }
        if (!is_dir($_path = $newModuleBasePath . '/views')) {
            @mkdir($_path);
        }
        // 创建模块主文件
        $template = file_get_contents($this->getTemplatePath() . '/module/main.txt');
        $content = str_cover($template, [
            '{link}' => $this->getLink(),
            '{user}' => $this->getUsername(),
            '{date}' => $this->getDate(),
            '{newModuleNamespace}' => $this->getNewModuleNamespace(),
            '{className}' => $this->getClassName(),
        ]);
        if (!$this->filePutContent($this->getFileName(), $content)) {
            $this->addError('name', str_cover('创建module文件"{file}"失败'));
            return false;
        }

        // 创建公用控制器
        $_file = $newModuleBasePath . '/Components/Controller.php';
        if (!file_exists($_file)) {
            $template = file_get_contents($this->getTemplatePath() . '/module/components/Controller.txt');
            $content = str_cover($template, [
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{newModuleNamespace}' => $this->getNewModuleNamespace(),
            ]);
            if (!$this->filePutContent($_file, $content)) {
                $this->addError('name', str_cover('创建模块的公共控制器失败"{file}"', [
                    "{file}" => $_file,
                ]));
                return false;
            }
        }

        // 创建默认控制器
        $_file = $newModuleBasePath . '/Controllers/DefaultController.php';
        if (!file_exists($_file)) {
            $template = file_get_contents($this->getTemplatePath() . '/module/controllers/DefaultController.txt');
            $content = str_cover($template, [
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{newModuleNamespace}' => $this->getNewModuleNamespace(),
            ]);
            if (!$this->filePutContent($_file, $content)) {
                $this->addError('name', str_cover('创建模块的默认控制器失败"{file}"', [
                    "{file}" => $_file,
                ]));
                return false;
            }
        }
        // 创建视图文件
        $_file = $newModuleBasePath . '/views/default/index.php';
        if (!file_exists($_file)) {
            $template = file_get_contents($this->getTemplatePath() . '/module/views/default/index.txt');
            $content = str_cover($template, [
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{newModuleNamespace}' => $this->getNewModuleNamespace(),
            ]);
            if (!$this->filePutContent($_file, $content)) {
                $this->addError('name', str_cover('创建模块的默认视图失败"{file}"', [
                    "{file}" => $_file,
                ]));
                return false;
            }
        }
        return true;
    }
}