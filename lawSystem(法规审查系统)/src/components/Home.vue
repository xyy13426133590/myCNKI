<template>
  <div class="container">
    <!-- 头部开始 -->
    <div class="wrapper">
      <div class="logotop">
        <h1>法规审查系统</h1>
      </div>
    </div>

    <div class="hdbg">
      <div class="navbox">
        <div class="nav">
          <ul class="clearfix" id="nav"></ul>
        </div>
      </div>

      <h3 class="hdtxt fgtop01">
        系统法条
        <font>比对</font>辨析
        <font>上下位法</font>
      </h3>
      <div class="wrapper">
        <div class="fgtoptit">本库比对范围：法律法规库、政报公报库、个人对比库</div>
      </div>
    </div>
    <!-- 头部结束 -->

    <!-- 立法调研资料库内容 -->
    <div class="fanhui">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <font color="#42adff">法规审查</font>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content">
      <div class="mbbox">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">上传法规</el-menu-item>
          <el-menu-item index="2">查询结果</el-menu-item>
        </el-menu>

        <!-- 上传法规 -->
        <div data-kind="上传法规" class="data-kind" v-if="isLawContentShow">
          <div class="fl">
            <div class="fg_tmintit">条目上传</div>
            <div class="fg_tmin">
              <div class="fl_tit">条目内容</div>
              <el-form ref="form" :model="form" class="el-from-1">
                <el-form-item style="padding: 0  60px  0  110px;  ">
                  <el-input type="textarea" :rows="7" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0  0  0  110px">
                  <el-button
                    type="primary"
                    id="fg_button"
                    @click="submitSingle"
                    :loading="singleLoading"
                  >开始审查</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div class="fr">
            <div class="fg_tmintit">整篇上传</div>

            <div class="fg_tmin">
              <div class="fg_title">篇名</div>
              <el-form class="el-form-2">
                <el-form-item>
                  <el-upload
                    class="upload-file"
                    drag
                    action="http://192.168.52.210:6262/api/similarity"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="beforeUploadFile"
                    ref="newupload"
                    accept=".doc, .docx, .txt, .pdf"
                    :auto-upload="false"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                    <div
                      class="el-upload__tip"
                      slot="tip"
                      style="color:#999; font-size:14px"
                    >上传需对比的法规，格式为.doc, .docx, .txt或PDF</div>
                  </el-upload>
                </el-form-item>

                <el-form-item>
                  <el-button
                    size="small"
                    type="primary"
                    @click="openResult"
                    :loading="mutiLoading"
                    class="fg_button fg_button01"
                  >开始审查</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div class="clear"></div>
        </div>

        <!-- 查询结果 -->
        <div data-kind="查询结果" v-if="isQueryResult">
          <el-table
            :data="tableData"
            ref="mutiTable"
            height="295"
            style="width: 100%; margin: 20px auto;"
            :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
            border
            stripe
            @selection-change="handleSelectionChange"
            :row-key="getRowKeys"
            v-loading="listLoading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            element-loading-text="数据正在加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column type="selection" width="50" align="center"  :reserve-selection="true"></el-table-column>
            <el-table-column label="篇名" align="center">
              <template slot-scope="scope">
                <span style="color: #298cd8;font-size:18px">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上传时间" width="180" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style>{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="handleShow(scope.$index, scope.row)"
                  icon="el-icon-document"
                >预览</el-button>
                <el-button
                  type="warning"
                  @click.native.prevent="handleDelete(scope.$index, scope.row)"
                  icon="el-icon-delete"
                >删除</el-button>
                <el-button
                  @click="handleDownload(scope.$index,scope.row)"
                  icon="el-icon-document-checked"
                >选择报告单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            v-if="deleteFlag"
            @click="deleteMore()"
            type="danger"
            class="danger"
            icon="el-icon-delete"
          >批量删除</el-button>
          <!-- <el-pagination
            background
            v-show="tableData.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="pageSizes"
            :total='tableData.length'>
          </el-pagination>-->
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog
      title
      custom-class="iframeContent"
      :close-on-click-modal="false"
      :visible.sync="dialogIframeVisible"
    >
      <div v-html="content"></div>
    </el-dialog>

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
  inject: ["reload"],
  // props: {
  //   pageSizes: {
  //     type: Array,
  //     default(){
  //       return  [5,10,20]
  //     }
  //   }
  // },
  data() {
    return {
      activeIndex: "2",
      isLawContentShow: false,
      isQueryResult: true,
      deleteFlag: false,
      singleLoading: false,
      mutiLoading: false,
      showDoc: false,
      listLoading: false,
      dialogIframeVisible: false,
      url: "",
      form: {
        content: "",
      },
      tableData: [],
      multipleSelection: [],
      filenames: [],//批量删除filename
      content: "",
      currentPage: 1,
      pagesize: 5, //每页的数据条
      row: ''
    };
  },

  created() {
    //使用localStorage存储时，引用类型都需要JSON转换，基本类型不需要
    let tableArr = localStorage.getItem("dataList");
    console.log(tableArr);
    if (tableArr) {
      var newArr = [];
       var last = JSON.parse(tableArr);
       console.log(last);
      for (let i in last) {
        for (let item in last[i]) {
          let obj = {};
          obj.title = last[i][item].title;
          obj.time = last[i][item].time;
          obj.file_name = last[i][item].file_name;
          newArr.push(obj);
          console.log(newArr)
        }
      }
      this.tableData = newArr;
      localStorage.setItem("newArr", JSON.stringify(newArr))
      if (this.tableData.length === 0) {
        this.isQueryResult = false;
        this.isLawContentShow = true;
        this.activeIndex = "1";
        localStorage.removeItem("dataList");
      }else{
         this.tableData = newArr;
      }
    }
  },

  mounted() {
    if (this.tableData.length === 0) {
      this.isQueryResult = false;
      this.isLawContentShow = true;
      this.activeIndex = "1";
    }else{
      let newsData = JSON.parse(localStorage.getItem("newArr"));
      this.tableData = newsData;
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      if (key === "1") {
        this.isLawContentShow = true;
        this.isQueryResult = false;
      } else {
        this.isQueryResult = true;
        this.isLawContentShow = false;
        this.deleteFlag = false;

      }
    },

    //条目内容提交
    submitSingle() {
      let content = this.form.content;
      if (!content) {
        this.$message({
          showClose: true,
          message: "条目内容不能为空",
          type: "warning",
        });
        return;
      }
      let dataObject = {
        item: content,
      };
      this.singleLoading = true;
      axios
        .post("http://192.168.52.210:6262/api/similarity", dataObject)
        .then((res) => {
          if (res) {
            this.singleLoading = false;
            let config = JSON.parse(res.config.data).item;
            console.log(config);
            this.$router.push({
              name: "SingelQueryResult",
              params: {
                datas: res.data,
                itemCon: config,
              },
            });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // this.$message({
      //   showClose: true,
      //   message: "提交成功",
      //   type: "success",
      // });
    },

    //在线查看文档
    handleShow(index, row) {
      console.log(index, row);
      var url = "http://192.168.52.210:6262/api/preview";
      let name = {
        filename: row.file_name,
      };
      axios
        .post(url, name)
        .then((res) => {
          let item = res.data.content;
          this.content = item.replace(/\n/g, "<br/>");
          let newPage = this.$router.resolve({
            path: "/docShow",
            name: "DocShow",
            query: {
              content: this.content
            },
          });
          window.open(newPage.href, "_blank");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDelete(index, rows) {
      console.log(index, rows)
      let data = {
        filename: rows.file_name
      }
      console.log(data)
      axios
        .post("http://192.168.52.210:6262/api/delete", data)
        .then((res) => {
          if (res.status == 200) {
            let list = JSON.parse(localStorage.getItem("dataList"));
            for(let item in list){
              list[item].splice(index, 1);
            }
            localStorage.setItem("dataList", JSON.stringify(list));
            this.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDownload(index, row) {
      console.log(index, row);
      axios
        .get("http://192.168.52.210:6262/downloadfile", {
          params: {
            filename: row.file_name,
          },
          responseType: "blob",
        })
        .then((res) => {
          const content = res.data;
          const blob = new Blob([content]); //构造一个blob对象来处理数据
          const filename = row.file_name; //导出文件名
          console.log(filename)
          if ("download" in document.createElement("a")) {
            //支持a标签download的浏览器
            const link = document.createElement("a");
            link.download = filename;
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link); //释放标签
          } else {
            navigator.msSaveBlob(blob, filename);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      this.deleteFlag = true;
      if (
        this.multipleSelection.length === 0 ||
        this.multipleSelection.length === 1
      ) {
        this.deleteFlag = false;
      }
    },

    getRowKeys(row){
        return row.file_name
    },

    //批量删除
    deleteMore() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false, //禁止点击其他区域关闭弹出框
      })
        .then(() => {
       // let checkAll = this.multipleSelection; //选中项
        let allData = JSON.parse(localStorage.getItem("dataList"));
        this.multipleSelection.forEach(selectedItem =>{
           allData.forEach(item =>{//注意：这儿应该使用findIndex去查找，才能正确删除，使用find的时候删除会存在删除其他的bug问题
              item.splice(item.findIndex(j =>j.file_name === selectedItem.file_name),1)
              console.log(item);
        })
          this.filenames.push(selectedItem.file_name)
        })
          let param = {
            filename: this.filenames
          }
          axios
            .post("http://192.168.52.210:6262/api/delete_batch", param)
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem("dataList", JSON.stringify(allData));
                this.reload();
                this.$refs.mutiTable.clearSelection();
                this.multipleSelection = [];
              } else {
                this.$message.error("获取数据失败");
              }
            })
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //每页显示的条数
    handleSizeChange(val) {
      this.pagesize = val;
    },

    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log(file);
    },

    handleSuccess(res, file) {
      // console.log(res, file);
      this.getList(file, res); //得到表格列表数据
      this.$refs.newupload.clearFiles();
      //添加请求拦截器
      axios.interceptors.request.use(
        (config) => {
          //在发送请求之前做点事
          console.log(config);
          this.mutiLoading = true;
          return config;
        },
         error => {
          console.log(error);
          //对请求错误做点什么
          return Promise.reject(error);
        }
      );

      //添加相应拦截器
      axios.interceptors.response.use(
        (response) => {
          //对响应数据做点什么
          console.log(response);
          this.mutiLoading = false;
          return response;
        },
        function (error) {
          console.log(error);
          //对响应错误做点什么
          return Promise.reject(error);
        }
      );
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`,
      });

      window.localStorage.setItem("mutilQueryResult", JSON.stringify(res));
      this.$router.push({
        path: "/mutilQueryResult",
        query: {},
      });
    },

    getList(file) {
      let formData;
      if (file) {
        formData = new FormData(); //生成file: (binary) 这种格式
        formData.append("file", file.raw);
      }
      console.log(file);
      axios
        .post("http://192.168.52.210:6262/api/fulltext", formData)
        .then((res) => {
          this.listLoading = true;
          var data = res.data;
          //var tempList = JSON.parse(localStorage.getItem("dataList") || "[]"); //先取再存, 此种方式适合后台传过来的不是一个列表
          var tempList = [];
          this.tableData = data;
          tempList.push(this.tableData);
          localStorage.setItem("dataList", JSON.stringify(tempList));
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //跳转到查询对比结果页
    openResult() {
      this.$refs.newupload.submit();
    },

    // 文件上传失败时的钩子
    handleError(error, file) {
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`,
      });
    },
  },
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

.hdbg {
  width: 100%;
  height: 302px;
  background: #1183d6 url(../assets/images/headerbg.jpg) no-repeat center top;
}

.navbox {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #0b2e5d;
  background-color: rgba(40, 100, 200, 0.4);
}

.nav {
  width: 1200px;
  font-size: 16px;
  height: 45px;
  margin: 0px auto;
}
#nav {
  list-style-type: none;
  position: relative;
}
.nav ul {
  float: left;
  width: 900px;
  font-size: 16px;
  height: 45px;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

h3.hdtxt {
  width: 1200px;
  margin: 60px auto 0px;
  color: #fff;
  font-size: 25px;
  text-align: center;
}

.fgtop01 {
  padding-top: 20px;
}

h3.hdtxt font {
  font-size: 33px;
  padding-left: 10px;
  padding-right: 60px;
}

.fgtoptit {
  font-size: 16px;
  color: #dcf0ff;
  text-align: center;
  padding-right: 60px;
  padding-top: 10px;
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
  border: 1px #e5e5e5 solid;
  width: 1158px;
  padding: 0px 20px 0px 20px;
  margin: 0px auto 20px;
  background-color: #fff;
}

/* .mbbox {
  padding-bottom: 30px;
} */

.el-menu-item {
  padding: 0 50px;
  font-size: 18px;
  color: #434a51;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #1388d8;
}

.fl {
  float: left;
}
.fl_tit {
  position: absolute;
  margin-top: 60px;
  font-size: 16px;
  margin-left: 20px;
  height: 60px;
  line-height: 60px;
}

.data-kind {
  margin: 20px auto;
}

.fg_tmintit {
  width: 565px;
  height: 45px;
  line-height: 45px;
  background-color: #dcf0ff;
  text-align: center;
  color: #1388d8;
}

.fg_tmin {
  width: 545px;
  padding: 15px 0px 8px 20px;
  background-color: #f8f8f8;
}

.fg_title {
  position: absolute;
  margin-top: 30px;
  font-size: 16px;
  margin-left: 20px;
  height: 60px;
  line-height: 60px;
}

#fg_button {
  font-size: 16px;
  width: 385px;
  height: 35px;
  background-color: #298cd8;
  color: #fff;
  cursor: pointer;
  border-width: 0;
  margin-top: 15px;
}

.fg_button {
  font-size: 16px;
  width: 385px;
  height: 35px;
  background-color: #298cd8;
  color: #fff;
  cursor: pointer;
  border-width: 0;
}

.fr {
  float: right;
}

.el-form-2 {
  margin-left: 80px;
}

.fg_input01 {
  width: 280px;
}

.ll_button {
  text-align: center;
  font-size: 16px;
  width: 120px;
  height: 33px;
  background: url(../assets/images/zz_page_tj01.jpg) repeat-x 0px 0px;
  color: #298cd8;
  cursor: pointer;
  border-width: 0;
  border: 1px #298cd8 solid;
}

.clear {
  clear: both;
}

.el-button {
  padding: 10px 15px;
}

.el-icon-edit {
  font-size: 16px;
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

.danger {
  margin-bottom: 10px;
}
</style>

