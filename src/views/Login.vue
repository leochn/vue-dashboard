<template lang="html">
  <el-row>
    <el-col :span="12" :offset="6">
      <div class="login">
        <div class="login-form">
          <div class="card-block">
            <h1>Dashboard</h1>
            <p class="text-muted">使用用户名登录</p>
            <div class="input-group m-b-1">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input type="text" class="form-control" placeholder="loginName" v-model="form.loginName">
            </div>
            <div class="input-group m-b-2">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input type="pwd" class="form-control" placeholder="pwd" v-model="form.pwd"
                     @keyup.enter="login">
            </div>
            <div class="row">
              <el-row>
                <el-col :span="12">
                  <el-button type="primary" class="btn btn-primary p-x-2" @click="login">登录</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="button" class="btn btn-link forgot" style="float:right;">忘记密码?</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="login-register">
          <div class="card-block">
            <h2>注册</h2>
            <p>平台暂时只支持使用公司邮箱注册.</p>
            <el-button type="info" class="btn btn-primary active m-t-1"> 马上注册</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import appConfig from '../config.js'
  import * as types from '../store/mutation-types'
  import * as api from "../api"
  import  auth from '../auth'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        form: {
          loginName: 'admin',
          pwd: 'admin'
        }
      }
    },
    components: {},
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO
      }),
      ...mapActions({
        loadMenuList: 'loadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
      }),
      login(){
        var redirectUrl = '/index';
        if (this.$route.query && this.$route.query != null && this.$route.query.redirect && this.$route.query.redirect != null) {
          redirectUrl = this.$route.query.redirect;
        }


        //请求后台api,获取jwt,并把信息写到session中.
        // this.$http.get('src/data/data.json', this.form).then(res => {
        //   res.data = res.data.loginInfo;
        //   //auth.login(res.data.sid,alert('callback......'));
        //   auth.login(res.data.sid);
        //   window.sessionStorage.setItem("user-info", JSON.stringify(res.data.user));
        //   this.setUserInfo(res.data.user);
        //   this.$http.defaults.headers.common['authSid'] = res.data.sid;
        //   this.loadMenuList();
        //   this.$router.push({path: redirectUrl});
        // })


        // var axiosIns = this.$http.create({ url: 'http://localhost:8089/test?loginName=admin&pwd=admin', timeout: 100 })
        // axiosIns.get()


        //GET
        // this.$http({
        //   url: 'http://localhost:8089/api/test?loginName=admin&pwd=admin',
        //   //url: 'http://localhost:8089/us/999',
        //   method: 'get'
        // }).then(res=>{
        //   console.log(res.data.status);
        // })


        // POST --> 方式1
        var params = new URLSearchParams();
        params.append('loginName', this.form.loginName);
        params.append('pwd', this.form.pwd);

        // 根据后端的接收不同,提交的方式也不同.后端接收表单格式
        // this.$http.post('http://localhost:8089/rest/login',params).then(res=>{
        //   // console.log(res.data.status);
        //   // console.log(res.data.data.loginName);
        //   // console.log(res.data.data.token);
        //   //console.log(res.status);
        //   //console.log(res.headers);
        //   auth.login(res.data.data.token);
        //   //window.sessionStorage.setItem("user-info", JSON.stringify(res.data.data.loginName));
        //   this.setUserInfo(res.data.data.loginName);
        //   //this.loadMenuList();
        //   this.$router.push({path: redirectUrl});
        // })

        // POST --> 方式2
        // 根据后端的接收不同,提交的方式也不同.后端接收json格式
        this.$http.post(appConfig.appBaseUrl.loginUrl + '/login2',this.form).then(res=>{
          auth.login(res.data.data.token);
          this.setUserInfo(res.data.data.loginName);
          //this.loadMenuList();
          this.$router.push({path: redirectUrl});
        })



      }
    }
  }
</script>

<style>
  .login {
    margin-top: 160px;
    width: 100%;
    border: 1px solid #cfd8dc;
    margin-right: auto !important;
    margin-left: auto !important;
    display: table;
    table-layout: fixed;
  }

  .login .el-button {
    border-radius: 0;
  }

  .login .el-button.forgot, .login .el-button.forgot:hover {
    border: none;
  }

  .login .login-form {
    background-color: #FFFFFF;
    display: inline-block;
    width: 60%;
    display: table-cell;

  }

  .login .login-form .card-block {
    margin: 35px;
  }

  .login .login-form .card-block p {
    margin: 15px 0;
  }

  .input-group {
    width: 100%;
    display: table;
    border-collapse: separate;
    margin-bottom: 20px !important;
  }

  .input-group, .input-group-btn, .input-group-btn > .btn, .navbar {
    position: relative;
  }

  .input-group-addon:not(:last-child) {
    border-right: 0;
  }

  .input-group-addon, .input-group-btn {
    min-width: 40px;
    white-space: nowrap;
    vertical-align: middle;
    width: 1%;
  }

  .btn-link:focus, .btn-link:hover {
    color: #167495;
    text-decoration: underline;
    background-color: transparent;
  }

  .btn-link, .btn-link:active, .btn-link:focus, .btn-link:hover {
    border-color: transparent;
  }

  .btn.focus, .btn:focus, .btn:hover {
    text-decoration: none;
  }

  .input-group-addon {
    padding: .5rem .75rem;
    margin-bottom: 0;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.75rem;
    color: #607d8b;
    text-align: center;
    background-color: #cfd8dc;
    border: 1px solid rgba(0, 0, 0, .15);
  }

  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  .form-control {
    width: 100%;
    padding: .5rem .75rem;
    font-size: .875rem;
    line-height: 1.75rem;
    color: #607d8b;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .login .login-form .card-block .row {
    display: block;
    margin: 15px 0;
  }

  .login .login-register {
    display: table-cell;
    background-color: #20a8d8;
    width: 40%;
    color: #fff;
  }

  .login .login-register .card-block {
    text-align: center !important;
    margin: 30px;
  }

  .login .login-register .card-block p {
    text-align: left !important;
    margin: 15px 0;
    height: 100px;
  }
</style>
