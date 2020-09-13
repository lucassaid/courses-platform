import admin from '../../../firebase/admin'
import { getList, add, update } from '../../../firebase/admin-functions'

const verifyAdmin = async req => {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    if(!decodedClaims.admin) throw new Error('No es admin')
  } catch(err) {
    console.log("Cookie error", err)
    throw new Error(err)
  }
}

export default async function (req, res) {
  const {query: { courseId }} = req
  const config = {path: ['courses', courseId, 'lessons']}

  try {
    if(req.method === 'PUT') {
      await verifyAdmin(req)
      const {query: {lessonId}} = req
      config.path.push(lessonId)
      await update(req.body.lesson, config)
      res.status(200).send('ok')

    } else if(req.method === 'POST') {
      await verifyAdmin(req)
      const r = await add(req.body.lesson, config)
      res.status(200).send(r)
      
    } else if(req.method === 'GET') {
      const lessons = await getList(config)
      res.send(lessons)
    }
  } catch(err) {
    console.log(`Error in lessons - ${req.method}`, err)
    res.status(403).send(err)
  }
}