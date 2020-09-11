const admin = require("firebase-admin");

const serviceAccount = require("../service-account.json");

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://juliamelie.firebaseio.com"
  });
}

export default admin

export const firestore = admin.firestore();