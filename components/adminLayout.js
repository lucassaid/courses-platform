import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styles from './adminLayout.module.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export const name = 'Juli Amelie'
export const siteTitle = 'Juli Amelie'

export default function AdminLayout({ children, page }) {
  const [siderCollapsed, setSiderCollapsed] = useState(false)

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={siderCollapsed}
          className={styles.sider}
        >
          <div className={styles.logo}>
            <img src="https://cdn.oknube.com/base-app/logo.svg" alt="oknube"/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[page]}>
            <Menu.Item key="home" icon={<UserOutlined />}>
              <Link href="/admin">
                <a>Inicio</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="courses" icon={<AppstoreOutlined />}>
              <Link href="/admin/courses">
                <a>Cursos</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles.siteLayout} style={{position: 'relative'}}>
          <Header className={styles.header}>
            <Button
              className={styles.toggleSiderCollapsed}
              type="text"
              style={{color: 'white'}}
              size="large"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setSiderCollapsed(!siderCollapsed)}
            />
          </Header>
          <Content className={styles.content}>
            <main>
              {children}
            </main>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  )
}