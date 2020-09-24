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
import styles from './adminLayout.module.css'
import UploadsDrawer from './uploadsDrawer'
import useUser from '../hooks/useUser'
import { useSelector } from 'react-redux'
import { selectUploads } from '../lib/slices/uploadsSlice'

const { Meta } = Card
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export const name = 'Juli Amelie'
export const siteTitle = 'Juli Amelie'

const AdminMenu = ({page}) => {

  return (
    <>
      <div className={styles.siderHeader}>
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
    <style jsw>{`
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
      setSmallScreen(document.body.clientWidth < 992)
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

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout hasSider={!smallScreen}>

        {smallScreen ? (
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
        ):(
          <Sider
            collapsible={false}
            style={{backgroundColor: 'white'}}
            width={250}
            className={styles.sider}
          >
            <AdminMenu page={page}/>

            <div className={styles.siderFooter}>
              {menuFooter}
            </div>
          </Sider>
        )}
        <Layout className={styles.siteLayout} style={{position: 'relative'}}>
          <Header className={styles.header}>
            <Button
              className={styles.toggleSiderCollapsed}
              type="text"
              style={{color: 'white'}}
              size="large"
              icon={<MenuUnfoldOutlined/>}
              onClick={() => setDrawerOpened(true)}
            />
            <div style={{marginLeft: 'auto', cursor: 'pointer'}}>
              <Badge
                count={currentUploadsLength}
                onClick={() => setUploadsVisible(true)}
              >
                <UploadOutlined style={{fontSize: 18, color: 'white'}}/>
              </Badge>
            </div>
          </Header>
          <Content className={styles.content}>
            <main className={styles.main}>
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