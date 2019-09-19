import {
   ratings
} from "../../data"

// components/ratings/Ratings.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      ratings: Array,
      seller: Object
   },

   /**
    * 组件的初始数据
    */
   data: {
      selectType: '2',
      _ratings: ratings,
      likeNum: 0,
      dislikeNum: 0,
      onlyContent: false
   },
   /**
    * 组件的生命周期
    */
   lifetimes: {
      attached: function () {
         // 在组件实例进入页面节点树时执行
         this.rateTypeNum()
      }
   },
   /**
    * 数据监听
    */
   observers: {
      'selectType, onlyContent': function (selectType, onlyContent) {
         // 在 selectType 或者 onlyContent 被设置时，执行这个函数
         this.ratingsList(selectType, onlyContent)
      }
   },
   /**
    * 组件的方法列表
    */
   methods: {

      //切换评价类型
      filterRatings: function (e) {
         this.setData({
            selectType: e.currentTarget.dataset.id
         })
      },
      //切换是否只看有内容的评价
      ratingsContentFilter: function () {
         this.setData({
            onlyContent: !this.data.onlyContent
         })
      },
      //修改展示评论列表
      ratingsList: function (selectType, onlyContent) {
         let ratings = this.properties.ratings
         //根据选中按钮筛选评论类型
         if (selectType == 1) {
            ratings = ratings.filter(item => item.rateType == 1)
         }
         if (selectType == 0) {
            ratings = ratings.filter(item => item.rateType == 0)
         }
         //是否只看有内容
         if (onlyContent) {
            ratings = ratings.filter(item => item.text)
         }
         this.setData({
            _ratings: ratings,
         })
      },
      //获取评价类型数量
      rateTypeNum: function () {
         let ratings = this.properties.ratings
         let likeNum = 0
         let dislikeNum = 0
         ratings.forEach(item => {
            if (item.rateType == 0) {
               likeNum = likeNum + 1
            } else if (item.rateType == 1) {
               dislikeNum = dislikeNum + 1
            }
         })
         this.setData({
            likeNum,
            dislikeNum
         })
      },

   },


})