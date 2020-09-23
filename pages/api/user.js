import admin from '../../firebase/admin'
import { getDoc, update } from '../../firebase/admin-functions'

export default async function (req, res) {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
    const { uid } = decodedClaims
    const userDoc = await getDoc(uid, {path: ['users']})
    
    if(req.method === 'GET') {
      res.send({user: {...userDoc[uid], ...decodedClaims}})
      // get all firestore user data with uid
      
    } else if(req.method === 'PUT') {
      // TODO secure this in rules
      // const config = {path: ['users', uid]}
      // await update(req.body.user, config)
      // res.send({...userDoc[uid], ...req.body.user})

    }
  } catch(err) {
    console.log("Error in user", req.method, err)
    res.status(403).send(err)
  }
}