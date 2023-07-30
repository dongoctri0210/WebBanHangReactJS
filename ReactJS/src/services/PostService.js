import httpAxios from "../httpAxios";
function getAll() {
  return httpAxios.get("post/index");
}
function getByID(id) {
  return httpAxios.get(`post/show/${id}`);
}
function create(post) {
  return httpAxios.post("post/store", post);
}
function update(post, id) {
  return httpAxios.post(`post/update/${id}`, post);
}
function remove(id) {
  return httpAxios.delete(`post/destroy/${id}`);
}
function getPostAll(limit, page = 1) {
  return httpAxios.get(`post_all/${limit}/${page}`);
}
function getPostBySlug(slug) {
  return httpAxios.get(`post_detail/${slug}`);
}
const PostService = {
  getPostBySlug: getPostBySlug,
  getPostAll: getPostAll,
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
export default PostService;
