import axios from "axios";
import authHeader from "./auth-header";
const API_URL =
  "http://22fb-2a01-e34-ec4d-1580-3425-7aee-3c9-51ab.ngrok.io/api/test/";
class UserService {

  async getMeeting() {
    try {
      const meetings = await axios.get(API_URL + "meeting", {
        headers: authHeader(),
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;
  }


  async getMeetingByIdOwner(idOwner) {
    try {
      console.log("idOwner :",idOwner)
      const meetings = await axios.get(API_URL + `getRencontreByIdUser/${idOwner}`,{
        headers: authHeader(),
      });
      return meetings.data;
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async getMeetingParticipationById(idUser) {
    try {
      const meetings = await axios.get(API_URL + `getParticipationByIdUser/${idUser}`, {
        headers: authHeader(),
      });
      return meetings.data;
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async postMeeting(meeting){
    try {
      const meetings = await axios.post(API_URL + "createRencontre", {
        "owner":meeting.owner,
        "sport":meeting.sport,
        "nombre_joueur":meeting.numbre_joueur,
        "plannedAt":meeting.plannedAt,
        "latitude":meeting.latitude,
        "longitude":meeting.longitude,
        "city":meeting.city,
        "address":meeting.address
      } ,{
        headers: authHeader(),
      
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;

  }
}
export default new UserService();
