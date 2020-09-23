import { getList } from '../../../../firebase/admin-functions'

export const getCourseBySlug = async slug => {
  const config = {
    path: ['courses'],
    wheres: [['slug', '==', slug]]
  }
  const coursesObj = await getList(config)
  const id = Object.keys(coursesObj)[0] // should be one
  return { ...coursesObj[id], id }
}

export default async function getCourse(req, res) {
  const {query: { slug }} = req
  try {
    const course = await getCourseBySlug(slug)
    res.send(course)
    console.log("curso")
  } catch(err) {
    res.status(403).send(err)
  }
}