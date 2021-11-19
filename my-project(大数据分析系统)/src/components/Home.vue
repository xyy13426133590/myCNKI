<template>
  <div class="home-container">
    <el-row class="container">
      <!--头部-->
      <el-col :span="24" class="header">
        <div class="tools" @click.prevent="collapseChange" :class="[rotate?'tools rArrow':'tools lArrow']" v-if="iconShow">
          <i class="el-iconcaidan"></i>
        </div>
        <el-col :span="10" class="logo">大数据分析部--演示系统</el-col>
        <el-col :span="10" class="right">
          <!-- 实现刷新 -->
          <div class="btn-refresh" @click="refresh">
            <el-tooltip effect="dark" content="刷新" placement="bottom">
              <i class="el-icon-refresh"></i>
            </el-tooltip>
          </div>
          <!-- 全屏显示 -->
          <div class="btn-fullscreen" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>
        </el-col>
      </el-col>

      <!--侧边栏-->
      <el-col :span="24" class="main">
        <el-aside>
        <!--导航菜单-->
          <el-menu :default-active="$route.path"
                   class="el-menu-vertical-demo"
                   background-color="#122a45"
                   text-color="#bfcbd9"
                   active-text-color="#fff"
                   @open="handleopen"
                   @close="handleclose"
                   @select="handleselect"
                   unique-opened router
                   :collapse="collapsed">
            <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title" style="font-size: 23px;"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item style="padding-left: 70px" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item  v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
        </el-aside>

        <section class="content-container" :class="{'content-collapse':collapsed}">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
             <!-- <span class="time">{{date|formatDate}}</span>-->
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view  v-if="isRouterAlive"></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  var padaDat = function (value){
      return value <10 ?'0' + value: value;
  }

  export default {

    //vue刷新当前页面的方式(不会出现空白)，使用provide/inject ，简单来说就是在父组件中通过provide提供变量，然后通过inject在子组件中注入变量
    provide (){
      return {
        reload: this.reload
      }
    },

    data() {
      return {
        collapsed: false,
        iconShow: true,
        rotate: false,
        screenWidth:'',
        isRouterAlive: true,
        fullscreen: false,
        date: new Date()
      }
    },
    //过滤时间函数
    filters : {
      formatDate: function(value) {
        var date = new Date();
        var year = date.getFullYear();
        var month =padaDat(date.getMonth() +1);
        var day = padaDat(date.getDate());
        var hours = padaDat(date.getHours());
        var minutes = padaDat(date.getMinutes());
        var seconds = padaDat(date.getSeconds());
        //返回格式化后的日期
        return year+'/'+month+'/'+day+'/'+hours+':'+minutes+':'+seconds;
      }
    },

    mounted () {
      this.screenWidth = document.body.clientWidth; //获取浏览器的宽度
      window.onresize = () => {//通过window.onresize监听浏览器窗口的变化
        return (() =>{
          this.screenWidth = document.body.clientWidth;
          if(this.screenWidth < 992){
            this.collapseChange();
          }
        })();
      };

      //时间定时器
      let _this = this;
      this.timer = setInterval(() =>{
        _this.date = new Date();
      },1000)

    },

    beforeDestroy () {
      if(this.timer) {
        clearInterval(this.timer);//在vue实例销毁前，清除定时器
      }
    },

    methods:{
      handleopen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleclose (key, keyPath) {
        console.log(key, keyPath);
      },

      handleselect () {

      },
      //折叠导航栏
      collapseChange:function(){
        this.rotate = !this.rotate;
        this.collapsed = !this.collapsed;
        console.log(this.rotate)
      },

      reload () {
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        })
      },
      //页面刷新
      refresh () {
       this.reload();
      },

      // 全屏事件
      handleFullScreen(){
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  }
</script>
<style scoped>
  * {
    margin:0;
    padding:0;
  }

  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #122a45;
    color: #fff;
  }
  .logo {
    height: 60px;
    font-size: 19px;
    padding-left: 0px;
    font-weight: 200;
  }

  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
  }

  .el-aside {
    flex: 0 0 260px;
    width: 260px;
    overflow: hidden;
  }

  .el-menu{
    height: 100%;
    font-size: 16px;
    font-weight: 200;
  }

.el-menu-item {
  font-size: 16px;
  color: #fff;
}

.el-menu-item:hover {
  background-color: #2a7eeb !important;
  color: #fff;
}

.el-menu-item.is-active {
  background-color: #2a7eeb !important;
  color: #fff;
}

.el-submenu__title {
  font-size: 16px;
}

.el-submenu__title:hover {
   color: #fff;
    background-color: #2a7eeb !important;
}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 260px;
  }

  .right {
    float:right;
    padding-right:50px;
    align-items: center;
  }

  .right, .btn-refresh{
    float:right;
    width: 30px;
    height: 30px;
    font-size: 24px;
    margin-right: 10px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .right>.btn-fullscreen {
    float: right;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    -webkit-transform: translate(25px, 0);
    transform: translate(25px,0);
}

  .tools {
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }

  .lArrow {
    transition: all .2s;
  }
  .rArrow {
    transform:rotate(-180deg);
    transition: all .2s;
  }

  .tools i {
    line-height: 60px;
  }

  .content-container {
    background: #f2f3f8;
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
    position: absolute;
    top:0px;
    right: 0;
    width: calc(100% - 300px);
    min-height: 100%;
    bottom: 0;
    transition: all .5s;
  }
  .content-container.content-collapse {
    width: auto;
    left: 64px;
  }

  @media screen and (max-width: 992px){
    .header,.logo {
      transition: all .5s;
      display: flex;
      width: 100% !important;
      text-align: left;
      justify-content: center;
    }
    .content-container.content-collapse {
      width: auto;
      left: 0px;
    }

  }

  .breadcrumb-container {
    margin-top: 15px;
    margin-left: 20px;
    margin-bottom: 15px;
  }
  .title {
    width: 200px;
    float: left;
    font-size:22px;
    color: #333;
  }

  .time {
    font-weight: 500;
    font-size:22px;
    float:right;
    margin-right:30px;
    margin-top: 5px;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

 .main  i {
    font-size: 22px;
    margin-right: 15px;
    width: 25px;
    margin-left:12px;
    text-align: center;
    vertical-align: middle;
    float: left;
  }

  /* element.style {
    padding-left: 20px;
    color: #fff;
    background-color: #2a7eeb !important;
} */
</style>

