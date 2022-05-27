import React from "react";
import {
  Text,
  Image,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./unicorn1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Book for Min</Text>
        <Text style={styles.text}>
          Kho sách miễn phí cho bạn!
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <LinearGradient colors={["#d1a0a7", "#d1a0a7"]} style={styles.signIn}>
            <Text style={styles.textSign}>Bắt đầu ngay</Text>
            <MaterialIcons
              style={{ paddingRight: 50 }}
              name="navigate-next"
              color="#fff"
              size={24}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#009387",
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    fontSize: 17,
    marginTop: 5,
  },
  signIn: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    
  },
});

