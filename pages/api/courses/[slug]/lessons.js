import { getList } from '../../../../firebase/admin-functions'

export default async function getLessons(req, res) {
  // get course
  console.log("REQ", req.query.slug)
  const {query: { slug }} = req
  const config = {
    path: ['courses'],
    wheres: [['slug', '==', slug]]
  }
  try {
    const coursesObj = await getList(config)
    const id = Object.keys(coursesObj)[0] // should be one
    // get lessons
    const lessons = await getList({path: ['courses', id, 'lessons']})
    res.send(lessons)
  } catch(err) {
    res.status(403).send(err)
  }
}