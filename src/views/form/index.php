<?php
/* @var $model \Abstracts\FormModel */
?>
<style type="text/css">
    #attr_box .row {
        padding: 5px 20px;
        height: 40px;
        line-height: 40px;
    }
</style>
<h3 class="page-header">Create Form</h3>
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
<div id="attr_box">
    <div class="form-group row margin-top">
        <div class="control-label col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeLabel($model, 'attr'); ?>
        </div>
        <div class="control-label col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeLabel($model, 'attrLabel'); ?>
        </div>
        <div class="control-label col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeLabel($model, 'attrDefaultValue'); ?>
        </div>
        <div class="control-label col-sm-3 col-md-3 col-lg-3">
            <label>Operate</label>
        </div>
    </div>
    <div class="form-group row margin-top" id="demo">
        <div class="col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeTextField($model, 'attr[]', [
                'id' => false,
                'class' => 'form-control',
            ]); ?>
        </div>
        <div class="col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeTextField($model, 'attrLabel[]', [
                'id' => false,
                'class' => 'form-control',
            ]); ?>
        </div>
        <div class="col-sm-3 col-md-3 col-lg-3">
            <?php echo Html::activeTextField($model, 'attrDefaultValue[]', [
                'id' => false,
                'class' => 'form-control',
            ]); ?>
        </div>
        <div class="col-sm-3 col-md-3 col-lg-3">
            <input type="button" value="ADD" class="btn btn-primary" id="add_attr">
        </div>
    </div>
</div>

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
    // Attribute html fill demo.
    var attr_box_obj = document.getElementById('attr_box');

    // Add attribute
    document.getElementById('add_attr').onclick = function () {
        var new_node = document.createElement('div');
        new_node.className = 'form-group row margin-top';
        var os = document.getElementById('demo').getElementsByTagName('div');
        var len = os.length;
        for (var i = 0; i < len - 1; i++) {
            var node = os.item(i).cloneNode(true);
            node.getElementsByTagName('input').item(0).value = '';
            new_node.appendChild(node);
        }
        var del_node = document.createElement('div');
        del_node.className = 'col-sm-3 col-md-3 col-lg-3';
        del_node.innerHTML = '<input type="button" value="DEL" class="btn btn-default" onclick="delAttributeNode(this)">';
        new_node.appendChild(del_node);
        attr_box_obj.appendChild(new_node);
    };

    // Delete attribute
    function delAttributeNode(aNode) {
        attr_box_obj.removeChild(aNode.parentNode.parentNode);
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