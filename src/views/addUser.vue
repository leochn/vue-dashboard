<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="登录名:" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="密码:" prop="pwd">
              <el-input v-model="form.pwd" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="员工号:" prop="userNo">
              <el-input v-model="form.userNo" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="电话:" >
              <el-input v-model="form.phone" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="手机:" >
              <el-input v-model="form.mobile" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="用户类型:">
              <el-radio-group v-model="form.userType" style="width: 250px;">
                <el-radio label="0">user</el-radio>
                <el-radio label="1">admin</el-radio>
                <el-radio label="2">super</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="创建时间:">
              <el-form-item prop="createTime">
                <el-date-picker 
                  type="date" placeholder="选择日期" 
                  
                  :editable="false"
                  v-model="form.createTime" 
                  style="width: 250px;">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import panelTitle from '../components/panelTitle/panelTitle.vue'

  export default{
    data(){
      var checkEmail = (rule, value, callback) => {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('邮箱格式不正确--> ☺ '));
          } else {
            callback();
          }
        }, 200);
      };

      var checkLoginName=(rule, value, callback)=>{
        // 如果是修改,并且值还等于后端传过来的值,就不进行登录名已存在的校验.

        //console.log(value == this.form.loginNameTemp);
        if ((this.route_id !== undefined) && (value == this.form.loginNameTemp)) {
          return callback();
        }
        if (!value) {
          return callback(new Error('登录名不能为空'));
        }
        var url = 'http://localhost:8089/api/userinfo/' + value;
        this.$http.get(url).then(res=>{
          if (res.data.status == 2000) {
            callback(new Error('登录名已存在--> ☺ '));
          } else{
            callback();
          } 
        }).catch(()=>{
          //
        })
      };


      return {
        form: {
          loginNameTemp:null,
          loginName: null,
          pwd: 'abc123',
          userNo: null,
          userName: null,
          email: 'abc@gmail.com',
          phone: '02188888888',
          mobile: '13688888888',
          userType: '0',  // label='0' 为String型;  :label='0' 为Number型
          createTime: new Date
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          // 登录名要做唯一性校验.
          loginName: [{validator:checkLoginName , trigger: 'blur'}],
          pwd: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          userNo: [{required: true, message: '员工号不能为空', trigger: 'blur'}],
          email: [{validator:checkEmail , trigger: 'blur'}],
          createTime: [{type:'date', required: true, message: '请选择日期', trigger: 'blur' }] // trigger: 'change' ;使用change会出错.
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        // 获取数据还有一些问题,就是创建时间那边会有一些问题(有时候报错...不知道为什么?).
        // 后端的 json 输出, 时间传递的是时间戳.
        var url = 'http://localhost:8089/api/user/' + this.route_id;
        this.$http.get(url)
        .then(res=>{
          this.form = res.data.data
          this.load_data = false
          this.form.loginNameTemp = this.form.loginName
        })
        .catch(()=>{
          this.load_data = false
        });
      },

      //提交
      on_submit_form(formName){
        //console.log(this.form.createTime);
        //console.log('this.route_id=' + this.route_id);
        // 需要判断是post提交 还是put提交,根据 this.route_id 是否为 undefined 来判断.
        if (this.route_id === undefined ) {
          // 新增 --> post
          this.$refs.form.validate((valid) => {
            if (!valid) return false
            this.on_submit_loading = true
            this.$http.post('http://localhost:8089/api/user',this.form).then(res=>{
              this.$message.success('成功添加用户☺☺')
              setTimeout(this.$router.back(), 500)
            }).catch(()=>{
              this.on_submit_loading = false
            })
          })
        }else {
          // 修改--> put 
          this.$refs.form.validate((valid) => {
            if (!valid) return false
            this.on_submit_loading = true
            var url = 'http://localhost:8089/api/user/' + this.route_id;
            this.$http.put(url,this.form).then(res=>{
              this.$message.success('成功更新用户☺☺☺')
              setTimeout(this.$router.back(), 500)
            }).catch(()=>{
              this.on_submit_loading = false
            })
          })
        }
      }
    },
    components: {
      panelTitle
    }
  }
</script>
