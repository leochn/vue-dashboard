# vue-dashboard

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 通过vue-cli创建项目:

```
vue init webpack-simple vue-dashboard

安装依赖:
npm install
npm i element-ui -S
npm install vue-router -D
npm install vue-loader -D
npm install vuex --save
npm install style-loader -D
npm install vue-style-loader -D
npm install babel-preset-latest -D
npm install babel-plugin-transform-object-rest-spread -D
npm install echarts --save
npm install animate.css --save
```

## 为使mapGetters,mapActions不报错,修改下面配置:

```
.babelrc配置文件(原配置):
{
  "presets": [
    ["env", { "modules": false }]
  ]
}

添加依赖:
    npm install babel-preset-latest -D
    npm install babel-plugin-transform-object-rest-spread -D

.babelrc配置文件(修改为):
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": ["transform-object-rest-spread"]
}
```