
export const GET_PRODUCT_SPHERE = `
query GetProductSphere { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
fields{ name label } products_data{ sphere sphere_id } } }
`

export const GET_PRODUCT_AXIS = `
query GetProductAxis { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ axis axis_id } } }
`

export const GET_PRODUCT_CYLINDER = `
query GetProductCylinder { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ cylinder cylinder_id } } }
`

export const GET_PRODUCT_BASE = `
query GetProductBase { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ base_curve base_curve_id } } }
`

export const GET_PRODUCT_DIAMETER = `
query GetProductDiameter { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ diameter diameter_id } } }
`

export const GET_PRODUCT_ADD   = `
query GetProductAdd { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ add add_id } } }
`

export const GET_PRODUCT_COLOR = `
query GetProductColor { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} ) {
products_data{ color color_id } } }
`

export const GET_PRODUCT_SKU = `
query GetProductSku { getProductConfiguration( name: {name} sphere: {sphere} axis: {axis} cylinder: {cylinder} base_curve: {base_curve} diameter: {diameter} add: {add} color: {color}) {
products_data{ sphere axis cylinder base_curve diameter add sku } } }
`