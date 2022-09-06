## 简介
* 基于Vue-Element-Admin项目实现的Pig微服务项目前端界面。
* [vue-element-admin](https://panjiachen.github.io/vue-element-admin) 
* [pig](https://gitee.com/log4j/pig)
* [Avue](https://gitee.com/smallweigit/avue)
* 支持前端多语言的实现。

## 开发

```bash
# 克隆项目
git clone https://gitee.com/devzyh/pig-ele.git

# 进入项目目录
cd pig-ele

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```