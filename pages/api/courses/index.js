import { getList } from '../../../firebase/admin-functions'

export default async function getCourses(req, res) {
  const config = {
    path: ['courses'],
    wheres: [
      ['archived', '==', false]
    ]
  }
  if(!req.query.admin) {
    config.wheres.push(['published', '==', true])
  }
  try {
    const courses = await getList(config)
    res.send(courses)
  } catch(err) {
    res.status(403).send(err)
  }
}