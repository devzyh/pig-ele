import store from '@/store'

export function hasPermission(value) {
  const permissions = store.getters && store.getters.permissions

  if (value && permissions.indexOf(value) === -1) {
    return false
  }
  return true
}
