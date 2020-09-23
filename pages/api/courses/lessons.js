import admin, { firestore } from '../../../firebase/admin'
import { getList, add, update } from '../../../firebase/admin-functions'

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
      const uriPermission = await verifyUriPermission(req, courseId)
      const lessons = await getList(config)
      if(uriPermission) {
        res.send(lessons)
      } else {
        res.send(formatedLessons(lessons))
      }
    
    }
  } catch(err) {
    console.log(`Error in lessons - ${req.method}`, err)
    res.status(403).send(err)
  }
}

const verifyUser = async req => {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    return decodedClaims
  } catch(err) {
    return false
  }
}

const verifyAdmin = async req => {
  const user = await verifyUser(req)
  if(!user.admin) throw new Error('No es admin')
  return true
}

const verifyUriPermission = async (req, courseId) => {
  const user = await verifyUser(req)
  if(!user) return false
  if(user.admin) return true
  return await userHasCourse(user.uid, courseId)
}

const userHasCourse = (uid, courseId) => {
  try {
    const userDoc = firestore.collection('users').doc(uid).get()
    const user = userDoc.data()
    return user.courses && user.courses[courseId] && user.courses[courseId].learnPermission
  } catch(err) {
    return false
  }
}

const formatedLessons = lessons => {
  // delete uri's for more security
  const newLessons = {...lessons}
  for(let id in newLessons) {
    delete newLessons[id].uri
  }
  return newLessons
}