<?php
/* @var \Gt\Components\Controller $this */
/* @var string $content */
$assetBaseUrl = \Assets001::getAssetBaseUrl();
?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?php echo $assetBaseUrl; ?>/css/main.css">
    <link rel="stylesheet" href="<?php echo $assetBaseUrl; ?>/css/plugins.css">
    <link rel="stylesheet" href="<?php echo $assetBaseUrl; ?>/css/site.css">
    <script src="<?php echo $assetBaseUrl; ?>/js/jquery-3.2.1.min.js"></script>
    <script src="<?php echo $assetBaseUrl; ?>/js/holder.min.js"></script>
    <script src="<?php echo $assetBaseUrl; ?>/js/h.js"></script>
    <script src="<?php echo $assetBaseUrl; ?>/js/autoload.js"></script>
    <script src="<?php echo $assetBaseUrl; ?>/js/common.js"></script>
    <title>Auto Generator Tool of Php Framework<?php if ($this->getClip('pageTitle')) {
            echo " - " . $this->getClip('pageTitle');
        } ?></title>
</head>
<body>
<?php echo $content; ?>
</body>
</html>