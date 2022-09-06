import request from '@/utils/request'
import { authUsername, authPassword, authScope } from '@/settings'
import qs from 'qs'

export function login(username, password, code, randomStr) {
  const dataObj = qs.stringify({ 'username': username, 'password': password })
  return request({
    url: '/auth/oauth/token',
    auth: {
      username: authUsername,
      password: authPassword
    },
    method: 'post',
    params: { randomStr: randomStr, code: code, grant_type: 'password', scope: authScope },
    data: dataObj
  })
}

export function getInfo() {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}

export function checkToken(token) {
  return request({
    url: '/auth/oauth/check_token',
    auth: {
      username: authUsername,
      password: authPassword
    },
    method: 'get',
    params: { token }
  })
}

export function refreshToken(refreshToken) {
  return request({
    url: '/auth/oauth/token',
    auth: {
      username: authUsername,
      password: authPassword
    },
    method: 'post',
    params: { refresh_token: refreshToken, grant_type: 'refresh_token', scope: authScope }
  })
}

export function updateUserInfo(info) {
  return request({
    url: '/admin/user/edit',
    method: 'put',
    data: info
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function getDetails(obj) {
  return request({
    url: '/admin/user/details/' + obj,
    method: 'get'
  })
}
