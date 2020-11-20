import admin from '../../../firebase/admin'
import { getDoc, update } from '../../../firebase/admin-functions'

const verifyAdmin = async req => {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    return decodedClaims.admin
  } catch(err) {
    return false
  }
}

export default async function (req, res) {
  try {
    if(req.method === 'GET') {
      const homeDoc = await getDoc('home', {path: ['customization']})
      res.status(200).send(homeDoc.home.contactData)
    }
    // } else if(req.method === 'PUT') {
    //   const admin = await verifyAdmin(req)
    //   if(!admin) throw new Error('Permission denied')
    //   await update(req.body.contactData, {path: ['customization', 'home']})
    //   res.status(200).send('ok')
      
    // }
  } catch(err) {
    res.status(501).send(err)
  }
}