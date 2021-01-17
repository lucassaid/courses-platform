import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu, Button, Drawer, Card, Avatar, Badge, Spin } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  EditOutlined
} from '@ant-design/icons';
import UploadsDrawer from './uploadsDrawer'
import useUser from '../hooks/useUser'
import { useSelector } from 'react-redux'
import { selectUploads } from '../lib/slices/uploadsSlice'
import styles from './adminLayout.module.css'

const { Meta } = Card
const { Header, Content, Sider } = Layout;

export const name = 'Juli Amelie'
export const siteTitle = 'Juli Amelie'

const AdminMenu = ({page}) => {

  return (
    <>
      <div className="p-4">
        <Link href="/admin">
          <a alt="Admin">
            <img
              style={{width: 50}}
              src="/images/logo.png"
              alt="Julieta Amelie"
            />
          </a>
        </Link>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[page]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/admin">
            <a>Inicio</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="courses" icon={<AppstoreOutlined />}>
          <Link href="/admin/courses">
            <a>Cursos</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link href="/admin/users">
            <a>Usuarios</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="customization" icon={<EditOutlined />}>
          <Link href="/admin/customization">
            <a>Personalización</a>
          </Link>
        </Menu.Item>
        
      </Menu>
    </>
  )
}

const loading = (
  <>
    <div className="container">
      <Spin size="large"/>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        width: 100%;
        height: 100%;
        position: fixed;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </>
)

export default function AdminLayout({ children, page }) {

  const [uploadsVisible, setUploadsVisible] = useState(false)
  const uploads = useSelector(selectUploads)
  const currentUploadsLength = uploads.filter(upload => !upload.finished).length

  const [drawerOpened, setDrawerOpened] = useState(false)
  const [smallScreen, setSmallScreen] = useState(true)

  useEffect(() => {
    // render Drawer or Sider according to window size
    function updateSize() {
      setSmallScreen(document.body.clientWidth < 1024)
    }
    window.addEventListener('resize', updateSize)
    updateSize()

    // prevent leaving page
    function beforeUnloadHandler(e) {
      if(currentUploadsLength) {
        e.returnValue = "Hay archivos subiendose... ¿Dejar página?"
      }
    }
    window.addEventListener('beforeunload', beforeUnloadHandler)

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [currentUploadsLength]);

  const {user, error} = useUser(true)

  if(!user) return loading

  const menuFooter = (
    <Meta
      avatar={<Avatar src={user.picture} icon={<UserOutlined/>}/>}
      title={user.name}
    />
  )

  const drawer = (
    <Drawer
      closable={false}
      placement="left"
      onClose={() => setDrawerOpened(false)}
      visible={drawerOpened}
      bodyStyle={{padding: 0}}
      footer={menuFooter}
    >
      <AdminMenu page={page}/>
    </Drawer>
  )

  const sider = (
    <Sider
      collapsible={false}
      width={250}
      className="overflow-auto h-screen fixed z-10 left-0 bg-white"
    >
      <AdminMenu page={page}/>

      <div className="absolute bottom-0 left-0">
        {menuFooter}
      </div>
    </Sider>
  )

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        className="justify-end"
        hasSider={!smallScreen}
      >

        {smallScreen ? drawer : sider}

        <Layout className={styles.siteLayout}>
          <Header className={styles.header}>
            <div className="block lg:hidden">
              <Button
                className="text-white"
                type="text"
                size="large"
                icon={<MenuUnfoldOutlined/>}
                onClick={() => setDrawerOpened(true)}
              />
            </div>
            <div className="ml-auto cursor-pointer">
              <Badge
                count={currentUploadsLength}
                onClick={() => setUploadsVisible(true)}
              >
                <UploadOutlined style={{fontSize: 18, color: 'white'}}/>
              </Badge>
            </div>
          </Header>
          <Content className="mt-16 mx-4">
            <main className="max-w-2xl mx-auto">
              {children}
            </main>
          </Content>
        </Layout>
      </Layout>

      <UploadsDrawer
        uploads={uploads}
        onClose={() => setUploadsVisible(false)}
        visible={uploadsVisible}
      />
    </>
  )
}