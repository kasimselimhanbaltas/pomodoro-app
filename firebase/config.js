import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "@firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC6eHpcFWT0au8RgZmJmGfxBASWBetyiHY",
  authDomain: "pomodoro-c3e2e.firebaseapp.com",
  projectId: "pomodoro-c3e2e",
  storageBucket: "pomodoro-c3e2e.appspot.com",
  messagingSenderId: "1074935073713",
  appId: "1:1074935073713:web:d944ba0ed439b834b38b90",
  measurementId: "G-F08M1CDGBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const loginWithGoogle = async() => {
  let user = {};
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider)
    .then(result => {
      console.log("result: " ,result);
      console.log("result user: ", result.user);
      user = result.user;
    });
  } catch (error) {
    console.error(error);
  }
  return user;
}

const db = getFirestore();


export const saveUser = async(currUserID) => {
  // console.log("FT/current user id:", currUserID)
  let alreadySaved = false;
  const querySnapshot = await getDocs(collection(db, "users")).then((snapshot) => {
    let uids = [];
    snapshot.docs.forEach((doc) => {
      uids.push({...doc.data(), id: doc.id})
    })
    // console.log("uid'ler: ")
    uids.forEach((uid) => {
      // console.log(uid.id);
      if (currUserID === uid.id){
        alreadySaved = true;
      }
    })
  });
  console.log("User already exists: ", alreadySaved)
  if(!alreadySaved) { // create user document -> users/uid
    let tasks = [
      {
        name: "ExampleTask1",
        successfulPomodoros: 30,
        estimatedPomodoros: 45
      },
      {
        name: "ExampleTask2",
        successfulPomodoros: 15,
        estimatedPomodoros: 45
      },
    ]
    await updateTasks(currUserID, tasks)
    .catch((err) => {
      console.log("User id adding error: ", err)
    })
  }
}

export const updateTasks = async(currUserID, tasks) => {
  await setDoc(doc(db, "users", currUserID),{ tasks })
}

export const getTasks = async (currUserID) => {
  const docRef = doc(db, "users", currUserID);
  const docSnap = await getDoc(docRef);
  let fetchedTasks = [];
  if (docSnap.exists()) {
    fetchedTasks = docSnap.data().tasks;
    console.log("Users tasks: ", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return fetchedTasks;
}



// const addTask = () => {
//   db.collection('users').doc(this.$store.state.user.uid).collection('tasks').add({
//     name: this.taskName,
//     successfulPomodoros: this.successfulPomodoros,
//     estimatedPomodoros: this.estimatedPomodoros
//   })
//   .then(() => {
//     console.log('Task added successfully')
//   })
//   .catch((error) => {
//     console.error('Error adding task: ', error)
//   })
// }
