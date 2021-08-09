import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { config } from "./config";

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: "",
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();

interface IAuth {
  user: firebase.User | null;
  loggedIn: boolean;
}

const AuthContext = createContext<IAuth>({ user: null, loggedIn: false });

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState(auth.currentUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [init, setInit] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setLoggedIn(true);
      }

      setUser(firebaseUser);
      setInit(false);
    });
  }, []);

  if (init) {
    return <div>Loading</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
