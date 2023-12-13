const express = require('express');
const {validate} = require('express-validation');

const { adminRoutes, clientRoutes } = require('./src/routes/routes');
const { generateDiscountCode, generateStoreSummary } = require('./src/controllers/adminController');
const { addToCart, checkout } = require('./src/controllers/clientController');
const { generateDiscountCodeValidator, addToCartValidator, checkoutValidator } = require('./src/middlewares/validators');
const { ValidationError } = require('express-validation');

const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.json());

// Admin APIs
app.get(adminRoutes.SERVER_HEALTH_CHECKUP, (req, res) => {
	res.send('<h1>Server is running properly</h1>');
});

app.post(
	adminRoutes.GENERATE_DISCOUNT_CODE,
	validate(generateDiscountCodeValidator),
	generateDiscountCode
);

app.get(
	adminRoutes.GENERATE_STORE_SUMMARY,
	generateStoreSummary
);

// Client APIs
app.post(
	clientRoutes.ADD_TO_CART,
	validate(addToCartValidator),
	addToCart
);

app.post(
	clientRoutes.CHECKOUT,
	validate(checkoutValidator),
	checkout
);

app.use(function(err, req, res, next) {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json(err)
	}

	return res.status(400).json(err)
});

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});