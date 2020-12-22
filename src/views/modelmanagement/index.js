/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route'
import modelManagement from './modelManagement'

export default [
  Route.new('/modelManagement', modelManagement, 'modelManagement')
]
