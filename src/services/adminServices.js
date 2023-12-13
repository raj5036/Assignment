const { discountCodes, purchasedItems } = require("../database");

exports.generateStoreSummary = () => {
	let storeSummary = {
		purchaseCount: purchasedItems.length,
		purchasedItems,
		discountCodes,
		totalDiscountedAmount: purchasedItems.filter(purchasedItem => purchasedItem.discountCode).reduce((total, item) => {
			return total + (parseInt(item.price) * 10) / 100;
		}, 0),
	};
	return {storeSummary};
};