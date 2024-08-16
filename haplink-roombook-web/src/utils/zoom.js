class ZoomRatio {
  constructor() {
    // this.flag = false;
  }

  // 监听方法兼容写法
  _addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  }
  // 校正浏览器缩放比例
  _correct() {
    let t = this;
    // 当前页面屏幕分辨率
    let width = document.documentElement.clientWidth
    let defaultZoom = 1
    // 屏幕宽度小于1281时候，进行缩小0.9，否则保持不变
    width < 1281 ? defaultZoom = 0.9 : defaultZoom = 1
    document.getElementsByTagName('body')[0].style.zoom = defaultZoom ;


  }
  // 监听页面缩放
  _watch() {
    let t = this;
    t._addHandler(window, 'resize', function() { // 注意这个方法是解决全局有两个window.resize
      // 重新校正
      t._correct()
    })
  }
  // 初始化页面比例
  init() {
    let t = this;
    // 初始化页面校正浏览器缩放比例
    t._correct();
    // 开启监听页面缩放
    t._watch();
  }
}
export default ZoomRatio;
