import httpAxios from "../httpAxios";
//back-end
function getAll() {
  return httpAxios.get("menu/index");
}
function getByID(id) {
  return httpAxios.get(`menu/show/${id}`);
}
function create(menu) {
  return httpAxios.post("menu/store", menu);
}
function update(menu, id) {
  return httpAxios.post(`menu/update/${id}`, menu);
}
function remove(id) {
  return httpAxios.delete(`menu/destroy/${id}`);
}
//front-end
function getByParentID(position, parent_id) {
  return httpAxios.get(`menu_list/${position}/${parent_id}`);
}
const MenuService = {
  getByParentID: getByParentID,
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default MenuService;
