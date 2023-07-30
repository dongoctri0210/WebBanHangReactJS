import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("brand/index");
}
function getByID(id) {
  return httpAxios.get(`brand/show/${id}`);
}
function create(brand) {
  return httpAxios.post("brand/store", brand);
}
function update(brand, id) {
  return httpAxios.post(`brand/update/${id}`, brand);
}
function remove(id) {
  return httpAxios.delete(`brand/destroy/${id}`);
}
function getBrandBySlug(slug) {
  return httpAxios.get("brand/show/" + slug);
}
const BrandService = {
  getAll: getAll,
  getBrandBySlug: getBrandBySlug,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default BrandService;
