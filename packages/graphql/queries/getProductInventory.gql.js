export const GET_PRODUCT_INVENTORY = `
query CheckProductsInventory { checkProductsInventory( store_number: {store} skus_data: {skus})
{ status message } }
`