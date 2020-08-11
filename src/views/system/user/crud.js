// import { GetOrgList } from './api'
export const crudOptions = (vm) => { // vm即this
  return {
    format: {
      flatData: {
        disabled: false, // 启用数据扁平化
        symbol: '#', // 默认使用#号连接(不能用.号)， key需要配置成 user#gender
        deleteOnUnFlat: true // 是否在反扁平化后清理扁平化过的痕迹，默认true
      }
    },
    columns: [
      {
        title: '姓名',
        key: 'userName',
        search: { // 查询配置，默认启用查询
          // disabled: true // 【可选】true禁止查询,默认为false
        },
        form: { // form表单的配置
          rules: [{ required: true, message: '请输入姓名' }]
        }
      },
      {
        title: '账户',
        key: 'realName',
        search: {
          disabled: true
        }, // 启用查询
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [{ required: true, message: '请输入名称' }]
        }
      },
      {
        title: '机构',
        key: 'sysOrg#orgName',
        sortable: true,
        search: { disabled: true },
        type: 'select',
        dict: {
          url: '/platform/getOrgList'
          // data: [{ value: 0, label: '未知' }, { value: 1, label: '男' }, { value: 2, label: '女' }]
        },
        view: { // 查看时的该字段单独配置
          component: { span: 18 }
        },
        valueBuilder (row, key) {
          console.log('builder')
          console.log(row)
          console.log(key)
          console.log('builder')
          // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
          // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
          // 例如：国际手机号(mobileValue为此column的key)
          // 示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/demo/form/phone
          // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
        },
        valueResolve (row, key) {
          console.log('resolve')
          console.log(row)
          if (row.sysOrg) {
            row.sysOrg.id = row.sysOrg.orgName
          }
          console.log(row)
          console.log('resolve')
          // 组件中传回的值也需要分解成row中多个字段的值，用于提交给后台。
          // if (row.mobileValue != null) {
          //  row.phone = row.mobileValue.phoneNumber
          //  row.code = row.mobileValue.callingCode
          //  row.country = row.mobileValue.countryCode
          // }
        }
        // form: {
        //   component: {
        //     // props: {
        //     //   value: id,
        //     //   label: orgName
        //     // },
        //     events: {
        //       ready: () => {
        //         console.log('status1, ready...')
        //       }
        //     }
        //   },
        // value: '2', // 添加时的初始值
        // rules: [{ required: true, message: '请选择一个选项' }],
        // valueChange (key, value) {
        //   console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
        // }
        // }
      },
      {
        title: '禁用',
        key: 'enable',
        sortable: false,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '是' }, { value: false, label: '否' }] },
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      }
    ]
  }
}
