const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: "pranilstha122@gmail.com",
    pass: "iyku pruu kcbh sxoi",
  },
});

const main = async (receiver, subject, text) => {

  const info = await transporter.sendMail({
    from: '"Pranil Shrestha" <pranilstha122@gmail.com>', 
    to: receiver, 
    subject: subject, 
    html: `<b>${text}</b>`, 
  });

  console.log("Message sent: %s", info.messageId);

}

module.exports = {
    main
}