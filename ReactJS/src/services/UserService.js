import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("user/index");
}
function getByID(id) {
  return httpAxios.get(`user/show/${id}`);
}
function create(user) {
  return httpAxios.post("user/store", user);
}
function update(user, id) {
  return httpAxios.post(`user/update/${id}`, user);
}
function remove(id) {
  return httpAxios.delete(`user/destroy/${id}`);
}
const UserService = {
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default UserService;
