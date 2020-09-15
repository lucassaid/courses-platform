import admin from '../../../firebase/admin'
import { getDoc, update } from '../../../firebase/admin-functions'

const verifyUser = async req => {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    return decodedClaims
  } catch(err) {
    console.log("Cookie error", err)
    return false
  }
}

export default async function (req, res) {
  try {
    const user = await verifyUser(req)
    const config = {path: ['customization', 'home']}

    if(req.method === 'PUT') {
      // expects an object with all testimonials to update, ej{<slideId>: {name: 'foo'}}
      if(!user.admin) throw new Error('Permission denied')
      await update({testimonials: req.body.testimonials}, config)
      res.status(200).send('ok')
  
    }  else if(req.method === 'GET') {
      const homeDoc = await getDoc('home', {path: ['customization']})
      res.send(homeDoc['home'].testimonials || {})
    }
  } catch(err) {
    console.log(err)
    res.status(403).send(err)
  }

}