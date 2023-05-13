import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const FirebaseContext = React.createContext();

export function FirebaseProvider({ children }) {
  const [currentItem, setCurrentItem] = useState();
  async function getBlueprintForID(id) {
    const q = query(collection(db, "blueprints"));
    const res = await getDocs(q);
    return res;
  }

  const value = {
    getBlueprintForID,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
