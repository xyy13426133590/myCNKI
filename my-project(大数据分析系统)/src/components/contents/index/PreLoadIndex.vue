<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="card-body">
        <div slot="header" class="clearfix tip_prc">
          <span>功能介绍:</span>
          <P>输入论文文本信息后,可进行载文量标引相关文本的预测</P>
        </div>
        <div class="clearfix content">
          <el-form :model="formData" :rules="rules" ref="formData">
<!--            <el-form-item label="文件名" prop="FILENAME">-->
<!--              <el-input  v-model="formData.FILENAME" placeholder="请输入文件名"></el-input>-->
<!--            </el-form-item>-->

            <el-form-item label="标题" prop="TITLE">
              <el-input  v-model="formData.TITLE" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="AUTHOR">
              <el-input  v-model="formData.AUTHOR" placeholder="请输入作者"></el-input>
            </el-form-item>

            <el-form-item label="关键词" prop="KEYWORD">
              <el-input  v-model="formData.KEYWORD" placeholder="请输入，多个关键词请以;;隔开"></el-input>
            </el-form-item>

            <el-form-item label="栏目" prop="DOCUCODE">
              <el-input  v-model="formData.DOCUCODE" placeholder="请输入栏目"></el-input>
            </el-form-item>

            <el-form-item label="中文摘要" prop="ABSTRACT">
              <el-input type="textarea" :rows="6" placeholder="请输入摘要" v-model="formData.ABSTRACT"></el-input>
            </el-form-item>

            <el-form-item label="引文" prop="REFERENCE">
              <el-input type="textarea" placeholder="请输入引文" v-model="formData.REFERENCE"></el-input>
            </el-form-item>

            <el-form-item label="基金" prop="FUND">
              <el-input  v-model="formData.FUND" placeholder="请输入基金"></el-input>
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
        :data="preLoadData"
        :header-cell-style="{background:'#eef1f6',color: '#554'}"
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="拼命加载中,请稍后..."
        element-loading-spinner="el-icon-loading"
        border
        striped
        tooltip-effect="dark">
        <el-table-column label="是否可被标引"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row | formatPred}}</span>
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
  import qs from 'qs'
  export default {
    inject:['reload'],
    data () {
      return {
        formData: {
          TITLE: '',
          KEYWORD: '',
          ABSTRACT: '',
          DOCUCODE: '',
          AUTHOR: '',
          REFERENCE: '',
          FUND: ''
        },
        FILENAME: '',
        loading: false,
        isShow: false,
        preLoadData: [],
        rules: {
          // title: [{
          //   required: true, message:'请输入标题', trigger: 'blur'
          // }],
          // keyword: [{
          //   required: true, message:'请输入关键字', trigger: 'blur'
          // }],
          ABSTRACT: [{
            required: true, message:'请输入论文摘要', trigger: 'blur'
          }],
          // docucode: [{
          //   required: true, message:'请输入栏目', trigger: 'blur'
          // }],
        },
      }
    },

    filters: {
      formatPred (row) {
        if(row == 1) {
          return 'YES';
        }else{
          return 'NO';
        }
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
            let dataList = {
              FILENAME: _this.FILENAME,
              TITLE: _this.formData.TITLE,
              AUTHOR: _this.formData.AUTHOR,
              KEYWORD: _this.formData.KEYWORD,
              ABSTRACT: _this.formData.ABSTRACT,
              DOCUCODE: _this.formData.DOCUCODE,
              REFERENCE: _this.formData.REFERENCE,
              FUND: _this.formData.FUND
            }
            console.log(dataList);
        axios.post('http://192.168.106.101:6161/api/new_result',qs.stringify(dataList)).then(res =>{
              _this.isShow = true;
              var jsonObj = res.data;
              var jsonStr =  eval('(' + jsonObj + ')');
              var strArr = [jsonStr.pred_class];
              _this.preLoadData = strArr;
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
