<?php
ClientScript::getInstance()->registerCssFile(\Assets001::getAssetBaseUrl() . '/css/login.css');
?>
<div class="container-fluid">
    <?php echo Html::beginForm('', 'post', [
        'class' => 'w-validate',
    ]); ?>
    <div id="login_box">
        <div class="container">
            <dl class="form-group row">
                <dt class="col-sm-2 col-md-2 col-lg-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 control-label">
                    <?php echo Html::activeLabel($model, 'username'); ?>：
                </dt>
                <dd class="col-sm-3 col-md-3 col-lg-3">
                    <?php echo Html::activeTextField($model, 'username', [
                        'class' => 'form-control',
                        'data-valid-type' => 'username',
                        'data-allow-empty' => 'false',
                        'data-help-block' => '#help-block-username',
                    ]); ?>
                </dd>
                <dd class="col-sm-3 col-md-3 col-lg-3 text-left" id="help-block-username"></dd>
            </dl>
            <dl class="form-group row">
                <dt class="col-sm-2 col-md-2 col-lg-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 control-label">
                    <?php echo Html::activeLabel($model, 'password'); ?>：
                </dt>
                <dd class="col-sm-3 col-md-3 col-lg-3">
                    <?php echo Html::activePasswordField($model, 'password', [
                        'class' => 'form-control',
                        'data-valid-type' => 'password',
                        'data-allow-empty' => 'false',
                        'data-help-block' => '#help-block-password',
                    ]); ?>
                </dd>
                <dd class="col-sm-3 col-md-3 col-lg-3 text-left" id="help-block-password"></dd>
            </dl>
            <dl class="form-group row">
                <dt class="col-sm-2 col-md-2 col-lg-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 control-label">
                    <?php echo Html::activeLabel($model, 'verifyCode'); ?>：
                </dt>
                <dd class="col-sm-1 col-md-1 col-lg-1">
                    <?php echo Html::activeTextField($model, 'verifyCode', [
                        'class' => 'form-control',
                        'data-valid-type' => 'string',
                        'data-allow-empty' => 'false',
                        'data-help-block' => '#help-block-verifyCode',
                        'data-min-length' => 4,
                        'data-max-length' => 6,
                    ]); ?>
                </dd>
                <dd class="col-sm-2 col-md-2 col-lg-2">
                    <?php $this->widget('\Widgets\Captcha', [
                        'action' => '//gt/login/captcha',
                        'alt' => '验证码',
                        'attributes' => [
                        ]
                    ]); ?>
                </dd>
                <dd class="col-sm-3 col-md-3 col-lg-3 text-left" id="help-block-verifyCode"></dd>
            </dl>
            <dl class="form-group row">
                <dd class="col-sm-3 col-md-3 col-lg-3 col-sm-offset-4 col-md-offset-4 col-lg-offset-4">
                    <?php echo Html::submitButton('确认登录', [
                        'class' => 'btn btn-primary btn-block',
                        'id' => 'submitBtn',
                    ]); ?>
                </dd>
            </dl>
            <div id="version" class="col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                Power by <a href="http://www.phpcorner.net" target="_blank">Easy Framework</a>;
                <span>version:1.0</span>;
                <em>copy right &copy; 2014-12~~</em>
            </div>
        </div>
    </div>
    <?php echo Html::endForm(); ?>
</div>