import axios from "axios";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
const API_URL = "http://localhost:8080/api/auth/";
class AuthService {

  
  async login(username, password) {
    console.log(username,password)
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          try{
            AsyncStorage.setItem("user", JSON.stringify(response.data));
          }catch(e){
            console.log(e)
          }
        
        }
        return response.data;
      });
  }
  async logout() {
    await AsyncStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
   async getCurrentUser() {
    
    try{
       console.log("getCurrentUser",await AsyncStorage.getItem("user"))
       return JSON.parse(await AsyncStorage.getItem("user"))
    }catch(e){
      console.log(e)
    }
    
    return;
  }
}
export default new AuthService();