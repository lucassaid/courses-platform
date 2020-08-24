import { getList } from '../firebase/functions'

export async function getCourseData(slug) {
  const config = {
    path: ['courses'],
    wheres: [['slug', '==', slug]]
  }

  // should be one
  const coursesObj = await getList(config)
  const id = Object.keys(coursesObj)[0]
  const course = { ...coursesObj[id], id }
  delete course.createdAt
  delete course.lastUpdate
  return course
}