# pf-generator-tools
pf 框架自动创建工具，支持控制器，模块，模型等

## 注意事项
- 引用的主要小部件
    - "qingbing/php-html"
    - "qingbing/php-assets-manager"
    - "qingbing/php-web-user"
    - "qingbing/php-render"
    - "qingbing/php-database"
    - "qingbing/php-db-model"
- 使用方法
    - 在 "conf/application-web.php" 的 module 中直接加入 "conf/module-gt.php" 的模块配置
    - 修改 "conf/module-gt.php" 的登录用户名和密码
    - 该模块强烈不建议在生产环境中使用，仅供在程序员开发时提供简单代码的自行构建


## ====== 异常代码集合 ======

异常代码格式：1034 - XXX - XX （组件编号 - 文件编号 - 代码内异常）
```
 - 无
```