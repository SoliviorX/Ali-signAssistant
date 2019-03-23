Page({
  data: {},
  onLoad(option) {
    this.setData({
      imgsrc: option.Photo,
      title: option.Name,
      hot: option.hot,
    })
  },

});
