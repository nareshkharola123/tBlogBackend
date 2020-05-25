const nodemailer = require("nodemailer");

const emailConf = require('./secret-data.json').mailConf;

module.exports = async (mailAddress) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: emailConf.host,
    port: emailConf.port,
    secure: false,
    auth: {
      user: emailConf.username,
      pass: emailConf.password,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailConf.sender, // sender address
    to: mailAddress, // list of receivers
    subject: "Thanks For SignUp",
    text: "Welcome to BlogsWebsite",
    html: "<b>Welcome To BlogSWebsite</b>",
  });

  console.log(info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));
}