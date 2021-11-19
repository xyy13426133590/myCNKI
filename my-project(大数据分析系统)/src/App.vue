<template>
  <div id="app">
<!--    <transition name="fade" mode="out-in">-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
<!--   </transition>-->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
          background-size: cover;*/
    /*background: #1F2D3D;*/
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .el-drawer{
   background-color: #030e2c;
  }
  :focus {
        outline: 0;
      }
.el-drawer__header>:first-child {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 20px;
    color: #fff;
}

.el-popover{
  opacity: 0.8;
   border: 2px solid  #20a0ff;
   border-radius: 5px;
   padding: 0;
   box-shadow: 5px 5px 10spx #eee;
}

.el-autocomplete {
  padding: 0;
  width: 100%;
}


.fishBone .wrapper .bd .tempWrap {
  width: 100% !important;
}

.fishBone .wrapper .tempWrap ul li {
  /* width: 250px !important; */
}

.fishBone .item {
  margin-left: 0px !important;
}


.fishBone {
    overflow-y: hidden;
}

/* 对话框 x的样式显示 */
.el-dialog__headerbtn {
    z-index: 1;
}

.el-submenu__title:hover {
   color: #fff;
    background-color: #2a7eeb !important;
}

/* 个性化推荐  新颖度图表 使用自定义类名设置el-dialog样式 */
.customStyle{
   overflow: hidden !important;
   background-color:#0d405A
}

/* 引用量预测   自定义类名 设置el-dialog样式 */
.dialogStyle {
  height: 60% !important;
}

</style>
