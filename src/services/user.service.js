import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://f201-2a01-e34-ec4d-1580-5bc-4e2d-f7a8-4194.ngrok.io/api/test/";
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  async getMeeting() {
    console.log("Header in local storage ! ",await authHeader())
    try{
      const meetings = await axios.get(API_URL + 'meeting', { headers: authHeader() });
      return meetings
    }catch(e){
      console.log(e)
    }
    
    return;
  }
}
export default new UserService();