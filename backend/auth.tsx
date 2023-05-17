import { Alert } from "react-native";
import { firebaseConfig } from "./firebase";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts";
const API_KEY = firebaseConfig.apiKey;

const authenticate = async (mode: string, email: string, password: string) => {
  const { data, status } = await fetch(`${BASE_URL}:${mode}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  }).then((response) => response.json());

  if (status === 200) {
    return data?.idToken;
  } else {
    const error = data?.error?.message;

    Alert.alert("Error", error);
    throw new Error(error);
  }
};

// Sign up with email and password
export function createUser(email, password) {
  try {
    return authenticate("signUp", email, password);
  } catch (error) {
    console.error("Error signing up with email and password:", error);
    throw error;
  }
}

// Sign in with email and password
export async function login(email, password) {
  try {
    return authenticate("signInWithPassword", email, password);
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
}

// Sign out the current user
export async function singOut(idToken) {
  try {
    const { data, status } = await fetch(`${BASE_URL}:signOut?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    }).then((response) => response.json());

    if (status !== 200) {
      Alert.alert("Error", data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

// Get the current user
export const getCurrentUser = async (idToken) => {
  try {
    const { data, status } = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
      }
    ).then((response) => response.json());

    if (status === 200) {
      return data.users[0];
    } else {
      Alert.alert("Error", data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};
