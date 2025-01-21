export const GET_PRODUCT_FREQUENCIES = `
query GetProductFrequencies { getProductFrecuencies ( qty: {qty} use: {use} qty_box: {qty_box} ) {
min_max { min_qty max_qty } frecuencies { frecuency label } } }
`;