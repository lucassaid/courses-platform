import admin from '../../firebase/admin'

export default async function (req, res) {
  // retreives a token to temporarily authenticate the user
  try {
    const sessionCookie = req.cookies.session || '';
    const { uid } = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    const customToken = await admin.auth().createCustomToken(uid)
    res.status(200).send(customToken)
  } catch(err) {
    res.status(403).send(err)
  }
}