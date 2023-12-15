const {PurchasedItems, DiscountCodes } = require("../database");
const { ERROR } = require("../handlers/error");

exports.generateDiscountCode = (discountCode) => {
	// Check if discountCode is already present
	if (DiscountCodes.includes(discountCode)) {
		throw ERROR.DUPLICATE_DISCOUNT_CODE;
	}

	DiscountCodes.push(discountCode);
	return DiscountCodes;
};

exports.generateStoreSummary = () => {
	let storeSummary = {
		purchaseCount: PurchasedItems.length,
		purchasedItems: PurchasedItems,
		discountCodes: DiscountCodes,
		totalDiscountedAmount: PurchasedItems.filter(purchasedItem => purchasedItem.discountCode).reduce((total, item) => {
			return total + (parseInt(item.price) * 10) / 100;
		}, 0),
	};
	return {storeSummary};
};