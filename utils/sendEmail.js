const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp("c3f6755eac894252e3afe117aa086caf-us6");
const nodemailer = require("nodemailer");
var SibApiV3Sdk = require('sib-api-v3-sdk');
const axios = require("axios");



const send_in_blue = "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";
const sendgrid_api_key = "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"



// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

const sendEmail = async (mailObj) => {
    const { from, recipient, subject, message, firstname, lastname, roomnumber } = mailObj;

    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = send_in_blue;

        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

        sendSmtpEmail = {
            to: [{
                email: recipient,
                name: `${firstname} ${lastname}`
            }],
            templateId: 1,
            params: {
                name: firstname,
                surname: lastname,
                roomnumber,
                recipient
            },
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        };

        console.log("email payload: ", sendSmtpEmail)

        const post = await axios.post("https://api.sendinblue.com/v3/smtp/email",sendSmtpEmail,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": send_in_blue
            }
        });

        console.log("response from API, ", post.data)
        
        return post.data

        // apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        //     console.log('API called successfully. Returned data: ' + data);
        //     return data
        // }, function(error) {
        //     console.error("and error happed",error);
        //     throw new Error(error)
        // }).catch(err=>{
        //     console.log("an error occured", error)
        // });

        // console.log("after instance: ")
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(sendgrid_api_key)
        // console.log("this is sendgrid api key: ", sendgrid_api_key)
        // const msg = {
        //     to: recipient, // Change to your recipient
        //     from: 'enquiries@smartpysolutions.com', // Change to your verified sender
        //     templateId: "d-410a99fef6ca44098b359d6a7eec8505",
        //     dynamic_template_data: {
        //         firstname: firstname,
        //         room:  roomnumber,
        //     }
        // }
        // sgMail
        // .send(msg)
        // .then((data) => {
        //     console.log('Email sent');
        //     return data
        // }).catch((error) => {
        //     console.error("error email: ",error)
        //     throw new Error(error)
        // })
    } catch (error) {
        console.error("Something went wrong in the sendmail method.", error);
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
        );
    }
};

module.exports = {sendEmail}

