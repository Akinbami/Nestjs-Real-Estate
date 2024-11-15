const _ = require('lodash');
require('dotenv').config();

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: 60 * 60,
  secrets: {
    jwt: {
      accessToken: process.env.JWT || 'bjskhdjksjenjiwfiuejndowkunfolw',
      refreshToken: process.env.JWT || 'kjsndebkiuwnejwkehjbfnibfiuewrbf43',
    }
  },
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/apijwt',
  mailchimp_api_key: process.env.MAILCHIMP_API_KEY,
  mailchimp_server_prefix: process.env.MAILCHIMP_SERVER_PREFIX,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// falling back to an empty object if require errors out
try {
  envConfig = require(`./${config.env}`);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

// merging environment config and module config object
module.exports = _.merge(config, envConfig);
