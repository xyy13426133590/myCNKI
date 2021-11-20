<template>
  <div>
  <el-card class="box-card1">
    <div class="card-body">
      <div class="clearfix  right" @click="showEcharts">
<!--        <i class="el-iconkeshihuatubiao-"></i>-->
      </div>
      <div slot="header" class="clearfix tip_prc">
        <span>功能介绍:</span>
        <P>提交论文文本相关信息后，可进行文本质量检测等</P>
      </div>
      <div class="clearfix content">
        <el-form>
          <el-form-item>
            <el-breadcrumb separator="|">
              <el-breadcrumb-item>
                <el-button @click="upLoad()" type="primary">
                  <el-icon class="el-icon-plus"></el-icon> 文件上传
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-form-item>
        </el-form>

        <!--对话框-->
        <el-dialog
          title="文件上传"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form >
            <el-form-item>
              <el-upload
                class="upload-file"
                drag
                action="http://192.168.52.222:6543/api/upload_file"
                :on-change="fileChange"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUploadFile"
                ref="newupload"
                :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </div>
    </div>
  </el-card>
    <!--加载条-->
    <div class="loading-text"
         v-loading="loading"
         element-loading-text="运 算 中，请 稍 后...">
    </div>

    <!--表格区域-->
    <div class="result" v-if="isShow">
      <el-tabs type="border-card">
        <el-tab-pane label="检测结果">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="color:#000;font-size:16px">新颖度特征</span>(参考区间值[0.1-0.3]、[0.3-0.6]、[0.6-0.9]、[0.9-1.0]、[1])
            </div>
            <el-table
              :data="newData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :header-cell-style="{background:'#eef1f6',color: '#554'}"
              ref="multipleTable"
              border
              striped
              tooltip-effect="dark">
              <el-table-column label="#" type="index" align="center"></el-table-column>
              <el-table-column label="特征名称" align="center" prop="title" width="120px"></el-table-column>
              <el-table-column label="值" align="center" prop="value" width="80px"></el-table-column>
              <el-table-column label="正常参考值" align="center" prop="valueZone" width="120px"></el-table-column>
              <el-table-column label="特征描述" align="center" prop="pres"></el-table-column>
            </el-table>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="color:#000;font-size:16px">引用量预测</span>
            </div>
            <el-table
              :data="predictData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :header-cell-style="{background:'#eef1f6',color: '#554'}"
              ref="multipleTable"
              border
              striped
              tooltip-effect="dark">
              <el-table-column label="#" type="index" align="center"></el-table-column>
              <el-table-column prop="0" label="引用量" align="center"></el-table-column>
              <el-table-column prop="1" label="概率" align="center"></el-table-column>
            </el-table>
          </el-card>

        </el-tab-pane>
        <el-tab-pane label="结论">
          <p>总体概述：</p>
          【1】文章从属xx领域，领域内近5年累计发表论文数篇，一年后平均被引数次<br/>
          【2】文章标题新颖度属于高新颖度分类，文章研究领域较新颖，从属热门话题领域<br/>
          【3】摘要新颖度从属中新颖度分类，文章研究领域较为热门，提出了较为新颖的相关解题思路<br/>
          【4】关键词新颖度从属中新颖度分类，文章研究领域较为热门，提出了研究话题以及直接反馈出文章书否携带新内容观点<br/>
          【5】全文细节相关新颖度较低<br/>
          【6】文章一年后被引频次xxx<br/>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- footer区域   -->
    <el-footer>
      <div class="footer-fluid">
        Copyright ©2019 AuthorXuYunYun
      </div>
    </el-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
