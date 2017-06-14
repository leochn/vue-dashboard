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

## jwt

```
login.vue 登录获取后端 apiServer 的jwt-token和用户信息,然后在header.vue中显示用户信息,前端在每次请求的时候,请求头带着jwt-token,后端 apiServer 验证jwt-token的有效性.如果未通过验证,跳转到哪里呢?(如何处理逻辑?)

每次请求,在请求头的Authorization中都要带着服务端传递过来的jwt-token,把该信息传输到服务端进行jwt验证.
```