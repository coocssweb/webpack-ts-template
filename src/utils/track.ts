import sensors from 'sa-sdk-javascript';
import DomUri from './uri'

const { query } = DomUri.parse(window.location.href);

const SERVER_URL_MAP = {
    test:'https://test-US-datalink.arnoo.com/sa?project=default',
    pre:'https://pre-US-datalink.arnoo.com/sa?project=pre_release',
    prod: 'https://prod-US-datalink.arnoo.com/sa?project=production',
}

sensors.init({
    server_url: SERVER_URL_MAP[(query as any)?.serverEnv || 'prod'],
    show_log: false, // 浏览器开发者工具会打印采集的事件信息, 相当于调用`getPresetProperties()`方法
    is_track_single_page: false, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    use_client_time: true, // 使用客户端时间
    send_type: 'image', // 发送数据方式
  });


export default sensors;

