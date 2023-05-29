// export const reshapeProduct = (product: MedusaProduct): Product => {
//   const variant = product.variants?.[0];

//   let amount = '0';
//   let currencyCode = 'USD';
//   if (variant && variant.prices?.[0]?.amount) {
//     currencyCode = variant.prices?.[0]?.currency_code.toUpperCase() ?? 'USD';
//     amount = convertToDecimal(
//       variant.prices[0].amount,
//       currencyCode
//     ).toString();
//   }

//   const priceRange = {
//     maxVariantPrice: {
//       amount,
//       currencyCode:
//         product.variants?.[0]?.prices?.[0]?.currency_code.toUpperCase() ?? '',
//     },
//   };
//   const updatedAt = product.updated_at;
//   const createdAt = product.created_at;
//   const tags = product.tags?.map((tag) => tag.value) || [];
//   const descriptionHtml = product.description ?? '';
//   const featuredImage = {
//     url: product.thumbnail ?? '',
//     altText: product.title ?? '',
//   };
//   const availableForSale = product.variants?.[0]?.purchasable || true;

//   const variants = product.variants.map((variant) =>
//     reshapeProductVariant(variant, product.options)
//   );

//   let options;
//   product.options &&
//     (options = product.options.map((option) => reshapeProductOption(option)));

//   return {
//     ...product,
//     featuredImage,
//     priceRange,
//     updatedAt,
//     createdAt,
//     tags,
//     descriptionHtml,
//     availableForSale,
//     options,
//     variants,
//   };
// };

// const reshapeProductOption = (
//   productOption: MedusaProductOption
// ): ProductOption => {
//   const availableForSale =
//     productOption.product?.variants?.[0]?.purchasable || true;
//   const name = productOption.title;
//   let values = productOption.values?.map((option) => option.value) || [];
//   values = [...new Set(values)];

//   return {
//     ...productOption,
//     availableForSale,
//     name,
//     // values,
//   };
// };

// const reshapeProductVariant = (
//   productVariant: MedusaProductVariant,
//   productOptions?: MedusaProductOption[]
// ): ProductVariant => {
//   let selectedOptions: SelectedOption[] = [];
//   if (productOptions && productVariant.options) {
//     const optionIdMap = mapOptionIds(productOptions);
//     selectedOptions = productVariant.options.map((option) => ({
//       name: optionIdMap[option.option_id] ?? '',
//       value: option.value,
//     }));
//   }
//   const availableForSale = productVariant.purchasable || true;
//   const price = calculateVariantAmount(productVariant);

//   return {
//     ...productVariant,
//     availableForSale,
//     selectedOptions,
//     price,
//   };
// };
