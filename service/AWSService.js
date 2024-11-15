// const S3 = require('aws-sdk/clients/s3');
const aws = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require('uuid');

const BUCKET_NAME = "the-pod-profile-pictures";

aws.config.update({
    accessKeyId: "AKIAQHWIICMX6QYTCN53",
    secretAccessKey: "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",
    region: "us-east-1"
  });


const s3 = new aws.S3();
// const params = {
//     Bucket: BUCKET_NAME,
// };

const filename = uuidv4();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function (req, file, cb){
            cb(null, filename)
        }
    })
})

const singleFileUpload = upload.single("file");

const AZ = {
    async uploadFile(file){
        const fileContent = fs.readFileSync(file.path);

        console.log("file content: ",fileContent, file.path)
        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: file.filename, // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket

        console.log("bucket params: ",params)
        // let response;
        return s3.upload(params).promise();

        // s3.getSignedUrl("putObject", params, function(err, data) {
        //     if (err) {
        //         console.log(err);
        //         return err;
        //     } else {
        //         console.log(`File uploaded successfully. ${data}`);
        //         return {'success': true, message: 'File uploaded to Amazon S3.', url: data };
        //     }
        // });

        // var putObjectPromise = s3.putObject(params).promise();
        // putObjectPromise.then(function(data) {
        //   console.log("Successfully uploaded data to " + params.Bucket + "/" + params.Key);
        //   return {'success': true, message: 'File uploaded to Amazon S3.', url: data };
        // }).catch(err=>console.error(err));

        // s3.putObject(params, function (err, data) {
        //     if (err) {
        //         console.log("Error: ", err);
        //         return err;
        //     } else {
        //         console.log(`File uploaded successfully. ${data}`);
        //         return {'success': true, message: 'File uploaded to Amazon S3.', url: data };
        //     }
        // });

    },
    async imageUpload(req,res){
        let downloaduri  = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`
        return new Promise((resolve, reject)=>{
            return singleFileUpload(req,res,err=>{
                if (err) return reject(err);
                return resolve(downloaduri)
            })
        })
    }
}

module.exports = AZ;