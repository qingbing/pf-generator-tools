<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-25
 * Version      :   1.0
 */

namespace Gt\Models;


class FormCtrl extends FormBase
{
    /* @var string 控制器名 */
    public $name;

    private $_className;
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
     * 构建并返回 controller 的 className
     * @return string
     */
    protected function getClassName()
    {
        if (null === $this->_className) {
            $this->_className = $this->getHumpString($this->name) . 'Controller';
        }
        return $this->_className;
    }

    /**
     * 构建并返回 controller 对应的类文件
     * @return string
     * @throws \ReflectionException
     */
    public function getFileName()
    {
        if (null === $this->_fileName) {
            if ($this->isApplication()) {
                $this->_fileName = $this->getAppBasePath() . '/controllers/' . $this->getClassName() . '.php';
            } else {
                $this->_fileName = $this->getTargetModuleBasePath() . '/controllers/' . $this->getClassName() . '.php';
            }
        }
        return $this->_fileName;
    }

    /**
     * 获取视图文件路径
     * @return string
     * @throws \ReflectionException
     */
    protected function getViewFileName()
    {
        $name = lcfirst($this->getHumpString($this->name));
        if ($this->isApplication()) {
            return VIEW_PATH . '/' . $name . '/index.php';
        } else {
            return $this->getTargetModuleBasePath() . '/views/' . $name . '/index.php';
        }
    }

    /**
     * 验证通过后执行
     * 这里额外检查类文件是否已经存在
     * @throws \ReflectionException
     */
    protected function afterValidate()
    {
        $file = $this->getFileName();
        if (file_exists($file)) {
            $this->addError('name', str_cover('控制器文件"{file}"已经存在', [
                '{file}' => $file,
            ]));
        }
    }

    /**
     * 获取创建控制器 namespace
     * @return string|null
     */
    protected function getCtrlNamespace()
    {
        if ($this->isApplication()) {
            return 'Controllers';
        } else {
            return $this->getModuleNamespace() . '\\Controllers';
        }
    }

    /**
     * 创建 controller 类文件
     * @return bool
     * @throws \Exception
     */
    public function generate()
    {
        if ($this->validate()) {
            $template = file_get_contents($this->getTemplatePath() . '/controller/main.txt');
            $content = str_cover($template, [
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{ctrlNamespace}' => $this->getCtrlNamespace(),
                '{moduleNamespace}' => $this->getModuleNamespace(),
                '{className}' => $this->getClassName(),
            ]);
            if ($this->filePutContent($this->getFileName(), $content)) {
                // default action view file
                $viewFile = $this->getViewFileName();

                if (!file_exists($viewFile)) {
                    $template = file_get_contents($this->getTemplatePath() . '/controller/view.txt');
                    $content = str_cover($template, [
                        '{link}' => $this->getLink(),
                        '{user}' => $this->getUsername(),
                        '{date}' => $this->getDate(),
                        '{ctrlNamespace}' => $this->getCtrlNamespace(),
                        '{moduleNamespace}' => $this->getModuleNamespace(),
                        '{className}' => $this->getClassName(),
                    ]);
                    $this->filePutContent($viewFile, $content);
                }
                return true;
            }
            $this->addError('name', str_cover('创建控制器文件"{file}"失败', [
                '{file}' => $this->getFileName(),
            ]));
        }
        return false;
    }
}