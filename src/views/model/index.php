<?php
/* @var $model \Abstracts\FormModel */
?>
<h3 class="page-header">Create Model</h3>
<?php echo Html::beginForm('', 'post', [
    'id' => 'validForm',
    'class' => 'w-validate',
    'enctype' => 'multipart/form-data',
    'data-callback' => 'callback'
]); ?>
<dl class="form-group row margin-top">
    <dt class="control-label col-sm-3 col-md-3 col-lg-3">
        <?php echo Html::activeLabel($model, 'moduleId'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeDropDownList($model, 'moduleId', \gt\models\FormBase::getModuleIds(), [
            'data-valid-type' => 'select',
            'class' => 'form-control',
            'data-min-length' => 1,
            'data-max-length' => 1,
        ]) ?>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dt class="control-label col-sm-3 col-md-3 col-lg-3">
        <?php echo Html::activeLabel($model, 'db'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeTextField($model, 'db', [
            'class' => 'form-control',
            'data-valid-type' => 'string',
            'data-callback' => 'resetDbComponent',
        ]); ?>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dt class="control-label col-sm-3 col-md-3 col-lg-3">
        <?php echo Html::activeLabel($model, 'tablePrefix'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeTextField($model, 'tablePrefix', [
            'class' => 'form-control',
            'data-valid-type' => 'string',
            'id' => 'tablePrefix',
            'data-allow-empty' => 'true',
            'data-callback' => 'resetTablePrefix',
        ]); ?>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dt class="control-label col-sm-3 col-md-3 col-lg-3">
        <?php echo Html::activeLabel($model, 'tableName'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeTextField($model, 'tableName', [
            'class' => 'form-control',
            'data-valid-type' => 'string',
            'id' => 'tableName',
            'data-callback' => 'resetTableName',
        ]); ?>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dt class="control-label col-sm-3 col-md-3 col-lg-3">
        <?php echo Html::activeLabel($model, 'modelClassName'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeTextField($model, 'modelClassName', [
            'class' => 'form-control',
            'data-valid-type' => 'string',
            'id' => 'modelClassName',
        ]); ?>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dd class="col-sm-9 col-md-9 col-lg-9 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
        <div class="checkbox checkbox-inline">
            <?php echo Html::activeCheckbox($model, 'commentLabel', [
                'data-valid-type' => 'checked',
                'data-allow-empty' => 'true',
            ]); ?>
            <?php echo Html::activeLabel($model, 'commentLabel'); ?>
        </div>
    </dd>
</dl>

<dl class="form-group row margin-top">
    <dd class="col-sm-9 col-md-9 col-lg-9 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
        <?php echo Html::submitButton('确认创建', [
            'id' => 'submitBtn',
            'class' => 'btn btn-primary',
        ]); ?>
    </dd>
</dl>

<?php echo Html::endForm(); ?>
<script type="text/javascript">
    let $tablePrefix = $('#tablePrefix');
    let $tableName = $('#tableName');
    let $modelClassName = $('#modelClassName');

    let dbComponent = '<?php echo $model->db; ?>';
    let tablePrefix = '<?php echo $model->tablePrefix; ?>';
    let tableName = '<?php echo $model->tableName; ?>';

    // The callback function for reset db component.
    function resetDbComponent(val) {
        if (dbComponent === val) {
            return true;
        }
        dbComponent = val;
        let r;
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: '<?php echo $this->createUrl('validDbComponent'); ?>',
            data: $('#validForm').serialize(),
            success: function (rs) {
                if (0 === rs.code || '0' === rs.code) {
                    tablePrefix = rs.data.tablePrefix;
                    r = true;
                } else {
                    tablePrefix = '';
                    r = rs.message;
                }
                $tablePrefix.val(tablePrefix);
            }
        });
        return r;
    }

    // The callback function for reset table prefix.
    function resetTablePrefix(val) {
        if (tablePrefix === val) {
            return true;
        }
        tablePrefix = val;
        let r;
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: '<?php echo $this->createUrl('createModelName'); ?>',
            data: $('#validForm').serialize(),
            success: function (rs) {
                if (0 === rs.code || '0' === rs.code) {
                    r = true;
                    let c_name = rs.data.name;
                    if (H.isEmpty(c_name)) {
                        tableName = '';
                        $tableName.val('');
                        $modelClassName.val('');
                    } else {
                        $modelClassName.val(c_name);
                    }
                } else {
                    r = rs.message;
                    tableName = '';
                    $tableName.val('');
                    $modelClassName.val('');
                }
            }
        });
        return r;
    }

    // The callback function for reset table name.
    function resetTableName(val) {
        if (tableName === val) {
            return true;
        }
        tableName = val;
        let r;
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: '<?php echo $this->createUrl('createModelName'); ?>',
            data: $('#validForm').serialize(),
            success: function (rs) {
                if (0 === rs.code || '0' === rs.code) {
                    let c_name = rs.data.name;
                    if (H.isEmpty(c_name)) {
                        r = 'Can not find table';
                        $modelClassName.val('');
                    } else {
                        r = true;
                        $modelClassName.val(c_name)
                    }
                } else {
                    r = rs.message;
                    $modelClassName.val('');
                }
            }
        });
        return r;
    }

    // Validate where the model file is exists.
    function callback() {
        let r;
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: '<?php echo $this->createUrl('valid'); ?>',
            data: $('#validForm').serialize(),
            success: function (rs) {
                if (0 === rs.code || '0' === rs.code) {
                    r = true;
                } else {
                    r = false;
                    $.alert(rs.message);
                }
            }
        });
        return r;
    }
</script>