const { Inventory, Cart } = require("../database");
const { ERROR } = require("../handlers/error");


exports.addToCartService = (itemId, userId, desiredCount) => {
	// Check if such Item is present in Inventory
	const availableItem = Inventory.filter(item => item.id === itemId);
	if (!availableItem.length) {
		throw ERROR.ITEM_NOT_FOUND;
	}

	// Check if User already has this Item in Cart
	const isAlreadyInCart = Cart.some(item => item.itemId === itemId && userId === userId);
	if (isAlreadyInCart) {
		throw ERROR.ITEM_ALREADY_IN_CART;
	}

	// Check if enough number of this Item is there in Inventory
	if (desiredCount > availableItem[0].count) {
		throw ERROR.ITEM_COUNT_SHORTAGE;	
	}

	// If Item is available, push it to Cart.
	Cart.push({
		itemId: availableItem[0].id,
		itemName: availableItem[0].name,
		price: availableItem[0].price,
		count: desiredCount,
		userId,
	});
	return Cart;
}