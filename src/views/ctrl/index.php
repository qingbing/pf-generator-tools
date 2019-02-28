<?php
// 引用类
use gt\models\FormBase;

/* @var $model \Abstracts\FormModel */
?><h3 class="page-header">Create Controller</h3>
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
        <?php echo Html::activeLabel($model, 'name'); ?>：
    </dt>
    <dd class="col-sm-9 col-md-9 col-lg-9">
        <?php echo Html::activeTextField($model, 'name', [
            'data-valid-type' => 'string',
            'class' => 'form-control',
        ]); ?>
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
    // Validate where the controller file is exists.
    function callback() {
        let r;
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: '<?php echo $this->createUrl('valid'); ?>',
            data: $('#validForm').serialize(),
            success: function (rs) {
                if (0 === rs.code) {
                    r = true;
                } else {
                    $.alert(rs.message);
                    r = false;
                }
            }
        });
        return r;
    }
</script>