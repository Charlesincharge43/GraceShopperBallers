// using SendGrid's Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

var request = (emailaddress) => sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: emailaddress,
          },
        ],
        subject: 'Your order has been shipped!!!',
      },
    ],
    from: {
      email: 'bigBaller@baler.heroku.app',
    },
    content: [
      {
        type: 'text/html',
        value: 'Thank you for placing your Ballin order, your boutta ball hard son!!!',
      },
    ],
  },
});

module.exports = require('express').Router()
	.post('/now', function(req, res){
    return sg.API(request(req.body.userEmail), function(error, response) {
      if (error) {
        console.log('Error response received');
      }
      res.send(201);
		})

	})
