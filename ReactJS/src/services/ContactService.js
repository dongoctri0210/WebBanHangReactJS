import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("contact/index");
}
function getByID(id) {
  return httpAxios.get(`contact/show/${id}`);
}
function create(contact) {
  return httpAxios.post("lien-he/store", contact);
}
function update(contact, id) {
  return httpAxios.post(`contact/update/${id}`, contact);
}
function remove(id) {
  return httpAxios.delete(`contact/destroy/${id}`);
}
const ContactService = {
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default ContactService;
