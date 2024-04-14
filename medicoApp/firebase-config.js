import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getDatabase,ref,set,get,child} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCX4jPxFJQC5T1zDPzrKz3HRYQdeps2St4",
  authDomain: "medico-5add3.firebaseapp.com",
  projectId: "medico-5add3",
  storageBucket: "medico-5add3.appspot.com",
  messagingSenderId: "468442720217",
  appId: "1:468442720217:web:4346fe0419451e1fe39bc8",
  measurementId: "G-V475XKKJSM",
};

const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const database = getDatabase()
const dbRef = ref(database)

export const saveToken = async (userId ,token)=>{
  const values = (await get(child(dbRef,`userTokens/${userId}`))).val() ?? {}
  const payload = {...values,token}
  set(ref(db,`userTokens/${userId}/`),payload)
}

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(DB, `users/${user.uid}`);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, number } = additionalData;

    if (email) {
      // Check if email is defined before setting it
      try {
        await setDoc(userRef, {
          email,
          number,
          image: null,
          createdAt: new Date(),
          name: "flen",
          age: null,
          gender: null,
          birhdate: null,
          reviewId: null,
          doctorId: null,
          nurseId: null,
        });
      } catch (error) {
        console.log("Error in creating user", error);
      }
    } else {
      console.log("Email is missing or undefined.");
    }
  }
};

export const updateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(DB, `users/${user.uid}`);

  try {
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      // Get the existing user data
      const userData = snapshot.data();

      // Merge the existing data with the additional data, filling in null values for missing fields
      const updatedData = {
        ...userData,
        ...additionalData,
      };

      await setDoc(userRef, updatedData);
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating user document:", error);
  }
};
