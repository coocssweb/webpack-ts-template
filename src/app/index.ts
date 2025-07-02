import '@less/base/common.less';
import "../assets/iconFont/index.less"
import App from './app';
import { ajax, jsonp } from './modules/index';

interface AppOptions {
    data?: object,
    watchs?: object,
    bindEvents?: Function,
    init?: Function,
    [propName: string]: any;
}

// a tool function for create app
export default class Instance {
    constructor (options: AppOptions) {
        const optionsExtend = {
            ... options
        };
        const { data, watchs, ...resets } = optionsExtend;
        
        return new (App.extends(resets))(data, watchs);
    }
}

export {
    ajax,
    jsonp
};
