import admin, { firestore as ref } from '../../../firebase/admin'
import { getList, add } from '../../../firebase/admin-functions'

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
    const config = {path: ['courses']}

    if(req.method === 'PUT') {
      // expects an object with all courses to update, ej{<courseId>: {name: 'foo'}}
      if(!user.admin) throw new Error('Permission denied')
      const coursesToUpdate = req.body.courses 
      const batch = ref.batch();
      for(let courseId in coursesToUpdate) {
        let courseRef = ref.collection('courses').doc(courseId)
        batch.update(courseRef, coursesToUpdate[courseId])
      }
      await batch.commit()
      res.status(200).send('ok')
  
    } else if(req.method === 'POST') {
      if(!user.admin) throw new Error('Permission denied')
      const r = await add({
        ...req.body.course,
        published: false,
        archived: false,
        order: -1
      }, config)
      res.status(200).send(r)

    } else if(req.method === 'GET') {
      // hide archived even if admin
      config.wheres =  [['archived', '==', false]]
      if(!user.admin || req.query.hideUnpublished) {
        // hide unpublished courses if not admin
        config.wheres.push(['published', '==', true])
      }
      const courses = await getList(config)
      res.send(courses)
    }
  } catch(err) {
    console.log(err)
    res.status(403).send(err)
  }

}