// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import  firebase from 'firebase';
import { Platform } from 'react-native'
// import { initializeApp } from 'firebase/app';
// require("firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyAgDjNtnKMfinuNAHddBe8OnSBeivNnUFw",
  authDomain: "fresh-basket-1ee04.firebaseapp.com",
  projectId: "fresh-basket-1ee04",
  storageBucket: "fresh-basket-1ee04.appspot.com",
  messagingSenderId: "39663268992",
  appId: "1:39663268992:web:423982874875d703be2265",
  measurementId: "G-0V9W5N7DX2"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export async function uploadImageAsync(uri, name) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  console.log("uploadImageAsync");
  const ref = firebaseApp.storage().ref().child("image/"+ name);
  const snapshot = await ref.put(blob);

  
  // We're done with the blob, close and release it
  if(Platform.OS != 'web'){
    blob.close();
  }

  return await snapshot.ref.getDownloadURL();
}
