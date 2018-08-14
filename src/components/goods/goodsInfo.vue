<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div v-if="goods.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                               <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path"/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                            </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="count" :min="1" :max="goods.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div  id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isShowIntroduction=true" :class="{ selected: isShowIntroduction}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="isShowIntroduction=false" :class="{selected: !isShowIntroduction}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                                <div v-html="goods.goodsinfo.content"></div>
                            </div>
                            <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textAreaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentInfo.length===0"style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentInfo.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 4, 6, 10]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsInfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsInfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <transition @before-enter="beforeenter" @enter="enter" @after-enter="afterenter">
            <div ref="animateRef" v-if="goods.imglist" v-show="isShow" class="animateDiv">
                <img :src="goods.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

    <script>
import "../../static/site/js/jqimgzoom/js/magnifier.js";
//按需导入
import { Affix } from "iview";
export default {
  data() {
    return {
      goods: {},
      count: 1,
      pageIndex: 1,
      pageSize: 2,
      commentInfo: {},
      isShowIntroduction: true,
      isShow: false,
      addToShopCartOffset: null, //动画开始时候的top、left
      shoppingCartCountOffset: null //动画结束时候的top、left
    };
  },
    components: {
      //局部注册的组件，就是我们goodsinfo.vue的子组件
      Affix
    },
  created() {
    this.getgoodsInfo();
    this.getcommentInfo();
  },
  updated() {
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
  },
  watch: {
    $route: function(newValue) {
      this.getgoodsInfo();
      this.getcommentInfo();
    }
  },
  methods: {
    getgoodsInfo() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
      this.$axios.get(url).then(res => {
        this.goods = res.data.message;
    //    console.log(res.data.message)
        setTimeout(() => {
          //获取动画开始时候的位置，并且把它保存起来
          this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset();
          //让图片移动到开始位置
          $(this.$refs.animateRef).css(this.addToShopCartOffset);

          //获取动画结束时候的位置，并且把它保存起来
          this.shoppingCartCountOffset = $("#shoppingCartCount").offset();
        }, 200);
      });
    },
    getcommentInfo() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(res => {
        this.commentInfo = res.data;
        // console.log(res.data);
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getcommentInfo();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getcommentInfo();
    },
    submitComment() {
      const content = this.$refs.textAreaRef.value;
      if (content.trim().length === 0) {
        this.$message({
          message: "请填写评论!!!",
          type: "warning"
        });
        return;
      }
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;
      this.$axios.post(url, { commenttxt: content }).then(res => {
        this.$message({
          message: "评论成功!!!",
          type: "success"
        });
        //清空那个文本域的文字
        this.$refs.textAreaRef.value = "";
        this.pageIndex = 1;
        this.getcommentInfo();
        
      });
    },
    addToShopCart() {
      //加入到购物车
      this.isShow = true;
      //调用Vuex的mutations方法
      //载荷就是参数
      const goods = {
        goodsId: this.$route.params.goodsId,
        count: this.count
      };

      this.$store.commit("addGoods", goods);
    },
    beforeenter: function(el) {
      el.style.top = `${this.addToShopCartOffset.top}px`;
      el.style.left = `${this.addToShopCartOffset.left}px`;
      el.style.transform = "scale(1)";
    },
    enter: function(el, done) {
      el.style.transition = "all .6s";

      //刷新动画帧
      el.offsetWidth;

      //设置结束位置
      el.style.top = `${this.shoppingCartCountOffset.top}px`;
      el.style.left = `${this.shoppingCartCountOffset.left}px`;
      el.style.transform = "scale(0.5)";
      done();
    },
    afterenter: function(el) {
      this.isShow = false;
    }
  }
};
</script>
    <style scoped>
@import "../../static/site/js/jqimgzoom/css/magnifier.css";
.animateDiv {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
}

.animateDiv img {
  width: 100%;
  height: 100%;
}
</style>
