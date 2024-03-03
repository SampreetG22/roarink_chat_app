import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unSub;
  }, []);
  return { user };
};

export default useAuth;
