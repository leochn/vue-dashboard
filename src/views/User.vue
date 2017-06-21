<template>
  <div class="panel">
    <!-- <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title> -->
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80"
          sortable>
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登陆名"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="userNo"
          label="员工号"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="昵称"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="电话"
          label="phone"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <!-- <router-link :to="{name: 'tableUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link> -->
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <bottom-tool-bar>
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
      </bottom-tool-bar> -->
    </div>
  </div>
</template>
<script type="text/javascript">
  //import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      //panelTitle,
      //bottomToolBar
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
      get_table_data(){
        this.load_data = false
        this.$http.get('http://localhost:8089/api/test?loginname=admin&password=admin').then(res=>{
          this.table_data = res.data.data
          //this.currentPage = da.page
          this.total = res.data.total
        });













//         var da = {"code":0,"msg":"获取成功","data":{"result":[{"id":48,"name":"常娟","sex":2,"age":22,"birthday":"2013-04-13","address":"澳门特别行政区 澳门半岛 -","zip":"824395"},{"id":12,"name":"林艳","sex":1,"age":24,"birthday":"1971-03-30","address":"甘肃省 张掖市 民乐县","zip":"876983"},{"id":85,"name":"程伟","sex":2,"age":22,"birthday":"1981-05-03","address":"河南省 驻马店市 驿城区","zip":"114558"},{"id":37,"name":"郭明","sex":1,"age":21,"birthday":"1976-10-20","address":"安徽省 亳州市 涡阳县","zip":"847486"},{"id":72,"name":"任艳","sex":2,"age":20,"birthday":"1997-06-04","address":"香港特别行政区 九龙 油尖旺区","zip":"571517"},{"id":13,"name":"阎敏","sex":1,"age":22,"birthday":"1973-03-07","address":"湖北省 宜昌市 猇亭区","zip":"629129"},{"id":59,"name":"薛军","sex":2,"age":23,"birthday":"1974-05-19","address":"广东省 梅州市 其它区","zip":"863353"},{"id":27,"name":"秦秀兰","sex":2,"age":25,"birthday":"2004-03-03","address":"贵州省 黔西南布依族苗族自治州 安龙县","zip":"873473"},{"id":24,"name":"刘明","sex":1,"age":24,"birthday":"1991-01-08","address":"河南省 南阳市 唐河县","zip":"611782"},{"id":18,"name":"夏伟","sex":1,"age":20,"birthday":"1972-12-20","address":"陕西省 咸阳市 杨陵区","zip":"355353"},{"id":81,"name":"刘丽","sex":2,"age":24,"birthday":"1974-08-08","address":"湖南省 邵阳市 北塔区","zip":"328857"},{"id":96,"name":"汪洋","sex":1,"age":22,"birthday":"2002-01-25","address":"江西省 赣州市 龙南县","zip":"453842"},{"id":46,"name":"韩强","sex":2,"age":23,"birthday":"1990-07-29","address":"内蒙古自治区 乌兰察布市 察哈尔右翼中旗","zip":"852642"},{"id":26,"name":"余娟","sex":2,"age":22,"birthday":"1974-11-22","address":"湖南省 株洲市 石峰区","zip":"917854"},{"id":11,"name":"崔杰","sex":2,"age":23,"birthday":"1990-11-01","address":"澳门特别行政区 澳门半岛 -","zip":"228057"}],"page":null,"total":124}};
   
// this.table_data = da.data.result
// this.currentPage = da.page
// this.total = da.total


        // this.$fetch.api_table.list({
        //   page: this.currentPage,
        //   length: this.length
        // })
        //   .then(({data: {result, page, total}}) => {
        //     this.table_data = result
        //     this.currentPage = page
        //     this.total = total
        //     this.load_data = false
        //   })
        //   .catch(() => {
        //     this.load_data = false
        //   })
      },
      //单个删除
      delete_data(item){
        // this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // })
        //   .then(() => {
        //     this.load_data = true
        //     this.$fetch.api_table.del(item)
        //       .then(({msg}) => {
        //         this.get_table_data()
        //         this.$message.success(msg)
        //       })
        //       .catch(() => {
        //       })
        //   })
        //   .catch(() => {
        //   })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        // this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // })
        //   .then(() => {
        //     this.load_data = true
        //     this.$fetch.api_table.batch_del(this.batch_select)
        //       .then(({msg}) => {
        //         this.get_table_data()
        //         this.$message.success(msg)
        //       })
        //       .catch(() => {
        //       })
        //   })
        //   .catch(() => {
        //   })
      }
    }
  }
</script>
