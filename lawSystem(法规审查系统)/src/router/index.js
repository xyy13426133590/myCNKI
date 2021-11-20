import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SingelQueryResult from '@/components/SingelQueryResult'
import MutilQueryResult from '@/components/MutilQueryResult'
import DocShow  from "@/components/DocShow";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/mutilQueryResult',
      component: MutilQueryResult,
      name: 'MutilQueryResult',
      meta: {
        //keepAlive: true,
        //isUseCache: false
        // noCache: false
      }
    },
    {
      path: '/singelQueryResult',
      component: SingelQueryResult,
      name: 'SingelQueryResult',
      meta:{
        //keepAlive: false,
      }
    },
    {
      path: '/docShow',
      component: DocShow,
      name: 'DocShow'
    }
  ]
})

