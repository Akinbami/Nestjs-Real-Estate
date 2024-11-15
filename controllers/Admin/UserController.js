const UserService = require('../../service/User');
const dbConnection = require('../../mongoose');
const { authSchema } = require('../../utils/AdminAuthSchemaValidator');


exports.params = async (req, res, next, id) => {
  const user = await UserService.getUser(id);
  if (!user) {
    next(new Error(`no user with the phone number ${id}`));
  } else {
    req.user = user;
    next();
  }
};

exports.index = async (req, res) => {
  // this controller gets the details of the agent making the request
//   const { user } = req;
  const {page=0, limit=100} = req.query;
  await dbConnection();

  try{
    const users = await UserService.getAllAdminUsers({});

    if(users){
      res.json({
        message: 'Admin Users fetched successfully!',
        data: users,
      });
    }
  }catch(err){
    console.log(err)
  }
  
};

exports.get = async (req, res, next) => {
  const { user } = req;
  await dbConnection();

  return res.json({
    message: 'Admin User fetched successfully!',
    data: user,
  });
};

exports.update = async (req, res, next) => {
  const { user } = req;
  const {id} = req.params
  await dbConnection();

  const admin = await UserService.getUser(id);

  try {
    if (!admin) {
      res.json({
        message: 'admin not found!!!',
      });
    } else {
      const data = req.body;

      // updating agent
      const response = await UserService.updateUser(admin, data);
      

      res.json({
        message: 'User updated successfully!',
        data: response,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
    const data = req.body;
  
  await dbConnection();

  try {
    // creating an identity for the agent
    // const validatedData = await authSchema.validateAsync(req.body);
    // console.log(validatedData);

    // check if user exist
    let user = await UserService.getUserByEmail(data.email);
    if(user){
      return res.json({
        message: "user already exist",
        data: user
      })
    }

    user = await UserService.createAdminUser(data);

    res.json({
        message: 'Admin User created successfully!',
        data: user,
      });

  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { user } = req;
  const {id} = req.params;

  if(user.id==id){
      return res.json({
          error: true,
          message: "Sorry you cant delete yourself while logged in."
      })
  }
  await dbConnection();

  const removed = await UserService.deleteUser(id);
  res.json({
    message: 'User deleted successfully!',
    data: removed,
  });
};


