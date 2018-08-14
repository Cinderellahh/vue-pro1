<template>
    <div>
        <div @click="subNumber" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="addNumber" class="right">+</div>
    </div>
</template>
<style scoped>
.left,
.middle,
.right {
    display:inline-block;
    width:30px;
    height:30px;
    text-align: center;
    line-height: 30px;
    border:1px solid rgba(92, 92, 92, .3)
}
</style>
<script>
export default {
    props:{
        initCount:{
            type:Number,
            default:100
        },
        goodsId:Number
    },
    data(){
        return {
            count:1
        }
    },
    created(){
        this.count=this.initCount
    },
    methods:{
        subNumber(){
            if(this.count<=1) 
            this.count--
            this.notify()
        },
        addNumber(){
            this.count++
            this.notify()
        },
        notify(){
            const goods={
                goodsId:this.goodsId,
                count:this.count
            }
            this.$emit('numberChange',goods)
        }
    }

}
</script>

