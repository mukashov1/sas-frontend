import $api from "../http/api";

export default class UserService {
  static fetchUsers() {
    console.log("fetchUSers");
    return $api.get("/users");
  }
}
