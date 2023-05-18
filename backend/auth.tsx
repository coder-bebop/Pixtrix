import { BASE_URL, firebaseConfig } from "./firebase";

async function authenticate(mode: string, body: Object) {
  const fireBaseURL = `${BASE_URL}:${mode}?key=${firebaseConfig.apiKey}`;
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const { data, ok } = await fetch(fireBaseURL, requestInit).then((response) =>
    response.json()
  );

  if (ok) {
    return data?.idToken;
  } else {
    throw new Error(data?.error?.message);
  }
}

// Sign up with email and password
function createUser(email: string, password: string) {
  const body = {
    email,
    password,
    returnSecureToken: true,
  };

  return authenticate("signUp", body);
}

// Sign in with email and password
async function login(email: string, password: string) {
  const body = {
    email,
    password,
    returnSecureToken: true,
  };

  return authenticate("signInWithPassword", body);
}

// Sign out the current user
function signOut(idToken) {
  const body = {
    idToken,
  };

  return authenticate("signOut", body);
}

// Get the current user
function getCurrentUser(idToken) {
  const body = {
    idToken,
  };

  return authenticate("lookup", body);
}

export { createUser, login, signOut, getCurrentUser };
