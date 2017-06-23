<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'addUser'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        @sort-change="sortChange"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登陆名"
          width="120"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="userNo"
          label="员工号"
          width="100"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="昵称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="160">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="140"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="dateFormat" 
          width="140"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'addUser', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import panelTitle from '../components/panelTitle/panelTitle.vue'
  import bottomToolBar from '../components/bottomToolBar.vue'
  var moment = require('moment');

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 8,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(sortField,sortOrder){
        this.load_data = true
        var url = null;
        if (sortField === null || sortField === undefined || sortField === '') {
          url = 'http://localhost:8089/api/users?page=' + this.currentPage + '&rows=' + this.length
        }else {
          url = 'http://localhost:8089/api/users?page=' + this.currentPage + '&rows=' + this.length + '&sortField=' + sortField + '&sortOrder=' + sortOrder
        }
        this.$http.get(url)
        .then(res=>{
          this.table_data = res.data.data
          this.total = res.data.total
          this.load_data = false
        })
        .catch(()=>{
          this.load_data = false
        });
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            console.log(item.id + "," + item.loginName);
            var url = 'http://localhost:8089/api/users/' + item.id;
            this.$http.delete(url)
            .then(res=>{
              this.load_data = false
              this.$message('删除第'+ item.id +'行');
              this.get_table_data()
            })
            .catch(()=>{
              this.load_data = false
            });
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        //alert(8);
        this.batch_select = val
      },
      // 点击重新排序,请求后端api的排序数据
      sortChange(val){
        // val.column ; val.prop ; val.order
        //console.log(val.prop)
        if (val.prop !== null) {
          var order = null;
          if (val.order == 'ascending') {
            order = 'asc'
          }
          if (val.order == 'descending') {
            order = 'desc'
          }
          this.get_table_data(val.prop,order)
        }
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            // 伪删除,实际为刷新数据
            //this.get_table_data()
            
            this.$http.get('http://localhost:8089/api/users?page=1&rows=6')
            .then(res=>{
              this.table_data = res.data.data
              this.total = res.data.total
              this.load_data = false
            })
            .catch(()=>{
              this.load_data = false
            });
          })
          .catch(() => {
          })
      }
      ,
      //时间格式化  
       dateFormat:function(row, column) {  

        var date = row[column.property]; 
        //alert(date); 
        if (date == undefined) {  
          return "";  
        }  
        // 使用第三方 moment 进行日期格式修改
        //return moment(date).format("YYYY-MM-DD");  
        
        // 使用自定义插件进行日期格式修改
        return this.$dateFormat(new Date, "yyyy-MM-dd");
      }  




      //
    }
  }
</script>
<style scope>
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  }

   .panel-body {
      padding: 15px;
      overflow: hidden;
      font-weight: normal;

    }

    .bottom-toolbar {
      margin-top: 15px;
      padding: 15px 0;
    }

    .panel-title {
      padding: 0 15px;
      color: #535351;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    }

    .panel_title_select {
      display: inline-block;
    }

    .el-input__inner {
      height: 28px;
    }

    .fr {
      float: right;
    }
    .fl {
      float: left;
    }
</style>
