const {PurchasedItems, DiscountCodes } = require("../database");

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