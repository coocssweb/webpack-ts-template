import * as dayjs from 'dayjs';

export const formatTimeAgo = timestamp => {
    const now = new Date().getTime();
    const diff = now - timestamp;
  
    // 转换为秒
    const seconds = Math.floor(diff / 1000);
  
    if (seconds < 60) {
      return '1 min ago';
    }
  
    // 转换为分钟
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} mins ago`;
    }
  
    // 转换为小时
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hrs ago`;
    }
  
    // 转换为天
    const days = Math.floor(hours / 24);
    if (days < 2) {
      return 'Yesterday';
    }
  
    // 超过1天，显示具体时间
    return dayjs(timestamp).format('HH:mm MM/DD/YYYY');
  };