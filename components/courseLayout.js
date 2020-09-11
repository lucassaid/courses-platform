import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Layout, Menu, Button, Drawer } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import styles from './courseLayout.module.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export const siteTitle = 'Juli Amelie'

export default function CourseLayout({ children, menu, title, drawerTitle }) {

  const [drawerOpened, setDrawerOpened] = useState(false)
  const [smallScreen, setSmallScreen] = useState(true)

  useEffect(() => {
    // render Drawer or Sider according to window size
    function updateSize() {
      setSmallScreen(document.body.clientWidth < 992)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
            title={drawerTitle}
            placement="left"
            onClose={() => setDrawerOpened(false)}
            visible={drawerOpened}
            bodyStyle={{padding: 0}}
          >
            {menu}
          </Drawer>
        ):(
          <Sider
            collapsible={false}
            style={{backgroundColor: 'white'}}
            width={300}
            className={styles.sider}
          >
            {menu}
          </Sider>
        )}
        <Layout className={styles.siteLayout} style={{position: 'relative'}}>
          <Header className={styles.header}>
            <Button
              className={styles.toggleSiderCollapsed}
              type="text"
              style={{color: 'white'}}
              size="large"
              icon={<OrderedListOutlined style={{fontSize: '1.5rem'}}/>}
              onClick={() => setDrawerOpened(true)}
            />
            {title}
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