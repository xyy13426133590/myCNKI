<template>
  <div class="wrapper">
  <el-card class="box-card">
    <div class="card-body">
      <div slot="header" class="clearfix tip_prc">
        <span>功能介绍:</span>
        <P>输入案情描述后，将进行罪名预测，相关法条预测和刑期预测</P>
      </div>
      <div class="clearfix content">
        <span class="comment">请输入案情描述</span>
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="fact">
        </el-input>
      </div>
    </div>
    <!--提交按钮-->
    <div class="btn-action">
      <el-button type="success" @click="handleSubmit">提交</el-button>
    </div>

  </el-card>
    <!--加载条-->
    <div class="loading-text"
         v-loading="loading"
         element-loading-text="运 算 中，请 稍 后...">
    </div>

    <!--动态加载表格数据-->
    <div id="result" v-if="isShow">
      <el-tabs type="border-card">
        <el-tab-pane label="罪名预测">
          <el-table
            :data="crimeData"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            border
            :row-style="rowStyle"
            width="100%">
            <el-table-column label="#" align="center" width="62px" type="index">
            </el-table-column>
            <el-table-column align="center" label="罪名" prop="1"></el-table-column>
            <el-table-column align="center" label="概率" prop="2"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="相关法条法规">
          <el-table
            :data="relatData"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            border
            width="100%">
            <el-table-column label="#" width="62px" type="index" align="center">
            </el-table-column>
            <el-table-column align="center" label="法条" prop="1" width="80px"></el-table-column>
            <el-table-column align="center" label="详细描述" prop="2"></el-table-column>
            <el-table-column align="center" label="概率" prop="3" width="100px"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="刑期预测">
          <el-table
            :data="primeData"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            border
            width="100%">
            <el-table-column label="#" width="62px" type="index" align="center">
            </el-table-column>
            <el-table-column align="center" label="刑期">
              <template slot-scope="scope">
                <span>{{scope.row}}</span>
              </template>
            </el-table-column>
          </el-table>
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
  export default {
    inject:['reload'],
    data () {
      return {
        fact:'',
        loading: false,
        isShow: false,
        currentPage:1,
        pagesize: 5,
        crimeData: [],
        relatData: [],
        primeData: []
      }
    },

    methods: {

      rowStyle (row,rowIndex) {
        if(rowIndex === 0) {
          return 'cursor: pointer'
        }else{
          return 'cursor: pointer'
        }
      },

      //表单提交
      handleSubmit () {
        var _this = this;
        _this.fac = _this.fact;
        console.log(_this.fact);
        if (!(_this.fac)) {
          _this.$message({
            type: 'warning',
            showClose: true,
            message: '输入内容不能为空!'
          })
          return;
        }

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

        //添加响应拦截器
        axios.interceptors.response.use((response) =>{
          //对响应数据做点什么
          this.loading = false;
          return response;
        },function (error) {
          console.log(error)
          //对响应错误做点什么
          return Promise.reject(error)
        });

         let data = {
          fact: _this.fac
         }
          var url = 'http://recom.cnki.net/api/law/charge';
          axios.post(url,data).then((res) => {
              _this.isShow = true;
              _this.crimeData = res.data.accusation;
              _this.relatData = res.data.articles;
              _this.primeData = [res.data.imprisonment[0]];
              console.log(_this.primeData)
          }).catch(() => {
            _this.$message({
              type: 'error',
              showClose: true,
              message: '请求错误!'
            })
          })
      }
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
  .comment {
   line-height: 40px;
  }
  .box-card {
    font-family: 'nunito', sans-serif;
    width: 100%;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    border: 1px solid #eee;
  }

  el-input {
    display: block;
    width: 100%;
    overflow: auto;
    resize: vertical;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
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

  .btn-action {
    padding: 15px;
    background-color: transparent;
    line-height: 15px;
    border-top: 1px solid #ebedf2 !important;
    font-size: 14px;
  }

  .loading-text {
    display: block;
    margin-left: 0px;
    background: #f2f3f8;
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

 #result span{
   margin: 0;
   color: #575962;
   font-size: 18px;
   font-weight: 600;
   line-height: 1.6;
 }

  #result .table1,.table2{
   margin-bottom:30px;
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
