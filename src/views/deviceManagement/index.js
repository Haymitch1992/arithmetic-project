/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route';
import deviceManagement from './deviceManagement';

export default [
  Route.new('/deviceManagement', deviceManagement, 'deviceManagement')

];
