export const GET_PRODUCT_DETAILS = `
query GetProductDetails { products(filter: { category_uid: { eq: "MTE=" } url_key: { eq: {url_key} } } currentPage: 1 pageSize: 1 sort: { name: ASC }) {
items { uid id uid sku name tiempo_de_uso Indicado_para1 custom_attributes { attribute_metadata { code label } entered_attribute_value { value } selected_attribute_options { attribute_option { uid label } } }
  description { html } media_gallery { label url } price_range { minimum_price { regular_price { value currency } final_price { value currency } discount { amount_off percent_off } }
  maximum_price { regular_price { value currency } final_price { value currency } discount { amount_off percent_off } } } small_image { url } url_key url_suffix } page_info { total_pages } total_count } }
`;