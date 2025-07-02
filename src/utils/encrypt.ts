/*
 * @Author: wangjiaxin@leedarson.com 
 * @Date: 2020-03-06 15:07:06 
 * @Last Modified by: wangjiaxin@leedarson.com
 * @Last Modified time: 2020-03-06 15:08:57
 */
import JSEncrypt from 'jsencrypt';
import MD5 from 'md5.js';


const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtQAnPCi8ksPnS1Du6z96PsKfNp2Gp/f/bHwlrAdplbX3p7/TnGpnbJGkLq8uRxf6cw+vOthTsZjkPCF7CatRvRnTjc9fcy7yE0oXa5TloYyXD6GkxgftBbN/movkJJGQCc7gFavuYoAdTRBOyQoXBtm0mkXMSjXOldI/290b9BQIDAQAB';
  

const encryptRSA = value => {
  if (value === null || value === undefined) {
    return value;
  }

  const encryptInstance = new JSEncrypt(); // 创建加密对象实例
  encryptInstance.setPublicKey(PUBLIC_KEY); // 设置公钥

  return encryptInstance.encrypt(value);
};

export {encryptRSA};

export default (str) => {
    const md5 = new MD5();
    md5.end(str);
    return md5.read().toString('hex');
};
