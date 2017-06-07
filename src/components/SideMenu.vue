<template>
  <aside class="main-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
    <div class="sidebar">
      <el-menu :default-active="onRoutes"
               :default-openeds="onRouteKeys"
               class="el-menu-vertical-demo"
               theme="dark" router>
        <template v-for="item in menuList">
          <sub-menu :param="item"></sub-menu>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
  import subMenu from "./SubMenu.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'


  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        menuList:[]
      }
    },
    components: {
      subMenu
    },
    computed: {
      onRoutes(){
        return this.$route.path;
      },
      onRouteKeys(){
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (let k = 0, length = ms.length; k < length; k++) {
              if (path == ms[k].href) {
                kas.push(ms[k].href);
                break;
              }
              let i = kas.length;
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas);
              }
              if (i < kas.length) {
                kas.push(ms[k].href);
              }
            }
          }
          return kas.reverse();
        }
        console.log(this.$route.path);
        //console.log(this.menuList);
        return getParentArray(this.$route.path, this.menuList);
      },
      // 使用对象展开运算符将 getters 混入 computed 对象中
      //...mapGetters(['menuList'])
    },

    // mounted:模板编译之后,代替之前ready
    mounted () {
      this.fetchMenuList();
      let route = this.$route
//      console.log(route)
//      if (route.name) {
//        this.shouldExpandMatchItem(route)
//      }
    },

    // created:实例已经创建完成,属性已经绑定
    created: function () {
      //this.loadMenuList();
    },

    // methods: {
    //   ...mapActions({
    //     load: 'loadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
    //   })
    // }
    
    // methods: mapActions({
    //     loadMenuList: 'loadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
    // })
    
    methods:{
      fetchMenuList(){
        alert(1);
        var _this = this;
        this.$http.get('src/data/menuList.json').then(function(res){
          _this.menuList = res.data;
        }).catch(function(err){
          console.log(err);
        });
      }
    }
  }
</script>
<style>
  @media (max-width: 800px) {
  .main-sidebar {
      transform: translate3d(-230px, 0, 0);
    }
  }

  .slideInLeft {
    animation-duration: .377s;
    animation-name: slideInLeft;
  }

  .slideOutLeft {
    animation-duration: .377s;
    animation-name: slideOutLeft;
  }

  .main-sidebar {
    background-color: #324157;
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    min-height: 100%;
    width: 230px;
    z-index: 810;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .el-menu-vertical-demo .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-vertical-demo .el-menu-item, .el-menu-vertical-demo .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }
</style>
