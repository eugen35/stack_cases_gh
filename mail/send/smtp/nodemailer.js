//npm install nodemailer --save

var nodemailer = require('nodemailer');

var smtpConfig = {
  //host: 'smtp.gmail.com', - для отсылки через gmail.com (но в аккаунте gmail.com нужно разрешить отправку писем из недоверенных приложений, иначе будет ошибка отправки)
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // not use SSL
  auth: {
    user: 'info@zam-po-it.ru',
    pass: 'sis1/2Free'
  }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

function promisifiedSendMail(mailOptions){
  return new Promise(function(resolve, reject){
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        reject(error);
      }
      //console.log('Message sent: ' + info.response);
      resolve(info);
    });
  })
}

module.exports.sendMail = promisifiedSendMail;
module.exports.sendMailSync = transporter.sendMail;


// ПРИМЕР ОТПРАВКИ ПИСЬМА
/*
// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"_meugen_" <info@zam-po-it.ru>', // sender address
  // to: 'bar@blurdybloop.com, baz@blurdybloop.com',
  to: 'info@zam-po-it.ru', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Привет! Проверка почты. 🐴', // plaintext body
  html: '<b>Привет! Проверка почты. 🐴</b>' // html body
};

// send mail with defined transport object
sendMailSync(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});

 // send mail with defined transport object
 sendMail(mailOptions)
 .then(function(info)){
 console.log('Message sent: ' + info.response);
 });
 .catch(function(error){
 console.log(error);
 });

*/