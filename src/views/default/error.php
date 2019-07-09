<?php
/* @var $this \Gt\components\Controller */
ClientScript::getInstance()->registerCssFile(\Assets001::getAssetBaseUrl() . '/css/error.css');
?>
<div id="error-box">
    <div id="error-desktop"><i class="fa fa-television"></i></div>
    <div id="error-content">
        <div id="error-left">
            <div class="fa fa-reddit error-icon text-danger"></div>
            <div class="error-code text-danger"><?php echo $error['code']; ?></div>
        </div>
        <div id="error-right" class="text-warning">
            <div class="error-god"><i class="fa fa-smile-o"> OMG!</i></div>
            <div class="error-info text-left"><i class="fa fa-eye">访问的页面不在地球了！</i></div>
            <div class="error-info text-left">Σ(っ °Д °;)っ<i class="fa fa-frown-o"></i>...</div>
            <div class="error-info text-left">访问以下链接</div>

            <ul id="error-links">
                <li><a href="<?php echo $this->createUrl('//Gt'); ?>">Home</a></li>
                <li><a href="<?php echo PF::home(); ?>" target="_blank"><?php echo PF::name(); ?></a></li>
            </ul>
        </div>
        <div id="error-tip" class="text-danger">
            哎呀呀！访问的页面不在了!
            <span id="error-second" class="text-primary">3</span>
            秒后自动跳转
        </div>
    </div>
</div>

<script type="text/javascript">
    var timer = window.setInterval(function () {
        var obj = document.getElementById('error-second');
        var second = parseInt(obj.innerHTML) - 1;
        obj.innerHTML = second;
        if (0 === second) {
            window.clearInterval(timer);
            window.location.href = '<?php echo $this->createUrl('//gt'); ?>';
        }
    }, 1000);
</script>
