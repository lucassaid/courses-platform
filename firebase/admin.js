const admin = require("firebase-admin");

// const serviceAccount = require("../service-account.json");
const serviceAccount = JSON.parse(process.env.GCP_SERVICE_ACCOUNT)

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://juliamelie.firebaseio.com"
  });
}

export default admin

export const firestore = admin.firestore();