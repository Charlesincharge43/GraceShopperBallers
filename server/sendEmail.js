// using SendGrid's Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
console.log('*****sendgrid API', process.env.SENDGRID_API_KEY)
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: 'nishmeht7@gmail.com',
          },
        ],
        subject: 'I\'m replacing the subject tag',
      },
    ],
    from: {
      email: 'charles.m.long43@gmail.com',
    },
    content: [
      {
        type: 'text/html',
        value: 'I\'m replacing the <strong>body tag</strong>',
      },
    ],
  },
});

// email.addTo("nishmeht7@gmail.com");
// email.setFrom("notorious_nish@hotmail.com");
// email.setSubject("Sending with SendGrid is Fun");
// email.setHtml("and easy to do anywhere, even with Node.js");

// sendgrid.send(email);


// sg.API(request, function(error, response) {
//   if (error) {
//     console.log('Error response received');
//   }
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// });


module.exports = require('express').Router()
	.get('/now', function(req, res){

		sg.API(request, function(error, response) {
		  if (error) {
		    console.log('Error response received');
		  }
		  console.log(response.sendStatus);
		  console.log('the body is', response.body);
		  console.log('the headers are',response.headers);
		  //console.log(response.send(201));
		});
	})