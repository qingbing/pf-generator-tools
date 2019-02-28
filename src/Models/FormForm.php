<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-26
 * Version      :   1.0
 */

namespace Gt\Models;


class FormForm extends FormBase
{
    /* @var string 模型名 */
    public $name;
    /* @var array 模型属性 */
    public $attr;
    /* @var array 模型属性标签 */
    public $attrLabel;
    /* @var array 模型属性值 */
    public $attrDefaultValue;

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
            ['attr, attrLabel, attrDefaultValue', 'safe'],
        ]);
    }

    /**
     * 构建并返回 formModel 的 className
     * @return string
     */
    protected function getClassName()
    {
        if (null === $this->_className) {
            $this->_className = 'Form' . $this->getHumpString($this->name);
        }
        return $this->_className;
    }

    /**
     * 获取model的存放路径
     * @return string
     * @throws \ReflectionException
     */
    protected function getBasePath()
    {
        if ($this->isApplication()) {
            return $this->getAppBasePath() . '/app/Models';
        }
        return $this->getTargetModule()->getBasePath() . '/Models';
    }

    /**
     * 构建并返回 formModel 对应的类文件
     * @return string
     * @throws \ReflectionException
     */
    public function getFileName()
    {
        if (null === $this->_fileName) {
            $this->_fileName = $this->getBasePath() . '/' . $this->getClassName() . '.php';
        }
        return $this->_fileName;
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
            $this->addError('name', str_cover('文件"{file}"已经存在', [
                '{file}' => $file,
            ]));
        }
        if (!is_array($this->attr) || !count($this->attr)) {
            $this->addError('attr', str_cover('属性必须是非空数组'));
        }
    }

    /**
     * 创建表单模型文件
     * @return bool
     * @throws \Exception
     */
    public function generate()
    {
        if ($this->validate()) {
            $template = file_get_contents($this->getTemplatePath() . '/form/main.txt');
            $content = str_cover($template, [
                '{moduleNamespace}' => $this->getModuleNamespace(),
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{properties}' => $this->generateProperties(),
                '{className}' => $this->getClassName(),
                '{rules}' => $this->generateRules(),
                '{labels}' => $this->generateLabels(),
            ]);

            if (self::filePutContent($this->getFileName(), $content)) {
                return true;
            }
            $this->addError('name', str_cover('创建表单模型文件"{file}"失败', [
                '{file}' => $this->getFileName(),
            ]));
        }
        return false;
    }

    /**
     * 构建属性字符串
     * @return string
     */
    protected function generateProperties()
    {
        $rString = '';
        foreach ($this->attr as $i => $property) {
            if (empty($property)) {
                continue;
            }
            // 属性注释，用属性标签当注释
            if (isset($this->attrLabel[$i]) && '' !== $this->attrLabel[$i]) {
                $label = trim($this->attrLabel[$i]);
            } else {
                $label = '';
            }
            if ($label) {
                $rString .= "\n    /* @var string {$label} */";
            } else {
                $rString .= "\n    /* @var string */";
            }
            if (isset($this->attrDefaultValue[$i]) && '' !== $this->attrDefaultValue[$i]) {
                $v = trim($this->attrDefaultValue[$i]);
            } else {
                $v = '';
            }
            // 属性
            if ($v) {
                $rString .= "\n    public \${$property} = '{$v}';";
            } else {
                $rString .= "\n    public \${$property};";
            }
        }
        $rString .= "\n";
        return $rString;
    }

    /**
     * 构建属性规则
     * @return string
     */
    protected function generateRules()
    {
        $rArray = [];
        foreach ($this->attr as $i => $property) {
            if (empty($property))
                continue;
            array_push($rArray, $property);
        }
        return implode(', ', $rArray);
    }

    /**
     * 构建属性显示标签
     * @return string
     */
    protected function generateLabels()
    {
        $rString = '';
        foreach ($this->attr as $i => $property) {
            if (empty($property)) {
                continue;
            }
            if (isset($this->attrLabel[$i]) && '' !== $this->attrLabel[$i]) {
                $v = trim($this->attrLabel[$i]);
            }
            if (isset($v) && $v) {
                $rString .= "\n            '{$property}' => '{$v}',";
            }
        }
        return $rString;
    }
}