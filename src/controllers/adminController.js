const { discountCodes } = require("../database");


exports.generateDiscountCode = (req, res) => {
	const { discountCode } = req.body;
	return Promise.resolve(
		discountCodes.push(discountCode)
	)
	.then(() => {
		console.log('Successfully added Discount Code to Database');
		return res.status(200).json({'code': 'SUCCESS', 'msg': 'Successfully created Discount Code'});
	})
	.catch(err => {
		return res.status(500).json({'code': 'FAILED', 'msg': 'Something went wrong'});
	})
};

exports.generateStoreSummary = (req, res) => {};