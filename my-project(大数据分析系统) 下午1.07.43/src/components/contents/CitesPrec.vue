<template>
  <div>
  <el-card class="box-card1">
    <div class="card-body">
      <div class="clearfix  right" @click="showEcharts">
<!--        <i class="el-iconkeshihuatubiao-"></i>-->
      </div>
      <div slot="header" class="clearfix tip_prc">
        <span>功能介绍:</span>
        <P>输入论文文本相关信息后，可进行新颖度计算、引用量预测等</P>
      </div>

      <div class="clearfix content">
        <el-button-group class="el-button-group">
          <el-button  class="button_text" :class="{active: shows==1}" @click="uploadFile()">直接上传</el-button>
          <el-button  class="button_text" :class="{active: shows==2}" @click="editFormFile()">手动编辑</el-button>
        </el-button-group>
        <el-form :model="formData" :rules="rules"  ref="formData">
          <el-form-item label="" prop="filename">
            <el-upload
              class="upload-file"
              drag
              action="http://192.168.52.222:6543/api/upload_file"
              :on-change="fileChange"
              :on-success="handleSuccess"
              :on-exceed="onExceed"
              :on-error="handleError"
              ref="newupload"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>

          <!--文本框内容输入以后，自动回显为严格论文格式-->
          <div class="text-results" v-show="isResultsShow">
            <h1>{{formData.title}}</h1>
            <h2>{{formData.author.replace(/;/g, " ")}}</h2>
            <h2>{{formData.institution.replace(/;/g, " ")}}</h2>
            <span><span id="abs">摘 要:</span> {{formData.abstract}}</span>
            <span style="color:#2f8bd6;"><span id="key">关键词:</span> {{formData.keywords.replace(/;/g, " ")}}</span>
            <span><span id="date">发表日期:</span> {{formData.pb_date}}</span>
            <span><span id="fund">是否基金支持:</span> {{formData.fund}}</span>
            <span><span id="fulltext">论文全文:</span> {{formData.fulltext}}</span>
            <span><span id="refer">参考文献:</span> {{formData.citation}}</span>
          </div>

          <!--提交按钮-->
          <el-form-item>
            <el-button type="success" @click="onSubmitForm">提交</el-button>
          </el-form-item>
        </el-form>

          <el-dialog
            title="表单输入"
            :visible.sync="dialogVisible"
            size="small"
            custom-class="dialogStyle"
            @close='closeDialog'
            width="40%">
          <el-form :model="formData" :rules="rules"  ref="formData">
            <el-form-item label="标题" prop="title" v-if="titleVisible">
              <el-input  v-model="formData.title" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="关键词" prop="keywords" v-if="keywordsVisible">
              <el-input  v-model="formData.keywords" placeholder="请输入，多个关键词请以;;隔开"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author" v-if="authorVisible">
              <el-input  v-model="formData.author" placeholder="请输入，多个作者名称请以;隔开"></el-input>
            </el-form-item>

            <el-form-item label="页码" prop="page_num" v-if="pageNumVisible">
              <el-input  v-model="formData.page_num" placeholder="请输入页码"></el-input>
            </el-form-item>

            <el-form-item label="机构" prop="institution" v-if="institutionVisible">
              <el-input  v-model="formData.institution" placeholder="请输入，多个机构名请以;隔开"></el-input>
            </el-form-item>

            <el-form-item label="发表日期" prop="pb_date" v-if="pb_dateVisible">
              <el-date-picker v-model="formData.pb_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="是否基金支持" prop="fund">
              <el-radio-group v-model="formData.fund">
                <el-radio v-for="item in fund" :label="item.label" :key="item.label">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="论文摘要" prop="abstract" v-if="abstractVisible">
              <el-input type="textarea" :rows="6" placeholder="" v-model="formData.abstract"></el-input>
            </el-form-item>

            <el-form-item label="论文全文" prop="fulltext" v-if="fulltextVisible">
              <el-input type="textarea" :rows="12" placeholder="" v-model="formData.fulltext"></el-input>
            </el-form-item>

            <el-form-item label="参考文献，一行一个，格式参考： [序号]主要责任者．文献题名[J]．刊名，出版年份，卷号(期号)：起止页码." prop="citation" v-if="citationVisible">
              <el-input type="textarea" :rows="12" placeholder="" v-model="formData.citation"></el-input>
            </el-form-item>
          </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="showitemsStyle()">确 定</el-button>
            </span>
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
        <el-tab-pane label="发表一年后引用量预测">
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
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total='predictData.length'>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="新颖度特征">
          <el-table
            :data="newData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            ref="multipleTable"
            border
            striped
            tooltip-effect="dark">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column prop="0" label="特征名称" align="center"></el-table-column>
            <el-table-column prop="1" label="值" align="center"></el-table-column>
            <el-table-column prop="2" label="特征描述" align="center"></el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total='newData.length'>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="论文文本特征">
          <el-table
            :data="thesisData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            ref="multipleTable"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            tooltip-effect="dark"
            resizable
            border
            striped>
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column prop="0" label="特征名称" align="center"></el-table-column>
            <el-table-column prop="1" label="值" align="center">
              <template slot-scope="scope">
                <span>{{scope.row[1]| formatValue}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="2" label="特征描述" align="center"></el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total='thesisData.length'>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="作者相关特征">
          <el-table
            :data="authorData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            ref="multipleTable"
            border
            striped
            tooltip-effect="dark">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column prop="0" label="特征名称" align="center"></el-table-column>
            <el-table-column prop="1" label="值" align="center"></el-table-column>
            <el-table-column prop="2" label="特征描述" align="center"></el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total='authorData.length'>
          </el-pagination>
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
      newData: [],
      thesisData: [],
      authorData: [],
      fileList: [],
      currentPage:1,
      pagesize: 10,
      isResultsShow: false,//提交结果页显示与否
      dialogVisible: false,
      titleVisible: true,
      keywordsVisible: true,
      pageNumVisible: true,
      authorVisible: true,
      institutionVisible: true,
      pb_dateVisible: true,
      abstractVisible: true,
      fulltextVisible: true,
      citationVisible: true,
      fund:[{label:"Y",name:'是'},{label:"N",name:'否'}],
      formData : {
        filename: null,
        title: '',
        keywords:'',
        page_num: '',
        author: '',
        institution: '',
        date: '',
        fund:'Y',
        abstract: '',
        fulltext: '',
        citation: ''
      },
      rules: {
        keywords: [{
          required: false, message:'关键词不能为空', trigger: 'blur'
         }
         //,{
        //   pattern: /^[a-zA-Z,]|[\\u4E00-\\u9FFF](;;[a-zA-Z,]|[\\u4E00-\\u9FFF]){0,}$/g, message: '请输入正确的格式', trigger: 'blur'
        // }
           ],
        author: [{
          required: false, message:'请输入作者', trigger: 'blur'
        },{
          pattern: /^[a-zA-Z,]|[\\u4E00-\\u9FFF](;[a-zA-Z,]|[\\u4E00-\\u9FFF]){0,}$/g, message: '请输入正确的格式', trigger: 'blur'
        }],
        page_num: [{
          required: false, message:'请输入页码', trigger: 'blur'
        }],
        institution: [{
          required: false, message:'请输入机构', trigger: 'blur'
        },{
          pattern: /^[a-zA-Z,]|[\\u4E00-\\u9FFF](;[a-zA-Z,]|[\\u4E00-\\u9FFF]){0,}$/g, message: '请输入正确的格式', trigger: 'blur'
        }],
        pb_date: [{
          required: false,  message:'请选择日期'
        }],
        fund: [{
          required: true,   trigger: 'change'
        }],
        abstract: [{
          required: false, message:'请输入论文摘要', trigger: 'blur'
        }],
        fulltext: [{
          required: false, message:'请输入论文全文', trigger: 'blur'
        }],
        citation: [{
          required: false, message:'请输入参考文献', trigger: 'blur'
        },{
          pattern: /\[\d+\][^\r\n]+/g, message: '文献格式不正确', trigger: 'blur'
        }],
      }
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

    uploadFile (){
      this.shows = 1;
      this.dialogVisible= false;
    },

    editFormFile (){
      this.dialogVisible = true;
      this.shows = 2;
      // if(!(this.formData.title) && !(this.formData.key_words) && !(this.formData.page_num) && !(this.formData.author) && !(this.formData.institution) && !(this.formData.date) && !(this.formData.abstract) && !(this.formData.fulltext) && !(this.formData.citation)) {
      //   _this.$message({
      //     type: 'warning',
      //     showClose: true,
      //     message: '提交失败，请确认信息是否填写完整!'
      //   })
      // }
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
      this.$refs.newupload.submit();
    },

    //文件超出个数限制的钩子
    onExceed(file){
      // this.fileList = [
      //   {
      //     name: file[0].name
      //   }
      // ]
    },

    handleSuccess(res, file) {

      //判断当返回的字段对应内容如果为空的话，让文本框隐藏
      if(!(res.title)){
         this.titleVisible = false;
      }
      if(!(res.keywords)){
        this.keywordsVisible = false;
      }
      // if(!(res.pageNum)){
      //   this.pageNumVisible = false;
      // }
      if(!(res.author)){
        this.authorVisible = false;
      }
      if(!(res.institution)){
        this.institutionVisible = false;
      }
      if(!(res.abstract)){
        this.abstractVisible = false;
      }
      if(!(res.fulltext)){
        this.fulltextVisible = false;
      }
      if(!(res.citation)){
        this.citationVisible = false;
      }
      if(!(res.pb_date)){
        this.pb_dateVisible = false;
      }
      this.formData.filename = res.filename;
      this.formData.title = res.title;
      this.formData.keywords = res.keywords;
     // this.formData.page_num = res.page_num;
      this.formData.author = res.author;
      this.formData.institution = res.institution;
      this.formData.abstract = res.abstract;
      this.formData.fulltext = res.fulltext;
      this.formData.citation = res.citation;
      this.formData.fund = res.fund;
      this.formData.pb_date = res.pb_date;

      //回显成功以后在这儿以论文文本的格式展示
      this.isResultsShow = true;
    },

    // 文件上传失败时的钩子
    handleError(error, file) {
      this.$notify.error({
        title: '错误',
        message:  `文件上传失败`
      });
    },

    //表单提交
    onSubmitForm () {
      var _this = this ;
      //添加请求拦截器
      axios.interceptors.request.use((config) =>{
        //在发送请求之前做点事
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
        this.loading = false;
        return response;
      },function (error) {
        console.log(error)
        //对响应错误做点什么
        return Promise.reject(error)
      });
        //无需进行论文文本上传，此刻需要将文本内容手动输入，以及一些文本框的验证
        _this.$refs.formData.validate((valid) => {
          if(valid) {
            _this.isResultsShow = true;
            let dataList = {
              filename: this.formData.filename,
              title: _this.formData.title,
              keywords: _this.formData.keywords,
              page_num: _this.formData.page_num,
              author: _this.formData.author,
              institution: _this.formData.institution,
              date: _this.formData.pb_date,
              fund: _this.formData.fund == 'Y' ? '是' : '否',
              abstract: _this.formData.abstract,
              fulltext: _this.formData.fulltext,
              citation: _this.formData.citation
            };

            axios.post('http://192.168.52.222:6543/api/citation_forecast',qs.stringify(dataList)).then((res) => {
                _this.isShow = true;
                console.log(res.data)
                //1.引用量
               var predict = res.data.predict_cited_frequency;
                var dataArr = [];
                for(var i=0;i<predict.length;i++){
                  dataArr.push({0:predict[i][0],1:predict[i][1]});
                }
                _this.predictData = dataArr;

                //2.新颖度
                var newDataArr = [];
                var newData = [];
                var title = res.data.title_novelty;
                var keywords = res.data.keywords_novelty;
                var seg =  res.data.abstract_novelty_seg;
                var merge =  res.data.abstract_novelty_merge;
                var front =  res.data.fulltext_novelty_front;
                var raer =  res.data.fulltext_novelty_raer;
                var citation_novelty_1 = res.data.citation_novelty_1;
                var citation_novelty_2 = res.data.citation_novelty_2;
                newDataArr.push(title,keywords,seg,merge,front,raer,citation_novelty_1,citation_novelty_2);
               for(var i=0;i<newDataArr.length;i++){
                 newData.push({0:newDataArr[i][0],1:newDataArr[i][1],2:newDataArr[i][2]})
               }
                _this.newData = newData;

                //3.文本本身相关特征
                var thesisDataArr = [];
                var thesisArr = [];
                var summarize = res.data.whether_summarize;
                var fund_supported = res.data.whether_fund_supported;
                var author_count = res.data.author_count;
                var keywords_count = res.data.keywords_count;
                var reference_count = res.data.reference_count;
                var reference_journals = res.data.proportion_of_reference_journals;
                var references_count = res.data.non_chinese_references_count;
                var paper_count = res.data.three_years_paper_count;
                var hository = res.data.hository_paper_count;
                thesisDataArr.push(summarize,fund_supported,author_count,keywords_count,reference_count,reference_journals,references_count,paper_count,hository);
                for(var i=0;i<thesisDataArr.length;i++){
                  console.log(thesisDataArr[i])
                  thesisArr.push({0:thesisDataArr[i][0],1:thesisDataArr[i][1],2:thesisDataArr[i][2]})
                }
                _this.thesisData = thesisArr;

                //4.作者相关特征
                var authorDataArr = [];
                var authorArr = [];
                var paper = res.data.author_paper_amount;
                var fund = res.data.author_fund_amount;
                var periodical_score = res.data.author_periodical_score;
                var download_count = res.data.author_high_download_count;
                var after1_cited_freq = res.data.author_after1_cited_freq;
                var after2_cited_freq = res.data.author_after2_cited_freq;
                var cited_paper_amount = res.data.author_cited_paper_amount;
                var after1_high = res.data.author_after1_high_cited_amount;
                var after2_high = res.data.author_after2_high_cited_amount;
                authorDataArr.push(paper,fund,periodical_score,download_count,after1_cited_freq,after2_cited_freq,cited_paper_amount,after1_high,after2_high);
                for(var i=0;i<authorDataArr.length;i++){
                  authorArr.push({0:authorDataArr[i].name,1:authorDataArr[i].val.join(','),2:authorDataArr[i].des})
                }
                _this.authorData = authorArr;
            }).catch(error => {
              console.log(error);
            })

          }else{
            _this.$message({
              type: 'warning',
              showClose: true,
              message: '提交失败，请确认信息是否填写完整!'
            })
          }
        })
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
