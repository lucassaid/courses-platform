import admin from '../../../firebase/admin'
import { getDoc } from '../../../firebase/admin-functions'

export default async function (req, res) {
  try {
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    const { uid } = decodedClaims
    const userDoc = await getDoc(uid, {path: ['users']})
    res.send({user: {...userDoc[uid], ...decodedClaims}})
  } catch(err) {
    console.log("Error verifying cookie", err)
    res.status(403).send(err)
  }
}