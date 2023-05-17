import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../store/context/auth";
import { createUser } from "../../backend/auth";

function SignUpScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeUserInputBound = (identifier) =>
    changeUserInput.bind(this, identifier);

  async function handleSignUp() {
    const { email, password, confirmPassword } = userInfo;

    if (!(email && password && confirmPassword)) {
      Alert.alert(
        "Missing information",
        "Text spaces should not be left blank"
      );

      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Please confirm your password",
        "For your benefit, your password should be similar in both text spaces"
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password is too short",
        "Password should be longer than 6 digits"
      );

      return;
    }

    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      authContext.authenticate(token);
      navigation.navigate("Confirmation");
    } catch (error) {
      console.error(error);
    }

    setIsAuthenticating(false);
  }

  function changeUserInput(identifier, newInfo) {
    setUserInfo((currentInfo) => {
      return { ...currentInfo, [identifier]: newInfo };
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={changeUserInputBound("email")}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={userInfo.password}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={changeUserInputBound("password")}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry={true}
        value={userInfo.confirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={changeUserInputBound("confirmPassword")}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
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
  signUpButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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

export default SignUpScreen;
