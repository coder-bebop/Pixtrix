import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  LoginScreen,
  SignUpScreen,
  ConfirmationScreen,
  HomeScreen,
  SearchScreen,
  ProfileScreen,
} from "../screens";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);

  function MainScreens() {
    return (
      <BottomTabs.Navigator initialRouteName="Home">
        <BottomTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" color={color} size={size} />
            ),
          }}
        />
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

  // TODO:
  // isAuthenticated ? <InitScreens /> : <MainScreens />
  return (
    <AuthContextProvider>
      <NavigationContainer>
        {false ? <InitScreens /> : <MainScreens />}
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default Navigation;
