import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthType } from "../../constants/models/auth";
import { AuthContext } from "../../store/context/auth";

function LoginScreen({ navigation }) {
  const { authenticate } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    setIsAuthenticated(false);

    try {
      const { email, password } = userInfo;
      const token = await authenticate(AuthType.LogIn, email, password);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log("Error signing in with email and password:", error);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  function handleUserInput(identifier, newInfo) {
    setUserInfo((currentInfo) => {
      return { ...currentInfo, [identifier]: newInfo };
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Main", { screen: "Home" });
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/pixtrix_logo.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={handleUserInput.bind(this, "email")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={userInfo.password}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={handleUserInput.bind(this, "password")}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={styles.signUpView}>
        <Text style={styles.signUpText}>
          Don't have an account yet?{" "}
          <Pressable onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign up here</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    width: "85%",
    height: 150,
    marginBottom: 50,
    borderRadius: 30,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#8B2F75",
    borderRadius: 10,
    padding: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  signUpView: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    color: "black",
    fontSize: 15,
  },
  signUpButtonText: {
    color: "blue",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    color: "grey",
    fontSize: 16,
  },
});

export default LoginScreen;
