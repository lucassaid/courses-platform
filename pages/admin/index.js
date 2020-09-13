import React, { useEffect } from 'react'
import { PageHeader, Empty } from 'antd'
import AdminLayout from '../../components/adminLayout'

const Admin = () => {

  return(
    <AdminLayout page="home">
      <PageHeader
        title="Administrador"
      ></PageHeader>

      <Empty/>
    </AdminLayout>
  )
}
export default Admin