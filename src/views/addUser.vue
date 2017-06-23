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
                <el-radio :label="0">user</el-radio>
                <el-radio :label="1">admin</el-radio>
                <el-radio :label="2">super</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="创建时间:">
              <el-form-item prop="createTime">
                <el-date-picker 
                  type="date" placeholder="选择日期" 
                  format="yyyy-MM-dd"
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

        // if (!reg.test(value)) {
        //   callback(new Error('邮箱格式不正确--> ☺ '));
        // } else {
        //   callback();
        // }

        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('邮箱格式不正确--> ☺ '));
          } else {
            callback();
          }
        }, 200);
      };
      return {
        form: {
          loginName: null,
          pwd: 'abc123',
          userNo: null,
          userName: null,
          email: 'abc@gmail.com',
          phone: '02188888888',
          mobile: '13688888888',
          userType: 0,
          createTime: new Date   //this.$dateFormat(new Date, "yyyy-MM-dd") //不能进行日期格式化,否则提交的时候验证会报错. 报错没有解决.
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          loginName: [{required: true, message: '登录名不能为空', trigger: 'blur'}],
          pwd: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          userNo: [{required: true, message: '员工号不能为空', trigger: 'blur'}],
          email: [{validator:checkEmail , trigger: 'blur'}],
          createTime: [{type:'date', required: true, message: '请选择日期', trigger: 'change' }]
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
      console.log(this.route_id);
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true


        // this.$fetch.api_table.get({
        //   id: this.route_id
        // })
        //   .then(({data}) => {
        //     this.form = data
        //     this.load_data = false
        //   })
        //   .catch(() => {
        //     this.load_data = false
        //   })
        
        var url = 'http://localhost:8089/api/users/' + this.route_id;
        this.$http.get(url)
        .then(res=>{
          this.form = res.data.data
          this.load_data = false
        })
        .catch(()=>{
          this.load_data = false
        });




      },

      //提交
      on_submit_form(formName){
        //console.log(this.form.createTime);
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$http.post('http://localhost:8089/api/user',this.form).then(res=>{
            this.$message.success('成功添加用户')
            setTimeout(this.$router.back(), 500)
          }).catch(()=>{
            this.on_submit_loading = false
          })
        })
      }


    },
    components: {
      panelTitle
    }
  }
</script>
