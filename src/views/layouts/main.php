<?php
/* @var \Render\Abstracts\Controller $this */
/* @var string $content ; */
$this->beginContent('/layouts/html');
?>
    <div class="w-navbar w-navbar-top">
        <div class="container">
            <a class="w-navbar-brand" href="#">Auto Generator Tools</a>
            <div class="w-navbar-ctrl btn btn-default"><span class="fa fa-bars"></span></div>
            <div class="w-navbar-main">
                <ul class="w-nav">
                    <li><a href="<?php echo $this->createUrl('/default/index'); ?>">Contact Us</a></li>
                    <li class="w-dropdown">
                        <a href="#">Generator Tools <span class="caret"></span></a>
                        <ul class="w-dropdown-menu">
                            <li><a href="<?php echo $this->createUrl('/form/index'); ?>">Form Generator</a></li>
                            <li><a href="<?php echo $this->createUrl('/model/index'); ?>">Model Generator</a></li>
                            <li><a href="<?php echo $this->createUrl('/ctrl/index'); ?>">Controller Generator</a></li>
                            <li><a href="<?php echo $this->createUrl('/module/index'); ?>">Module Generator</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="w-navbar-right">
                    <ul class="w-nav">
                        <li><a href="<?php echo $this->createUrl('/login/logout'); ?>">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="header-container"><!--  占位，漂浮 header 的高度 --></div>
    <div class="container">
        <div class="row"><?php echo $content; ?></div>
    </div>
<?php $this->endContent(); ?>