<?php
/**
 * Link         :   http://www.phpcorner.net
 * User         :   qingbing<780042175@qq.com>
 * Date         :   2019-02-27
 * Version      :   1.0
 */

namespace Gt\Models;


use Gt\Components\Pub;
use Helper\Exception;

class FormModel extends FormBase
{
    /* @var string 数据库db组件名称 */
    public $db = 'database';
    /* @var string 数据表前缀 */
    public $tablePrefix;
    /* @var string 实际的数据表名 */
    public $tableName;
    /* @var string 对应的数据表模型的类名 */
    public $modelClassName;
    /* @var string 是否用字段的注释作为标签 */
    public $commentLabel = 1;

    private $_fileName;

    /**
     * 构造函数后被调用
     * @throws Exception
     */
    public function init()
    {
        $this->tablePrefix = $this->getDbConnection()->tablePrefix;
    }

    /**
     * 定义并返回模型属性的验证规则
     * @return array
     */
    public function rules()
    {
        return array_merge(parent::rules(), [
            ['tableName', 'required'],
            ['tableName, db, tablePrefix, modelClassName', 'string'],
            ['commentLabel', 'boolean'],
            ['db, tablePrefix, modelClassName, commentLabel', 'safe'],
        ]);
    }

    /**
     * 返回数据库连接
     * @return \Components\Db|\Abstracts\Component|null
     * @throws Exception
     */
    public function getDbConnection()
    {
        if (null === ($db = Pub::getApp()->getComponent($this->db))) {
            throw new Exception(str_cover('找不到对应的数据库组件"{db}"', [
                '{db}' => $this->db,
            ]));
        }
        return $db;
    }

    /**
     * 创建 model 的 className
     * @return string
     */
    protected function getClassName()
    {
        if (!empty($this->modelClassName)) {
            return $this->modelClassName;
        }
        if (empty($this->tablePrefix)) {
            return $this->getHumpString($this->tableName);
        }
        if (0 === strpos($this->tableName, $this->tablePrefix)) {
            $expression = substr($this->tableName, strlen($this->tablePrefix));
            if ('_' !== $expression{0}) {
                return $this->getHumpString($expression);
            }
        }
        return $this->getHumpString($this->tableName);
    }

    /**
     * 创建 model 的 className
     * @return string
     * @throws Exception
     */
    public function createModelName()
    {
        if (empty($this->tableName)) {
            return '';
        }
        $table = $this->getDbConnection()->getTable($this->tableName);
        if (null === $table) {
            throw new Exception(str_cover('找不到数据表"{table}".', [
                'table' => $this->tableName,
            ]));
        }
        return $this->getClassName();
    }

    /**
     * 返回数据表名的表达式
     * @return string
     * @throws Exception
     */
    protected function getTableNameExpression()
    {
        $db_prefix = $this->getDbConnection()->tablePrefix;
        if (empty($db_prefix))
            return $this->tableName;
        if (0 === strpos($this->tableName, $db_prefix)) {
            $expression = substr($this->tableName, strlen($db_prefix));
            if ('_' !== $expression{0}) {
                return '{{' . $expression . '}}';
            }
        }
        return $this->tableName;
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
     * 返回 model 的文件路径
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
     * Validate whether the file name is exists.
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
    }

    /**
     * 构建文件和文件夹
     * @return bool
     * @throws \Exception
     */
    public function generate()
    {
        if ($this->validate()) {
            $template = file_get_contents($this->getTemplatePath() . '/model/main.txt');
            $content = str_cover($template, [
                '{moduleNamespace}' => $this->getModuleNamespace(),
                '{link}' => $this->getLink(),
                '{user}' => $this->getUsername(),
                '{date}' => $this->getDate(),
                '{table_name_expression}' => $this->getTableNameExpression(),
                '{properties}' => $this->generateProperties(),
                '{className}' => $this->getClassName(),
                '{rules}' => $this->generateRules(),
                '{labels}' => $this->generateLabels(),
                '{dbConnection}' => $this->generateDbConnection(),
            ]);
            if ($this->filePutContent($this->getFileName(), $content)) {
                return true;
            }
            $this->addError('name', str_cover('Generate db model file"{file}" failed.', [
                '{file}' => $this->getFileName(),
            ]));
        }
        return false;
    }

