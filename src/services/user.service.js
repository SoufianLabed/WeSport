import axios from "axios";
import authHeader from "./auth-header";
const API_URL =
  "http://834e-2a01-e34-ec4d-1580-561-9876-acd7-46ef.ngrok.io/api/test/";
class UserService {

  async getMeeting() {
    console.log("Header in local storage ! ", await authHeader());
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
    console.log("Header in local storage ! ", await authHeader());
    try {
      const meetings = await axios.get(API_URL + `getRencontreByIdUser/${idOwner}`,{
        headers: authHeader(),
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async getMeetingParticipationById(idUser) {
    console.log("Header in local storage ! ", await authHeader());
    try {
      const meetings = await axios.get(API_URL + `/getParticipationByIdUser/${idUser}`, {
        headers: authHeader(),
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async postMeeting(meeting){
    console.log("Meeting",meeting)

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
