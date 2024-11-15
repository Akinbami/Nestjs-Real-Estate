const UserService = require('../service/User');
const ApplicationService = require('../service/Application');
const RoomService = require("../service/Room")
const dbConnection = require('../mongoose');

const { applicationSchema } = require('../utils/ApplicationSchemaValidator');
const { sendEmail } = require('../utils/sendEmail');

exports.params = async (req, res, next, id) => {
  await dbConnection();
  try{
    const application = await ApplicationService.getApplication(id);
    if (!application) {
      throw new Error(`no Application with the id ${id}`);
    } else {
      req.application = application;
      next();
    }
  }catch(error){
    next(error);
  }
};

exports.create = async (req, res) => {
    const {user, body} = req;
    await dbConnection();
    try {
        // creating an identity for the agent
        const validatedData = await applicationSchema.validateAsync(req.body);
        // console.log(validatedData);

        const response = await UserService.createApplication(user, validatedData);

        const room = await RoomService.getRoom(response.room);

        if(response){
          // send email
          const mailObj = {
              from: "enquiries@smartpysolutions.com",
              recipient: user.email,
              roomnumber: room.number,
              firstname: response.firstname,
              subject: "Your booking Confirmation at The POD Living at PAU",
              message: `Dear ${response.firstname} 
              Congratulations! You are all booked in to The POD Living for the 2021 – 2022 session. Please note that your room number is xys. You can login to the residents portal at www.thepodliving.com/residents-portal 
              We look forward to welcoming you in person. If you  have any issues ahead of your arrival, please do not hesitate to contact us by email. `,
          };
          
          const email_response = await  sendEmail(mailObj)
          if(email_response){
            console.log("email value after sending:",email_response);
          }
        }

        res.json({
            message: 'Applications created successfully!',
            data: response,
        });

    } catch (err) {
        res.json({
        error: true,
        message: err.message,
        });
    }
};

exports.index = async (req, res) => {
  // this controller gets the details of the agent making the request
  //   const { user } = req;
  const {page=1, limit=50} = req.query;
  await dbConnection();
  const applications = await ApplicationService.getAllApplications({page,limit});
  res.json({
      message: 'Applications fetched successfully!',
      data: applications,
  });
};

exports.get = async (req, res, next) => {
  const { application } = req;
  await dbConnection();
  return res.json({
    message: 'Application fetched successfully!',
    data: application,
  });
};


exports.update = async (req, res, next) => {
    const { application } = req;
    await dbConnection();
    try {
      if (!application) {
        res.json({
          message: 'application not found!!!',
        });
      } else {
        const data = req.body;
  
        // updating agent
        const response = await ApplicationService.updateApplication(application,data);
  
        res.json({
          message: 'Application updated successfully!',
          data: response,
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.delete = async (req, res) => {
  const { application } = req;
  await dbConnection();

  const removed = await ApplicationService.deleteApplication(application.id);
  res.json({
    message: 'User deleted successfully!',
    data: removed,
  });
};
