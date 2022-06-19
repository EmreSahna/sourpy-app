import http from "./http-config";

class HttpRequest {
  createUser(data){
    return http.post("/user",data);
  }

  getUser(username){
    return http.get(`/users/${username}`);
  }

  addApiKey(data, username){
    return http.post(`/key/${username}`,data);
  }

  deleteApiKey(username,id) {
    return http.delete(`/keys/${username}/${id}`);
  }

  updateKey(id,data) {
    return http.put(`/keys/${id}`,data);
  }
}

export default new HttpRequest();