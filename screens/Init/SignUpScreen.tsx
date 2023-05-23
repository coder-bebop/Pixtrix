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
import { AuthType } from "../../constants/models/auth";
import { AuthContext } from "../../store/context/auth";

function SignUpScreen({ navigation }) {
  const { authenticate } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        "Password should be similar in both text spaces"
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

    try {
      const token = await authenticate(AuthType.Create, email, password);
      navigation.navigate("Confirmation", { params: { token: token } });
    } catch (error) {
      console.error(error);
    }
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
        onChangeText={changeUserInput.bind(this, "email")}
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
        onChangeText={changeUserInput.bind(this, "password")}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry={true}
        value={userInfo.confirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={changeUserInput.bind(this, "confirmPassword")}
      />
      <Pressable
        onPress={handleSignUp}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
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
  pressed: {
    opacity: 0.65,
  },
});

export default SignUpScreen;
