<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="card-body">
        <div style="margin-left: 10px;">
<!--          <el-radio-group v-model="mode" @change="radioChange">-->
<!--                <el-radio v-for="(item,index) in modeRoles"-->
<!--                          border-->
<!--                          :key="index" :value="item.value"-->
<!--                          :label="item.name">{{item.name}}</el-radio>-->
<!--          </el-radio-group><br>-->
        </div>
        <!--检索框-->
        <div class="clearfix content">
          <el-cascader
            :options="options"
            v-model="mode"
            @change="handleChange">
          </el-cascader>
          <el-input type="text"
                    placeholder="神经网络 文本分类"
                    v-model="keywords"
                    style="width:50%"
                    @keyup.enter.native="querySearch()"
                    clearable
                    @select="handleSelect">
            <el-button slot="append" type="success" icon="el-icon-search"
                    v-loading="loadData"
                    @click.native.prevent="querySearch()">检索</el-button>
          </el-input>
        </div>

        <div class="left">
          <span class="groupsorttitle" >排序:</span>
          <div class="Btn5"
                v-for="(item,index) in itemList" :key="index"
                :class="{active:index === activeClass}"
                @click="OnClick(index)">{{item.name}}
          <div  @click="start(index)" class="icon_sort bArrow"
                :class="arrayShow[index]?'':'tArrow'">
                <i class="el-iconjiantouarrow505"></i>
          </div>
