/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route'
import plan from './plan'
import example from "../Example/example";

export default [
  Route.new('/plan', plan, 'plan')
]
