import { makeAutoObservable } from "mobx";
import AutService from "./services/AuthService";
import axios from "axios";
import UserService from "./services/UserService";
class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  checked = false;
  role = 'student'
  constructor() {
    makeAutoObservable(this);
    console.log("we are inside of constructor")
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setUser(savedUser);
      console.log("user is set")
    }
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;

  }
  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(userId, password) {
    try {
      const response = await AutService.login(userId, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
      return error?.response?.data;
    }
  }

  async registration(userId, password) {
    try {
      const response = await AutService.registration(userId, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
      return error?.response?.data;
    }
  }

  async logout(userId, password) {
    try {
      const response = await AutService.logout(userId, password);
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async edit(data) {
    try {
      const response = await UserService.edit(data);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
      return error?.response?.data;
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
    } finally {
      this.setLoading(false);
      this.check = true;
    }
  }
}

const store = new Store()
export default store;