<!--                <i class="el-iconxiangxiajiantou" v-if="iconIsShow?index === activeClass:null"></i>-->
          </div>
        </div>

        <div class="table_areas">
          <el-table
            :data="tableData?tableData.slice((currentPage-1)*pagesize,currentPage*pagesize):[]"
            :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
            border
            stripe
            v-loading="loading"
            element-loading-text="拼命加载中,请稍后..."
            element-loading-spinner="el-icon-loading"
            width="100%">
            <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="80px"></el-table-column>
            <el-table-column align="center" label="篇名" prop="title">
              <template slot-scope="scope">
                <span class="buttonText" v-html="showSearch(scope.row.title)"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="来源" prop="source">
              <template slot-scope="scope">
                <span class="Text" v-html="showSearch(scope.row.source)"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="发表时间" prop="date" width="180px">
              <template slot-scope="scope">
                <span class="bg_font" v-html="showSearch(scope.row.date)"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下载" prop="downloadedtimes" width="100%">
              <template slot-scope="scope">
                <span class="Text" v-html="showSearch(scope.row.downloadedtimes)"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="被引" prop="citedtimes" width="100%">
              <template slot-scope="scope">
                <span class="Text">{{scope.row.citedtimes| formatCited}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="NOV" prop="nov" width="100%">
              <template slot-scope="scope">
                <span>{{scope.row.nov}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total='tableData.length'>
          </el-pagination>
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
  export default {
    inject:['reload'],
    data () {
      return {
        keywords: '',
        arrayShow: [true, true, true, true, true],
        tableData: [],
        resData: [],//后台返回的动态数据
        allArrData: {},
        strArr: null,
        currentPage: 1,
        pagesize: 10,
        loading: false,
        loadData: false,
        index: 4,
        mode: ['Similarity','Tfidf','Cosin'],
        options: [{
            value: 'Similarity',
            label: 'Similarity',
            children:[{
              value: 'Sif',
              label: 'Sif',
              children:[{
                value: 'Cosin',
                label: 'Cosin',
              },{
                value: 'Faiss',
                label: 'Faiss',
              }]
            },{
              value: 'Bert',
              label: 'Bert',
              children:[{
                value: 'Cosin',
                label: 'Cosin',
              },{
                value: 'Faiss',
                label: 'Faiss',
              }]
            },{
              value: 'Bow_w2v',
              label: 'Bow_w2v',
              children:[{
                value: 'Cosin',
                label: 'Cosin',
              },{
                value: 'Faiss',
                label: 'Faiss',
              }]
            },{
              value: 'Tfidf',
              label: 'Tfidf',
              children:[{
                value: 'Cosin',
                label: 'Cosin',
              },{
                value: 'Faiss',
                label: 'Faiss',
              }]
            }]
          },{value: 'Entropy', label: 'Entropy'}],
        activeClass: 4,//用来存储当前点击默认的元素,默认选择新颖度排序
        itemList: [
          {name: '相关度'},
          {name: '发表时间'},
          {name: '被引'},
          {name: '下载'},
          {name: '新颖度'}
        ]
      }
    },
    created () {
      this.loading = true;
      setTimeout(() =>{
         this.loading = false;
         this.getFieldsData();
     },500)
    },

    filters: {
      formatCited (row){
        if(row== -1) {
          return "";
        }else{
          return row;
        }
      }
      // formatCited (row,column) {
      //   if(row[column.property] == -1){
      //     return row.citedtimes = '';
      //   }
      //   if(row[column.property] !== -1){
      //     return row[column.property];
      //   }
      // },
    },

    computed: {
      // 模糊搜索
      tableData () {
        const keywords = this.keywords;
        if (keywords) {
          return this.resData.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(keywords.toLowerCase()) > -1
            })
          })
        }
        return this.resData
      }
    },

    methods: {
      start(index){
        this.arrayShow[index]=!this.arrayShow[index]
        let arr=this.arrayShow
        this.arrayShow=[...arr]//使用es6扩展运算符，用于将数组转化为用逗号分隔的参数序列
      },

      handleChange(value) {
        console.log(value);
      },

      indexMethod (index) {
       return (this.currentPage -1)*this.pagesize + index +1;
      },

      OnClick(index) {
        var _this = this;
        _this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        if(index == 0){
          if(_this.arrayShow[index] == true){
            _this.tableData =  _this.allArrData.ffd_desc;
          }else{
            _this.tableData =  _this.allArrData.ffd_asc;
          }
        }else if(index == 1){
          if(_this.arrayShow[index]== true){
            _this.tableData =  _this.allArrData.date_desc;
          }else{
            _this.tableData =  _this.allArrData.date_asc;
          }
        }else if(index == 2){
          if(_this.arrayShow[index] == true){
            _this.tableData =  _this.allArrData.citedtimes_desc;
          }else{
            _this.tableData =  _this.allArrData.citedtimes_asc;
          }
        }else if(index == 3){
            if (_this.arrayShow[index]== true) {
              _this.tableData = _this.allArrData.downloadedtimes_desc;
            } else {
              _this.tableData =  _this.allArrData.downloadedtimes_asc;
          }
        }else{
            if(_this.arrayShow[index] == true){
              _this.tableData =  _this.allArrData.nov_desc;
            }else{
              _this.tableData =  _this.allArrData.nov_asc;
            }
        }
      },

      //关键字高亮显示
      showSearch(val){
        val = val + '';
        if (val.indexOf(this.keywords) !== -1 && this.keywords !== '') {
          return val.replace(this.keywords, '<font color="#fd6e0f">' + this.keywords + '</font>')
        } else {
          return val
        }
      },

      //搜索框查询
      querySearch () {
        var keys = this.keywords;
        var mode = this.mode.join(',');
        console.log(mode)
        console.log(keys)
        //添加请求拦截器
        axios.interceptors.request.use((config) =>{
          //在发送请求之前做点事
          console.log(config)
          this.loadData = true;
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
          this.loadData = false;
          return response;
        },function (error) {
          console.log(error)
          //对响应错误做点什么
          return Promise.reject(error)
        });

        var index = this.index;  // 获取当前的index
        //默认新颖度排序(NOV)
        if(!(this.activeClass = 4)){
           this.activeClass = 4;
        }
        if(!(this.arrayShow[this.index]== true)){
          this.arrayShow[this.index] =true;
        }
        
        //存在关键词
        if(this.keywords){
          this.getSearchData();
        }
        //keywords等于空
        if(!(this.keywords)){
          this.getFieldsData();
        }
      },

      handleSelect(item){
        console.log(item)
      },

      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },

      //新颖度排序
      getSearchData () {
        var url = "http://recom.cnki.net/nov/api/novelty_sort_dynamic";
        //var url = "http://192.168.106.102:6543/api/novelty_sort_dynamic";
        axios.get(url,{
          params:{
            search_word: this.keywords,
            algorithm_mode: this.mode.join(',')
          }
        }).then((res) =>{
          this.allArrData = res.data;
          this.strArr = res.data.nov_desc;
          this.resData = this.strArr;
          this.tableData = this.resData;
          if(!(this.tableData)){
            this.tableData = [];
          }
        }).catch(error =>{
          console.log(error)
        })
      },

      getFieldsData () {
        var url = "http://recom.cnki.net/nov/api/novelty_sort_static";
        axios.get(url).then((res) => {
          var jsonObj = eval('(' + res.data + ')')
          this.allArrData =jsonObj;
          this.strArr = jsonObj.nov_desc;
          this.resData = this.strArr;
          this.tableData = this.resData;
          console.log(this.resData)
        }).catch((error) =>{
          console.log(error)
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

  * {
    margin: 0;
    paddign: 0;
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

  .active {
    color: #fff;
    background-color: #fd6e0f;
  }

  .Btn5:hover {
    color: #fff;
    background-color: #fd6e0f;
  }

  .tArrow{
    transform:rotate(180deg);
    transition: all .2s;
  }

  .bArrow{
    /*transform:rotate(0deg);*/
    transition: all .2s;
  }

  .el-radio__label {
    padding-left: 5px;
  }

  .el-radio {
    padding-right: 20px;
    margin-right: 0px;
  }

  .el-radio-group {
    padding-left: 10px;
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

  .content {
    padding: 15px 0px;
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

  .left> .groupsorttitle {
    margin-right: 6px;
    color: #777;
  }

 .Btn5 {
   display:inline-block;
   height:26px;
   line-height: 26px;
   padding: 0 8px;
   border: 1px solid #d6d6d6;
   border-radius: 3px;
   cursor: pointer;
}

  .Btn5 .icon_sort {
    border: none;
    padding: 0;
    float: right;
  }

  .buttonText {
    color:#053597;
    text-decoration: none;
    font-size: 16px;
    font-family: "宋体";
  }

  .Text {
    color: #053597;
  }

  .bg_font {
    color:#222;
  }

  .table_areas {
    margin-top:15px;
    border-top: 2px solid #2181d0;
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
