const createError = require('http-errors');

const auth = require('../../auth/Admin');
const User = require('../../models/User');
const UserService = require('../../service/User');
const { authSchema } = require('../../utils/AdminAuthSchemaValidator');

exports.signin = (req, res) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  
  const token = auth.signToken(req.user.id);
  const refreshToken = auth.signRefreshToken(req.user.id);
  // res.cookie('pod-token', token, { httpOnly: false });
  // res.json({ token, refreshToken });
  res.json({user: req.user, token})
};

exports.create = async (req, res) => {
  try {
    const validatedData = await authSchema.validateAsync(req.body);
    console.log(validatedData);

    // checking is user already exist
    const doesExist = await User.findOne({email: validatedData.email });
    if (doesExist) throw createError(409, `user with ${validatedData.email} already exist.`);

    // creating an identity for the agent
    const user = await User.create(validatedData);

    res.json({
      message: 'Admin created successfully!',
      data: user,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

exports.refreshToken = async (req, res, next) => {
//   const token = auth.signToken(req.user._id);
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) throw createError(400, 'please submit a refresh token');

    const userId = await auth.verifyRefreshToken(refresh_token);

    const accessToken = auth.signToken(userId);

    const refreshToken = auth.signRefreshToken(userId);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};


exports.verifyToken = async (req, res, next) => {
  //   const token = auth.signToken(req.user._id);
  try {
    const { token } = req.body;
    if (!token) throw createError(400, 'please submit a access token');

    const user_id = await auth.verifyToken(token);

    // getting the user
    const user = await UserService.getUser(user_id)

    return res.json({ authenticated: true, user });
  } catch (err) {
    next(err);
  }
};

