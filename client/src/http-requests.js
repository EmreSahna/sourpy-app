import http from "./http-config";

class HttpRequest {
    /*
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  updateComment(data) {
    return http.put("/comment", data);
  }

  deleteComment(id, userId) {
    return http.delete(`/comment?id=${id}`, {data:{user_id: userId}});
  }

  */
  createUser(data){
    return http.post("/user",data);
  }

  getUser(username){
    return http.get(`/users/${username}`);
  }

  addApiKey(data, username){
    return http.post(`/key/${username}`,data);
  }

  listApiKey(username){
    return http.get(`/users/${username}`);
  }
}

export default new HttpRequest();