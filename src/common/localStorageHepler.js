const KEY="goods"
export const getLocalGoods=()=>{
    return JSON.parse(localStorage.getItem(KEY)||"{}")
}
//暴露出去
export const getTotalCount=()=>{
    //获取本地的商品信息
    const localGoods=getLocalGoods()
    //定义总的数量
    let totalCount=0
    //遍历
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }
    return totalCount
}

//按需导入
export const addLocalGoods=goods=>{
    //先查一下本地存储中有没有
    const localGoods=getLocalGoods()
    //如果有
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId]+=goods.count
    }else{
        localGoods[goods.goodsId]=goods.count
    }
    //保存到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    //返回商品的总数
    return getTotalCount()
}

export const updateLocalGoods=goods=>{
    //先查一下内存
    const localGoods=getLocalGoods()
    //直接改
        localGoods[goods.goodsId]=goods.count
    //保存到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    //返回商品的总数
    return getTotalCount()
}
export const deleteLocalGoods=goods=>{
    //先从本地查出来
    const localGoods=getLocalGoods()
    delete localGoods[goods]
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getTotalCount()
}