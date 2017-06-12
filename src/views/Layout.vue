<template>
  <div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <imp-header></imp-header>
    <side-menu :show="sidebar.opened && !sidebar.hidden"></side-menu>
    <div class="content-wrapper">
      <section class="content">
        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
          <router-view></router-view>
        </transition>
      </section>
      <!-- <imp-footer></imp-footer> -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import sideMenu from '../components/SideMenu.vue'
  import impHeader from '../components/Header.vue'
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  import * as types from "../store/mutation-types"
  import 'animate.css'

  export default {
    //name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      impHeader,
      sideMenu
    },
    computed: {
        ...mapGetters({
            sidebar: 'sidebar'
        })
    },
    methods: {
      ...mapMutations({
        toggleDevice: types.TOGGLE_DEVICE,
        toggleSidebar: types.TOGGLE_SIDEBAR
      }),
    },
    beforeMount () {
      const { body } = document
      const WIDTH = 784
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width < WIDTH
          this.toggleDevice(isMobile);
          this.toggleSidebar(!isMobile)
        }
      }
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler)
    }
  }
</script>