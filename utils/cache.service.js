const redis = require('redis');

const { promisify } = require('util');

const client = redis.createClient();

client.on('connect', () => {
  console.log('sucessfully connect to redis');
});

client.on('error', (err) => {
  console.log('error while connecting to redis');
  console.log(err.message);
});

client.on('end', () => {
  console.log('redis client connection disconnected');
});

process.on('SIGINT', () => {
  client.quit();
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);
const DEL_ASYNC = promisify(client.del).bind(client);

const cache = {
  GET_ASYNC,
  SET_ASYNC,
  DEL_ASYNC,
  client,
};

module.exports = cache;

// const NodeCache = require('node-cache');

// class Cache {
//   constructor(ttlSeconds) {
//     this.cache = new NodeCache({
//       stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false,
//     });
//   }

//   get(key, storeFunction) {
//     const value = this.cache.get(key);
//     if (value) {
//       return Promise.resolve(value);
//     }

//     return storeFunction().then((result) => {
//       this.cache.set(key, result);
//       return result;
//     });
//   }

//   del(keys) {
//     this.cache.del(keys);
//   }

//   flush() {
//     this.cache.flushAll();
//   }
// }

// export default Cache;