export default {
  inject:['reload'],
  data () {
    return {
      loading: false,
      visiblePrgress: false,
      shows: 1,
      isShow: false,
      predictData: [],
      newData: [
        {
          title: "标题新颖度",
          value: "0.72",
          valueZone: "0.6-0.0.9",
          pres: "标题由全文的重点关键词拼凑组成，可直观反馈文章从属领域是否前沿、热门等"
      },
        {
          title: "摘要新颖度",
          value: "0.55",
          valueZone: "0.3-0.6",
          pres: "摘要是全文大篇幅文字的缩影，由重点句子人工组织而成，是相对最为准确客观的评价文章新颖度的维度，摘要的新颖度可准确检测度量出文章采用了哪些新方法、解决了哪些新问题、做出来哪些创新等"
        },
        {
          title: "关键词新颖度",
          value: "0.35",
          valueZone: "0.3-0.6",
          pres: "关键词是将整个长篇幅文章用数个有限的词条做表征，关键词直接反映了文章研究领域、研究的话题以及解决问题的手段，关键词新颖度从宏观的角度衡量了文本是否大概率携带新内容，与全文新颖度计算相辅相成"
        },
        {
          title: "引文新颖度",
          value: "0.33",
          valueZone: "0.3-0.6",
          pres: "引文新颖度即参考文献新颖度，从侧面反馈作者作文时对领域动态掌握的实时性，引文新颖间接反映当前文章较大概率研究的是领域前沿话题或动态，大概率携带较多的新信息"
        },
        {
          title: "全文新颖度",
          value: "0.25",
          valueZone: "0.1-0.3",
          pres: "全文新颖度旨在发掘文章大段落文字内容中出现的新信息新句子等，全文新颖度从文字细节角度上衡量文章在同领域下囊括新信息新思路的多少"
        },
        ],
      fileList: [],
      currentPage:1,
      pagesize: 10,
      dialogVisible: false
      }
    },

  filters:{
    formatValue (row){
      if(row === false){
        return '否';
      }
      if(row !== false){
        return row;
      }
    }
  },

  methods : {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //打开弹出框
    upLoad(){
      this.dialogVisible = true;
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(files) {
      console.log(files)
    },

    //文件上传
    uploadFile() {
      this.$refs.newupload.submit();
    },


    //对话框左上角x事件监听
    closeDialog () {
      //this.$refs['formData'].resetFields();
    },

    showitemsStyle (){
      this.dialogVisible = false;
      this.isResultsShow = true;
    },

    showEcharts() {
     //this.isShowEchart = true;
      //this.isShowmyEchart = true;
      alert("点我")
    },

    fileChange () {
      //this.$refs.newupload.submit();
    },

    handleSuccess(res, file) {
      console.log(res,file);
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      if(extension !== 'txt') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传格式为.txt的文件`
        });
        return;
      }
      this.dialogVisible = false;
      this.$refs.newupload.clearFiles();
      //添加请求拦截器
      axios.interceptors.request.use((config) =>{
        //在发送请求之前做点事
        console.log(config)
        this.loading = true;
        return config;
      },function (error) {
        console.log(error)
        //对请求错误做点什么
        return Promise.reject(error)
      });

      //添加相应拦截器
      axios.interceptors.response.use((response) =>{
        //对响应数据做点什么
        console.log(response)
        this.loading = false;
        return response;
      },function (error) {
        console.log(error)
        //对响应错误做点什么
        return Promise.reject(error)
      });
      let dataList = {
        filename: res.filename,
        title: res.title,
        keywords: res.keywords,
        author: res.author,
        institution: res.institution,
        date: res.pb_date,
        fund: res.fund == 'Y' ? '是' : '否',
        abstract: res.abstract,
        fulltext: res.fulltext,
        citation: res.citation
      };

      axios.post('http://192.168.52.222:6543/api/citation_forecast',qs.stringify(dataList)).then((res) => {
        this.isShow = true;
        this.$notify.success({
          title: '成功',
          message: `文件上传成功`
        });

        console.log(res.data)
        //1.引用量
        var predict = res.data.predict_cited_frequency;
        var dataArr = [];
        for(var i=0;i<predict.length;i++){
          dataArr.push({0:predict[i][0],1:predict[i][1]});
        }
        this.predictData = dataArr;
      }).catch(error => {
        console.log(error);
      })


    },

    // 文件上传失败时的钩子
    handleError(error, file) {
      this.$notify.error({
        title: '错误',
        message:  `文件上传失败`
      });
    },

  },

}
</script>


<style scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .content {
    padding: 15px 10px;
  }
  .tip_prc {
    margin-bottom: 0;
    padding: 15px 10px;
  }

  span {
    font-size: 14px;
  }

  .right {
    float: right;
    cursor: pointer;
  }

  .right>i {
    font-size: 35px;
  }

  .echart {
    float:right;
    height:600px;
    width:600px;
    border: 1px solid #ccc;
    background-color: #f2f3f8;
    box-shadow:0px 1px 15px 1px rgba(69, 65, 78, 0.08) ;
    z-index: 9999;
    margin-top: 60px;
    margin-right: -55px;
  }

  .echart>i {
    float: right;
    font-size: 25px;
  }
  .echart:active {

  }

  .comment {
    line-height: 40px;
  }

  .box-card1 {
    font-family: 'nunito', sans-serif;
    width: 100%;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    border: 1px solid #eee;
  }

  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: .7rem;
  }

  .loading-text {
    display: block;
    background: #f2f3f8;
    margin-left: 0px;
    height: 60px;
    width: 100%;
  }
  .el-button--success {
    color: #FFFFFF;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  .el-button--success:hover, .el-button--success:focus {
    background: #00BFFF;
    border-color: #00BFFF;
    color: #FFFFFF; }

  .clear {
    width:100%;
    height:20px;
    margin-top: 20px;
    /*background-color: #324057;*/
  }

  .progress-wrapper {
    position: relative;
    height: 50px;
    border-radius: 5px;
    background-color: lightgrey;
  }
  .progress-wrapper .progress-progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0%;
    border-radius: 5px;
    background-color: darkturquoise;
    z-index: 1;
  }
  .progress-wrapper .progress-rate {
    position: relative;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    height: 100%;
    z-index:2;
  }

  .result {
    /*display: flex;*/
    position:relative;
    background: #f2f3f8;
    border-radius: 0px;
    margin-bottom: 0px;
    -webkit-box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    -moz-box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  }

  .el-footer {
    border-top: 1px solid #eee;
    padding: 15px;
    background: #f2f3f8;
  }

  .el-footer .footer-fluid {
    display: flex;
    align-items: center;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .text-results {
    width:100%;
    height:auto;
    display: -webkit-flex;
    display: flex;
    vertical-align: middle;
    align-items: center;
    flex-direction: column;
    text-indent: 2rem;
    border-top: 1px dashed #2f8bd6;
  }


  .text-results h1 {
    font-weight: normal;
    line-height: 38px;
    font-size: 22px;
    margin: 30px auto 0;
  }

  .text-results h2 {
    font-weight: normal;
    line-height: 24px;
    color: #2f8bd6;
    font-size: 14px;
    margin:0 2px;
  }

  .text-results span {
    font: 16px/150% Arial,"微软雅黑","Microsoft YaHei",serif;
    color: #333;
    margin-top: 10px;
    margin-bottom: 10px;
    clear: both;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: .8px;
    text-align: justify;
    text-align: left\9;
    word-break: break-all;
    border-bottom: 1px dashed #2f8bd6;
  }

  .text-results span #abs,#key,#date,#fund,#fulltext,#refer {
    font-weight: bold;
    text-align: right;
    line-height: 30px;
    white-space: nowrap;
    letter-spacing: .2rem;
    font-family: 'Times New Roman';
    border-bottom: none;
  }

  /*.el-dialog__wrapper .el-dialog {*/
  /*  overflow: auto;*/
  /*  height: 50%;*/
  /*}*/

  .active {
    color: #2f8bd6;
    border-bottom: 2px solid #2f8bd6;
  }

  .button_text {
    border: none;
    font-size: 18px;
    padding-left: 5px;
    font-weight: bold;
  }

  .el-button-group {
    margin-bottom: 10px;
  }

</style>
