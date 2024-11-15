const createError = require('http-errors');
const { uploadFile, imageUpload } = require('../service/AWSService');
const formidable = require('formidable');
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
// const { required } = require('joi');


exports.upload = async (req, res, next) => {

    const file = req.file;
    console.log("actual file",file)

    const upload_response = await uploadFile(file)
    // const upload_response = await imageUpload(req,res);

    // await unlinkFile(file.path)

    console.log("upload_response, ", upload_response)

    const response = {'success': true, message: 'File uploaded to Amazon S3.', url: upload_response.Location};

    console.log("upload response: ", response)

    res.send(JSON.stringify(response, null, 2));

    // const form = formidable({ multiples: true });

    // console.log("form data",form)
 
    // form.parse(req, async (err, fields, files) => {
    // //   res.writeHead(200, { 'content-type': 'application/json' });
    //   console.log("file data:", files.file.name, files.file.path)
    //     const response = {'success': true, message: 'File uploaded to Amazon S3.', url: upload_response.Location};
    //     // console.log("upload response: ", upload_response)
    //     console.log("upload response: ", response)
    //   res.send(JSON.stringify(response, null, 2));
    // });

    return;
};