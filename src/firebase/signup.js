import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Get the authentication instance
const auth = getAuth(firebase_app);

/**
 * Function to sign up a user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Object} - An object containing the result and error (if any)
 */
export default async function signUp(email, password) {
  let result = null, // The result of the sign-up process
    error = null; // Any error that occurs during sign-up

  try {
    // Attempt to create a new user with the provided email and password
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    // If an error occurs, assign it to the 'error' variable
    error = e;
  }

  // Return an object with the result and error
  return { result, error };
}
