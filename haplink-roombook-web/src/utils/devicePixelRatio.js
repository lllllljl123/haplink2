class DevicePixelRatio {
  constructor() {

  }
  // 获取系统类型
  _getSystem() {

    var agent = navigator.userAgent.toLowerCase();
    //var isMAC = /macintosh|mac os x/i.test(navigator.userAgent);
    //if(isMac) {
    //return false;
    //}
    // 现只针对Windows处理，其它系统暂无该情况，如有，继续在此添加
    if (agent.indexOf('windows') >= 0) {
      return true;
    }
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
    document.getElementsByTagName('body')[0].style.zoom = 1 / window.devicePixelRatio

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
    if (t._getSystem()) {
      t._correct();
      // 开启监听页面缩放
      t._watch();
    }

  }
}
export default DevicePixelRatio;
