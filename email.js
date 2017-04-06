'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '364886455@qq.com',
        pass: 'opexznzzpxotbghe'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Web Job Fun" <364886455@qq.com>', // sender address
    to: 'wadewei@maizuo.com', // list of receivers
    subject: '密码找回', // Subject line
    html: '<b>你现在正在使用Web Job Fun 的找回密码功能，验证码是【020202】，如果非你本人操作，请谨慎给出此次验证码！</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});