import { initializeApp } from 'firebase/app'
import { sharedInstance as events } from '../scenes/EventCenter'
import {get, getDatabase, ref, set, child, update} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB-tS0clpaUg5Vn0CwParJqKsCtYCIFaSg",
    authDomain: "persecucion-nocturna.firebaseapp.com",
    projectId: "persecucion-nocturna",
    storageBucket: "persecucion-nocturna.appspot.com",
    messagingSenderId: "615769933382",
    appId: "1:615769933382:web:6bc0056124072545162c47",
    measurementId: "G-ZD7VT5XBF4",
    databaseURL: "https://persecucion-nocturna-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getData(){
    const dbRef = ref(db);
    get(child(dbRef, 'users/victoryId')).then((snapshot)=> {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            events.emit('dato-recibido', data)
         } else {
            console.log("No data available (control)");
         }
          }).catch((error) => {
         console.error(error);
    });
}

export async function pushData(victory){
    update(ref(db, 'users/'),{
        victoryId : victory
    })
    .then(()=>{
        console.log("data updated")
    })
    .catch((error)=>{
        console.log("not updated" + error)
    });
}
    
