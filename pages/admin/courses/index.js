import { getList } from '../../../firebase/functions'
import withFetch from '../../../hocs/withFetch'
import AdminLayout from '../../../components/adminLayout'

const config = { path: ['courses'] }

const Courses = ({data}) => {
  return(
    <AdminLayout page="courses">courses</AdminLayout>
  )
}
export default withFetch(Courses, () => getList(config))