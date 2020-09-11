const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

const createProfile = (userRecord, context) => {
  console.log("creando profile", userRecord)
  const { email, phoneNumber, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({})
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
};