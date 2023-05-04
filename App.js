import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  LoginScreen,
  SignUpScreen,
  ConfirmationScreen,
  HomeScreen,
  SearchScreen,
  SettingsScreen,
} from "./screens";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {
  function MainScreens() {
    return (
      <BottomTabs.Navigator initialRouteName="Home">
        <BottomTabs.Screen name="Home" component={HomeScreen} />
        <BottomTabs.Screen name="Search" component={SearchScreen} />
        <BottomTabs.Screen name="Settings" component={SettingsScreen} />
      </BottomTabs.Navigator>
    );
  }

  function InitScreens() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    );
  }

  function Navigation() {
    //const { isAuthenticated } = useContext(AuthContext);

    return (
      <NavigationContainer>
        {false ? <InitScreens /> : <MainScreens />}
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
