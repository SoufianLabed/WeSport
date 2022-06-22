import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authHeader() {
  const user = JSON.parse(await AsyncStorage.getItem("user"));

  console.log("Auth header", user);
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
