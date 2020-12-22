/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route'
import login from './login'

export default [
  Route.new('/login', login, 'login')
]
