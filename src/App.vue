<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <imp-header></imp-header>
    <side-menu></side-menu>
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
  import sideMenu from './components/SideMenu.vue'
  import impHeader from './components/Header.vue'
  import "font-awesome/css/font-awesome.css";
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      impHeader,
      sideMenu
    }
  }
</script>

<style>
  html {
    background-color: #f5f5f5;
    font-size: 14px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
  }

  body {
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .animated {
    animation-duration: .5s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 230px;
    z-index: 820;
    padding-top: 50px;
    min-height: 100%;
    z-index: 800;
  }
  @media (max-width: 800px) {
    .content-wrapper{
      margin-left: 0px;
    }
  }
  .content-wrapper .content {
    padding: 1.25rem;
  }
</style>
