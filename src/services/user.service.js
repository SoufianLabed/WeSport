import axios from "axios";
import authHeader from "./auth-header";
const API_URL =
  "http://623e-2a01-e34-ec4d-1580-3425-7aee-3c9-51ab.ngrok.io/api/test/";
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

  async getUser(idUser) {
    try {
      console.log("l'idUser ici",idUser)
      const meetings = await axios.get(API_URL + `user/${idUser}`, {
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
      return meetings;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  async getMeetingParticipationById(idUser) {
    try {
      console.log("idUser :",idUser)
      const meetings = await axios.get(API_URL + `getParticipationByIdUser/${idUser}`, {
        headers: authHeader(),
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async getParticipationByIdOwner(idOwner) {
    try {
      const meetings = await axios.get(API_URL + `getParticipationByIdOwner/${idOwner}`, {
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

  async putUser(user){
    try {
      const meetings = await axios.put(API_URL + "user", {
        "id":user.id,
        "email":user.username,
        "username":user.email,
      } ,{
        headers: authHeader(),
      
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  async postParticipation(participation){
    try {
      console.log(participation)
      const meetings = await axios.post(API_URL + "createParticipation", {
        "playerId":participation.rencontre_id,
        "rencontreId":participation.player_id,
        "status":"WAITING_APPROVAL"
      } ,{
        headers: authHeader(),
      
      });
      return meetings;
    } catch (e) {
      console.log(e);
    }

    return;

  }

  async putParticipation(participation){
    try {
      const meetings = await axios.put(API_URL + "^articipation", {
        "id":participation.id,
        "player_id":participation.username,
        "rencontre_id":participation.email,
        "status":"WAITING_APPROVAL"
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

