import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("category/index");
}
function getByID(id) {
  return httpAxios.get(`category/show/${id}`);
}
function create(category) {
  return httpAxios.post("category/store", category);
}
function update(category, id) {
  return httpAxios.post(`category/update/${id}`, category);
}
function remove(id) {
  return httpAxios.delete(`category/destroy/${id}`);
}
function getCategoryByParentID(parent_id) {
  return httpAxios.get(`category_list/${parent_id}`);
}
function getCategoryBySlug(slug) {
  return httpAxios.get("category/show/" + slug);
}
const CategoryService = {
  getCategoryBySlug: getCategoryBySlug,
  getCategoryByParentID: getCategoryByParentID,
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default CategoryService;
