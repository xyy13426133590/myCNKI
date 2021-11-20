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
         <div class="left-content" v-if="this.$route.params.itemCon">
          <p>{{$route.params.itemCon}}</p>
        </div>
         <div class="left-content"   v-else-if="$route.query.title">
          <p class="title">{{$route.query.title}}</p>
          <p>{{$route.query.item}}</p>
        </div>
      </div>

      <div class="right">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="el-tabs">
          <el-tab-pane label="法律" name="first">
            <div class="panel-content" v-if="this.$route.params.datas&&this.$route.params.datas.law">
              <div class="item" v-for="(item,index) in $route.params.datas.law" :key="'i-'+ index">
                <!-- 发布机关，发布时间 -->
                <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(iData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{iData}}</p>
                </div>
              </div>
            </div>
            <div class="panel-content" v-if="this.$route.query.data&&this.$route.query.data.law">
              <div class="item" v-for="(item,index) in $route.query.data.law" :key="'ii-'+ index">
                <!-- 发布机关，发布时间 -->
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(iData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{iData}}</p>
                </div>
              </div> 
            </div> 
          </el-tab-pane>
          <el-tab-pane label="行政法规" name="second">
            <div class="panel-content" v-if="this.$route.params.datas&&this.$route.params.datas.admin_rule">
              <div
                class="item"
                v-for="(item,index) in $route.params.datas.admin_rule"
                :key="'0-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(aData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{aData}}</p>
                </div>
              </div>
            </div>
            <div class="panel-content" v-if="this.$route.query.data&&this.$route.query.data.admin_rule">
              <div
                class="item"
                v-for="(item,index) in $route.query.data.admin_rule"
                :key="'0-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(aData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{aData}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="地方性法规" name="third">
             <div class="panel-content" v-if="this.$route.params.datas&&this.$route.params.datas.local_rule">
              <div
                class="item"
                v-for="(item,index) in $route.params.datas.local_rule"
                :key="'1-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(lData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{lData}}</p>
                </div>
              </div>
            </div>
            <div class="panel-content" v-if="this.$route.query.data&&this.$route.query.data.local_rule">
              <div
                class="item"
                v-for="(item,index) in $route.query.data.local_rule"
                :key="'1-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(lData,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{lData}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="部门规章及文件" name="fourth">
             <div class="panel-content" v-if="this.$route.params.datas&&this.$route.params.datas.depart_rule">
              <div
                class="item"
                v-for="(item,index) in $route.params.datas.depart_rule"
                :key="'1-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(dItem,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{dItem}}</p>
                </div>
              </div>
            </div>
            <div class="panel-content" v-if="this.$route.query.data&&this.$route.query.data.depart_rule">
              <div
                class="item"
                v-for="(item,index) in $route.query.data.depart_rule"
                :key="'1-'+ index"
              >
                 <p v-if="item[1]">【所属法规】<a  target="_blank"  :href="'http://192.168.4.112:8174/KCMS/detail/detail.aspx?dbcode=CLKL&dbname=CLKLLAST&filename=' + item[1]">{{item[0]}}</a></p>
                 <p v-else>【所属法规】{{item[0]}}</p>
                <p>【发布机关】<span style="color:red">{{item[2]}}</span></p>
                <p>【发布日期】<span>{{item[3]}}</span></p>
                <div v-for="(dItem,index) in item[4]" :key="'e-' + index">
                  <p>【条目全文】</p>
                  <p style="text-indent: 2em">{{dItem}}</p>
                </div>
              </div>
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
export default {
  data() {
    return {
      activeIndex: "1",
      isLawContentShow: true,
      isQueryResult: false,
      leftContent1: true,
      leftContent2: true,
      activeName: "first",
      query: {}
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
}

.left-content {
  padding: 10px 10px 0 20px;
}

.left-content .title {
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

.panel-content a {
  text-decoration: none;
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

