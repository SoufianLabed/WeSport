import axios from "axios";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import authHeader from "./auth-header";

const API_URL = "http://cca1-2a01-e34-ec4d-1580-d19f-cb5f-9676-4a14.ngrok.io/api/auth/";


class AuthService {

  
  async login(username, password) {
    console.log(username,password)
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      /*
      .then(response => {
        if (response.data.accessToken) {
          try{
            AsyncStorage.setItem("user", JSON.stringify(response.data));
          }catch(e){
            console.log(e)
          }
        
        }
        return response.data;
      });*/
  }
  async logout() {
    await AsyncStorage.removeItem("user");
  }
  register(username, email, password) {
    console.log("AUTH SERVICE",username, email, password)
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


  async getMeeting() {
    try{
      return await axios.get(API_URL + 'meeting', { headers: authHeader() });
    }catch(e){
      console.log(e)
    }
    
    return;
  }
}
export default new AuthService();