import { request } from '@/api/service'
export function GetList (query) {
  console.log(query)
  return request({
    url: '/platform/getUserList',
    method: 'post',
    data: query
  })
}
export function AddObj (obj) {
  console.log(obj)
  return request({
    url: '/platform/add',
    method: 'post',
    data: obj
  })
}
export function UpdateObj (obj) {
  return request({
    url: '/platform/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/platform/delete',
    method: 'post',
    data: { id }
  })
}
export function GetOrgList () {
  console.log('fuck')
  return request({
    url: '/platform/getOrgList',
    method: 'post'
  })
}
