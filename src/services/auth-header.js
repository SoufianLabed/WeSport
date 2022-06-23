import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authHeader() {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
