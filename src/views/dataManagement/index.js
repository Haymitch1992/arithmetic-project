/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route'
import dataManagement from './dataManagement'
import plan from "../plan/plan";

export default [
  Route.new('/dataManagement', dataManagement, 'dataManagement'),
  Route.new('/', dataManagement, 'dataManagement')
]
