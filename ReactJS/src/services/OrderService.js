import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("order/index");
}
function getByID() {}
function create() {}
function update() {}
function remove() {}
const OrderService = {
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default OrderService;
