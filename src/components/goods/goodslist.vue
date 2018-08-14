<template>
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subcates in item.subcates" :key="subcates.id">
                                                {{subcates.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="subcates in item.subcates" :key="subcates.id">{{subcates.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>                             
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                 <el-carousel :interval="5000" height="341px" arrow="always">
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>                         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodslist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                        <ul class="img-list">
                            <li v-for="subitem in item.datas" :key="subitem.artID">
                                <router-link :to="'/goodsinfo/'+subitem.artID" class="">
                                     <div class="img-box">
                                        <img v-lazy="subitem.img_url">
                                    </div> 
                                    <div class="info">
                                        <h3>{{subitem.artTitle}}</h3>
                                        <p class="price">
                                            <b>{{subitem.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存{{subitem.stock_quantity}}</strong>
                                            <span>市场价：
                                                <s>{{subitem.market_price}}</s>
                                            </span>
                                        </p>
                                    </div> 
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>      
</div>
</template>

<style scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
    <script>
   
export default {
  data() {
    //data必须return一个对象
    return {
      goodsData: {},
      goodslist: []
    };
  },
  //    声明周期钩子
  created() {
    // 在这里面调用
    this.getgoodslist() 
    this.getcartlist()
  },
  methods: {
    //这个里面发送请求
    getgoodslist() {
      const url = "site/goods/gettopdata/goods";
      //axios设置成全局的就可以在每个页面直接使用
      this.$axios.get(url).then(res => {
        // console.log(res.data);
        this.goodsData = res.data.message;
      });
    },
    getcartlist() {
      const url = "site/goods/getgoodsgroup";
      this.$axios.get(url).then(res => {
        // console.log(res.data);
        this.goodslist = res.data.message;
      });
    }
  }
};
</script>
    