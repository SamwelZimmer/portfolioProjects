import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs, getDoc, doc, query, limit, setDoc, orderBy, startAt } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADIQedyLqqvQk6R7f9LpTZZjOpnpF94aA",
    authDomain: "personal-site-9c7e7.firebaseapp.com",
    projectId: "personal-site-9c7e7",
    storageBucket: "personal-site-9c7e7.appspot.com",
    messagingSenderId: "399920177967",
    appId: "1:399920177967:web:c4351948940ef363af37da",
    measurementId: "G-VXFM0FDBDX"
};
  
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// Initialisation can only happen once, this stop re-firing
function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
export { firebaseApp, getAnalytics, logEvent };

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';




//* FUNCTIONS *//
export const getAllProjects = async () => {

  const querySnapshot = await getDocs(collection(firestore, "projects"));
    
  const projects = querySnapshot.docs.map(doc => {

    const data = doc.data();
    
    return { 
      id: doc.id, 
      ...data,
      datetime: data.datetime.toDate(),
    }
  });

  return projects;
}

export const getProject = async (id) => {
  const projectDoc = doc(firestore, "projects", id);
  const projectSnapshot = await getDoc(projectDoc);

  if (projectSnapshot.exists()) {
    const data = projectSnapshot.data();
    
    return {
      id: projectSnapshot.id,
      ...data,
      datetime: data.datetime?.toDate() || "" // Convert datetime to Date object if it exists
    }
  } else {
    console.log(`No project found with id: ${id}`);
    return null;
  }
}


export const similarProjects = async (id, n=5) => {

  try {
    // get the target document by ID
    const docRef = doc(firestore, "projects", id);
    const docSnapshot = await getDoc(docRef);

    // check the document exists
    if (!docSnapshot.exists()) {
      console.log("No document found with the given ID.");
      return [];
    }

    // retrieve the categories property from that document
    const targetCategories = docSnapshot.data().categories || [];

    // get all other documents in the collection
    const collectionRef = collection(firestore, "projects");
    const collectionSnapshot = await getDocs(collectionRef);
    
    // init empty array
    const similarities = [];

    // iterate through each item in the collection
    collectionSnapshot.forEach(otherDoc => {

      // ignore if the item is same as the input doc
      if (otherDoc.id != id) {

        // get the categories common to the input doc and the other items in the collection
        const otherCategories = otherDoc.data().categories || [];
        const commonCategories = targetCategories.filter(category => otherCategories.includes(category));

        // push each document and its similarity score to the similarities array
        similarities.push({
          id: otherDoc.id,
          similarity: commonCategories.length,
        });
      }
    });

    // sort the results based on the similarity score and return the top n
    return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, n);

  } catch (error) {
      console.error("Error fetching similar documents:", error);
    return [];
  }
}