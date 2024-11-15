const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const config = require('../../config');

const checkToken = expressJwt({ secret: config.secrets.jwt.accessToken, algorithms: ['sha1', 'RS256', 'HS256'] });
const User = require('../../models/User');
const { SET_ASYNC, GET_ASYNC } = require('../../utils/cache.service');

exports.decodeToken = (req, res, next) => {
  // making it optional to place token on query string
  // if it is, place it on the headers where it should be
  // so checkToken can see it. See follow the 'Bearer 034930493' format
  // so checkToken can see it and decode it
  if (req.query && req.query.access_token) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }

  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next);
};

const authenticate = (
  plainTextPword, identiyPassword,
) => bcrypt.compareSync(
  plainTextPword, identiyPassword,
);

exports.getFreshUser = (req, res, next) => {
  console.log("getting fresh user")
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(401).send('Unauthorized');
      } else {
        req.user = user;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.verifyUser = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  // if no username or password then send
  if (!email || !password) {
    res.status(400).json('You need a username and password');
    return;
  }

  // look user up in the DB so we can check
  // if the passwords match for the ucsername
  const user = await User.findOne({email: email })

  if (!user) {
    res.json({
      error: true,
      message: 'No user with the given username'});
  } else if (!authenticate(password, user.password)) {
    res.json({
      error: true,
      message: 'Wrong Password'});
  } else {
    req.user = user;
    next();
  }
};

// util method to sign tokens on signup
exports.signToken = (id) => jwt.sign(
  { _id: id },
  config.secrets.jwt.accessToken,
  { expiresIn: config.expireTime },
);

exports.verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, config.secrets.jwt.accessToken, (err, payload) => {
    if (err) return reject(createError(401, err.message || 'Unauthorized user'));
    const userId = payload._id;
    // eslint-disable-next-line no-shadow
    // const token = GET_ASYNC(userId).catch((err) => reject(createError(500, err.message || '')));
    // if (token === refreshToken) return resolve(userId);
    // return reject(createError(401, err.message || 'Unauthorized user'));
    return resolve(userId);
  });
});

exports.signRefreshToken = (id) => {
  const { expireTime } = config;
  const token = jwt.sign(
    { _id: id },
    config.secrets.jwt.refreshToken,
    { expiresIn: expireTime * 7 },
  );

  SET_ASYNC(id.toString(), token, 'EX', expireTime * 7).then(() => token).catch((err) => {
    console.log('failed to save token in redis');
    throw new Error(err);
  });

  return token;
};

exports.verifyRefreshToken = (refreshToken) => new Promise((resolve, reject) => {
  jwt.verify(refreshToken, config.secrets.jwt.refreshToken, (err, payload) => {
    if (err) return reject(createError(401, err.message || 'Unauthorized user'));
    const userId = payload._id;
    // eslint-disable-next-line no-shadow
    // const token = GET_ASYNC(userId).catch((err) => reject(createError(500, err.message || '')));
    // if (token === refreshToken) return resolve(userId);
    // return reject(createError(401, err.message || 'Unauthorized user'));
    return resolve(userId);
  });
});
