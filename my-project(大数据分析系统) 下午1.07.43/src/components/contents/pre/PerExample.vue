<template>
  <div>
    <el-card class="box-card1">
      <div class="card-body">
        <!-- 个性化和热门 -->
        <div class="nav">
          <ul>
            <li id="menu-item-1" class="menu-item" @click="handleFirst">个性化</li>
            <li id="menu-item-2" class="menu-item" @click="handleSecond">热门</li>
          </ul>
        </div>

        <!-- 输入框 -->
        <div class="righNav">
          <el-popover
            placement="left-start"
            title
            width="290"
            popper-class="popver"
            trigger="click"
          >
            <div class="userId">
              <el-autocomplete
                class="inline-input"
                v-model="ids"
                clearable
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @keyup.enter.native="searchMsg"
                @select="handleSelect"
                placement="bottom-end"
              >
                <!-- <el-button slot="append" @click="searchMsg" icon="el-icon-search"></el-button> -->
              </el-autocomplete>
            </div>
            <i class="el-icon-search"  slot="reference"></i>
            <!-- <i class="el-icon-search"     @click="handeInput"></i> -->
          </el-popover>
        </div>

        <div class="clearfix content">
          <!-- 左中右三侧布局开始 -->
          <div class="area-echarts">
            <!-- 推荐热门区域开始 -->
            <div class="nav-left-bar" id="nav-left-bar">
              <ul :class="searchBarFixed == true ? 'isFixed' :''">
                <li
                  v-for="(item,indexT) in tabs"
                  :class="{active:indexT === activeClass}"
                  :key="indexT"
                  @click="tab(indexT,item)"
                >
                {{item}}</li>
              </ul>
            </div>

            <!-- 个性化 -->
            <div class="content-list" v-if="tabContentIsVisible">
              <h2
                class="headertitle category-name"
                v-if="this.itemName !==undefined"
              >{{this.itemName+'推荐'}}</h2>
              <div class="rightButton" v-show="this.recomContentIsShow">
                <el-button  type="warning" class="el-sort" icon="el-icon-sort-down" @click="handleTimeRank">时间</el-button>
                <el-button  type="warning" class="el-sort" icon="el-icon-sort-down" @click="handleNoveltyRank">新颖度</el-button>
              </div>
             
              <div>
                <ul>
                  <li>
                    <div
                      class="section  line-1"
                      v-for="(itemCon,index1) in recomData"
                      :key=" 'info1-' + index1"
                      v-if="recomContentIsShow"
                    >
                      <div>
                        <div class="mainc_hefront">
                          <div class="nameiconall">
                            <div class="nameiconlist">
                              <div class="nameiconli">
                                <h4 class="namei showhand">{{itemCon.title}}</h4>
                              </div>
                            </div>
                            <p class="maincunit">
                              {{itemCon.date}}
                              <span>{{itemCon.author.replace(/;/g, " ")}}</span>
                            </p>
                          </div>
                        </div>
                        <div class="section1">
                          <div class="section1_m">
                            <p class="showhand">{{itemCon.author_inst.replace(/;/g, " ")}}</p>
                            <p class="s_summary showhand">{{itemCon.summary}}</p>
                            <div class="s_source">
                              <span>新颖度：<i class="el-iconkeshihuatubiao-"  @click="showEchart(itemCon.filename)"   :title="title" style="font-size:20px;color:#fd6e0f;cursor:pointer"></i>&nbsp;&nbsp;&nbsp;&nbsp;下载量：{{itemCon.downloadedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;被引量：{{itemCon.citedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;类型：联合推荐</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 分割线 -->
                    <div  v-if="recomLine"   style="border:2px solid #ff6600; margin: 15px 150px"></div>

                    <div
                      class="section  line2"
                      v-for="(itemF,index4) in hotFieldData"
                      :key="'info4-' + index4"
                      v-if="recomContentIsShow"
                    >
                      <div>
                        <div class="mainc_hefront">
                          <div class="nameiconall">
                            <div class="nameiconlist">
                              <div class="nameiconli">
                                <h4 class="namei showhand">{{itemF.title}}</h4>
                              </div>
                            </div>
                            <p class="maincunit">
                              {{itemF.date}}
                              <span>{{itemF.author.replace(/;/g, " ")}}</span>
                            </p>
                          </div>
                        </div>
                        <div class="section1">
                          <div class="section1_m">
                            <p class="showhand">{{itemF.author_inst.replace(/;/g, " ")}}</p>
                            <p class="s_summary showhand">{{itemF.summary}}</p>
                            <div class="s_source">
                              <span>新颖度：<i class="el-iconkeshihuatubiao-"  @click="showEchart(itemF.filename)"   :title="title" style="font-size:20px;color:#fd6e0f;cursor:pointer"></i>&nbsp;&nbsp;&nbsp;&nbsp;下载量：{{itemF.downloadedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;被引量：{{itemF.citedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;类型：领域热门</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                     <!-- 分割线 -->
                    <div  v-show="hotFieldData.length > 0 && netLine"  style="border:2px solid #ff6600; margin: 15px 150px"></div>

                    <div
                      class="section"
                      v-for="(item,index2) in networkData"
                      :key="'info2-' + index2"
                      v-if="recomContentIsShow"
                    >
                      <div>
                        <div class="mainc_hefront">
                          <div class="nameiconall">
                            <div class="nameiconlist">
                              <div class="nameiconli">
                                <h4 class="namei showhand">{{item.title}}</h4>
                              </div>
                            </div>
                            <p class="maincunit">
                              {{item.date}}
                              <span>{{item.author.replace(/;/g, " ")}}</span>
                            </p>
                          </div>
                        </div>
                        <div class="section1">
                          <div class="section1_m">
                            <p class="showhand">{{item.author_inst.replace(/;/g, " ")}}</p>
                            <p class="s_summary showhand">{{item.summary}}</p>
                            <div class="s_source">
                              <span>新颖度：<i class="el-iconkeshihuatubiao-"  @click="showEchart(item.filename)"   :title="title" style="font-size:20px;color:#fd6e0f;cursor:pointer"></i>&nbsp;&nbsp;&nbsp;&nbsp;下载量：{{item.downloadedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;被引量：{{item.citedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;类型：网络首发</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 期刊推荐 -->
                    <div
                      class="section qk_head_box block"
                      v-if="jounrnalContnetIsShow"
                      v-for="(itemD,index3) in interData"
                      :key="'info3-'+ index3"
                    > 
                    <div class="qk_img">
                          <img class="reflect" :src="`https://c61.cnki.net/CJFD/big/${itemD.jourPYin}.jpg`" alt="">
                    </div>
                      <div class="qk_info">
                        <div class="title"><h1>{{itemD.jourName}}</h1></div>
                        <div class="info_box">
                          <span>
                            <label>主管单位：</label>
                            {{itemD.hostUnit}}
                          </span>
                          <span>
                            <label>主办单位：</label>
                            {{itemD.hostUnit}}
                          </span>
                          <span>
                            <label>刊出日期：</label>
                            {{itemD.cbr}}
                          </span>
                          <span>
                            <label>刊出地址：</label>
                            {{itemD.address}}
                          </span>
                          <span>
                            <label>语种类型：</label>
                            {{itemD.yz}}
                          </span>
                          <span>
                            <label>国内刊号：</label>
                            {{itemD.cn}}
                          </span>
                          <span>
                            <label>总下载量：</label>
                            {{itemD.count}}
                          </span>
                          <span>
                            <label>刊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</label>
                            {{itemD.kq}}
                          </span>
                          <span>
                            <label>是否独发：</label>
                            {{itemD.isUnique }}
                          </span>
                          <span>
                            <label>是否网络首发：</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{itemD.isNetWorkFP}}
                          </span>
                          <span>
                            <label>期刊类型：</label> 网络首发
                          </span>
                        </div>
                        <div style="clear:both"></div>
                      </div>
                    </div>

                    <div
                      class="section qk_head_box block"
                      v-if="jounrnalContnetIsShow"
                      v-for="(itemF,index) in hotFieldJournalData"
                      :key="'k-'+ index"
                    >
                      <div class="qk_img">
                          <img class="reflect" :src="`https://c61.cnki.net/CJFD/big/${itemF.jourPYin}.jpg`" alt="">
                      </div>
                      <div class="qk_info">
                        <div class="title"><h1>{{itemF.jourName}}</h1></div>
                        <div class="info_box">
                          <span>
                            <label>主管单位：</label>
                            {{itemF.hostUnit}}
                          </span>
                          <span>
                            <label>主办单位：</label>
                            {{itemF.hostUnit}}
                          </span>
                          <span>
                            <label>刊出日期：</label>
                            {{itemF.cbr}}
                          </span>
                          <span>
                            <label>刊出地址：</label>
                            {{itemF.address}}
                          </span>
                          <span>
                            <label>语种类型：</label>
                            {{itemF.yz}}
                          </span>
                          <span>
                            <label>国内刊号：</label>
                            {{itemF.cn}}
                          </span>
                          <span>
                            <label>总下载量：</label>
                            {{itemF.count}}
                          </span>
                          <span>
                            <label>刊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</label>
                            {{itemF.kq}}
                          </span>
                          <span>
                            <label>是否独发：</label>
                            {{itemF.isUnique}}
                          </span>
                          <span>
                            <label>是否网络首发：</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{itemF.isNetWorkFP}}
                          </span>
                          <span>
                            <label>期刊类型：</label> 领域热门
                          </span>
                        </div>
                        <div style="clear:both"></div>
                      </div>
                    </div>

                    <!-- 检索词 -->
                    <div class="key_section" v-if="keywordContnetIsShow">
                      <div class="keyword_content">
                        <div class="input_area">
                          <el-input
                            placeholder="请输入内容"
                            v-model.lazy="keywords"
                            @keyup.enter.native="searchKeyWord"
                            clearable
                            class="input-with-select"
                          >
                            <el-button slot="append" icon="el-icon-search" @click="searchKeyWord"></el-button>
                          </el-input>
                          <h4>
                            检索词：
                            <font color="#fd6e0f">{{keywords}}</font>
                          </h4>
                        </div>
                        <div id="wordCloud" ref="wordCloud" style="width:100%;height:500px;"></div>
                      </div>
                    </div>

                    <!-- 研究领域 -->
                    <div class="waterfall-col" v-if="researchContnetIsShow">
                      <div class="waterfall">
                        <div class="item" v-for="(d,indx) in mainData" :key="'e-' + indx">
                          <div class="item-content">
                            <h2>{{d.interestfield}}</h2>
                            <ul>
                              <li v-for="(fcItem,index) in d.childList" :key="'w-' +index">{{fcItem}}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="load-more mr-bottom"
                      v-if="networkData.length < 10"
                      id="loadmore"
                      @click="loadMore"
                    >点击加载更多</div>
                    <div class="load-more mr-bottom" id="nomore" v-else>没有更多了</div>
                    <div
                      class="loading-text"
                      v-loading="loadingText"
                      element-loading-spinner="el-icon-loading"
                    ></div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 热门内容-->
            <div class="hot-content" v-if="hotContentIsVisible">
              <h2
                class="headertitle category-name"
                v-if="this.itemName !==undefined"
              >{{this.itemName+'热门推荐'}}</h2>
              <div>
                <ul>
                  <li class="hot-content-li">
                    <!-- 文献全网热门推荐 -->
                    <div
                      class="section"
                      v-for="(itemA,index5) in hotAllNetData"
                      :key="'info5-' + index5"
                      v-if="hotRecomContentIsShow"
                    >
                      <div>
                        <div class="mainc_hefront">
                          <div class="nameiconall">
                            <div class="nameiconlist">
                              <div class="nameiconli">
                                <h4 class="namei showhand">{{itemA.title}}</h4>
                              </div>
                            </div>
                            <p class="maincunit">
                              {{itemA.date}}
                              <span>{{itemA.author.replace(/;/g, " ")}}</span>
                            </p>
                          </div>
                        </div>
                        <div class="section1">
                          <div class="section1_m">
                            <p class="showhand">{{itemA.author_inst.replace(/;/g, " ")}}</p>
                            <p class="s_summary showhand">{{itemA.summary}}</p>
                            <div class="s_source">
                              <span>新颖度：<i class="el-iconkeshihuatubiao-"  @click="showEchart(itemA.filename)"   :title="title" style="font-size:20px;color:#fd6e0f;cursor:pointer"></i>&nbsp;&nbsp;&nbsp;&nbsp;下载量：{{itemA.downloadedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;被引量：{{itemA.citedtimes}}&nbsp;&nbsp;&nbsp;&nbsp;类型：全网热门</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 期刊热门推荐 -->
                    <div
                      class="section qk_head_box block"
                      v-if="hotjounrnalContnetIsShow"
                      v-for="(itemJ,index) in hotJournalData"
                      :key="'i-'+ index"
                    >
                     <div class="qk_img">
                          <img class="reflect" :src="`https://c61.cnki.net/CJFD/big/${itemJ.jourPYin}.jpg`" alt="">
                    </div>
                      <div class="qk_info">
                        <div class="title"><h1>{{itemJ.jourName}}</h1></div>
                        <div class="info_box">
                          <span>
                            <label>主管单位：</label>
                            {{itemJ.hostUnit}}
                          </span>
                          <span>
                            <label>主办单位：</label>
                            {{itemJ.hostUnit}}
                          </span>
                          <span>
                            <label>刊出日期：</label>
                            {{itemJ.cbr}}
                          </span>
                          <span>
                            <label>刊出地址：</label>
                            {{itemJ.address}}
                          </span>
                          <span>
                            <label>语种类型：</label>
                            {{itemJ.yz}}
                          </span>
                          <span>
                            <label>国内刊号：</label>
                            {{itemJ.cn}}
                          </span>
                          <span>
                            <label>总下载量：</label>
                            {{itemJ.count}}
                          </span>
                          <span>
                            <label>刊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</label>
                            {{itemJ.kq}}
                          </span>
                          <span>
                            <label>是否独发：</label>
                            {{itemJ.isUnique}}
                          </span>
                          <span>
                            <label>是否网络首发：</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{itemJ.isNetWorkFP}}
                          </span>
                          <span>
                            <label>期刊类型：</label> 全网热门
                          </span>
                        </div>
                        <div style="clear:both"></div>
                      </div>
                    </div>

                    <!-- 检索词热门 -->
                    <div
                      class="section"
                      v-if="hotkeywordContnetIsShow"
                      style="box-shadow: 0 0 0 rgba(0, 0, 0, 0.2); margin: 0 auto"
                    >
                      <!-- 全网热门词（带有丰富的信息）推荐 -->
                      <div class="hotWord_top" id="ranking">
                        <h2>
                          <span>大家都在搜· · ·</span>
                          <span class="box_chart_num color-gray">排名变化</span>
                          <span class="hot-percent">热度</span>
                        </h2>
                        <ul class="content" id="listCont2">
                          <li
                            class="clearfix"
                            v-for="(item,index) in hotKeywordData"
                            :key=" 'keyword-'+ index"
                          >
                            <div class="no" v-if="item.rank == 1"><font style="background-color: #f54545; padding: 0 5px">{{item.rank}}</font></div>
                            <div class="no" v-else-if="item.rank == 2"><font style="background-color: #ff8547; padding: 0 5px">{{item.rank}}</font></div>
                            <div class="no" v-else-if="item.rank == 3"><font style="background-color: #ffac38;padding: 0 5px">{{item.rank}}</font></div>
                            <div class="no" v-else-if="item.rank> 3"><font style="background-color: #8eb9f5;padding: 0 5px">{{item.rank}}</font></div>
                            <div class="name" v-if="item.flag == 'n'">
                              {{item.word}}
                              <el-badge value="new" class="item-badge"></el-badge>
                            </div>
                            <div class="name" v-else>{{item.word}}</div>
                            <span class="update">
                              <div class="stay" v-if="item.flag > 0"><i class="el-iconjiantou-copy-copy" style="color: red"><font color="#999">{{item.flag}}</font></i></div>
                              <div class="stay" v-else-if="item.flag < 0"><i class="el-iconjiantou" style="color: green"><font color="#999">{{item.flag.replace(/^-/g, "")}}</font></i></div>
                              <div class="stay" v-else-if="item.flag == 0"><i class="el-icon-minus"><font style="font-size:16px">{{item.flag}}</font></i></div>
                              <div class="stay" v-else><i class="el-icon-minus"><i class="el-icon-minus"><font style="font-size:16px"></font></i></i></div>
                            </span>
                            <span class="progress">
                              <ul class="chart--horiz">
                                <li class="chart__bar" data-skill="95">
                                  <span class="chart__label">
                                      {{item.weight}}
                                   </span>
                                  </li>
                              </ul>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- 研究领域 热门-->
                    <div class="section" v-if="hotresearchContnetIsShow"
                      style="box-shadow: 0 0 0 rgba(0, 0, 0, 0.2)"
                      >
                        <div class="Module-table">
                          <div class="Module-table-total bor-b1se5 clearfix">
                            <ul class="Module-table-head bor-b1de8 c-36 clearfix">
                                <li class="col-88">领域排名</li>
                                <li class="col-220">领域名称</li>
                                <li class="col-70">领域代码</li>
                                <li class="col-100">排名变化</li>
                                <li class="col-77">领域热度</li>
                            </ul>

                            <div id="pagedivid">
                                        <ul class="Module-table-list clearfix" v-for="(item,index) in hotFiledData" :key="'i' + index">
                                            <li class="col-88" v-if="item.rank === 1"><font color="#fff" style="padding: 2px 6px; font-size: 12px;background: red; opacity: 0.6;border-radius:50%">{{item.rank}}</font></li>
                                            <li class="col-88" v-else-if="item.rank === 2"><font color="#fff" style="padding: 2px 6px;font-size: 12px;background: #F23D7C; opacity: 0.6;border-radius:50%">{{item.rank}}</font></li>
                                            <li class="col-88" v-else-if="item.rank === 3"><font color="#fff" style="padding: 2px 6px;font-size: 12px;background: rgb(255,165,0); opacity: 0.6;border-radius:50%">{{item.rank}}</font></li> 
                                            <li class="col-88" v-else><font color="#333" style="padding: 2px 6px; font-size: 12px;background: #eee;; opacity: 0.8;border-radius:50%">{{item.rank}}</font></li>
                                            <li class="col-220 nofoldtxt" v-if="item.flag == 'n'">
                                              {{item.fieldname}}
                                              <el-badge value="new" class="item-badge"></el-badge>
                                              </li>
                                            <li class="col-220 nofoldtxt" v-else>{{item.fieldname}}</li>
                                            <li class="col-70">{{item.fieldcode}}</li>
                                            <li class="col-100" v-if="item.flag > 0"><span><i class="el-iconjiantou-copy-copy" style="color: red"></i>{{item.flag}}</span></li>
                                            <li class="col-100" v-else-if="item.flag < 0"><span><i class="el-iconjiantou" style="color: green"></i>{{item.flag.replace(/^-/g, "")}}</span></li>
                                            <li class="col-100" v-else-if="item.flag == 0"><span><i class="el-icon-minus">{{item.flag}}</i></span></li>
                                            <li class="col-100" v-else-if="item.flag == 'n'"><span style="padding-left:15px"><i class="el-icon-minus"><i class="el-icon-minus"></i></i></span></li>
                                            <li class="col-77">
                                              <span>
                                              <el-rate  
                                                v-model="item.rate" 
                                                disabled  text-color="#ff9900"></el-rate>
                                              </span>
                                                {{item.weight}}
                                                </li>
                                        </ul>
                                    </div>
                          </div>
                    </div>.
                    </div>
                   </li>
                </ul>
                 </div>

            </div>
            <!-- 推荐热门区域结束 -->

            <!-- 用户区域内容开始 -->
            <div class="right-content-charts chart">
              <div class="a_sec interestwordall">
                <h1 class="a_secc2">用户兴趣标签</h1>
                <div class="acem4all">
                  <div class="a_secm4">
                    <span
                      class="showhand"
                      v-for="(labels,index) in userLabel"
                      :key="index"
                      v-html="`${labels}<br/>`"
                    ></span>
                  </div>
                </div>
              </div>

              <div class="a_sec interestwordall">
                <h1 class="a_secc2">用户兴趣圈子</h1>
                <div class="acem4all" style="background-color: #030e2c">
                  <div class="a_secm4">
                    <div id="main" style="width: 100%; height: 350px" @click="drawer = true"></div>
                  </div>
                </div>
              </div>

              <div class="a_sec interestwordall">
                <h1 class="a_secc2">用户动态变化趋势图</h1>
                <div class="acem4all drag-fishBone" id="dragFish" style="background-color: #030e2c">
                  <div class="a_secm4">
                    <!-- 鱼骨图 -->
                    <div
                      class="fishBone"
                      id="fishBone"
                      style="width: 100%;height: 350px"
                      @click="fishBonedrawer = true"
                    />
                  </div>
                </div>
              </div>

              <div class="a_sec interestwordall">
                <h1 class="a_secc2">我的足迹</h1>
                <div class="acem4all">
                  <h4 class="a_secc2">最近检索</h4>
                  <div class="acem4all">
                    <div class="a_secm4">
                      <span
                        class="showhand"
                        v-for="(sd,index) in searchData"
                        :key="index"
                        v-html="`${sd}<br/>`"
                      ></span>
                    </div>
                  </div>

                  <h4 class="a_secc2">下载记录</h4>
                  <div class="a_secm2">
                    <p class="showhand">
                      <span
                        class="borderStyle"
                        v-for="(dd ,index) in downloadData"
                        :key="index"
                        v-html="`${index +1}. ` +`${dd}<br/>`"
                      ></span>
                    </p>
                  </div>
                  <h4 class="a_secc2">浏览记录</h4>
                  <div class="a_secm2">
                    <p class="showhand">
                      <span
                        class="borderStyle"
                        v-for="(bd,index) in browseData"
                        :key="index"
                        v-html="`${index +1}. ` + `${bd}<br/>`"
                      ></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 用户区域内容结束-->
          </div>
          <!-- 左中右三侧布局结束-->
        </div>
      </div>
    </el-card>

    <!-- footer区域   -->
    <el-footer>
      <div class="footer-fluid">Copyright ©2019 AuthorXuYunYun</div>
    </el-footer>

    <el-drawer title="用户兴趣圈子" id="el-drawer" :visible.sync="drawer" @opened="openDrawer" size="40%">
      <div ref="main" style="width: 100%; height: 100%"></div>
    </el-drawer>

    <!-- 鱼骨图 -->
    <el-drawer
      title="近半年用户动态趋势变化"
      custom-class="drawerCon"
      :visible.sync="fishBonedrawer"
      @opened="openfishBonedrawer"
      size="50%"
    >
      <div class="fishBone" style="margin: 150px auto"> </div>
    </el-drawer>

       <!-- 对话框         :width="dialogWidth"-->
    <el-dialog title="" :close-on-click-modal="false" :center="true" style="color: #fff;  padding: 0; font-weight: bold;font-size: 16px;"  
        v-if="dialogVisible"
        v-dialogDrag
        custom-class="customStyle"
       :visible.sync="dialogVisible"  
       @close="closeDialog">
       <div  class="chartDiv"  style="margin: -60px -25px 10px  0px;">
            <div id="radarChart"  ref="radarChart"  :style="radarObj" v-if="radarChartIsShow"></div>
            <div id="barChart"  ref="barChart" :style="barObj" v-if="barChartIsShow"></div>
        </div>
        <div
        style="margin-top: 180px"
        v-loading="echartLoading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        element-loading-text="图表加载中..." >
        </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import wordCloud from "echarts-wordcloud";
import qs from "qs";
import Clipboard from "clipboard";
import $ from "jquery";
import fishBone from "fishbone";
import "../../../assets/js/jquery.SuperSlide.2.1.1.js";
import "../../../assets/js/jquery-3.4.1.min";
import "../../../assets/js/fishBone";
import "../../../assets/js/jqbar";
 //import "../../../assets/js/directives"
export default {
  inject: ["reload"],
  data() {
    return {
      title: "可视化",
      //icons: ['el-icondabianlunzheng','el-iconzazhiqikan','el-iconguanjianzisousuo','el-iconicon_xinyong_xianxing_jijin-'],
      tabs: ["文献", "期刊", "检索词", "研究领域"],
      indexT: 0,
      activeClass: 0,
      indexH: 0,
      activeClassH: 0,
      itemName: "",
      inputIsShow: false,
      loading: false,
      loadingText: false,
      loadingHot: false,
      drawer: false,
      fishBonedrawer: false,
      tabContentIsVisible: true,
      hotContentIsVisible: false,
      searchBarFixed: false,
      isClick: true,
      idLists: [],
      ids: "",
      keywords: "大数据", //个性化 关键词
      labels: "",
      searchArrData: [],
      searchData: [],
      downloadData: [],
      browseData: [],
      userLabel: [],
      keyLabel: [],
      interData: [],
      novIsShow: false,
      userInterData: [],
      fishData: [],
      //个性化
      recomData: [], //文献
      networkData: [],
      hotFieldData: [],
      hotAllNetData: [],
      hotJournalData: [],
      hotFieldJournalData: [],
      searchFieldData: [],
      hotFiledData: [],
      hotKeywordData: [],
      //个性化
      recomContentIsShow: true,
      jounrnalContnetIsShow: false,
      keywordContnetIsShow: false,
      researchContnetIsShow: false,

      //热门
      hotRecomContentIsShow: true,
      hotkeywordContnetIsShow: false,
      hotjounrnalContnetIsShow: false,
      hotresearchContnetIsShow: false,
      mainData: [],   //个性化  研究领域
      categories: [],
      //optionFromDB: {},
      nodes: [],
      links: [],
      nodes2: [],
      links2: [],
      dialogVisible: false,
      filename: '',
      echartLoading: false,
      radarChartIsShow: false,
      barChartIsShow: false,
      score: '',
      screenWidth: '',
      radarObj: {
        width: '50%',
        height: '421px',
        float: 'left'
      },
      barObj : {
        width: '50%',
        height: '421px',
        float: 'right'
      },
      unionPapers : {}, //联合推荐
      fieldPapers: {},// 领域热门
      netFirstPapers: {}, //网络首发
      recomLine: true,
      netLine: true
    };
  },
  //同时加载多个请求
  mounted() {
    this.idLists = this.loadAll();

    this.getUserInter(); //用户动态兴趣标签
    this.getUserInterChart();//用户兴趣圈子
    this.getDynamicTrendChart();//用户动态趋势图 
    this.getLastSearch(); //检索记录
    this.download(); //下载记录
    this.browse(); //浏览记录

    //个性化
    this.labels = "3180118163906009968";
    //this.labels = '1160530204301177191';
    this.getUnionRecommend(this.labels); //文献联合
    this.getUserFieldInter();//
    this.getNetworkFirstRecom();
    this.getSerachFiledRecom(); //个性化研究领域
    //this.getHotFieldRecom(); //领域热门
    this.getHotAllNetRecom(); //全网热门文献
    this.searchKeyWord(); //个性化 检索词
    this.getHotWordRecom(); //热门检索词
    this.getHotSearchRecom();//热门研究领域
    if (!this.itemName) {
      this.itemName = "文献";
    }
    this.paintCharts();
    this.initFishBone();//初始化鱼骨图

    //this.initWidth();//用处初始化屏幕宽度
  
  this.$nextTick(() =>{
    window.addEventListener('resize', () =>{
      //浏览器变化执行动作
      this.screenWidth = document.body.clientWidth; //获取浏览器的宽度
       //console.log(this.screenWidth)
       if(this.screenWidth < 1920 && this.screenWidth >= 1574){
            // this.radarObj.width = "40%";
            //  this.barObj.width = "40%";
       }else if(this.screenWidth < 1574 && this.screenWidth >= 1305){
          // radar.style.width = "30%";
          // bar.style.width = "30%";
       }
    })
  })
  },

  computed: {},
  filters: {
    //数据库1
    formatDbcode(row) {
      var dbcode = "";
      if (row === "CJFD" || row === "CQFD") {
        return (dbcode = "期刊");
      } else if (row === "CMFD") {
        return (dbcode = "硕士");
      } else if (row === "CDFD") {
        return (dbcode = "博士");
      } else {
        return (dbcode = "会议");
      }
    },

    formatDb(row) {
      var dbcodes = "";
      if (row === "CJFD" || row === "CQFD") {
        return (dbcodes = "期刊");
      } else if (row === "CMFD") {
        return (dbcodes = "硕士");
      } else if (row === "CDFD") {
        return (dbcodes = "博士");
      } else {
        return (dbcodes = "会议");
      }
    },

    //是否独发
    formatisUnique(row) {
      if (row === false) {
        return "否";
      } else {
        return "是";
      }
    },

    //是否网络首发
    formatIsNetWorkFP(row) {
      if (row === true) {
        return "是";
      } else {
        return "否";
      }
    }
  },

//监听文件名变化时，重新渲染
  watch : {
   filename: function(){
      this.renderOpenChart(this.filename);
    },
  },

  methods: {
    //对话框关闭，清空缓存
    closeDialog(){
      this.dialogVisible = false;
    },

      //新颖度
    showEchart(filename){
      this.filename = filename
      console.log(filename);
      this.dialogVisible = true;
      this.echartLoading = true
      this.$nextTick(() =>{
        this.renderOpenChart(filename);
      })
    },

    //新颖度
    handleNoveltyRank(){
      //debugger
      this.handleUnionRank()
      this.handleNetFirstRank();
      this.handleFieldRank();
     
    },

    //时间
    handleTimeRank(){
      this.getUnionRecommend();
      this.getUserFieldInter();
      this.getNetworkFirstRecom();
    },

    //文献联合新颖度
    handleUnionRank(){
      let unionPapers = JSON.stringify(this.unionPapers)
      let union = {
        recommend_data: unionPapers
      }
      axios.post('http://recom.cnki.net/nov/api/recommend_novelty_sort',qs.stringify(union))
      .then(res =>{
        let data = res.data.papers.slice(0,10);
       this.recomData = data;
      }).catch(err =>{
        console.log(err)
      })
    },

      //网络首发新颖度
    handleNetFirstRank(){
       let netFirstPapers = JSON.stringify(this.netFirstPapers)
      //console.log(netFirstPapers)
      let netFirst = {
        recommend_data: netFirstPapers
      }
      axios.post('http://recom.cnki.net/nov/api/recommend_novelty_sort',qs.stringify(netFirst))
      .then(res =>{
      let netData = res.data.papers.slice(0,10)
       this.networkData = netData;
       console.log(this.networkData)
      }).catch(err =>{
        console.log(err)
      })
    },

    //领域热门新颖度
    handleFieldRank(){
      if(!fieldPapers) {
        return ;
      }
       let fieldPapers = JSON.stringify(this.fieldPapers)
      console.log(fieldPapers)
      let field = {
        recommend_data: fieldPapers
      }
      axios.post('http://recom.cnki.net/nov/api/recommend_novelty_sort',qs.stringify(field))
      .then(res =>{
        this.hotFieldData = res.data.papers
      }).catch(err =>{
        console.log(err)
      })
    },

   async renderOpenChart(filename){
      let _this = this;
      var url = "http://recom.cnki.net/nov/api/novelty";
      try {
          let res = await axios.get(url, {
          params: {
            filename: filename
            }
          })

          if(typeof res.data.citations_nov =='nan' && typeof res.data.citations_nov_percentage == 'nan'){
             return  0
          }
          if(!res.data){
                _this.echartLoading = true;
                _this.$message({
                  type: 'warning',
                  message: '缺少必要的字段',
                  showClose: true
                })
                _this.radarChartIsShow = true;
                _this.barChartIsShow = true;
                _this.initradarChart2();
                _this.initbarChart2();
                _this.echartLoading = false;
            }else{
              //console.log(res.data)
              _this.echartLoading = true;
              _this.radarChartIsShow = true;
              _this.barChartIsShow = true;
              _this.$nextTick(() =>{//将回调延迟到下次dom更新循环之后执行
              _this.initradarChart(res.data);
              _this.initbarChart(res.data);
              })
              _this.echartLoading = false;
            var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
             console.log('Page load time is '+ loadTime + 'ms');
            }
        }catch(err){
          console.log(err)
        }
   },

    initradarChart(item){
      //console.log(item)
      var nov_value = [];
      nov_value.push(item.title_nov,item.keywords_nov,item.citations_nov,item.abstract_nov,item.fulltext_nov);
      var radarChart = echarts.init(document.getElementById("radarChart"));
      var option = {
        title:{
          text: "NOV_VAL",
          textStyle: {
            color: '#fff'
          },
          padding: [20,10]
        },
        // grid: {//用于设置y轴刻度值显示不全
        //       containLabel: true
        // },
        tooltip: {
          confine: true,
          enterable: true //鼠标是否可以移动到tooltip区域内
        },
        radar: { 
          shape: 'circle',
          splitNumber: 4,
          indicator: [
            { name: '标题', max: 1},
            { name: '关键词', max: 1},
            { name: '引文', max: 1},
            { name: '摘要', max: 1},
            { name: '全文', max: 1}],
            // center:['50%','50%'],
            //radius: 120, //用于设置文字显示不全问题
          name: {
              formatter: '{value}',
              textStyle: {
                  color: '#fff' // 文字颜色
              }
          },
          // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color : 'rgba(255,255,255,0.4)', 
            }
          },
          splitLine : {
              show : true,
              lineStyle : {
                  width : 1,
                  type: 'dashed',
                  color : 'rgba(255,255,255,0.6)', // 设置圆环网格的颜色
              },
          },
          splitArea: {
            areaStyle: {
                color: ['rgba(13,64,90, 1)','rgba(13,64,90, 1)', 
                'rgba(13,64,90, 1)','rgba(13,64,90, 1)'], //圆环颜色
                shadowColor: 'aqua', // 圆颜色
                shadowBlur: 3
            }
        },
        },
        series: [{
          name: 'nov(值)',
          type: 'radar',
          data: [{
            value: nov_value,
            areaStyle: {
                  normal: {
                      color: 'rgba(0,180,247, 0.6)' // 选择区域颜色
                  }
              },
              // 设置区域边框和区域的颜色
              itemStyle: {
                normal: {
                  color: 'rgba(2,180,246,0.2)',
                  width: 2,
                  label: {
                    show: true
                  }
                }
              },
      
            //在拐点处显示数值
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    formatter: (params) => {
                        return params.value
                    },
                },
            },
          }]

        }]

      }
      radarChart.setOption(option)
      //window.onresize = radarChart.resize
      window.onresize = function(){
        radarChart.resize()
      }
    },

    initradarChart2(){
      var radarChart2 = echarts.init(document.getElementById("radarChart"));
      //  window.onresize = function(){
      //   radarChart2.resize()
      // }
      var option = {
        title:{
          text: "NOV_VAL",
          textStyle: {
            color: '#fff'
          },
          padding: [20,10]
        },
        grid: {//用于设置y轴刻度值显示不全
              containLabel: true
            },
        tooltip: {
          confine: true,
          enterable: true //鼠标是否可以移动到tooltip区域内
        },
        radar: { 
          shape: 'circle',
          splitNumber: 4,
          indicator: [
            { name: '标题', max: 1},
            { name: '关键词', max: 1},
            { name: '引文', max: 1},
            { name: '摘要', max: 1},
            { name: '全文', max: 1}],
          name: {
              formatter: '{value}',
              textStyle: {
                  color: '#fff' // 文字颜色
              }
          },
          // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color : 'rgba(255,255,255,0.4)', 
            }
          },
          splitLine : {
              show : true,
              lineStyle : {
                  width : 1,
                  type: 'dashed',
                  color : 'rgba(255,255,255,0.6)', // 设置圆环网格的颜色
              },
          },
          splitArea: {
            areaStyle: {
                color: ['rgba(13,64,90, 1)','rgba(13,64,90, 1)', 
                'rgba(13,64,90, 1)','rgba(13,64,90, 1)'], //圆环颜色
                shadowColor: 'aqua', // 圆颜色
                shadowBlur: 3
            }
        },
        },
        series: [{
          name: 'nov(值)',
          type: 'radar',
          data: [{
            value: [],
            areaStyle: {
                  normal: {
                      color: 'rgba(0,180,247, 0.6)' // 选择区域颜色
                  }
              },
              // 设置区域边框和区域的颜色
              itemStyle: {
                normal: {
                  color: 'rgba(2,180,246,0.2)',
                  width: 2,
                  label: {
                    show: true
                  }
                }
              },
      
            //在拐点处显示数值
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    formatter: (params) => {
                        return params.value
                    },
                },
            },
          }]

        }]

      }
      radarChart2.setOption(option)
      window.onresize = radarChart2.resize;
    },

    initbarChart(item){
       console.log(item)
      var _this = this;
      var nov_data = [];
      if(item){
        let title = parseFloat(item.title_nov_percentage)/100;
        let keywords = parseFloat(item.keywords_nov_percentage)/100;
        let citations =  parseFloat(item.citations_nov_percentage)/100;
        let abstract = parseFloat(item.abstract_nov_percentage)/100;
        let fulltext = parseFloat(item.fulltext_nov_percentage)/100;
        nov_data.push(title,keywords,citations,abstract,fulltext);
        console.log(nov_data)
      }
      var barChart = echarts.init(_this.$refs.barChart);
      // window.onresize = function(){
      //   barChart.resize()
      // }
      console.log(barChart)
      var option = {
              //color: ['#00B4F7'],
              title: {
                  text: 'NOV_EXC_VAL',
                  textStyle: {
                    color: '#fff'
                  },
                  padding: [20,10]
              },

              grid: {//用于设置y轴刻度值显示不全
                left: 10,
                containLabel: true
              },
              tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              transitionDuration:0,//解决鼠标悬停echarts图表抖动问题
              //formatter: '{b}<br />{a0}: {c0}*100%'
              formatter: function(params){
               // console.log(params[0]);
                var res = `<div><p>该文献${params[0].name}新颖度值优先于${((params[0].data)*100).toFixed(2)}%的同领域其它文献</p></div>`
                //var res = Number(((params[0].data)*100).toFixed(2));
               // res += "%";
                return res;
              }
              },
              xAxis: {
                  data: ["标题","关键词","引文","摘要","全文"],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff'
                    }
                  },
                  axisLabel: {  
                    interval:0  //设置当图表随浏览器窗口缩小的时候，x轴文字显示不全
                  } , 
                  axisTick: {
                    inside: true
                  }
                  
              },
              yAxis: {
                  show: true,
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        //formatter: '{value}%'
                        formatter: function(value){
                           // console.log(value)
                            var res = Number(value *100);
                            res += '%';
                            return res;
                        }
                    },
                    axisLine: {
                      show: true,
                      lineStyle: {
                      color: '#fff'
                      }
                    },
                    axisTick: {
                    inside: true
                  }
                },
              series: [{
                  name: '百分比',
                  type: 'bar',
                  barWidth: '40%',
                  data: nov_data,
                  itemStyle: {
                      normal: {
                          color: 'rgba(0,180,247, 0.3)',//柱子颜色
                          borderColor: '#00B4F7',//边框颜色
                          borderWidth: 1
                      }
                  }
              }]
          };
          // 使用刚指定的配置项和数据显示图表。
          barChart.setOption(option);
          window.onresize = barChart.resize;
    },

    initbarChart2(){
      var barChart2 = echarts.init(document.getElementById("barChart"));
      //  window.onresize = function(){
      //   barChart2.resize()
      // }
      var option = {
              //color: ['#00B4F7'],
              title: {
                  text: 'NOV_EXC_VAL',
                  textStyle: {
                    color: '#fff'
                  },
                  padding: [20,10]
              },
              grid: {//用于设置y轴刻度值显示不全
              left: 10,
              containLabel: true
             },
              tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              transitionDuration:0,
              //formatter: '{b}<br />{a0}: {c0}*100%'
              formatter: function(params){
                console.log(params[0].data);
                //var res = `<div><p>${(params[0].data)*100}%</p></div>`
                var res = Number(((params[0].data)*100).toFixed(2));
                res += "%";
              return res;
              }
              },
              xAxis: {
                  data: ["标题","关键词","引文","摘要","全文"],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff'
                    }
                  },
                  axisLabel: {  
                    interval:0  //设置当图表随浏览器窗口缩小的时候，x轴文字显示不全
                  } ,
                  axisTick: {
                    inside: true
                  }
                  
              },
              yAxis: {
                  show: true,
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        //formatter: '{value}%'
                        formatter: function(value){
                            console.log(value)
                            var res = Number(value *100);
                            res += '%';
                            return res;
                        }
                    },
                    axisLine: {
                      show: true,
                      lineStyle: {
                      color: '#fff'
                      }
                    },
                    axisTick: {
                    inside: true
                  }
                },
              series: [{
                  name: '百分比',
                  type: 'bar',
                  barWidth: '40%',
                  data: [],
                  itemStyle: {
                      normal: {
                          color: 'rgba(0,180,247, 0.3)',//柱子颜色
                          borderColor: '#00B4F7',//边框颜色
                          borderWidth: 1
                      }
                  }
              }]
          };
          // 使用刚指定的配置项和数据显示图表。
          barChart2.setOption(option);
          window.onresize =  barChart2.resize;
    },
 
      //个性化  关键词查询
      searchKeyWord() {
        var _this = this;
        let key = this.keywords;
        // var mychart = echarts.init(_this.$refs.wordCloud);
        // console.log(mychart)
        // mychart.showLoading({
        //     text: '数据正在努力加载...',
        //     textStyle: { fontSize : 30 , color: '#444' },
        //     effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
        // })
        var url = "http://recom.cnki.net/api/recommendations/words/union/weight";
        axios
          .get(url, {
            params: {
              w: key,
              top: ""
            }
          })
          .then(res => {
          _this.keyLabel = res.data;
            var textArr =[];
            for (var key in res.data) {
              res.data[key].forEach(v => {
                var v1 = v.split(":")[0];
                var v2 = v.split(":")[1];
                textArr.push({name: v1, value: parseFloat(v2)});
              });
            }
            _this.keyLabel = textArr;
            _this.piantWordCloud(_this.keyLabel);
          })
          .catch(error => {
            console.log(error);
          });
      },

  //词云图
    piantWordCloud(keyLabel){
        var mychart = echarts.init(this.$refs.wordCloud);
        var option = {
          title:{},
          tooltip:{
            show: true,
          },
          series:[{
            name: "检索词权重分布",
            type:'wordCloud',
            data: this.keyLabel,
            //网格尺寸,尺寸越大，字体之间的间隔越大
            grideSize:10,
            drawOutOfBound: false,
            //字体的最大与最小字号
            sizeRange:[12,66],
            autoSize: {
              enable: true,
              minSize: 6
              },
            //字体旋转的范围
            rotationRange: [-45, 90],
            textPadding: 0,
            //词云形状 circle:圆形,pentagon:五边形
            //cardioid:苹果形或心形,star:星形,diamond:钻石,
            //triangle-forward:三角形,triangle:三角形,smooth:平滑
            shape:'circle',
            textStyle:{
              normal:{
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                //字体随机颜色
                color:function(){
                  return 'rgb('+[
                    Math.round(Math.random()*160),
                    Math.round(Math.random()*160),
                    Math.round(Math.random()*160)
                  ].join(',')+')';
                }
              },
              emphasis:{
                //阴影距离
                shadowBlur:10,
                
                //阴影颜色
                shadowColor:'#111'
              }
            },
            
          }]
        };
        mychart.setOption(option);
        //mychart.hideLoading();
    },

    tab(indexT, item) {
      this.activeClass = indexT;
      this.itemName = item;
      if(indexT === 0){
          if(this.tabContentIsVisible == true){
             this.hotRecomContentIsShow = true;
             this.hotjounrnalContnetIsShow = false;
             this.hotkeywordContnetIsShow = false;
             this.hotresearchContnetIsShow = false;
             this.recomLine = true;
             this.netLine = true
          }else{
            this.recomContentIsShow = true;
            this.jounrnalContnetIsShow = false;
            this.keywordContnetIsShow = false;
            this.researchContnetIsShow = false;
          }
      }else if(indexT === 1){
        if(this.tabContentIsVisible == true){
            this.hotRecomContentIsShow = false;
            this.hotjounrnalContnetIsShow = true;
            this.hotkeywordContnetIsShow = false;
            this.hotresearchContnetIsShow = false;
            this.getHotJounrnalRecom(); //全网热门期刊
            this.recomLine = false
            this.netLine = false
          }else{
             this.recomContentIsShow = false;
            this.jounrnalContnetIsShow = true;
            this.keywordContnetIsShow = false;
            this.researchContnetIsShow = false;
            this.getNetFirstJournalRecom(); //网络首发期刊推荐
            this.getUserJounrnalField();
            //this.getHotFieldJournalRecom();
            $("#nomore").css("display", "none");
            $("#loadmore").css("display", "none");
          }
      }else if(indexT === 2){
         if(this.tabContentIsVisible == true){
            this.hotRecomContentIsShow = false;
            this.hotjounrnalContnetIsShow = false;
            this.hotkeywordContnetIsShow = true;
            this.hotresearchContnetIsShow = false;
            this.recomLine = false
            this.netLine = false
          }else{
             this.recomContentIsShow = false;
              this.jounrnalContnetIsShow = false;
              this.keywordContnetIsShow = true;
              this.researchContnetIsShow = false;
              //this.keywords = "大数据";
              this.searchKeyWord();
              $("#nomore").css("display", "none");
              $("#loadmore").css("display", "none");
          }
      }else if(indexT === 3){
         if(this.tabContentIsVisible == true){
            this.hotRecomContentIsShow = false;
            this.hotjounrnalContnetIsShow = false;
            this.hotkeywordContnetIsShow = false;
            this.hotresearchContnetIsShow = true;
            this.recomLine = false
            this.netLine = false
          }else{
             this.recomContentIsShow = false;
            this.jounrnalContnetIsShow = false;
            this.keywordContnetIsShow = false;
            this.researchContnetIsShow = true;
            //this.getSerachFiledRecom(); //个性化研究领域
            $("#nomore").css("display", "none");
            $("#loadmore").css("display", "none");
          }
      }
      if (this.tabContentIsVisible == true) {
        if (indexT === 0) {
          this.recomContentIsShow = true;
          this.jounrnalContnetIsShow = false;
          this.keywordContnetIsShow = false;
          this.researchContnetIsShow = false;
          this.recomLine = true;
          this.netLine = true;
        } else if (indexT === 1) {
          this.recomContentIsShow = false;
          this.jounrnalContnetIsShow = true;
          this.keywordContnetIsShow = false;
          this.researchContnetIsShow = false;
          this.getNetFirstJournalRecom(); //网络首发期刊推荐
          this.getUserJounrnalField();
          //this.getHotFieldJournalRecom();
          $("#nomore").css("display", "none");
          $("#loadmore").css("display", "none");
        } else if (indexT === 2) {
          this.recomContentIsShow = false;
          this.jounrnalContnetIsShow = false;
          this.keywordContnetIsShow = true;
          this.researchContnetIsShow = false;
          //this.keywords = "大数据";
          this.searchKeyWord();
          $("#nomore").css("display", "none");
          $("#loadmore").css("display", "none");
        } else if (indexT === 3) {
          this.recomContentIsShow = false;
          this.jounrnalContnetIsShow = false;
          this.keywordContnetIsShow = false;
          this.researchContnetIsShow = true;
          //this.getSerachFiledRecom(); //个性化研究领域
          $("#nomore").css("display", "none");
          $("#loadmore").css("display", "none");
        }
      } else if (this.hotContentIsVisible == true) {
        if (indexT === 0) {
          this.hotRecomContentIsShow = true;
          this.hotjounrnalContnetIsShow = false;
          this.hotkeywordContnetIsShow = false;
          this.hotresearchContnetIsShow = false;
        } else if (indexT === 1) {
          this.hotRecomContentIsShow = false;
          this.hotjounrnalContnetIsShow = true;
          this.hotkeywordContnetIsShow = false;
          this.hotresearchContnetIsShow = false;
          this.getHotJounrnalRecom(); //全网热门期刊
        } else if (indexT === 2) {
          this.hotRecomContentIsShow = false;
          this.hotjounrnalContnetIsShow = false;
          this.hotkeywordContnetIsShow = true;
          this.hotresearchContnetIsShow = false;
        } else if (indexT === 3) {
          this.hotRecomContentIsShow = false;
          this.hotjounrnalContnetIsShow = false;
          this.hotkeywordContnetIsShow = false;
          this.hotresearchContnetIsShow = true;
        }
      }
    },
    //个性化  点击加载更多
    loadMore() {
      this.getNetworkFirstRecom(); //文献网络首发
    },
    //打开抽屉加载echarts图表
    openDrawer() {
      this.$nextTick(() => {
      this.paint();
      //this.preProcess();
      });
    },

    //用户动态趋势图
    getDynamicTrendChart(){
        var url = "http://192.168.106.101:5431/api/recommendations/users/interest/dynamic";
        axios
          .get(url, {
            params: {
              id: this.labels
            }
          })
          .then(res => {
          var dataArr = [];
          const data = res.data
          for(var k in data){
              let arr = [];
              const child = data[k];
            for(var k2 in child){
                  let cg = child[k2]
                  if(cg.includes('CG')){
                    k2 = k2.replace(k2, '<font color="#fd6e0f">' + k2 + '</font>');
                  }   
                  arr.push(k2)
            }
              dataArr.push({date: k, ...arr})
          }
          this.fishData =dataArr ;
          this.initFishBone(this.fishData)
          })
          .catch(error => {
            console.log(error);
          });
    },

    //初始化鱼骨图
    initFishBone(fishData){
         $("#fishBone").fishBone(fishData);
    },

    //打开抽屉加载鱼骨图
    openfishBonedrawer() {
      this.$nextTick(() => {
          $(".fishBone").fishBone(this.fishData);
      });
    },
     //用户兴趣圈子
    getUserInterChart(){
      var url = "http://192.168.106.101:5431/api/recommendations/users/interest/friends";
        axios
          .get(url, {
            params: {
              id: this.labels,
              top: 5
            }
          })
          .then(res => {
              var data = res.data;
              this.paintCharts(data);//顺序不能错
              this.paint(data);
          })
          .catch(error => {
            console.log(error);
          });
    },

    paint(data) {
      var _this = this;
      var nodesArr = [];
      var linksArr = [];
      var tagsArr = [];
      nodesArr.push({
        name: this.labels,
        category: 0
      })
      for(var i in data){
         _this.tags =  data[i].tags;
        let  userid = data[i].userid;
        tagsArr.push(_this.tags);
        if(userid){
          nodesArr.push({
          name: userid,
          category: 1
        })
        }
        //节点线
       linksArr.push({
         source: this.labels,
         target:  userid
       })
       this.nodes = nodesArr;
       this.links = linksArr;
      }
      var myCharts = echarts.init(this.$refs.main);
      var option = null;
      var categories = [
        {
          name: 0
        },
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        },
        {
          name: 5
        }];
      var optionFromDB = {
        series: [
          {
            color: ["#20A0FF", "#4cabce", "#006699", "#FFA020"],
            //color: ['#9ccc65', '#f2b368', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            draggable: true,
            edgeLabel: {
              show: false
            },
            focusNodeAdjacency: true,//突出相关边和邻接节点
            force: {
              //斥力因子
              repulsion: 400
            },
            itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.3,
                shadowColor: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              },
              emphasis: {
                width: 3 //hover时改变线宽
              }
            },
            data: this.nodes,//node节点
            links: this.links,//节点线
            categories: categories,
            roam: true
          }
        ]
      };
      myCharts.setOption(
        (option = {
          tooltip: {
            trigger: "item",
            padding: [10,20],
            backgroundColor: "rgba(32,160,255,0.2)",
            borderColor: "#fff",
            borderWidth: 1,
            textStyle: {
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold"
            },
            formatter: function(params,tags){
              //console.log(params,_this.tags)
              if(params.data.category == 0){
                return "";
              }
              for(let i in tags){
                    return  `<div><p>clientId：</p></div>
                              <div><p>${params.name}</p></div>
                              <div><p>tags：</p></div>
                              <div><p>${_this.tags[0]}</p></div> 
                              <div><p>${_this.tags[1]}</p></div>
                              <div><p>${_this.tags[2]}</p></div>`;
              }
            }
          },
          series: [
            {
              zoom: 3,
              type: "graph",
              layout: "force",
              category: this.categories,
              label: {
                show: true,
                position: "bottom",
                formatter: "{b}",
                fontSize: 16,
                formatter:function(param){
                  var res = "";
                  res += param.name.substring(0, 5) + "...";
                  //console.log(param.name)
                  return res
                }
              }, 
              symbolSize: function(rawValue,params){
                  // params.symbolSize =size[params.dataIndex];
                  // return params.symbolSize;
                   switch(params.data.category){
                    case 0:
                      return 34;
                      break;
                    case 1: 
                      return 25;
                      break;
                    default:
                      return 25
                  }
              },
              animationDurationUpdate: 750
            }
          ]
        })
      );
      myCharts.setOption(optionFromDB);
      myCharts.on("click", params => {
        let options = myCharts.getOption();
        let nodesOption = options.series[0].data;
        let linksOption = options.series[0].links;
        let tempLinks = optionFromDB.series[0].links;
        let tempData = optionFromDB.series[0].data;
        let name = params.data.name;
        let count = 0;

        function hasChild(tempName) {
          linksOption.forEach(function(node) {
            if (node.source === tempName) {
              for (let m in nodesOption) {
                if (nodesOption[m].name === node.target) {
                  //hasChild=>contract
                  count++;
                  nodesOption.splice(m, 1);
                  hasChild(node.target);
                }
              }
            }
          });
          if (!count) {
            // noChild=>spread
            let tempTarget = [];
            tempLinks.forEach(function(node) {
              if (node.source === name) {
                tempTarget.push(node.target); //no use
                for (let m in tempData) {
                  if (tempData[m].name === node.target) {
                    let n = 0;
                    for (let m in nodesOption) {
                      if (nodesOption[m].name === node.target) {
                        //no use
                        n++;
                      }
                    }
                    if (n === 0) {
                      nodesOption.push(tempData[m]);
                    }
                  }
                }
              }
            });
          }
        }
        hasChild(name);
        myCharts.setOption(options);
      }); 
    },
    //我的圈子
    paintCharts(data) {
      var _this = this;
      let nodesArr = [];
      let linksArr = [];
      let tagsArr = [];
      nodesArr.push({
        name: this.labels,
        category: 0
      })
      for(let i in data){
         _this.tags =  data[i].tags;
        let  userid = data[i].userid;
        tagsArr.push(_this.tags);
        if(userid){
          nodesArr.push({
          name: userid,
          category: 1
        })
        }
        //节点线
       linksArr.push({
         source: this.labels,
         target:  userid
       })
       this.nodes2 = nodesArr;
       this.links2 = linksArr;
       console.log( this.nodes2,this.links2)
      }
      var myChart = echarts.init(document.getElementById("main"), "macarons");
         var option = null;
         //var sizeSymbol = [34,25,25,25,25,25]
       var categories = [
        {
          name: 0
        },
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        },
        {
          name: 5
        }];
      var optionFromDB = {
        series: [
          {
            color: ["#20A0FF", "#4cabce", "#006699", "#FFA020"],
            draggable: true,
            label: {
              show: true,
              position: "bottom",
              formatter: "{b}",
              fontSize: 16,
              formatter:function(param){
                  let res = "";
                  res += param.name.substring(0, 5) + "...";
                  //console.log(param.name)
                  return res 
                }
            }, 
            edgeLabel: {
              show: false
            },
            focusNodeAdjacency: true,//突出相关边和邻接节点
            force: {
              //斥力因子
              repulsion: 300
            },
            itemStyle: {
                // borderColor: '#fff',
                // borderWidth: 2,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.5,
                shadowColor: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              },
              emphasis: {
                width: 3 //hover时改变线宽
              }
            },
            data: this.nodes2,
            links: this.links2,
            categories: categories,
            roam: true
          }
        ]
      };
      myChart.setOption(
        (option = {
          tooltip: {
            trigger: "item",
            padding: [10,20],
              backgroundColor: "rgba(32,160,255,0.2)",
             borderColor: "#fff",
            borderWidth: 1,
            textStyle: {
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold"
            },
            formatter: function(params,tags){
              //console.log(params.name,_this.tags)
              if(params.data.category == 0){
                return "";
              }
              for(let i in tags){
                    return  `<div><p>clientId：</p></div>
                                  <div><p>${params.name}</p></div>
                                  <div><p>tags：</p></div>
                                  <div><p>${_this.tags[0]}</p></div> 
                                  <div><p>${_this.tags[1]}</p></div>
                                  <div><p>${_this.tags[2]}</p></div>`;
              }
            }
          },
          series: [
            {
              zoom: 3,
              type: "graph",
              layout: "force",
              category: this.categories,
              symbolSize: function(value,params){
                  switch(params.data.category){
                    case 0:
                      return 34;
                      break;
                    case 1: 
                      return 25;
                      break;
                    default:
                      return 25
                  }
              },
              animationDurationUpdate: 750
            }
          ]
        })
      );
      myChart.setOption(optionFromDB);
      myChart.on("click", params => {
        let options = myChart.getOption();
        let nodesOption = options.series[0].data;
        let linksOption = options.series[0].links;
        let tempLinks = optionFromDB.series[0].links;
        let tempData = optionFromDB.series[0].data;
        let name = params.data.name;
        let count = 0;

        function hasChild(tempName) {
          linksOption.forEach(function(node) {
            if (node.source === tempName) {
              for (let m in nodesOption) {
                if (nodesOption[m].name === node.target) {
                  //hasChild=>contract
                  count++;
                  nodesOption.splice(m, 1);
                  hasChild(node.target);
                }
              }
            }
          });
          if (!count) {
            // noChild=>spread
            let tempTarget = [];
            tempLinks.forEach(function(node) {
              if (node.source === name) {
                tempTarget.push(node.target); //no use
                for (let m in tempData) {
                  if (tempData[m].name === node.target) {
                    let n = 0;
                    for (let m in nodesOption) {
                      if (nodesOption[m].name === node.target) {
                        //no use
                        n++;
                      }
                    }
                    if (n === 0) {
                      nodesOption.push(tempData[m]);
                    }
                  }
                }
              }
            });
          }
        }
        hasChild(name);
        myChart.setOption(options);
      }); 
    },

    handleFirst() {
      this.tabContentIsVisible = true;
      this.hotContentIsVisible = false;
      $("#menu-item-1").css("color", "#ff6600");
      $("#menu-item-2").css("color", "#333");
    },
    handleSecond() {
      this.hotContentIsVisible = true;
      this.tabContentIsVisible = false;
      $("#menu-item-1").css("color", "#333");
      $("#menu-item-2").css("color", "#ff6600");
    },

    querySearch(queryString, cb) {
      var idLists = this.idLists;
      var results = queryString
        ? idLists.filter(this.createFilter(queryString))
        : idLists;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return idLists => {
        return (
          idLists.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    loadAll() {
      return [
        { value: "1160530204301177191" },
        { value: "8190415082900549866" },
        { value: "4190428155201548518" },
        { value: "8190919201302017505" },
        { value: "3190701162302201065" },
        { value: "3180118163906009968" },
        { value: "4160616121602884374" },
        { value: "5160707153901927219" },
        { value: "3160530173204531485" },
        { value: "4160530172904007553" },
        { value: "5160530173602432043" },
        { value: "5160530174402455071" },
        { value: "1160601171005464926" },
        { value: "1161005192401269455" },
        { value: "2180424214704832840" },
        { value: "2190510065700571490" },
        { value: "3160604084602315627" },
        { value: "3160604161504887330" },
        { value: "3160617103904263228" },
        { value: "4160602155604386564" },
        { value: "4180421145301456898" },
        { value: "4180504144901286973" },
        { value: "5181116163301426290" },
        { value: "5190217213902442189" },
        { value: "6190803205400895848" },
        { value: "7190818001400007215" },
        { value: "7181112155201312359" },
        { value: "8180904173803229915" }
      ];
    },


    handleSelect(item) {
      let _this = this;
      console.log(item.value);
      _this.labels = item.value;
      _this.getDynamicTrendChart(_this.labels);
      _this.getUserInterChart(_this.labels);
      _this.getUserInter(_this.labels);
      _this.getLastSearch(_this.labels);
      _this.download(_this.labels);
      _this.browse(_this.labels);

      _this.getUnionRecommend(_this.labels);
      _this.getNetworkFirstRecom(_this.labels);
      _this.getNetFirstJournalRecom(item.value);
      _this.getUserFieldInter(_this.labels);
      _this.getUserJounrnalField(_this.labels);
      if(_this.labels){
        _this.mainData = [];
        _this.getSerachFiledRecom(_this.labels);
         $("#nomore").css("display", "none");
          $("#loadmore").css("display", "none");
      }

    },

    formatCited(row, column) {
      if (row[column.property] == -1) {
        return (row.citedtimes = "");
      }
      if (row[column.property] !== -1) {
        return row[column.property];
      }
    },

    //搜索框
    searchMsg() {
      var _this = this;
      var ids = _this.ids;
      let obj = {};
      obj = _this.idLists.find(item => {
        return item.value === ids;
      });
      _this.labels = obj.value;
      //数据请求方法
      _this.getDynamicTrendChart(_this.labels);
      _this.getUserInterChart(_this.labels);
      _this.getUserInter(_this.labels);
      _this.getLastSearch(_this.labels);
      _this.download(_this.labels);
      _this.browse(_this.labels);

      _this.getUnionRecommend(_this.labels);
      _this.getNetworkFirstRecom(_this.labels);
      _this.getNetFirstJournalRecom(_this.labels);
      _this.getUserFieldInter(_this.labels);
      _this.getUserJounrnalField(_this.labels);
      if(_this.labels){
        _this.mainData = [];
        _this.getSerachFiledRecom(_this.labels);
         $("#nomore").css("display", "none");
          $("#loadmore").css("display", "none");
      }
     
    }, //搜索查询此处结束

    /*右侧方法开始 */

    //用户动态兴趣标签
    getUserInter() {
      var url =
        "http://recom.cnki.net/api/recommendations/users/union/userinterestsd";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: 10
          }
        })
        .then(res => {
          this.userLabel = res.data;
          var textArr = [];
          for (var key in res.data) {
            res.data[key].forEach(v => {
              textArr.push(v.split(":")[0]);
            });
          }
          this.userLabel = textArr;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //检索记录
    getLastSearch() {
      this.labels = this.labels?this.labels: '3180118163906009968';
      var url = "http://recsys.cnki.net/RCDServiceBeta/api/words/HistorySearchWordsDetail";
      axios
        .get(url, {
          params: {
            userIP: '',
            userID: -1,
            clientID: this.labels,
            top: 10
          }
        })
        .then(res => {
          this.searchData = res.data;
          var searchArr = [];
          for (var key of res.data) {
            searchArr.push(key.Word);
          }
          this.searchData = searchArr;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //下载记录
    download() {
      var url = "http://recom.cnki.net/api/recommendations/userrecord/download";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: 10
          }
        })
        .then(res => {
          if (!res.data.papers) {
            return;
          }
          var downArr = [];
          this.downloadData = res.data.papers;
          for (var i = 0; i < res.data.papers.length; i++) {
            var title = res.data.papers[i].title;
            downArr.push(title);
          }
          this.downloadData = downArr;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //浏览记录
    browse() {
      var url = "http://recom.cnki.net/api/recommendations/userrecord/browse";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: 10
          }
        })
        .then(res => {
          if (!res.data.papers) {
            return;
          }
          this.browseData = res.data.papers;
          var browseArr = [];
          var result = [];
          for (var i = 0; i < res.data.papers.length; i++) {
            var title = res.data.papers[i].title;
            browseArr.push(title);
          }
          this.browseData = browseArr;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*右侧方法开结束*/


    /*左侧方法开始*/

    //文献联合推荐
    getUnionRecommend() {
      var url = "http://recom.cnki.net/api/recommendations/papers/union";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: 50
          }
        })
        .then(res => {
          this.unionPapers = res.data;
          let recomData = res.data.papers.slice(0,10);
          let recomDataArr = [];
          for (let key in recomData) {
            let title = recomData[key].title;
            let author = recomData[key].author;
            let author_inst = recomData[key].author_inst;
            let date = recomData[key].date;
            let summary = recomData[key].summary;
            let citedtimes = recomData[key].citedtimes;
            let downloadedtimes = recomData[key].downloadedtimes;
            let filename = recomData[key].filename;
            recomDataArr.push({
              title,
              author,
              author_inst,
              date,
              summary,
              citedtimes,
              downloadedtimes,
              filename
            });
          }
          this.recomData = recomDataArr;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //网络首发文献推荐
    getNetworkFirstRecom() {
      this.loadingText = true;
      var url = "http://recom.cnki.net/api/recommendations/papers/hot/firstnetpub";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: 50
          }
        })
        .then(res => {
          this.netFirstPapers = res.data;
          let networkData = res.data.papers.slice(0,10);
          let networkDataArr = [];
          for (let key in networkData) {
            let title = networkData[key].title;
            let author = networkData[key].author;
            let author_inst = networkData[key].author_inst;
            let date = networkData[key].date;
            let summary = networkData[key].summary;
            let citedtimes = networkData[key].citedtimes;
            let downloadedtimes = networkData[key].downloadedtimes;
             let filename = networkData[key].filename;
            networkDataArr.push({
              title,
              author,
              author_inst,
              date,
              summary,
              citedtimes,
              downloadedtimes,
              filename
            });
          }
          this.networkData = networkDataArr;
          this.loadingText = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

  //领域论文用户兴趣领域
    getUserFieldInter(){
      var url = "http://recom.cnki.net/api/recommendations/users/interests";
      axios
        .get(url, {
          params: {
            id: this.labels
          }
        })
        .then(res => {
          var data = res.data
          data.forEach(v => {
            console.log(v)
            this.getHotFieldRecom(v);
          })
        })
        .catch(error => {
          console.log(error);
        });
    },

    //领域热门论文
    getHotFieldRecom(v) {
      var url =
        "http://recom.cnki.net/api/recommendations/papers/hot/userrelative";
      axios
        .get(url, {
          params: {
            fieldcode: v.fieldcode,
            top: 50
          }
        })
        .then(res => {
          console.log(res)
          this.fieldPapers = res.data;
          let hotFieldData = res.data.papers.slice(0,10);
          let hotFieldDataArr = [];
          for (let key in hotFieldData) {
            let title = hotFieldData[key].title;
            let author = hotFieldData[key].author;
            let author_inst = hotFieldData[key].author_inst;
            let date = hotFieldData[key].date;
            let summary = hotFieldData[key].summary;
            let citedtimes = hotFieldData[key].citedtimes;
            let downloadedtimes = hotFieldData[key].downloadedtimes;
            let filename = hotFieldData[key].filename;
            hotFieldDataArr.push({
              title,
              author,
              author_inst,
              date,
              summary,
              citedtimes,
              downloadedtimes,
              filename
            });
          }
          this.hotFieldData = hotFieldDataArr;
          console.log(this.hotFieldData)
        })
        .catch(error => {
          console.log(error);
        });
    },

    //全网热门文献
    getHotAllNetRecom() {
      this.loadingHot = true;
      var url = "http://recom.cnki.net/api/recommendations/papers/hot/global";
      axios
        .get(url, {
          params: {
            top: ""
          }
        })
        .then(res => {
          let hotAllNetData = res.data.papers;
          let hotAllNetDataArr = [];
          for (let key in hotAllNetData) {
            let title = hotAllNetData[key].title;
            let author = hotAllNetData[key].author;
            let author_inst = hotAllNetData[key].author_inst;
            let date = hotAllNetData[key].date;
            let summary = hotAllNetData[key].summary;
            let citedtimes = hotAllNetData[key].citedtimes;
            let downloadedtimes = hotAllNetData[key].downloadedtimes;
            let filename = hotAllNetData[key].filename;
            hotAllNetDataArr.push({
              title,
              author,
              author_inst,
              date,
              summary,
              citedtimes,
              downloadedtimes,
              filename
            });
          }
          this.hotAllNetData = hotAllNetDataArr;
          this.loadingHot = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //网络首发期刊推荐
    getNetFirstJournalRecom() {
      var url =
        "http://recom.cnki.net/api/recommendations/journals/hot/firstnetpub";
      axios
        .get(url, {
          params: {
            id: this.labels,
            top: ""
          }
        })
        .then(res => {
          this.interData = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //全网热门期刊
    getHotJounrnalRecom() {
      var url = "http://recom.cnki.net/api/recommendations/journals/hot/global";
      axios
        .get(url, {
          params: {
            top: ""
          }
        })
        .then(res => {
          this.hotJournalData = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

  //期刊用户兴趣领域
  getUserJounrnalField(){
     var url = "http://recom.cnki.net/api/recommendations/users/interests";
      axios
        .get(url, {
          params: {
            id: this.labels
          }
        })
        .then(res => {
          var data = res.data
          data.forEach(v => {
            this.getHotFieldJournalRecom(v);
          })
        })
        .catch(error => {
          console.log(error);
        });
  },

    //领域热门期刊
    getHotFieldJournalRecom(v) {
      this.loadingHot = true;
      var url =
        "http://recom.cnki.net/api/recommendations/journals/hot/userrelative";
      axios
        .get(url, {
          params: {
            fieldcode: v.fieldcode,
            top: ""
          }
        })
        .then(res => {
          this.hotFieldJournalData = res.data;
          this.loadingHot = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //个性化  用户兴趣领域和领域热门词
    getSerachFiledRecom() {
      //let 
      var url = "http://recom.cnki.net/api/recommendations/users/interests";
      axios
        .get(url, {
          params: {
            id: this.labels
          }
        })
        .then(res => {
          var data = res.data
          data.forEach(v => {
            this.getFieldHotWord(v);
          })
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFieldHotWord(v) {
      var url =
        "http://recom.cnki.net/api/recommendations/words/hot/userrelative";
      axios
        .get(url, {
          params: {
            fieldcode: v.fieldcode,
            top: ""
          }
        })
        .then(res => {
          v.childList = res.data
          this.mainData.push(v)
        })
        .catch(error => {
          console.log(error);
        });
    },

    //热门检索词
    getHotWordRecom(){
      var url = "http://recom.cnki.net/api/recommendations/words/hot/global/full";
      axios
        .get(url, {
          params: {
            top: 30
          }
        })
        .then(res => {
          let wordData = res.data
         
         console.log(this.hotKeywordData)
         for(var key in wordData){
            let score = wordData[key].weight;
            wordData[key].score = score;
         }
         this.hotKeywordData = wordData;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //热门研究领域
    getHotSearchRecom(){
      this.rateValue = null;
       var url = "http://recom.cnki.net/api/recommendations/fields/hot/global";
      axios
        .get(url, {
          params: {
            top: 30
          }
        })
        .then(res => {
         var data = res.data;
         for(var i in data){
            //let rate = parseFloat(4(data[i].weight - data[data.length-1].weight)/(data[0].weight - data[data.length-1].weight) +1).toFixed(1) -0 
            let rate = parseFloat(data[i].weight/200000).toFixed(1) - 0;
            data[i].rate = rate;
         }
          this.hotFiledData = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "../../../assets/css/fishBone.css";
@import "../../../assets/css/jqbar.css";
/* @import "../../../assets/css/reset.css"; */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

@media screen and (min-width: 992px) {
  .el-dialog  {
    overflow-y: hidden !important;
  }
}

.rightButton {
  float: right;
  margin-top: -45px;
  margin-right: 5px;
}

.divider {
    margin-top: 10px;
    height: 1px;
}

.div-transparent:before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    width: 80%;
    height: 1px;
    background-image: linear-gradient(to right, transparent, darkgrey, transparent);
}

.div-dot:after {
    content: "";
    position: absolute;
    z-index: 1;
    top: -9px;
    left: calc(50% - 9px);
    width: 18px;
    height: 18px;
    background-color: goldenrod;
    border: 1px solid darkgrey;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px white, 0 0 0 4px white;
}


.nav {
  float: left;
  position: relative;
  left: 30%;
}
.nav ul {
  list-style: none;
}

.nav ul li {
  position: relative;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  cursor: pointer;
}

.nav ul li:first-child {
  color: #ff6600;
}

.area-echarts {
  display: flex;
  margin: 30px auto;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.nav-left-bar {
  width: 130px;
  box-shadow: 0 0 3px #ccc;
  background: #fff;
  margin-right: 10px;
  float: left;
}
.nav-left-bar ul {
  list-style: none;
}

.nav-left-bar ul li {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-left: -29%;
  margin-bottom: 8px;
  margin-top: 8px;
  font-weight: bold;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.active {
  background: #ff6600 !important;
  color: #fff;
}

.nav-left-bar ul li:hover {
  background: #ff6600 !important;
  color: #fff;
}

.isFixed {
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
}

/* 内容区域 */
.content-list {
  flex: 1;
  margin-right: 10px;
  border-top: 2px solid #ff6600;
  height: auto;
}

.content-list ul li .section {
  margin-bottom: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  margin-left: -40px;
}

.section .mainc_hefront {
  position: relative;
  padding-left: 20px;
  padding-top: 12px;
}

.nointerest {
  z-index: 1000;
  width: 180px;
  height: auto;
  position: absolute;
  top: 48px;
  right: 15px;
  background: #fff;
  border: 1px solid #d5dfe6;
  -webkit-box-shadow: 0 3px 6px #d5dfe6;
  box-shadow: 0 3px 6px #d5dfe6;
  border-radius: 2px;
}

.nointerest ul {
  list-style: none;
}

.section .mainc_hefront .nameiconall {
  padding-top: 8px;
}

.section .mainc_hefront .nameiconall .nameiconlist {
  font-size: 18px;
  line-height: 20px;
  color: #333;
  margin-bottom: 8px;
}

.section .mainc_hefront .nameiconall .nameiconlist .nameiconli {
  display: inline-block;
  position: relative;
  margin-right: 34px;
}

.section .mainc_hefront .nameiconall .nameiconlist .nameiconli .namei {
  display: inline;
}

.section .mainc_hefront .nameiconall .maincunit {
  font-size: 12px;
  line-height: 14px;
  color: #999;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.section .section1 {
  padding: 0 24px 12px 20px;
  position: relative;
}

.section .section1 .section1_m h1 {
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  color: #333;
  margin-bottom: 11px;
  margin-top: 15px;
}

.section .section1 .section1_m .s_summary {
  font-size: 15px;
  line-height: 22px;
  color: #333;
  font-weight: 540;
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.section .section1 .section1_m .s_source {
  position: relative;
  font-size: 14px;
  line-height: 15px;
  height: 15px;
  color: #7d8bb3;
  margin-top: 16px;
}

.section .section1 .section1_m .s_source span {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  line-height: 15px;
  color: #999;
}

.section .s_more {
  margin-left: 76px;
  border-top: 1px solid #eee;
  position: relative;
  height: 40x;
  font-size: 14px;
  line-height: 40px;
  color: hsla(0, 0%, 40%, 0.87);
}

.section .s_more div {
  display: inline-block;
}

.section .s_more span {
  margin-right: 24px;
  height: 13px;
  float: right;
  font-size: 12px;
  color: #999;
}

.headertitle {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    height: 50px;
    line-height: 50px;
    font-weight: normal;
    border-bottom: 1px solid #eaeaea;
    background-color:blanchedalmond;
    margin: 0 auto;
    padding-left: 10px;
    box-shadow: 3px 3px 5px #ddd;
}

.el-sort:hover {
  background-color: #E6A23C !important;
  border-color: #E6A23C  !important;
  opacity: 0.8;
}

.content-list ul {
  list-style: none;
}

.content-list ul li {
  height: auto;
}

.load-more {
  width: 100%;
  float: left;
  padding: 5px auto;
  text-align: center;
  background-color: #eee;
  font-size: 16px;
  cursor: pointer;
  margin-left: -40px;
  padding-right: 40px;
}

.loading-text {
  margin-top: 80px;
}

.hot-content {
  flex: 1;
  margin-right: 10px;
  border-top: 2px solid #fd6e0f;
}

.hot-content ul li.hot-content-li .section {
  margin-bottom: 8px;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  margin-left: -40px;
}

.hot-content ul li.hot-content-li {
  height: auto;
}

.hot-content > div {
  width: 100%;
}

.hot-content > div ul {
  list-style: none;
}

.hot-content > div ul li.hot-content-li img {
  width: 60px;
  height: 60px;
  display: inline-block;
  border-radius: 2px;
  float: left;
  margin-right: 20px;
}

.hot-content > div ul li.hot-content-li a.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  height: 36px;
  line-height: 36px;
  display: block;
  overflow: hidden;
}

.hot-content > div ul li.hot-content-li p.time {
  font-size: 12px;
  color: #666;
  display: inline-block;
  margin-left: 20px;
}

.Module-table {
    width: 100%;
    background-color: #fff;
    float: left;
    box-sizing: border-box;
}

.bor-b1de8 {
    border-bottom: 1px dashed #e8e8e8 !important;
}

.c-36 {
    color: #666 !important;
}
.Module-table-head{
  background-color: #eee;
}

.Module-table .Module-table-head li, .Module-table .Module-table-list li, .Module-table .Module-table-lists li, .Module-table .Module-table-heads li {
    padding: 8px 8px;
    box-sizing: border-box;
    word-break: break-all;
}

.Module-table .Module-table-head li, .Module-table .Module-table-heads li {
    color: #666;
    font-size: 16px;
}

.Module-table .Module-table-list {
    border-bottom: 1px dashed #e5e5e5;
}

.Module-table .Module-table-list .col-100  span {
   float: left;
  display: block;
  padding-left: 15px;
  margin-left: 10px;
  /* background: url(../../../assets/img/hotWord_top.gif) no-repeat; */
  background-position: 0  2px;
}

.pagedivid {
  margin: 0;
  padding: 2px auto;
}

.Module-table .Module-table-list li, .Module-table .Module-table-lists li {
    line-height: 27px;
    font-size: 16px;
}

.col-55 {
    float: left;
    width: 5%;
}

.col-220 {
    float: left;
    width: 25%;
    color: #20a0ff;
}

.col-70 {
    float: left;
    width: 10%;
}

.col-88 {
    float: left;
    width: 8%;
}

.col-100 {
    float: left;
    width: 12%;
}

.col-77 {
    float: left;
    width: 40%;
    color: #999;
}

.col-77 > span {
   display: inline-block;
}


/* 右侧区域内容开始 */
.area-echarts .right-content-charts {
  width: 20%;
}

.right-content-charts .a_sec {
  border-top: 1px solid #fa2f2f;
  margin-bottom: 10px;
  background-color: #e8ebed;
  box-shadow: 5px 5px 3px #ccc;
}

.right-content-charts .a_sec h1 {
  height: 50px;
  line-height: 50px;
  padding-left: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.a_sec h4 {
  height: 20px;
  line-height: 0px;
  font-weight: 700;
  color: #333;
  border-bottom: 1px solid #ccc;
  position: relative;
  padding-left: 20px;
}

.a_sec .a_secm2 {
  padding: 0 0 0 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.a_sec .a_secm2 .borderStyle {
  border-bottom: 1px dashed #333;
  padding-bottom: 5px;
}

.a_sec .a_secm2 .borderStyle:hover {
  color: #fd6e0f;
}

.a_sec .a_secm2 p {
  font-size: 14px;
  line-height: 18px;
  color: #333;
  padding: 8px 16px 8px 0;
}

.a_sec .a_secm4 {
  padding-left: 12px;
  border-bottom: 1px solid #ccc;
}
.a_sec .a_secm4 p {
  font-size: 14px;
  font-weight: 500;
  line-height: 35px;
  color: #999;
}

.a_sec .a_secm4 span {
  background: #fff;
  border-radius: 50px;
  margin: 6px 12px 6px 0;
  padding: 5px 10px;
  font-size: 14px;
  color: #242b33;
  display: inline-block;
  cursor: pointer;
}

.content {
  padding: 10px 10px;
}

.righNav {
  position: fixed;
  right: 16px;
  margin-top: 15px;
}

.righNav i {
  font-size: 20px;
  cursor: pointer;
  padding: 7px;
  color: #fff;
  border-radius: 50%;
  background: #e8ebed;
  box-shadow: 0 0 3px #ccc;
}

.righNav i:hover {
  background: #ccc;
}

.userId {
  z-index: 99;
  margin: 0;
  padding: 0;
}

.content div p {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.content div p > span {
  padding-left: 15px;
  color: #303133;
  font-weight: lighter;
  font-size: 14px;
  white-space: normal;
  height: 30px;
  line-height: 30px;
}

.box-card1 {
  font-family: "nunito", sans-serif;
  width: 100%;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  border: 1px solid #eee;
}

.waterfall-col {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  margin-left: -40px;
}

.waterfall {
  column-count: 3;
  column-gap: 0;
}

.waterfall .item {
  box-sizing: border-box;
  break-inside: avoid;
  padding: 10px;
}

.waterfall .item .item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: auto;
  font-size: 18px;
  color: #686868;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 3px 3px 10px rgba(69, 65, 78, 0.8);
}

.item-content h2{
  margin: 0 auto;
  padding: 0;
  color: #333;
  letter-spacing: 5px;
  font-size: 20px;
  width: 100%;
  /* height: 42px; */
  text-align: center;
  background: burlywood;
}

.waterfall .item .item-content ul {
  list-style: none;
}

.waterfall .item .item-content ul li {
  border-bottom: 1px solid #eee;
  padding: 0;
}

.waterfall .item .item-content:hover {
  border: 1px solid #ccc;
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

.el-button:hover {
  color: #ffffff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}

.el-select {
  padding-left: 15px;
}
.el-icon-search {
  text-align: center;
  font-size: 16px;
}

/* 热门词 */
.hotWord_top {
  margin-left: -40px;
}

.hotWord_top h2 {
  font: 16px Arial, Helvetica, sans-serif;
  color: #20a0ff;
  margin: 0 0 12px 0;
  line-height: 150%;
  font-weight: bold;
  display: flex; /*设为伸缩容器*/
  flex-flow: row; /*伸缩项目单行排列*/
}

h2 span:first-child {
  float: left;
  width: 28%;
}

.box_chart_num {
  font-size: 16px;
  color: #20a0ff;
  float: left;
  width: 21%;
}
.hot-percent {
  font-size: 16px;
  float: left;
  width: 30%;
}

.hotWord_top ul {
  list-style: none;
}

.hotWord_top ul li {
  border-bottom: 1px dashed #ddd;
  padding: 0;
  margin-bottom: 10px;
  line-height: 18px;
  display: flex;
}

.clearfix {
  display: block;
}

.hotWord_top ul li div.no {
  float: left;
  font-size: 9px;
  width: 25px;
  text-align: center;
  color: #fff;
}
.hotWord_top ul li div.name {
  float: left;
  width: 28%;
  overflow: hidden;
  color: #20a0ff;
  padding-left: 5px;
}

.hotWord_top ul li span.update {
  overflow: hidden;
  color: #20a0ff;
  float: left;
  width: 20%;
}

.hotWord_top ul li div.stay {
  background-position: 0 -24px;
}

.hotWord_top ul li span.progress {
  float: left;
  width: 60%;
  text-align: center;
  line-height: 14px;
}

.progress  ul.chart--horiz {
    overflow: hidden;
}
 .chart__bar {
    animation-delay: 0.7s;
}

.chart__bar[data-skill='95'] {
    width: 60%;
}

.progress  ul.chart--horiz .chart__bar {
    height: 18px;
    /* margin-bottom: 10px; */
    background: linear-gradient(to left, #4CB8C4, #3CD3AD);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    /* opacity: 0; */
    animation: 1s anim-lightspeed-in ease forwards;
}

@keyframes anim-lightspeed-in {
    0% {
        /* transform: translateX(-200%); */
        opacity: 1;
        width: 0
    }
    100% {
        /* transform: translateX(0); */
        opacity: 1;
        width: 60%
    }
}
.chart__label {
    padding-left: 10px;
    line-height: 20px;
    color: white;
}


.hotWord_top ul li div.up,
.hotWord_top ul li div.down,
.hotWord_top ul li div.stay {
  color: #999;
  width: 20px;
  float: left;
  display: block;
  font-size: 9px;
  padding-left: 15px;
  /* background: url(../../../assets/img/hotWord_top.gif) no-repeat; */
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

/* 期刊 */
.block {
  display: block;
}

.qk_head_box .qk_img {
  width: 234px;
  height: 343px;
  float: left;
  margin-right: 34px;
  position: relative;
}

.qk_head_box .qk_img img {
    width: 216px;
    height: 290px;
    border: 9px solid rgba(255,255,255,0.15);
    padding-top: 10px;
}

img {
    vertical-align: top;
}

.qk_head_box .qk_info {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
  padding-left: 270px;
  border-radius: 5px;
}

.qk_head_box .qk_info  h1 {
  display: inline-block;
  font-size: 25px;
  color: #333;
  font-weight: 400;
  background-color: #eee;
  width: 100%;
}

.hot-content .qk_head_box .qk_img {
  width: 234px;
  height: 343px;
  float: left;
  margin-right: 34px;
  position: relative;
}

.hot-content .qk_head_box .qk_img img {
    width: 216px;
    height: 290px;
    border: 9px solid rgba(255,255,255,0.15);
    padding-top: 10px;
}


.qk_head_box .qk_info .info_box {
  padding: 0 0 10px;
}

.qk_head_box .qk_info .info_box span:nth-child(odd) {
  margin-right: 50px;
}
.qk_head_box .qk_info .info_box span:nth-child(even) {
  margin-right: 50px;
}

.qk_head_box .qk_info .info_box span {
  line-height: 20px;
  display: inline-block;
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333;
  margin-left: 10px;
}

.qk_head_box .qk_info .info_box span label {
  font-size: 14px;
  display: inline-block;
  width: 62px;
  text-align: right;
  color: #333;
  margin-right: 6px;
}

/* 个性化  关键词 */

.key_section {
  width: 100%;
  height: 100%;
}

.keyword_content {
  width: 100%;
  height: 600px;
}

.input_area {
  width: 100%;
}

.input_area > .el-input {
  width: 100%;
  background-clip: #2200ee;
}

.input_area h4 {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px dashed #fd6e0f;
}

.input-with-select {
  z-index: 2;
}
.fishBone .wrapper .bd {
    /* overflow: hidden; */
    overflow-x: auto;
    overflow-y: hidden;
}

</style>
