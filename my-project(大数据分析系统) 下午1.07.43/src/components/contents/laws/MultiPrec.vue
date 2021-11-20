<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="card-body">
        <el-form>
          <el-form-item>
            <el-breadcrumb separator="|">
              <el-breadcrumb-item>
                <el-button @click="OnClick(1)" type="primary">
                  <el-icon class="el-icon-plus"></el-icon> 文件上传
                </el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-button @click="OnClick(2)" type="primary">
<!--                    <a :href="`http://192.168.106.101:6161/downloadfile/?filename=` + result_file" style="color:#fff;cursor: pointer;">-->
                    <el-icon class="el-icon-download"></el-icon> 下载预测结果
<!--                    </a>-->
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-form-item>
        </el-form>

        <div class="table_areas">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :header-cell-style="{background:'#eef1f6',color: '#2f8bd6'}"
            border
            stripe
            v-loading="loading"
            element-loading-text="拼命加载中,请稍后..."
            element-loading-spinner="el-icon-loading"
            width="100%">
            <el-table-column align="center" label="ID" prop="id">
              <template slot-scope="scope">
                <span class="buttonText">{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="罪名" prop="predict_label">
              <template slot-scope="scope">
                <span class="Text">{{scope.row.label.join(',')}}</span>
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
                  action="http://192.168.106.101:6161/api/new_result"
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
    </el-card>

    <!-- footer区域 -->
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
      name: "MultiPrec",
      inject:['reload'],
      data () {
        return {
          files:[],//要存放的文件对象
          result_file: '',
          tableData:[],
          currentPage:1,
          pagesize: 10,
          dialogVisible: false,
          loading: false
        }
      },
      mounted () {
      },

      methods: {
        handleSizeChange(val) {
          this.pagesize = val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },

        fileChange(file){
          this.files.push(file.raw);//上传文件变化时将文件对象push进files数组
          console.log(file);
        },

        // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
         beforeUploadFile(files) {
          console.log(files)
         },

        // 文件上传成功时的钩子
        handleSuccess(res, file) {
          console.log(res,file);
          let extension = file.name.substring(file.name.lastIndexOf('.')+1)
          if(extension !== 'csv') {
            this.$notify.warning({
              title: '警告',
              message: `只能上传格式为.csv的文件`
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
            this.$notify.success({
              title: '成功',
              message: `文件上传成功`
            });
            var data = res;
            this.result_file = res.result_file;
            var id = data.id;
            var label = data.predict_label;
            var dataArr = [];
            var num = id.length
            for (var i = 0; i< num; i++) {
              dataArr.push({id: id[i], label: label[i]})
            }
            this.tableData = dataArr;
            console.log(this.tableData)
        },

        // 文件上传失败时的钩子
        handleError(error, file) {
          this.$notify.error({
            title: '错误',
            message:  `文件上传失败`
          });
        },

        //文件上传
        uploadFile() {
          this.$refs.newupload.submit();
        },

        //下载
        OnClick(index) {
          var _this = this;
          if (index == 1) {
            _this.dialogVisible = true;
          }else{
            axios.get('http://192.168.106.101:6161/downloadfile',{
              params:{
                filename: this.result_file
              },
              responseType: 'blob'
            }).then(res =>{
              const content = res.data;
              const blob = new Blob([content])//构造一个blob对象来处理数据
              const filename = 'result.csv';//导出文件名
              if('download' in document.createElement('a')){//支持a标签download的浏览器
                const link = document.createElement('a');
                link.download = filename;
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(link.href);//释放url
                document.body.removeChild(link)//释放标签
              }else{
                navigator.msSaveBlob(blob,filename)
              }
            }).catch(error =>{
              console.log(error)
            })
          }
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

  * {
    margin: 0;
    paddign: 0;
  }

  .upload-demo {
    width:40%;
    margin-left: 30%;
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

  .table_areas {
    margin-top:15px;
    border-top: 2px solid #2181d0;
  }

  .el-dialog {
    height: 41%;
  }

  .el-button-default {
    padding-left:10px;
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
