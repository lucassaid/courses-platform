import { getList } from '../../../../firebase/admin-functions'

export default async function getCourse(req, res) {

  const {query: { slug }} = req

  const config = {
    path: ['courses'],
    wheres: [['slug', '==', slug]]
  }
  try {
    const coursesObj = await getList(config)
    const id = Object.keys(coursesObj)[0] // should be one
    const course = { ...coursesObj[id], id }
    res.send(course)
  } catch(err) {
    res.status(403).send(err)
  }
}