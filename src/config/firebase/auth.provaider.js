import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "./firebase.config";
import { toast } from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const googleAuthLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const userInfo = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      id: result?.user?.uid,
      photoURL: result?.user?.photoURL,
    };

    return userInfo;
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

export const facebookAuthLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);

    const userInfo = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      id: result?.user?.uid,
      photoURL: result?.user?.photoURL,
    };

    return userInfo;
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

export const githubAuthLogin = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const userInfo = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      id: result?.user?.uid,
      photoURL: result?.user?.photoURL,
    };

    return userInfo;
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

export const createUser = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (result?.user?.email) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    const userInfo = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      id: result?.user?.uid,
    };

    return userInfo;
  } catch (error) {
    toast.error(error.code);
  }
};

export const signInEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const userInfo = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      id: result?.user?.uid,
      photoURL: result?.user?.photoURL,
    };

    return userInfo;
  } catch (error) {
    toast.error(error.code);
  }
};
