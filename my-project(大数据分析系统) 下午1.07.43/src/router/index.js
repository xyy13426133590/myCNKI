import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CitesPrec from '@/components/contents/CitesPrec'
import LawPrec from '@/components/contents/laws/LawPrec'
import MultiPrec from '@/components/contents/laws/MultiPrec'
import SimRuleCheck from '@/components/contents/SimRuleCheck'
import PerRecomd from '@/components/contents/pre/PerRecomd'
import PerExample from '@/components/contents/pre/PerExample'
import UserInterField from '@/components/contents/pre/UserInterField'
import NoveltyRanking from '@/components/contents/NoveltyRanking'
import MutilSort from "@/components/contents/autom/MutilSort";
import SimpleSort from "@/components/contents/autom/SimpleSort";
import PreLoadIndex from "@/components/contents/index/PreLoadIndex";
import CiteQualInspec from "@/components/contents/CiteQualInspec";
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      component: Home,
      redirect: '/SimpleSort',//默认跳转到推荐页面
      //hidden: true,
      iconCls: 'el-iconkeyboard',
      leaf: true,//只有一个节点
      children: [
      { path: '/citesPrec', component: CitesPrec, name: '引用量预测',meta: {keepAlive: false}}
      ]
    },

    {
      path: '/',
      component: Home,
      redirect: '/SimpleSort',//默认跳转到推荐页面
      //hidden: true,
      iconCls: 'el-iconzhiliangjiance',
      leaf: true,//只有一个节点
      children: [
        { path: '/citeQualInspec', component: CiteQualInspec, name: '文本质量检测',meta: {keepAlive: false}}
      ]
    },

    {
      path: '/',
      component: Home,
      redirect: '/SimpleSort',//默认跳转到推荐页面
      //hidden: true,
      iconCls: 'el-iconpaixu',
      leaf: true,//只有一个节点
      children: [
        { path: '/noveltyRanking', component: NoveltyRanking, name: '新颖度排序',meta: {keepAlive: false}}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '自动文本分类',
      redirect: '/SimpleSort',//默认跳转到推荐页面
      iconCls: 'el-iconzidongshengcheng',
      children: [
        { path: '/mutilSort', component: MutilSort, name: 'Force力导向图', hidden: true, meta: {keepAlive: false}},
        { path: '/simpleSort', component: SimpleSort,  name: '单文本分类',meta: {keepAlive: false}}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '载文量标引预测',
      redirect: '/PreLoadIndex',//默认跳转到推荐页面
      iconCls: 'el-iconbiaoji1',
      children: [
        { path: '/preLoadIndex', component: PreLoadIndex,  name: '载文量文本预测',meta: {keepAlive: false}}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '法律文本预测',
      redirect: '/SimpleSort',//默认跳转到推荐页面
      iconCls: 'el-iconA',
      //hidden: true,
      meta: { title: '法律文本预测' },
      children: [
        { path: '/multiPrec', component: MultiPrec, name: '批量化文本预测',meta: {keepAlive: false}},
        { path: '/lawPrec',   component: LawPrec, name: '单文本预测',meta: {keepAlive: false}}
      ]
    },
    {
      path: '/',
      component: Home,
      //hidden: true,
      redirect: '/SimpleSort',//默认跳转到推荐页面
      iconCls: 'el-iconbook',
      leaf: true,//只有一个节点
      children: [
        { path: '/simRuleCheck', component: SimRuleCheck, name: '相似法规审查',meta: {keepAlive: false}},

      ]
    },
    {
      path: '/',
      name: '个性化推荐',
      redirect: '/SimpleSort',//默认跳转到推荐页面
      component: Home,
      //hidden: true,
      meta: { title: '个性化推荐' },
      iconCls: 'el-icongexinghuatuijian',
      children: [
        { path: '/perRecomd', component: PerRecomd, name: '个性化推荐接口说明'},
        { path: '/perExample', component: PerExample, name: '个性化推荐接口示例'},
        { path: '/userInterField', component: UserInterField, hidden: true, name: '用户兴趣领域'}
      ]
    }
  ]
})

