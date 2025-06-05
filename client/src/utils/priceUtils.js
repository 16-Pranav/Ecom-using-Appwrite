// Utility functions for handling product pricing including deals

/**
 * Get the effective price for a product (deal price if available, otherwise regular price)
 * @param {Object} product - Product object
 * @returns {number} - The effective price to use for calculations
 */
export const getEffectivePrice = (product) => {
  if (!product) return 0;

  // Check for various deal price properties that might exist
  if (product.deal_price && product.deal_price > 0) {
    return product.deal_price;
  }

  if (product.discountedPrice && product.discountedPrice > 0) {
    return product.discountedPrice;
  }

  return product.price || 0;
};

/**
 * Check if a product has a deal/discount
 * @param {Object} product - Product object
 * @returns {boolean} - Whether the product has a deal
 */
export const hasDiscount = (product) => {
  if (!product) return false;

  const dealPrice = product.deal_price || product.discountedPrice;
  const regularPrice = product.price;

  return dealPrice && dealPrice > 0 && dealPrice < regularPrice;
};

/**
 * Get the original price for a product
 * @param {Object} product - Product object
 * @returns {number} - The original price before any discounts
 */
export const getOriginalPrice = (product) => {
  if (!product) return 0;
  return product.price || 0;
};

/**
 * Calculate the discount amount
 * @param {Object} product - Product object
 * @returns {number} - The discount amount
 */
export const getDiscountAmount = (product) => {
  if (!hasDiscount(product)) return 0;

  const originalPrice = getOriginalPrice(product);
  const effectivePrice = getEffectivePrice(product);

  return originalPrice - effectivePrice;
};

/**
 * Calculate the discount percentage
 * @param {Object} product - Product object
 * @returns {number} - The discount percentage (0-100)
 */
export const getDiscountPercentage = (product) => {
  if (!hasDiscount(product)) return 0;

  const originalPrice = getOriginalPrice(product);
  const discountAmount = getDiscountAmount(product);

  if (originalPrice === 0) return 0;

  return Math.round((discountAmount / originalPrice) * 100);
};