    /**
     * 创建列名属性注释
     * @return string
     * @throws Exception
     */
    protected function generateProperties()
    {
        $table = $this->getDbConnection()->getTable($this->tableName);
        $rString = '';
        foreach ($table->columns as $name => $column) {
            if ('double' == $column->type) {
                $type = 'float';
            } else {
                $type = $column->type;
            }
            $rString .= "\n * @property {$type} {$name}";
        }
        if (!empty($rString)) {
            $rString = "\n * {$rString}";
        }
        return $rString;
    }

    /**
     * 创建数据表模型的规则
     * @return string
     * @throws Exception
     */
    protected function generateRules()
    {
        $table = $this->getDbConnection()->getTable($this->tableName);
        $rules = $required = $integers = $numerical = $string = $safe = [];
        $in = $multiIn = [];
        foreach ($table->columns as $column) {
            if ($column->autoIncrement) {
                continue;
            }
            $isRequired = false;
            if (!$column->allowNull && $column->defaultValue !== null && $column->defaultValue !== '') {
                $required[] = $column->name;
                $isRequired = true;
            }
            if ($column->type === 'integer') {
                $integers[] = $column->name;
            } else if ($column->type === 'double') {
                $numerical[] = $column->name;
            } else if ($column->type === 'string') {
                if (strncmp($column->dbType, 'enum', 4) === 0 && preg_match('/\((.*)\)/', $column->dbType, $ms)) {
                    $in[] = "\n            ['{$column->name}', 'in', 'range' => [{$ms[1]}]],";
                } else if (strncmp($column->dbType, 'set', 3) === 0 && preg_match('/\((.*)\)/', $column->dbType, $ms)) {
                    $multiIn[] = "\n            ['{$column->name}', 'multiIn', 'range' => [{$ms[1]}]],";
                } else if ($column->size > 0) {
                    $string[$column->size][] = $column->name;
                } else {
                    $safe[] = $column->name;
                }
            } else if (!$column->isPrimaryKey && !$isRequired) {
                $safe[] = $column->name;
            }
        }
        if ($required !== [])
            $rules[] = "\n            ['" . implode(', ', $required) . "', 'required'],";
        if ($integers !== [])
            $rules[] = "\n            ['" . implode(', ', $integers) . "', 'numerical', 'integerOnly' => true],";
        if ($numerical !== [])
            $rules[] = "\n            ['" . implode(', ', $numerical) . "', 'numerical'],";
        if ($string !== []) {
            foreach ($string as $len => $cols) {
                $rules[] = "\n            ['" . implode(', ', $cols) . "', 'string', 'maxLength' => $len],";
            }
        }

        $rules = array_merge($rules, $in, $multiIn);
        if ($safe !== []) {
            $rules[] = "\n            ['" . implode(', ', $safe) . "', 'safe'],";
        }

        return implode('', $rules);
    }

    /**
     * 创建数据表列显示标签
     * @return string
     * @throws Exception
     */
    protected function generateLabels()
    {
        $table = $this->getDbConnection()->getTable($this->tableName);
        $rString = '';
        foreach ($table->columns as $name => $column) {
            if ($this->commentLabel && !empty($column->comment)) {
                $label = $column->comment;
            } else {
                $label = implode(' ', array_map('ucfirst', explode('_', $name)));
            }
            $rString .= "\n            '{$name}' => '{$label}',";
        }
        return $rString;
    }

    /**
     * 构建模型的数据库连接
     * @return string
     */
    protected function generateDbConnection()
    {
        if ('database' != $this->db) {
            return <<<EDO


    /**
     * 获取并返回模型的数据库连接
     * @return \\Components\Db
     */
    public function getConnection()
    {
        return \PF::app()->{$this->db};
    }
EDO;
        }
        return '';
    }
}