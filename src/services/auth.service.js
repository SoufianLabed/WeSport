import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authHeader from "./auth-header";

const API_URL =
  "http://22fb-2a01-e34-ec4d-1580-3425-7aee-3c9-51ab.ngrok.io/api/auth/";
  
class AuthService {
  async login(username, password) {
    console.log(username, password);
    return axios.post(API_URL + "signin", {
      username,
      password,
    });
  }
  async logout() {
    await AsyncStorage.removeItem("user");
  }
  register(username, email, password) {
    console.log("AUTH SERVICE", username, email, password);
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
  async getCurrentUser() {
    try {
      console.log("getCurrentUser", await AsyncStorage.getItem("user"));
      return JSON.parse(await AsyncStorage.getItem("user"));
    } catch (e) {
      console.log(e);
    }

    return;
  }
}
export default new AuthService();
