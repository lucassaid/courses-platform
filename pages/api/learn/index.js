import admin from '../../../firebase/admin'
import { getDoc, update } from '../../../firebase/admin-functions'

/* returns lessons and information from user */
export default async function (req, res) {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
    const { uid } = decodedClaims
    
    if(req.method === 'PUT') {
      const {courseId, lessonId, type } = req.body
      if(type ==='lesson-completed') {
        const updatePath = `courses.${courseId}.lessons.${lessonId}.completed`
        await update({[updatePath]: true}, {path: ['users', uid]})
      } else if(type === 'finished-course') {
        const updatePath = `courses.${courseId}.completed`
        await update({[updatePath]: true}, {path: ['users', uid]})
      }

      // send updated doc
      const userDoc = await getDoc(uid, {path: ['users']})
      res.send(userDoc[uid].courses)

    } else if(req.method === 'GET') {
      const userDoc = await getDoc(uid, {path: ['users']})
      const response = userDoc[uid].courses[req.query.courseId]
      res.send(response)

    }

  } catch(err) {
    console.log("Error in learn", req.method, err)
    res.status(403).send(err)
  }
}