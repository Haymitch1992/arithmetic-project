/**
 * 这里生成的是一级路由的引入页
 */

import Route from '@/model/route';
import upload from './upload';

export default [
  Route.new('/upload', upload, 'upload')
];
