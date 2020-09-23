import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDX5ejKIaaqLEJs1WfBStKVsYYoxntmjIg",
  authDomain: "cwrn-db-ea037.firebaseapp.com",
  databaseURL: "https://cwrn-db-ea037.firebaseio.com",
  projectId: "cwrn-db-ea037",
  storageBucket: "cwrn-db-ea037.appspot.com",
  messagingSenderId: "456397293155",
  appId: "1:456397293155:web:9ca24dd0c88dd6f6249a56",
  measurementId: "G-N0TV06Q68M",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
