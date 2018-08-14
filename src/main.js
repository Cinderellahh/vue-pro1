//装了vue之后引入
import Vue from 'vue'
//引入vue-router
import VueRouter from "vue-router"
import moment from "moment"
import ElementUI from "element-ui"
import VueLazyload from 'vue-lazyload'
import Vuex from "vuex"
//集成中间件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueLazyload, {
    preLoad: 0.3,
    // error: './static/site/images/1.gif',
    loading: require('./static/site/images/01.gif'),
    attempt: 1
  })
Vue.use(Vuex)
//导入根组件
import App from './App.vue'
//引入axios发送请求获取数据
//这句代码是发送请求的时候每个页面都要引入,所以封装起来,封装的方法是把这个挂到Vue原型中
import axios from "axios";
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://47.106.148.205:8899/"
//这个是引入的是整个页面的样式,全局样式
//轮播图
import 'element-ui/lib/theme-chalk/index.css'
import './static/site/css/style.css'

//过滤日期
Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
    return moment(input).format(formatStr)
})
// Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
// return moment(input).format(formatStr)
// })
//引入组件
import goodslist from './components/goods/goodslist'
import shopcart from './components/shopcart/shopcart'
import goodsInfo from './components/goods/goodsInfo'
import login from './components/login/login'
import order from './components/order/order'
import {
    getLocalGoods,
    getTotalCount,
    addLocalGoods,
    updateLocalGoods,
    deleteLocalGoods
} from './common/localStorageHepler'
//new一个路由
const router=new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/shopcart',component:shopcart},
        {path:'/goodsInfo/:goodsId',component:goodsInfo},
        {path:'/login',component:login},
        // 编程式导航路由规则不需要设置动态路由参数
        {path:'/order',component:order,meta:{needlogin:true}}
    ]
})
//导航守卫,因为是基于路由的,路由是这个页面引的所有就要在这个页面用
router.beforeEach((to, from, next) => {
    //判断全名中不包含login的话就就保存到本地
    // console.log(to.fullPath)
    if(to.fullPath!='/login'){
        localStorage.setItem('visitedhistory',to.fullPath)
    }
    //判断登录要调用接口,判断路径中有没有needlogin,如果有就发请求判断
    if(to.meta.needlogin){
        //判断如果需要登录那么就发送请求去验证有没有登录
        axios.get(`site/account/islogin`).then(res=>{
            console.log(res)
            if(res.data.code==='nologin'){
                router.push('login')
            }else {
                next()
            }
        })

    }else{
        //如果没有就说明不需要登录,就直接next
        next()
    }
  })
//创建一个新的仓库
const store = new Vuex.Store({
    state:{
        buyCount:getTotalCount()
    },
    getters:{
        //获取商品总数
        getBuyCount(state){
            return state.buyCount
        },
        getLocalGoods(state){
            return getLocalGoods()
        }
    },
    mutations: {
        /**
         * 新增商品
         * 
         * @param {*} state 指的就是核心概念state，必须是第一个参数
         * @param {*} goods 载荷
         */
        addGoods(state,goods){
            console.log(goods)
            state.buyCount=addLocalGoods(goods)
        },
        changenumber(state,goods){
            state.buyCount=updateLocalGoods(goods)
        },
        deletegoods(state,goods){
            state.buyCount=deleteLocalGoods(goods)
        }
    }
  })

//new一个vue实例
new Vue({
    el:'#app',
    router,
    store,
    render:function(createElement){
        return createElement(App)
    }
})
