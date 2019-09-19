// components/starScore/StarScore.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      score: Number,
      size: Number
   },

   /**
    * 组件的初始数据
    */
   data: {
      starItems: []
   },
   /**
    * 生命周期
    */
   lifetimes: {
      attached: function() {
        // 在组件实例进入页面节点树时执行
        this.starItems()
      }},
   /**
    * 组件的方法列表
    */
   methods: {
      starItems() {
         let starCount = 5
         let num = Math.floor(this.properties.score * 2) / 2
         let result = []
         for (var i = 0; i < starCount; i++) {
             if (i < Math.floor(num)) {
                 result.push('on')
             } else if (i === Math.floor(num) && i < num) {
                 result.push('half')
             } else {
                 result.push('off')
             }
         }
         this.setData({
            starItems: result
         })

     }
   }
})