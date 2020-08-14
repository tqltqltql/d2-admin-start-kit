// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

import { d2CrudPlus } from 'd2-crud-plus'
import d2CrudX from 'd2-crud-x'
import { request } from '@/api/service'
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pUploader, D2pDemoExtend } from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
// 核心插件
Vue.use(d2Admin)

Vue.use(d2CrudX, { name: 'd2-crud' })
// 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  getRemoteDictFunc (url, dict) {
    // 此处配置你的字典http请求方法
    // 实际使用请改成request
    return request({
      url: url,
      data: dict.body,
      method: 'get'
    }).then(ret => {
      return ret.data
    })
  },
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: {
            current: 'current',
            size: 'size'
          },
          response: {
            current: 'number', // 当前页码 ret.data.current
            size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'totalElements', // 总记录数 ret.data.total
            records: 'content' // 列表数组 ret.data.records
          }
        }
      },
      pageOptions: {
        compact: true
      },
      options: {
        size: 'small'
      },
      formOptions: {
        defaultSpan: 12 // 默认的表单 span
      },
      viewOptions: {
        disabled: false,
        componentType: 'row' // 【form,row】 表单组件 或 行组件展示
      },
      rowHandle: {
        width: 260,
        view: {
          show: true
        },
        edit: {
          type: 'primary'
        }
      }
    }
  }
})

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor, {
  ueditor: {
    serverUrl: '/api/ueditor/'
  }
})
Vue.use(D2pDemoExtend)
Vue.use(D2pFileUploader)
Vue.use(D2pUploader, { // 上传全局配置参数，具体配置参考[d2p-uploader]
  defaultType: 'form',
  form: { // 本地服务端上传
    action: process.env.VUE_APP_API + '/platform/upload', // 上传url
    name: 'file', // 上传时文件的参数名
    data: {}, // 上传附加参数
    headers: {}, // 上传请求头
    successHandle (res) { // 上传成功后，后台返回结果处理
      console.log(12341234)
      console.log(res)
      console.log(12341234)
      return { url: res.data } // data是该文件的url
    }
  },
  alioss: {},
  cos: {},
  qiniu: {}
})
// Vue.use(D2pUploader, {
//   defaultType: 'cos',
//   cos: {
//     domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
//     bucket: 'd2p-demo-1251260344',
//     region: 'ap-guangzhou',
//     secretId: '', //
//     secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
//     getAuthorization  (custom) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
//       return request({
//         url: '/upload/cos/getAuthorization',
//         method: 'get'
//       }).then(ret => {
//         // 返回结构如下
//         // ret.data:{
//         //   TmpSecretId,
//         //   TmpSecretKey,
//         //   XCosSecurityToken,
//         //   ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
//         // }
//         return ret.data
//       })
//     }
//   },
//   alioss: {
//     domain: 'https://d2p-demo.oss-cn-shenzhen.aliyuncs.com',
//     bucket: 'd2p-demo',
//     region: 'oss-cn-shenzhen',
//     accessKeyId: '',
//     accessKeySecret: '',
//     getAuthorization  (custom, context) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
//       return request({
//         url: '/upload/alioss/getAuthorization',
//         method: 'get'
//       }).then(ret => {
//         return ret.data
//       })
//     },
//     sdkOpts: { // sdk配置
//       secure: true // 默认为非https上传,为了安全，设置为true
//     }
//   },
//   qiniu: {
//     bucket: 'd2p-demo',
//     getToken (custom) {
//       return request({
//         url: '/upload/qiniu/getToken',
//         method: 'get'
//       }).then(ret => {
//         return ret.data // {token:xxx,expires:xxx}
//       })
//     },
//     domain: 'http://d2p.file.veryreader.com'
//   },
//   form: {
//     action: process.env.VUE_APP_API + 'upload/form/upload',
//     name: 'file'
//   }
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
