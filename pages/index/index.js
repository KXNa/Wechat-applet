//index.js
//获取数据
const {
  seller,
  goods,
  ratings
} = require('../../data.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seller: [],
    goods: [],
    ratings: [],
     //图标名字
     supportsClassMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    //导航栏自定义下标值
    currentIndex: 1,
    //商品分类栏下标值
    typeIndex: 0,
    toView: 0,
    //商品数组高度
    heightArr: [],
    //是否显示商品详情页
    isDetailShow: false,
    //被点击的商品
    food: {},
    //被选中的商品数组
    chooseFood: [],
    //是否隐藏购物车详情列表
    isGoodListHidden: true,
    //商品总价格
    allPrice: 0
  },
  newData: function () {
    this.setData({
      seller,
      goods,
      ratings
    })
  },
  //切换导航栏
  navActive: function (e) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
  },
  // 点击左边商品类别滚动到右边对应商品
  typeIndexChange: function (e) {
    this.setData({
      typeIndex: e.currentTarget.dataset.index,
      toView: e.currentTarget.dataset.id
    })
  },
  //获取并记录每项产品类型数组高度（右侧商品高度）
  getHeightArr: function () {
    var height = 0
    var heightArr = []
    var good = this.data.goods
    for (var i = 0; i < good.length; i++) {
      height = height + 26 + good[i].foods.length * 96 - 1
      heightArr.push(height)
    }
    this.setData({
      heightArr
    })
  },

  //右边商品滚动切换左边商品类型 
  scroll: function (e) {
    var scrollTop = e.detail.scrollTop
    var scrollArr = this.data.heightArr
    if (scrollTop > scrollArr[scrollArr.length - 1]) {
      return;
    } else {
      for (var i = 0; i < scrollArr.length - 1; i++) {
        if (scrollTop < scrollArr[0]) {
          this.setData({
            typeIndex: 0
          })
        } else if (scrollTop >= scrollArr[i] && scrollTop < scrollArr[i + 1]) {
          this.setData({
            typeIndex: i + 1
          })
        }
      }
    }
  },
  //展示详情页，并传递所点击的商品对象
  showDetail: function (e) {
    this.setData({
      isDetailShow: true,
      food: e.currentTarget.dataset.food
    })
  },
  //关闭详情页
  closeDetail: function () {
    this.setData({
      isDetailShow: false
    })
  },
  //点击添加按钮
  add: function (e) {
    this.upDatedChooseFood(e)
  },
  //点击添加时更新所选商品数组
  upDatedChooseFood: function (e) {
    //遍历所选商品数组，判断新选中商品是否存在，存在数量+1，不存在添加新商品
    let chooseFood = this.data.chooseFood
    if (chooseFood.length > 0) {
      let bool = true;
      for (var food of chooseFood) {
        if (food.name == e.detail.name) {
          food.count = food.count + 1
          food.price = food.price + (food.price / (food.count - 1))
          bool = false
        }
      }
      if (bool) {
        chooseFood.push({
          name: e.detail.name,
          price: e.detail.price,
          count: 1
        })
      }
    } else {
      chooseFood.push({
        name: e.detail.name,
        price: e.detail.price,
        count: 1
      })
    }
    this.totalPrice(chooseFood)
    // console.log("add",this.data.chooseFood)
  },
  //点击减少按钮，更新数组
  reduce: function (e) {
    let chooseFood = this.data.chooseFood
    chooseFood.forEach(food => {
      if (food.name === e.detail.name) {
        food.count = food.count - 1
        food.price = food.price - (food.price / (food.count + 1))
      }
    });
    this.setData({
      chooseFood
    })
    let newChooseFood = this.data.chooseFood
    this.filterChooseFood(newChooseFood)
  },
  //过滤所选商品数组
  filterChooseFood: function (e) {
    let chooseFood = e
    chooseFood = chooseFood.filter(food => {
      return food.count != 0
    })
    this.totalPrice(chooseFood)

  },
  //选购商品总价
  totalPrice: function (e) {
    let chooseFood = e
    let allPrice = 0
    if (chooseFood.length > 0) {
      for (var i = 0; i < chooseFood.length; i++) {
        allPrice = allPrice + chooseFood[i].price
      }
    }
    this.setData({
      allPrice,
      chooseFood
    })
  },
  //清除所选商品
  clearChooseFood: function () {
    this.setData({
      chooseFood: [],
      isGoodListHidden: true
    })
    let chooseFood = this.data.chooseFood
    this.filterChooseFood(chooseFood)
  },
  //展示所选商品列表
  showGoodList: function () {
    if (this.data.chooseFood.length > 0) {
      this.setData({
        isGoodListHidden: !this.data.isGoodListHidden
      })
    }
    return
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newData()
    this.getHeightArr()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})