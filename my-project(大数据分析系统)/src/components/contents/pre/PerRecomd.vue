<template>
  <div>
   <el-card class="box-card">
      <div class="card-body">
        <div class="clearfix content">
          <el-input type="text" id="keywords" placeholder="请输入检索词" v-model="keywords">
            <el-button slot="append" type="success" icon="el-icon-search"  @click="filterUrl()">搜索</el-button>
          </el-input>
        </div>
        <div slot="header" class="clearfix tip_prc">
          <span>功能介绍:</span>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="1.基于用户和内容相关的检索词推荐"  name="1">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>w</strong>   （必选）    用户检索词, <strong>top</strong> （可选，默认10，上限20 ）返回推荐词数目</p>
              <p>返回：	推荐词列表，列表长度为top</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/words/union?w=数据挖掘</p>
            </el-collapse-item>
            <el-collapse-item title="2.全网热搜词" name="2">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	无</p>
              <p>返回：	全网热门搜索词列表，默认30个词</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/words/hot/global</p>
            </el-collapse-item>
            <el-collapse-item title="3.用户领域相关的热搜词" name="3">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>fieldcode</strong>   （必选，<strong>默认C034_25</strong>，可选，B027_18,
                J145_12, J146_3, J150_363, H123_4, D049_16, B027_17, B027_64, A006_D3, D043_82, D049_16, B027_5, A013_21, B021_35, J149_12, B027_44, B027_64, C028_36, I140_5, F098_332, E072_6, E068_216, G117_1, J160_3, J162_21, J162_24, J159_246
                ）    文献领域代码, <strong>top</strong> （可选，默认20）返回文献的最大数目</p>
              <p>返回：	推荐词列表，列表长度为top</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/words/hot/userrelative?fieldcode=C034_25&top=5</p>
            </el-collapse-item>
            <el-collapse-item title="4.联合论文推荐" name="4">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>id</strong>   （必选，默认<strong>1160530204301177191</strong>；可选，2160602113703642623,
                5160615093401728269, 4160616121602884374, 3170411174102683313, 5160707153901927219, 1160715103202478812,
                1170801152302001845, 5171130173304439649, 3171130173106436916, 4171102092200492876, 3180118163906009968, 2160530172606072217,
                2160530172606072934, 2160530172606073478, 2160530172606073768, 2160530172606073808, 2160530172606074950, 2160530172706077958,
                2160530172706078771, 2160530172706079166, 2160530172706084071, 3160530172304481671, 3160530173204531485, 3160530173304533530,
                3160530173304536423, 3160530173404542729, 3160530173604552920, 3160530174400013213, 3160530174600033752, 3160530175000067476,
                3160530175100079163, 4160530172603992156, 4160530172904007553, 4160530173304021797, 4160530173304024019, 4160530173404026158,
                4160530173804039679, 4160530173904044592, 4160530174004048367, 4160530174504071283, 4160530174504073404, 5160530172602404375,
                5160530172702405936, 5160530173202420869, 5160530173602432043, 5160530174402454971, 5160530174402455071, 5160530174402455323,
                5160530174402455374, 5160530174502456292, 5160530174502456322）    用户<strong>clientid</strong>, <strong>top</strong> （可选，默认10，上限20 ）返回推荐词数目</p>
              <p>返回：		该用户的推荐论文列表papers</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/papers/union?id=1160530204301177191</p>
            </el-collapse-item>
            <el-collapse-item title="5.全网热门论文推荐" name="5">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	无</p>
              <p>返回：	全网热门搜索论文，默认长度是10篇</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/papers/hot/global</p>
            </el-collapse-item>
            <el-collapse-item title="6.用户领域相关的热搜论文" name="6">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>fieldcode</strong>   （必选，默认<strong>C034_25</strong>）    论文领域代码, <strong>top</strong> （可选，默认10，上限20 ）返回热搜论文数目</p>
              <p>返回：	该领域热搜论文列表</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/papers/hot/userrelative?fieldcode=J162&top=4</p>
            </el-collapse-item>
            <el-collapse-item title="7.全网热门期刊" name="7">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>top</strong> （可选，默认10，上限30 ）返回热门期刊数目</p>
              <p>返回：	全网热门期刊</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/journals/hot/global</p>
            </el-collapse-item>
            <el-collapse-item title="8.用户领域相关的热门期刊" name="8">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>fieldcode</strong>   （必选，默认<strong>C034_25</strong>）    用户领域代码, <strong>top</strong> （可选，默认10，上限10 ）返回热门期刊数目</p>
              <p>返回：	该领域热门期刊列表</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/journals/hot/userrelative?fieldcode=J162&top=4</p>
            </el-collapse-item>
            <el-collapse-item title="9.用户兴趣领域" name="9">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>id</strong>   （必选）     用户<strong>clientid</strong> 默认：<strong>1160530204301177191</strong></p>
              <p>返回：	兴趣领域以及领域代码列表</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/users/interests</p>
            </el-collapse-item>
            <el-collapse-item title="10.用户动态兴趣标签" name="10">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>id</strong>   （必选）     <strong>top</strong>	 （可选，默认10 ，上限20）返回标签的数目</p>
              <p>返回：	用户动态兴趣标签列表</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/words/union/userinterestsd?id=1160530173001461604</p>
            </el-collapse-item>
            <el-collapse-item title="11.关注该论文的人还关注" name="11">
              <p>方式：	<strong>GET</strong></p>
              <p>参数：	<strong>filename</strong>   （必选，默认<strong>YGGY201504011</strong>,可选，GHKX201402007,
                GHKX201402010, GHZH201402014, GHZH201402015, GHZH201402017, GHZH201402021, GHZH201402022, GHZH201402024,
                GHZH201402026, GHZH201402027, GHZH201402029, GHZH201402031, GHZH201403005, GHZH201403006, GHZH201403007,
                GHZH201403008, GHZH201403009, GHZH201403010, GHZH201403011, GHZH201403014, GHZH201403015, GHZH201403016,
                GHZH201403020, GHZH201403021, GHZH201403023, GHZH201403027, GHZH201403029） <strong>top</strong> （可选，默认10）返回关注的论文数目</p>
              <p>返回：	关注该论文的人还关注的论文列表</p>
              <p>查询样例：http://recom.cnki.net/api/recommendations/papers/otherconcerns?filename=YGGY201504011&top=5</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
   </el-card>

    <div class="line-sperate"></div>

    <!--搜索内容显示区域-->
    <div class="search_area" v-if="isShow">
      <el-card type="border-card">
        <div>{{this.resText}}</div>
      </el-card>
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
  import $ from 'jquery'
  import _ from 'lodash'
    export default {
      inject:['reload'],
        name: "PersonalRecommend",
        data () {
        return {
          //activeIndex: '1',
          activeNames: ['1'],
          keywords:'', //输入框的值
          queryAll: [
            {keywords: ['数据挖掘'], params: 'w', url: 'http://recom.cnki.net/api/recommendations/words/union'},
            {keywords: ['http://recom.cnki.net/api/recommendations/words/hot/global'], params:'', url: 'http://recom.cnki.net/api/recommendations/words/hot/global'},
            {keywords: ['C034_25','B027_18', 'J145_12', 'J146_3', 'J150_363', 'H123_4', 'D049_16', 'B027_17', 'B027_64', 'A006_D3', 'D043_82', 'D049_16', 'B027_5', 'A013_21', 'B021_35', 'J149_12', 'B027_44', 'B027_64', 'C028_36', 'I140_5', 'F098_332', 'E072_6', 'E068_216', 'G117_1', 'J160_3', 'J162_21', 'J162_24', 'J159_246'], params: 'fieldcode',  url: 'http://recom.cnki.net/api/recommendations/words/hot/userrelative'},
            {keywords: ['1160530204301177191','2160602113703642623', '5160615093401728269', '4160616121602884374', '3170411174102683313', '5160707153901927219', '1160715103202478812', '1170801152302001845', '5171130173304439649', '3171130173106436916', '4171102092200492876', '3180118163906009968', '2160530172606072217', '2160530172606072934', '2160530172606073478', '2160530172606073768', '2160530172606073808', '2160530172606074950', '2160530172706077958', '2160530172706078771', '2160530172706079166', '2160530172706084071', '3160530172304481671', '3160530173204531485', '3160530173304533530', '3160530173304536423', '3160530173404542729', '3160530173604552920', '3160530174400013213', '3160530174600033752', '3160530175000067476', '3160530175100079163', '4160530172603992156', '4160530172904007553', '4160530173304021797', '4160530173304024019', '4160530173404026158', '4160530173804039679', '4160530173904044592', '4160530174004048367', '4160530174504071283', '4160530174504073404', '5160530172602404375', '5160530172702405936', '5160530173202420869', '5160530173602432043', '5160530174402454971', '5160530174402455071', '5160530174402455323', '5160530174402455374', '5160530174502456292', '5160530174502456322'], params: 'id',  url: 'http://recom.cnki.net/api/recommendations/papers/union'},
            {keywords: ['http://recom.cnki.net/api/recommendations/papers/hot/global'], params: '', url: 'http://recom.cnki.net/api/recommendations/papers/hot/global'},
            {keywords: ['C034_25','B027_18', 'J145_12', 'J146_3', 'J150_363', 'H123_4', 'D049_16', 'B027_17', 'B027_64', 'A006_D3', 'D043_82', 'D049_16', 'B027_5', 'A013_21', 'B021_35', 'J149_12', 'B027_44', 'B027_64', 'C028_36', 'I140_5', 'F098_332', 'E072_6', 'E068_216', 'G117_1', 'J160_3', 'J162_21', 'J162_24', 'J159_246'], params: 'fieldcode',  url: 'http://recom.cnki.net/api/recommendations/papers/hot/userrelative'},
            {keywords: ['http://recom.cnki.net/api/recommendations/journals/hot/global'], params: '', url: 'http://recom.cnki.net/api/recommendations/journals/hot/global'},
            {keywords: ['C034_25','B027_18', 'J145_12', 'J146_3', 'J150_363', 'H123_4', 'D049_16', 'B027_17', 'B027_64', 'A006_D3', 'D043_82', 'D049_16', 'B027_5', 'A013_21', 'B021_35', 'J149_12', 'B027_44', 'B027_64', 'C028_36', 'I140_5', 'F098_332', 'E072_6', 'E068_216', 'G117_1', 'J160_3', 'J162_21', 'J162_24', 'J159_246'], params: 'fieldcode',  url: 'http://recom.cnki.net/api/recommendations/journals/hot/userrelative'},
            {keywords: ['1160530204301177191','2160602113703642623', '5160615093401728269', '4160616121602884374', '3170411174102683313', '5160707153901927219', '1160715103202478812', '1170801152302001845', '5171130173304439649', '3171130173106436916', '4171102092200492876', '3180118163906009968', '2160530172606072217', '2160530172606072934', '2160530172606073478', '2160530172606073768', '2160530172606073808', '2160530172606074950', '2160530172706077958', '2160530172706078771', '2160530172706079166', '2160530172706084071', '3160530172304481671', '3160530173204531485', '3160530173304533530', '3160530173304536423', '3160530173404542729', '3160530173604552920', '3160530174400013213', '3160530174600033752', '3160530175000067476', '3160530175100079163', '4160530172603992156', '4160530172904007553', '4160530173304021797', '4160530173304024019', '4160530173404026158', '4160530173804039679', '4160530173904044592', '4160530174004048367', '4160530174504071283', '4160530174504073404', '5160530172602404375', '5160530172702405936', '5160530173202420869', '5160530173602432043', '5160530174402454971', '5160530174402455071', '5160530174402455323', '5160530174402455374', '5160530174502456292', '5160530174502456322'], params: 'id',  url: 'http://recom.cnki.net/api/recommendations/users/interests'},
            {keywords: ['1160530173001461604','2160602113703642623', '5160615093401728269', '4160616121602884374', '3170411174102683313', '5160707153901927219', '1160715103202478812', '1170801152302001845', '5171130173304439649', '3171130173106436916', '4171102092200492876', '3180118163906009968', '2160530172606072217', '2160530172606072934', '2160530172606073478', '2160530172606073768', '2160530172606073808', '2160530172606074950', '2160530172706077958', '2160530172706078771', '2160530172706079166', '2160530172706084071', '3160530172304481671', '3160530173204531485', '3160530173304533530', '3160530173304536423', '3160530173404542729', '3160530173604552920', '3160530174400013213', '3160530174600033752', '3160530175000067476', '3160530175100079163', '4160530172603992156', '4160530172904007553', '4160530173304021797', '4160530173304024019', '4160530173404026158', '4160530173804039679', '4160530173904044592', '4160530174004048367', '4160530174504071283', '4160530174504073404', '5160530172602404375', '5160530172702405936', '5160530173202420869', '5160530173602432043', '5160530174402454971', '5160530174402455071', '5160530174402455323', '5160530174402455374', '5160530174502456292', '5160530174502456322'], params: 'id',  url: 'http://recom.cnki.net/api/recommendations/words/union/userinterestsd'},
            {keywords: ['YGGY201504011','GHKX201402007',
                'GHKX201402010', 'GHZH201402014', 'GHZH201402015', 'GHZH201402017', 'GHZH201402021', 'GHZH201402022', 'GHZH201402024',
                'GHZH201402026', 'GHZH201402027', 'GHZH201402029', 'GHZH201402031', 'GHZH201403005', 'GHZH201403006', 'GHZH201403007',
                'GHZH201403008', 'GHZH201403009', 'GHZH201403010', 'GHZH201403011', 'GHZH201403014', 'GHZH201403015', 'GHZH201403016',
                'GHZH201403020', 'GHZH201403021', 'GHZH201403023', 'GHZH201403027', 'GHZH201403029'], params: 'filename ',  url: 'http://recom.cnki.net/api/recommendations/papers/otherconcerns'}
          ],
          isShow:false,
          url: '', // 接口地址
          resText: ''//返回信息接收
        }
      },
      // mounted (){
      //   this.doPostAction = _.debounce(this.sendAjax,500);//限制操作频率的函数，只执行一次
      // },
      methods:{
        filterUrl () {
            var keywords = this.keywords;
           console.log(keywords)
          var queryAll = this.queryAll;
          if(!keywords){
            this.$message({
              type: 'warning',
              showClose: true,
              message: '请输入检索内容'
            });
            this.isShow = false;
          }else{
            queryAll.forEach((v, i) => {
              if (v.keywords.includes(keywords)) {
                let params = {};
                params[v.params] = keywords;
                axios.get(v.url,{
                  params:params
                }).then((res)=>{
                  this.isShow = true;
                  this.resText = res.data;
                  console.log(this.resText)
                }).catch(error =>{
                  console.log(error)
                })
              }
            })
          }
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

  .content {
    padding: 15px 10px;
  }
  .tip_prc {
    margin-bottom: 0;
    padding: 15px 10px;
  }

  span {
    font-size: 16px;
  }

  .box-card {
    font-family: 'nunito', sans-serif;
    width: 100%;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    border: 1px solid #eee;
  }

  .el-menu {
    width: 100%;
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

  .line-sperate {
    width: 100%;
    height: 30px;
    background: #f2f3f8;
  }


  .search_area {
    width: 100%;
    height: auto;
    overflow-x: hidden;
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
