const UserService = require('../service/User');
const dbConnection = require('../mongoose');


exports.params = async (req, res, next, id) => {
  await dbConnection();
  const profile = await UserService.getProfile(id);
  if (!profile) {
    next(new Error(`no Profile with the id ${id}`));
  } else {
    req.profile = profile;
    next();
  }
};

exports.create = async (req, res) => {
    const {user, body} = req;
    await dbConnection();
    try {
        // creating an identity for the agent
        // const validatedData = await authSchema.validateAsync(req.body);
        // console.log(validatedData);

        const profile = await UserService.getProfileByPhone(body.phone);
        if(profile && user.profile){
          console.log(profile._id.toString(),user.profile._id.toString())
            if(profile._id.toString()!=user.profile._id.toString()){
              return res.json({
                  message: "User with phone number already exist, Please another phone number.",
                  error: true
              })
            }
            
        } 

        if(!user.profile && profile){
          return res.json({
              message: "User with phone number already exist, Please another phone number.",
              error: true
          })
        }

        const response = await UserService.createprofile(user,body);

        res.json({
            message: 'Profile created successfully!',
            data: response,
        });

    } catch (err) {
        res.json({
        error: true,
        message: err.message,
        });
    }
};


exports.update = async (req, res, next) => {
    const { user } = req;
    console.log("there is no user: ", user)

    await dbConnection();
    try {
      if (!user) {
        res.json({
          message: 'user not found!!!',
        });
      } else {
        const data = req.body;
        
        console.log("data body:", data)
        // updating agent
        const response = await UserService.updateProfile(user, data);

        // fetching user
        const modified_user = UserService.getUser(user._id);
        console.log("modified user,", modified_user)
  
        res.json({
          message: 'User updated successfully!',
          data: modified_user,
        });
      }
    } catch (error) {
      console.log(error)
      next(error);
    }
};