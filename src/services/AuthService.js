import $api from "../http/api";

export default class AutService {
  static async login(userId, password) {
    return $api.post("/login", { userId, password });
  }
  static async registration(userId, password) {
    return $api.post("/registration", { userId, password });
  }
  static async logout(userId, password) {
    return $api.post("/logout");
  }
}
