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
      selectType: 1
   },

   /**
    * 组件的方法列表
    */
   methods: {
      filterRatings: function(e){
         let ratings = this.properties.ratings
         let selectType = e.target.dataset.index
         if(selectType == 0 || selectType == 1){
            var a = ratings.filter(item => {
               return item.rateType == selectType
            });
         }
         
         this.setData({
            selectType
         })
         console.log(a)
      }
   }
})