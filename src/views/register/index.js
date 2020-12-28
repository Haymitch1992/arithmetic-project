/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route';
import register from './register';

export default [
  Route.new('/register', register, 'register')
];
