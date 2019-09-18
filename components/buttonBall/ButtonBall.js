// components/buttonBall/ButtonBall.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      count: Number,
      name: String,
      price: Number,
      food: Object,
      chooseFood: Array
   },

   /**
    * 组件的初始数据
    */
   data: {
      count: 0
   },
   observers: {
      'chooseFood,name': function(chooseFood,name) {
         chooseFood.forEach(food=>{
            if(name === food.name){
               this.setData({
                  count: food.count
               })
            }
         })
      }
    },
   /**
    * 组件的方法列表
    */
   methods: {
      addCount: function(){
         this.triggerEvent('add',this.properties.food)
         this.upDatedCount()
      },
      reduceCount: function(){
         this.triggerEvent('reduce',this.properties.food)
         this.upDatedCount()
         
      },
      upDatedCount: function(){
         this.properties.chooseFood.forEach(food => {
            if(food.name === this.properties.food.name){
               this.setData({
                  count: food.count
               })
            }
         });
      }
   }
})
