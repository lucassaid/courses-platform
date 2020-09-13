import AdminLayout from '../../../components/adminLayout'
import { PageHeader, Button, Table, Avatar } from 'antd'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const Users = () => {

  const { data: users, error } = useSWR(`/api/users`, fetcher)
  
  const dataSource = Object.values(users || {})

  const columns = [
    {
      title: '',
      dataIndex: 'photoURL',
      key: 'photo',
      render: url => <Avatar src={url}/> 
    },
    {
      title: 'Nombre',
      dataIndex: 'displayName',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ]

  return(
    <AdminLayout page="users">
      <PageHeader
        title="Usuarios"
      ></PageHeader>

      <Table dataSource={dataSource} columns={columns}/>
    </AdminLayout>
  )
}
export default Users