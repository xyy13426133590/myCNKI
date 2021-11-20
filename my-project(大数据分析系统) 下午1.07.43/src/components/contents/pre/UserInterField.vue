<template>
  <div>
    <el-card class="box-card1">
      <div class="el-arrow-left"  @click="goBack"><i class="el-icon-d-arrow-left"></i></div>
      <div class="card-body">
        <div class="clearfix content">
          <p  class="titleName"> #{{$route.query.interestfield}}#</p>

          <div class="userId">
            <p>领域词: <span style="color:#053597;" v-for="item in keywords">{{item}}</span></p>
          </div>

          <div class="for_fields">
            <p id="for_me">领域热门论文</p>
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
              border
              stripe
              width="100%">
              <el-table-column align="center" label="篇名" prop="title">
                <template slot-scope="scope">
                  <a :href="`http://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=${scope.row.dbcode}&dbname=CMFDTOTAL&filename=` +scope.row.filename"
                     target="_blank" class="buttonText">{{scope.row.title}}</a>
                </template>
              </el-table-column>
              <el-table-column align="center" label="作者" prop="author">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.author}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="来源" prop="source">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.source}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="发表时间" prop="date"  width="160px">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.date}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据库" prop="dbcode"  width="90px">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.dbcode|formatDbcode}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="被引" prop="citedtimes"  width="80px">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.citedtimes}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="下载" prop="downloadedtimes" width="80px">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.downloadedtimes}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @size-change="handleHotSizeChange"
              @current-change="handleHotCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[5, 10, 15]"
              :total='tableData.length'>
            </el-pagination>


            <p id="jourName">领域热门期刊</p>
            <el-table
              :data="jourData.slice((pagenumber-1)*pagesizes,pagenumber*pagesizes)"
              :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
              border
              stripe
              width="100%">
              <el-table-column align="center" label="刊名" prop="jourName">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.jourName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="主办单位" prop="hostUnit">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.hostUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="地址" prop="address" width="400px">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.address}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="语种" prop="yz">
                <template slot-scope="scope">
                  <span class="Text">{{scope.row.yz}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="刊出日期" prop="cbr">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.cbr}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="是否独发" prop="isUnique">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.isUnique| formatisUnique}}</span>
              </template>
              </el-table-column>
              <el-table-column align="center" label="是否网络首发" prop="isNetWorkFP">
                <template slot-scope="scope">
                  <span class="bg_font">{{scope.row.isNetWorkFP|formatIsNetWorkFP}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagenumber"
              :page-size="pagesizes"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[5, 10, 15]"
              :total='jourData.length'>
            </el-pagination>
          </div>
        </div>

      </div>
    </el-card>

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
  import _ from 'lodash'
  export default {
    inject:['reload'],
    data () {
      return {
        keywords:[],
        total:0,
        currentPage:1,
        pagesize: 5,
        pagenumber: 1,
        pagesizes: 5,
        tableData:[],
        jourData: [],//领域期刊数据
        query: {}
      }
    },

    created () {

      //判断子组件的显示，是否是通过父组件路由传值的方式进入子组件
      if(this.$route.query.fieldcode){
        //领域词
        this.getkeyWordsData();
        //领域热门论文
        this.getFieldsData();
        //热门期刊
        this.getHotData();
      }else{
        this.keywords = [];
        this.tableData = [];
        this.jourData = [];
      }

    },

    filters:{
      //是否独发转义
      formatisUnique (row)  {
        if(row === false){
          return '否'
        }else{
          return '是';
        }
      },

      //是否网络首发转义
      formatIsNetWorkFP (row) {
        if(row ===true){
          return '是';
        }else{
          return '否'
        }
      },

      //数据库
      formatDbcode (row)  {
        var dbcode = '';
        if(row === 'CJFD'||row === 'CQFD'){
          return dbcode = '期刊'
        }else if(row === 'CMFD'){
          return dbcode = '硕士'
        }else if(row === 'CDFD'){
          return dbcode = '博士'
        }else{
          return dbcode = '会议'
        }
      }
    },

    methods:{

      //路由跳转领域名称做回显处理
      getkeyWordsData () {
        var url = "http://recom.cnki.net/api/recommendations/words/hot/userrelative";
        axios.get(url,{
          params:{
            fieldcode : this.$route.query.fieldcode,
            top: ''
          }
        }).then(res =>{
          this.keywords = res.data;
        }).catch(error =>{
          console.log(error)
        })
      },

      //领域热门论文
      getFieldsData () {
        var url = "http://recom.cnki.net/api/recommendations/papers/hot/userrelative";
        axios.get(url,{
          params:{
            fieldcode: this.$route.query.fieldcode,
            top: ''
          }
        }).then((res) =>{
          this.tableData = res.data.papers;
          for(var key in res.data.papers){
            this.filename = res.data.papers[key].filename;
          }
        }).catch(error =>{
          console.log(error)
        })
      },

      //热门期刊
      getHotData () {
        var url = "http://recom.cnki.net/api/recommendations/journals/hot/userrelative";
        axios.get(url,{
          params:{
            fieldcode: this.$route.query.fieldcode,
            top: ''
          }
        }).then(res =>{
          this.jourData = res.data;
        }).catch(error =>{
          console.log(error)
        })
      },

      //跳转到上一页
      goBack () {
        this.$router.push('/perExample');
      },

      handleHotSizeChange(val){
        this.pagesize = val;
      },

      handleHotCurrentChange(val) {
        this.currentPage = val;
      },

      handleSizeChange(val) {
        this.pagesizes = val;
      },
      handleCurrentChange(val) {
        this.pagenumber = val;
      },

      handleChange(val) {
        console.log(val);
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

  .el-arrow-left {
    position: relative;
    top:-20px;
    left:-20px;
    font-size: 20px;
    width:30px;
    cursor:pointer;
    /*background: rgba(204, 204, 204, 0.6);*/
  }

  .el-arrow-left:hover {
    width:30px;
    background-color: #ccc;
  }

  .content {
    padding: 0 10px;
  }

  .content div {
    padding:5px 0;
    margin-bottom:5px;
    word-break: normal;
  }


  .titleName {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .content div p{
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }

  .content div p>span {
    padding-left:15px;
    color: #303133;
    font-weight: lighter;
    font-size: 14px;
    white-space:normal;
  }


  .buttonText {
    color:#053597;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    font-family: "宋体";
  }

  .buttonText:hover {
    color:#fd6e0f;
  }

  .Text {
    color: #053597;
  }

 .bg_font {
   color:#222;
 }

  .el-checkbox__inner {
    border: 1px solid #ccc;
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
