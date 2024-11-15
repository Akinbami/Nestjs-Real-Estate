const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const config = require('../config');

const checkToken = expressJwt({ secret: config.secrets.jwt.accessToken, algorithms: ['sha1', 'RS256', 'HS256'] });
const Identity = require('../models/Identity');
const Agent = require('../models/Agent');

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

exports.authenticate = (
  plainTextPword, identiyPassword,
) => bcrypt.compareSync(
  plainTextPword, identiyPassword,
);

exports.getFreshUser = (req, res, next) => {
  Identity.findById(req.user._id)
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
  const { username } = req.body;
  const { password } = req.body;

  // if no username or password then send
  if (!username || !password) {
    return res.badRequest({
      message: 'You need a username and password',
    });
  }

  // look user up in the DB so we can check
  // if the passwords match for the ucsername
  const user = await Identity.findOne({
    $or: [{ email: username }, { phone: username }],
  });

  if (!user) {
    return res.badRequest({
      message: 'No identity found with the given username',
    });
  }

  if (!this.authenticate(password, user.password)) {
    return res.badRequest({
      message: 'Wrong password provided',
    });
  }

  const agent = await Agent.findOne({
    identity: user,
  });

  if (!agent) {
    return res.badRequest({
      message: 'No agent found with the given username',
    });
  }

  req.user = user;
  // req.agent = agent;

  return next();
};

// util method to sign tokens on signup
exports.signToken = (id) => jwt.sign(
  { _id: id },
  config.secrets.jwt.accessToken,
  { expiresIn: config.expireTime },
);
