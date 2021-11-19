<template>
  <div>
  <el-card class="box-card">
    <div class="card-body">
      <div slot="header" class="clearfix tip_prc">
        <span>功能介绍:</span>
        <P>输入单条法规后，将会找出和它相似的若干法规</P>
      </div>
      <div class="clearfix content">
        <span class="comment">请输入单条法规文本</span>
        <el-input type="textarea" :rows="6" placeholder="" v-model="statute">
        </el-input>
      </div>
    </div>
    <!--提交按钮-->
    <div class="btn-action">
      <el-button type="success" @click.native.prevent="handleSubmit">提交</el-button>
    </div>
  </el-card>
  <!--加载条-->
  <div class="loading-text"
       v-loading="loading"
       element-loading-text="运 算 中，请 稍 后...">
  </div>

    <!--表格区域-->
    <div class="simrules_result" v-if="isShow">
      <el-tabs type="border-card">
        <el-tab-pane label="法律">
          <el-table
            :data="lawData"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            ref="multipleTable"
            tooltip-effect="dark">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column prop="0" label="所属法规"></el-table-column>
            <el-table-column prop="1" label="条目全文"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="行政法规">
          <el-table
            :data="adminData"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            ref="multipleTable"
            tooltip-effect="dark">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column prop="0" label="所属法规"></el-table-column>
            <el-table-column prop="1" label="条目全文"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="地方性法规">
          <el-table
            :data="localData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            ref="multipleTable"
            :header-cell-style="{background:'#eef1f6',color: '#554'}"
            tooltip-effect="dark"
            resizable
            border
            striped>
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column prop="0" label="所属法规" align="center"></el-table-column>
            <el-table-column prop="1" label="条目全文" align="center"></el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[5, 10, 15]"
            :total=localData.length>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="部门规章及文件">
          <el-table
          :data="departData"
          :header-cell-style="{background:'#eef1f6',color: '#554'}"
          ref="multipleTable"
          tooltip-effect="dark">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="0" label="所属法规"></el-table-column>
            <el-table-column prop="1" label="条目全文"></el-table-column>
        </el-table></el-tab-pane>
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
        statute:'',
        loading: false,
        isShow: false,
        currentPage:1,
        pagesize: 5,
        lawData: [],
        adminData: [],
        localData: [],
        departData: []
      }
    },

    methods:{

      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      
      handleSubmit () {
        var _this = this;
        _this.stat = _this.statute;
        console.log(_this.stat)
        if(!(_this.stat)){
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

        let param = {
          statute: _this.stat
        }
        var url = 'http://recom.cnki.net/api/law/statute';
        axios.post(url,param).then((res) => {
            _this.isShow = true;
            _this.lawData = res.data.law;
            _this.adminData = res.data.admin_rule;
            _this.localData = res.data.local_rule;
            _this.departData = res.data.depart_rule;

        }).catch(()=>{
            _this.$message({
              type: 'warning',
              showClose: true,
              message: '数据请求失败!'
            })
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
    padding: 30px;
    background-color: transparent;
    line-height: 30px;
    border-top: 1px solid #ebedf2 !important;
    font-size: 14px;
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
    color: #FFFFFF;
  }

  .simrules_result {
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
</style>

