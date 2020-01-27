/**
 * @description 创建一个 redis-cli
 */

const redis = require('redis');
// 连接redis
const redisClient = redis.createClient(6379, 'localhost');

redisClient.on('error', err => {
  if (err) {
    console.log('redis出错了', err);
  }
});

module.exports = redisClient;