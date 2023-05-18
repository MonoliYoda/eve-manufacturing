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
  where,
} from "firebase/firestore";
const fetchRetry = require("fetch-retry")(global.fetch);

const FirebaseContext = React.createContext();

export function FirebaseProvider({ children }) {
  const corsProxy = process.env.REACT_APP_CORS_PROXY_URL;
  const [currentItem, setCurrentItem] = useState();
  const [viewingBlueprint, setViewingBlueprint] = useState();
  const [treeStructure, setTreeStructure] = useState();
  const [priceCache, setPriceCache] = useState({});

  async function getBlueprintForID(id) {
    if (!id) {
      console.log("Invalid ID passed to function getBlueprintForID(): ", id);
      return false;
    }
    const q = query(
      collection(db, "blueprints"),
      where("products.typeid", "==", id)
    );
    let docs = await getDocs(q);
    //console.log(docs.docs[0]);
    if (docs.docs.length === 0) {
      //console.log("No blueprints found!");
      return false;
    }
    return docs.docs[0].data();
  }

  async function getNameByID(id) {
    if (!id) {
      console.log("Invalid ID passed to function getNameByID(): ", id);
      return false;
    }
    const q = doc(db, "typeids", id.toString());
    let document = await getDoc(q);
    //console.log(document.data());
    return document.data().typeName;
  }
  async function getItemByID(id) {
    if (!id) {
      console.log("Invalid ID passed to function getItemByID(): ", id);
      return false;
    }
    const q = doc(db, "typeids", id.toString());
    const document = await getDoc(q);
    //console.log(document.data());
    return document.data();
  }

  async function setCurrentItemByID(id) {
    if (!id) {
      console.log("Invalid ID passed to function setCurrentItemByID(): ", id);
      return false;
    }
    const item = await getItemByID(id);
    if (item) {
      setCurrentItem(item);
    }
  }

  async function setViewingBlueprintByID(id, quantity) {
    if (!id) {
      console.log("Invalid ID passed to function setCurrentItemByID(): ", id);
      return false;
    }
    const blueprint = await getBlueprintForID(id);
    if (blueprint) {
      setViewingBlueprint({
        ...blueprint,
        multiplier: quantity / blueprint.products.quantity,
      });
      console.log(viewingBlueprint);
    }
  }

  async function generateTreeForID(id) {
    console.log("Generating tree structure for ID ", id);
    if (!id) {
      console.log("Invalid ID passed to function generateTreeForID(): ", id);
      return false;
    }
    let itemID = 1;
    let expandableIDs = ["1"];
    const bp = await getBlueprintForID(id);
    const checkMaterials = async (materials) => {
      //console.log("Checking materials: ", materials);
      let output = await Promise.all(
        materials.map(async (material) => {
          const matBP = await getBlueprintForID(material.typeid);
          const matName = await getNameByID(material.typeid);
          if (matBP) {
            //console.log("Found BP for material ID: ", material.typeid);
            const subMaterials = await checkMaterials(matBP.materials);
            matBP.children = subMaterials;
            itemID++;
            expandableIDs.push(itemID.toString());
            return {
              ...material,
              id: itemID.toString(),
              blueprint: matBP,
              name: matName,
              children: subMaterials,
            };
          } else {
            itemID++;
            return { ...material, name: matName, id: itemID.toString() };
          }
        })
      );
      return output;
    };

    const itemName = await getNameByID(id);
    if (bp.materials) {
      const itemChildren = await checkMaterials(bp.materials);
      const tree = {
        id: "1",
        children: itemChildren,
        name: itemName,
        expandableIDs: expandableIDs,
        blueprint: bp,
        typeid: bp.products.typeid,
        quantity: 1,
      };
      //console.log("Material Tree: ");
      //console.dir(tree, { depth: null });
      setTreeStructure(tree);
      setViewingBlueprint({ ...bp, quantity: 1, typeid: bp.products.typeid });
    }
  }

  function addToPriceCache(id, object) {
    function addMinutes(date, minutes) {
      return date.setMinutes(date.getMinutes() + minutes);
    }
    //console.log("Current Price cache: ", priceCache);
    if (id in priceCache) {
      return;
    } else {
      const expiryTime = addMinutes(new Date(), 5);
      object.expiry = expiryTime;
      //console.log("Adding new object to price cache... ID: ", id, object);
      setPriceCache((priceCache[id] = object));
    }
  }

  async function getPrice(id) {
    async function fetchWithRetry(url, retries) {
      let res = await fetchRetry(url, {
        retryOn: async function (attempt, error, response) {
          if (attempt > retries) return false;
          let responseValue = await response.clone().text();
          if (responseValue[0] !== "{") {
            return true;
          }
        },
        retryDelay: Math.floor(Math.random() * 3000) + 1000,
      }).then(function (response) {
        return response.text();
      });
      try {
        return JSON.parse(res);
      } catch {
        console.log("Failed to fetch for URL: ", url, " response: ", res);
      }
    }
    //console.log(priceCache[id]);
    if (priceCache[id]) {
      console.log("Returning id ", id, " from Cache!");
      return priceCache.id;
    } else {
      ///console.log(id, " not found in cache, fetching data.");
      // Fetch
      let data = await fetchWithRetry(
        `${corsProxy}https://evetycoon.com/api/v1/market/stats/10000002/${id}`,
        3
      );
      //console.log("Fetched data: ", data, " for ID ", id);
      // Add to cache
      addToPriceCache(id, data);
      // Return
      return data;
    }
  }

  function formatCurrency(number) {
    const decPlaces = 2;
    const currencySetup = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decPlaces,
    });
    return currencySetup.format(number).slice(1) + " ISK";
  }

  const value = {
    currentItem,
    setCurrentItemByID,
    corsProxy,
    formatCurrency,
    getBlueprintForID,
    getNameByID,
    getItemByID,
    generateTreeForID,
    treeStructure,
    viewingBlueprint,
    setViewingBlueprintByID,
    getPrice,
  };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext };
