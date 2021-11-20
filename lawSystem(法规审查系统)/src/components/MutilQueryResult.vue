<template>
  <div class="container">
    <!-- 头部开始 -->
    <div class="wrapper">
      <div class="logotop">
        <h1>人大法规审查系统</h1>
      </div>
    </div>

    <!-- 头部结束 -->

    <!-- 立法调研资料库内容 -->
    <div class="fanhui">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>法规审查</el-breadcrumb-item>
        <el-breadcrumb-item>
          <font color="#42adff">查询对比结果</font>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content">
      <div class="left">
        <div id="label">上传的草案</div>
        <div class="left-content">
          <p
            class="Ttitle"
            v-if="query&& query.title"
          >{{query.title}}</p>
          <div
            @click="routeToSim(item,query.title,index)"
            class="clicked_content"
            :class="{active: index === mark}"
            v-if="query&&query.item_list"
            v-for="(item,index) in query.item_list"
            :key="index"
          >
            <p>{{item}}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="el-tabs">
          <el-tab-pane label="法律" name="first">
            <div class="panel-content">
              <p
                v-for="(item,index) in query.law"
                :key="'l-' + index"
              >{{index+1}}. {{item}}</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="行政法规" name="second">
            <div class="panel-content">
              <p
                v-for="(item,index) in query.admin_rule"
                :key="'a-' + index"
              >{{index+1}}. {{item}}</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="地方性法规" name="third">
            <div class="panel-content">
              <p
                v-for="(item,index) in query.local_rule"
                :key="'lo-' + index"
              >{{index+1}}. {{item}}</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="部门规章及文件" name="fourth">
            <div class="panel-content">
              <p
                v-for="(item,index) in query.depart_rule"
                :key="'d-' + index"
              >{{index+1}}. {{item}}</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="获取更多" name="five">
            <div class="panel-radio">
              <el-radio
                v-model="radio"
                :label="index"
                :key="index"
                @change="selectOne(index)"
                v-for="(item,index) in radioData"
              >{{item.name}}</el-radio>
            </div>
            <div class="panel-content">
              <p v-if="this.radio == 0">暂无数据</p>
              <p
                v-else-if="this.radio == 1"
                v-for="(item,index) in query.industry_regulations"
                :key="'i-' + index"
              >{{index+1}}. {{item}}</p>
              <p v-else-if="this.radio == 2">暂无数据</p>
              <p
                v-else-if="this.radio == 3"
                v-for="(item,index) in query.group_regulations"
                :key="'g-' + index"
              >{{index+1}}. {{item}}</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <span>
        中国知网
        <a
          href="https://www.cnzz.com/stat/website.php?web_id=4769965"
          target="_blank"
          title="站长统计"
        >
          <img border="0" hspace="0" vspace="0" src="http://icon.cnzz.com/img/pic.gif" />
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data"],
  name: "MutilQueryResult",
  data() {
    return {
      activeIndex: "1",
      isLawContentShow: true,
      isQueryResult: false,
      activeName: "first",
      radio: 0,
      title: "",
      item_list: "",
      query: {},
      mark: 0,
      loading: false,
      radioData: [
        { name: "司法解释" },
        { name: "行业规定" },
        { name: "国际公约等" },
        { name: "团体规定" }
      ]
    };
  },
  created(){
    console.log("created")
    var item = localStorage.getItem("mutilQueryResult")
    if (item) {
      this.query = JSON.parse(item);
    }
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      console.log(tab.index);
      if (tab.index == "4") {
        this.isMoreShow = true;
      }
    },

    routeToSim(item, _title, index) {
      if (this.mark = index) {
        var loading = this.$loading({
          lock: true,
          text: "正在加载数据...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector(".active")
        });
      }
      let dataObj = {
        item: item,
        title: _title
      };

      //添加请求拦截器
      axios.interceptors.request.use(
        config => {
          //在发送请求之前做点事
          console.log(config);
          return config;
        },
        function(error) {
          console.log(error);
          //对请求错误做点什么
          return Promise.reject(error);
        }
      );

      //添加响应拦截器
      axios.interceptors.response.use(
        response => {
          //对响应数据做点什么
          console.log(response);
          return response;
        },
        //function(error) {
        ((error) =>{
        //console.log(error.response.status);
          //var that = this;
           loading.close();
          if(error&&error.response&&error.response.status){
            switch(error.response.status){
              case 500:
                console.log(500)
                this.$message({
                  type:'warning',
                  showClose: true,
                  message: '暂无更多数据'
                })
                break
              case 404:
                this.$message({
                  type:'warning',
                  showClose: true,
                  message: '页面未找到'
                })
                break
                default:
                  break
            }
          }
          //对响应错误做点什么
          return Promise.reject(error);
        }
      ));

      var url = "http://192.168.52.210:6262/api/similarity";
      axios
        .post(url, dataObj)
        .then(res => {
          console.log(res)
          this.$router.push({
            mode: "history",
            path: "/singelQueryResult",
            query: {
              item: item,
              title: _title,
              data: res.data
            }
          });
          loading.close();
        })
        .catch(err => {
          console.log(err);
        });
    },

    selectOne(index) {
      console.log(index);
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 1200px;
  margin: 0px auto;
}

.logotop {
  width: 800px;
  height: 95px;
  margin-top: 8px;
  margin-bottom: 8px;
  background: url(../assets/images/logo.jpg) no-repeat 0px 8px;
}

.logotop h1 {
  color: #0a74cf;
  font-size: 33px;
  padding-left: 230px;
  line-height: 93px;
}

.fanhui {
  width: 1200px;
  margin: 0px auto;
  height: 60px;
  line-height: 60px;
}

.el-breadcrumb {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}

.content {
  display: flex;
  width: 1200px;
  border: 1px #e5e5e5 solid;
  margin: 0px auto 20px;
  height: 70vh;
}

.left {
  width: 50%;
  border-width: 0;
  border-right: 1px solid #ccc;
  overflow: auto;
}

.active {
  color: #333;
}

#label {
  border-width: 0px;
  border-width: 0px;
  width: 104px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
}

.left-content {
  padding: 10px 10px 0 20px;
}

.left-content .Ttitle {
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  font-weight: bold;
}

.left-content p {
  font-size: 16px;
  margin: 20px 0;
  text-indent: 2em;
}

.clicked_content {
  cursor: pointer;
}

.right {
  flex: 1;
  border-width: 0;
  overflow: auto;
}

.panel-content {
  padding: 10px 10px 0 15px;
}
.panel-content p {
  color: #333333;
  padding: 5px 0;
}

.panel-radio {
  height: 30px;
  margin: 0 auto;
  padding: 0 80px;
  border-bottom: 1px solid #eee;
}

.panel-radio .el-radio {
  margin-right: 15px;
}
.footer {
  width: 100%;
  background-color: #d1eaff;
  text-align: center;
  height: 45px;
  line-height: 45px;
}
.footer span {
  display: block;
  width: 1000px;
  margin: 0px auto;
}
</style>

