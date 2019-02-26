const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.DB_USER,
		pass: process.env.DB_PASS
	}
});
module.exports = {
	purchaseConfirmation: async (req, res) => {
		console.log(
			'purchase info from body request',
			req.body.address,
			req.body.paymentID
		);
		const { paymentID } = req.body;
		const {
			recipient_name,
			line1,
			city,
			state,
			postal_code,
			country_code
		} = req.body.address;
		const mailOptions = {
			from: process.env.DB_USER,
			to: req.session.user.email,
			subject: 'Order Confirmation',
			html: ` <h1>Thank you for your purchase! Your orders shipping information is as follows:</h1>
            <div>
            <h2> Buyer's name: ${recipient_name}</h2>
            <h3> Street: ${line1} </h3>
            <h3>City: ${city} </h3>
            <h3> State: ${state}</h3>
            <h3> Zip code: ${postal_code} </h3>
            <h3> Country: ${country_code} </h3> 
            </div>
            Also for your records please keep your transaction ID: ${paymentID}`
		};
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email send:' + info.response);
			}
		});
	}
};
