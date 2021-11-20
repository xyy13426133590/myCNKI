<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="card-body">
        <div slot="header" class="clearfix tip_prc">
          <span>功能介绍:</span>
          <P>输入论文文本信息后,可进行相关文本的预测</P>
        </div>
        <div class="clearfix content">
          <el-form :model="formData" :rules="rules" ref="formData">
              <el-form-item label="标题" prop="title">
                <el-input  v-model="formData.title" placeholder="请输入"></el-input>
              </el-form-item>

               <!-- <el-form-item label="中文刊名" prop="chinese_journal_name">
                <el-input  v-model="formData.chinese_journal_name" placeholder="请输入"></el-input>
              </el-form-item> -->

              <el-form-item label="关键词" prop="key_words">
                <el-input  v-model="formData.key_words" placeholder="请输入，多个关键词请以;隔开"></el-input>
              </el-form-item>

              <el-form-item label="论文摘要" prop="abstract">
                <el-input type="textarea" :rows="6" placeholder="" v-model="formData.abstract"></el-input>
              </el-form-item>

              <el-form-item label="论文全文" prop="fulltext">
                <el-input type="textarea" :rows="12" placeholder="" v-model="formData.fulltext"></el-input>
              </el-form-item>

            <!--提交按钮-->
            <el-form-item>
              <el-button type="success" @click="handleSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>

    <!--动态加载表格数据-->
    <div id="result" v-if="isShow">
          <el-table
            :data="simpleData"
            :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
            border
            striped
            ref="multipleTable"
            v-loading="loading"
            element-loading-text="拼命加载中,请稍后..."
            element-loading-spinner="el-icon-loading">
            <template slot="empty">
              <div style="height:92px;line-height:92px;">暂无数据</div>
             </template>  
            <el-table-column label="中图分类号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.pred_classes}}</span>
              </template>
            </el-table-column>
             <el-table-column label="专题代码" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.pred_topics}}</span>
              </template>
            </el-table-column>
        </el-table>
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
  export default {
    inject:['reload'],
    data () {
      return {
        formData: {
          title: '',
          //chinese_journal_name: '',
          key_words: '',
          abstract: '',
          fulltext: ''
        },
        loading: false,
        isShow: false,
        simpleData: [],
        rules: {
          title: [{
            required: true, message:'请输入标题', trigger: 'blur'
          }],
          // chinese_journal_name: [{
          //   required: true, message: '请输入中文刊号', trigger: 'blur'
          // }],
          key_words: [{
            required: false, message:'请输入关键字', trigger: 'blur'
          }],
          abstract: [{
            required: true, message:'请输入论文摘要', trigger: 'blur'
          }],
          fulltext: [{
            required: false, message:'请输入论文全文', trigger: 'blur'
          }],
        },
      }
    },

    methods: {
      //表单提交
      handleSubmit () {
        var _this = this;
        //添加请求拦截器
        axios.interceptors.request.use((config) =>{
          //在发送请求之前做点事
          _this.loading = true;
          return config;
        },function (error) {
          console.log(error)
          //对请求错误做点什么
          return Promise.reject(error)
        });

        //添加相应拦截器
        axios.interceptors.response.use((response) =>{
          //对响应数据做点什么
          _this.loading = false;
          return response;
        },function (error) {
          console.log(error)
          //对响应错误做点什么
          return Promise.reject(error)
        });

        _this.$refs.formData.validate((valid) =>{
          if(valid){
            let data = {
              title: _this.formData.title,
              //chinese_journal_name: _this.formData.chinese_journal_name,
              key_words: _this.formData.key_words,
              abstract: _this.formData.abstract,
              fulltext: _this.formData.fulltext
            }
            if(data.abstract.length <20 &&data.abstract.length !==0 &&data.fulltext.length <20 && data.fulltext.length !==0){
                _this.$alert('数据输入有问题！！！', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })

              }
            //http://192.168.105.159:6161/api/journal_classification
            axios.post('http://192.168.52.100:6161/api/journal_classification', data).then(res =>{
              console.log(res)
              _this.isShow = true;
              let arr = [];
              let pred_classes = res.data.pred_classes;
              let pred_topics = res.data.pred_topics;
              arr.push({pred_classes, pred_topics})
              _this.simpleData = arr;
              //_this.simpleData = dataStr.split();
              console.log(_this.simpleData)
            }).catch(() =>{
              _this.$message({
                type: 'warning',
                showClose: true,
                message: '数据请求失败!'
              })
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

    }
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

  .wrapper {
    width:100%;
    height:100%;
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

  .box-card {
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

  .btn-action {
    padding: 15px;
    background-color: transparent;
    line-height: 15px;
    border-top: 1px solid #ebedf2 !important;
    font-size: 14px;
  }

  .el-button--success {
    color: #FFFFFF;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }

  .el-button--success:hover, .el-button--success:focus {
    background: #00BFFF;
    border-color: #00BFFF;
    color: #FFFFFF;
  }

  #result {
    position:relative;
    margin-top: 30px;
    border-top: 2px solid #2181d0;
    border-radius: 0px;
    background: #f2f3f8;
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


</style>
