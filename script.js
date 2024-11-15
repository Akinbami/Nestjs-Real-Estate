const User = require('./models/User');
const Checklist = require('./models/Checklist');
const { getAllUsers } = require('./service/User');
const dbConnection = require('./mongoose');


dbConnection().then(()=>{
    console.log("successfully connected")
});

User.find().populate("checklist").exec().then(async(data)=>{
    console.log(data)
    for(var user of data){
        // let checklist = await Checklist.create({user});
        let checklist = await Checklist.findOne({user})
        console.log(checklist);
        // user.checklist = checklist;
        // user.save();
        // console.log(user.id);
    }
    return data
})
// console.log(users)
// const  createChecklist = async()=>{
    // for(var user of users){
    //     let checklist = await Checklist.create({user});
    //     user.checklist = checklist;
    //     user.save();
    //     console.log(user.id);
    // }
    // return true
// }

// createChecklist();