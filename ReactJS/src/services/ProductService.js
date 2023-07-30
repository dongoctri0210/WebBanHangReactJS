import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("product/index");
}
function getByID(id) {
  return httpAxios.get(`product/show/${id}`);
}
function create(product) {
  return httpAxios.post("product/store", product);
}
function update(product, id) {
  return httpAxios.post(`product/update/${id}`, product);
}
function remove(id) {
  return httpAxios.delete(`product/destroy/${id}`);
}
function getProductAll(limit, page = 1) {
  return httpAxios.get(`product_all/${limit}/${page}`);
}
function getProductBySlug(slug) {
  return httpAxios.get(`product_detail/${slug}`);
}
function getProductByCategoryID(category_id, limit) {
  return httpAxios.get(`product_category/${category_id}/${limit}`);
}
function getProductByBrandID(brand_id, limit) {
  return httpAxios.get(`product_brand/${brand_id}/${limit}`);
}
function getProductHome(limit, category_id) {
  return httpAxios.get(`product_home/${limit}/${category_id}`);
}
const ProductService = {
  getProductByBrandID: getProductByBrandID,
  getProductByCategoryID: getProductByCategoryID,
  getProductHome: getProductHome,
  getProductBySlug: getProductBySlug,
  getProductAll: getProductAll,
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default ProductService;
