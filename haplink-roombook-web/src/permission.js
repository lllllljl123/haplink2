import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register','/thirdPlatLogin']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => {
          isRelogin.show = false
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            let path = '';
            path = accessRoutes[0].path + '/' + accessRoutes[0].children[0].path //获取第一路由路径

            console.log("path=" + path);

            if (accessRoutes[0].children[0].query !== undefined) { //如果当前路由存在路由参数，则带入
              let query = JSON.parse(accessRoutes[0].children[0].query);
              let temp = '';
              for (const val in query) {
                if (temp.length === 0) {
                  temp = "?";
                } else {
                  temp = temp + "&";
                }
                temp = temp + val + "=" + query[val];
              }
              path = path + temp;
            }
            // if (from.path === '/login' || from.path === '/thirdPlatLogin' || from.path === '/') {
            if (from.path === '/login' || from.path === '/thirdPlatLogin') {
              next({path, replace: true}) // hack方法 确保addRoutes已完成
            } else {
              next({...to, replace: true}) // hack方法 确保addRoutes已完成
            }
          })
        }).catch(err => {
            store.dispatch('LogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
