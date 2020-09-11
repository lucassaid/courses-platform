import admin, { firestore } from '../../../firebase/admin'

const getUsersFromDb = async () => {
  const querySnapshot = await firestore.collection('users').get()
  let result = {}
  querySnapshot.forEach(doc => {
    const data = doc.data()
    data.createdAt = data.createdAt ? data.createdAt.toJSON() : false
    data.lastUpdate = data.lastUpdate ? data.lastUpdate.toJSON() : false
    result[doc.id] = { ...data, id: doc.id }
  })
  return result
}

export default async function (req, res) {
  try {
    // const { token } = JSON.parse(req.body);
    const users = await getUsersFromDb()
    for(let uid in users) {
      const userRecord = await admin.auth().getUser(uid)
      users[uid] = {
        ...users[uid], // from firestore
        ...userRecord.toJSON() // from auth
      }
    }
    res.send(users);
  } catch(error) {
    console.log(error);
    res.status(403).send(error);
  }
};