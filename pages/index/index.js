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
    supportsClassMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    currentIndex: 1,
    typeIndex: 0,
    lastActive: 0,
    toView: 0,
    heightArr: [],
    scrollTop: 0,
    isDetailShow: false
  },
  newData: function () {
    this.setData({
      seller,
      goods,
      ratings
    })
  },
  /*  修改点击事件对象  */
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
    for (var i = 0; i < this.data.goods.length; i++) {
      height = height + 26 + this.data.goods[i].foods.length * 96 - 1
      heightArr.push(height)
    }
    this.setData({
      heightArr
    })
  },
  /* 
   右边商品滚动切换左边商品类型 
  */
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
  showDetail: function() {
    this.setData({
      isDetailShow: true
    })
  },
  closeDetail: function() {
    this.setData({
      isDetailShow: false
    })
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