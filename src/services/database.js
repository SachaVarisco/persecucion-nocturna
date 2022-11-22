import { initializeApp } from 'firebase/app'
import {get, getDatabase, ref, set, child} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB-tS0clpaUg5Vn0CwParJqKsCtYCIFaSg",
    authDomain: "persecucion-nocturna.firebaseapp.com",
    projectId: "persecucion-nocturna",
    storageBucket: "persecucion-nocturna.appspot.com",
    messagingSenderId: "615769933382",
    appId: "1:615769933382:web:6bc0056124072545162c47",
    measurementId: "G-ZD7VT5XBF4"

    databaseURL: "https://persecucion-nocturna-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function EscribirDato(victoryId){
        
    set(ref(db, 'users/' + victoryId), {
        victoryId : victory,
    });
}

export async function LeerDato(){
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, 'users/${victoryId}')).then((snapshot)=> {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available (control)");
        }
        }).catch((error) => {
        console.error(error);
    });
}

export async function ActualizarDato(victoryId){
    const vicData = {
        victory : victoryId,
    }

    const newVicKey = push(child(ref(db),'posts')).key;

    const updates = {};
    updates['/posts/' + newVicKey] = vicData;

    return update(ref(db), updates);

}
    
