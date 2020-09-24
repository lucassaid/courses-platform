import admin from '../../../firebase/admin'
import { getList, update, add } from '../../../firebase/admin-functions'

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
    const config = {path: ['customization', 'home', 'testimonials']}

    if(req.method === 'POST') {
      if(!user.admin) throw new Error('Permission denied')
      const doc = {...req.body.testimonial, deleted: false}
      const newTestimonial = await add(doc, config)
      res.status(200).send(newTestimonial)

    } else if(req.method === 'PUT') {
      if(!user.admin) throw new Error('Permission denied')
      config.path.push(req.body.testimonial.id)
      await update(req.body.testimonial, config)
      res.status(200).send(req.body.testimonial)
  
    } else if(req.method === 'GET') {
      config.wheres = [['deleted', '==', false]]
      const testimonialsList = await getList(config)
      res.send(testimonialsList)

    } else if(req.method === 'DELETE') {
      if(!user.admin) throw new Error('Permission denied')
      config.path.push(req.query.id)
      await update({deleted: true}, config)
      res.status(200).send('ok')
    }
  } catch(err) {
    console.log(err)
    res.status(403).send(err)
  }

}