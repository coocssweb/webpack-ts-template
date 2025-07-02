/*
 * @Author: wangjiaxin@leedarson.com 
 * @Date: 2020-03-03 15:29:21 
 * @Last Modified by:   wangjiaxin@leedarson.com 
 * @Last Modified time: 2020-03-03 15:29:21 
 */
const path = require('path');

exports.resolve = function resolve (...args) {
    return path.join(__dirname, '..', ...args);
};